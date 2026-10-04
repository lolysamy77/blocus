# Vague 1 — consignes de recherche blocus

## Contexte

Mouvement de blocus des lycées en France, **du 18 septembre 2026 au 4 octobre 2026**
(date du jour : 4 octobre 2026). Les dates à retenir sont donc comprises dans
cette fenêtre.

## Règle n°1 — ne jamais inventer

C'est la règle la plus importante du lot.

- On ne note une source que si son **URL a réellement été retournée par une
  recherche** ou si la page a été **récupérée avec succès**.
- On n'invente jamais une URL, une date, un titre d'article ni une citation.
- En cas de doute sur une date, on écrit `date incertaine` et on explique
  pourquoi. Une case vide vaut mieux qu'une date inventée.
- Un agent qui ne trouve rien doit écrire `aucune source trouvée`. C'est un
  résultat acceptable et attendu.

## Règle n°2 — définir ce qu'est un blocus

À retenir, c'est le fait que **les élèves ont empêché l'accès à
l'établissement** :

- entrées bloquées, portails/grilles fermés par les élèves,
- élèves installés devant l'entrée, chaîne humaine, sit-in, barricades devant
  l'établissement,
- cours non assurés parce que les élèves bloquent l'accès.

À **ne pas** compter comme blocus :

- une grève des personnels uniquement (grève profs, grève de la vie scolaire),
- la suspension des cours décidée par l'administration par précaution
  (c'est une fermeture, pas un blocus),
- une mobilisation ou manifestation dans la ville sans lien avec l'établissement,
- un blocage d'université sans lien avec un lycée.

## Règle n°3 — sources

Priorité, dans cet ordre :

1. **Presse locale/régionale** : la meilleure source, la plus précise.
2. **France 3 / Franceinfo / Le Monde / Libération / Actu.fr / La Voix du Nord**…
3. **Instagram / TikTok / YouTube** : uniquement si l'URL ressort dans une
   recherche. Ce sont des testimoniages, souvent sans date fiable.
4. **X / Twitter, Facebook** : pages de comptes locaux, postes de rectorat,
   presse qui relaie.

**Snapchat est exclu** : il n'a aucun index web public, aucune URL n'est
accessible. Ne cite jamais Snapchat.

Une URL Instagram ou TikTok qui renvoie à une page de connexion ne peut pas
être lue : on ne peut pas en tirer une date. Si on n'a que ça, la source est
notée mais avec `contenu non lisible`.

## Règle n°4 — nombre de sources

- **2 sources indépendantes** pour déclarer un blocus `confirmé`.
- 1 seule source → `source unique`, on note quand même.
- 0 source → `aucune source trouvée`.

Deux articles qui recopient la même dépêche ne comptent pas comme deux sources
indépendantes : vérifier l'origine.

## Méthode par établissement

1. `grep` d'abord dans `build/blocus-recherche.js` pour vérifier si l'établissement
   est déjà présent. Si oui, ne pas refaire : le noter `déjà traité` et passer.
2. Si le lot fournit une URL de presse : **la récupérer en premier**
   (`webfetch`). Elle contient souvent le nom exact, la date et la commune.
3. Recherches à essayer, en adaptant au nom :
   - `"<nom lycée>" <commune> blocus`
   - `"<nom lycée>" blocage élèves <date>`
   - `"<nom lycée>" entrée bloquée`
   - `"<nom lycée>" septembre 2026 OR octobre 2026`
   - `"<nom>" lycée <commune> inequalities élèves`
   - `"<nom lycée>" site:france3-regions.franceinfo.fr`
   - `"<nom lycée>" instagram blocus`
   - Variante sans « lycée » : parfois l'article écrit seulement le nom
     patronyme (`"Henri Bergson" Bourges blocus`).
4. Noter la **date du blocus**, pas la date de l'article. Si l'article est du
   02/10 et parle de « mardi », tenter de dater : le 02/10/2026 est un vendredi,
   donc mardi = 29/09/2026. Vérifier le jour de la semaine avant de déduire.

## Sortie attendue

Écrire **un seul fichier** `resultat-<numero-lot>.md` dans ce dossier
(`recherche-blocus-2026/vague1/`).

Format : un bloc par établissement, dans cet ordre.

```markdown
## <Nom du lycée> — <Commune> (<code dept>)

- **Statut** : confirmé | source unique | non confirmé | aucune source trouvée
- **Blocus le** : JJ/MM (2026-09-JJ ou 2026-10-JJ) — ou `date incertaine`
- **Nature** : ce qui s'est passé, en une phrase
- **Sources** :
  1. <titre> — <URL> — `<date de publication si connue>`
  2. <titre> — <URL> — `<date de publication si connue>`

### Plusieurs dates
Si l'établissement a été bloqué plusieurs jours, lister une ligne par blocus,
chacune avec ses sources.

| Lycée | Commune | Dept | Date(s) | Statut | Nb sources |
|---|---|---|---|---|---|
```

À la toute fin du fichier, une **tableau de synthèse** de toutes les lignes du lot,
pour que je puisse lire le résultat d'un coup d'œil.

Le fichier doit être **autonome** : je ne lee pas les recherches, seulement
le fichier final.