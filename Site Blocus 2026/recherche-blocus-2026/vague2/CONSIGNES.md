# VAGUE 2 — Tranchage des fiches ambiguës

## Pourquoi cette vague

La vague 1 a produit 186 fiches avec un blocus sourcé. Après rapprochement avec le
fichier officiel des 4 774 lycées (`lycees-france\lycees_brut.csv`), **105 de ces
fiches ne sont pas encore exploitables** :

| Problème | Nb | Risque |
|---|---|---|
| `HOMONYME` — le nom est porté par plusieurs départements | 25 | mauvais département attribué |
| `INTROUVABLE` — le nom ne correspond à aucune entrée du CSV | 23 | nom erroné ou appellation incomplète |
| `ABSENT_BASE` — absent de la base, ou présent **sous un autre département** | 57 | doublon ou fausse absence |

Les 81 autres sont déjà dans la base avec le bon département : elles ne demandent
rien, elles ont seulement confirmé l'existant.

## Ce qui n'est pas une source acceptable

- **Snapchat** : aucun index public. Toute « source Snapchat » est une invention.
  Interdit, sans exception.
- **Instagram / TikTok / TikTok** : acceptables **uniquement** si une vraie URL
  ressort dans les résultats de recherche. Il faut alors écrire
  `vue en recherche, page non ouverte` et ne pas inventer la date.
- **YouTube** : acceptable avec une vraie URL. Une vidéo vue en recherche sans
  être ouverte est marquée comme telle.
- **Presse** : le titre ne suffit pas. Si le titre dit « bloqué » et que le corps
  dit « rassemblement dans le calme », c'est un rassemblement, pas un blocus.
- **Fil info militant** : accepté **uniquement recoupé** par une seconde source
  indépendante qui donne le même établissement et le même jour. Seul cas connu :
  `dijoncter.info`, qui sera traité comme non tranché tant qu'il n'est pas recoupé.

## Définitions

Un **blocus** signifie que l'accès des élèves à l'établissement a été empêché.

Ne sont pas des blocages :
- le grève du personnel ;
- la fermeture administrative (arrêté) ;
- l'interdiction préfectorale de manifestation ;
- le rassemblement devant les grilles lorsque les accès restent ouverts ;
- la manifestation qui concerne uniquement l'université.

## Règles de non-fabrication

1. Jamais d'établissement, de date ou d'URL inventés. Si la source ne permet pas
   de trancher, on écrit `STATUT: NON TRANCHE` et on passe à la suivante. **Un
   abandon est un résultat correct ; une invention est grave** — le site est
   public et nomme des établissements réels.
2. Toute affirmation doit porter la citation exacte (`q`) qui la soutient.
3. Le département fait autorité via le CSV, jamais via le souvenir. **39 noms de
   lycées existent dans plusieurs départements** : Condorcet (02, 60, 62, 69, 78),
   Carnot (06, 21, 42, 62, 75, 971), Turgot (75, 87), Voltaire (30, 45, 62, 75),
   Balzac (16, 36, 37, 75, 77)… Un agent de vague 1 a accusé à tort six lycées
   d'être absents de la base pour cette raison.
4. Format de sortie, une ligne par établissement :

```
code| appellation exacte du CSV | commune | dept | nature | n | j | z | l(url) | p | q | m
```

`n` = nature (`Blocus national`, `Rassemblement`, `Tentative de blocus`),
`j` = jour, `z` = date ISO, `l` = lien presse, `p` = provenance,
`q` = citation, `m` = média cité.

## Méthode

1. **Écris `resultat-N.txt` avant toute recherche**, avec l'en-tête et la liste des
   fiches. Remplis-le au fur et à mesure. Ne reconstruis pas le fichier à la fin
   depuis ta mémoire — c'est exactement ce qui a fait abandonner 4 agents sur 12
   en vague 1.
2. Ouvre les URL fournies. Si elles sont mortes ou abolues, retrouve l'article par
   une autre voie ou déclare non tranché.
3. Un budget : **8 à 12 ouvertures d'URL maximum par fiche**. Au-delà, ce n'est
   pas cette fiche qui est le problème, c'est la source.
4. Pour un `HOMONYME`, cherche le mot de la commune dans le corps de l'article.
   « Dijon » dans le texte tranche immédiatement un Carnot.