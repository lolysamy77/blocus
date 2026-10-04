// Contrôle de l'injection dans carte.html : comptes et cohérence.
//
// carte.html n'est pas écrit à la main en entier : quatre blocs délimités par
// <!-- #dep-nav debut/fin --> y sont réinjectés à chaque passage — le style, la
// légende, le script de clic, les scripts. Un contrôle qui compte des choses
// qui n'existent plus ne sert à rien : il faut qu'il compte ce que la page
// contient vraiment, et qu'il dise pourquoi c'est faux.
//
// Il n'y a plus de grille de liens sous la carte. Chaque tracé est lui-même
// cliquable et porte son nom dans un <title>, lu comme infobulle : on vérifie
// donc que les 101 tracés, leurs 101 noms et leurs 101 pastilles disent la même
// chose, ce qui est le seul vrai risque ici — plus que le compte lui-même.
//
//   node build/controle-carte.js [fichier]   par défaut carte.html
// Le fichier en argument sert à tester le contrôle lui-même : on lui passe une
// copie volontairement cassée, et on doit lire ce qui ne va pas.

const fs = require("fs");
const fichier = process.argv[2] || "carte.html";
const s = fs.readFileSync(fichier, "utf8");

const DEPARTEMENTS = 101;  /* les 101 départements, la colonne outre-mer comprise */
const BLOCS = 4;          /* les blocs #dep-nav réinjectés */

/* L'ordre compte : carte-teinte.js lit ce que filtre.js et blocus-recherche.js
   ont posé. Le permuter laisserait la carte grise, sans une erreur visible. */
const SCRIPTS = [
  "build/theme.js",
  "build/nav.js",
  "build/teinte.js",
  "build/blocus.js",
  "build/blocus-recherche.js",
  "build/filtre.js",
  "build/carte-teinte.js",
  "build/mobile-nav.js",
  "build/carte-pan.js",
  "build/map-zoom.js",
];

const n = (re) => (s.match(re) || []).length;
const pb = [];
const faut = (condition, message) => { if (!condition) pb.push(message); return condition; };

/* ------------------------------------------------------- les blocs réinjectés */

console.log("taille          :", (s.length / 1024).toFixed(0), "Ko", "—", fichier);

/* Un bloc refermé trop tôt coupe la page en deux ; un bloc jamais refermé avale
   le pied de page. L'alternance debut/fin est donc vérifiée dans l'ordre. */
