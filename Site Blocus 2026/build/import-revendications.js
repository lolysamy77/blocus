/* ===========================================================================
   import-revendications.js — met les revendications d'établissement dans
   les pages, et dit ce qui reste à relire.

   Entrées
     build/revendications.json        les revendications retenues, relues à la
                                     main. C'est la seule source de vérité : un
                                     fichier que l'on écrit, que l'on relit, et
                                     que ce programme ne réécrit jamais.
     demandes_revendications/*.json   les propositions des visiteurs, une par
                                     revendication proposée, dans le dossier
                                     que remplissent la page et le serveur.
     votes/*.json                    les votes, un par appareil et par
                                     revendication.
     build/ecoles-raw.json           l'annuaire, pour vérifier que chaque clé
                                     désigne vraiment un établissement.

   Sortie
     build/revendications.js          ce que les pages lisent sans serveur :
                                     les revendications de chaque établissement,
                                     avec les comptes de votes tels qu'ils
                                     étaient au moment de la génération.

   Et à l'écran, ce qui attend une décision : les propositions à relire, avec
   le bloc de JSON à coller dans build/revendications.json, les votes qui ne
   désignent plus rien, et les clés introuvables dans l'annuaire.

   Une revendication proposée figure déjà dans le fichier des pages, marquée
   « à relire ». Ce n'est pas la même chose qu'être retenue : rien n'entre dans
   la liste nationale de revendications.html sans lecture, et une proposition
   se voit dans le tableau de son propre établissement — où elle peut être
   votée, discutée, et retirée si elle n'a rien à y faire. Un élève qui écrit
   dans son lycée doit voir sa ligne, même avant qu'un adulte l'ait lue.

   Ce que le programme ne fait pas, volontairement : retenir. Une proposition
   ne passe dans build/revendications.json que si quelqu'un l'a lue. Un
   programme ne relit rien.

       node build/import-revendications.js         -> écrit le fichier
       node build/import-revendications.js --dry   -> compte rendu seul

   ---------------------------------------------------------------------------
   DEUX RÈGLES PARTAGÉES AVEC LE SERVEUR ET LE PANNEAU
   ---------------------------------------------------------------------------
   La clé d'un établissement : « codeInsee|nom », le nom exactement comme
   l'annuaire l'écrit.

   L'identifiant d'une revendication : « r » suivi des dix premiers chiffres du
   SHA-1 de « clé|titre comparable », où un titre comparable a perdu ses
   ligatures, ses accents, sa casse et sa ponctuation (fonction `comparable`
   plus bas, écrite à l'identique dans serve.py).

   L'identifiant est calculé, jamais attribué : c'est ce qui permet à une
   revendication proposée puis retenue de garder ses votes, et à deux personnes
   qui écrivent le même titre de tomber sur la même ligne du tableau.

   Ces règles sont écrites trois fois — ici, dans serve.py, et décrites en tête
   de build/rev-panneau.js. build/controle-revendications.js compare les trois
   implémentations sur toutes les données réelles.
   =========================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const SRC_PUBLIE = path.join(ROOT, "build", "revendications.json");
const DIR_PROPOSES = path.join(ROOT, "demandes_revendications");
const DIR_VOTES = path.join(ROOT, "votes");
const SRC_ANNUAIRE = path.join(ROOT, "build", "ecoles-raw.json");
const OUT_PAGE = path.join(ROOT, "build", "revendications.js");

/* ------------------------------------------------------------------ outils */

/** « Lycée Cœur  Aliker! » -> « lycee coeur aliker ». Les ligatures sont
    dépliées avant la décomposition, car « Cœur » ne se décompose pas comme
    « é » : c'est ce qui a été écrit dans serve.py. */
