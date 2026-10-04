#!/usr/bin/env node
/* ===========================================================================
   fetch-ecoles.js — récupère les collèges et lycées de l'Éducation nationale
   et les range par commune dans build/ecoles/XX.js, un fichier par département.

   Source : Annuaire de l'éducation, data.education.gouv.fr
            jeu de données fr-en-annuaire-education
            (licence ouverte / Etalab).

   Comme les contours communaux, chaque fichier est un script autonome :
       window.ECOLES["01"] = { dep:"01", nom:"Ain", villes: { "01053": [ … ] } }
   Un <script src> fonctionne en file://, contrairement à fetch().

   Particularité : l'annuaire code les établissements de Paris, Lyon et
   Marseille par arrondissement (75101…, 69381…, 13201…). Nos contours
   communaux n'ont d'arrondissements que pour Paris ; Lyon et Marseille y sont
   des communes uniques (69123, 13055). On ramène donc les codes
   d'arrondissement lyonnais et marseillais sur la commune entière.

   Usage :
       node build/fetch-ecoles.js             # tout
       node build/fetch-ecoles.js --force     # retélécharge la source
       node build/fetch-ecoles.js --dry       # ne rien écrire
   =========================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "build", "ecoles");
const RAW = path.join(ROOT, "build", "ecoles-raw.json");
const COMMUNES_DIR = path.join(ROOT, "build", "communes");

const argv = process.argv.slice(2);
const FORCE = argv.indexOf("--force") >= 0;
const DRY = argv.indexOf("--dry") >= 0;

/* ----------------------------------------------------------------- télécharge */
const SELECT = [
  "nom_etablissement", "type_etablissement", "statut_public_prive", "libelle_nature",
  "adresse_1", "code_postal", "code_commune", "code_departement",
  "telephone", "web", "latitude", "longitude",
  "voie_generale", "voie_technologique", "voie_professionnelle", "segpa",
].join(",");

const WHERE = 'type_etablissement="Collège" or type_etablissement="Lycée"';

const SOURCE = "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/" +
  "fr-en-annuaire-education/exports/json" +
  "?where=" + encodeURIComponent(WHERE) + "&select=" + encodeURIComponent(SELECT);

