/* ===========================================================================
   nav.js — la barre du haut, la même sur toutes les pages.

   Le site est fait de cinq pages (carte de France, carte d'un département,
   tableau, revendications, signalement) et il faut pouvoir passer de l'une à
   l'autre sans jamais chercher le lien : la barre est donc écrite ici une fois
   pour toutes, et chaque page se contente de dire où elle veut qu'elle soit
   posée.

       <script src="build/nav.js"></script>
       …
       <div id="topbar">
         <nav id="nav"></nav>
         <div id="filtre"></div>
       </div>
       …
       <script>NAV.poser("nav", "carte");</script>

   --------------------------------------------------------------------------
   L'ASPECT EST ICI AUSSI, ET PLUS DANS LES PAGES
   --------------------------------------------------------------------------
   Chacune des cinq pages avait écrit les siennes : 12,5 px sur le tableau,
   .75rem sur la carte, le filtre à droite sur l'une et sur sa propre ligne
   sur l'autre, et deux hauteurs de barre différentes selon la page. La barre
   n'était donc la même qu'en théorie — et le jour où l'on la corrige, il faut
   se rappeler de la corriger cinq fois.

   Ici, une seule feuille de style est injectée dans la page. Pour qu'elle
   l'emporte sur le « #topbar » et le « nav a » de chaque page, elle ne se
   contente pas d'une classe : elle nomme l'élément qui enveloppe la barre, et
   s'y accroche. Un « #topbar.barre-nav » vaut plus qu'un « #topbar », sans
   avoir besoin de !important.

   Les couleurs y sont écrites avec les noms de build/theme.js, jamais en dur :
   c'est ce qui fait que la barre suit le mode sombre sans qu'on la redessine.

   Le trait de séparation entre la navigation et le filtre, le carré violet à
   côté du nom du site, la pastille pleine sur la page courante : c'est aussi
   écrit ici, une fois.

   --------------------------------------------------------------------------
   Le lien vers la carte de France garde le retour à l'endroit d'où l'on vient :
   si l'on quitte un département, on y revient.

   Chaque page peut aussi écrire le titre de l'onglet, ce qui évite six <title>
   différents à tenir à jour dans six coins du code.
   =========================================================================== */

window.NAV = window.NAV || {};

