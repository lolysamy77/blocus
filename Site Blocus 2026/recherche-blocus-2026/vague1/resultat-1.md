# Lot 1 — Centre-Val de Loire + Bourgogne-Franche-Comté

**Recherche sur sources publiques, mouvement des blocages de lycées du 18/09/2026 au 04/10/2026.**
Date de la recherche : 04/10/2026.

**Méthode appliquée, dans l'ordre imposé par `CONSIGNES.md` :**

1. `grep` de `build/blocus-recherche.js` (649 clés `window.BLOCUS["codeINSEE|Nom"]`) avant toute recherche, pour chaque établissement du lot. Les codes INSEE ont été résolus avec `build/communes/<dept>.js` et les noms d'établissements avec `build/ecoles-fr.js` (annuaire de l'Éducation nationale), ce qui a permis de corriger plusieurs erreurs d'attribution du lot (commune et/ou nature).
2. Récupération des URL de presse fournies dans `lot-1.txt` en premier.
3. Recherches web en français, presse locale et régionale en priorité.
4. Aucune URL citée ci-dessous n'a été inventée : chacune a été retournée par une recherche ou récupérée avec succès. Les pages dont le contenu n'a pas pu être lue sont signalées comme telles.

**Rappel du critère « blocus » (règle n°2) :** seuls sont retenus les faits d'empêchement d'accès (entrées ou grilles bloquées, élèves installés devant l'entrée, sit-in, chaîne humaine, barricades). Une simple fermeture administrative, une grève de personnels ou une manifestation urbaine sans lien avec l'établissement ne comptent pas. Quand la source écrit elle-même « pas de blocage », c'est indiqué explicitement ci-dessous.

---

## Lycée Henri-Bergson — Bourges (18)

- **Statut** : `aucune source trouvée`
- **Blocus le** : `date incertaine` — aucun événement documenté
- **Nature** : aucun établissement de ce nom n'existe à Bourges ; aucune mobilisation ne peut donc lui être attribuée.
- **Sources** : aucune.

**Constats de vérification :**
- L'annuaire officiel (`build/ecoles-fr.js`, département 18) ne contient **aucune** occurrence de « Bergson ». Les lycées de Bourges (INSEE 18033) sont : lycée Jacques-Cœur, lycée polyvalent Pierre-Émile Martin, lycée Marguerite de Navarre, lycée Henri Alain-Fournier, LP Vauvert, LP Jean de Berry, LP Jean Mermoz, école militaire préparatoire technique, plus les lycées privés Saint-Jean-Baptiste de La Salle et Sainte-Marie.
- Les seuls « Henri Bergson » de France sont à Chinon (37, collège), Angers (49, lycée), Paris 19e (75, collège et lycée) et Nanterre (92, collège). **Aucun en Centre-Val de Loire, aucun dans le 18.**
- La presse locale du 01/10/2026 recense à Bourges trois lycées, **aucun** nommé Henri-Bergson : lycée Vauvert (une centaine d'élèves), lycée Pierre-Émile-Martin (environ 200) et aux abords du lycée Jacques-Cœur (environ 200). Ces trois établissements sont **déjà traités** dans `build/blocus-recherche.js` (`18033|Lycée Jacques Coeur`, `18033|Lycée polyvalent Pierre-Émile Martin`, `18033|Lycée professionnel Vauvert`).
- L'URL fournie par le lot est un post Facebook du Berry Républicain, **sans URL** : non récupérable, donc non citable.

**Conclusion :** le nom « Lycée Henri-Bergson / Bourges / 18 » est très probablement une erreur de machine. Aucun ajout à faire.

Sources (contexte, pas l'établissement du lot) :
1. De Blois à Bourges, une mobilisation lycéenne qui se durcit en Centre-Val-de-Loire - https://www.sweetfm.fr/de-blois-a-bourges-une-mobilisation-lyceenne-qui-se-durcit-en-centre-val-de-loire - `01/10/2026` (modifié 19h28)

---

## Lycée Dessaignes-Delaunay — Blois (41)

- **Statut** : `confirmé`
- **Blocus le** : 01/10/2026
- **Nature** : action du jeudi 1er octobre 2026 à Blois : une centaine d'élèves plantent des pancartes devant le parvis des « lycées Dessaignes-Delaunay », puis un cortège d'environ 1 200 élèves (500 à midi) défile en ville avant de revenir sur le parvis ; les entrées restaient ouvertes, puisque ceux qui voulaient suivre les cours sont entrés.
- **Sources** :
  1. DIRECT. Mobilisation lycéenne en Centre-Val de Loire et dans le Poitou : revivez la journée du jeudi 1er octobre - https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628 - `01/10/2026` (publié 08h20, mis à jour 20h02)
  2. De Blois à Bourges, une mobilisation lycéenne qui se durcit en Centre-Val-de-Loire - https://www.sweetfm.fr/de-blois-a-bourges-une-mobilisation-lyceenne-qui-se-durcit-en-centre-val-de-loire - `01/10/2026` (modifié 19h28)

**Avertissement de nommage — l'intitulé du lot n'existe pas :**
« Dessaignes-Delaunay » est un **libellé de presse** qui regroupe deux établissements distincts de Blois (INSEE 41018) :
- **Lycée Philibert Dessaignes** (Blois) — **déjà traité** : `41018|Lycée Philibert Dessaignes`.
- **Lycée professionnel Sonia Delaunay** (Blois, 21 bis rue d'Auvergne, code UAI 0410832G, académie d'Orléans-Tours) — **absent de `build/blocus-recherche.js`**. Attention : la clé existante `59350|Lycée professionnel Sonia Delaunay` correspond au **lycée de Lille** (59350 = Lille, UAI 0590111A), pas à celui de Blois. **Il existe deux établissements de ce nom ; celui de Blois n'est pas couvert.**

Extraits des sources :
- LNR, 7h50 : « Ce jeudi, pour la première fois, une manifestation a lieu à Blois. Une centaine de élèves brandissent des pancartes devant les lycées Dessaignes-Delaunay. Ils n'empêchent pas pour autant les jeunes qui le souhaitent d'aller en cours. Des moyens de police ont été déployés sur place. »
- LNR, 12h30 : « Les étudiants arrivent sur le parvis des lycées Dessaignes et Delaunay, où avait commencé la manifestation. »
- Sweet FM (RadioActu Centre-Val-de-Loire), 01/10 : « Plusieurs établissements ont été bloqués ou fortement mobilisés, notamment le lycée Dessaignes à Blois, Claude de France à Romorantin et Ronsard à Vendôme. »

---

## Lycée Balzac — Blois (41)

- **Statut** : `source unique`
- **Blocus le** : 01/10/2026
- **Nature** : entrée « Balzac » de la cité scolaire Robert-Badinter fermée par les élèves, avec agitation et tirs de feux d'artifice devant le portail, dès 8h25 le jeudi 1er octobre 2026.
- **Sources** :
  1. DIRECT. Mobilisation lycéenne en Centre-Val de Loire et dans le Poitou : revivez la journée du jeudi 1er octobre - https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628 - `01/10/2026` (publié 08h20, mis à jour 20h02)

**Piège écarté — « Balzac » à Blois n'est pas « Balzac » à Tours :**
- `37261|Lycée Balzac` est le **lycée Balzac de Tours** (37261 = Tours), déjà traité (blocage le 30/09, établissement fermé le 01/10 avec Paul-Louis-Courier et Grandmont). Établissement **sans rapport** avec la ligne du lot.
- Le « Balzac » de Blois n'est pas non plus `41199|Collège Honoré de Balzac` : le code 41199 correspond à **Saint-Amand-Longpré** (41), pas à Blois (41018).
- Selon la LNR, à Blois « Balzac » est une **entrée de la cité scolaire Robert-Badinter** : « Blois. L'entrée Balzac de la cité scolaire Robert-Badinter, bloquée, est le lieu d'une agitation particulière avec l'usage de feux d'artifice. »

**À signaler :** le **Lycée polyvalent international Robert Badinter** (Blois, 41018) — cité par la LNR (proviseur Jérôme Lauxire, 11h15) et par Sweet FM (élève de seconde Tessa) dans le contexte du 01/10/2026 — est **absent de `build/blocus-recherche.js`**. C'est très probablement l'établissement à enregistrer réellement.

---

## Lycée Augustin-Thierry — Blois (41)

- **Statut** : `déjà traité`
- **Blocus le** : 01/10/2026 (signalé par la presse comme « lycée », mais l'établissement officiel de ce nom est un **collège**, déjà présent dans les données)
- **Nature** : devant l'établissement de Blois, des élèves allument un feu et font exploser des feux d'artifice ; les mouvements de Dessaignes-Delaunay et d'Augustin-Thierry convergent devant le même parvis.
- **Sources** :
  1. DIRECT. Mobilisation lycéenne en Centre-Val de Loire et dans le Poitou : revivez la journée du jeudi 1er octobre - https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colore-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628 - `01/10/2026` (publié 08h20, mis à jour 20h02)

**Vérification de la nature (le lot signalait « à vérifier ») :**
- L'annuaire officiel ne donne à Blois (41018) **qu'un seul** établissement de ce nom : **Collège Augustin Thierry** (catégorie « C » de l'annuaire). Il n'existe pas de lycée Augustin-Thierry à Blois.
- Cet établissement est **déjà traité** : `41018|Collège Augustin Thierry`.
- La presse écrit pourtant « lycée Augustin-Thierry à Blois » (LNR, 8h15 et 8h50) : c'est une approximation du vocabulaire de l'article.

Extraits : « Devant le lycée Augustin-Thierry à Blois, des élèves ont allumé un feu et font exploser des feux d'artifice. De très nombreux élèves expriment leur mécontentement. » / « À Blois, les mouvements de Dessaignes-Delaunay et Augustin-Thierry convergent devant les premiers établissements cités. »

**Conclusion :** ligne à supprimer du lot ; l'action du 01/10/2026 concerne le collège déjà enregistré.

---

## Lycée Montjoux — Besançon (25)

- **Statut** : `déjà traité`
- **Blocus le** : 01/10/2026
- **Nature** : « Montjoux » est le nom de rue du **lycée Jules-Haag** : établissement bloqué dès le matin du jeudi 1er octobre 2026 à Besançon, avec camions de sapeurs-pompiers caillassés, tirs de mortier et Chargés par les CRS, une policière légèrement blessée à l'omoplate.
- **Sources** :
  1. Lycées bloqués à Besançon : revendications mais aussi départs de feu, police et pompiers caillassés - https://www.macommune.info/blocage-des-lycees-departs-de-feu-camions-de-pompiers-caillasses-et-policier-blesse-a-besancon/ - `01/10/2026` (publié 09h59, mis à jour 17h14)

**Vérification de l'existence :**
- L'annuaire officiel de Besançon (25056) ne comporte **aucun** établissement nommé « Montjoux ». Il comporte bien le **Lycée polyvalent Jules Haag**, dont la presse donne l'adresse « lycée Jules-Haag/Montjoux ».
- Cet établissement est **déjà traité** : `25056|Lycée polyvalent Jules Haag`.

Extraits : « À Besançon : le lycée Victor-Hugo, le lycée Jules-Haag/Montjoux, le lycée professionnel Condé » ; légende de la vidéo : « Ce jeudi 1er octobre matin, de nombreux lycées, publics, mais aussi privé, sont bloqués à Besançon : Pergaud, Pasteur, Montjoux, Sainte-Famille, Condé, Victor-Hugo… » ; « Au lycée Jules-Haag, les camions des sapeurs-pompiers ont été caillassés […] une policière a été légèrement blessée au niveau de l'omoplate par un projectile devant le même établissement. »

**Établissements de Besançon également cités par cette même source le 01/10/2026 (tous déjà traités) :** Victor Hugo, Pergaud, Louis Pasteur, LP Condé, LP privé Sainte-Famille. Hors Besançon : LP Toussaint-Louverture à Pontarlier, lycée Germaine-Tillion et lycée Jules-Viette à Montbéliard, lycée Jouffroy-d'Abbans à Baume-les-Dames.

---

## Lycée Germaine-Tillion — Audincourt (25)

- **Statut** : `déjà traité`
- **Blocus le** : 01/10/2026
- **Nature** : le lycée Germaine-Tillion est situé à **Montbéliard**, et non à Audincourt ; il figure parmi les établissements du Doubs concernés par des blocages et des incendies le jeudi 1er octobre 2026.
- **Sources** :
  1. Lycées bloqués à Besançon : revendications mais aussi départs de feu, police et pompiers caillassés - https://www.macommune.info/blocage-des-lycees-departs-de-feu-camions-de-pompiers-caillasses-et-policier-blesse-a-besancon/ - `01/10/2026` (publié 09h59, mis à jour 17h14)

**Correction du lot :**
- L'établissement s'appelle **Lycée polyvalent Germaine Tillion** et se trouve à **Montbéliard** (25388) : clé existante `25388|Lycée polyvalent Germaine Tillion` → **déjà traité**.
- **Audincourt** (25031) est une autre commune : elle ne possède qu'un **Lycée professionnel Nelson Mandela** et le collège Jean Bauhin. La clé `25031|Lycée professionnel Nelson Mandela` existe déjà.
- Extrait de la source : « À Montbéliard : le lycée Germaine-Tillion et le lycée Jules-Viette » (parmi les établissements concernés par les incendies et les blocages dans le Doubs).

**URL fournie par le lot** (`letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/`) : page récupérée mais **contenu non lisible** (mur de navigation et paywall), aucune mention de Germaine-Tillion ni date exploitable.

---

## Lycée de Behren-lès-Forbach — Behren-lès-Forbach (57)

- **Statut** : `aucune source trouvée`
- **Blocus le** : `date incertaine` — aucune action documentée dans la fenêtre 18/09 – 04/10/2026
- **Nature** : aucun fait trouvé. L'unique lycée de Behren-lès-Forbach est le **Lycée professionnel Hurlevent**, absent de `build/blocus-recherche.js` ; aucune source de presse ne le mentionne pendant le mouvement.
- **Sources** : aucune pour Behren-lès-Forbach.

**Piège « lycée ou collège » — tranché :**
- Behren-lès-Forbach = code INSEE **57058**. L'annuaire officiel y donne exactement deux établissements : **Collège Robert Schuman** et **Lycée professionnel Hurlevent** (rue du Petit Bois, BP 117, académie de Nancy-Metz, environ 200 élèves, filières maintenance automobile et carrosserie). Il existe donc bien un lycée à Behren, et c'est le **lycée Hurlevent**, et non le collège Robert Schuman.
- Aucun code `57058|…` dans `build/blocus-recherche.js` : le lycée Hurlevent n'est **pas couvert** par les données actuelles. Recherche infructueuse pour une action en septembre ou octobre 2026.

**Ce que montre réellement l'URL fournie par le lot :**
`https://www.radiomelodie.com/a/23394-manifestations-lyceennes-des-tensions-eclatent-entre-jeunes-et-forces-de-lordre-a-forbach` — par Camille Bazin, `vendredi 2 octobre 2026 à 12:08`. Le titre, les hashtags (#Forbach #BlaisePascal #02octobre2026) et le texte portent sur **Forbach** et sur le **lycée des métiers Blaise-Pascal** (Forbach, 57227), pas sur Behren-lès-Forbach. Établissement déjà traité (`57227|Lycée des métiers Blaise Pascal`).
- Aucun établissement de Behren-lès-Forbach n'est nommé dans cet article.

---

## Lycée La Providence — Forbach (57)

- **Statut** : `déjà traité`
- **Blocus le** : `date incertaine` — aucune date propre à cet établissement ; l'action documentée à Forbach le 02/10/2026 concerne le lycée des métiers Blaise-Pascal
- **Nature** : la nature « lycée » du lot est erronée : à Forbach (57227) l'établissement « La Providence » est un **collège**, déjà enregistré ; l'article de presse fourni ne le mentionne pas.
- **Sources** : aucune nommant « La Providence » ; l'URL du lot est citée ci-dessous pour la rectification.

**Vérification :**
- Annuaire officiel, Forbach (57227) : **Collège La Providence** (catégorie « C »), plus les lycées Antoine Gapp (site de Forbach), des métiers Blaise Pascal et Jean Moulin. Aucun « lycée La Providence ».
- Clé existante : `57227|Collège La Providence` → **déjà traité**.
- L'URL du lot (radiomelodie.com, 02/10/2026) ne cite que le lycée des métiers Blaise-Pascal.

Sources (contexte, ne nommant pas La Providence) :
1. Manifestations lycéennes : des tensions éclatent entre jeunes et forces de l'ordre à Forbach - https://www.radiomelodie.com/a/23394-manifestations-lyceennes-des-tensions-eclatent-entre-jeunes-et-forces-de-lordre-a-forbach - `02/10/2026` (12h08)

---

## Cité scolaire du Banlay — Nevers (58)

- **Statut** : `source unique`
- **Blocus le** : 29/09/2026
- **Nature** : mardi 29 septembre 2026 au matin, plusieurs centaines d'élèves se rassemblent devant les entrées des lycées Raoul-Follereau, Jules-Renard et Jean-Rostand de la cité scolaire du Banlay à Nevers, en arc de cercle, avec pancartes ; la source précise qu'il ne s'agit **pas** d'un blocage d'accès (« Les gens qui voulaient rentrer dans le lycée ont pu le faire ») et qualifie le mouvement de pacifique.
- **Sources** :
  1. « On bloque tout parce qu'on nous laisse rien » : plusieurs centaines d'élèves mobilisés devant leurs lycées à Nevers - https://www.lejdc.fr/nevers-58000/actualites/on-bloque-tout-parce-quon-nous-laisse-rien-plusieurs-centaines-deleves-mobilises-devant-leurs-lycees-a-nevers_15055004/ - `29/09/2026` (par Bastien Chaize, publié 15h26)
  2. Ce qui change au 1er octobre : des blocages lycéens pacifiques dans la Nièvre, mais animés ailleurs - https://www.lejdc.fr/nevers-58000/actualites/ce-qui-change-au-1er-octobre-des-blocus-lyceens-pacifiques-dans-la-nievre-mais-animes-ailleurs-lactu-a-retenir-de-ce-jeudi_15056390/ - `01/10/2026` — **source non indépendante** (même journal, simple point de situation) : elle corrobore la date du 29/09 mais ne compte pas comme seconde source.

**Note importante — structure multi-filière et doublons :**
- L'URL fournie par le lot est la bonne et **nomme explicitement la cité scolaire du Banlay**. Extrait : « Devant l'impressionnante foule d'élèves qui s'organise en arc de cercle devant les différents établissements de la cité scolaire du Banlay […] » ; « plusieurs centaines de jeunes se sont rassemblés devant les entrées des lycées Raoul-Follereau, Jules-Renard et Jean-Rostand à Nevers, mardi 29 septembre, dès le matin ».
- Selon la ville de Nevers, la cité scolaire du Banlay regroupe : collège Adam-Billaut, **lycée professionnel Jean-Rostand**, **lycées généraux Jules-Renard et Raoul-Follereau** (boulevard Saint-Exupéry). Ces trois lycées sont **déjà présents** dans `build/blocus-recherche.js` sous le code `58194` (Nevers). Le seul élément réellement nouveau est le caractère groupé de l'action et sa qualification explicite « pas de blocage ».
- Contexte local revendiqué par les élèves : « le projet de fusion des lycées Jules-Renard et Raoul-Follereau ».

---

## Lycée Marc-Bloch — Strasbourg (67)

- **Statut** : `déjà traité`
- **Blocus le** : 02/10/2026 (tentatives d'intrusion empêchées dans la nuit du 1er au 2 octobre) — pour un blocus d'accès strict, `date incertaine`
- **Nature** : « Marc Bloch » se trouve à **Bischheim**, et non à Strasbourg ; l'établissement est déjà enregistré. Le seul fait daté et sourcé le concernant est une tentative d'intrusion dans l'enceinte, empêchée cette nuit-là par les forces de l'ordre — ce qui n'est pas un blocus d'accès.
- **Sources** :
  1. Alsace. Blocage des lycées : chaos à Mulhouse, blessé grave à Sélestat, lycées fermés lundi à Strasbourg et dans le Haut-Rhin - https://www.dna.fr/education/2026/10/02/blocage-des-lycees-dix-huit-etablissements-fermes-ce-vendredi-de-nouvelles-actions-en-cours - `02/10/2026` (direct du vendredi 2 octobre, entrée de 11h48)
  2. Blocages des lycées : l'accès à plusieurs établissements perturbé en Alsace - https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace - `30/09/2026` (date déduite du chemin de l'URL) - **contenu non lisible** (paywall) : aucune mention de Marc Bloch, aucune date de blocus exploitable.

**Correction du lot et note de doublon :**
- Le lycée Marc Bloch est situé **3 allée Blaise Pascal, 67803 Bischheim** (UAI 0672604S, académie de Strasbourg). Le code INSEE **67043 = Bischheim** ; Strasbourg = 67482.
- Clé existante : `67043|Lycée Marc Bloch` → **déjà traité**.
- Le groupe EBRA écrit « à Strasbourg » par raccourci d'Eurométropole ; la commune réelle est Bischheim.
- Extrait de la source DNA : « 11h48 — Des tentatives d'intrusion dans les lycées Marc Bloch et Couffignal à Strasbourg cette nuit » ; « Deux tentatives d'intrusion ont par ailleurs été empêchées dans la nuit de jeudi à vendredi aux lycées Marc Bloch et Couffignal, a-t-on appris dans la matinée des services de la Région Grand-Est. »
- **Ligne à supprimer du lot.** Pour information, la même source DNA indique que 18 lycées alsaciens sont restés fermés le vendredi 2 octobre 2026 et que les lycées de l'Eurométropole de Strasbourg fermeront lundi 5 octobre (fermeture administrative, pas un blocus).

---

## Lycée Henri-Vincenot — Louhans (71)

- **Statut** : `déjà traité`
- **Blocus le** : 01/10/2026
- **Nature** : blocage en cours devant la cité scolaire Henri-Vincenot à Louhans le jeudi 1er octobre 2026, une centaine d'élèves postés devant les grilles de l'entrée dès 10h05 ; la plupart des élèves ont quitté les abords à 12h32.
- **Sources** :
  1. Suivez la 3e journée de mobilisation lycéenne en Saône-et-Loire - https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire - `01/10/2026` (direct live, entrées horodatées 10h05 et 12h32)
  2. Bourgogne : point de situation des blocages de lycées (communiqué du rectorat de l'académie de Dijon du 30 septembre 2026) - https://www.infos-dijon.com/news/bourgogne-franche-comte/bourgogne-franche-comte/bourgogne-point-de-situation-des-blocages-de-lycees-1790719200.html - `30/09/2026` (20h12) — **source indirecte** : elle indique « 1 en Saône-et-Loire » parmi les 4 établissements perturbés le 30/09 mais **ne nomme aucun établissement** ; elle ne peut donc pas être attribuée à Vincenot.

**Note de doublon :** l'établissement est déjà enregistré sous `71263|Lycée polyvalent Henri Vincenot` (71263 = Louhans-Châteaurenaud). La ligne du lot est redondante ; la source ci-dessus apporte la date et la nature précises.

Extraits : « 10:05 Louhans : blocage en cours devant le lycée Henri-Vincenot — Un blocage en cours de la cité scolaire Henri Vincenot, une centaine d'élèves sont postés devant les grilles de l'entrée » ; « 12:32 Louhans : la majorité des Weeknd-Esnlfr a quitté les abords du lycée Henri-Vincenot ».

---

## Lycée professionnel (à identifier) — Brochon (21)

- **Statut** : `source unique`
- **Blocus le** : 29/09/2026
- **Nature** : l'établissement non identifié est le **Lycée général et technologique Stéphen-Liégeard** de Brochon ; entre 100 et 150 élèves s'y sont rassemblés le mardi 29 septembre 2026 avec des pancartes « élèves en colère », sans blocage des entrées, puisque le média et le rectorat parlent explicitement de rassemblement et non de blocage.
- **Sources** :
  1. Blocage des lycées : environ 150 élèves mobilisés devant le lycée Stephen-Liégeard à Brochon - https://www.ici.fr/bourgogne-franche-comte/cote-d-or-21/brochon/blocage-des-lycees-environ-150-eleves-mobilises-devant-le-lycee-stephen-liegeard-a-brochon-7789497 - `29/09/2026` (par Anne Oger, publié 11h56)
  2. Blocages des lycées : « on n'est pas là pour avoir la guerre », la mobilisation dégénère devant le lycée Le Castel à Dijon - https://www.ici.fr/emissions/l-info-d-ici-ici-bourgogne/blocages-des-lycees-on-n-est-pas-la-pour-avoir-la-guerre-la-mobilisation-degenere-devant-le-lycee-le-castel-a-dijon-4242560 - `01/10/2026` (diffusé 7h32) — **source non indépendante** (même réseau ICI / Radio France) ; elle mentionne « Après Stephen-Liégeard à Brochon et Simone Weil à Dijon mardi » et corrobore donc le 29/09.

**Identification de l'établissement :**
- Brochon = code INSEE **21110**. L'annuaire officiel n'y contient que deux établissements : **Collège La Champagne** et **Lycée général et technologique Stephen Liégeard** (rue Stéphen-Liégeard, 21220 Brochon, UAI 0210012Z, académie de Dijon). C'est donc bien le seul lycée possible : le « nom manquant dans la source » est **Stéphen-Liégeard**.
- Nature exacte : **lycée général et technologique**, et non « lycée professionnel ». Aucun code `21110|…` dans `build/blocus-recherche.js` : cet établissement **n'est pas couvert** et constitue un ajout réel.

Extraits : « Entre 100 et 150 élèves se sont mobilisés ce mardi 29 septembre, devant le lycée Stephen-Liégeard à Brochon » ; « Pas de blocage, mais des rassemblements devant les établissements, comme au lycée Stephen-Liégeard à Brochon » ; « le proviseur de l'établissement a proposé de recevoir une délégation demain mercredi ».

**Ce que montre l'URL fournie par le lot :** `https://www.infos-dijon.com/news/bourgogne-franche-comte/bourgogne-franche-comte/bourgogne-point-de-situation-des-blocages-de-lycees-1790719200.html` — `30/09/2026` (20h12). Elle ne cite **aucun nom d'établissement** : le rectorat de Dijon se borne à annoncer « 4 établissements ont fait l'objet d'actions ou de perturbations (2 en Côte-d'Or, 1 en Saône-et-Loire, 1 dans l'Yonne) », 13 interpellations en Saône-et-Loire et 2 en Côte-d'Or. Elle est donc **inutilisable pour rattacher Brochon** et ne compte pas comme source.

---

# Synthèse du lot 1

| Établissement (tel que libellé dans le lot) | Commune | Dept | Établissement réel retenu | Date(s) de blocus | Statut | Nb sources |
|---|---|---|---|---|---|---|
| Lycée Henri-Bergson | Bourges | 18 | *inexistant à Bourges* | — | aucune source trouvée | 0 |
| Lycée Dessaignes-Delaunay | Blois | 41 | libellé de presse : lycée Philibert Dessaignes **+** LP Sonia Delaunay (Blois) | 01/10/2026 | **confirmé** | 2 |
| Lycée Balzac | Blois | 41 | entrée « Balzac » de la cité scolaire Robert-Badinter | 01/10/2026 | **source unique** | 1 |
| Lycée Augustin-Thierry | Blois | 41 | collège Augustin Thierry (nature lycée erronée) | 01/10/2026 | **déjà traité** | 1 |
| Lycée Montjoux | Besançon | 25 | lycée Jules-Haag (rue Montjoux) | 01/10/2026 | **déjà traité** | 1 |
| Lycée Germaine-Tillion | Audincourt | 25 | lycée polyvalent Germaine Tillion, **Montbéliard** | 01/10/2026 | **déjà traité** | 1 |
| Lycée de Behren-lès-Forbach | Behren-lès-Forbach | 57 | lycée professionnel Hurlevent | — | **aucune source trouvée** | 0 |
| Lycée La Providence | Forbach | 57 | collège La Providence (nature lycée erronée) | — | **déjà traité** | 0 |
| Cité scolaire du Banlay | Nevers | 58 | cité scolaire (Jules-Renard, Raoul-Follereau, LP Jean-Rostand) | 29/09/2026 | **source unique** | 1 |
| Lycée Marc-Bloch | Strasbourg | 67 | lycée Marc Bloch, **Bischheim** | 02/10/2026 (tentative d'intrusion) | **déjà traité** | 1 |
| Lycée Henri-Vincenot | Louhans | 71 | lycée polyvalent Henri Vincenot | 01/10/2026 | **déjà traité** | 1 |
| Lycée professionnel (à identifier) | Brochon | 21 | lycée général et technologique Stéphen-Liégeard | 29/09/2026 | **source unique** | 1 |

**Comptage :** 1 `confirmé`, 3 `source unique`, 6 `déjà traité`, 2 `aucune source trouvée` (12 lignes).

---

# Annexe — établissements réellement NON couverts rencontrés au passage

Établissements nommés par les sources consultées dans la zone du lot, que je n'ai trouvés **nulle part** dans les 649 clés de `build/blocus-recherche.js` (codes INSEE vérifiés avec `build/communes/`). À vérifier avant toute saisie dans les données — je n'ai modifié aucun fichier du projet.

| Établissement | Commune (INSEE) | Dept | Élément sourcé | Source |
|---|---|---|---|---|
| **Lycée polyvalent international Robert Badinter** | Blois (41018) | 41 | cité le 01/10/2026 (proviseur interviewé, élève de seconde interviewée) | LNR 01/10/2026 ; Sweet FM 01/10/2026 |
| **Lycée professionnel Sonia Delaunay** (UAI 0410832G, 21 bis rue d'Auvergne) | Blois (41018) | 41 | actions du 01/10/2026 regroupées sous le libellé « Dessaignes-Delaunay » | LNR 01/10/2026 (7h50, 12h30) |
| **Lycée général et technologique Stéphen-Liégeard** (UAI 0210012Z) | Brochon (21110) | 21 | rassemblement de 100 à 150 élèves le 29/09/2026 | ici.fr (Ici Bourgogne) 29/09/2026 |
| **Lycée professionnel Hurlevent** | Behren-lès-Forbach (57058) | 57 | aucune action trouvée dans la fenêtre 18/09 – 04/10 | — |

Établissements vus dans la presse et **déjà** dans `build/blocus-recherche.js` (aucun ajout) : Bourges — Jacques-Cœur, Pierre-Émile-Martin, LP Vauvert ; Vierzon — Édouard-Vaillant ; Romorantin-Lanthenay — Claude de France ; Vendôme — Ronsard ; Montbéliard — Germaine-Tillion ; Dijon — Le Castel, Simone Weil ; Tours — Balzac, Grandmont, Paul-Louis-Courier.

Sources hors anuaire utilisées pour la structure des cités scolaires :
1. Banlay | nevers.fr - https://www.nevers.fr/vivre-a-nevers/quartiers/banlay - `date inconnue`
2. Lycée Stéphen-Liégeard - Wikipédia - https://fr.wikipedia.org/wiki/Lyc%C3%A9e_St%C3%A9phen-Li%C3%A9geard - `date inconnue`
3. Lycée professionnel Sonia Delaunay - Ministère de l'Éducation nationale - https://www.education.gouv.fr/annuaire/41000/blois/lycee/0410832g/lycee-professionnel-sonia-delaunay.html - `date inconnue`
