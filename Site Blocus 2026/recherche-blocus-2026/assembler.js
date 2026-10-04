#!/usr/bin/env node
/* ===========================================================================
   assembler.js - fusionne les relevés bruts (brut-*.tsv) et les rattache aux
   établissements de l'Annuaire de l'Éducation déjà présents dans build/ecoles.

   Entrée  : recherche-blocus-2026/brut-*.tsv
             nom <TAB> commune <TAB> dep <TAB> dates(;) <TAB> statut <TAB>
             source <TAB> precision
   Sorties : blocus-lycees-2026.csv   liste complète, une ligne par relevé
             blocus-lycees-2026.json  idem + code INSEE, nom officiel, type,
                                     adresse, latitude, longitude
             blocus-lycees-2026.js    window.BLOCUS_SEPT2026, au format des
                                     clés de build/blocus.js ("code|nom")
             non-rattaches.txt        les lignes qu'il faut vérifier à la main

   Le rapprochement est automatique mais volontairement prudent : une ligne sans
   code INSEE n'est pas une ligne fausse, elle est seulement à relire.
   Usage : node recherche-blocus-2026/assembler.js
   =========================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DIR = __dirname;
const ECOLES_DIR = path.join(ROOT, "build", "ecoles");
const COMMUNES_DIR = path.join(ROOT, "build", "communes");

/* ------------------------------------------------------------------ outils */

/** minuscules, sans accent, ligatures dépliées, ponctuation réduite à des espaces */
function norm(s) {
  return String(s || "")
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[’']/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // diacritiques
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** retire les mots de tête qui ne portent pas l'identité de l'établissement */
const MOTS_GENERIQUES = new Set([
  "lycee", "college", "lp", "lgt", "lg", "cpi", "institut", "cite", "scolaire",
  "prive", "public", "professionnel", "professionnelle", "polyvalent",
  "general", "generale", "technologique", "gt", "gtee", "agricole", "horticole",
  "maternel", "elementaire", "section", "ensemble", "campus", "la", "le", "les",
  "de", "du", "des", "d", "et", "au", "aux", "saint", "sainte", "saintes"
]);

/** « Lycée polyvalent André Maginot » -> « andre maginot » */
function cle(nom) {
  const mots = norm(nom).split(" ").filter(Boolean);
  const gardes = mots.filter((m) => !MOTS_GENERIQUES.has(m));
  return (gardes.length ? gardes : mots).join(" ");
}

/** distance de Levenshtein, pour départager les noms voisins */
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    prev = cur;
  }
  return prev[n];
}

/** score de similarité : 1 = identique */
function score(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const ta = a.split(" ");
  const tb = b.split(" ");
  const sb = new Set(tb);
  const couverture = ta.filter((t) => sb.has(t)).length / Math.min(ta.length, tb.length);
  if (couverture === 1) return 0.95;           // tous les mots de l'un sont dans l'autre
  if (a.includes(b) || b.includes(a)) return 0.9;
  const d = lev(a, b);
  return Math.max(couverture * 0.92, 1 - d / Math.max(a.length, b.length));
}

/** seuil en dessous duquel on ne rattache pas : mieux vaut une ligne à relire
    qu'un établissement inventé */
const SEUIL = 0.85;

/* ------------------------------------------------- chargement des communes */

function chargerCommunes() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  const parDep = {};   // dep -> [{ c, n }]
  const parNom = {};   // nom normalisé -> [codes]
  const nomDep = {};   // dep -> nom du département
  for (const f of fs.readdirSync(COMMUNES_DIR)) {
    if (!f.endsWith(".js")) continue;
    vm.runInContext(fs.readFileSync(path.join(COMMUNES_DIR, f), "utf8"), sandbox);
  }
  // le departement est lu dans les donnees : les fichiers outre-mer (971.js…)
  // ne peuvent pas etre deduits du seul nom de fichier (slice(0,2) donnerait "97")
  for (const dep of Object.keys(sandbox.window.COMMUNES)) {
    const bloc = sandbox.window.COMMUNES[dep];
    if (!bloc || !bloc.communes) continue;
    parDep[dep] = bloc.communes.map((c) => ({ c: c.c, n: c.n }));
    nomDep[dep] = bloc.nom || dep;
    for (const c of bloc.communes) {
      const k = norm(c.n).replace(/ /g, "");
      (parNom[k] = parNom[k] || []).push(c.c);
    }
  }
  return { parDep, parNom, nomDep };
}

