/* Vide le contenu de <div class="map-wrapper"> dans carte.html.
 * Utile pour repartir d'une page propre avant de réinjecter la carte. */
const fs = require('fs');
const path = require('path');

const TARGET = path.resolve(__dirname, '..', 'carte.html');
const html = fs.readFileSync(TARGET, 'utf8');
const re = /(<div class="map-wrapper"\s*>)([\s\S]*?)(<\/div>)/;

if (!re.test(html)) {
  console.error('Introuvable : <div class="map-wrapper">');
  process.exit(1);
}
const out = html.replace(re, '$1$3');
fs.writeFileSync(TARGET, out, 'utf8');
console.log('carte retirée : ' + html.length + ' -> ' + out.length + ' octets');