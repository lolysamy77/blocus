/* ===========================================================================
   carte-teinte.js — la couleur des départements sur la carte de France.

   La carte est un SVG écrit dans le fichier par build/map-static.js : il n'y a
   donc aucun tracé à construire ici, seulement à peindre. Le calcul est celui
   de build/teinte.js, celui de la carte des communes : même règle, même courbe,
   même violet. Sans cela, un département violet à gauche et des communes
   blanches à droite pourraient vouloir dire deux choses différentes.

       <script src="build/teinte.js"></script>
       <script src="build/filtre.js"></script>
       <script src="build/carte-teinte.js"></script>

   La couleur est écrite dans l'attribut `fill` et jamais dans `style` : un
   attribut de présentation perd contre la règle CSS .dept:hover, ce qui laisse
   le survol et le focus au clavier fonctionner. Inversement, le fichier
   build/map-static.js ne met pas de `fill` dans la règle CSS — sinon elle
   gagnerait toujours, et la carte resterait blanche.
   =========================================================================== */

window.CARTE_TEINTE = window.CARTE_TEINTE || {};

(function () {
  /* Le nombre est écrit sous le numéro du département. On ne l'affiche que
     là où le département est assez large pour qu'un second chiffre tienne :
     sinon deux nombres se chevauchent et le résultat est pire que rien. */
  var TAILLE_MIN = 9;      // en unités SVG, comme la police des numéros

  function terre() {
    return { chemins: {}, nombres: {} };
  }

  function ramasser() {
    var t = terre();
    var els = document.querySelectorAll(".dept");
    for (var i = 0; i < els.length; i++) {
      t.chemins[els[i].getAttribute("data-code")] = els[i];
    }
    var nums = document.querySelectorAll(".dept-nb");
    for (var j = 0; j < nums.length; j++) {
      t.nombres[nums[j].getAttribute("data-code")] = nums[j];
    }
    return t;
  }

  /** repeint la carte d'après le filtre en cours */
  function peindre() {
    if (!window.BLOC || !window.FILTRE) return;
    var B = FILTRE.filtrer(window.BLOCUS || {});
    var c = BLOC.compte(B);
    var t = ramasser();

    for (var code in t.chemins) {
      if (!Object.prototype.hasOwnProperty.call(t.chemins, code)) continue;
      var n = c.dep[code] || 0;
      var p = t.chemins[code];
      /* Tant que data-zero est là, la feuille de style impose l'aplat de fond
         et c'est elle qui gagne. On le retire : à partir de maintenant la
         couleur de ce tracé est celle qu'on vient d'écrire. */
      p.removeAttribute("data-zero");
      p.setAttribute("fill", BLOC.teinte(n, c.maxDep));

      /* Le <title> est le survol : c'est là qu'on lit le nombre à la souris.
         Le nombre affiché dans la carte, lui, n'est que pour les départements
         où il tient. */
      var titre = p.querySelector("title");
      if (titre) {
        var nom = (titre.textContent || "").split(" — ")[0];
        titre.textContent = nom +
          (n ? " — " + n + " blocus" : " — aucun blocus");
      }

      var badge = t.nombres[code];
      if (badge) {
        if (n && +badge.getAttribute("data-fs") >= TAILLE_MIN) {
          badge.textContent = n;
          badge.classList.add("on");
        } else {
          badge.classList.remove("on");
        }
      }
    }

    var l = document.getElementById("legMax");
    if (l) l.textContent = c.maxDep;
    var t2 = document.getElementById("legTot");
    if (t2) t2.textContent = c.total;

    var d = document.getElementById("legDep");
    if (d) {
      var n2 = 0;
      for (var k in c.dep) if (Object.prototype.hasOwnProperty.call(c.dep, k)) n2++;
      d.textContent = n2;
    }
    return c;
  }

  function demarrer() {
    if (!window.BLOC || !window.FILTRE) return;
    window.NAV.poser("nav", "carte", { titre: "Carte de France" });
    FILTRE.poser("filtre");
    peindre();
    FILTRE.surChangement(function () { peindre(); });
    /* Changer de thème ne change pas les nombres, mais il change les couleurs
       dont ils sont tirés : la carte est donc repeinte comme au démarrage. */
    if (window.THEME) window.THEME.surChangement(function () { peindre(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }

  window.CARTE_TEINTE.peindre = peindre;
  window.CARTE_TEINTE.ramasser = ramasser;
  window.CARTE_TEINTE.TAILLE_MIN = TAILLE_MIN;
})();