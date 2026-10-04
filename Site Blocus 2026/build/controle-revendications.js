/* ===========================================================================
   controle-revendications.js — vérifie le système de revendications
   d'établissement.

   Les règles de ce système sont écrites trois fois, dans trois langages, parce
   qu'elles servent à trois endroits qui ne se parlent pas :

     build/import-revendications.js   écrit les données des pages (Node)
     serve.py                         écrit et compte les votes (Python)
     build/rev-panneau.js            écrit le tableau du panneau (JS)

   La clé d'un établissement et l'identifiant d'une revendication sont calculés
   dans les trois. S'ils divergent, rien ne casse visiblement : une ligne se
   retrouve sans ses votes, ou des votes restent orphelins, et le pourcentage
   affiché est faux sans que rien ne le dise. Ce contrôleur exécute donc les
   trois implémentations sur les données réelles et compare.

   Il vérifie aussi que le fichier généré correspond bien à sa source, que
   chaque clé désigne un établissement de l'annuaire, qu'aucun vote ne désigne
   une revendication disparue, et que la liste de l'onglet Revendications — la
   seule d'où viennent les revendications — est à jour et respectée.

       node build/controle-revendications.js

   Sortie : « rien à signaler », ou la liste des problèmes.
   =========================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const SRC_PUBLIE = path.join(ROOT, "build", "revendications.json");
const PAGE = path.join(ROOT, "build", "revendications.js");
const DIR_PROPOSES = path.join(ROOT, "demandes_revendications");
const DIR_VOTES = path.join(ROOT, "votes");
const SRC_ANNUAIRE = path.join(ROOT, "build", "ecoles-raw.json");
const SRC_NATIONALES = path.join(ROOT, "build", "rev-nationales.json");

const problemes = [];
const signaler = (quoi) => problemes.push(quoi);

function lireJSON(fichier, defaut) {
  try {
    return JSON.parse(fs.readFileSync(fichier, "utf8"));
  } catch (e) {
    if (e.code !== "ENOENT") signaler(path.relative(ROOT, fichier) + " illisible : " + e.message);
    return defaut;
  }
}

function fichiersJSON(dossier) {
  let noms;
  try {
    noms = fs.readdirSync(dossier);
  } catch (e) {
    return [];
  }
  return noms.filter((n) => n.endsWith(".json")).sort()
    .map((n) => ({ nom: n, contenu: lireJSON(path.join(dossier, n), null) }));
}

/* --- les trois implémentations de la règle -------------------------------- */

const comparable = (s) => String(s == null ? "" : s)
  .replace(/[\u0152\u0153]/g, (c) => (c === "\u0152" ? "OE" : "oe"))
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const cle = (code, nom) => String(code || "").trim() + "|" + String(nom || "").trim();

const idNode = (c, titre) => "r" + crypto.createHash("sha1")
  .update(c + "|" + comparable(titre), "utf8").digest("hex").slice(0, 10);

/** Les deux fonctions de serve.py, appelées pour de vrai : on ne recopie pas
    la règle, on l'exécute.

    Le passage se fait en base 64 dans les deux sens. Ce n'est pas une
    précaution inutile : Windows lit l'entrée standard de Python dans la page
    de codes du système, et un « Cœur » envoyé en UTF-8 y arrive déformé — les
    deux implémentations rendraient alors deux identifiants différents pour le
    même titre, et le contrôle croirait à tort que le site est cassé alors que
    c'est le contrôle qui l'est. */
const py = `
import base64, json, sys, importlib.util
spec = importlib.util.spec_from_file_location("serve", sys.argv[1])
serve = importlib.util.module_from_spec(spec)
spec.loader.exec_module(serve)
entrees = json.loads(base64.b64decode(sys.stdin.read()).decode("utf-8"))
sortie = []
for code, nom, titre, cas in entrees:
    c = serve.cle_etablissement(code, nom)
    sortie.append({
        "cas": cas,
        "comparable": serve.comparable(titre),
        "cle": c,
        "id": serve.id_revendication(c, titre),
    })
sys.stdout.write(base64.b64encode(json.dumps(sortie, ensure_ascii=False).encode("utf-8")).decode("ascii"))
`;