const balises = [...s.matchAll(/<!-- #dep-nav (debut|fin) -->/g)].map((m) => m[1]);
const alterne = balises.length === BLOCS * 2 &&
                balises.every((mot, i) => mot === (i % 2 ? "fin" : "debut"));
console.log("blocs #dep-nav  :", balises.length + " balises", "(attendu " + BLOCS * 2 + ")");
faut(alterne, "les balises #dep-nav ne s'alternent pas debut/fin — " + balises.join(" "));

/* ------------------------------------------------------------- les départements */

const traces = [...s.matchAll(/<path class="dept" data-code="([0-9A-Z]{2,3})"([^>]*)>([\s\S]*?)<\/path>/g)];
const codes = traces.map((m) => m[1]);
console.log("tracés .dept    :", traces.length, "(attendu " + DEPARTEMENTS + ")");
faut(traces.length === DEPARTEMENTS,
     "il y a " + traces.length + " tracés de département, pas " + DEPARTEMENTS);
faut(new Set(codes).size === codes.length, "un code de département est en double dans les tracés");

const pastilles = [...s.matchAll(/class="dept-nb" data-code="([0-9A-Z]{2,3})"/g)].map((m) => m[1]);
const numeros = n(/class="dept-num"/g);
console.log("pastilles .nb   :", pastilles.length, "(attendu " + DEPARTEMENTS + ")");
console.log("numéros .num    :", numeros, "(attendu " + DEPARTEMENTS + ")");
faut(pastilles.length === DEPARTEMENTS,
     "il y a " + pastilles.length + " pastilles de nombre, pas " + DEPARTEMENTS);
faut(numeros === DEPARTEMENTS, "il y a " + numeros + " numéros de département, pas " + DEPARTEMENTS);
/* Une pastille ou un numéro qui ne correspond pas à son tracé afficherait un
   nombre dans un autre département. Il faut donc comparer les deux listes
   décomptées, et pas seulement vérifier que chaque code existe quelque part :
   une pastille restée sur un voisin passerait le test plus faible. */
const memesCodes = pastilles.slice().sort().join(" ") === codes.slice().sort().join(" ");
faut(memesCodes, "pastilles et tracés ne portent pas les mêmes codes" +
                  (codes.filter((c) => !pastilles.includes(c)).length
                    ? " — absent des pastilles : " + codes.filter((c) => !pastilles.includes(c)).join(" ")
                    : "") +
                  (pastilles.filter((c) => !codes.includes(c)).length
                    ? " — en trop : " + pastilles.filter((c) => !codes.includes(c)).join(" ")
                    : ""));

/* le nom de chaque département, lu dans son <title> : c'est lui qui sert
   d'infobulle au survol, et lui qui ouvre le bon fragment d'adresse.
   Le tiret est un vrai tiret cadratin, comme dans le fichier. */
const noms = new Map();
const fautifs = [];
for (const [, code, , dessins] of traces) {
  const titre = (dessins.match(/<title>([^<]*)<\/title>/) || [])[1];
  const nom = titre && titre.match(/^(.*) \(([0-9A-Z]{2,3})\) — voir les communes$/);
  if (!nom || nom[2] !== code) fautifs.push(code);
  else noms.set(code, nom[1]);
}
console.log("titres          :", noms.size, "(attendu " + DEPARTEMENTS + ")");
faut(fautifs.length === 0,
     "tracé sans titre, ou titre qui parle d'un autre département : " + fautifs.join(" "));
console.log("nom du 75       :", noms.get("75"));
console.log("nom du 2A       :", noms.get("2A"));
faut(noms.get("75") === "Paris", "le titre du 75 ne dit plus Paris");
faut(noms.get("2A") === "Corse-du-Sud", "le titre du 2A ne dit plus Corse-du-Sud");

/* ------------------------------------------------------------- la couleur */

/* Tant que carte-teinte.js n'a pas peint, [data-zero] impose l'aplat de fond.
   Il doit donc être là sur les 101 tracés, et disparaître après la première
   peinture — c'est lui qui ferait sinon toujours gagner la feuille de style. */
const aplats = traces.filter((m) => /data-zero fill="#f8fafc"/.test(m[2])).length;
console.log("aplat data-zero :", aplats, "(attendu " + DEPARTEMENTS + ")");
faut(aplats === DEPARTEMENTS,
     aplats + " tracés seulement portent l'aplat data-zero, " + DEPARTEMENTS + " le portent");

const filet = /\[data-zero\]\s*\{[^}]*fill\s*:\s*var\(--carte\)/.test(s);
console.log("filet [data-zero]:", filet ? "oui" : "NON");
faut(filet, "la règle [data-zero] a disparu : la carte serait blanche avant le premier peinture");

/* La carte est peinte par build/carte-teinte.js, qui écrit l'attribut `fill`.
   Une règle CSS `.dept { fill: … }` gagnerait toujours et la carte resterait
   blanche : on vérifie donc son absence. */
const cssDept = (s.match(/\.dept\s*\{[^}]*\}/g) || []).join(" ");
const fillCss = /fill\s*:/.test(cssDept);
console.log("fill en CSS .dept:", fillCss ? "!! PRESENT, la couleur ne passera pas" : "aucun (bon)");
faut(!fillCss, "une règle .dept fixe le fill : les couleurs écrites par le script ne passent pas");
const survol = /\.dept:(hover|focus-visible)[^{]*\{[^}]*fill/.test(s);
console.log("survol          :", survol ? "oui" : "NON");
faut(survol, "le survol n'a plus de fill : survoler un département ne change plus rien");

/* ------------------------------------------------------------------- le clic */

/* Le département est porté par le fragment de l'adresse, ce qui rend le lien
   partageable et fait que le bouton « précédent » du navigateur revient à la
   carte précédente. */
const iSvg = s.indexOf("<svg"), iFinSvg = s.indexOf("</svg>");
const iMain = s.indexOf("<main"), iFinMain = s.indexOf("</main>");
const iLegend = s.indexOf('<div class="legend">');
console.log("svg dans <main> :", iSvg > iMain && iSvg < iFinMain);
faut(iSvg > iMain && iSvg < iFinMain, "la carte n'est pas dans <main>");
console.log("legende sous    :", iLegend > iFinSvg);
faut(iLegend > iFinSvg, "la légende n'est pas sous la carte");

const versFragment = /location\.href\s*=\s*'index\.html#'\s*\+\s*p\.getAttribute\('data-code'\)/.test(s);
console.log("clic -> fragment:", versFragment ? "oui" : "NON");
faut(versFragment, "le clic sur un département n'ouvre plus index.html#<code>");

const m = s.match(/<script>([\s\S]*?)<\/script>/);
if (m) {
  try { new Function(m[1]); console.log("script en ligne  : valide"); }
  catch (e) {
    console.log("script en ligne  : INVALIDE —", e.message);
    pb.push("le script de clic ne se parse plus");
  }
} else {
  console.log("script en ligne  : ABSENT");
  pb.push("le script de clic a disparu : la carte n'ouvre plus les communes");
}

/* ------------------------------------------------------ la barre et les scripts */

console.log("barre #nav      :", n(/<nav id="nav"/g), "(attendu 1)");
console.log("barre #filtre   :", n(/<div id="filtre"/g), "(attendu 1)");
faut(n(/<nav id="nav"/g) === 1, "la barre du haut n'est pas là");
faut(n(/<div id="filtre"/g) === 1, "le choix du jour (#filtre) n'est pas là");

const legendes = ["legMax", "legTot", "legDep"]
  .map((id) => id + ": " + n(new RegExp('id="' + id + '"', "g")))
  .join(" / ");
console.log("legende         :", n(/<div class="legend">/g), "(attendu 1)", legendes);
faut(n(/<div class="legend">/g) === 1, "la légende n'est pas là");
for (const id of ["legMax", "legTot", "legDep"]) {
  faut(n(new RegExp('id="' + id + '"', "g")) === 1, 'la légende n\'a pas de #' + id);
}

/* carte-pan.js et map-zoom.js visent tous deux #map : il doit y en avoir un seul.
   #controlesCarte et #retourCarte, eux, n'ont pas à être dans le fichier : ils
   sont créés par map-zoom.js et carte-pan.js au chargement. */
console.log("carte #map      :", n(/<svg id="map"/g), "(attendu 1)");
faut(n(/<svg id="map"/g) === 1, "#map doit être unique : la carte est déplacée par les deux scripts");

faut(s.includes('href="build/carte-boutons.css"'),
     "build/carte-boutons.css n'est plus lié : les deux cartes n'ont plus les mêmes boutons");

const src = [...s.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const enLigne = n(/<script>/g);
console.log("<script         :", src.length, "en fichier +", enLigne, "en ligne",
            "(attendu " + SCRIPTS.length + "+" + 1 + ")");
if (src.join(" ") !== SCRIPTS.join(" ")) {
  pb.push("les scripts ne sont pas ceux attendus, dans l'ordre attendu");
  const manquants = SCRIPTS.filter((f) => !src.includes(f));
  const enTrop = src.filter((f) => !SCRIPTS.includes(f));
  if (manquants.length) pb.push("script manquant : " + manquants.join(", "));
  if (enTrop.length) pb.push("script en trop : " + enTrop.join(", "));
  if (!manquants.length && !enTrop.length) pb.push("les scripts sont tous là, mais pas dans le bon ordre");
}

console.log("");
console.log(pb.length ? "à signaler :\n  " + pb.join("\n  ") : "rien à signaler");
process.exit(pb.length ? 1 : 0);