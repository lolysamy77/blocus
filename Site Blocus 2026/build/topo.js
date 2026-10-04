/* Simplification avec conservation de la topologie.
 *
 * Principe : on reconstruit le graphe planaire réel des frontières
 * (sommets = coordonnées, arêtes = segments entre deux sommets), on identifie
 * les nœuds de branchement (junctions), puis on simplifie chaque chaîne
 * (suite d'arêtes entre deux junctions, ou cycle fermé) UNE SEULE FOIS.
 * Comme la frontière entre deux départements est une suite de sommets
 * rigoureusement identique dans les deux départements, les deux départements
 * utilisent la même chaîne simplifiée => jointures parfaites, aucun trou.
 */
const fs = require('fs');

const src = JSON.parse(fs.readFileSync('build/dep_dom.geojson', 'utf8'));
const TOL = parseFloat(process.argv[2] || '0.0012');
const PREC_OUT = parseInt(process.argv[3] || '3', 10);
const MIN_AREA = parseFloat(process.argv[4] || '1e-6');
const K = 1e5;                       // grille de fusion des sommets (~1 m)
const R10 = Math.pow(10, PREC_OUT);

function dp(pts, tol) {             // Douglas-Peucker sur polyligne ouverte
  const n = pts.length;
  if (n < 3) return pts.slice();
  const keep = new Uint8Array(n);
  keep[0] = 1; keep[n - 1] = 1;
  const stack = [[0, n - 1]], tol2 = tol * tol;
  while (stack.length) {
    const [a, b] = stack.pop();
    if (b - a < 2) continue;
    const ax = pts[a][0], ay = pts[a][1], bx = pts[b][0], by = pts[b][1];
    const dx = bx - ax, dy = by - ay, len2 = dx * dx + dy * dy;
    let best = -1, bestD = 0;
    for (let i = a + 1; i < b; i++) {
      const px = pts[i][0], py = pts[i][1];
      let d2;
      if (len2 === 0) { d2 = (px - ax) * (px - ax) + (py - ay) * (py - ay); }
      else {
        let t = ((px - ax) * dx + (py - ay) * dy) / len2;
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        const ex = ax + t * dx - px, ey = ay + t * dy - py;
        d2 = ex * ex + ey * ey;
      }
      if (d2 > bestD) { bestD = d2; best = i; }
    }
    if (bestD > tol2) { keep[best] = 1; stack.push([a, best], [best, b]); }
  }
  const out = [];
  for (let i = 0; i < n; i++) if (keep[i]) out.push(pts[i]);
  return out;
}
function dpClosed(pts, tol) {       // polyligne fermée : coupée en 2 au point le plus éloigné
  if (pts.length < 4) return pts.slice();
  let far = 0, fd = -1;
  for (let i = 1; i < pts.length; i++) {
    const d = (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2;
    if (d > fd) { fd = d; far = i; }
  }
  const s1 = dp(pts.slice(0, far + 1), tol);
  const s2 = dp(pts.slice(far).concat([pts[0]]), tol);
  return s1.concat(s2.slice(1, -1));
}

// ------------------------------------------------------------------ graphe
const nodes = [], nodeId = new Map();
const nodeOf = (lon, lat) => {
  const k = Math.round(lon * K) + ',' + Math.round(lat * K);
  let id = nodeId.get(k);
  if (id === undefined) { id = nodes.length; nodeId.set(k, id); nodes.push([lon, lat]); }
  return id;
};
const arcs = new Map();             // arcKey -> {a, b, rings:Set}
const ringArcs = [];
let ringCount = 0;

for (const f of src.features) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  for (const poly of polys) {
    for (const ring of poly) {
      const closed = ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1];
      const pts = closed ? ring.slice(0, -1) : ring.slice();
      if (pts.length < 3) continue;
      const seq = pts.map((p) => nodeOf(p[0], p[1]));
      const sd = [seq[0]];
      for (let i = 1; i < seq.length; i++) if (seq[i] !== sd[sd.length - 1]) sd.push(seq[i]);
      if (sd.length < 3) continue;
      if (sd[0] === sd[sd.length - 1]) sd.pop();
      if (sd.length < 3) continue;
      const ri = ringCount++;
      const akeys = [];
      for (let i = 0; i < sd.length; i++) {
        const u = sd[i], v = sd[(i + 1) % sd.length];
        const ak = u < v ? u + '_' + v : v + '_' + u;
        if (akeys[akeys.length - 1] !== ak) akeys.push(ak);
        let arc = arcs.get(ak);
        if (!arc) { arc = { a: Math.min(u, v), b: Math.max(u, v), rings: new Set() }; arcs.set(ak, arc); }
        arc.rings.add(ri);
      }
      ringArcs.push(akeys);
    }
  }
}
const arcEnds = (ak) => { const a = arcs.get(ak); return [a.a, a.b]; };
const other = (ak, n) => { const a = arcs.get(ak); return a.a === n ? a.b : a.a; };

