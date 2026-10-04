/* Génère la carte SVG statique des départements de France et l'injecte dans
 * carte.html (remplace le contenu de <div class="map-wrapper">).
 *
 *   node build/map-static.js            -> injecte dans carte.html
 *   node build/map-static.js --dry      -> affiche les stats sans écrire
 *   node build/map-static.js --out x.html
 *
 * Source : build/dep_simpl.geojson (les 101 départements, outre-mer compris).
 *
 * Les cinq départements d'outre-mer ne sont pas filtrés : ils sont dessinés
 * dans une colonne à droite de la France, avec exactement le même système —
 * même tracé .dept, même numéro, même pastille, même clic vers
 * index.html#<code>.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'build', 'dep_simpl.geojson');
const TARGET = path.join(ROOT, 'carte.html');

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const outIdx = argv.indexOf('--out');
const OUT = outIdx >= 0 ? argv[outIdx + 1] : TARGET;

/* ------------------------------------------------------------------ options */
const VIEW_W = 1200;      // largeur du viewBox (unités SVG)
const PREC = 1;           // décimales des coordonnées projetées
/* Ces tailles sont exprimées en unités SVG : la carte étant rendue bien plus
 * petite que son viewBox (limitée par max-height, ~0,85× en 1080p), la police
 * de base doit rester lisible une fois mise à l'échelle du navigateur. */
const FONT_MAX = 12.0;    // taille max des numéros
const FONT_MIN = 5.2;     // taille min (départements très petits : Paris…)
const STROKE_DEPT = 1.4;  // trait des frontières, en unités SVG
const LABEL_HALO = 0.24;  // épaisseur du liseré blanc = ratio * font-size
const LABEL_PRECISION = 0.2;  // finesse de recherche du point le plus profond

/* --- la colonne des départements d'outre-mer -----------------------------
 * Le viewBox s'élargit au lieu de rétrécir la France : celle-ci occupe
 * toujours toute la hauteur du dessin, donc elle garde la même taille à
 * l'écran, et la colonne occupe une place qui était vide. */
const COL_GAP = 62;       // blanc entre la France et la colonne
const COL_W = 250;        // largeur de la colonne
const COL_TITRE = 34;     // hauteur réservée à son titre
const COL_REMPLI = 0.78;  // part de la hauteur d'un cas occupée par l'île
/* Les départements d'outre-mer, dans l'ordre de la colonne : par numéro, donc
 * dans le même ordre que la carte et que le reste du site. */
const OUTRE_MER = ['971', '972', '973', '974', '976'];
/* 1 degré en équirectangulaire = 111,32 km. C'est le seul lien entre la
 * projection locale et l'échelle des cases, celle de la France comprise. */
const KM_PAR_DEG = 111.32;

/* ------------------------------------------------------------- projections */
const RAD = Math.PI / 180;

/* Lambert conforme conique à deux parallèles standards */
function lambert(p1, p2, p0, lon0) {
  const n = Math.log(Math.cos(p1 * RAD) / Math.cos(p2 * RAD)) /
            Math.log(Math.tan(Math.PI / 4 + p2 * RAD / 2) / Math.tan(Math.PI / 4 + p1 * RAD / 2));
  const F = Math.cos(p1 * RAD) * Math.pow(Math.tan(Math.PI / 4 + p1 * RAD / 2), n) / n;
  const rho0 = F / Math.pow(Math.tan(Math.PI / 4 + p0 * RAD / 2), n);
  return function (lon, lat) {
    const rho = F / Math.pow(Math.tan(Math.PI / 4 + lat * RAD / 2), n);
    const th = n * (lon - lon0) * RAD;
    return [rho * Math.sin(th), rho0 - rho * Math.cos(th)];
  };
}

const project = lambert(44, 49, 46.5, 3);

/* équirectangulaire locale, pour les départements d'outre-mer : c'est la
 * projection dont index.html se sert pour dessiner leurs communes, si bien que
 * la forme vue ici est celle qu'on retrouve en ouvrant le département. */
function plateCarree(lat0) {
  const k = Math.cos(lat0 * RAD);
  return function (lon, lat) { return [lon * k, -lat]; };
}

