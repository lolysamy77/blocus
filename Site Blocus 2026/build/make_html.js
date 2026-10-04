// Assemble index.html : template + index des départements.
//
// index.html ne dessine plus la France. Il n'a donc plus besoin de la
// géométrie des départements (826 Ko) : le seul artefact de dep_simpl.geojson
// qui subsiste est le nom officiel de chacun des 101 départements, utilisé par
// l'écran d'accueil et l'en-tête. Tout le reste est dans build/communes/XX.js.
const fs = require('fs');

const tpl = fs.readFileSync('build/template.html', 'utf8');
const geo = JSON.parse(fs.readFileSync('build/dep_simpl.geojson', 'utf8'));

const codes = geo.features.map((f) => f.properties.code).sort();
console.log('départements:', codes.length);
const expected = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19',
  '2A','2B','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39',
  '40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60','61',
  '62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80','81','82','83',
  '84','85','86','87','88','89','90','91','92','93','94','95','971','972','973','974','976'];
const missing = expected.filter((c) => codes.indexOf(c) === -1);
const extra = codes.filter((c) => expected.indexOf(c) === -1);
console.log('manquants:', missing.join(',') || 'aucun', '| en trop:', extra.join(',') || 'aucun');
if (missing.length || extra.length || codes.length !== 101) { console.error('ERREUR'); process.exit(1); }

// --- index code -> nom, un objet littéral plutôt qu'une chaîne -------------
// Un objet est plus sûr qu'une chaîne à échapper : JSON.stringify produit du
// JavaScript valide, et un "</script>" y serait impossible ici puisque ce sont
// des noms de départements — le contrôle reste utile par principe.
const noms = {};
for (const f of geo.features) {
  const p = f.properties;
  if (!p || !p.code || !p.nom) { console.error('propriétés manquantes', JSON.stringify(p)); process.exit(1); }
  noms[p.code] = p.nom;
}
const lit = JSON.stringify(noms, null, 0);

const marker = '/* <<<INDEX>>> */';
/* Le gabarit peut être en CRLF ou en LF : la déclaration prend le même retour à
   la ligne que lui, sinon la page régénérée diffère de la page retouchée sur
   deux caractères, et le garde-fou ci-dessous la prendrait pour une retouche. */
const eol = tpl.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
const declaration =
  '/* Nom officiel des 101 départements. */' + eol +
  'const DEPTS = ' + lit + ';' + eol;

if (tpl.indexOf(marker) === -1) { console.error('marqueur absent du template'); process.exit(1); }
const out = tpl.replace(marker, declaration);

// contrôles de sécurité : rien ne doit casser la balise <script>
// Le compte n'est plus figé : la page charge plusieurs fichiers (barre de
// menus, couleurs, blocus, filtre) puis son propre script. On exige
// seulement que chaque <script src> soit fermé, et qu'il y ait exactement un
// script en ligne — celui qui porte le marqueur ci-dessus.
const n = (out.match(/<\/script/gi) || []).length;
const n2 = (out.match(/<script/gi) || []).length;
if (n !== n2) { console.error('script non fermé :', n2, 'ouvertures,', n, 'fermetures'); process.exit(1); }
const src = (out.match(/<script\b[^>]*\bsrc=/gi) || []).length;
console.log('scripts :', src, 'fichiers +', n2 - src, 'en ligne');
if (n2 - src !== 1) { console.error('il faut exactement un script en ligne'); process.exit(1); }
if (/<\/script/i.test(lit)) { console.error('les données contiennent </script'); process.exit(1); }

// le marqueur doit occuper une ligne entière, et une seule fois : sinon la
// déclaration injectée se retrouve au milieu d'une expression, ou une seconde
// déclaration vient s'ajouter à la première.
const lignesMarqueur = tpl.split(/\r?\n/).filter((l) => l.trim() === marker);
if (lignesMarqueur.length !== 1) {
  console.error('le marqueur doit être seul sur une ligne, une seule fois :', lignesMarqueur.length, 'ligne(s)');
  process.exit(1);
}

// vérification finale : le script de la page doit être du JavaScript valide.
// On isole le script en ligne, le seul qui commence par « <script> » sans
// attributs — c'est lui qui contient le marqueur ci-dessus. Sa fin est le
// premier « </script> » qui suit, et non le dernier de la page : depuis que
// build/map-zoom.js est chargé en bas de page, le dernier appartient à un
// fichier, et le tronquer ici rendait tout le script invalide.
const a = out.indexOf('<script>');
const b = out.indexOf('</script>', a);
if (a < 0 || b < a) { console.error('script inline introuvable'); process.exit(1); }
try {
  new Function(out.slice(a + 8, b));
} catch (e) {
  console.error('le script généré est invalide :', e.message);
  process.exit(1);
}

// Garde-fou : index.html a été retouché à la main depuis que le template a été
// écrit (le panneau des preuves, le déplacement de la carte, les boutons de
// zoom…). Le réécrire ici ne remettrait pas le site à niveau : ça l'effacerait.
// On refuse donc, sauf demande explicite, et on dit quoi faire.
const force = process.argv.includes('--force');
if (!force && fs.existsSync('index.html')) {
  const actuel = fs.readFileSync('index.html', 'utf8');
  if (actuel !== out) {
    console.error('index.html ne vient pas de build/template.html : il a été modifié à la main.');
    console.error('Ce script l\'écraserait. Recopier d\'abord index.html dans le template,');
    console.error('ou relancer avec --force si le remplacement est vraiment voulu.');
    process.exit(1);
  }
}

fs.writeFileSync('index.html', out, 'utf8');
const kb = (Buffer.byteLength(out, 'utf8') / 1024).toFixed(0);
console.log('index.html écrit :', kb, 'Ko (index :', (lit.length / 1024).toFixed(1), 'Ko)');