/* ------------------------------------------------- chargement des écoles */

function chargerEcoles() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  const parDep = {};
  for (const f of fs.readdirSync(ECOLES_DIR)) {
    if (!f.endsWith(".js")) continue;
    vm.runInContext(fs.readFileSync(path.join(ECOLES_DIR, f), "utf8"), sandbox);
  }
  for (const dep of Object.keys(sandbox.window.ECOLES)) {
    const v = sandbox.window.ECOLES[dep];
    for (const [code, liste] of Object.entries(v.villes)) {
      parDep[code] = (parDep[code] || []).concat(
        liste.map((e) => Object.assign({ c: code, dep }, e))
      );
    }
  }
  return parDep;
}

/* ------------------------------------------------------------- les relevés */

function lireBruts() {
  const lignes = [];
  for (const f of fs.readdirSync(DIR)) {
    if (!f.startsWith("brut-") || !f.endsWith(".tsv")) continue;
    const texte = fs.readFileSync(path.join(DIR, f), "utf8").split(/\r?\n/);
    for (let i = 1; i < texte.length; i++) {
      const l = texte[i];
      if (!l || !l.trim()) continue;
      const c = l.split("\t");
      if (c.length < 6) continue;
      lignes.push({
        secteur: f.slice(5, -4),
        nom: c[0].trim(),
        commune: c[1].trim(),
        dep: c[2].trim(),
        dates: c[3].trim(),
        statut: c[4].trim(),
        source: c[5].trim(),
        precision: (c[6] || "").trim()
      });
    }
  }
  return lignes;
}

/* -------------------------------------------------------------- assemblage */

/* ---------------------------------------------------------- rapport Markdown */

/** categorize l'action relevee */
function actions(statut) {
  const s = statut.toLowerCase();
  const t = [];
  if (s.indexOf("blocus") >= 0) t.push("blocus");
  if (s.indexOf("rassemblement") >= 0) t.push("rassemblement");
  if (s.indexOf("incidents") >= 0) t.push("incidents");
  if (s.indexOf("fermeture") >= 0) t.push("fermeture administrative");
  if (s.indexOf("perturbation") >= 0) t.push("perturbation");
  if (s.indexOf("manifestation") >= 0) t.push("manifestation");
  if (!t.length) t.push(statut);
  return t;
}