async function source() {
  if (!FORCE && fs.existsSync(RAW)) {
    const age = (Date.now() - fs.statSync(RAW).mtimeMs) / 86400000;
    console.log("source en cache : " + path.relative(ROOT, RAW) +
                " (" + age.toFixed(1) + " j) — --force pour retélécharger");
    return JSON.parse(fs.readFileSync(RAW, "utf8"));
  }
  process.stdout.write("téléchargement de l'annuaire de l'éducation… ");
  const t0 = Date.now();
  const r = await fetch(SOURCE, { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error("HTTP " + r.status + " " + r.statusText);
  const txt = await r.text();
  let data;
  try { data = JSON.parse(txt); }
  catch (e) { throw new Error("réponse illisible : " + txt.slice(0, 200)); }
  if (!Array.isArray(data)) throw new Error("format inattendu (pas un tableau)");
  fs.writeFileSync(RAW, txt, "utf8");
  console.log(data.length + " établissements en " + ((Date.now() - t0) / 1000).toFixed(1) + " s");
  return data;
}

/* ------------------------------------------------------------------ raccords */
/** "033" → "33", "02A" → "2A", "971" → "971" */
const depDe = (code) => String(code).replace(/^0/, "");

/* Arrondissements municipaux ramenés sur leur commune, quand nos contours ne
   connaissent que la commune entière. */
const RACCORD = {};
for (let i = 1; i <= 9; i++) RACCORD["6938" + i] = "69123";   // Lyon
for (let i = 1; i <= 16; i++) RACCORD["132" + String(i).padStart(2, "0")] = "13055";  // Marseille

/** Une entrée d'annuaire → l'objet compact écrit dans le fichier.
    Clés : n nom, t "C" collège | "L" lycée, s "Pr" si privé (absent = public),
    v voies du lycée ("G" général, "T" techno, "P" pro), g 1 si SEGPA,
    a adresse, z code postal, d téléphone, w site (sans http), la/lo position. */
function compact(r) {
  const o = { n: r.nom_etablissement, t: r.type_etablissement === "Lycée" ? "L" : "C" };
  if (r.statut_public_prive === "Privé") o.s = "Pr";
  /* Les voies ne décrivent que les lycées : sur un collège, les mêmes
     colonnes sont renseignées et n'ont pas de sens. */
  if (o.t === "L") {
    let v = "";
    if (r.voie_generale) v += "G";
    if (r.voie_technologique) v += "T";
    if (r.voie_professionnelle) v += "P";
    if (v) o.v = v;
  }
  if (r.segpa) o.g = 1;
  if (r.adresse_1) o.a = r.adresse_1;
  if (r.code_postal) o.z = r.code_postal;
  if (r.telephone) o.d = String(r.telephone);
  if (r.web) o.w = String(r.web).replace(/^https?:\/\//i, "").replace(/\/+$/, "");
  if (typeof r.latitude === "number" && typeof r.longitude === "number") {
    o.la = +r.latitude.toFixed(5);
    o.lo = +r.longitude.toFixed(5);
  }
  return o;
}

/* ------------------------------------------------------- communes par dépôt */
let CTX = 0;
function codesCommunes(dep) {
  const src = fs.readFileSync(path.join(COMMUNES_DIR, dep + ".js"), "utf8");
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  const d = ctx.window.COMMUNES && ctx.window.COMMUNES[dep];
  if (!d) throw new Error("build/communes/" + dep + ".js : données absentes");
  const set = new Set(d.communes.map((c) => c.c));
  CTX++;
  return { nom: d.nom, set: set };
}

/* ------------------------------------------------------------------- traite */
(async function () {
  const brut = await source();

  const deps = fs.readdirSync(COMMUNES_DIR)
    .filter((f) => /^[0-9A-Z]+\.js$/.test(f))
    .map((f) => f.replace(/\.js$/, ""))
    .sort();
  if (!deps.length) throw new Error("aucun fichier dans build/communes/");

  /* on range d'abord par département, pour n'ouvrir chaque fichier communal
     qu'une fois */
  const parDep = new Map();
  let horsCarte = 0, raccordes = 0, sections = 0;
  for (const r of brut) {
    if (!r || !r.nom_etablissement || !r.code_commune) continue;
    /* Une SEGPA ou une SEP figure dans l'annuaire comme un établissement à
       part, avec son propre UAI, alors que c'est une section d'un collège ou
       d'un lycée déjà listé. On l'écarte : le collège indique déjà sa SEGPA
       (drapeau g) et le lycée ses voies. */
    if (/^section/i.test(r.libelle_nature || "")) { sections++; continue; }
    let dep = depDe(r.code_departement);
    if (deps.indexOf(dep) < 0) { horsCarte++; continue; }
    let com = String(r.code_commune);
    if (RACCORD[com]) { com = RACCORD[com]; raccordes++; }
    if (!parDep.has(dep)) parDep.set(dep, []);
    parDep.get(dep).push({ com: com, e: compact(r) });
  }

  if (!DRY) fs.mkdirSync(OUT_DIR, { recursive: true });

  let total = 0, couples = 0, orphelins = 0, octets = 0;
  const tailles = [];
  const orphelinsVus = new Set();
  const parType = { C: 0, L: 0 };

  for (const dep of deps) {
    const { nom, set } = codesCommunes(dep);
    const villes = {};
    for (const it of parDep.get(dep) || []) {
      if (!set.has(it.com)) { orphelins++; orphelinsVus.add(it.com); continue; }
      if (!villes[it.com]) villes[it.com] = [];
      villes[it.com].push(it.e);
    }
    /* collèges d'abord, puis lycées ; à l'intérieur, par nom */
    for (const code of Object.keys(villes)) {
      villes[code].sort((a, b) =>
        a.t === b.t ? a.n.localeCompare(b.n, "fr") : (a.t === "C" ? -1 : 1));
      total += villes[code].length;
      couples++;
      for (const e of villes[code]) parType[e.t]++;
    }

    const lit = JSON.stringify({ dep: dep, nom: nom, villes: villes });
    const ligne =
      "/* Collèges et lycées — " + nom + " (" + dep + ").\n" +
      "   n nom · t \"C\" collège / \"L\" lycée · s \"Pr\" si privé (absent = public)\n" +
      "   v voies du lycée (G général, T techno, P pro) · g 1 si SEGPA\n" +
      "   a adresse · z code postal · d téléphone · w site (sans http)\n" +
      "   la/lo latitude, longitude. Source : Annuaire de l'éducation. */\n" +
      "window.ECOLES = window.ECOLES || {};\n" +
      "window.ECOLES[" + JSON.stringify(dep) + "] = " + lit + ";\n";

    if (!DRY) fs.writeFileSync(path.join(OUT_DIR, dep + ".js"), ligne, "utf8");
    octets += Buffer.byteLength(ligne, "utf8");
    tailles.push([dep, Object.keys(villes).length, Buffer.byteLength(ligne, "utf8")]);
  }

  tailles.sort((a, b) => b[2] - a[2]);
  console.log("");
  console.log("départements écrits : " + deps.length + (DRY ? " (à blanc)" : " dans build/ecoles/"));
  console.log("établissements      : " + total +
              "  (collèges " + parType.C + ", lycées " + parType.L + ")");
  console.log("communes desservies : " + couples);
  console.log("fichiers communaux  : " + CTX);
  console.log("volume total        : " + (octets / 1048576).toFixed(2) + " Mo" +
              "  (moyenne " + (octets / deps.length / 1024).toFixed(0) + " Ko, max " +
              (tailles[0][2] / 1024).toFixed(0) + " Ko — " + tailles[0][0] + ", " + tailles[0][1] + " communes)");
  if (raccordes) console.log("arrondissements ramenés sur Lyon/Marseille : " + raccordes);
  if (sections) console.log("sections (SEGPA/SEP) écartées          : " + sections);
  if (horsCarte) console.log("hors des 101 départements (975, 977…) : " + horsCarte);
  if (orphelins) console.log("communes inconnues de nos contours   : " + orphelins +
                            "  (" + Array.from(orphelinsVus).slice(0, 10).join(", ") + ")");
})().catch((e) => {
  console.error("échec :", e.message);
  process.exit(1);
});