let pyDispo = true;
function comparerPython(cases) {
  if (!pyDispo) return null;
  try {
    const brut = execFileSync("python", ["-c", py, path.join(ROOT, "serve.py")], {
      input: Buffer.from(JSON.stringify(cases), "utf8").toString("base64"),
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });
    return JSON.parse(Buffer.from(String(brut).trim(), "base64").toString("utf8"));
  } catch (e) {
    pyDispo = false;
    console.log("  (python indisponible : la comparaison avec serve.py est sautée — " +
      String(e.message).split("\n")[0] + ")");
    return null;
  }
}

/* --- les données --------------------------------------------------------- */

const publie = lireJSON(SRC_PUBLIE, null);
/* le fichier des pages est du JavaScript : on l'évalue dans une fenêtre factice,
   c'est le moyen le plus simple de vérifier qu'il est valide et d'y lire les
   données. `window` y est un paramètre, donc c'est lui qui reçoit l'affectation. */
const page = (() => {
  const src = fs.readFileSync(PAGE, "utf8");
  const fenetre = {};
  try {
    new Function("window", src)(fenetre);
  } catch (e) {
    signaler("build/revendications.js ne s'évalue pas : " + e.message);
    return null;
  }
  return fenetre.REVENDICATIONS || null;
})();

if (!publie) signaler("build/revendications.json est absent ou illisible");
if (!page) {
  console.log("\n  ! la vérification s'arrête là : le fichier des pages est illisible.");
  process.exit(1);
}

const propositions = fichiersJSON(DIR_PROPOSES);
const votes = fichiersJSON(DIR_VOTES);

/* --- 1. le fichier généré correspond-il à sa source ? -------------------- */

const attendus = {};
(function attendu() {
  const table = {};
  Object.keys((publie && publie.etablissements) || {}).forEach((c) => {
    const e = publie.etablissements[c] || {};
    (e.revendications || []).forEach((r) => {
      const titre = String((r && r.titre) || "").trim();
      if (!titre) return;
      table[c] = table[c] || new Set();
      table[c].add(idNode(c, titre));
    });
  });
  propositions.forEach((f) => {
    const v = f.contenu;
    if (!v || typeof v !== "object") return;
    const titre = String(v.titre || "").trim();
    const c = cle(v.code_insee_commune, v.etablissement);
    if (!titre || c === "|") return;
    table[c] = table[c] || new Set();
    table[c].add(idNode(c, titre));
  });
  Object.keys(table).forEach((c) => { attendus[c] = table[c]; });
})();

const lus = (page && page.etablissements) || {};
Object.keys(attendus).forEach((c) => {
  if (!lus[c]) {
    signaler("« " + c + " » est dans la source mais pas dans build/revendications.js " +
      "— le générateur n'a pas été relancé ?");
    return;
  }
  const ids = new Set(lus[c].revendications.map((r) => r.id));
  attendus[c].forEach((id) => {
    if (!ids.has(id)) signaler("« " + c + " » : la revendication " + id +
      " manque dans build/revendications.js");
  });
});
/* Et l'autre sens : une ligne du fichier des pages que rien ne justifie plus,
   c'est une revendication retirée de la source dont le fichier n'a pas été
   régénéré. */
Object.keys(lus).forEach((c) => {
  const connus = attendus[c] || new Set();
  lus[c].revendications.forEach((r) => {
    if (!connus.has(r.id)) {
      signaler("« " + c + " » : la revendication " + r.id + " est dans " +
        "build/revendications.js mais plus dans aucune source");
    }
  });
});

/* Les identifiants écrits dans le fichier des pages doivent être exactement
   ceux que la règle calcule : c'est le même test, mais sur les données telles
   qu'elles sont publiées. */
