/* ---------------------------------------------------------------------------
   Deux boutons de zoom, et les flèches du clavier, pour les cartes.

   Ce fichier est appelé par index.html et par carte.html, les deux pages qui
   exposent window.CARTE : celle des communes, et celle de France. Sur une page
   sans carte il se retire aussitôt, sans rien laisser derrière lui. C'est
   pourquoi il ne suppose rien — ni la présence d'un bouton de retour à
   l'ensemble, ni celle des couleurs du thème : chaque valeur a son repli, et le
   groupe entier peut être caché.

   Les boutons servent quand on n'a pas de molette. Les flèches servent quand on
   traîne plutôt qu'on ne zoome : elles poussent la carte d'un huitième de
   l'écran, ou d'un quart avec Maj, et 0 revient à la carte entière.

   Partagé avec les autres pages : pas de « let », pas de fonction fléchée.
   L'apparence des boutons est dans build/carte-boutons.css, leur place dans la
   feuille de style de chaque page.
   --------------------------------------------------------------------------- */
(function () {
  "use strict";

  var C = window.CARTE;
  if (!C || typeof C.zoom !== "function" || typeof C.disponible !== "function") return;

  var svg = document.getElementById("map");
  if (!svg) return;

  /* ---------------------------------------------------------------- boutons */
  var groupe = document.createElement("div");
  groupe.id = "zoomCarte";
  groupe.setAttribute("role", "group");
  groupe.setAttribute("aria-label", "Zoom sur la carte");

  function bouton(glyph, titre, action) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = glyph;
    b.title = titre;
    b.setAttribute("aria-label", titre);
    b.addEventListener("click", function (e) {
      e.preventDefault();
      action();
    });
    return b;
  }

  groupe.appendChild(bouton("+", "Agrandir la carte", function () { C.zoom(1.5); }));
  groupe.appendChild(bouton("−", "Réduire la carte", function () { C.zoom(1 / 1.5); }));
  /* La carte de France garde ses boutons au coin de la carte (voir
     #controlesCarte, posé par build/carte-pan.js). Partout ailleurs la carte
     occupe la page entière : les boutons vont alors dans la page, et c'est sa
     feuille de style qui les place. */
  (document.getElementById("controlesCarte") || document.body).appendChild(groupe);

  /* Ils n'ont pas de sens tant qu'il n'y a pas de carte à déplacer : on les montre
     dès qu'un département est affiché, et on les retire quand on revient en
     arrière. Sur la carte de France, il y a toujours une carte : ils restent. */
  C.surChangement(function () {
    groupe.classList.toggle("on", C.disponible());
  });

  /* ---------------------------------------------------------------- clavier */
  function dansUnChamp(e) {
    var t = e.target;
    if (!t) return false;
    var tag = (t.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select" || t.isContentEditable === true;
  }

  document.addEventListener("keydown", function (e) {
    /* rien à faire si la carte n'est pas affichée : les flèches doivent
       continuer à faire défiler la page, et + / − à rien du tout */
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || dansUnChamp(e)) return;
    if (!C.disponible()) return;

    var pas = Math.max(40, Math.round(window.innerWidth * 0.12)) * (e.shiftKey ? 2 : 1);
    switch (e.key) {
      case "ArrowLeft": C.glisse(-pas, 0); break;
      case "ArrowRight": C.glisse(pas, 0); break;
      case "ArrowUp": C.glisse(0, -pas); break;
      case "ArrowDown": C.glisse(0, pas); break;
      case "+": case "=": C.zoom(1.3); break;
      case "-": case "_": C.zoom(1 / 1.3); break;
      case "0": case "Home": C.vue(); break;
      default: return;
    }
    e.preventDefault();
  });
})();
