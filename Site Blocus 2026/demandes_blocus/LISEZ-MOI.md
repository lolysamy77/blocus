# Signalements de blocus

Ce dossier reçoit ce que les visiteurs déclarent sur la page
**Signaler un blocus** (`signaler-un-blocus.html`).

## Un fichier par signalement

Chaque signalement est un fichier `.json` nommé d'après ce que la personne a
coché, pour qu'on le retrouve sans l'ouvrir :

```
2026-10-02_lycee-leonard-de-vinci_143012.json
└────┬────┘ └──────────┬─────────────┘ └──┬──┘
     jour        établissement        heure
                             (sans accents)
```

S'il existe déjà un signalement pour cet établissement ce jour-là, le
nouveau est numéroté plutôt que écrasé : les témoignages sont tous gardés.

## Plusieurs personnes pour le même établissement

Un blocus vu par plusieurs personnes est un blocus qui compte. Le premier
signalement garde son nom nu, les suivants portent un numéro :

```
2026-10-02_lycee-leonard-de-vinci_143012.json      ← 1re personne
2026-10-02_lycee-leonard-de-vinci_161540_#1.json   ← 2e personne
2026-10-02_lycee-leonard-de-vinci_184207_#2.json   ← 3e personne
```

Le numéro compte des **personnes**, pas des secondes : c'est le jour du
blocus et l'établissement qui font le groupe, l'heure n'est là que pour les
distinguer dans un même dossier. Un autre établissement, ou un autre jour,
repart d'un nom nu ; un numéro libéré par un fichier supprimé est repris
plutôt que doublé.

Le serveur répond `personnes` — le nombre de signalements reçus pour cet
établissement ce jour-là — et la page le dit à la personne qui envoie.

Un `#` n'a rien de particulier dans un nom de fichier, mais il se lit comme
un début de commentaire dans une invite de commande et comme un début de
fragment dans une URL : de là `demandes_blocus/…_#1.json` s'écrit `'…'` ou
`%23` selon le contexte.

## Ce qu'il y a dedans

```json
{
  "version": 1,
  "recu_le": "2026-10-02T14:30:12",     ← quand le serveur l'a écrit
  "source": "signaler-un-blocus.html",
  "departement": "37",                    ← le code
  "nom_departement": "Indre-et-Loire",    ← repris de build/dep-noms.js
  "certifie_en_france": true,
  "type": "L",
  "type_lisible": "lycée professionnel, agricole ou institut",
  "etablissement": "Lycée polyvalent François Rabelais",
  "code_insee_commune": "37072",        ← c'est ce code qui rattache à la carte
  "date": "2026-10-01",                 ← le jour du blocus, pas celui du signalement
  "nature": "blocus",
  "description": "…",
  "lien_preuve": "https://…",
  "signale_par": "témoin direct",
  "nom_fichier": "…"
}
```

`recu_le` et `date` ne sont pas le même jour : le premier est l'horodatage du
serveur, le second est ce que la personne a déclaré.

## Les deux écritures acceptées

Le serveur lit aussi la forme courte du formulaire — `dep`, `certifie`, `eta`,
`lien` — et la ramène à la forme ci-dessus avant d'écrire. `eta` peut alors
être écrit `Nom|codeInsee`, comme dans le menu déroulant. Un fichier déposé à
la main peut donc utiliser celle des deux qui lui arrange.

## Sans serveur

Un double-clic sur `signaler-un-blocus.html` ouvre la page en `file://` : là, une page
web n'a aucun droit d'écrire sur le disque. Le formulaire bascule donc sur un
téléchargement : le fichier `.json` arrive dans vos téléchargements, et il
n'y a plus qu'à le déplacer ici.

Pour que l'enregistrement soit automatique :

```
python serve.py --no-open
```

puis rechargez `signaler-un-blocus.html` depuis
`http://localhost:8000/signaler-un-blocus.html`.
Le serveur répond `POST /api/demande` ; `GET /api/demandes` liste ce qui a
déjà été enregistré.

Hors ligne, le fichier est téléchargé sous le même nom que l'aurait écrit le
serveur, mais sans le `_#1` : rien ne sait ce que contient déjà le dossier.
Déposé à la main, un second signalement du même établissement se renomme donc
`_#1.json` — c'est la seule chose à faire à la main.

## Ensuite

Ces fichiers ne sont **pas** lus par la carte. Les blocus publiés viennent de
`build/blocus.js` (écrit à la main) et de `build/blocus-recherche.js`
(généré depuis `recherche-blocus-2026/`).

C'est volontaire : un nom d'établissement approximatif fausserait les
comptes par département, et personne ne peut deviner depuis un JSON seul si
« Lycée de Bandrélé » est le bon lycée. Le travail de relecture est donc
explicite, et il est fait dans `build/import-blocus.js` ou à la main dans
`build/blocus.js`.

### Retirer un jour sans toucher à la recherche

Un relevé de la recherche peut contenir un jour qui n'était pas un jour de
blocus : l'article annonçait la journée du lendemain, ou ne parlait que d'un
rassemblement devant l'établissement. `recherche-blocus-2026/` garde ce qu'elle
a vu — on n'y touche pas — mais la carte ne publie que les blocus.

Pour retirer un jour, ajoutez une ligne dans `HORS_CARTE` en haut de
`build/import-blocus.js`, puis relancez `node build/import-blocus.js` :

```js
const HORS_CARTE = new Map([
  ["97105@2026-10-05", "la presse ne signale qu'un rassemblement, pas un blocus"],
]);
```

Le format est `codeINSEE@AAAA-MM-JJ`, et la raison est obligatoire : c'est elle
qui sera écrite dans l'en-tête de `build/blocus-recherche.js`, pour qu'une
exclusion ne passe pas pour un relevé oublié. Si une ligne de `HORS_CARTE` ne
retire plus rien (le code a changé dans l'annuaire), la génération le dit à
l'écran plutôt que de laisser croire que le blocus a été retiré.