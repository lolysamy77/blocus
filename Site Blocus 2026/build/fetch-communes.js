#!/usr/bin/env node
/* ===========================================================================
   fetch-communes.js — télécharge les contours communaux de l'IGN et les
   enregistre dans build/communes/XX.js, un fichier par département.

   Source : IGN Géoplateforme, ADMIN EXPRESS (couche ADMINEXPRESS-COG.LATEST:commune)
            https://data.geopf.fr/wfs/ows

   Chaque fichier généré est un script classique autonome :
       window.COMMUNES["01"] = { dep:"01", nom:"Ain", communes:[ … ] }
   Un <script src> fonctionne en file://, contrairement à fetch(). C'est donc
   volontairement du JavaScript et non du JSON, pour que la page reste
  ouvrable par simple double-clic, sans serveur.

   Paris (75) est un cas particulier : la commune de Paris est unique, on y
   substitue les 20 arrondissements (Open Data Paris).

   Usage :
       node build/fetch-communes.js                # tout, en sautant l'existant
       node build/fetch-communes.js --only=01,75   # quelques départements
       node build/fetch-communes.js --force        # retélécharge tout
       node build/fetch-communes.js --tol=0.0004   # tolérance de simplification
   =========================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");

/* ------------------------------------------------------------------ options */
const argv = process.argv.slice(2);
function opt(name, def) {
  const hit = argv.find(a => a.indexOf("--" + name + "=") === 0);
  return hit ? hit.slice(name.length + 3) : def;
}
const FORCE = argv.indexOf("--force") >= 0;
const ONLY = opt("only", "") ? opt("only", "").split(",").map(s => s.trim()) : null;
const TOL = parseFloat(opt("tol", "0.0004"));      // degrés (~44 m)
const DEC = 4;                                     // décimales conservées (~11 m)
const PARALLEL = parseInt(opt("jobs", "3"), 10);
const OUT = path.join(__dirname, "communes");

/* Paris est le cas particulier demandé : ses arrondissements sont petits et
   le lecteur doit voir la Seine et la forme des quartiers. On simplifie donc
   beaucoup plus fin qu'ailleurs (≈9 m au lieu de 45 m). */
const FIN = { "75": TOL / 5 };
let TOL_CUR = TOL;

const WFS = "https://data.geopf.fr/wfs/ows?service=WFS&version=2.0.0&request=GetFeature" +
  "&typeNames=ADMINEXPRESS-COG.LATEST:commune&outputFormat=application/json&srsname=EPSG:4326";
const PARIS = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arrondissements/exports/geojson";

/* Surface minimale d'un anneau (en degrés carrés) pour être conservé :
   ~0.00004 deg² ≈ 240 m × 240 m. Sous ce seuil l'îlot est invisible. */
const MIN_RING = 4e-8;

/* ------------------------------------------------------------------ géométrie */