// ------------------------------------------------------- nœuds de branchement
const incident = new Map();
for (const ak of arcs.keys()) {
  const a = arcs.get(ak);
  if (!incident.has(a.a)) incident.set(a.a, []);
  if (!incident.has(a.b)) incident.set(a.b, []);
  incident.get(a.a).push(ak); incident.get(a.b).push(ak);
}
const isJ = (n) => (incident.get(n) || []).length !== 2;
let nJ = 0; for (const n of incident.keys()) if (isJ(n)) nJ++;

// ---------------------------------------------------- découpage en chaînes
const arcChain = new Map();          // arcKey -> index de chaîne
const chainNodes = [], chainClosed = [], chainArcs = [];
function addChain(startArc, seq, akeys, closed) {
  const ci = chainNodes.length;
  chainNodes.push(seq); chainClosed.push(closed); chainArcs.push(akeys);
  for (const ak of akeys) arcChain.set(ak, ci);
  void startArc;
}
const used = new Set();
for (const [n0] of incident) {
  if (!isJ(n0)) continue;
  for (const ak of incident.get(n0)) {
    if (used.has(ak)) continue;
    const seq = [n0], aks = [];
    let cur = n0, curArc = ak;
    while (true) {
      used.add(curArc); aks.push(curArc);
      const nxt = other(curArc, cur);
      seq.push(nxt); cur = nxt;
      if (isJ(cur)) break;
      const nexts = incident.get(cur).filter((x) => !used.has(x));
      if (nexts.length !== 1) break;
      curArc = nexts[0];
    }
    addChain(ak, seq, aks, false);
  }
}
for (const ak of arcs.keys()) {          // cycles fermés restants (littoraux, îles)
  if (used.has(ak)) continue;
  const start = arcEnds(ak)[0];
  const seq = [start], aks = [];
  let cur = start, curArc = ak, closed = false;
  while (true) {
    used.add(curArc); aks.push(curArc);
    const nxt = other(curArc, cur);
    seq.push(nxt);
    if (nxt === start) { closed = true; break; }
    cur = nxt;
    const nexts = incident.get(cur).filter((x) => !used.has(x));
    if (nexts.length !== 1) break;
    curArc = nexts[0];
  }
  addChain(ak, seq, aks, closed);
}
console.log('sommets:', nodes.length, '| arêtes:', arcs.size, '| anneaux:', ringCount,
  '| junctions:', nJ, '| chaînes:', chainNodes.length, '| dont fermées:', chainClosed.filter(Boolean).length);
const uncovered = [...arcs.keys()].filter((ak) => !arcChain.has(ak)).length;
console.log('arêtes non couvertes:', uncovered);

// ------------------------------------------------------- simplification
const chainPts = [];
let before = 0, after = 0;
for (let ci = 0; ci < chainNodes.length; ci++) {
  const seq = chainNodes[ci];
  before += seq.length;
  const abs = seq.map((n) => nodes[n]);
  let s = chainClosed[ci] ? dpClosed(abs, TOL) : dp(abs, TOL);
  if (s.length < 2) s = [abs[0], abs[abs.length - 1]];
  let res = s.map((p) => [Math.round(p[0] * R10) / R10, Math.round(p[1] * R10) / R10]);
  const clean = [];
  for (const p of res) {
    const l = clean[clean.length - 1];
    if (!l || l[0] !== p[0] || l[1] !== p[1]) clean.push(p);
  }
  if (clean.length < 2) { clean.length = 0; clean.push(res[0], res[res.length - 1]); }
  after += clean.length;
  chainPts.push({ first: seq[0], pts: clean });
}
console.log('points:', before, '->', after);