(function () {
  /* Les entrées, dans l'ordre où on les lit : la carte d'abord, parce que
     c'est le cœur du site, puis ce qui l'explique. « Signaler un blocus » n'a
     pas d'entrée propre : c'est le bouton à droite, et deux liens qui mènent
     à la même page ne font que raccourcir la barre d'un cran. */
  var ENTREES = [
    { id: "carte", titre: "Carte de France", href: "carte.html", intro: "Les départements, colorés selon les blocus" },
    { id: "departements", titre: "Departements", href: "departements.html", intro: "Choisir un département" },
    { id: "tableau-des-blocus", titre: "Tableau", href: "tableau-des-blocus.html", intro: "Les blocus jour par jour" },
    { id: "revendications", titre: "Revendications", href: "revendications.html", intro: "Ce que nous demandons" },
  ];

  /* -------------------------------------------------------- la signature

     « Qui a écrit ce site », en bas de chaque page. Cette phrase ne peut pas
     vivre dans les huit pieds de page : elle y ferait huit versions, dont sept
     fausses le temps d'une édition. Elle est donc écrite ici, une fois, et posée
     dans le pied de page de la page qui en a un. Le pied de page, lui, reste à
     la page : c'est elle qui décide de ce qu'elle y dit d'autre. */

  var SIGNATURE = "J'écris et je tiens ce site à jour : jeune programmeur des lycées.";

  /** pose la signature, une fois par page. poser() est rappelé à chaque
      changement de département : c'est le marqueur [data-signature] qui
      empêche qu'elle s'empile en bas de la page. */
  function signer() {
    var pied = document.querySelector("footer");
    if (!pied || pied.querySelector("[data-signature]")) return;
    var p = document.createElement("p");
    p.className = "signature";
    p.setAttribute("data-signature", "");
    p.textContent = SIGNATURE;
    pied.appendChild(p);
  }

  /* ------------------------------------------------------------------ style */

  /** le petit bouton clair / sombre.
      Les deux dessins sont dans la page ; c'est la feuille de style qui n'en
      montre qu'un, selon le thème. Un bouton ne peut pas se peindre avec un
      attribut-src, et le theme-color d'une icône change avec le fond : le plus
      simple est de garder les deux et d'en cacher un. */
  var BOUTON =
    '<button type="button" class="theme" data-theme-bascule>' +
      '<svg class="lune" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' +
        '<path fill="currentColor" d="M16.5 12.6A6.9 6.9 0 0 1 7.4 3.5a6.9 6.9 0 1 0 9.1 9.1Z"/>' +
      "</svg>" +
      '<svg class="soleil" viewBox="0 0 20 20" aria-hidden="true" focusable="false">' +
        '<circle cx="10" cy="10" r="3.5" fill="none" stroke="currentColor" stroke-width="1.7"/>' +
        '<path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" ' +
          'd="M10 1.4v2.2M10 16.4v2.2M1.4 10h2.2M16.4 10h2.2M4 4l1.6 1.6M14.4 14.4 16 16M16 4l-1.6 1.6M5.6 14.4 4 16"/>' +
      "</svg>" +
    "</button>";

  /** la feuille de style de la barre, pour un conteneur donné.
      `sel` est le sélecteur de ce conteneur, construit par poser(). */
  function feuille(sel) {
    return [
      /* ---- le fond ------------------------------------------------------- */
      sel + " {",
      "  display: flex; flex-direction: column; align-items: stretch; gap: 8px;",
      "  justify-content: flex-start;",
      "  margin: 0; max-width: none; border-radius: 0;",
      "  padding: 8px 14px;",
      "  background: var(--fonds-veile);",
      "  -webkit-backdrop-filter: saturate(180%) blur(14px);",
      "  backdrop-filter: saturate(180%) blur(14px);",
      "  border-bottom: 1px solid var(--bord);",
      "  box-shadow: 0 1px 2px var(--ombre), 0 16px 30px -24px var(--ombre);",
      "}",
      /* ---- la navigation -------------------------------------------------- */
      "#nav {",
      "  display: flex; align-items: center; gap: 3px; flex-wrap: wrap;",
      "  justify-content: center; flex: 1 1 auto; min-width: 0;",
      "}",
      "#nav a {",
      "  position: relative; white-space: nowrap; text-decoration: none;",
      "  display: inline-block; padding: 7px 12px; border-radius: 9px;",
      "  color: var(--texte-2); font: 600 13px/1.1 inherit; letter-spacing: -.005em;",
      "  transition: background-color .14s ease, color .14s ease, box-shadow .14s ease;",
      "}",
      "#nav a:hover { background: var(--fonds-3); color: var(--texte); }",
      "#nav a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }",
      /* la page où l'on est : une pastille pleine, rien d'autre ne l'est */
      "#nav a.on {",
      "  background: var(--accent-solide); color: var(--blanc);",
      "  box-shadow: 0 1px 2px var(--ombre);",
      "}",
      "#nav a.on:hover { background: var(--accent-solide-2); color: var(--blanc); }",
      /* le nom du site, et son carré */
      "#nav a.marque {",
      "  padding-left: 28px; margin-right: 10px;",
      "  color: var(--texte); font: 800 15px/1 inherit; letter-spacing: -.02em;",
      "}",
      "#nav a.marque:hover { background: none; }",
      /* L'accueil porte le mot-clé et son carré : quand c'est la page qu'on
         regarde, il se distingue par un trait sous le mot plutôt que par la
         pastille des autres liens — son carré tient déjà la place de la
         pastille, et un fond accentué y rendrait le mot illisible au survol. */
      "#nav a.marque.on {",
      "  background: none; box-shadow: none; color: var(--texte);",
      "  text-decoration: underline; text-decoration-color: var(--accent-solide);",
      "  text-underline-offset: 4px;",
      "}",
      "#nav a.marque::before {",
      "  content: ''; position: absolute; left: 0; top: 50%;",
      "  width: 18px; height: 18px; margin-top: -9px; border-radius: 6px;",
      "  background: linear-gradient(145deg, var(--accent), var(--teinte-violet));",
      "  box-shadow: inset 0 0 0 3.5px var(--fonds-veile);",
      "}",
      /* le bouton d'action */
      "#nav a.cta {",
      "  margin-left: 0; color: var(--blanc); font-weight: 700;",
      "  background: var(--accent-solide);",
      "  box-shadow: 0 1px 2px var(--ombre);",
      "}",
      "#nav a.cta::before { content: '+'; margin-right: 5px; font-weight: 400; opacity: .85; }",
      "#nav a.cta:hover { background: var(--accent-solide-2); color: var(--blanc); }",
      /* ---- le bouton clair / sombre ---------------------------------------- */
      "#nav .theme {",
      "  width: 32px; height: 32px; padding: 0; flex: 0 0 auto; cursor: pointer;",
      "  display: inline-flex; align-items: center; justify-content: center;",
      "  border: 1px solid var(--bord); border-radius: 9px;",
      "  background: var(--fonds-2); color: var(--texte-2);",
      "  transition: background-color .14s ease, color .14s ease, border-color .14s ease;",
      "}",
      "#nav .theme:hover { background: var(--fonds-3); color: var(--texte); border-color: var(--bord-2); }",
      "#nav .theme:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }",
      "#nav .theme svg { width: 17px; height: 17px; display: block; }",
      /* en thème clair on propose la lune, en thème sombre le soleil */
      '#nav .theme .soleil, :root[data-theme="sombre"] #nav .theme .lune { display: none; }',
      ':root[data-theme="sombre"] #nav .theme .soleil { display: block; }',
      /* ---- le filtre : le jour de blocus affiché, choisi dans une liste ---- */
      sel + " .filtre {",
      "  display: flex; align-items: center; gap: 4px; flex-wrap: wrap;",
      "  padding: 3px; border-radius: 11px;",
      "  background: var(--fonds-3); box-shadow: inset 0 0 0 1px var(--bord);",
      "  align-self: flex-start;",
      "}",
      sel + " .filtre .fl {",
      "  padding: 0 7px; color: var(--texte-3);",
      "  font: 700 10.5px/1 inherit; letter-spacing: .09em; text-transform: uppercase;",
      "}",
      sel + " .filtre .fsel {",
      "  padding: 6px 8px; border: 0; border-radius: 8px; max-width: 15rem;",
      "  background: var(--fonds); color: var(--texte); font: 600 12.5px/1 inherit;",
      "  box-shadow: 0 1px 2px var(--ombre);",
      "}",
      /* ---- la signature, en bas de page ------------------------------------ */
      /* Elle se pose dans le pied de page de chaque page, qui peut avoir ses
         propres réglages : deux specificity suffisent donc, et pas de
         !important — on ne prend pas la main sur ce que la page écrit. */
      "footer .signature {",
      "  margin: .5rem 0 0; color: var(--texte-3); font-size: 12.5px; line-height: 1.5;",
      "}",
      "footer > .signature:first-child { margin-top: 0; }",
    ].join("\n");
  }

  /** pose (ou remplace) la feuille de style. Elle est régénérée seulement si le
      conteneur a changé : poser() est rappelé à chaque département, et
      réécrire une feuille de style à chaque fois ferait clignoter la barre. */
  function poserStyles(sel) {
    var style = document.getElementById("nav-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "nav-style";
      (document.head || document.documentElement).appendChild(style);
    }
    if (style.getAttribute("data-pour") === sel) return;
    style.setAttribute("data-pour", sel);
    style.textContent = feuille(sel);
  }

  /** le sélecteur qui nomme le conteneur de la barre. La page peut l'appeler
      #topbar ou header : dans les deux cas on construit le sélecteur à partir
      de ce qu'on a trouvé, plutôt que d'en supposer un. */
  function selecteur(hote) {
    var c = hote.parentNode;
    if (!c || c.nodeType !== 1) return ".barre-nav";
    return (c.id ? "#" + c.id : c.tagName.toLowerCase()) + ".barre-nav";
  }

  /* ------------------------------------------------------------------ poser */

  function poser(id, actif, options) {
    options = options || {};
    var hote = document.getElementById(id);
    if (!hote) return;

    var conteneur = hote.parentNode;
    if (conteneur && conteneur.nodeType === 1 && conteneur.classList) {
      conteneur.classList.add("barre-nav");
    }
    poserStyles(selecteur(hote));

    /* Le mot-clé : il mène à l'accueil, et il n'est pas dans ENTREES — c'est la
       seule page qu'on atteint sans avoir choisi de destination. Il porte « on »
       quand c'est elle qu'on regarde, pour qu'on sache où l'on est. */
    var html = '<a class="marque' + (actif === "accueil" ? " on" : "") +
               '" href="accueil.html">Accueil</a>';
    for (var i = 0; i < ENTREES.length; i++) {
      var e = ENTREES[i];
      var href = e.href;
      /* Sur une carte de département, « Blocus » et « Communes » restent dans
         ce département : quitter la carte pour revenir à la même carte serait
         absurde. « Carte de France », elle, emmène vraiment à la carte de
         France, et c'est le seul moyen d'en sortir autrement qu'avec le
         bouton précédent du navigateur. */
      if (options.dep && e.id === "carte") {
        href = "carte.html";
      }
      if (options.dep && e.id === "dep") {
        href = "index.html#" + options.dep;
      }
      html += '<a href="' + href + '"' + (e.id === actif ? ' class="on" aria-current="page"' : "") +
              ' title="' + e.intro + '">' + e.titre + "</a>";
    }
    if (options.signaler !== false) {
      html += '<a class="cta" href="signaler-un-blocus.html">Signaler un blocus</a>';
      html += '<a class="cta" href="ajouter-une-revendication.html" style="margin-left:.5rem;">Ajouter une revendication</a>';
    }
    /* Le bouton clair / sombre est le dernier : c'est un réglage, pas une
       destination, et on ne s'y arrête pas en parcourant la barre. */
    if (options.theme !== false) html += BOUTON;
    hote.innerHTML = html;

    /* theme.js a déjà posé l'attribut sur <html>, mais il l'a fait avant que ce
       bouton existe — les pages chargent nav.js après. On le redemande une fois
       pour qu'il porte le bon libellé et le bon aria-pressed. */
    if (window.THEME) window.THEME.appliquer(window.THEME.theme());

    if (options.titre) document.title = options.titre + " — Blocus";

    /* La signature va avec la barre : les deux sont ce que le site dit de lui,
       et les deux se posent dans le même appel. */
    signer();
  }

  window.NAV.poser = poser;
  window.NAV.entrees = ENTREES;
})();