Object.keys(lus).forEach((c) => {
  lus[c].revendications.forEach((r) => {
    const attendu = idNode(c, r.titre);
    if (r.id !== attendu) {
      signaler("« " + c + " » : l'identifiant " + r.id + " ne correspond pas au titre " +
        JSON.stringify(r.titre) + " (attendu " + attendu + ")");
    }
  });
});

/* --- 2. les trois implémentations de la règle concordent-elles ? ------------ */

const cas = [];
const ajouterCas = (code, nom, titre, etiquette) => {
  cas.push([String(code || ""), String(nom || ""), String(titre || ""), etiquette]);
};
Object.keys(publie && publie.etablissements ? publie.etablissements : {}).forEach((c) => {
  (publie.etablissements[c].revendications || []).forEach((r) => {
    ajouterCas(c.split("|")[0], c.split("|").slice(1).join("|"), r.titre, "publiee");
  });
});
propositions.forEach((f) => {
  const v = f.contenu;
  if (v && v.titre) ajouterCas(v.code_insee_commune, v.etablissement, v.titre, "proposee");
});
Object.keys(lus).forEach((c) => {
  lus[c].revendications.forEach((r) => {
    ajouterCas(c.split("|")[0], c.split("|").slice(1).join("|"), r.titre, "page");
  });
});

/* Des cas qui n'ont rien à voir avec les données réelles : c'est là que deux
   implémentations se distinguent, sur les accents, les ligatures, la casse, la
   ponctuation et les espaces. */
[
  ["37072", "Collège Alcuin", "Des moyens en maths"],
  ["37072", "Collège Alcuin", "des MOYENS  en maths !"],
  ["37072", "Collège Alcuin", "Cœur de cour"],
  ["37072", "Collège Alcuin", "Coeur de cour"],
  ["37072", "Collège Alcuin", "  Des   moyens\ten maths\n"],
  ["97400", "Lycée Schœlcher", "Une cafetéria"],
  ["97400", "Lycée Schœlcher", "Une cafeteria"],
  ["2A", "Lycée du Porta", "L winters, pour les élèves"],
  ["2A", "Lycée du Porta", "L winters pour les élèves"],
].forEach(([c, n, t]) => ajouterCas(c, n, t, "sonde"));

const pySortie = comparerPython(cas);
if (pySortie) {
  if (pySortie.length !== cas.length) {
    signaler("serve.py a rendu " + pySortie.length + " résultats pour " + cas.length +
      " cas : la comparaison est faussée");
  }
  let ecarts = 0;
  cas.forEach(([code, nom, titre, etiquette], i) => {
    const p = pySortie[i];
    if (!p) return;
    if (p.cle !== cle(code, nom)) {
      signaler("clé : Python « " + p.cle + " » et Node « " + cle(code, nom) +
        " » divergent (" + etiquette + ")");
      ecarts++;
    }
    if (p.comparable !== comparable(titre)) {
      signaler("titre comparable : Python « " + p.comparable + " » et Node « " +
        comparable(titre) + " » divergent (" + etiquette + ")");
      ecarts++;
    }
    if (p.id !== idNode(cle(code, nom), titre)) {
      signaler("identifiant : Python " + p.id + " et Node " + idNode(cle(code, nom), titre) +
        " divergent (" + etiquette + ", « " + titre + " »)");
      ecarts++;
    }
    if (ecarts > 6) return;
  });
}

/* --- 3. chaque clé désigne-t-elle un établissement de l'annuaire ? --------- */

const annuaire = new Set();
((() => {
  const brut = lireJSON(SRC_ANNUAIRE, []);
  (Array.isArray(brut) ? brut : []).forEach((e) => {
    if (e && e.code_commune && e.nom_etablissement) annuaire.add(cle(e.code_commune, e.nom_etablissement));
  });
})());

