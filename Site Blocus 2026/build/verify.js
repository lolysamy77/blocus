// Vérification quantitative : fidélité de la simplification + intégrité topologique
const fs = require('fs');
const orig = JSON.parse(fs.readFileSync('build/dep_dom.geojson', 'utf8'));
const simp = JSON.parse(fs.readFileSync('build/dep_simpl.geojson', 'utf8'));

const R = 6371008.8;
function ringArea(ring) { // m², sphérique
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const p1 = ring[j], p2 = ring[i];
    a += (p2[0] - p1[0]) * Math.PI / 180 * R * Math.cos((p1[1] + p2[1]) / 2 * Math.PI / 180) * (p2[1] + p1[1]) / 2 * Math.PI / 180;
  }
  return Math.abs(a / 2);
}
function featArea(f) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  let t = 0;
  for (const poly of polys) { poly.forEach((r, i) => { const a = ringArea(r); t += i === 0 ? a : -a; }); }
  return Math.abs(t);
}
const ringsOf = (f) => {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const out = [];
  for (const poly of polys) for (const r of poly) out.push(r);
  return out;
};
const keyOf = (r) => r.map((p) => p[0] + ' ' + p[1]).join('|');
const canon = (r) => { const a = keyOf(r), b = keyOf(r.slice().reverse()); return a <= b ? a : b; };

// 1) intégrité topologique : toute frontière partagée est-elle toujours identique ?
const map = new Map(simp.features.map((f) => [f.properties.code, f]));
const sharedOrig = new Map(), sharedSimp = new Map();
for (const f of orig.features) for (const r of ringsOf(f)) { const k = canon(r); sharedOrig.set(k, (sharedOrig.get(k) || 0) + 1); }
for (const f of simp.features) for (const r of ringsOf(f)) { const k = canon(r); sharedSimp.set(k, (sharedSimp.get(k) || 0) + 1); }
let mismatched = 0, shared = 0;
for (const [k, c] of sharedOrig) if (c > 1) { shared++; if (!sharedSimp.has(k)) mismatched++; }
console.log('frontières partagées (original):', shared, '| non retrouvées à l identique après simplification:', mismatched);

// 2) écart d'aire par département
let worst = { d: 0 }, maxRel = 0, sumRel = 0;
const rows = [];
for (const f of orig.features) {
  const code = f.properties.code;
  const s = map.get(code);
  if (!s) { console.log('MANQUANT', code); continue; }
  const a1 = featArea(f), a2 = featArea(s);
  const rel = a1 ? Math.abs(a2 - a1) / a1 : 0;
  rows.push([code, f.properties.nom, Math.round(a1), Math.round(a2), (rel * 100).toFixed(3)]);
  maxRel = Math.max(maxRel, rel); sumRel += rel;
  if (rel > worst.d) worst = { d: rel, code, nom: f.properties.nom };
}
rows.sort((a, b) => parseFloat(b[4]) - parseFloat(a[4]));
console.log('\nTop 8 écarts d\'aire (%) :');
for (const r of rows.slice(0, 8)) console.log('  ', r[0], r[1].padEnd(24), r[2], '->', r[3], r[4] + '%');
console.log('écart moyen:', (sumRel / rows.length * 100).toFixed(4) + '%', '| max:', (maxRel * 100).toFixed(3) + '%', worst.code, worst.nom);

// 3) déviation géométrique : chaque sommet simplifié vs polyligne originale (en mètres)
function distToSeg(p, a, b) {
  const la = (a[0] - p[0]) * 111320 * Math.cos(p[1] * Math.PI / 180), la2 = (a[1] - p[1]) * 110540;
  const lb = (b[0] - p[0]) * 111320 * Math.cos(p[1] * Math.PI / 180), lb2 = (b[1] - p[1]) * 110540;
  const dx = lb - la, dy = lb2 - la2;
  const L = dx * dx + dy * dy;
  let t = L ? ((-la * dx) + (-la2 * dy)) / L : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  const ex = la + t * dx, ey = la2 + t * dy;
  return Math.hypot(ex, ey);
}
function maxDev(sRing, oRings) {
  let m = 0;
  for (const p of sRing) {
    let best = Infinity;
    for (const o of oRings) {
      for (let i = 0; i < o.length - 1; i++) {
        const d = distToSeg(p, o[i], o[i + 1]);
        if (d < best) { best = d; if (best < 0.5) break; }
      }
      if (best < 0.5) break;
    }
    if (best > m) m = best;
  }
  return m;
}
let gmax = 0, gmaxCode = '', gsum = 0, gn = 0;
for (const f of simp.features) {
  const code = f.properties.code;
  const o = orig.features.find((x) => x.properties.code === code);
  const oR = ringsOf(o);
  for (const r of ringsOf(f)) {
    const d = maxDev(r, oR);
    gsum += d; gn++;
    if (d > gmax) { gmax = d; gmaxCode = code + ' ' + o.properties.nom; }
  }
}
console.log('\ndéviation max (m):', gmax.toFixed(1), '=>', gmaxCode, '| déviation moyenne:', (gsum / gn).toFixed(1), 'm');

// 4) bbox de chaque outre-mer + contrôles d'exemples
for (const c of ['971', '972', '973', '974', '976', '75', '2A']) {
  const f = map.get(c);
  const r = ringsOf(f);
  let bb = [1e9, 1e9, -1e9, -1e9];
  for (const ring of r) for (const p of ring) { bb[0] = Math.min(bb[0], p[0]); bb[1] = Math.min(bb[1], p[1]); bb[2] = Math.max(bb[2], p[0]); bb[3] = Math.max(bb[3], p[1]); }
  console.log(c, f.properties.nom.padEnd(22), 'anneaux:', String(r.length).padStart(4), 'bbox:', bb.map((v) => v.toFixed(3)).join(', '), '| aire:', Math.round(featArea(f) / 1e6) + ' km²');
}