/** distance perpendiculaire d'un point au segment [a,b] */
function perp(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const L = dx * dx + dy * dy;
  if (L === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L;
  t = t < 0 ? 0 : t > 1 ? 1 : t;
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

/** Douglas-Peucker, itératif (pas de récursion : certaines communes ont
    beaucoup de points). */
function dp(pts, tol) {
  const n = pts.length;
  if (n <= 2) return pts;
  const keep = new Uint8Array(n);
  keep[0] = keep[n - 1] = 1;
  const stack = [[0, n - 1]];
  while (stack.length) {
    const seg = stack.pop(), s = seg[0], e = seg[1];
    let max = -1, idx = -1;
    for (let i = s + 1; i < e; i++) {
      const d = perp(pts[i], pts[s], pts[e]);
      if (d > max) { max = d; idx = i; }
    }
    if (max > tol && idx > 0) {
      keep[idx] = 1;
      stack.push([s, idx], [idx, e]);
    }
  }
  const out = [];
  for (let i = 0; i < n; i++) if (keep[i]) out.push(pts[i]);
  return out;
}

/** aire signée d'un anneau (formule du lacet), en degrés carrés */
function ringArea(r) {
  let a = 0;
  for (let i = 0, n = r.length, j = n - 1; i < n; j = i++) {
    a += (r[j][0] * r[i][1]) - (r[i][0] * r[j][1]);
  }
  return a / 2;
}

/** point dans un anneau (test par parité des croisements) */
function inRing(pt, r) {
  let inside = false;
  for (let i = 0, n = r.length, j = n - 1; i < n; j = i++) {
    const a = r[i], b = r[j];
    if ((a[1] > pt[1]) !== (b[1] > pt[1])) {
      const x = (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0];
      if (pt[0] < x) inside = !inside;
    }
  }
  return inside;
}

/** le point appartient-il au multipolygone (trous compris) ? */
function inGeom(pt, polys) {
  let hit = false;
  for (const poly of polys) {
    if (poly.length && inRing(pt, poly[0])) {
      let inHole = false;
      for (let i = 1; i < poly.length; i++) if (inRing(pt, poly[i])) { inHole = true; break; }
      if (!inHole) hit = true;
    }
  }
  return hit;
}

/** Pôle d'inaccessibilité : le point le plus « profond » à l'intérieur.
    C'est ce qu'on utilise pour poser une étiquette : il est toujours
    visible, contrairement au centroïde qui tombe souvent dans la mer ou
    dans un trou. Recherche par grille grossière puis raffinements. */
function poleOfInaccessibility(polys) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const poly of polys) for (const p of poly[0]) {
    if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1];
  }
  const w = x1 - x0, h = y1 - y0;
  if (!(w > 0 && h > 0)) return [(x0 + x1) / 2, (y0 + y1) / 2];

  /* distance au bord le plus proche, anneaux de trous compris : plus la valeur
     est grande, plus le point est « au milieu » de la commune. */
  const margin = function (px, py) {
    let best = Infinity;
    for (const poly of polys) {
      for (const ring of poly) {
        for (let i = 0, n = ring.length; i < n; i++) {
          const d = perp([px, py], ring[i], ring[(i + 1) % n]);
          if (d < best) {
            best = d;
            if (d === 0) return 0;
          }
        }
      }
    }
    return best;
  };

  /* descente par grille : à chaque passe on subdivise autour du meilleur point
     trouvé. 16×16 suffit largement pour un point d'étiquette. */
  const CX = 16, CY = 16;
  let bx = 0, by = 0, bx0 = x0, by0 = y0, bw = w, bh = h;
  let best = -1;
  for (let pass = 0; pass < 4; pass++) {
    const cw = bw / CX, ch = bh / CY;
    best = -1;
    for (let i = 0; i < CX; i++) {
      const px = bx0 + (i + 0.5) * cw;
      if (px < x0 || px > x1) continue;                    /* rejet par boîte
                                                               englobante : O(1) */
      for (let j = 0; j < CY; j++) {
        const py = by0 + (j + 0.5) * ch;
        if (py < y0 || py > y1) continue;
        if (!inGeom([px, py], polys)) continue;
        const d = margin(px, py);
        if (d > best) { best = d; bx = px; by = py; }
      }
    }
    if (best < 0) break;
    bx0 = bx - cw; by0 = by - ch; bw = cw * 2; bh = ch * 2;
  }
  if (best < 0) return [x0 + w / 2, y0 + h / 2];
  return [bx, by];
}

/* ------------------------------------------------------------------ simplification */