if (annuaire.size) {
  Object.keys(lus).forEach((c) => {
    const i = c.indexOf("|");
    if (i !== 5 || !/^\d{5}$/.test(c.slice(0, 5)) || !c.slice(i + 1)) {
      signaler("clé mal formée « " + c + " » (attendu « 5 chiffres|nom »)");
    } else if (!annuaire.has(c)) {
      signaler("« " + c + " » n'est pas dans l'annuaire : le panneau ne l'affichera pas");
    }
  });
  propositions.forEach((f) => {
    const v = f.contenu;
    if (!v || !v.etablissement) return;
    const c = cle(v.code_insee_commune, v.etablissement);
    if (!annuaire.has(c)) {
      signaler(f.nom + " : « " + c + " » n'est pas dans l'annuaire");
    }
  });
}

/* --- 4. les comptes du fichier des pages sont-ils justes ? ---------------- */

const comptes = {};
let totalFichiers = 0;
votes.forEach((f) => {
  const v = f.contenu;
  totalFichiers++;
  const sens = v && (v.choix === "pour" || v.choix === "contre") ? v.choix : null;
  if (!v || typeof v !== "object" || !v.etablissement || !v.revendication || !sens) {
    signaler("votes/" + f.nom + " : vote illisible (il sera ignoré)");
    return;
  }
  const l = comptes[v.etablissement] = comptes[v.etablissement] || { parRev: {}, appareils: new Set() };
  l.parRev[v.revendication] = l.parRev[v.revendication] || { pour: 0, contre: 0 };
  l.parRev[v.revendication][sens]++;
  l.appareils.add(String(v.appareil || ""));
});

Object.keys(lus).forEach((c) => {
  const attendu = comptes[c];
  lus[c].revendications.forEach((r) => {
    const t = (attendu && attendu.parRev[r.id]) || { pour: 0, contre: 0 };
    if (r.pour !== t.pour || r.contre !== t.contre) {
      signaler("« " + c + " » · " + r.id + " : le fichier des pages dit " +
        r.pour + "/" + r.contre + ", les votes disent " + t.pour + "/" + t.contre +
        " — le générateur n'a pas été relancé ?");
    }
    const somme = (r.pour || 0) + (r.contre || 0);
    if (somme > (attendu ? attendu.appareils.size : 0)) {
      signaler("« " + c + " » · " + r.id + " : " + somme +
        " voix pour un établissement qui n'a que " +
        (attendu ? attendu.appareils.size : 0) + " votants");
    }
  });
  const votants = attendu ? attendu.appareils.size : 0;
  if ((lus[c].votants || 0) !== votants) {
    signaler("« " + c + " » : le fichier des pages annonce " + (lus[c].votants || 0) +
      " votants, les fichiers de vote en comptent " + votants);
  }
});

/* Un vote qui ne désigne plus rien : la revendication a disparu de la source,
   ses voix ne sont comptées par personne. */
Object.keys(comptes).forEach((c) => {
  const ids = new Set((lus[c] ? lus[c].revendications : []).map((r) => r.id));
  Object.keys(comptes[c].parRev).forEach((id) => {
    if (!ids.has(id)) {
      signaler("votes pour « " + c + " » · " + id +
        " : cette revendication n'existe plus (compte perdu, à relire)");
    }
  });
});

/* --- 5. la liste nationale : à jour, et respectée ? ---------------------- */

/* Le formulaire ne propose que les revendications de la page, et le serveur
   refuse les autres. Deux conséquences qu'on vérifie ici :

     * les deux fichiers tirés de la page (build/rev-nationales.json pour
       serve.py, build/rev-nationales.js pour le menu) doivent être à jour ;
     * toute revendication retenue ou proposée doit être dans la liste, sinon
       une ligne du tableau que personne ne pourrait avoir choisie. */
let nationalesOk = true;
try {
  execFileSync("node", [path.join(ROOT, "build", "extraire-rev-nationales.js"), "--verifier"], {
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  });
} catch (e) {
  nationalesOk = false;
  String((e.stdout || "") + (e.stderr || ""))
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith("·"))
    .forEach((l) => signaler(l.replace(/^·\s*/, "")));
  if (!problemes.length) {
    signaler("build/extraire-rev-nationales.js --verifier a échoué : " +
      String(e.message).split("\n")[0]);
  }
}