/* ------------------------------------------------------------------ helpers */
function ringsOf(g) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const out = [];
  for (const poly of polys) for (const ring of poly) out.push(ring);
  return out;
}

function ringArea(ring) {
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    a += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return Math.abs(a / 2);
}

function segDistSq(px, py, a, b) {
  let x = a[0], y = a[1];
  let dx = b[0] - x, dy = b[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) { x = b[0]; y = b[1]; }
    else if (t > 0) { x += dx * t; y += dy * t; }
  }
  dx = px - x; dy = py - y;
  return dx * dx + dy * dy;
}

/* distance signée au bord d'un anneau : + dedans, - dehors */
function ringDist(px, py, ring) {
  let inside = false, minSq = Infinity;
  for (let i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    const p = ring[i], q = ring[j];
    if ((p[1] > py) !== (q[1] > py) &&
        px < (q[0] - p[0]) * (py - p[1]) / (q[1] - p[1]) + p[0]) inside = !inside;
    const d = segDistSq(px, py, p, q);
    if (d < minSq) minSq = d;
  }
  return (inside ? 1 : -1) * Math.sqrt(minSq);
}

/* centroid pondéré par l'aire : bien meilleur point de départ que le centre
 * de la boîte englobante, qui sort souvent du polygone (départements concaves). */
function ringCentroid(ring) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    const c = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    a += c;
    cx += (ring[j][0] + ring[i][0]) * c;
    cy += (ring[j][1] + ring[i][1]) * c;
  }
  if (a === 0) {
    let sx = 0, sy = 0;
    for (const p of ring) { sx += p[0]; sy += p[1]; }
    return [sx / ring.length, sy / ring.length];
  }
  return [cx / (3 * a), cy / (3 * a)];
}

/* pole of inaccessibility : point le plus « profond » à l'intérieur d'un
 * anneau = meilleur emplacement pour un numéro (algo polylabel).
 *
 * Branch & bound : dans une cellule de demi-largeur h, aucun point n'est à plus
 * de h du centre, donc d + h est une borne haute. On empile les cellules par
 * borne haute décroissante et on s'arrête dès que la plus promettante ne peut
 * plus battre le meilleur déjà trouvé. */
function polylabel(ring, precision) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of ring) {
    if (p[0] < minX) minX = p[0];
    if (p[1] < minY) minY = p[1];
    if (p[0] > maxX) maxX = p[0];
    if (p[1] > maxY) maxY = p[1];
  }
  const w = maxX - minX, h = maxY - minY;
  if (!(w > 0) || !(h > 0)) return { x: minX, y: minY, r: 0 };

  const start = ringCentroid(ring);
  const queue = [{ x: start[0], y: start[1], h: Math.min(w, h) / 2,
                   d: ringDist(start[0], start[1], ring) }];
  let best = queue[0];

  while (queue.length) {
    queue.sort((a, b) => (b.d + b.h) - (a.d + a.h));
    const c = queue.shift();
    if (c.d + c.h <= best.d) break;      /* plus rien ne peut améliorer best */
    if (c.d > best.d) best = c;
    if (c.h <= precision) continue;
    const s = c.h / 2;
    for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const x = c.x + dx * s, y = c.y + dy * s;
      queue.push({ x, y, h: s, d: ringDist(x, y, ring) });
    }
  }
  return { x: best.x, y: best.y, r: Math.max(best.d, 0) };
}

const f = (v) => {
  const s = v.toFixed(PREC);
  return s === '-0' || /^-0\.0*$/.test(s) ? (0).toFixed(PREC) : s;
};

/* ------------------------------------------------------------------ lecture */
const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const feats = src.features.filter((x) => !OUTRE_MER.includes(x.properties.code));

/* projection + emprise globale */
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
const items = [];

