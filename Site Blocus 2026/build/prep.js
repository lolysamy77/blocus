// PrÃ©pare un GeoJSON simplifiÃ© des 101 dÃ©partements franÃ§ais.
// - dÃ©doublonne les anneaux partagÃ©s (topologie) puis simplifie une seule fois par anneau
//   => les frontiÃ¨res communes restent exactement identiques, aucun trou visible
// - arrondit les coordonnÃ©es
const fs = require('fs');

const src = JSON.parse(fs.readFileSync('build/dep_dom.geojson', 'utf8'));

const TOL = parseFloat(process.argv[2] || '0.0006');
const PREC_SNAP = 5;      // arrondi avant recherche d'anneaux identiques
const PREC_OUT = parseInt(process.argv[3] || '4', 10);
const MIN_AREA = parseFloat(process.argv[4] || '1e-6');
const MIN_PTS = 4;

const snap = (v) => parseFloat(v.toFixed(PREC_SNAP));

// --- simplification Douglas-Peucker itÃ©rative (pas de rÃ©cursion) ---
function dp(pts, tol) {
  const n = pts.length;
  if (n < 3) return pts.slice();
  const keep = new Uint8Array(n);
  keep[0] = 1; keep[n - 1] = 1;
  const stack = [[0, n - 1]];
  const tol2 = tol * tol;
  while (stack.length) {
    const [a, b] = stack.pop();
    if (b - a < 2) continue;
    const ax = pts[a][0], ay = pts[a][1], bx = pts[b][0], by = pts[b][1];
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let best = -1, bestD = 0;
    for (let i = a + 1; i < b; i++) {
      const px = pts[i][0], py = pts[i][1];
      let d2;
      if (len2 === 0) {
        d2 = (px - ax) * (px - ax) + (py - ay) * (py - ay);
      } else {
        let t = ((px - ax) * dx + (py - ay) * dy) / len2;
        if (t < 0) t = 0; else if (t > 1) t = 1;
        const ex = ax + t * dx - px, ey = ay + t * dy - py;
        d2 = ex * ex + ey * ey;
      }
      if (d2 > bestD) { bestD = d2; best = i; }
    }
    if (bestD > tol2) {
      keep[best] = 1;
      stack.push([a, best], [best, b]);
    }
  }
  const out = [];
  for (let i = 0; i < n; i++) if (keep[i]) out.push(pts[i]);
  return out;
}

// simplifie un anneau fermÃ© en le coupant au point le plus Ã©loignÃ© du 1er point
function simplifyRing(ring, tol) {
  let r = ring;
  // normalise : fermÃ©, sans doublons consÃ©cutifs
  const clean = [];
  for (const p of r) {
    const q = [snap(p[0]), snap(p[1])];
    const last = clean[clean.length - 1];
    if (!last || last[0] !== q[0] || last[1] !== q[1]) clean.push(q);
  }
  if (clean.length > 1) {
    const f = clean[0], l = clean[clean.length - 1];
    if (f[0] === l[0] && f[1] === l[1]) clean.pop();
  }
  if (clean.length < MIN_PTS) return null;

  // aire signÃ©e approximative
  let area = 0;
  for (let i = 0, j = clean.length - 1; i < clean.length; j = i++) {
    area += clean[j][0] * clean[i][1] - clean[i][0] * clean[j][1];
  }
  area = Math.abs(area / 2);
  if (area < MIN_AREA) return null;

  // point le plus Ã©loignÃ© du premier => 2 chaÃ®nes ouvertes
  let far = 0, fd = -1;
  const x0 = clean[0][0], y0 = clean[0][1];
  for (let i = 1; i < clean.length; i++) {
    const d = (clean[i][0] - x0) ** 2 + (clean[i][1] - y0) ** 2;
    if (d > fd) { fd = d; far = i; }
  }
  const c1 = clean.slice(0, far + 1);
  const c2 = clean.slice(far).concat([clean[0]]);
  let s = dp(c1, tol).concat(dp(c2, tol).slice(1, -1));
  if (s.length < MIN_PTS) return null;

  // arrondi final + nettoyage
  const o = [];
  for (const p of s) {
    const q = [parseFloat(p[0].toFixed(PREC_OUT)), parseFloat(p[1].toFixed(PREC_OUT))];
    const last = o[o.length - 1];
    if (!last || last[0] !== q[0] || last[1] !== q[1]) o.push(q);
  }
  if (o.length > 1) {
    const f = o[0], l = o[o.length - 1];
    if (f[0] === l[0] && f[1] === l[1]) o.pop();
  }
  if (o.length < 3) return null;
  o.push([o[0][0], o[0][1]]);
  return o;
}

// --- construction de la topologie partagÃ©e ---
const cache = new Map(); // key -> {pts, reversed}
const keyOf = (r) => r.map((p) => p[0] + ' ' + p[1]).join('|');

function resolveRing(ring) {
  const fwd = keyOf(ring);
  const rev = keyOf(ring.slice().reverse());
  let key, isRev;
  if (fwd <= rev) { key = fwd; isRev = false; } else { key = rev; isRev = true; }
  let entry = cache.get(key);
  if (!entry) {
    const pts = simplifyRing(ring, TOL);
    entry = { pts, canonical: fwd <= rev };
    cache.set(key, entry);
  }
  if (!entry.pts) return null;
  if (isRev === !entry.canonical) return entry.pts.slice().reverse();
  return entry.pts.slice();
}

const out = [];
let dropped = 0, totalPts = 0;
for (const f of src.features) {
  const g = f.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const keptPolys = [];
  for (const poly of polys) {
    const rings = [];
    for (let i = 0; i < poly.length; i++) {
      const s = resolveRing(poly[i]);
      if (!s) { dropped++; continue; }
      rings.push(s);
      totalPts += s.length;
    }
    if (rings.length) keptPolys.push(rings);
  }
  if (!keptPolys.length) continue;
  const single = keptPolys.length === 1 && keptPolys[0].length === 1;
  out.push({
    type: 'Feature',
    properties: { code: f.properties.code, nom: f.properties.nom },
    geometry: {
      type: single ? 'Polygon' : 'MultiPolygon',
      coordinates: single ? keptPolys[0] : keptPolys,
    },
  });
}

const collection = { type: 'FeatureCollection', features: out };
const json = JSON.stringify(collection);
fs.writeFileSync('build/dep_simpl.geojson', json);

console.log('tol=', TOL, '| anneaux uniques:', cache.size, '| anneaux supprimÃ©s:', dropped);
console.log('features:', out.length, '| points:', totalPts, '| taille:', (json.length / 1024).toFixed(0), 'Ko');
const codes = out.map((f) => f.properties.code).sort();
console.log('codes manquants ?', codes.length);
