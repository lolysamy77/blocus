# Demandes de revendication

Ce dossier reçoit ce que les visiteurs proposent sur la page
**Ajouter une revendication** (`ajouter-une-revendication.html`).

Une demande est une ligne que les élèves d'un collège ou d'un lycée verront dans
**son** tableau, à côté de ses blocus, et sur laquelle ils voteront. Elle attend
d'être relue avant de figurer parmi les revendications retenues (voir plus bas
« Publier une revendication »), mais elle s'affiche déjà, marquée « à relire ».

## Le titre vient de l'onglet Revendications

On **ne rédige pas** une revendication : on en choisit une parmi celles de
l'onglet **Revendications** (`revendications.html`), qui sont écrites à la main.
Le formulaire propose ces quatorze demandes et rien d'autre, et le serveur
refuse tout titre qui ne serait pas dans la liste — c'est lui qui la relit, dans
`build/rev-nationales.json`, que le script suivant tire de la page :

```
node build/extraire-rev-nationales.js
```

À lancer après **chaque** modification de la liste dans la page ; le contrôleur
`build/controle-revendications.js` signale si on l'a oublié. Le serveur accepte
un titre à la casse et aux accents près, mais l'enregistre toujours avec la
forme exacte de la page.

Ce qui est propre à l'établissement — « chez nous, c'est le gymnase qui est
vide depuis septembre » — va dans `description`, qui est facultative. Le tableau
affiche la phrase de la revendication choisie, et la description en dessous
seulement si l'élève a écrit quelque chose.

## Un fichier par revendication

Chaque demande est un fichier `.json` nommé d'après son établissement, pour
qu'on la retrouve sans l'ouvrir :

```
2026-10-04_37072_college-alcuin_181207.json
└────┬────┘ └──┬──┘ └──────────┬─────────┘ └──┬──┘
     jour   code INSEE   établissement        heure
            de la commune   (sans accents)
```

S'il existe déjà une revendication pour cet établissement ce jour-là, la
nouvelle est numérotée plutôt que remplacée : les deux propositions sont
gardées, et la page dit à la personne que sa revendication est la Nᵉ de la
série. Une personne peut en proposer plusieurs — jusqu'à dix par
établissement et par jour, plafond que le serveur applique seul.

```
2026-10-04_37072_college-alcuin_181207.json      ← 1re revendication
2026-10-04_37072_college-alcuin_181544_#1.json   ← 2e
2026-10-04_37072_college-alcuin_182011_#2.json   ← 3e
```

Le numéro compte des personnes, pas des secondes — même règle que pour les
signalements de blocus. Hors ligne, le nom proposé est le même mais sans le
`_#1` : rien ne sait ce que contient déjà le dossier, c'est donc à la main
qu'on renomme le fichier déposé.

## Ce qu'il y a dedans

```json
{
  "version": 1,
  "recu_le": "2026-10-04T18:12:07",     ← quand le serveur l'a écrit
  "source": "ajouter-une-revendication.html",
  "departement": "37",
  "nom_departement": "Indre-et-Loire",
  "certifie_dans_etablissement": true,
  "type": "C",
  "type_lisible": "collège ou lycée général et technologique",
  "etablissement": "Collège Alcuin",
  "code_insee_commune": "37072",
  "titre": "Des classes moins chargées",   ← le titre de la page, tel quel
  "texte_national": "Des classes moins chargées, afin d'améliorer…",
  "description": "…",                       ← facultatif, ce que l'élève ajoute
  "contact": "…",                           ← facultatif, peut être vide
  "appareil": "9f2c…",                      ← l'identifiant qui a envoyé
  "nom_fichier": "…"
}
```

L'établissement, sa commune et la revendication choisie sont obligatoires : le
serveur refuse la demande et dit lequel manque. L'établissement vient du menu,
donc son nom est exactement celui de l'annuaire — c'est ce nom, avec le code de
la commune, qui forme la clé `37072|Collège Alcuin` et qui fait le lien avec les
votes.

`texte_national` est recopié par le serveur : c'est la phrase de la page, et
elle sert de description à la ligne du tableau quand l'élève n'a rien écrit.
Le générateur s'en sert aussi pour relire une demande déposée à la main.

## Deux personnes, la même revendication

Un identifiant de revendication est **calculé**, jamais attribué : c'est le SHA‑1
de « clé|titre comparable », sans accents ni casse. Deux élèves qui choisissent
la même revendication pour le même établissement tombent donc sur **la même
ligne** du tableau, et les deux propositions sont comptées (`proposeurs`). C'est
voulu : le tableau compte des revendications, pas des envois.

## Publier une revendication

Une proposition s'affiche déjà, marquée « à relire ». Pour la retenir, on
colle son bloc dans `build/revendications.json`, puis on régénère le fichier
des pages :

```
node build/import-revendications.js
```

Le compte rendu affiche, pour chaque proposition, le bloc de JSON prêt à
coller :

```json
{
  "37072|Collège Alcuin": {
    "code": "37072",
    "nom": "Collège Alcuin",
    "departement": "37",
    "revendications": [
      {
        "titre": "Des classes moins chargées",
        "description": "…",
        "publiee_le": "2026-10-04",
        "source": "2026-10-04_37072_college-alcuin_181207.json"
      }
    ]
  }
}
```

Une revendication retenue garde le même identifiant, donc **ses votes ne se
perdent pas** au passage de « à relire » à « retenue ». Le fichier de la
demande reste dans ce dossier : c'est la trace, et le serveur s'en sert pour
compter qui a proposé quoi.

Retenir une revendication, c'est la faire passer dans le tableau d'un
établissement particulier — la liste nationale, elle, ne change que dans la
page.

## Sans serveur

Un double-clic sur `ajouter-une-revendication.html` ouvre la page en `file://` : là,
une page web n'a aucun droit d'écrire sur le disque. Le formulaire bascule donc
sur un téléchargement : le fichier `.json` arrive dans vos téléchargements, et
il n'y a plus qu'à le déplacer ici.

Pour que l'enregistrement soit automatique :

```
python serve.py --no-open
```

puis rechargez `ajouter-une-revendication.html` depuis
`http://localhost:8000/ajouter-une-revendication.html`. Le serveur répond
`POST /api/revendication` ; `GET /api/revendications` liste ce qui a déjà été
enregistré, et `GET /api/rev` ce que les pages lisent : les revendications de
chaque établissement avec leurs comptes de voix.