# Site « Blocus lycées et collèges France 2026 »

Réunion complète du projet (copie faite le 4 octobre 2026 depuis
`C:\Users\samro\OneDrive\Documents\Default Project`). Le site a commencé comme
une simple carte interactive des 101 départements français, puis est devenu un
site de suivi des blocus scolaires : carte de France cliquable, cartes des
communes par département, tableau jour par jour, revendications nationales,
signalements et votes par établissement.

## Lancer le site

Il faut Python 3 (installé sur cette machine).

    python serve.py

puis ouvrir http://localhost:8000 (la page d'accueil s'ouvre toute seule ;
Ctrl+C arrête le serveur). Autres options : `python serve.py --port 5500`,
`python serve.py --no-open`.

Sans serveur, les pages restent consultables en double-cliquant dessus
(`index.html`, `carte.html`, `tableau-des-blocus.html`…) : les formulaires
proposent alors le fichier `.json` au téléchargement au lieu de l'envoyer.

## Les pages

| Page | Rôle |
|---|---|
| `accueil.html` | grands principes, à quoi sert le site, ce que les élèves peuvent faire |
| `carte.html` | carte de France des 101 départements (dont les 5 outre-mer en encarts), colorée selon le nombre de blocus du jour |
| `index.html` | carte des communes d'un département, ouverte au clic depuis la France (ex. `index.html#29`) |
| `tableau-des-blocus.html` | tableau jour par jour (1er septembre → 31 octobre) |
| `departements.html` | liste des départements |
| `revendications.html` | les 14 revendications nationales du mouvement |
| `ajouter-une-revendication.html` | formulaire : choisir une des 14 revendications pour son établissement |
| `signaler-un-blocus.html` | formulaire : signaler un blocus |

## Données

- **Sources brutes** : `blocus_lycees_colleges_france_2026.txt` (le rapport
  principal), `blocus_liste_nationale_2026.txt` et `blocus_ajouts_04_10_2026.txt`
  (extraits), et `recherche-blocus-2026/` (relevés presse avec liens).
- **Fichiers générés** (à ne pas modifier à la main) : `build/blocus-recherche.js`
  (les blocus), `build/ecoles-fr.js`, `build/communes-blocus.js`, etc.
- L'import fusionne les sources une ligne par (établissement, jour) :
  `node build/import-blocus.js` régénère tout. La liste `HORS_CARTE` en tête de
  ce script décrit ce qui est volontairement retiré de la carte (ex. le
  « blocus » du 5 octobre à Basse-Terre, que la presse ne décrit que comme un
  rassemblement).
- À l'état de la copie : ~787 blocus, 649 établissements, 338 communes,
  94 départements, du 07/09 au 02/10. Jour par défaut : le 2 octobre.

## Ce que fait le serveur (au-delà des fichiers)

- `POST /api/demande` : un `.json` par signalement dans `demandes_blocus/` ;
  plusieurs personnes le même jour → `_#1`, `_#2`…
- `POST /api/revendication` : idem dans `demandes_revendications/`, rattaché à
  l'établissement.
- `POST /api/voix` : un vote par appareil dans `votes/` — un appareil ne vote
  que dans un seul établissement (imposé par le serveur via cookie +
  identifiant local).
- `GET /api/rev` : les revendications de tous les établissements avec le
  compte des voix.

## Vérifier / régénérer

- Contrôles : `node build/controle-carte.js`, `controle-communes.js`,
  `controle-ecoles.js`, `controle-couleurs.js`, `controle-revendications.js`.
- `node build/make_html.js` régénère `index.html` depuis `build/template.html`
  (il refuse d'écrire si la page a été retouchée à la main ; `--force` pour
  passer outre).
- `node build/map-static.js` régénère la carte de France dans `carte.html`.

## Contenu exclu de cette copie

- `__pycache__/`, `.sentry-native/` : caches et débris, se régénèrent seuls.
- `projet/` : dossier personnel sans rapport avec le site (cours de première,
  projet Rust « vélo »), laissé dans le dossier d'origine.

Les dossiers `demandes_blocus/`, `demandes_revendications/` et `votes/` sont
copiés tels quels (y compris les 2 signalements réels déjà déposés) — chacun
contient son `LISEZ-MOI.md`.
