// Contrôle d'intégrité des fichiers d'établissements générés par fetch-ecoles.js,
// et de leur accord avec les contours communaux.
//
// Croisé avec les communes : un établissement rattaché à un code commune que nos
// contours ne connaissent pas ne s'afficherait jamais. C'est le piège des
// arrondissements de Lyon et Marseille, d'où les raccords faits à la génération.
const fs = require("fs");
const vm = require("vm");

const DIRS = { communes: "build/communes", ecoles: "build/ecoles" };

/** charge un fichier généré et renvoie window[global_][code] */
function charge(fichier, global_, code) {
  const ctx = { window: {} };
  vm.createContext(ctx);
  const src = fs.readFileSync(fichier, "utf8");
  vm.runInContext(src, ctx, { timeout: 20000 });
  return ctx.window[global_] && ctx.window[global_][code];
}

const fichiers = fs.readdirSync(DIRS.ecoles).filter(f => f.endsWith(".js")).sort();
const attendus = fs.readdirSync(DIRS.communes).filter(f => f.endsWith(".js"))
  .map(f => f.replace(/\.js$/, "")).sort();

const anomalies = [];
const manquants = attendus.filter(c => fichiers.indexOf(c + ".js") < 0);
const enTrop = fichiers.filter(f => attendus.indexOf(f.replace(/\.js$/, "")) < 0);
for (const c of manquants) anomalies.push(c + " : pas de fichier d'établissements");
for (const c of enTrop) anomalies.push(c + " : fichier sans contours communaux");

let octets = 0, total = 0, communes = 0, sansPosition = 0;
const parType = { C: 0, L: 0 };
const poids = [];

for (const f of fichiers) {
  const code = f.replace(/\.js$/, "");
  octets += fs.statSync(DIRS.ecoles + "/" + f).size;

  let e;
  try {
    e = charge(DIRS.ecoles + "/" + f, "ECOLES", code);
  } catch (err) {
    anomalies.push(code + " : script illisible (" + err.message + ")");
    continue;
  }
  if (!e) { anomalies.push(code + " : window.ECOLES[" + code + "] absent"); continue; }
  if (!e.nom) anomalies.push(code + " : nom de département manquant");
  if (!e.villes || typeof e.villes !== "object") {
    anomalies.push(code + " : table villes absente");
    continue;
  }

  // les codes commune doivent exister dans les contours
  const c = charge(DIRS.communes + "/" + code + ".js", "COMMUNES", code);
  if (!c) { anomalies.push(code + " : contours communaux introuvables"); continue; }
  const connus = new Set(c.communes.map(x => x.c));

  let incomplets = 0, horsContours = 0, exemple = "";
  for (const [ville, liste] of Object.entries(e.villes)) {
    if (!connus.has(ville)) { horsContours++; if (!exemple) exemple = ville; continue; }
    if (!Array.isArray(liste) || !liste.length) {
      anomalies.push(code + "/" + ville + " : liste vide");
      continue;
    }
    communes++;
    total += liste.length;
    for (const s of liste) {
      if (!s.n || (s.t !== "C" && s.t !== "L")) {
        if (!exemple) exemple = ville + " → " + JSON.stringify(s).slice(0, 90);
        incomplets++;
        continue;
      }
      parType[s.t]++;
      if (typeof s.la === "number" && typeof s.lo === "number") {
        if (Math.abs(s.la) > 90 || Math.abs(s.lo) > 180) {
          if (!exemple) exemple = ville + " → position " + s.la + "," + s.lo;
          incomplets++;
        }
      } else if (s.la === undefined && s.lo === undefined) {
        sansPosition++;          // l'écran affiche alors la ligne sans marqueur
      } else {
        if (!exemple) exemple = ville + " → position partielle";
        incomplets++;
      }
    }
  }
  if (incomplets) anomalies.push(code + " : " + incomplets + " établissement(s) incomplet(s)" +
    (exemple ? " — " + exemple : ""));
  if (horsContours) anomalies.push(code + " : " + horsContours + " code(s) commune hors contours" +
    (exemple ? " — " + exemple : ""));
  poids.push([code, Object.keys(e.villes).length, fs.statSync(DIRS.ecoles + "/" + f).size]);
}

poids.sort((a, b) => b[2] - a[2]);
const lourd = poids[0] || ["—", 0, 0];

console.log("fichiers        : " + fichiers.length + " (attendus " + attendus.length + ")");
console.log("établissements  : " + total + "  (collèges " + parType.C + ", lycées " + parType.L + ")");
console.log("communes couvertes : " + communes);
console.log("sans position   : " + sansPosition + " (ligne sans marqueur sur la carte)");
console.log("poids total     : " + (octets / 1048576).toFixed(2) + " Mo" +
  "  (moyenne " + Math.round(octets / (fichiers.length || 1) / 1024) + " Ko, max " +
  Math.round(lourd[2] / 1024) + " Ko — " + lourd[0] + ", " + lourd[1] + " communes)");

console.log("");
if (anomalies.length) {
  console.log("anomalies       : " + anomalies.length);
  for (const a of anomalies.slice(0, 30)) console.log("   " + a);
  if (anomalies.length > 30) console.log("   … et " + (anomalies.length - 30) + " autres");
  process.exit(1);
} else {
  console.log("anomalies       : aucune");
}