function comparable(s) {
  return String(s == null ? "" : s)
    .replace(/[\u0152\u0153]/g, (c) => (c === "\u0152" ? "OE" : "oe"))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** L'identifiant d'une revendication. Voir l'en-tête : c'est une règle
    partagée, elle doit rendre le même résultat partout. */
function identifiant(cle, titre) {
  const empreinte = crypto.createHash("sha1")
    .update(cle + "|" + comparable(titre), "utf8")
    .digest("hex");
  return "r" + empreinte.slice(0, 10);
}

const cle = (code, nom) => String(code || "").trim() + "|" + String(nom || "").trim();

function lireJSON(fichier, defaut) {
  try {
    return JSON.parse(fs.readFileSync(fichier, "utf8"));
  } catch (e) {
    if (e.code !== "ENOENT") {
      console.warn("  ! " + path.relative(ROOT, fichier) + " illisible : " + e.message);
    }
    return defaut;
  }
}

/** Les .json d'un dossier, dans l'ordre du nom — donc par jour, puis par
    heure : c'est l'ordre dans lequel les propositions sont arrivées. */
function fichiersJSON(dossier) {
  let noms;
  try {
    noms = fs.readdirSync(dossier);
  } catch (e) {
    return [];
  }
  return noms
    .filter((n) => n.endsWith(".json"))
    .sort()
    .map((n) => ({
      nom: n,
      chemin: path.join(dossier, n),
      contenu: lireJSON(path.join(dossier, n), null),
    }));
}

/** L'annuaire, réduit à l'ensemble des « code|nom » : sert à dire si une clé
    désigne un établissement connu. On ne garde que l'ensemble, pas la liste. */
function clesAnnuaire() {
  const brut = lireJSON(SRC_ANNUAIRE, []);
  const set = new Set();
  (Array.isArray(brut) ? brut : []).forEach((e) => {
    if (!e || !e.code_commune || !e.nom_etablissement) return;
    set.add(cle(e.code_commune, e.nom_etablissement));
  });
  return set;
}

/* ------------------------------------------------------------- les comptes */

/** Les votes du dossier : par établissement, par revendication, et les
    appareils par établissement — c'est de là que vient « N élèves ont voté
    dans ce lycée ». Un fichier illisible est compté à part et signalé : jamais
    avalé en silence. */
function compterVotes() {
  const parRev = {};      // cle -> rid -> {pour, contre}
  const votants = {};     // cle -> nombre d'appareils distincts
  const appareils = {};   // cle -> ensemble d'appareils
  const parAppareil = {}; // appareil -> {rid: choix}
  const illisibles = [];
  let total = 0;

  fichiersJSON(DIR_VOTES).forEach((f) => {
    const v = f.contenu;
    total++;
    const sens = v && (v.choix === "pour" || v.choix === "contre") ? v.choix : null;
    const app = v ? String(v.appareil || "") : "";
    if (!v || typeof v !== "object" || !v.etablissement || !v.revendication ||
        !sens || !/^[A-Za-z0-9_-]{8,64}$/.test(app)) {
      illisibles.push(f.nom);
      return;
    }
    const c = v.etablissement;
    parRev[c] = parRev[c] || {};
    parRev[c][v.revendication] = parRev[c][v.revendication] || { pour: 0, contre: 0 };
    parRev[c][v.revendication][sens]++;
    (appareils[c] = appareils[c] || new Set()).add(app);
    parAppareil[app] = parAppareil[app] || {};
    parAppareil[app][v.revendication] = sens;
  });

  Object.keys(appareils).forEach((c) => { votants[c] = appareils[c].size; });
  return { parRev, votants, parAppareil, illisibles, total };
}

/* ---------------------------------------------------------- la construction */

/** Les revendications retenues, dans l'ordre du fichier. */
function lirePubliees() {
  const src = lireJSON(SRC_PUBLIE, null);
  const table = { etablissements: {} };
  const problemes = [];
  if (src === null) {
    problemes.push("build/revendications.json est absent ou illisible");
    return { table, problemes };
  }
  Object.keys(src.etablissements || {}).forEach((c) => {
    const e = (src.etablissements || {})[c] || {};
    const items = [];
    (e.revendications || []).forEach((r) => {
      const titre = String((r && r.titre) || "").trim();
      if (!titre) {
        problemes.push(c + " : une revendication sans titre a été ignorée");
        return;
      }
      items.push({
        id: identifiant(c, titre),
        titre,
        description: String((r && r.description) || ""),
        etat: "publiee",
        publiee_le: String((r && r.publiee_le) || ""),
        source: String((r && r.source) || ""),
        proposeurs: 1,
      });
    });
    if (!items.length) return;
    table.etablissements[c] = {
      code: String(e.code || c.split("|")[0]),
      nom: String(e.nom || c.split("|").slice(1).join("|")),
      dep: String(e.departement || ""),
      revendications: items,
    };
  });
  return { table, problemes };
}

/** Les propositions des visiteurs, regroupées : deux personnes qui écrivent
    le même titre pour le même établissement donnent une seule ligne, et l'on
    compte combien de propositions elle a reçues.

    Le formulaire ne permet plus d'écrire un titre : il fait choisir une
    revendication de la liste nationale (voir build/extraire-rev-nationales.js).
    La demande emporte donc le texte de cette revendication, et c'est lui qui
    sert de description à la ligne quand l'élève n'a rien ajouté de personnel —
    sinon le tableau afficherait un titre sans rien en dessous. */
function lirePropositions() {
  const vues = [];
  const parId = {};
  fichiersJSON(DIR_PROPOSES).forEach((f) => {
    const v = f.contenu;
    if (!v || typeof v !== "object") return;
    const titre = String(v.titre || "").trim();
    const c = cle(v.code_insee_commune, v.etablissement);
    if (!titre || c === "|") return;
    const id = identifiant(c, titre);
    let vue = parId[id];
    if (!vue) {
      vue = parId[id] = {
        id, cle: c, titre,
        description: String(v.description || v.texte_national || ""),
        type: String(v.type || ""),
        dep: String(v.departement || ""),
        premier: f.nom,
        fichiers: [],
      };
      vues.push(vue);
    }
    vue.fichiers.push(f.nom);
  });
  return vues;
}

/** Les propositions rejoignent la table des retenues, en fin de liste et avec
    leur état. Une proposition dont le titre est déjà retenu ne fait pas
    double emploi : elle ne compte que comme proposeur supplémentaire. */
function fusionner(table, propositions) {
  for (const v of propositions) {
    const c = v.cle;
    const lot = table.etablissements[c] || {
      code: c.split("|")[0],
      nom: c.split("|").slice(1).join("|"),
      dep: v.dep,
      revendications: [],
    };
    const deja = lot.revendications.find((r) => r.id === v.id);
    if (deja) {
      deja.proposeurs = 1 + v.fichiers.length;
      table.etablissements[c] = lot;
      continue;
    }
    lot.revendications.push({
      id: v.id,
      titre: v.titre,
      description: v.description,
      etat: "proposee",
      publiee_le: "",
      source: v.premier,
      proposeurs: v.fichiers.length,
    });
    table.etablissements[c] = lot;
  }
  return table;
}

/* ------------------------------------------------------------------ sortie */

/** Le fichier que les pages lisent. Les retenues d'abord, les propositions
    ensuite : le tableau d'un lycée commence par ce qui a été validé, et ce qui
    attend une lecture se lit à la suite. */
function ecrirePage(etable, votes) {
  const etablissements = {};
  let nombreItems = 0;
  let nombreProposees = 0;
  Object.keys(etable.etablissements).sort().forEach((c) => {
    const e = etable.etablissements[c];
    const revendications = e.revendications.map((r) => {
      const t = (votes.parRev[c] && votes.parRev[c][r.id]) || { pour: 0, contre: 0 };
      if (r.etat === "proposee") nombreProposees++;
      return {
        id: r.id,
        titre: r.titre,
        description: r.description,
        etat: r.etat,
        publiee_le: r.publiee_le || "",
        proposee_le: r.source ? r.source.slice(0, 10) : "",
        proposeurs: r.proposeurs || 1,
        pour: t.pour,
        contre: t.contre,
      };
    });
    nombreItems += revendications.length;
    etablissements[c] = {
      code: e.code,
      nom: e.nom,
      dep: e.dep,
      revendications,
      votants: votes.votants[c] || 0,
    };
  });

  const entete = [
    "/* ===========================================================================",
    "   revendications.js — les revendications d'établissement, pour les pages.",
    "",
    "   FICHIER GÉNÉRÉ : ne pas le modifier à la main.",
    "   Sources : build/revendications.json (les revendications retenues, relues à",
    "   la main), demandes_revendications/ (les propositions) et votes/ (les comptes",
    "   de voix, figés au moment de la génération).",
    "   Régénérer : node build/import-revendications.js",
    "",
    "   Chaque ligne porte son état :",
    "     etat « publiee »  — retenue, relue, publiée dans le tableau de l'établissement.",
    "     etat « proposee » — proposition d'un élève, en attente de relecture. Elle",
    "                        s'affiche quand même : c'est son lycée, et c'est là",
    "                        qu'elle sera votée et discutée. Elle ne rejoint la liste",
    "                        nationale de revendications.html qu'après relecture.",
    "",
    "   Clé d'un établissement : « codeInsee|nom », le nom de l'annuaire.",
    "   Identifiant d'une revendication : « r » + 10 chiffres du SHA-1 de",
    "   « clé|titre comparable » — calculé, jamais attribué, donc stable quand une",
    "   proposition devient retenue. C'est lui qui relie une ligne à ses votes.",
    "   =========================================================================== */",
    "",
  ].join("\n");

  const corps =
    entete +
    "\nwindow.REVENDICATIONS = {\n" +
    "  genere_le: " + JSON.stringify(new Date().toISOString().slice(0, 19)) + ",\n" +
    "  etablissements: " + JSON.stringify(etablissements, null, 2).replace(/\n/g, "\n  ") + ",\n" +
    "};\n";

  if (DRY) {
    console.log("  (dry) build/revendications.js : " + nombreItems + " ligne" +
      (nombreItems > 1 ? "s" : "") + " dont " + nombreProposees + " à relire, dans " +
      Object.keys(etablissements).length + " établissement" +
      (Object.keys(etablissements).length > 1 ? "s" : "") + ".");
    return;
  }
  fs.writeFileSync(OUT_PAGE, corps, "utf8");
  console.log("  build/revendications.js  " + (Buffer.byteLength(corps, "utf8") / 1024).toFixed(1) +
    " Ko  " + nombreItems + " ligne" + (nombreItems > 1 ? "s" : "") +
    " (" + nombreProposees + " à relire) · " +
    Object.keys(etablissements).length + " établissement" +
    (Object.keys(etablissements).length > 1 ? "s" : "") + " · " +
    votes.total + " vote" + (votes.total > 1 ? "s" : ""));
}

/* -------------------------------------------------------------- l'exécution */

console.log("Revendications d'établissement");
const votes = compterVotes();
const { table, problemes } = lirePubliees();
const propositions = lirePropositions();
const annuaire = clesAnnuaire();
fusionner(table, propositions);

/* Les clés qui ne désignent rien : un nom d'établissement que l'annuaire ne
   connaît pas ne peut pas apparaître dans le panneau d'un établissement, et
   ses votes ne seraient comptés par personne. */
const inconnues = new Set();
Object.keys(table.etablissements).forEach((c) => {
  if (annuaire.size && !annuaire.has(c)) inconnues.add(c);
});

/* Les votes qui ne désignent plus rien : une revendication retirée du fichier
   des retenues laisse ses votes orphelins. Mieux vaut le dire que les perdre
   en silence. */
const connues = new Set();
Object.keys(table.etablissements).forEach((c) => {
  table.etablissements[c].revendications.forEach((r) => connues.add(c + "/" + r.id));
});
const orphelins = [];
Object.keys(votes.parRev).forEach((c) => {
  Object.keys(votes.parRev[c]).forEach((rid) => {
    if (!connues.has(c + "/" + rid)) orphelins.push(c + " · " + rid);
  });
});

/* Les clés mal formées : « 5 chiffres|nom ». */
const malformees = Object.keys(table.etablissements).filter((c) => {
  const i = c.indexOf("|");
  return i !== 5 || !/^\d{5}$/.test(c.slice(0, 5)) || !c.slice(i + 1);
});

if (problemes.length) console.log("\n  ! " + problemes.join("\n  ! "));
if (malformees.length) {
  console.log("\n  ! clé mal formée (attendu « 5 chiffres|nom ») : " + malformees.join(", "));
}
if (inconnues.size) {
  const liste = [...inconnues];
  console.log("\n  ! " + liste.length + " clé" + (liste.length > 1 ? "s" : "") +
    " hors annuaire — le panneau ne saura pas les afficher :");
  liste.slice(0, 12).forEach((c) => console.log("      " + c));
  if (liste.length > 12) console.log("      … et " + (liste.length - 12) + " autre" + (liste.length > 12 ? "s" : ""));
}
if (votes.illisibles.length) {
  console.log("\n  ! " + votes.illisibles.length + " fichier" + (votes.illisibles.length > 1 ? "s" : "") +
    " de vote illisible" + (votes.illisibles.length > 1 ? "s" : "") + ", ignoré" +
    (votes.illisibles.length > 1 ? "s" : "") + " :");
  votes.illisibles.slice(0, 8).forEach((n) => console.log("      " + n));
}
if (orphelins.length) {
  console.log("\n  ! " + orphelins.length + " vote" + (orphelins.length > 1 ? "s" : "") +
    " ne correspondant à aucune revendication (retenue ou proposée) :");
  orphelins.slice(0, 8).forEach((o) => console.log("      " + o));
}

if (propositions.length) {
  console.log("\n  " + propositions.length + " proposition" + (propositions.length > 1 ? "s" : "") +
    " à relire dans demandes_revendications/ :");
  propositions.forEach((v) => {
    console.log("\n    " + v.titre);
    console.log("      " + v.cle + (v.type ? "  [" + v.type + "]" : "") +
      (v.fichiers.length > 1 ? "  · " + v.fichiers.length + " propositions pour ce même titre" : ""));
    if (v.description) console.log("      " + v.description.replace(/\s+/g, " ").slice(0, 200));
    if (connues.has(v.cle + "/" + v.id) &&
        table.etablissements[v.cle].revendications.find((r) => r.id === v.id).etat === "publiee") {
      console.log("      déjà retenue — sa demande reste dans le dossier, c'est normal.");
      return;
    }
    /* Le bloc à coller : il est fait pour être collé tel quel, et l'identifiant
       n'y figure pas puisqu'il est calculé. */
    console.log("      à coller dans build/revendications.json :");
    const bloc = {};
    bloc[v.cle] = {
      code: v.cle.split("|")[0],
      nom: v.cle.split("|").slice(1).join("|"),
      departement: v.dep,
      revendications: [{
        titre: v.titre,
        description: v.description,
        publiee_le: new Date().toISOString().slice(0, 10),
        source: v.premier,
      }],
    };
    console.log("      " + JSON.stringify(bloc, null, 2).replace(/\n/g, "\n      "));
  });
} else {
  console.log("\n  aucune proposition en attente.");
}

ecrirePage(table, votes);