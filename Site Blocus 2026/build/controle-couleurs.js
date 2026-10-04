/* ===========================================================================
   controle-couleurs.js — le garde-fou de la palette.

   Le mode sombre tient en une idée : plus aucune couleur n'est écrite en dur
   dans les pages, tout passe par les variables de build/theme.js. Cette
   invariants se casse sans bruit — `background: var(--bord)` avec --bord
   absent n'est pas une erreur, c'est une déclaration simplement ignorée, et la
   page rend quand même. Ce script vérifie donc les deux moitiés du contrat :

     1. AUCUNE couleur en dur dans les feuilles de style. Elle ne suivrait pas
        le thème, et c'est exactement le retour en arrière qu'on veut voir.

     2. AUCUNE variable utilisée sans valeur. C'est le piège : la feuille est
        valide, le navigateur ne dit rien, et un fond ou un texte disparaît.

   Les deux se répondent : le premier dit ce qu'il ne faut plus écrire, le
   second dit que ce qu'on écrit à la place a bien une valeur.

       node build/controle-couleurs.js          -> rapport, code 1 si défaut
       node build/controle-couleurs.js --pages  -> ne contrôle que les pages
   =========================================================================== */

const fs = require("fs");

/* ------------------------------------------------------------------ la palette */

/* Lue dans theme.js, à la source : c'est elle qui fait foi, et non la liste
   qu'on recopierait ici — qui finirait par diverger sans qu'on s'en aperçoive.
   La valeur n'est pas lue, seulement la présence : la moitié des variables vaut
   un rgba(), et les exiger en `#` ferait passer des variables parfaitement
   définies pour des variables manquantes. */
