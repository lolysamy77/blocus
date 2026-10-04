/* ===========================================================================
   carte-pan.js — le zoom et le déplacement de la carte de France (carte.html).

   index.html a son propre moteur de carte : il connaît les communes, les
   panneaux et la zone laissée libre par l'écran, ce qu'aucune carte de France
   n'a à savoir. Celui-ci ne fait donc que le strict nécessaire, et rend
   exactement le même service que l'autre : la molette agrandit autour du
   curseur, on tire pour déplacer, la carte poursuit sur sa lance, un double
   clic… n'existe pas ici (un clic ouvre le département, le premier des deux
   suffit), et l'on peut toujours amener un bord de la France au milieu de
   l'écran, à toutes les échelles — c'est la règle des bornes, écrite ici comme
   dans index.html.

   Le résultat est exposé dans window.CARTE, ce que build/map-zoom.js attend :
   les deux boutons, les flèches du clavier et la touche 0 s'ajoutent donc
   seuls, sans que cette page ait à les connaître.

       <script src="build/carte-pan.js"></script>
       <script src="build/map-zoom.js"></script>

   Partagé avec les autres pages du site : pas de « let », pas de fonction
   fléchée, et aucune hypothèse sur la présence des couleurs du thème. La
   présentation des boutons est dans build/carte-boutons.css.
   =========================================================================== */