// ------------------------------------------------------- reconstruction
const ringsOut = [];
const order = [];
let missing = 0;
for (let ri = 0; ri < ringCount; ri++) {
  let pts = [];
  let prevChain = -1;
  for (const ak of ringArcs[ri]) {
    const ci = arcChain.get(ak);
    if (ci === undefined) { missing++; continue; }
    if (ci === prevChain) continue;   // arêtes consécutives d'une même chaîne : déjà tracées
    prevChain = ci;
    const cp = chainPts[ci];
    const seg = cp.first === arcEnds(ak)[0] ? cp.pts : cp.pts.slice().reverse();
    for (let k = pts.length ? 1 : 0; k < seg.length; k++) {
      const p = seg[k], l = pts[pts.length - 1];
      if (!l || l[0] !== p[0] || l[1] !== p[1]) pts.push(p);
    }
  }
  if (pts.length > 1) { const f = pts[0], l = pts[pts.length - 1]; if (f[0] === l[0] && f[1] === l[1]) pts.pop(); }
  if (pts.length < 3) pts = [];
  else pts.push([pts[0][0], pts[0][1]]);
  let a = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) a += pts[j][0] * pts[i][1] - pts[i][0] * pts[j][1];
  ringsOut.push({ pts, area: Math.abs(a / 2) });
}
// correspondance avec les features d'origine (même ordre de création)
{
  let i = 0;
  for (const f of src.features) {
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    polys.forEach((poly, pi) => {
      for (const ring of poly) {
        const closed = ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1];
        const p = closed ? ring.slice(0, -1) : ring.slice();
        if (p.length < 3) continue;
        const seq = p.map((q) => nodeOf(q[0], q[1]));
        const sd = [seq[0]];
        for (let k = 1; k < seq.length; k++) if (seq[k] !== sd[sd.length - 1]) sd.push(seq[k]);
        if (sd.length < 3) continue;
        if (sd[0] === sd[sd.length - 1]) sd.pop();
        if (sd.length < 3) continue;
        order.push({ feature: f, polyIdx: pi, ri: i++ });
      }
    });
  }
}
// suppression des anneaux minuscules non partagés
const ringShared = new Array(ringCount).fill(false);
for (const arc of arcs.values()) if (arc.rings.size > 1) for (const ri of arc.rings) ringShared[ri] = true;
const keep = new Array(ringCount).fill(true);
let dropped = 0;
for (let i = 0; i < ringCount; i++) {
  if (!ringsOut[i].pts.length) { keep[i] = false; dropped++; continue; }
  if (ringsOut[i].area < MIN_AREA && !ringShared[i]) { keep[i] = false; dropped++; }
}
{   // chaque département conserve au moins son plus grand anneau
  const best = new Map();
  for (let i = 0; i < ringCount; i++) {
    const c = order[i].feature.properties.code;
    if (!best.has(c) || ringsOut[i].area > ringsOut[best.get(c)].area) best.set(c, i);
  }
  for (const i of best.values()) keep[i] = true;
}
const perFeature = new Map();
for (let i = 0; i < ringCount; i++) {
  if (!keep[i]) continue;
  const o = order[i], code = o.feature.properties.code;
  if (!perFeature.has(code)) perFeature.set(code, { nom: o.feature.properties.nom, polys: new Map() });
  const pf = perFeature.get(code);
  if (!pf.polys.has(o.polyIdx)) pf.polys.set(o.polyIdx, []);
  pf.polys.get(o.polyIdx).push(ringsOut[i].pts);
}
const feats = [];
for (const [code, pf] of perFeature) {
  const polys = [];
  for (const [, rs] of pf.polys) if (rs.length) polys.push(rs);
  if (!polys.length) continue;
  const single = polys.length === 1 && polys[0].length === 1;
  feats.push({
    type: 'Feature',
    properties: { code, nom: pf.nom },
    geometry: { type: single ? 'Polygon' : 'MultiPolygon', coordinates: single ? polys[0] : polys },
  });
}
feats.sort((a, b) => a.properties.code.localeCompare(b.properties.code));
const json = JSON.stringify({ type: 'FeatureCollection', features: feats });
fs.writeFileSync('build/dep_simpl.geojson', json);
let n = 0; for (const f of feats) { const w = (a) => { if (typeof a[0] === 'number') { n++; return; } a.forEach(w); }; w(f.geometry.coordinates); }
console.log('tol=', TOL, '| anneaux supprimés:', dropped, '| arcs perdus:', missing);
console.log('features:', feats.length, '| points:', n, '| taille:', (json.length / 1024).toFixed(0), 'Ko');