function rapportMarkdown(out, nonRattaches, nomDep) {
  const fr = (d) =>
    d.split(";")
      .map((x) => x.slice(8, 10) + "/" + x.slice(5, 7))
      .join(", ");

  const parDep = {};
  for (const l of out) {
    const d = parDep[l.dep] || (parDep[l.dep] = { dep: l.dep, lignes: [], etabs: new Set(), blocus: new Set() });
    d.lignes.push(l);
    if (l.code_insee) d.etabs.add(l.code_insee + "|" + l.nom_officiel);
    if (actions(l.statut_action).indexOf("blocus") >= 0)
      d.blocus.add(l.code_insee ? l.code_insee + "|" + l.nom_officiel : "?" + l.dep + "|" + l.nom_releve);
  }
  const deps = Object.keys(parDep).sort();

  const nLignes = out.length;
  const nBlocus = out.filter((l) => actions(l.statut_action).indexOf("blocus") >= 0).length;
  const nEtabs = new Set(out.filter((l) => l.code_insee).map((l) => l.code_insee + "|" + l.nom_officiel)).size;

  const md = [];
  md.push("# Lycées perturbés / bloqués — mouvement de septembre 2026");
  md.push("");
  md.push("**Document de travail non officiel.** Il ne remplace pas la liste nationale,");
  md.push("qui n'existe pas : ni le ministère ni les rectorats n'ont publié de liste");
  md.push("nominative des lycées bloqués. Tout ce qui suit est reconstitué à partir");
  md.push("d'**arrêtés préfectoraux**, de **communiqués de rectorat** et surtout de la");
  md.push("**presse locale**. Chaque ligne porte sa source.");
  md.push("");
  md.push("Période couverte : **18 septembre → 2 octobre 2026** (mouvement national de");
  md.push("blocage des entrées des lycées).");
  md.push("");
  md.push("## Vue d'ensemble");
  md.push("");
  md.push("| | |");
  md.push("|---|---|");
  md.push("| Établissements distincts rattachés | **" + nEtabs + "** |");
  md.push("| Relevés (établissement × dates × source) | " + nLignes + " |");
  md.push("| dont lignes impliquant un **blocus** | " + nBlocus + " |");
  md.push("| sans rattachement certain (« à vérifier ») | " + nonRattaches.length + " |");
  md.push("| Départements couverts | " + deps.length + " |");
  md.push("");
  md.push("### Lecture des statuts");
  md.push("");
  md.push("* **blocus** — les élèves ont bloqué l'entrée eux-mêmes : c'est le seul cas");
  md.push("  qui répond à la question posée ;");
  md.push("* **fermeture administrative** — fermeture décidée par la préfecture ou le");
  md.push("  rectorat, **sans** preuve d'un blocus élève ;");
  md.push("* **rassemblement / manifestation / incidents / perturbation** — action");
  md.push("  constatée devant l'établissement, sans blocage des accès ;");
  md.push("* **blocus (tentative)** — tentative empêchée : à ne pas compter comme un blocus Abouti.");
  md.push("");

  md.push("## Répartition par département");
  md.push("");
  md.push("| Dép. | Département | Établissements | Blocus avérés |");
  md.push("|---|---|---|---|");
  for (const d of deps) {
    const v = parDep[d];
    md.push("| " + d + " | " + (nomDep[d] || d) + " | " + v.etabs.size + " | " + v.blocus.size + " |");
  }
  md.push("");

  md.push("## Liste par établissement");
  md.push("");
  for (const d of deps) {
    md.push("### " + d + " — " + (nomDep[d] || d));
    md.push("");
    const parCommune = {};
    for (const l of parDep[d].lignes) {
      const k = l.code_insee ? l.code_insee + "|" + l.nom_officiel : l.commune + "|" + l.nom_releve;
      (parCommune[k] = parCommune[k] || []).push(l);
    }
    for (const k of Object.keys(parCommune).sort((a, b) =>
      parCommune[a][0].commune.localeCompare(parCommune[b][0].commune, "fr")
    )) {
      const ls = parCommune[k];
      const l0 = ls[0];
      md.push("**" + l0.commune + "** — " + (l0.nom_officiel || l0.nom_releve) +
        (l0.code_insee ? " (`" + l0.code_insee + "`)" : " — *non rattaché*") +
        (l0.statut_etablissement ? " · " + l0.statut_etablissement : ""));
      md.push("");
      md.push("| Dates | Action | Source |");
      md.push("|---|---|---|");
      for (const l of ls) {
        md.push("| " + fr(l.dates) + " | " + l.statut_action + " | " +
          (l.source ? "[" + (l.precision || "source") + "](" + l.source + ")" : l.precision) + " |");
      }
      md.push("");
    }
  }

  md.push("## Établissements à vérifier");
  md.push("");
  md.push("Lignes dont le nom publié **ne correspond pas** à un établissement de la base");
  md.push("nationale utilisée : soit la presse a employé une abréviation ou une faute, soit");
  md.push("l'établissement n'y figure pas (collège, école privée, établissement renommé).");
  md.push("Elles **ne sont pas** intégrées à la liste ci-dessus.");
  md.push("");
  md.push("| Relevé | Commune | INSEE | Candidats possibles |");
  md.push("|---|---|---|---|");
  for (const l of nonRattaches) {
    md.push("| " + l.nom_releve + " | " + l.commune + " (" + l.dep + ") | — | " +
      (l.candidat || "*aucun*") + " |");
  }
  md.push("");

  /* départements sans aucun relevé : la liste est donc très incomplète */
  const vides = [];
  for (let d = 1; d <= 95; d++) {
    const dep = d < 10 ? "0" + d : String(d);
    if (!parDep[dep] && nomDep[dep]) vides.push(dep + " " + nomDep[dep]);
  }
  for (const dep of ["971", "972", "973", "974", "976", "977", "978"]) {
    if (!parDep[dep] && nomDep[dep]) vides.push(dep + " " + nomDep[dep]);
  }
  md.push("## Limites de la compilation");
  md.push("");
  md.push("* Cette liste est **partielle**. Les départements ci-dessous n'ont donné");
  md.push("  **aucun** relevé nominatif exploitable, alors que la presse y signale des");
  md.push("  blocages : la compilation y est à faire.");
  md.push("");
  md.push("  " + (vides.join(" · ") || "—"));
  md.push("");
  md.push("* Les sources institutionnelles communiquent des **effectifs** (« 25");
  md.push("  établissements de l'académie de Reims », « 55 dans le Nord ») sans nommer les");
  md.push("  établissements : ces volumes ne peuvent pas être convertis en liste sans");
  md.push("  inventer des noms.");
  md.push("* Un certain nombre d'articles sont paywallés (DNA, L'Alsace, Républicain");
  md.push("  Lorrain, Le Figaro) : seuls les éléments librement lisibles ont été retenus.");
  md.push("* Les fermetures administratives sans blocus ne doivent pas être présentées");
  md.push("  comme des blocus.");
  md.push("");
  md.push("---");
  md.push("");
  md.push("Généré par `recherche-blocus-2026/assembler.js` à partir des relevés bruts");
  md.push("`brut-*.tsv`. Fichiers associés : `blocus-lycees-2026.csv` (toutes les lignes),");
  md.push("`blocus-lycees-2026.json`, `blocus-lycees-2026.js` (format des clés de la carte),");
  md.push("`non-rattaches.txt`.");
  md.push("");

  fs.writeFileSync(path.join(DIR, "blocus-lycees-2026.md"), md.join("\n"), "utf8");
}

