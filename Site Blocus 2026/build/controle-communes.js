// Contrôle d'intégrité des contours communaux générés par fetch-communes.js.
const fs = require("fs");
const vm = require("vm");

const dir = "build/communes";
const fichiers = fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort();

let octets = 0, totalCommunes = 0, anneaux = 0;
const anomalies = [];
const detail = [];

for (const f of fichiers) {
  const code = f.replace(/\.js$/, "");   // 971 et non "97"
  const src = fs.readFileSync(dir + "/" + f, "utf8");
  octets += src.length;

  const ctx = { window: {} };
  vm.createContext(ctx);
  try {
    vm.runInContext(src, ctx, { timeout: 10000 });
  } catch (e) {
    anomalies.push(code + " : script illisible (" + e.message + ")");
    continue;
  }

  const d = ctx.window.COMMUNES && ctx.window.COMMUNES[code];
  if (!d) { anomalies.push(code + " : window.COMMUNES[" + code + "] absent"); continue; }
  if (!d.nom) anomalies.push(code + " : nom de département manquant");
  if (!Array.isArray(d.communes) || !d.communes.length) { anomalies.push(code + " : aucune commune"); continue; }
  if (d.communes.length !== d.n) anomalies.push(code + " : compteur n incohérent");

  let incomplets = 0, exemple = "";
  for (const c of d.communes) {
    let ok = c.c && c.n && c.g && c.g.length && Array.isArray(c.l) && c.l.length === 2;
    if (ok) {
      for (const poly of c.g) {
        if (!Array.isArray(poly) || !poly.length) { ok = false; break; }
        for (const ring of poly) {
          anneaux++;
          if (typeof ring !== "string" || ring.split(" ").length < 4) { ok = false; break; }
          if (/NaN|Infinity|undefined/.test(ring)) { ok = false; break; }
        }
        if (!ok) break;
      }
    }
    if (!ok) { incomplets++; if (!exemple) exemple = JSON.stringify(c).slice(0, 100); }
  }
  if (incomplets) anomalies.push(code + " : " + incomplets + " commune(s) incomplète(s) — ex. " + exemple);

  totalCommunes += d.communes.length;
  detail.push({ code: code, nom: d.nom, n: d.communes.length, ko: Math.round(src.length / 1024) });
}

detail.sort((a, b) => b.ko - a.ko);

console.log("fichiers        : " + fichiers.length);
console.log("communes       : " + totalCommunes);
console.log("anneaux        : " + anneaux);
console.log("poids total    : " + (octets / 1048576).toFixed(1) + " Mo");
console.log("moyenne/dept   : " + Math.round(octets / fichiers.length / 1024) + " Ko");
console.log("plus lourd     : " + detail[0].code + " " + detail[0].nom + " " + detail[0].ko + " Ko");
console.log("plus léger     : " + detail[detail.length - 1].code + " " + detail[detail.length - 1].nom + " " + detail[detail.length - 1].ko + " Ko");
console.log("total communes attendues (INSEE 2024) : ~34 900");
console.log("");
console.log("anomalies      : " + (anomalies.length ? anomalies.join("\n                  ") : "aucune"));