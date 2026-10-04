/* Diagnostic : pour chaque ligne non rattachée, affiche les établissements du
   même département (et met en évidence ceux de la commune citée). */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const DIR = __dirname;

function norm(s) {
  return String(s || "")
    .replace(/œ/g, "oe").replace(/æ/g, "ae")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const communes = { parDep: {}, parNom: {} };
{
  const sb = { window: {} };
  vm.createContext(sb);
  for (const f of fs.readdirSync(path.join(ROOT, "build", "communes"))) {
    if (f.endsWith(".js")) vm.runInContext(fs.readFileSync(path.join(ROOT, "build", "communes", f), "utf8"), sb);
  }
  for (const dep of Object.keys(sb.window.COMMUNES)) {
    const b = sb.window.COMMUNES[dep];
    if (!b || !b.communes) continue;
    communes.parDep[dep] = b.communes.map((c) => ({ c: c.c, n: c.n }));
    for (const c of b.communes) {
      const k = norm(c.n).replace(/ /g, "");
      (communes.parNom[k] = communes.parNom[k] || []).push(c.c);
    }
  }
}

const ecoles = { parDep: {} };
{
  const sb = { window: {} };
  vm.createContext(sb);
  for (const f of fs.readdirSync(path.join(ROOT, "build", "ecoles"))) {
    if (f.endsWith(".js")) vm.runInContext(fs.readFileSync(path.join(ROOT, "build", "ecoles", f), "utf8"), sb);
  }
  for (const dep of Object.keys(sb.window.ECOLES)) {
    const v = sb.window.ECOLES[dep];
    for (const [code, liste] of Object.entries(v.villes)) {
      ecoles.parDep[code] = (ecoles.parDep[code] || []).concat(liste.map((e) => Object.assign({ c: code, dep }, e)));
    }
  }
}

const lignes = fs.readFileSync(path.join(DIR, "non-rattaches.txt"), "utf8").split(/\r?\n/).filter(Boolean);
for (const l of lignes) {
  const c = l.split("\t");
  const [dep, commune, nom] = [c[1], c[2], c[3]];
  const codes = communes.parNom[norm(commune).replace(/ /g, "")] || [];
  const nomCommune = codes.length
    ? codes.map((cd) => {
        const t = (communes.parDep[dep] || []).find((x) => x.c === cd);
        return t ? t.n : cd;
      })
    : [];
  const cible = codes.length ? codes.flatMap((cd) => ecoles.parDep[cd] || []) : Object.values(ecoles.parDep).flat().filter((e) => e.dep === dep);
  console.log("\n== " + dep + " | " + commune + (codes.length ? "" : " (commune introuvable)") + " | " + nom);
  console.log("   codes: " + (codes.join(",") || "-") + " | communes: " + (nomCommune.join(",") || "-") + " | etabs: " + cible.length);
  console.log("   -> " + cible.map((e) => e.n).join(" ; ").slice(0, 1400));
}