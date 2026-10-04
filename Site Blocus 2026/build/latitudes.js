// Extrait de dep_simpl.geojson la latitude moyenne de chaque departement.
// C'est la seule information de geometrie encore necessaire a index.html,
// qui ne dessine plus la carte de France : il ne lui faut que de quoi
// projeter les communes d'outre-mer en equirectangulaire locale.
const fs = require("fs");

const geo = JSON.parse(fs.readFileSync("build/dep_simpl.geojson", "utf8"));

function meanLat(f) {
  const g = f.geometry;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  let s = 0, n = 0;
  for (const poly of polys) for (const ring of poly) for (const p of ring) { s += p[1]; n++; }
  return s / n;
}

const out = {};
for (const f of geo.features) out[f.properties.code] = meanLat(f);

const DOM = ["971", "972", "973", "974", "976"];
console.log("outre-mer :");
for (const c of DOM) console.log('  "' + c + '": ' + out[c].toFixed(3) + ",");
console.log("");
console.log("extreme metropolitain :",
  Math.min(...DOM.map(c => 0)) === 0 ? "" : "");
const metro = Object.keys(out).filter(c => DOM.indexOf(c) < 0);
console.log("  latitude min : " + Math.min(...metro.map(c => out[c])).toFixed(2));
console.log("  latitude max : " + Math.max(...metro.map(c => out[c])).toFixed(2));