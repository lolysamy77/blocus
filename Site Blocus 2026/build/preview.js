// Compare visuellement : original vs simplifié (plate carrée, vue sur la métropole)
const fs = require('fs');
const orig = JSON.parse(fs.readFileSync('build/dep_dom.geojson', 'utf8'));
const simp = JSON.parse(fs.readFileSync('build/dep_simpl.geojson', 'utf8'));

const W = 900;
function mkPath(g, lat) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  let d = '';
  for (const poly of polys) {
    for (const ring of poly) {
      for (let i = 0; i < ring.length; i++) {
        const x = ((ring[i][0] - lat.lon0) * lat.kx).toFixed(1);
        const y = ((lat.lat1 - ring[i][1]) * lat.ky).toFixed(1);
        d += (i === 0 ? 'M' : 'L') + x + ' ' + y;
      }
      d += 'Z';
    }
  }
  return d;
}
function bbox(features, filter) {
  let a = [1e9, 1e9, -1e9, -1e9];
  for (const f of features) {
    if (filter && !filter(f)) continue;
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) for (const ring of poly) for (const p of ring) {
      a[0] = Math.min(a[0], p[0]); a[1] = Math.min(a[1], p[1]);
      a[2] = Math.max(a[2], p[0]); a[3] = Math.max(a[3], p[1]);
    }
  }
  return a;
}
function svg(features, title, filter) {
  const b = bbox(features, filter);
  const kx = W / (b[2] - b[0]);
  const ky = kx; // plate carrée equirectangulaire
  const H = Math.round((b[3] - b[1]) * ky);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" style="background:#fff">` +
    `<rect width="${W}" height="${H}" fill="#f3f4f6"/>`;
  for (const f of features) {
    if (filter && !filter(f)) continue;
    s += `<path d="${mkPath(f.geometry, { lon0: b[0], lat1: b[3], kx, ky })}" fill="#e2e5e9" stroke="#fff" stroke-width="0.6"/>`;
  }
  return s + '</svg>';
}
const metro = (f) => !['971', '972', '973', '974', '976'].includes(f.properties.code);
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;font:12px sans-serif;background:#fff">
<div style="padding:4px">ORIGINAL (194k pts)</div>${svg(orig.features, 'o', metro)}
<div style="padding:4px">SIMPLIFIE (${JSON.parse(fs.readFileSync('build/dep_simpl.geojson','utf8')).features.length} dep)</div>${svg(simp.features, 's', metro)}
</body>`;
fs.writeFileSync('build/compare.html', html);
console.log('ok');