function simplifyCommune(feature) {
  const g = feature.geometry;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  const out = [];

  for (const poly of polys) {
    const rings = [];
    for (let r = 0; r < poly.length; r++) {
      let ring = dp(poly[r], TOL_CUR);
      if (ring.length < 4) continue;
      if (Math.abs(ringArea(ring)) < MIN_RING) continue;
      rings.push(ring);
    }
    if (rings.length) out.push(rings);
  }

  /* on ne garde que les polygones principaux si la commune s'émiette en îlots :
     au-delà, le rendu devient une constellation de taches illisibles. On
     conserve de quoi couvrir 98,5 % de la surface, dans l'ordre décroissant. */
  let kept = out;
  if (out.length > 1) {
    const scored = out.map((p, i) => {
      let a = 0;
      for (const ring of p) a += Math.abs(ringArea(ring));
      return { i: i, a: a };
    }).sort((u, v) => v.a - u.a);
    const total = scored.reduce((s, u) => s + u.a, 0);
    kept = [];
    let acc = 0;
    for (const u of scored) {
      kept.push(out[u.i]);
      acc += u.a;
      if (acc / total > 0.985) break;
    }
  }
  if (!kept.length) kept = [[poly0Ring(polys)]];
  return kept;
}
function poly0Ring(polys) {
  let best = polys[0][0], a = 0;
  for (const poly of polys) for (const ring of poly) {
    const v = Math.abs(ringArea(ring));
    if (v > a) { a = v; best = ring; }
  }
  return best;
}

/* ------------------------------------------------------------------ encodage */

const r5 = v => {
  const s = v.toFixed(DEC);
  return s.replace(/\.?0+$/, "");
};
function encodeRing(ring) {
  let s = "";
  for (let i = 0; i < ring.length; i++) {
    if (i) s += " ";
    s += r5(ring[i][0]) + "," + r5(ring[i][1]);
  }
  return s;
}
function decodeRing(s) {
  const out = [];
  const parts = s.split(" ");
  for (let i = 0; i < parts.length; i++) {
    const c = parts[i].split(",");
    out.push([+c[0], +c[1]]);
  }
  return out;
}

/* ------------------------------------------------------------------ sources */

async function getJSON(url, tries) {
  tries = tries || 4;
  let err = null;
  for (let i = 0; i < tries; i++) {
    try {
      const ctl = new AbortController();
      const to = setTimeout(() => ctl.abort(), 120000);
      const r = await fetch(url, { signal: ctl.signal, headers: { accept: "application/json" } });
      clearTimeout(to);
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } catch (e) {
      err = e;
      if (i < tries - 1) await new Promise(s => setTimeout(s, 1200 * (i + 1)));
    }
  }
  throw err;
}

/** l'IGN code la Corse « 2A »/« 2B », mais certaines couches lafusionnent en 99 */
async function fetchIGN(dep) {
  const codes = ["2A", "2B"].indexOf(dep) >= 0 ? [dep, "99"] : [dep];
  let last = null;
  for (const code of codes) {
    const url = WFS + "&count=8000&CQL_FILTER=code_insee_du_departement%3D%27" + code + "%27";
    const j = await getJSON(url);
    const feats = j.features || [];
    if (feats.length) return feats;
    last = j;
  }
  if (last) return [];
  return [];
}

/** Paris : on substitue les 20 arrondissements à l'unique commune 75056 */
async function fetchParis() {
  const j = await getJSON(PARIS);
  const feats = (j.features || []).map(f => {
    const p = f.properties;
    return {
      geometry: f.geometry,
      properties: {
        code: String(75100 + p.c_ar),
        nom: p.c_ar + "e arrondissement · " + p.l_aroff,
        /* le code postal d'un arrondissement de Paris est son numéro
           complété de zéros : 1er -> 75001, 20e -> 75020 */
        cp: "750" + String(p.c_ar).padStart(2, "0"),
        pop: null,
      },
    };
  });
  feats.sort((a, b) => (a.properties.code < b.properties.code ? -1 : 1));
  return feats;
}

/* ------------------------------------------------------------------ corps */