const palette = new Set(
  [...fs.readFileSync("build/theme.js", "utf8")
    .matchAll(/\[\s*"(--[a-z0-9-]+)"\s*,\s*"[^"]*"\s*\]/gi)].map((m) => m[1])
);

/* Posées par un script au démarrage, pas par la feuille : la hauteur de la
   barre, mesurée — et qui change dès que la barre change de hauteur. */
const RUNTIME = new Set(["--haut"]);

/* ------------------------------------------------------------------- les pages */

const PAGES = [
  "build/template.html", "carte.html", "tableau-des-blocus.html",
  "signaler-un-blocus.html", "revendications.html", "accueil.html",
];

/* Les fichiers qui fabriquent de la couleur pour le site : la carte de France.
   build/preview.js en fabrique aussi, mais pour un SVG d'inspection qu'on ouvre
   seul, avec sa propre mise en page et sans feuille de style du site — il n'a
   donc pas à suivre le thème, et il n'est pas dans le contrôle. */
const FABRIQUES = ["build/map-static.js"];

/* La seule couleur en dur qui a le droit de rester. C'est l'aplat de secours
   des tracés de la carte, écrit dans l'attribut `fill` : un attribut de
   présentation ne peut pas contenir var(). Il ne sert d'ailleurs presque à rien
   — la règle [data-zero] le recouvre dès que la feuille de style est là, et
   carte-teinte.js le remplace au premier passage. C'est le filet de sécurité
   pour une carte ouverte seule, sans sa feuille. */
const AUTORISEES = [
  { fichier: "build/map-static.js", motif: /APLAT_DEPART\s*=\s*'#[0-9a-f]{3,8}'/i,
    pourquoi: "l'aplat de secours de l'attribut fill, que var() ne peut pas contenir" },
];

const pagesSeulement = process.argv.includes("--pages");
const cibles = pagesSeulement ? PAGES : PAGES.concat(FABRIQUES);

const COULEUR = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g;

/* ------------------------------------------------------------------- outillage */

/** Un commentaire n'est pas une couleur : il n'en peint rien. */
function sansCommentaires(l) {
  return l.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Les lignes qui appartiennent à une feuille de style. Le reste du fichier —
    le tracé du SVG, les couleurs d'un candidat — n'en est pas une. */
function lignesDeStyle(t) {
  const out = [];
  let dedans = false;
  for (const l of t.split("\n")) {
    if (/<style[\s>]/i.test(l)) dedans = true;
    out.push(dedans);
    if (/<\/style>/i.test(l)) dedans = false;
  }
  return out;
}

/** Ce que la page définit elle-même. Une variable déclarée dans un autre
    sélecteur n'est visible que là : seul le :root compte. */
function definitionsLocales(t) {
  const out = new Set();
  for (const b of [...t.matchAll(/:root[^{]*\{([^}]*)\}/g)].map((m) => m[1])) {
    for (const m of b.matchAll(/(--[a-z0-9-]+)\s*:/gi)) out.add(m[1]);
  }
  return out;
}

/* ----------------------------------------------------------------- 1. en dur */

const enDur = [];

for (const f of cibles) {
  const lignes = fs.readFileSync(f, "utf8").split("\n");
  const enStyle = f.endsWith(".js") ? null : lignesDeStyle(lignes.join("\n"));

  for (let i = 0; i < lignes.length; i++) {
    /* un fichier .js est un script : ses couleurs comptent partout */
    const aVoir = enStyle === null ? true : enStyle[i];
    if (!aVoir) continue;

    const l = sansCommentaires(lignes[i]);
    for (const m of l.matchAll(COULEUR)) {
      /* une couleur précédée de var( n'en est pas une : c'est la variable qu'on
         lit, et c'est précisément ce qu'on veut voir à sa place */
      if (/var\(\s*(--[a-z0-9-]+)?\s*\)?\s*$/.test(l.slice(0, m.index).trimEnd())) continue;

      const c = m[0];
      const autorisee = AUTORISEES.find((a) =>
        a.fichier === f && a.motif.test(lignes[i]));
      enDur.push({ f, ligne: i + 1, couleur: c, texte: l.trim(),
        pourquoi: autorisee ? autorisee.pourquoi : null });
    }
  }
}

/* ---------------------------------------------------------------- 2. sans valeur */

const orphelines = [];

for (const f of PAGES) {
  const t = fs.readFileSync(f, "utf8");
  const locales = definitionsLocales(t);
  const utilisees = new Map();

  for (const m of t.matchAll(/var\(\s*(--[a-z0-9-]+)/gi)) {
    utilisees.set(m[1], (utilisees.get(m[1]) || 0) + 1);
  }

  for (const [v, n] of utilisees) {
    if (palette.has(v) || RUNTIME.has(v)) continue;

    if (locales.has(v)) {
      /* un alias doit pointer vers quelque chose qui existe : `--texte:
         var(--texte)` ne définit rien du tout, et ne se voit pas à l'œil */
      const m = new RegExp("(?:^|[;{\\s])" + v + "\\s*:\\s*var\\(\\s*(--[a-z0-9-]+)", "i")
        .exec([...t.matchAll(/:root[^{]*\{([^}]*)\}/g)].map((b) => b[1]).join(" "));
      if (m && !palette.has(m[1]) && !RUNTIME.has(m[1])) {
        orphelines.push({ f, v, n, pourquoi: "alias vers " + m[1] + ", qui n'a pas de valeur" });
      }
      continue;
    }
    orphelines.push({ f, v, n, pourquoi: "jamais définie" });
  }
}

/* ---------------------------------------------------------------------- rapport */

let defauts = 0;

console.log("=== couleurs en dur dans les feuilles de style");
if (!enDur.length) {
  console.log("   aucune (bon)");
} else {
  for (const d of enDur) {
    if (d.pourquoi) {
      console.log("   ~ " + d.f + " " + d.ligne + "  " + d.couleur + "  tolérée : " + d.pourquoi);
    } else {
      defauts++;
      console.log("   !! " + d.f + " " + d.ligne + "  " + d.couleur);
      console.log("      " + d.texte.slice(0, 78));
    }
  }
}

console.log("\n=== variables utilisées sans valeur");
if (!orphelines.length) {
  console.log("   aucune — les " + palette.size + " variables de theme.js suffisent" +
    (RUNTIME.size ? ", plus " + RUNTIME.size + " posée(s) en JS" : ""));
} else {
  for (const d of orphelines) {
    defauts++;
    console.log("   !! " + d.f + "  " + d.v + " x" + d.n + "  " + d.pourquoi);
  }
}

console.log(defauts ? "\n" + defauts + " défaut(s)" : "\nrien à signaler");
process.exit(defauts ? 1 : 0);