for (const feat of feats) {
  const rings = ringsOf(feat.geometry).map((ring) => ring.map(([lon, lat]) => project(lon, lat)));
  for (const ring of rings) {
    for (const [x, y] of ring) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  items.push({ feat, rings });
}

const k = VIEW_W / (maxX - minX);
const viewW = VIEW_W + COL_GAP + COL_W;
const viewH = Math.round((maxY - minY) * k);

/* ------------------------------------------------------------------ tracés */
/* On repasse en unités SVG (y vers le bas) AVANT de calculer les emplacements :
 * la projection brute donne des valeurs de l'ordre de 0,01, incompatibles avec
 * une précision exprimée dans la même unité que les tranches du viewBox. */
for (const it of items) {
  it.svgRings = it.rings.map((ring) => ring.map(([x, y]) => [(x - minX) * k, (maxY - y) * k]));
}

/* ------------------------------------------------------- la colonne outre-mer
 * Cinq cas l'un sur l'autre, un par département, chacun centré dans son cas.
 *
 * L'échelle est propre à chaque département, et c'est délibéré : à une échelle
 * commune, Mayotte (31 km de large) tiendrait dans treize unités et serait
 * impossible à viser au doigt. Les agrandissements vont de 0,33 × l'échelle de
 * la France (la Guyane, qui est grande) à 3,3 × (Mayotte) ; c'est ce que dit
 * le titre de la colonne, et ce que la légende rappelle.
 *
 * Chaque département est agrandi dans son cadre, sans déborder sur le
 * voisin : le point de départ du numéro et de la pastille est donc calculé
 * comme pour la métropole, plus bas. */
const colX = VIEW_W + COL_GAP;
const caseH = (viewH - COL_TITRE) / OUTRE_MER.length;

OUTRE_MER.forEach(function (code, i) {
  const feat = src.features.find((x) => x.properties.code === code);
  if (!feat) return;

  /* latitude de référence : le milieu de l'étendue du département, là où
     l'équirectangulaire se trompe le moins. */
  let la = Infinity, he = -Infinity;
  for (const ring of ringsOf(feat.geometry)) {
    for (const pt of ring) {
      if (pt[1] < la) la = pt[1];
      if (pt[1] > he) he = pt[1];
    }
  }
  const proj = plateCarree((la + he) / 2);

  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const projetees = ringsOf(feat.geometry).map((ring) => ring.map((pt) => proj(pt[0], pt[1])));
  for (const ring of projetees) {
    for (const [x, y] of ring) {
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }

  /* plateCarree rend des degrés, pas des kilomètres : c'est KM_PAR_DEG qui
     fait le passage, une fois pour choisir l'échelle, une fois pour la poser. */
  const w = x1 - x0, h = y1 - y0;
  const s = Math.min(COL_W * 0.9 / (w * KM_PAR_DEG), caseH * COL_REMPLI / (h * KM_PAR_DEG));
  const unite = s * KM_PAR_DEG;        /* unités SVG par degré projeté */
  const dx = colX + (COL_W - w * unite) / 2;
  const dy = COL_TITRE + i * caseH + (caseH - h * unite) / 2;

  items.push({
    feat: feat,
    /* Le point le plus profond de l'île est souvent tout à fait en haut — le
       cap de la Basse-Terre, la Grande-Terre de Mayotte. Comme l'île est
       agrandie dans son cas et laisse donc du vide au-dessus d'elle, on
       descend le numéro d'autant : il se pose alors au milieu de la forme,
       comme sur la carte de la métropole. */
    decale: (caseH - h * unite) / 2,
    svgRings: projetees.map((ring) =>
      ring.map(([x, y]) => [dx + (x - x0) * unite, dy + (y1 - y) * unite])),
  });
});

const paths = [];
const labels = [];

for (const it of items) {
  const code = it.feat.properties.code;

  let d = '';
  for (const ring of it.svgRings) {
    let px = NaN, py = NaN;
    for (const [sx, sy] of ring) {
      if (sx === px && sy === py) continue;   /* purge les points confondus */
      d += (Number.isNaN(px) ? 'M' : 'L') + f(sx) + ' ' + f(sy);
      px = sx; py = sy;
    }
    d += 'Z';
  }
  paths.push({ code, nom: it.feat.properties.nom, d });

  /* emplacement du numéro : anneau le plus grand (partie principale) */
  let main = null;
  for (const ring of it.svgRings) {
    const a = ringArea(ring);
    if (!main || a > main.a) main = { a, ring };
  }
  const spot = polylabel(main.ring, LABEL_PRECISION);
  const bas = spot.y + (it.decale || 0);
  /* le texte doit tenir dans le disque inscrit : largeur ~ 0.62 * fs * nChars */
  const fs = Math.max(FONT_MIN,
                      Math.min(FONT_MAX, (2 * spot.r * 0.95) / (0.62 * code.length)));
  labels.push({
    code,
    x: spot.x,
    y: bas,
    /* le nombre de blocus se pose sous le numéro : sur la même ligne il se
       confondrait avec lui, et au-dessus il sortirait du département. */
    ny: bas + fs * 1.32,
    fs,
    nfs: +Math.max(4.2, fs * 0.74).toFixed(2),
    halo: +(fs * LABEL_HALO).toFixed(2),
  });
}

/* ------------------------------------------------------------------- sortie */
const sorted = {
  paths: paths.slice().sort((a, b) => a.code.localeCompare(b.code, 'fr')),
  labels: labels.slice().sort((a, b) => a.code.localeCompare(b.code, 'fr')),
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* `style=` et non attribut de présentation : ces derniers perdent contre la
 * règle CSS .dept-num, qui fixerait font-size et stroke-width pour tous. */
/* Chaque tracé porte son code dans data-code : c'est ce que le script
 * ci-dessous lit au clic pour ouvrir la carte du département dans index.html.
 * Le <title> donne le nom au survol, sans une ligne de JavaScript de plus.
 *
 * role="group" et non role="img" : avec role="img", un lecteur d'écran présente
 * le SVG comme une simple image et n'annonce aucun de ses tracés.
 *
 * `fill` est un attribut, pas une règle CSS : build/carte-teinte.js le
 * réécrit selon le nombre de blocus, et .dept:hover doit pouvoir gagner quand
 * même. Une règle CSS `.dept { fill: … }` l'emporterait toujours.
 *
 * data-zero est le filet de sécurité : tant qu'il est là, [data-zero] peint
 * l'aplat de fond pris dans la feuille de style, donc dans le thème en cours.
 * Sans JavaScript — ou dans les quelques millisecondes avant qu'il ne
 * s'exécute — la carte est déjà à sa bonne couleur, en clair comme en sombre.
 * carte-teinte.js retire l'attribut en peignant, et la couleur lui appartient. */
const APLAT_DEPART = '#f8fafc';
/* id="map" : le même nom que la carte des communes d'index.html, pour que
 * build/carte-pan.js et build/map-zoom.js la trouvent sans savoir sur quelle page
 * ils sont. build/carte-pan.js regroupe ensuite le tout dans un <g> pour la
 * déplacer. */
const svg =
  `<svg id="map" viewBox="0 0 ${viewW} ${viewH}" xmlns="http://www.w3.org/2000/svg" role="group" ` +
  `aria-label="Carte des départements de France : cliquez sur un département pour voir ses communes. ` +
  `Les départements d'outre-mer sont à droite, agrandis.">` +
  `<title>Carte des départements de France, outre-mer compris</title>` +
  `<g style="stroke-width:${STROKE_DEPT}">` +
  sorted.paths.map((p) =>
    `<path class="dept" data-code="${esc(p.code)}" data-zero fill="${APLAT_DEPART}" d="${p.d}">` +
    `<title>${esc(p.nom)} (${esc(p.code)}) — voir les communes</title></path>`).join('') +
  `</g><g>` +
  /* Le titre de la colonne : sans lui, une île agrandie à côté de la France
     passe pour une erreur de dessin. */
  `<text class="col-titre" x="${f(colX + COL_W / 2)}" y="${f(COL_TITRE * 0.66)}" ` +
  `style="font-size:${(COL_TITRE * 0.36).toFixed(2)}px;stroke-width:${(COL_TITRE * 0.036).toFixed(2)}px">` +
  `départements d’outre-mer, agrandis</text>` +
  sorted.labels.map((l) =>
    `<text class="dept-num" x="${f(l.x)}" y="${f(l.y)}" ` +
    `style="font-size:${l.fs.toFixed(2)}px;stroke-width:${l.halo}px">${esc(l.code)}</text>`).join('') +
  sorted.labels.map((l) =>
    `<text class="dept-nb" data-code="${esc(l.code)}" data-fs="${l.fs.toFixed(2)}" ` +
    `x="${f(l.x)}" y="${f(l.ny)}" ` +
    `style="font-size:${l.nfs.toFixed(2)}px;stroke-width:${(l.nfs * 0.26).toFixed(2)}px"></text>`).join('') +
  `</g></svg>`;

const size = (svg.length / 1024).toFixed(0);
const metro = items.length - OUTRE_MER.length;
console.log(`départements : ${items.length} (${metro} métropolitains + ` +
            `${OUTRE_MER.length} outre-mer) | viewBox : 0 0 ${viewW} ${viewH}`);
console.log(`colonne outre-mer : x ${colX} → ${colX + COL_W}, ` +
            `${OUTRE_MER.join(' ')}`);
console.log(`svg : ${size} Ko (${sorted.paths.length} tracés, ${sorted.labels.length} numéros)`);

const shrunk = labels.filter((l) => l.fs < FONT_MAX - 0.01)
                     .sort((a, b) => a.fs - b.fs);
console.log(`numéros réduits (départements les plus étroits) : ` +
            (shrunk.length ? shrunk.map((l) => `${l.code}=${l.fs.toFixed(1)}`).join(' ') : 'aucun'));

if (DRY) {
  /* carte.svg pour le navigateur, carte.json pour une rastérisation locale */
  fs.writeFileSync(path.join(ROOT, 'build', 'carte.svg'), svg, 'utf8');
  const flat = {
    viewW, viewH, stroke: STROKE_DEPT,
    depts: sorted.paths.map((p, i) => ({
      code: p.code,
      pts: p.d.match(/-?\d+(?:\.\d+)?/g).map(Number),
      lx: +f(sorted.labels[i].x),
      ly: +f(sorted.labels[i].y),
      fs: +sorted.labels[i].fs.toFixed(2),
    })),
  };
  fs.writeFileSync(path.join(ROOT, 'build', 'carte.json'), JSON.stringify(flat), 'utf8');
  console.log('aperçus écrits dans build/carte.svg et build/carte.json');
} else {
  const html = fs.readFileSync(TARGET, 'utf8');
  const re = /(<div class="map-wrapper"\s*>)([\s\S]*?)(<\/div>)/;
  if (!re.test(html)) {
    console.error('Introuvable : <div class="map-wrapper"> dans ' + TARGET);
    process.exit(1);
  }
  let out = html.replace(re, (_, a, __, c) => a + svg + c);

  /* --- ce que la carte ajoute autour d'elle ------------------------------
   * Deux choses, toutes deux facultatives et toutes deux regenerables :
   *  · une feuille de style (curseur, survol au clavier, grille de liens) ;
   *  · la grille de liens et le script de navigation.
   * Le script listensimplement le clic ; la grille garantit la même
   * navigation au clavier, sans JavaScript, et pour les départements les
   * plus petits — Corse-du-Sud n'occupe pas beaucoup de pixels. */

  const DEBUT = '<!-- #dep-nav debut -->', FIN = '<!-- #dep-nav fin -->';
  /* Relancer le générateur ne doit pas empiler les blocs : on retire
     ceux de la passe précédente avant d'injecter. */
  out = out.replace(/[ \t]*<!-- #dep-nav debut -->[\s\S]*?<!-- #dep-nav fin -->\s*/g, '');

  /* La légende d'origine — une simple phrase sur le clic — est retirée du
     gabarit : l'échelle de couleurs la remplace et en reprend la phrase. Sans
     ce retrait, la page afficherait deux légendes l'une à côté de l'autre. */
  out = out.replace(
    /<div class="legend">\s*<span class="legend-dot"><\/span>[\s\S]*?<\/div>/, '');

  const CSS =
`${DEBUT}
<style>
  /* Tant que la carte n'est pas peinte, elle l'est en gris de fond. La règle
     est sur l'attribut seul et non sur « .dept.zéro » : specificity 0,1,0,
     assez pour battre l'attribut fill, pas assez pour battre .dept:hover et
     .dept:focus-visible — le survol doit rester possible même avant le script. */
  [data-zero] { fill: var(--carte); }
  .dept { cursor: pointer; }
  .dept:focus-visible { outline: none; fill: var(--primary-light); stroke: var(--primary); stroke-width: 2.4; }

  /* Le nombre de blocus, sous le numéro du département. Il est écrit dans le
     fichier mais masqué : build/carte-teinte.js ne l'affiche que là où il
     tient, pour que la carte reste lisible. */
  .dept-nb {
    display: none;
    fill: var(--accent-fonce);
    font-weight: 700;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
    paint-order: stroke;
    stroke: var(--fonds);
    stroke-linejoin: round;
  }
  .dept-nb.on { display: block; }

  /* Le titre de la colonne des départements d'outre-mer. Même liseré que les
     numéros, pour qu'il se lise aussi bien sur le fond de la page que posé sur
     une île. */
  .col-titre {
    fill: var(--texte-3);
    font-weight: 600;
    text-anchor: middle;
    pointer-events: none;
    paint-order: stroke;
    stroke: var(--fonds);
    stroke-linejoin: round;
  }

  /* La barre du haut : celle du site. Son apparence est écrite une seule fois,
     dans build/nav.js, qui l'injecte ici comme sur les quatre autres pages ;
     il ne reste que la façon dont elle est posée. */
  header { position: sticky; top: 0; z-index: 20; }

  /* La légende : une rampe du fond au violet, et les trois chiffres qui la
     rendent honnête — 0, le maximum observé, et ce qu'on compte en tout.
     Elle se construit avec les mêmes variables que la carte, pour que les deux
     racontent la même chose dans les deux thèmes. */
  .leg-teinte {
    display: inline-block; width: 7.5rem; height: .7rem; border-radius: 4px;
    border: 1px solid var(--bord-2);
    background: linear-gradient(90deg, var(--carte) 0%, var(--teinte-violet) 100%);
    vertical-align: middle;
  }
  .leg-num { font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums; }
  .leg-note { color: var(--texte-3); font-size: .78rem; max-width: 62ch; margin: .35rem auto 0; }

  /* La carte se déplace et se zoome (build/carte-pan.js) : elle prend la main
     quand on la tire, mais seulement à l'horizontale — le défilement de la page
     doit rester possible sous le doigt, c'est le geste attendu sur un téléphone.
     Les boutons qu'elle pose avec build/map-zoom.js sont tous les deux dans le
     coin de la carte (voir #controlesCarte) ; leur apparence est dans
     build/carte-boutons.css, seule chose que les deux pages partagent. */
  #map { cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
  #map.glisse .dept { cursor: grabbing; }
  .map-wrapper { position: relative; }
  /* Le coin est ancré sur le coin de la carte par build/carte-pan.js (la carte
     est centrée dans une boîte plus large, sa largeur dépend de la hauteur de
     la fenêtre) ; le décalage en bas à gauche vient donc de là, pas d'ici. */
  #controlesCarte {
    position: absolute; transform: translate(-100%, -100%);
    display: flex; align-items: center; gap: 5px;
  }
  #zoomCarte { flex-direction: row; }
</style>${FIN}`;

  /* La légende est écrite ici plutôt que laissée dans le gabarit : elle parle
     de nombres qui changent tous les jours, et les trois valeurs qu'elle
     annonce sont remplies par build/carte-teinte.js à l'ouverture. */
  const LEGENDE =
`${DEBUT}
<div class="legend">
  <span class="fl">blocus</span>
  <span class="leg-num">0</span>
  <span class="leg-teinte" aria-hidden="true"></span>
  <span class="leg-num" id="legMax">0</span>
  <span class="leg-note">au plus observé dans un département. <span id="legDep">0</span> départements
  et <span class="leg-num" id="legTot">0</span> blocus décomptés, tous France.
  Cliquez sur un département pour ouvrir la carte de ses communes ; les départements
  d’outre-mer sont à droite, agrandis.</span>
</div>${FIN}`;

  /* Un clic sur un département ouvre sa carte de communes dans index.html.
     Le département est porté par le fragment de l'adresse, ce qui rend le
     lien partageable et permet le bouton « précédent » du navigateur.

     Il n'y a plus de grille de liens sous la carte : chaque tracé est lui-même
     cliquable et porte son nom dans un <title>. Cette grille était
     réécrite ici à chaque passage, et elle revenait après qu'on l eut retirée à
     la main : ce fichier dit ce que la page est, il ne doit donc pas
     ressusciter ce que la page a décidé de ne pas avoir. */
  const CLIC =
`${DEBUT}
<script>
(function () {
  var carte = document.querySelector('.map-wrapper svg');
  if (!carte) return;
  carte.addEventListener('click', function (e) {
    var p = e.target.closest && e.target.closest('.dept');
    if (p) location.href = 'index.html#' + p.getAttribute('data-code');
  });
})();
</script>${FIN}`;

  /* Les scripts de la barre et de la couleur. Ils sont ici, et non dans le
     gabarit, parce qu'ils font partie de ce que le générateur produit : la
     carte ne peut pas être repeinte sans eux. */
  const SCRIPTS =
`${DEBUT}
<script src="build/nav.js"></script>
<script src="build/teinte.js"></script>
<script src="build/blocus.js"></script>
<script src="build/blocus-recherche.js"></script>
<script src="build/filtre.js"></script>
<script src="build/carte-teinte.js"></script>${FIN}`;

  if (out.indexOf('</head>') === -1) {
    console.error('Introuvable : </head> dans ' + TARGET);
    process.exit(1);
  }
  out = out.replace('</head>', CSS + '\n</head>');

  /* L'en-tête de la page ne garde que le nom du site : la barre de menus et le
     filtre sont posés par leurs scripts, et les réécrire ici à chaque passage
     les ferait dépendre d'un générateur au lieu d'un seul fichier. */
  const entete = /<header>[\s\S]*?<\/header>/;
  if (!entete.test(out)) {
    console.error('Introuvable : <header> dans ' + TARGET);
    process.exit(1);
  }
  out = out.replace(entete,
    '<header>' +
    '<nav id="nav" aria-label="Navigation principale"></nav>' +
    '<div id="filtre" role="group" aria-label="Choisir les blocus à afficher"></div>' +
    '</header>');

  /* La légende et le script de clic vont sous la carte, à l'intérieur du gabarit
     (largeur maximale 1400 px, centrage) plutôt qu'en pleine largeur de page
     comme le ferait une injection avant </body>. */
  const ancre = /(\n\s*<\/div>\s*<\/main>)/;
  if (!ancre.test(out)) {
    console.error('Introuvable : la fermeture de <main> dans ' + TARGET);
    process.exit(1);
  }
  out = out.replace(ancre, (_, m) => '\n' + LEGENDE + '\n' + CLIC + m);

  if (out.indexOf('</body>') === -1) {
    console.error('Introuvable : </body> dans ' + TARGET);
    process.exit(1);
  }
  /* Le bloc est posé devant mobile-nav.js, premier des trois scripts que le
     gabarit porte après lui, et non devant </body> : injecté à la fin, il
     passerait après eux et l'ordre que build/controle-carte.js vérifie serait
     rompu. L'ordre n'est pas indifferent — carte-teinte.js peint dès qu'il a
     les couleurs, et les scripts qui déplacent la carte viennent ensuite. */
  const ancreScripts = '<script src="build/mobile-nav.js">';
  out = out.replace(out.indexOf(ancreScripts) >= 0 ? ancreScripts : '</body>',
                    SCRIPTS + '\n' + (out.indexOf(ancreScripts) >= 0 ? ancreScripts : '</body>'));

  fs.writeFileSync(OUT, out, 'utf8');
  console.log('carte injectée dans ' + path.relative(ROOT, OUT) +
              ' (' + (out.length / 1024).toFixed(0) + ' Ko)');
  console.log(`${sorted.paths.length} départements cliquables vers index.html#<code>`);
  console.log(`${sorted.labels.length} emplacements de nombre de blocus`);
}