function build(dep, nomDep, feats) {
  const communes = [];
  let kept = 0, dropped = 0;

  for (const f of feats) {
    const pr = f.properties || {};
    /* l'IGN nomme ses colonnes code_insee / nom_officiel / code_postal ;
       Paris Open Data et les données de test en ont d'autres. */
    const code = pr.code_insee || pr.code;
    const nom = pr.nom_officiel || pr.nom;
    if (!code || !nom) { dropped++; continue; }
    let polys;
    try { polys = simplifyCommune(f); } catch (e) { dropped++; continue; }
    const label = poleOfInaccessibility(polys);
    const pop = (typeof pr.population === "number") ? pr.population
              : (typeof pr.pop === "number") ? pr.pop : null;
    communes.push({
      c: code,
      n: nom,
      z: pr.code_postal || pr.cp || "",
      p: pop,
      l: [+label[0].toFixed(5), +label[1].toFixed(5)],
      g: polys.map(poly => poly.map(encodeRing)),
    });
    kept++;
  }

  communes.sort((a, b) => (a.c < b.c ? -1 : a.c > b.c ? 1 : 0));

  let rings = 0, pts = 0;
  for (const c of communes) for (const poly of c.g) for (const r of poly) { rings++; pts += r.split(" ").length; }

  const js = "/* Généré par build/fetch-communes.js — IGN ADMIN EXPRESS. Ne pas modifier. */\n" +
    "window.COMMUNES=window.COMMUNES||{};\n" +
    "window.COMMUNES[" + JSON.stringify(dep) + "]={dep:" + JSON.stringify(dep) +
    ",nom:" + JSON.stringify(nomDep) +
    ",n:" + communes.length +
    ",communes:" + JSON.stringify(communes) + "};\n";

  return { js, kept, dropped, rings, pts, sample: communes.length ? communes[0].n + (communes[0].z ? " (" + communes[0].z + ")" : "") : "" };
}

function target(code) { return path.join(OUT, code + ".js"); }

async function runOne(dep, nomDep) {
  const file = target(dep);
  if (!FORCE && fs.existsSync(file)) {
    const sz = fs.statSync(file).size;
    console.log("  " + dep + " " + nomDep.padEnd(26) + " déjà présent (" + Math.round(sz / 1024) + " Ko)");
    return { skip: true, ko: sz / 1024 };
  }
  const feats = dep === "75" ? await fetchParis() : await fetchIGN(dep);
  if (!feats.length) {
    console.log("  " + dep + " " + nomDep.padEnd(26) + " AUCUNE DONNÉE IGN");
    return { err: true };
  }
  TOL_CUR = FIN[dep] || TOL;
  const r = build(dep, nomDep, feats);
  if (!r.kept) throw new Error("aucune commune retenue — colonnes inattendues ?");
  fs.writeFileSync(file, r.js, "utf8");
  const ko = r.js.length / 1024;
  console.log("  " + dep + " " + nomDep.padEnd(26) +
    String(r.kept).padStart(4) + " communes · " +
    String(r.pts).padStart(7) + " pts · " +
    ko.toFixed(0).padStart(5) + " Ko" +
    (r.dropped ? "  (" + r.dropped + " ignorées)" : "") +
    "   ex. " + r.sample);
  return { ko, n: r.kept, pts: r.pts };
}

(async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const geo = JSON.parse(fs.readFileSync(path.join(__dirname, "dep_simpl.geojson"), "utf8"));
  const list = geo.features
    .map(f => ({ code: f.properties.code, nom: f.properties.nom }))
    .filter(d => !ONLY || ONLY.indexOf(d.code) >= 0)
    .sort((a, b) => (a.code < b.code ? -1 : 1));

  console.log("Départements : " + list.length +
    " · simplification " + (TOL * 111320).toFixed(0) + " m · " + PARALLEL + " en parallèle\n");

  const t0 = Date.now();
  let nOk = 0, nErr = 0, koTot = 0, ptsTot = 0, listErr = [];

  const queue = list.slice();
  async function worker() {
    while (queue.length) {
      const d = queue.shift();
      try {
        const r = await runOne(d.code, d.nom);
        if (r.err) { nErr++; listErr.push(d.code); }
        else { nOk++; koTot += r.ko || 0; }
      } catch (e) {
        nErr++; listErr.push(d.code);
        console.log("  " + d.code + " " + d.nom.padEnd(26) + " ERREUR : " + String(e.message || e));
      }
    }
  }
  await Promise.all(Array.from({ length: PARALLEL }, worker));

  const sec = Math.round((Date.now() - t0) / 1000);
  console.log("\n" + nOk + " fichiers · " + (koTot / 1024).toFixed(1) + " Mo · " +
    sec + " s" + (listErr.length ? " · échecs : " + listErr.join(", ") : ""));
})();