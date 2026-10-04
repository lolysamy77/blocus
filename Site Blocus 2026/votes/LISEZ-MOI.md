# Votes

Ce dossier reçoit les votes des élèves : un fichier `.json` par appareil et par
revendication. Il est écrit par le serveur (`POST /api/voix`), quand un serveur
local tourne, et par la main quand la page a été ouverte par double-clic — une
page web ne peut rien écrire sur le disque.

Rien n'est compilé ici. `build/import-revendications.js` lit les fichiers pour
calculer les pourcentages et les nombre d'appareils ayant voté, puis écrit
`build/revendications.js`, que les pages lisent sans serveur.

## Un fichier par vote

Le nom est l'identifiant de l'appareil, puis celui de la revendication :

```
9f2c1a7b40de55c8-r1e4a09c7d3.json
└──────┬───────┘ └──────┬───────┘
   appareil (16 car.)  revendication
```

L'identifiant d'appareil vient de la page (`build/appareil.js`) : un tirage au
sort, gardé dans le navigateur. Le serveur le recopie dans un cookie et ne
retient que lui — changer d'identifiant ne redonne donc pas de voix. Le cookie
est posé dès la première lecture du tableau (`GET /api/rev`), pas seulement au
premier vote : la page envoie son identifiant dans l'adresse, ce qui permet au
serveur de répondre « tes choix » même si le cookie a été vidé.

## Ce qu'il y a dedans

```json
{
  "version": 1,
  "recu_le": "2026-10-04T18:20:31",
  "source": "index.html",
  "appareil": "9f2c1a7b40de55c8…",
  "etablissement": "37072|Collège Alcuin",
  "etablissement_nom": "Collège Alcuin",
  "revendication": "r1e4a09c7d3",
  "titre": "Des moyens supplémentaires en mathématiques",
  "choix": "pour"
}
```

Le titre et le nom de l'établissement sont recopiés pour que le fichier se lise
sans aller les chercher : un vote isolé reste compréhensible dans six mois.

## Deux règles, vérifiées par le serveur

* **une voix par appareil et par revendication** : voter deux fois pour la même
  revendication est refusé ;
* **un appareil ne vote que dans un seul établissement** : s'il a déjà voté
  ailleurs, le serveur refuse et dit dans quel établissement. Sans compte, c'est
  la seule façon de savoir qu'une personne ne revient pas voter dix fois depuis
  dix navigateurs — et c'est pourquoi le tableau affiche « une voix, un
  établissement ».

## Ce que cela ne garantit pas

Un navigateur qui efface ses données ouvre une nouvelle voix. Sans compte à quoi
se rattacher, il n'y a pas mieux à faire, et les pages le disent : ce n'est pas
un vote d'expert, c'est un décompte d'élèves.

## Sans serveur

Le vote part en fichier : la page télécharge le `.json` et demande de le déposer
ici, puis

```
node build/import-revendications.js
```

pour que le décompte change. Le générateur signale les fichiers illisibles et
les votes qui ne désignent plus aucune revendication : mieux vaut le dire que
les perdre en silence.