/* ===========================================================================
   theme.js — le mode sombre, et la palette que toutes les pages partagent.

   AVANT
   Les cinq pages avaient chacune leurs couleurs, à leur façon : deux
  colonnes de variables — `--texte`, `--violet`, `--bord` ici, `--text-primary`,
   `--primary`, `--border` là — et surtout trente-sept gris écrits en dur dans
   la seule carte des communes. Un mode sombre n'aurait alors rien pu
   retourner : il n'y avait pas une seule couleur à changer, il y en avait
   plusieurs centaines, à retrouver une par une.

   MAINTENANT
   La palette est écrite ici, une fois, et les pages ne la REDÉFINISSENT plus :
   elles ne font que s'y référer. Le mode sombre n'est plus qu'une seconde
   lecture de la même liste de variables.

       --fonds      le fond de la page          --texte     le texte
       --fonds-2    une carte, un panneau       --texte-2   le texte secondaire
       --fonds-3    un survol, un plateau       --texte-3   le texte discret
       --bord       une bordure fine            --bord-2    une bordure marquée
       --accent     le violet du site           --accent-pale  sa version pâle
       --carte      l'aplat d'une commune       --carte-2   le damier
       --lien       les liens bleus historiques --ombre     les ombres

   Deux fichiers se partagent ces noms : `build/teinte.js` les lit pour teindre
   cartes, et chaque page les utilise au lieu de sa valeur.

   --------------------------------------------------------------------------
   LE BOUTON
   --------------------------------------------------------------------------
   C'est build/nav.js qui l'écrit dans la barre — il est question de barre —
   et c'est ici qu'il est écouté, par délégation sur `document` : l'ordre de
   chargement des deux fichiers n'a alors aucune importance.

       <button data-theme-bascule>…</button>

   Le thème retenu est noté dans le localStorage. Au premier visite, on suit ce
   que dit le système : une machine en mode sombre ouvre le site en mode
   sombre, sans qu'on ait rien demandé.

   Ce fichier est chargé dans <head>, après la feuille de style de la page :
   c'est ce qui évite l'éclair blanc quand on revient sur un site sombre. Il
   injecte donc sa palette en dernier, et l'emporte sur les ':root' des pages.
   =========================================================================== */

window.THEME = window.THEME || {};