function main() {
  const communes = chargerCommunes();
  const ecoles = chargerEcoles();

  const out = [];
  const nonRattaches = [];

  for (const r of lireBruts()) {
    const dep = r.dep;
    const codesDep = communes.parDep[dep] ? communes.parDep[dep].map((c) => c.c) : [];

    /* 1. la commune */
    let codes = [];
    const nc = norm(r.commune).replace(/ /g, "");
    if (nc && nc !== "non precise") {
      const exact = communes.parNom[nc];
      if (exact && exact.length === 1) codes = exact;
      else if (exact) {
        codes = exact.filter((c) => codesDep.indexOf(c) >= 0);
        if (!codes.length) codes = exact;
      } else {
        codes = codesDep.filter((c) => {
          const nom = communes.parDep[dep].find((x) => x.c === c).n;
          return score(norm(nom), r.commune) > 0.82;
        });
      }
    }

    /* 2. l'établissement, d'abord dans la commune, puis dans le département */
    const cible = cle(r.nom);
    /* contrainte de nature : un relevé qui dit « Lycée » ne doit pas se
       rattacher au collège homonyme (Bellevue, Berthelot, Toulouse-Lautrec,
       Marc Bloch… existent dans les deux cas dans la même commune) */
    const famille = (s) => (/coll/i.test(s) ? "college" : /(^|\W)(lyc|lp|lgt|lt)(\W|$)/i.test(s) ? "lycee" : "autre");
    const attendu = /\blyc/i.test(r.nom) || /\blp\b/i.test(r.nom) || /professionnel/i.test(r.nom)
      ? "lycee" : /\bcoll/i.test(r.nom) ? "college" : "";
    let meilleur = null;
    let candidat = null;       // meilleur score SOUS le seuil : proposé, jamais fusionné
    let portee = "commune";
    for (const code of codes.length ? codes : codesDep) {
      for (const e of ecoles[code] || []) {
        const sBrut = score(cible, cle(e.n));
        const s = attendu && famille(e.n) !== attendu ? sBrut * 0.55 : sBrut;
        if (s > SEUIL && (!meilleur || s > meilleur.sc)) {
          meilleur = Object.assign({ sc: s }, e);
          portee = codes.length ? "commune" : "departement";
        } else if (sBrut > 0.55 && (!candidat || sBrut > candidat.sc)) {
          candidat = Object.assign({ sc: sBrut, autreType: sBrut !== s }, e);
        }
      }
    }

    const ename = communes.parDep[dep]
      ? (communes.parDep[dep].find((c) => c.c === (meilleur && meilleur.c)) || {}).n
      : "";

    const ligne = {
      secteur: r.secteur,
      nom_releve: r.nom,
      nom_officiel: meilleur ? meilleur.n : "",
      commune: ename || r.commune,
      code_insee: meilleur ? meilleur.c : "",
      dep,
      type: meilleur ? meilleur.t : "",
      statut_etablissement: meilleur ? (meilleur.s || "") : "",
      adresse: meilleur ? meilleur.a || "" : "",
      lat: meilleur ? meilleur.la : "",
      lon: meilleur ? meilleur.lo : "",
      dates: r.dates,
      statut_action: r.statut,
      source: r.source,
      precision: r.precision,
      portee: portee,
      score: meilleur ? Number(meilleur.sc.toFixed(3)) : 0,
      candidat: !meilleur && candidat
        ? candidat.n + " (" + (communes.parDep[dep]
            ? (communes.parDep[dep].find((c) => c.c === candidat.c) || {}).n
            : "?") + ", score " + candidat.sc.toFixed(2) +
          (candidat.autreType ? ", **nature différente**" : "") + ")"
        : ""
    };
    out.push(ligne);
    if (!meilleur) {
      nonRattaches.push(ligne);
    }
  }

  /* --- écritures --- */
  const entetes = Object.keys(out[0] || { x: 1 });
  const csv = [entetes.join(",")].concat(
    out.map((l) =>
      entetes.map((k) => {
        const v = String(l[k] === undefined ? "" : l[k]);
        return /[",;\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(",")
    )
  ).join("\n");
  fs.writeFileSync(path.join(DIR, "blocus-lycees-2026.csv"), "\uFEFF" + csv, "utf8");
  fs.writeFileSync(
    path.join(DIR, "blocus-lycees-2026.json"),
    JSON.stringify(out, null, 1),
    "utf8"
  );

  /* --- fichier pour la carte du projet --- */
  const parEtab = {};
  for (const l of out) {
    if (!l.code_insee) continue;
    const k = l.code_insee + "|" + norm(l.nom_officiel).replace(/ /g, "-");
    parEtab[k] = parEtab[k] || { nom: l.nom_officiel, commune: l.commune, dep: l.dep, blocus: [] };
    parEtab[k].blocus.push(
      "    { n: \"Blocus - \" + " + JSON.stringify(l.statut_action) +
        ", j: \"" + l.dates.split(";").map((d) => d.slice(8, 10) + "/" + d.slice(5, 7)).join(", ") +
        "\", s: \"" + l.source.slice(0, 120) + "\" }"
    );
  }
  const js = [
    "/* Généré par recherche-blocus-2026/assembler.js - mouvement de blocage des",
    "   lycéens, du 18 septembre au 2 octobre 2026. Ne pas modifier à la main. */",
    "window.BLOCUS_SEPT2026 = window.BLOCUS_SEPT2026 || {};",
    "",
  ];
  for (const [k, v] of Object.entries(parEtab)) {
    js.push(
      "window.BLOCUS_SEPT2026[" + JSON.stringify(k) + "] = [",
      v.blocus.join(",\n"),
      "];"
    );
  }
  fs.writeFileSync(path.join(DIR, "blocus-lycees-2026.js"), js.join("\n"), "utf8");

  fs.writeFileSync(
    path.join(DIR, "non-rattaches.txt"),
    nonRattaches
      .map((l) => [l.secteur, l.dep, l.commune, l.nom_releve, l.candidat, l.source].join("\t"))
      .join("\n") || "(aucun)",
    "utf8"
  );

  rapportMarkdown(out, nonRattaches, communes.nomDep);

  console.log("relevés      :", out.length);
  console.log("rattachés    :", out.length - nonRattaches.length);
  console.log("à vérifier   :", nonRattaches.length);
  const parSecteur = {};
  for (const l of out) parSecteur[l.secteur] = (parSecteur[l.secteur] || 0) + 1;
  console.log("par secteur   :", JSON.stringify(parSecteur));
  const parDep = {};
  for (const l of out) if (l.code_insee) parDep[l.dep] = (parDep[l.dep] || 0) + 1;
  console.log("départements :", Object.keys(parDep).length, JSON.stringify(parDep));
}

main();