const nationales = new Set(
  (((lireJSON(SRC_NATIONALES, null) || {}).revendications) || [])
    .map((r) => comparable(r && r.titre))
);
if (nationales.size) {
  const titres = [];
  Object.keys((publie && publie.etablissements) || {}).forEach((c) => {
    ((publie.etablissements[c].revendications) || []).forEach((r) => {
      titres.push([c, r.titre, "retenue"]);
    });
  });
  propositions.forEach((f) => {
    const v = f.contenu;
    if (v && v.titre) titres.push([cle(v.code_insee_commune, v.etablissement), v.titre, f.nom]);
  });
  titres.forEach(([c, titre, ou]) => {
    if (!nationales.has(comparable(titre))) {
      signaler("« " + String(titre) + " » n'est pas dans la liste de l'onglet " +
        "Revendications (" + ou + ", établissement « " + c + " ») : le serveur " +
        "refuserait cette revendication");
    }
  });
}

/* --- 6. le panneau et le formulaire sont-ils branchés ? -------------------- */

const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
[
  ["build/rev-panneau.js", /<script src="build\/rev-panneau\.js">/],
  ["build/appareil.js", /<script src="build\/appareil\.js">/],
  ["build/revendications.js", /<script src="build\/revendications\.js">/],
  ["build/rev-panneau.css", /<link rel="stylesheet" href="build\/rev-panneau\.css">/],
  ["l'appel au panneau", /REV\.rendre\(\{/],
].forEach(([quoi, motif]) => {
  if (!motif.test(index)) signaler("index.html : " + quoi + " n'est plus branché");
});

const form = fs.readFileSync(path.join(ROOT, "ajouter-une-revendication.html"), "utf8");
[
  ["build/porte-ecole.js", /<script src="build\/porte-ecole\.js">/],
  ["build/appareil.js", /<script src="build\/appareil\.js">/],
  ["build/rev-nationales.js", /<script src="build\/rev-nationales\.js">/],
  ["build/revendiquer.js", /<script src="build\/revendiquer\.js">/],
  ["le menu des départements", /id="dep"/],
  ["le menu des établissements", /id="eta"/],
  ["le menu des revendications", /id="revendication"/],
  ["la certification", /id="certifie"/],
].forEach(([quoi, motif]) => {
  if (!motif.test(form)) signaler("ajouter-une-revendication.html : " + quoi + " a disparu");
});
/* Et l'inverse, qui compte autant : le champ où l'on écrirait un titre ne doit
   plus exister, puisque le serveur refuserait ce qu'on y mettrait. */
if (/id="titre"/.test(form)) {
  signaler("ajouter-une-revendication.html : il y a encore un champ « titre » libre — " +
    "on ne peut plus choisir qu'une revendication de la liste");
}

/* --- le verdict ---------------------------------------------------------- */

console.log("\nContrôle des revendications d'établissement");
console.log("  données : " + Object.keys(lus).length + " établissement(s), " +
  Object.keys(lus).reduce((n, c) => n + lus[c].revendications.length, 0) +
  " ligne(s), " + propositions.length + " proposition(s), " +
  totalFichiers + " vote(s).");
console.log("  comparaison des règles : Node, le panneau et " +
  (pyDispo ? "serve.py" : "(serve.py non testé)"));
console.log("  liste nationale : " +
  (nationales.size ? nationales.size + " revendication(s)" : "(liste illisible)"));

if (!problemes.length) {
  console.log("\n  rien à signaler.");
  process.exit(0);
}
const uniques = [...new Set(problemes)];
console.log("\n  " + uniques.length + " problème" + (uniques.length > 1 ? "s" : "") + " :");
uniques.forEach((p) => console.log("    · " + p));
process.exit(1);