/* ===========================================================================
   extraire-rev-nationales.js — la liste de revendications.html, en données.

   Le formulaire d'« Ajouter une revendication » ne propose plus d'écrire une
   phrase : on y choisit une des revendications de la page Revendications. Le
   formulaire a donc besoin de cette liste, et il ne peut pas l'inventer.

   C'est cette page qui en est la source : pas une seconde liste à recopier,
   qui divergerait. Le script lit le <ul class="list"> de revendications.html et
   en tire deux fichiers :

     build/rev-nationales.json  — pour serve.py, qui refuse toute revendication
                                  qui ne serait pas dans la liste ;
     build/rev-nationales.js    — pour les pages, qui remplissent le menu.

   Les deux sont générés : ils ne s'éditent pas. Après avoir ajouté, retiré ou
   reformulé une revendication dans la page, on relance ce script, et
   build/controle-revendications.js signale s'il a été oublié.

   Le format de la page est stable depuis le début : une revendication est un
   <li class="list-item"> avec un <h4 class="item-title"> et un
   <p class="item-text">.

       node build/extraire-rev-nationales.js
       node build/extraire-rev-nationales.js --verifier   (n'écrit rien)
   =========================================================================== */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PAGE = path.join(ROOT, "revendications.html");
const SORTIE_JSON = path.join(ROOT, "build", "rev-nationales.json");
const SORTIE_JS = path.join(ROOT, "build", "rev-nationales.js");

/** Les entités HTML que la page peut contenir. Une liste courte et lisible
    vaut mieux qu'un analyseur complet : si la page en sort une autre, le
    script la signale plutôt que de la deviner. */
const ENTITES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&laquo;": "«",
  "&raquo;": "»",
  "&rsquo;": "’",
  "&eacute;": "é",
  "&egrave;": "è",
  "&agrave;": "à",
  "&ecirc;": "ê",
  "&ocirc;": "ô",
  "&ccedil;": "ç",
  "&ugrave;": "ù",
};

function detexter(brut) {
  const reste = String(brut || "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-zA-Z#0-9]+;/g, (ent) => (ent in ENTITES ? ENTITES[ent] : ent));
  return reste.replace(/\s+/g, " ").trim();
}

/** Les items de la page, dans l'ordre où ils sont écrits. */
function extraire(source) {
  const bloc = source.match(/<ul class="list">([\s\S]*?)<\/ul>/);
  if (!bloc) {
    console.error(
      "  !ajuout pas de <ul class=\"list\"> dans revendications.html : la page a " +
        "changé de forme, et le formulaire n'aurait plus de liste à proposer."
    );
    process.exit(1);
  }
  const items = [];
  const motif = /<li class="list-item">([\s\S]*?)<\/li>/g;
  let m;
  while ((m = motif.exec(bloc[1])) !== null) {
    const titre = m[1].match(/<h4 class="item-title">([\s\S]*?)<\/h4>/);
    const texte = m[1].match(/<p class="item-text">([\s\S]*?)<\/p>/);
    if (!titre) continue;
    items.push({
      titre: detexter(titre[1]),
      texte: texte ? detexter(texte[1]) : "",
    });
  }
  return items;
}

function controler(items) {
  const problemes = [];
  if (!items.length) problemes.push("aucune revendication trouvée");
  const vues = new Set();
  items.forEach((r, i) => {
    const ou = `revendication ${i + 1} (« ${r.titre} »)`;
    if (!r.titre) problemes.push(`${ou} : le titre est vide`);
    if (!r.texte) problemes.push(`${ou} : pas de texte`);
    /* Deux titres qui ne diffèrent que par la casse ou les accents
       disparaîtraient l'un dans l'autre au moment de calculer l'identifiant :
       il faut le voir ici, pas dans un tableau de pourcentages. */
    const plat = detexter(r.titre)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    if (vues.has(plat)) {
      problemes.push(`${ou} : le même titre qu'une autre, à la casse près`);
    }
    vues.add(plat);
    if (r.titre.length > 120) {
      problemes.push(`${ou} : le titre fait ${r.titre.length} caractères`);
    }
  });
  return problemes;
}

const items = extraire(fs.readFileSync(PAGE, "utf8"));
const problemes = controler(items);

const donnees = {
  version: 1,
  source: "revendications.html",
  note:
    "Généré par build/extraire-rev-nationales.js — ne pas éditer. La liste " +
    "nationale est écrite à la main dans la page ; c'est elle qui fait foi.",
  revendications: items,
};

const json = JSON.stringify(donnees, null, 2) + "\n";

const js = `/* ===========================================================================
   rev-nationales.js — les revendications de la page Revendications, en données.

   Généré par build/extraire-rev-nationales.js : ne pas éditer. La page
   revendications.html est la source, et elle est écrite à la main ; ce fichier
   n'en est qu'une copie lisible par un <select>, et serve.py la vérifie dans
   build/rev-nationales.json avant d'accepter une revendication.

   ${items.length} revendications.
   =========================================================================== */

window.REV_NATIONALES = ${JSON.stringify(donnees, null, 2)};
`;

/* --verifier n'écrit rien : c'est le mode de build/controle-revendications.js,
   qui veut savoir si les deux fichiers sont à jour sans les réécrire — on ne
   modifie pas le dépôt pour le vérifier. */
const verifier = process.argv.includes("--verifier");
const ecarts = [];

if (verifier) {
  [
    [SORTIE_JSON, json],
    [SORTIE_JS, js],
  ].forEach(([fichier, attendu]) => {
    const nom = path.relative(ROOT, fichier);
    let surDisque;
    try {
      surDisque = fs.readFileSync(fichier, "utf8");
    } catch (e) {
      ecarts.push(nom + " est absent : lancez node build/extraire-rev-nationales.js");
      return;
    }
    if (surDisque !== attendu) {
      ecarts.push(nom + " n'est plus à jour avec la page : relancez " +
        "node build/extraire-rev-nationales.js");
    }
  });
  console.log("\nListe nationale — " + items.length +
    " revendication(s) lue(s) dans la page.");
  if (ecarts.length) {
    ecarts.forEach((e) => console.log("  · " + e));
    process.exit(1);
  }
  console.log("  les deux fichiers générés sont à jour.\n");
  process.exit(problemes.length ? 1 : 0);
}

fs.writeFileSync(SORTIE_JSON, json, "utf8");
fs.writeFileSync(SORTIE_JS, js, "utf8");

console.log(`\nRevendications nationales — extraites de ${path.basename(PAGE)}`);
items.forEach((r, i) => {
  console.log(`  ${String(i + 1).padStart(2)}. ${r.titre}`);
});
console.log(
  `  build/rev-nationales.json  ${fs.statSync(SORTIE_JSON).size} o\n` +
    `  build/rev-nationales.js    ${fs.statSync(SORTIE_JS).size} o  ${items.length} revendication(s)`
);

if (problemes.length) {
  console.log(`\n  ${problemes.length} problème(s) :`);
  problemes.forEach((p) => console.log("    · " + p));
  process.exit(1);
}
console.log("\n  rien à signaler.\n");