(function () {
  var CLE = "blocus.theme";
  var SOMBRE = "sombre";
  var CLAIR = "clair";

  /* ------------------------------------------------------------------ la palette

     Une ligne par couleur, et le même nom des deux côtés : c'est tout ce qui
     fait qu'une page n'a plus à savoir quelle couleur elle utilise. */
  var CLAIRS = [
    ["--fonds", "#ffffff"],
    ["--fonds-2", "#f7f8fa"],
    ["--fonds-3", "#eef1f5"],
    ["--fonds-veile", "rgba(255,255,255,.97)"],
    ["--texte", "#10151b"],
    ["--texte-2", "#4b5563"],
    ["--texte-3", "#9aa1a9"],
    ["--bord", "#e3e6ea"],
    ["--bord-2", "#cfd4da"],
    ["--ombre", "rgba(16,24,40,.10)"],
    ["--ombre-forte", "rgba(16,24,40,.32)"],
    ["--lien", "#2b6cb0"],
    ["--lien-pale", "rgba(43,108,176,.08)"],
    ["--lien-bord", "rgba(43,108,176,.25)"],
    ["--accent", "#6d28d9"],
    ["--accent-2", "#5b21b6"],
    ["--accent-fonce", "#4c1d95"],
    ["--accent-solide", "#6d28d9"],
    ["--accent-solide-2", "#5b21b6"],
    ["--accent-pale", "#f3f0ff"],
    ["--accent-pale-2", "#ede9fe"],
    ["--accent-cible", "#e9e2ff"],
    ["--blanc", "#ffffff"],
    ["--rouge", "#b42318"],
    ["--rouge-vif", "#e30613"],
    ["--rouge-fonce", "#7a271a"],
    ["--rouge-pale", "#fef3f2"],
    ["--rouge-bord", "#f9c6c0"],
    ["--vert", "#067647"],
    ["--vert-fonce", "#054f31"],
    ["--vert-pale", "#ecfdf3"],
    ["--vert-bord", "#a9efc5"],
    ["--ambre", "#7a2e0e"],
    ["--ambre-pale", "#fffaeb"],
    ["--ambre-bord", "#f8d5a0"],
    ["--carte", "#f8fafc"],
    ["--carte-2", "#e9eef3"],
    ["--carte-3", "#e1e8ef"],
    ["--carte-bord", "#cbd5e1"],
    ["--teinte-violet", "#6d28d9"],
  ];

  /* En mode sombre, le violet s'éclaircit : #6d28d9 sur fond noir est un trou
     noir, et c'est le texte qu'on lit le plus (marque, lien, pastille). Les
     aplats pleins, eux, restent saturés et gardent du texte blanc — un bouton
     « Signaler un blocus » doit avoir l'air d'un bouton. */
  var SOMBRES = [
    ["--fonds", "#0d1117"],
    ["--fonds-2", "#161b22"],
    ["--fonds-3", "#1d232b"],
    ["--fonds-veile", "rgba(13,17,23,.94)"],
    ["--texte", "#e6edf3"],
    ["--texte-2", "#a8b3c1"],
    ["--texte-3", "#6f7b8a"],
    ["--bord", "#262d36"],
    ["--bord-2", "#39434f"],
    ["--ombre", "rgba(0,0,0,.45)"],
    ["--ombre-forte", "rgba(0,0,0,.62)"],
    ["--lien", "#7cb4f2"],
    ["--lien-pale", "rgba(124,180,242,.12)"],
    ["--lien-bord", "rgba(124,180,242,.45)"],
    ["--accent", "#c4b5fd"],
    ["--accent-2", "#a78bfa"],
    ["--accent-fonce", "#ddd6fe"],
    ["--accent-solide", "#7c3aed"],
    ["--accent-solide-2", "#6d28d9"],
    ["--accent-pale", "#201b36"],
    ["--accent-pale-2", "#2a2348"],
    ["--accent-cible", "#322a52"],
    ["--blanc", "#ffffff"],
    ["--rouge", "#f97066"],
    ["--rouge-vif", "#ff5f56"],
    ["--rouge-fonce", "#f9c6c0"],
    ["--rouge-pale", "#2a1614"],
    ["--rouge-bord", "#4a1f1a"],
    ["--vert", "#4ade80"],
    ["--vert-fonce", "#a9efc5"],
    ["--vert-pale", "#10231a"],
    ["--vert-bord", "#1d3a2a"],
    ["--ambre", "#fcd34d"],
    ["--ambre-pale", "#2a2010"],
    ["--ambre-bord", "#45341a"],
    ["--carte", "#171d26"],
    ["--carte-2", "#1b222c"],
    ["--carte-3", "#212934"],
    ["--carte-bord", "#2c3540"],
    ["--teinte-violet", "#a78bfa"],
  ];

  function corps(liste, sel) {
    return sel + " {\n" + liste.map(function (l) {
      return "  " + l[0] + ": " + l[1] + ";";
    }).join("\n") + "\n}";
  }

  /* On ne pose pas seulement les couleurs : `color-scheme` dit au navigateur
     de peindre lui aussi les menus déroulants, les cases à cocher et les
     barres de défilement, qui resteraient blancs sinon. */
  var STYLE =
    corps(CLAIRS, ":root") + "\n" +
    corps(SOMBRES, ':root[data-theme="' + SOMBRE + '"]') + "\n" +
    ':root[data-theme="' + SOMBRE + '"] { color-scheme: dark; }\n' +
    ':root[data-theme="' + CLAIR + '"] { color-scheme: light; }\n';

  var pose = false;

  function poserStyle() {
    if (pose) return;
    pose = true;
    var s = document.createElement("style");
    s.id = "theme-style";
    s.textContent = STYLE;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ------------------------------------------------------------------ l'état */

  function lu() {
    try { return localStorage.getItem(CLE); } catch (e) { return null; }
  }

  function ecrit(v) {
    try { localStorage.setItem(CLE, v); } catch (e) { /* mode privé : sans mémoire */ }
  }

  /** le thème du système, quand l'utilisateur n'a pas encore choisi */
  function duSysteme() {
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? SOMBRE : CLAIR;
  }

  function theme() {
    var v = lu();
    // Dark mode as default if no preference stored
    return (v === SOMBRE || v === CLAIR) ? v : SOMBRE;
  }

  var ecouteurs = [];

  /** repeindre après un changement de thème : les cartes tirent leurs couleurs
      du CSS, il faut donc les repeindre quand le CSS a changé. */
  function surChangement(f) {
    if (typeof f === "function") ecouteurs.push(f);
  }

  function prevenir() {
    for (var i = 0; i < ecouteurs.length; i++) {
      try { ecouteurs[i](); } catch (e) { /* un repeint raté n'empêche pas les autres */ }
    }
  }

  /** applique le thème : l'attribut sur <html>, la couleur de la barre du
      navigateur, et le libellé du bouton. */
  function appliquer(v) {
    poserStyle();
    var t = (v === SOMBRE || v === CLAIR) ? v : theme();
    document.documentElement.setAttribute("data-theme", t);

    /* la couleur de la barre du navigateur du téléphone : sans cela, la barre
       du site et celle du téléphone finissent par ne plus aller ensemble */
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      (document.head || document.documentElement).appendChild(meta);
    }
    meta.setAttribute("content", t === SOMBRE ? "#0d1117" : "#ffffff");

    var boutons = document.querySelectorAll("[data-theme-bascule]");
    var wants = t === SOMBRE ? "clair" : "sombre";
    for (var i = 0; i < boutons.length; i++) {
      var b = boutons[i];
      b.setAttribute("aria-pressed", t === SOMBRE ? "true" : "false");
      b.setAttribute("aria-label", "Passer en mode " + wants);
      b.setAttribute("title", "Passer en mode " + wants);
    }
    return t;
  }

  function basculer() {
    var t = theme() === SOMBRE ? CLAIR : SOMBRE;
    ecrit(t);
    appliquer(t);
    prevenir();
    return t;
  }

  /* ------------------------------------------------------------------ au démarrage

     Un seul écouteur, posé sur `document` : il attrape le bouton de n'importe
     quelle page, et il ne se pose qu'une fois, que le bouton existe déjà ou
     non — ce qui rend l'ordre de chargement de nav.js et theme.js indifférent. */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-theme-bascule]") : null;
    if (!b) return;
    e.preventDefault();
    basculer();
  });

  /* ------------------------------------------------------------------ pour le JS

     Les cartes ne calculent pas leurs couleurs : elles les lisent. C'est ce
     qui leur permet de suivre le thème sans rien savoir du mode sombre. */
  function couleur(nom) {
    var v = "";
    try {
      v = window.getComputedStyle(document.documentElement).getPropertyValue(nom);
    } catch (e) { v = ""; }
    return String(v).trim();
  }

  function estSombre() {
    return theme() === SOMBRE;
  }

  poserStyle();
  appliquer(theme());

  window.THEME.appliquer = appliquer;
  window.THEME.basculer = basculer;
  window.THEME.theme = theme;
  window.THEME.couleur = couleur;
  window.THEME.estSombre = estSombre;
  window.THEME.surChangement = surChangement;
  window.THEME.CLE = CLE;
  window.THEME.SOMBRE = SOMBRE;
  window.THEME.CLAIR = CLAIR;
})();
