/* ===========================================================================
   teinte.js — la couleur des blocus, partagée par la carte de France et par
   la carte des communes.

   Les deux cartes racontent la même chose : « plus il y a de blocus, plus la
   couleur est violette ». Il ne faut donc qu'une seule règle de calcul, sinon
   les deux cartes finissent par raconter des histoires différentes.

   ---------------------------------------------------------------------------
   L'ÉCHELLE : de 0 à 100
   ---------------------------------------------------------------------------
   0        aucun blocus         → blanc, la teinte de fond du territoire
   100      le plus de blocus    → violet franc

   Le « plus de blocus » est le maximum observé dans le périmètre affiché :
   tous les départements pour la carte de France, les communes du département
   affiché pour la carte des communes. L'échelle est donc linéaire et se
   recalcule toute seule : ajouter des blocus ne demande aucune reprise.

   Une échelle linéaire ne montre rien pour 1 blocus là où il y en a 50. La
   courbe douce ci-dessous (exposant 0,55) comprime le haut et étale le bas :
   le violet foncé reste réservé au(record), et un blocus isolé est déjà
   visible. Elle est monotone et va bien de 0 à 100, donc la légende reste
   honnête — elle annonce « de 0 au maximum observé ».
   =========================================================================== */

/* Tout est dans window.BLOC : un fichier script ne peut pas déclarer un
   const au niveau global sans risquer de entrer en conflit avec le script de
   la page, qui déclare déjà ses propres norm() et cie. */
window.BLOC = window.BLOC || {};

(function () {
  var COURBE = 0.55;                            /* cf. L'ÉCHELLE plus haut */

  /* ------------------------------------------------------------------------
     LES COULEURS VIENNENT DE LA FEUILLE DE STYLE

     Le violet et les aplats de départ ne sont pas écrits ici : ils sont lus
     dans les variables de build/theme.js (--teinte-violet, --carte, --carte-2,
     --carte-3). C'est ce qui permet à la carte de suivre le mode sombre sans
     qu'on repeigne rien à la main : il suffit de relire les variables. Les
     valeurs de secours sont celles du thème clair, pour que la carte se peigne
     même si theme.js n'a pas été chargé.
     ---------------------------------------------------------------------- */

  /** une variable CSS, en triplet RGB. Renvoie `secours` si elle est absente
      ou illisible : une carte qui ne se peint pas vaut moins qu'une carte
      peinte dans la mauvaise nuance. */
  function couleur(nom, secours) {
    var v = "";
    try {
      v = window.getComputedStyle(document.documentElement).getPropertyValue(nom);
    } catch (e) { v = ""; }
    return versRgb(String(v).trim()) || secours;
  }

  /** une variable CSS, telle qu'on peut la donner à `style`. Même lecture que
      `couleur`, mais on garde la notation d'origine — c'est plus court à écrire
      et une couleur semi-transparente reste semi-transparente. */
  function couleurCss(nom, secours) {
    var v = "";
    try {
      v = window.getComputedStyle(document.documentElement).getPropertyValue(nom);
    } catch (e) { v = ""; }
    v = String(v).trim();
    return versRgb(v) ? v : secours;
  }

  /** "#c4b5fd" ou "rgb(196,181,253)" -> [196, 181, 253] */
  function versRgb(t) {
    if (!t) return null;
    var m;
    if ((m = /^#([0-9a-f]{3,8})$/i.exec(t))) {
      var h = m[1];
      if (h.length === 3 || h.length === 4) {
        h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      }
      h = h.slice(0, 6);
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    if ((m = /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(t))) {
      return [+m[1], +m[2], +m[3]];
    }
    return null;
  }

  /* le violet et les aplats de départ, relus à chaque peinture */
  function violet() { return couleur("--teinte-violet", [109, 40, 217]); }
  function baseDepart() { return couleur("--carte", [248, 250, 252]); }
  function baseCommunes() {
    return [couleur("--carte-2", [233, 238, 243]), couleur("--carte-3", [225, 232, 239])];
  }

  function rgb(c) {
    return "rgb(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + ")";
  }

  /** mélange deux triplets RGB, t = 0 -> a, t = 1 -> b */
  function melange(a, b, t) {
    return [
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
      a[2] + (b[2] - a[2]) * t
    ];
  }

  /** position sur l'échelle, de 0 à 100 */
  function part(n, max) {
    n = Number(n) || 0;
    if (n <= 0 || !max || max <= 0) return 0;
    return Math.max(0, Math.min(100, Math.round(100 * Math.pow(n / max, COURBE))));
  }

  /** aplat d'une région administrative, de l'aplat de fond au violet */
  function teinte(n, max, base) {
    return rgb(melange(base || baseDepart(), violet(), part(n, max) / 100));
  }

  /** aplat d'une commune : le damier reste lisible sous le violet */
  function teinteCommune(n, max, par) {
    var bases = baseCommunes();
    return rgb(melange(bases[(par || 0) % bases.length], violet(), part(n, max) / 100));
  }

  /** le département d'une commune, d'après son code INSEE.
      97101 -> "971" (outre-mer), 37261 et 75101 -> "37" et "75". */
  function depDe(codeCommune) {
    var c = String(codeCommune || "");
    return /^97[1-6]/.test(c) ? c.slice(0, 3) : c.slice(0, 2);
  }

  /** dénombre les blocus de window.BLOCUS, par département et par commune.

      Chaque entrée du fichier est un blocus, donc c'est le nombre d'entrées
      qui compte — pas le nombre d'établissements. Une même école bloquée deux
      jours vaut deux. */
  function compte(B) {
    var dep = {}, com = {}, maxDep = 0, maxCom = 0, total = 0;
    B = B || window.BLOCUS || {};
    for (var cle in B) {
      if (!Object.prototype.hasOwnProperty.call(B, cle)) continue;
      var liste = B[cle];
      if (!liste || !liste.length) continue;
      var i = cle.indexOf("|");
      if (i < 0) continue;
      var code = cle.slice(0, i).trim();
      if (!code) continue;
      var n = liste.length;
      com[code] = (com[code] || 0) + n;
      var d = depDe(code);
      dep[d] = (dep[d] || 0) + n;
      total += n;
    }
    for (var k1 in dep) if (dep[k1] > maxDep) maxDep = dep[k1];
    for (var k2 in com) if (com[k2] > maxCom) maxCom = com[k2];
    return { dep: dep, com: com, maxDep: maxDep, maxCom: maxCom, total: total };
  }

  /* les pages s'en servent pour la légende et pour les aplats. Les trois
     derniers sont des fonctions et non des valeurs : les couleurs changent
     avec le thème, une valeur figée donnerait la couleur du thème clair. */
  window.BLOC.rgb = rgb;
  window.BLOC.melange = melange;
  window.BLOC.part = part;
  window.BLOC.teinte = teinte;
  window.BLOC.teinteCommune = teinteCommune;
  window.BLOC.depDe = depDe;
  window.BLOC.compte = compte;
  window.BLOC.versRgb = versRgb;
  window.BLOC.couleurCss = couleurCss;
  window.BLOC.violet = violet;
  window.BLOC.baseDepart = baseDepart;
})();