(function () {
  "use strict";

  /* La carte de France est le seul <svg> de la page ; on lui donne le même nom
     qu'à celle d'index.html pour que build/map-zoom.js la trouve aussi. */
  var svg = document.getElementById("map");
  if (!svg) return;

  var NS = "http://www.w3.org/2000/svg";
  /* On ne descend pas plus petit que la France entière : le viewBox est
     exactement le pays, il n'y a rien à voir en dehors. */
  var MINZ = 1, MAXZ = 14;

  /* ------------------------------------------------------------ le dessin
     Tout ce que la carte contient est regroupé dans un seul <g> : c'est lui qui
     reçoit la transformation, et sa boîte (getBBox) donne l'étendue du dessin.
     Le <title> reste dehors, pour que la carte garde son nom aux lecteurs
     d'écran. */
  var enfants = [];
  for (var i = 0; i < svg.children.length; i++) {
    if (svg.children[i].tagName === "g") enfants.push(svg.children[i]);
  }
  if (!enfants.length) return;

  var corps = document.createElementNS(NS, "g");
  corps.id = "corpsCarte";
  svg.insertBefore(corps, enfants[0]);
  for (var j = 0; j < enfants.length; j++) corps.appendChild(enfants[j]);

  var boite = null;   /* étendue du dessin, en unités du viewBox */
  var k = 1;          /* pixels d'écran pour une unité du viewBox */
  var s = 1, tx = 0, ty = 0;
  var repos = true;   /* la carte est-elle à sa place d'origine ? */
  var elan = 0, vx = 0, vy = 0;   /* l'élan du déplacement */

  /** le cadre visible de la carte, en pixels écran : c'est la fenêtre dans
      laquelle on borne le déplacement, et le point de comparaison pour la
      molette et le double clic */
  function cadre() { return svg.getBoundingClientRect(); }

  /** relit l'étendue du dessin et le facteur d'échelle. Le facteur vient de la
      matrice de l'écran et non d'un rapport de largeurs : le navigateur peut
      réduire la carte pour la faire tenir, et la seule mesure qui tienne compte
      de tout est celle qu'il fait lui-même. */
  function mesurer() {
    var m = svg.getScreenCTM();
    if (!m) return false;
    k = Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) || 1;
    boite = corps.getBBox();
    return boite.width > 0 && boite.height > 0;
  }

  /** Bornes de déplacement sur un axe. `a0`/`a1` sont les bords du dessin en
      pixels écran à l'échelle 1, `s` l'échelle, `L` la taille du cadre.

      Une seule règle, comme dans index.html : la carte va jusqu'à ce qu'un de
      ses bords arrive au milieu de la fenêtre. On peut donc amener la gauche ou
      la droite de la France au centre de l'écran, sans avoir à zoomer d'abord,
      et le reste du cadre reste du vide — ce que la règle interdit, sans rien
      enlever de ce qu'elle promet. */
  function bornes(a0, a1, s, L) {
    return [L / 2 - a1 * s, L / 2 - a0 * s];
  }

  /** ramène la carte dans le cadre, ou la recentre si `centre` est vrai */
  function clamp(centre) {
    var r = cadre(), b = boite;
    var x0 = b.x * k, x1 = (b.x + b.width) * k;
    var y0 = b.y * k, y1 = (b.y + b.height) * k;
    if (centre) {
      tx = (r.width - (x1 - x0)) / 2 - x0;
      ty = (r.height - (y1 - y0)) / 2 - y0;
      return;
    }
    var bx = bornes(x0, x1, s, r.width), by = bornes(y0, y1, s, r.height);
    tx = Math.min(Math.max(tx, bx[0]), bx[1]);
    ty = Math.min(Math.max(ty, by[0]), by[1]);
  }

  function ecrire() {
    if (!boite) return;
    /* La transformation est demandée en unités du viewBox, mais tx et ty
      comptent des pixels d'écran : d'où la division par k. */
    corps.setAttribute("transform",
      "translate(" + (tx / k).toFixed(2) + " " + (ty / k).toFixed(2) + ") scale(" + s.toFixed(5) + ")");
    var r = cadre();
    var x0 = tx + boite.x * k * s, x1 = tx + (boite.x + boite.width) * k * s;
    var y0 = ty + boite.y * k * s, y1 = ty + (boite.y + boite.height) * k * s;
    repos = Math.abs(s - 1) < 1e-4 &&
      Math.abs(tx - (r.width - (x1 - x0)) / 2) < .5 &&
      Math.abs(ty - (r.height - (y1 - y0)) / 2) < .5;
    retour.classList.toggle("on", !repos);
  }

  /** agrandit (facteur supérieur à 1) ou réduit autour du point (cx, cy) du
      cadre, qui reste sous le curseur */
  function zoomAt(cx, cy, facteur) {
    arreter();
    var z = Math.min(MAXZ, Math.max(MINZ, s * facteur));
    if (z === s) return;
    tx = cx - (cx - tx) * (z / s);
    ty = cy - (cy - ty) * (z / s);
    s = z;
    clamp(false);
    ecrire();
  }

  /** revient à la France entière */
  function vue() { arreter(); s = 1; clamp(true); ecrire(); }

  /* ------------------------------------------------------------- élan
     Relâcher le bouton au moment exact où l'on vise ne déplace la carte que de
     quelques pixels, alors qu'on voulait souvent aller plus loin : elle continue
     donc sur sa lance et s'arrête seule quand la vitesse devient trop faible ou
     quand elle atteint une borne. Un clic ne lance rien. */
  function arreter() {
    if (elan) cancelAnimationFrame(elan);
    elan = 0; vx = 0; vy = 0;
  }

  function lancerElan() { if (!elan) elan = requestAnimationFrame(pasElan); }

  function pasElan() {
    var px = tx, py = ty;
    tx += vx; ty += vy;
    clamp(false); ecrire();
    /* Un axe qui n'a pas bougé est arrivé à sa borne : on oublie sa vitesse,
       sinon la carte continue de pousser contre un mur invisible. */
    if (Math.abs(tx - px) < Math.abs(vx) * .5) vx = 0;
    if (Math.abs(ty - py) < Math.abs(vy) * .5) vy = 0;
    vx *= .86; vy *= .86;
    if (Math.abs(vx) + Math.abs(vy) < .5) { elan = 0; return; }
    elan = requestAnimationFrame(pasElan);
  }

  /* ------------------------------------------------------------- molette */
  svg.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = cadre();
    var d = e.deltaMode === 1 ? e.deltaY * 16 : (e.deltaMode === 2 ? e.deltaY * 400 : e.deltaY);
    zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-d * 0.0016));
  }, { passive: false });

  /* -------------------------------------------- pointeur (souris / tactile)
     Sur le tactile, la carte ne prend que l'horizontale (voir touch-action
     dans la feuille de la page) : le défilement de la page, lui, reste
     possible, et c'est le geste le plus attendu sur un téléphone. */
  var pts = new Map();
  var debutX = 0, debutY = 0, baseX = 0, baseY = 0;
  var glisse = false, pince = null, pincee = false;

  function deux() {
    var a = [];
    pts.forEach(function (v) { a.push(v); });
    return a;
  }
  function milieu() { var a = deux(); return { x: (a[0].x + a[1].x) / 2, y: (a[0].y + a[1].y) / 2 }; }
  function etendue() { var a = deux(); return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y); }

  /* Le pointeur n'est capturé qu'une fois le geste reconnu comme un
     glissement. Capturer dès le pointerdown paraîtrait plus simple, mais la
     capture détourne la cible du clic vers le <svg> : le script de la page
     cherche e.target.closest('.dept'), ne trouve que la carte, et cliquer un
     département n'ouvre plus rien. Au seuil du glissement la capture est
     justement ce qu'il faut — c'est elle qui fait suivre le pointeur quand il
     sort du rectangle du SVG. */
  var pris = new Set();
  function capturer(id) {
    if (pris.has(id)) return;
    try { svg.setPointerCapture(id); pris.add(id); } catch (err) {}
  }
  function tousCaptures() {
    for (const id of Array.from(pts.keys())) capturer(id);
  }

  svg.addEventListener("pointerdown", function (e) {
    arreter();
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) {
      debutX = e.clientX; debutY = e.clientY;
      baseX = tx; baseY = ty;
      glisse = false; pincee = false;
    } else if (pts.size === 2) {
      tousCaptures();          /* deux doigts : le pincement est déjà un geste */
      var m = milieu();
      pince = { d: etendue(), mx: m.x, my: m.y, s: s, tx: tx, ty: ty };
      glisse = true; pincee = true;
    }
  });

  svg.addEventListener("pointermove", function (e) {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size >= 2) {                                    // pincement à deux doigts
      tousCaptures();
      var d = etendue(), m = milieu();
      if (pince && pince.d > 6 && d > 6) {
        var z = Math.min(MAXZ, Math.max(MINZ, pince.s * (d / pince.d)));
        var cx = (pince.mx - pince.tx) / pince.s;
        var cy = (pince.my - pince.ty) / pince.s;
        s = z; tx = m.x - cx * z; ty = m.y - cy * z;
        clamp(false); ecrire();
      }
      pince = { d: d, mx: m.x, my: m.y, s: s, tx: tx, ty: ty };
      svg.classList.add("glisse");
      return;
    }
    if (Math.abs(e.clientX - debutX) + Math.abs(e.clientY - debutY) > 5) glisse = true;
    if (glisse) {
      capturer(e.pointerId);
      var nx = baseX + (e.clientX - debutX);
      var ny = baseY + (e.clientY - debutY);
      /* ce que la carte vient de gagner : c'est la vitesse de l'élan, bridée
         pour qu'un saut de souris ne la projette pas hors de l'écran */
      vx = Math.max(-60, Math.min(60, nx - tx));
      vy = Math.max(-60, Math.min(60, ny - ty));
      tx = nx; ty = ny;
      clamp(false); ecrire();
    }
    svg.classList.toggle("glisse", glisse);
  });

  /* Un glissement se termine par un clic : sans avaler celui-ci, la carte
     ouvrirait le département sous le doigt à chaque fois qu'on la déplace.
     L'interception est posée en phase de capture sur le document, donc avant le
     script de la page qui lit le clic pour ouvrir le département. */
  var avale = false;
  document.addEventListener("click", function (e) {
    if (!avale) return;
    avale = false;
    if (!e.target || !svg.contains(e.target)) return;
    e.stopPropagation();
    e.preventDefault();
  }, true);

  function liberer(e) {
    var seul = pts.size === 1 && Array.from(pts.keys())[0] === e.pointerId;
    var bouge = Math.abs(e.clientX - debutX) + Math.abs(e.clientY - debutY);
    pts.delete(e.pointerId);
    if (pris.delete(e.pointerId)) {
      try { svg.releasePointerCapture(e.pointerId); } catch (err) {}
    }
    svg.classList.remove("glisse");
    if (seul && bouge > 6) avale = true;
    if (pts.size === 0) {
      if (seul && !pincee && bouge > 24 && Math.abs(vx) + Math.abs(vy) > 6) lancerElan();
      glisse = false; pince = null; pincee = false;
      if (!elan) { vx = 0; vy = 0; }
    } else if (pts.size === 1) {
      var a = deux()[0];
      debutX = a.x; debutY = a.y; baseX = tx; baseY = ty;
      glisse = false; pince = null; pincee = false;
    }
  }
  svg.addEventListener("pointerup", liberer);

  /* Un pointeur qui quitte le rectangle du SVG avant le seuil n'a pas encore été
     capturé : on ne reçoit plus rien de lui, et il resterait enregistré — le
     clic suivant serait pris pour un deuxième doigt, et la carte ferait un
     pincement fantôme. Ce pointerup sur la fenêtre ne le rattrape que dans ce
     cas : dès que le pointeur est capturé, c'est le SVG qui le reçoit, et il
     n'est plus dans pts quand la fenêtre voit l'événement. */
  window.addEventListener("pointerup", function (e) {
    if (pts.has(e.pointerId) && !pris.has(e.pointerId)) liberer(e);
  });

  svg.addEventListener("pointercancel", function (e) {
    arreter();
    pts.delete(e.pointerId);
    pris.delete(e.pointerId);
    svg.classList.remove("glisse");
    glisse = false; pince = null; pincee = false;
  });

  /* ------------------------------------------------- le coin des boutons
     Sur la carte des communes, les boutons sont posés par index.html, dans le
     coin de l'écran. Ici, ils doivent rester au coin de la carte : ils sont
     doncablement dans un coin à elle, posé dans le conteneur du SVG, que
     build/map-zoom.js vient compléter avec les siens. */
  var coins = document.createElement("div");
  coins.id = "controlesCarte";
  if (svg.parentNode) svg.parentNode.appendChild(coins);

  /* Ce coin est celui de la carte dessinée, et non celui de la boîte qui la
     contient : la carte est centrée dans une boîte plus large, et les boutons
     doivent rester sur elle. On l'ancre donc sur le coin du SVG — le décalage
     est calculé ici plutôt qu'en CSS, parce que la largeur de la carte dépend de
     la hauteur de la fenêtre, que la feuille de style ne peut pas deviner. */
  function placerCoins() {
    if (!coins.parentNode) return;
    var r = svg.getBoundingClientRect(), c = coins.parentNode.getBoundingClientRect();
    coins.style.left = (r.right - c.left - 12) + "px";
    coins.style.top = (r.bottom - c.top - 12) + "px";
  }

  /* Le bouton de retour : il n'y en a pas d'autre sur cette page, donc on le
     crée. Sa présence dit au lecteur qu'il y a quelque chose à défaire : il
     s'allume dès que la carte a bougé. */
  var retour = document.createElement("div");
  retour.id = "retourCarte";
  var b = document.createElement("button");
  b.type = "button";
  b.textContent = "↻";               /* comme le bouton de retour d'index.html */
  b.title = "Revenir à la France entière";
  b.setAttribute("aria-label", "Revenir à la France entière");
  b.addEventListener("click", function (e) { e.preventDefault(); vue(); });
  retour.appendChild(b);
  coins.appendChild(retour);

  /* -------------------------------------------- ce que la carte sait faire
     La même interface qu'index.html, que build/map-zoom.js consomme. */
  var abonnes = [];
  function changer() { for (var i = 0; i < abonnes.length; i++) abonnes[i](); }
  window.CARTE = {
    zoom: function (facteur) { var r = cadre(); zoomAt(r.width / 2, r.height / 2, facteur); },
    glisse: function (dx, dy) { arreter(); tx += dx; ty += dy; clamp(false); ecrire(); },
    vue: vue,
    disponible: function () { return !!(boite && boite.width > 0); },
    surChangement: function (f) { abonnes.push(f); f(); },
  };

  /* --------------------------------------------------------- démarrage */
  if (mesurer()) vue();
  placerCoins();
  changer();

  /* La carte est redimensionnée avec la fenêtre : son facteur change, donc ses
     bornes aussi, et le coin des boutons avec elle. On garde ce que le lecteur
     avait choisi — on ne remet la France entière que s'il ne l'avait pas
     quittée. */
  var minuteur = null;
  window.addEventListener("resize", function () {
    if (minuteur) clearTimeout(minuteur);
    minuteur = setTimeout(function () {
      minuteur = null;
      if (!mesurer()) return;
      clamp(repos);
      ecrire();
      placerCoins();
      changer();
    }, 120);
  });
})();