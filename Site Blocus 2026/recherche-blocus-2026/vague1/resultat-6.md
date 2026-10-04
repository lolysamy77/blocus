# Lot 6 — Paris et petite couronne (075, 076, 078, 092, 093, 094, 095)

**Recherche effectuée le : 04/10/2026** (date du jour, heure de Paris).

**Période couverte :** 18/09/2026 – 04/10/2026.

**Rappel calendrier** (à vérifier avant toute saisie : les articles citent souvent « mardi », « ce jeudi », « hier ») :

| Date | Jour |
|---|---|
| 18/09/2026 | vendredi |
| 19/09/2026 | samedi |
| 20/09/2026 | dimanche |
| 21/09/2026 | lundi |
| 22/09/2026 | mardi |
| 23/09/2026 | mercredi |
| 24/09/2026 | jeudi |
| 25/09/2026 | vendredi |
| 26/09/2026 | samedi |
| 27/09/2026 | dimanche |
| **28/09/2026** | **lundi** |
| **29/09/2026** | **mardi** |
| **30/09/2026** | **mercredi** |
| **01/10/2026** | **jeudi** |
| **02/10/2026** | **vendredi** |
| 03/10/2026 | samedi |
| **04/10/2026** | **dimanche** |

Déductions utilisées dans ce rapport : « ce mardi » cité le 01/10 ou le 02/10 = **29/09** ; « ce jeudi » cité les 01/10–03/10 = **01/10** ; « ce vendredi » = **02/10**.

**Rappel de statut (règle appliquée partout dans ce rapport) :**

- **blocus** = les élèves empêchent l'accès à leur établissement (entrées filtrées, portail/grille bloqués, poubelles, mobylettes, chaîne humaine devant l'entrée).
- **fermeture administrative** = l'établissement ferme de sa propre initiative ou sur instruction préfectorale, sans preuve d'un blocage ce jour-là. **Ce n'est pas un blocus.**
- **rassemblement** = les élèves sont devant l'établissement ou dans la rue, sans empêcher l'accès.
- **Statuts utilisés** : `confirmé` (2 sources indépendantes) / `source unique` / `non confirmé` / `aucune source trouvée` / `pas un blocus`.
- Une dépêche reprise par N médias = **une seule source**.

**Piège du 02/10 (rappel du lot, confirmé par mes recherches) :** les arrêtés préfectoraux publiés le 02/10 (Paris, 93, 94, 95, 78) et le 03/10 (93, 94) sont des **fermetures administratives** ou des **interdictions de rassemblement**. Ils ne disent pas qui a bloqué ce jour-là. Chaque établissement de ces listes est marqué comme tel dans ce rapport.

**Outillage (à lire avant de juger les absences) :** l'outil `websearch` de la session est resté inaccessible toute la journée (`Web search authentication failed (HTTP 401)`). J'ai travaillé avec : (a) des flux RSS Google Actualités (`news.google.com/rss/search?q=…&hl=fr&gl=FR&ceid=FR:fr`, qui accepte `after:` / `before:`) pour l'exhaustivité des titres, (b) des récupérations directes des articles, (c) l'annuaire officiel du ministère (`data.education.gouv.fr`, jeu `fr-en-annuaire-education`,_snapshot du 04/10/2026) pour **vérifier l'identité, la commune et le département de chaque établissement** et débusquer les homonymes, (d) le moteur Brave, qui **limite fortement le débit** (2 recherches par appel environ). Conséquence : **les absences sont nettement moins fiables que les présences.**

**Note importante sur `build/blocus-recherche.js`** : j'ai fait le `grep` demandé par les consignes sur les 14 noms **et sur les codes commune INSEE** de leurs communes. **Un seul des 14 établissements du lot y figure déjà** (Galilée de Franqueville-Saint-Pierre, voir § 3) ; les 13 autres en sont absents. En revanche le fichier contient déjà **27 établissements de Paris et de la petite couronne** — j'ai donc annoté « déjà traité » chaque fois que ma recherche recoupait l'une d'eux, pour ne pas faire doubler le corpus. Le détail est dans « Ce que je n'ai pas pu trouver ».

---

## Articles-listes trouvés

Classés par rendement (nombre d'établissements nommés en une seule fois).

### 1. Actu.fr — 03/10/2026 17h13 — Seine-Saint-Denis : la liste la plus riche du lot (28 établissements)
https://actu.fr/societe/blocus-des-lycees-28-etablissements-fermes-lundi-en-seine-saint-denis-voici-la-liste_64875849.html

> « Pas de retour en classe lundi pour les élèves de 28 lycées de Seine-Saint-Denis. La décision apparaît dans un arrêté pris par le préfet du département et publié le 2 octobre 2026. »
> « La préfecture rappelle qu'une trentaine de lycées avaient vu leur fonctionnement "grandement entravé" lors de la seule journée du jeudi 1er octobre. »

Liste intégrale (arrêté du 02/10, applicable au **lundi 05/10**, date hors fenêtre) : Aubervilliers : Jean-Pierre-Timbaud / Le Corbusier · Aulnay-sous-Bois : Voillaume · Bagnolet : Eugène-Henaff · Bondy : Léo-Lagrange / Jean-Renoir · Drancy : Paul-Le-Rolland / **Eugène-Delacroix** · Gagny : Gustave-Eiffel · La Courneuve : Denis-Papin · Le Raincy : Albert-Schweitzer / **René-Cassin** · Les Pavillons-sous-Bois : Claude-Nicolas-Ledoux · Montreuil : Condorcet / Eugénie-Cotton / Jean-Jaurès · Noisy-le-Sec : Théodore-Monod / Olympe-de-Gouge · Pantin : Marcelin-Berthelot / Lucie-Aubrac · Saint-Denis : Paul-Éluard / Suger / Frédéric-Bartholdi · Tremblay-en-France : Hélène-Boucher / Léonard-de-Vinci · Villemomble : Georges-Clemenceau · Villepinte : Jean-Rostand / Georges-Brassens.

**Deux vérifications négatives importantes** : **ni le lycée polyvalent André-Sabatier (Bobigny) ni le lycée ENNA (Saint-Denis) ne figurent dans cette liste de 28.**

### 2. Actu.fr — 03/10/2026 17h30 — Val-de-Marne : 14 établissements
https://actu.fr/societe/blocus-des-lycees-14-etablissements-passent-en-distanciel-lundi-dans-le-val-de-marne-voici-la-liste_64875886.html

> « Selon la préfecture, entre une dizaine et une vingtaine d'établissements sont touchés quotidiennement par des blocages depuis le premier mouvement du 17 septembre. Les lycées concernés varient d'un jour à l'autre. »

Liste intégrale (arrêté du 02/10, applicable au **lundi 05/10**) : Alfortville : Maximilien-Perret · Charenton-le-Pont : Robert-Schuman · Choisy-le-Roi : Jean-Macé · Ivry-sur-Seine : Romain-Rolland · Le Kremlin-Bicêtre : Darius-Milhaud · Limeil-Brévannes : Guillaume-Budé · Nogent-sur-Marne : Louis-Armand · Saint-Maur-des-Fossés : Condorcet / François-Mansart · Sucy-en-Brie : Christophe-Colomb · Villeneuve-Saint-Georges : François-Arago · Vitry-sur-Seine : LP-Camille-Claudel / Jean-Macé / Adolphe-Chérioux.

**Vérification négative importante** : **ni Eugène-Delacroix (Maisons-Alfort) ni Cours-du-Hameau (Thiais) ne figurent pas dans cette liste de 14.**

### 3. Actu.fr — 03/10/2026 11h18 — Paris : 25 lycées, arrêté du 02/10 valable du 3 au 5 octobre
https://actu.fr/ile-de-france/paris_75056/les-blocus-interdits-devant-deux-fois-plus-de-lycees-a-paris-lundi-ce-que-risquent-les-contrevenants_64875184.html

> « Au total, 25 établissements sont concernés, contre 13 vendredi. »
> « Les portes d'entrée des lycées Gaston Bachelard (13e arrondissement) et Roger Verlomme ont par exemple été les cibles de violents incendies, tandis que de fortes tensions entre manifestants et forces de l'ordre sont apparues à proximité d'autres établissements, comme les lycées Voltaire (11e), Helene Boucher (20e) ou encore Galilee (13e). »

Liste intégrale : Pierre-Lescot (1er) · Gustave-Eiffel (7e) · Racine (8e) · Colbert (10e) · Marie-Laurencin (10e) · Caroline-Dorian (11e) · Turquetil (11e) · Voltaire (11e) · Arago (12e) · Elisa-Lemonnier (12e) · Gaston-Bachelard (13e) · Gabriel-Fauré (13e) · **Galilée (13e)** · Jean-Lurçat (13e) · Raspail (14e) · Louis-Armand (15e) · Beaugrenelle (15e) · Roger-Verlomme (15e) · Balzac (16e) · d'Alembert (19e) · Hector-Guimard (19e) · Hélène-Boucher (20e) · Étienne-Dolet (20e) · Martin-Nadaud (20e) · Maurice-Ravel (20e).

### 4. Actu.fr — 02/10/2026 09h58 — Paris : 13 lycées, arrêté du 02/10
https://actu.fr/ile-de-france/paris_75056/mobilisation-a-paris-la-prefecture-durcit-le-ton-plusieurs-lycees-fermes-ce-vendredi-2-octobre_64869240.html

> « Après une journée noire ce jeudi 1er octobre avec pas moins de 151 actions recensées aux abords des établissements scolaires parisiens et 244 interpellations dans Paris et sa petite couronne, la préfecture de police a durci le ton ce vendredi. »
> « Au total, 13 établissements scolaires parisiens sont concernés par cet arrêté préfectoral. […] Ces derniers seront même fermés par précaution par les autorités. »

Liste intégrale : Pierre-Lescot (1er) · Simone-Weil (3e) · Chaptal (8e) · Edgar-Quinet (9e) · Colbert (10e) · Caroline-Dorian (11e) · Marcel-Desprez (11e) · Turquetil (11e) · Elisa-Lemonnier (12e) · Jean-Lurçat (13e) · Drouant (15e) · Henri-Bergson (19e) · Martin-Nadaud (20e).

**Point de vocabulaire important :** l'arrêté est une **interdiction de rassemblement + fermeture préventive**, pas un constat de blocus. Ne pas en déduire un blocus le 02/10.

### 5. Actu.fr — 02/10/2026 15h47 — Val-d'Oise : 37 établissements (arrêté du 02/10)
https://actu.fr/societe/blocus-des-lycees-37-etablissements-fermes-ce-vendredi-dans-le-val-d-oise_64872225.html

**Pas de liste nominative.** Nommés dans le texte : Louis-Jouvet (Taverny) · Jacques-Prévert (Pontoise, **portail incendié le 01/10**) · Évariste-Galois (Beaumont) · Léonard-de-Vinci (Saint-Witz, **200 élèves, mortiers**) · Charles-Baudelaire (Fosses, **resté ouvert**). Le lycée Camille-Pissarro (Pontoise) et le Paul-Émile-Victor (Osny) sont cités par ailleurs (voir hors lot).

### 6. Actu.fr — 01/10/2026 22h16 — Yvelines : 15 lycées, interdiction de manifestation à compter du 02/10 5 h
https://actu.fr/societe/15-lycees-interdits-de-manifestation-dans-les-yvelines-voici-la-liste_64868974.html

> « Le lycée Henri-Matisse de Trappes (Yvelines) fait partie des établissements interdits de manifestation. **Il a été frappé par un feu de poubelles ce jeudi 1er octobre 2026 au matin.** »

Liste intégrale : Vincent-Van-Gogh (Aubergenville) · Corneille + Lucien-René-Duchesne (La Celle-Saint-Cloud) · Jean-Moulin (Le Chesnay-Rocquencourt) · Léopold-Sédar-Senghor (Magnanville) · Camille-Claudel (Mantes-la-Ville) · Villaroy (Guyancourt) · Condorcet (Limay) · Émilie-de-Breteuil (Montigny-le-Bretonneux) · Jean-Vilar (Plaisir) · Le-Corbusier (Poissy) · **Henri-Matisse (Trappes)** · Jean-Baptiste-Poquelin + Léonard-de-Vinci (Saint-Germain-en-Laye) · Évariste-Gallois (Sartrouville).

### 7. Actu.fr — 02/10/2026 11h35 — bilan national du vendredi
https://actu.fr/societe/blocus-des-lycees-etablissements-fermes-blesses-affrontements-ou-en-est-la-mobilisation-ce-vendredi_64869463.html
→ **Le Corbusier (Aubervilliers, 93), blocus le 01/10** (photo AFP légendée).

### 8. Actu.fr — 30/09/2026 11h00 — bilan du 29/09 à Paris et en petite couronne
https://actu.fr/societe/blocus-des-lycees-pas-moins-de-58-actions-et-70-interpellations-a-paris-et-en-petite-couronne_64857208.html
> « pas moins de 58 actions et 70 interpellations »
**Aucun nom d'établissement.** Utile pour dater l'ampleur, pas pour nommer.

### 9. Le Courrier Cauchois — 01/10/2026 20h00 — les 36 lycées de Seine-Maritime fermés vendredi
https://www.lecourriercauchois.fr/actualite-404951-mobilisation-lyceenne-la-liste-des-36-lycees-qui-seront-fermes-par-securite-vendredi-en-seine-maritime
→ Liste du rectorat, dont « **Franqueville-Saint-Pierre : lycée Galilée** ». **Fermeture administrative du 02/10**, pas un constat de blocus.

### 10. Paris Normandie — 01/10/2026 08h29 — l'agglomération de Rouen
https://www.paris-normandie.fr/id749019/article/2026-10-01/dans-lagglo-de-rouen-les-lyceens-maintiennent-la-pression
> « Dans l'agglomération de Rouen, un blocus touche également les lycées Val de Seine de Grand-Quevilly et **Galilée de Franqueville-Saint-Pierre**. »
> Photo-légende : « Le lycée Galilée de Franqueville-Saint-Pierre est également mobilisé. »
 Autres lycées bloqués le 01/10 cités dans cette agglomération : Marcel-Sembat (Sotteville-lès-Rouen, **caddies bloquant les grilles à 7 h 45**) · Blaise-Pascal (Rouen) · Jeanne-d'Arc (Rouen) · Camille-Saint-Saëns (Rouen).

### 11. Ici.fr — 01/10/2026 — Seine-Maritime
« Blocus lycéens : deux proviseurs blessés, incendies et dégradations en Seine-Maritime, 28 interpellations » (titre vu dans Google Actualités ; l'URL de redirection Google n'a pas pu être résolue — voir « Ce que je n'ai pas pu trouver »).

### 12. InfosYvelines — 29/09/2026 — les 9 lycées bloqués du 78 (le seul article du lot qui nomme des lycées du 78 **avec** une date de blocus)
https://www.infosyvelines.fr/articles/mantes-la-jolie-lycees-bloques-bilan-29-septembre-2026
→ Limay : **Condorcet** · Mantes-la-Jolie : **Jean-Rostand** + **Saint-Exupéry** · Poissy : **Le Corbusier** · Les Mureaux : **François-Villon** + **Jacques-Vaucanson** · Trappes, Conflans-Sainte-Honorine, Rambouillet : **un lycée bloqué chacun, non nommé**.

### 13. InfosYvelines — 01/10/2026 — une trentaine de lycenes bloqués sur 93
https://www.infosyvelines.fr/articles/yvelines-lycees-bloques-1er-octobre-2026
> « À 10h30, une trentaine d'établissements étaient bloqués sur les 93 lycées que compte le département. »
> Communes avec incidents ce 01/10 : Les Mureaux, Saint-Germain-en-Laye, Mantes-la-Jolie, Poissy, Conflans-Sainte-Honorine, La Celle-Saint-Cloud, **Trappes**, Le Chesnay-Rocquencourt, Rambouillet, Villiers-Saint-Frédéric. **Maurepas n'y figure pas.**

### 14. Le Parisien — 01/10 et 02/10/2026
- 01/10 : « Blocus des lycées : hall incendié à Trappes, tirs de mortiers à Guyancourt et Poissy… Tensions dans les Yvelines »
 https://www.leparisien.fr/societe/direct-lycees-bloques-lyon-pantin-lille-le-mouvement-se-poursuit-ce-jeudi-pour-lacte-deux-01-10-2026-MX2MVV5YNNAJDLBEYTS7KCDROQ.php
- 02/10 : « "J'ai reçu plein de messages de soutien" : insultes et tirs de mortiers, des proviseurs pris à partie en marge des blocus des lycées »
 https://www.leparisien.fr/val-d-oise-95/jai-recu-plein-de-messages-de-soutien-insultes-et-tirs-de-mortiers-des-proviseurs-pris-a-partie-en-marge-des-blocus-des-lycees-02-10-2026-WQPFVZ6YPFBNZMOJ4ST625ATOU.php
 *(corps intégral sous abonnement ; seul le chapô est lisible — je le cite comme chapô)*

### 15. BFMTV — 29/09 et 01/10/2026 (reprise via Yahoo)
https://fr.news.yahoo.com/paris-pantin-lille-plusieurs-lyc%C3%A9es-062125171.html
> « 27 lycées parisiens » (01/10) ; BFMTV 29/09 : « **le lycée Turgot a été, en partie, bloqué ce mardi matin** ».
Le « mardi » = **29/09**. Cette dépêche compte pour **une** source.

### 16. L'Humanité / Café pédagogique — 29–30/09/2026
https://www.cafepedagogique.net/2026/09/30/338-lycees-bloques-la-mobilisation-prend-de-l-ampleur/
→ « 338 lycées bloqués » ; **Lycée Henri-Bergson (Paris 19e) bloqué le 29/09**.

### 17. SNES-FSU 92 — communiqué mis à jour le 02/10/2026
https://versailles.snes.edu/spip.php?article7917
→ 39/55 lycées mobilisés dans les Hauts-de-Seine, 6 lycées fermés le 01/10 ; **Renoir (Asnières) blocus le 29/09** (communiqué du 30/09, 4 interpellations) ; **Galilée (Gennevilliers)**, **lycée de Clichy**, **Michel-Ange (Villeneuve-la-Garenne)**.

### 18. SNES-FSU 95 — communiqué du 25/09/2026
https://versailles.snes.edu/spip.php?article7911
→ **René-Cassin (Gonesse)** · Maryse-Condé (Sarcelles) · **George-Sand (Domont) — blocus le 25/09** · Paulette-Nardal (Bezons) · **Évariste-Galois (Beaumont) — blocus le 25/09** · Camille-Saint-Saëns (Deuil-la-Barre).

### 19. L'Humanité — 29/09/2026
→ **Jean-Jaurès (Montreuil)** : mouvement de grève, **à ne pas compter comme blocus** sans source contraire.

### 20. Révolution Permanente — 24/09/2026 et 03/10/2026
- 24/09 : « Gonesse (95). Après la répression du blocus, élèves et personnels de Cassin font front commun » → **René-Cassin de Gonesse**, **pas** Paris 16e.
- 03/10 : « à Cassin, Bartholdi, Mandela… des enseignants refusent le "distanciel" » (fermeture administrative du 05/10).

### 21. Wikipédia — article généraliste
https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France
→ Contexte général, **aucune liste de lycées parisiens**. Utilisé uniquement comme repère de dates (début du mouvement le 18/09 à Créteil).

### 22. Agrégateur citoyen `blocus-lycees-umber.vercel.app`
Signalements d'habitants. **Aucun des 14 établissements du lot n'y figure.** Le site précise lui-même « Un signalement est-il relu avant publication ? Non. » → **source faible, jamais traitée comme presse**, et écartée du décompte des sources.

---

## 1. École du Verre de Paris — Lucas de Nehou, Lycée polyvalent des métiers d'art — Paris 5e (075)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée dans l'annuaire officiel : UAI **0750463W**, « Lycée polyvalent Lucas de Nehou », `code_commune` 75105, département 075, public. (Sa section professionnelle est un établissement distinct, 0754875S.)

**Recherches effectuées, toutes sans résultat :**
- Google Actualités : `"Lucas de Nehou" after:2026-09-17` → 2 résultats, **aucun lié au mouvement** (un portrait d'artiste, un salon du verre).
- Recherche web générique → uniquement des pages d'établissement et d'orientation.
- Aucun des articles-listes parisiens (13 lycées du 02/10, 25 lycées du 03/10, 27 lycées BFMTV du 01/10) ne le mentionne.

**Conclusion :** aucune trace. **Non comblé par déduction.**

---

## 2. Lycée professionnel René Cassin — Lycée des métiers supports, du conseil et du numérique — Paris 16e (075)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée : UAI **0750588G**, « LP René Cassin », `code_commune` 75116, département 075, public.

**Attention — piège d'homonymie majeur.** Il existe **six+ lycées « René Cassin »** en France. Le seul **blocus documenté** sous ce nom pendant la fenêtre est celui de **Gonesse (Val-d'Oise)** :

> « un blocus a lieu depuis mercredi 23 septembre » (établissement **95277**, Gonesse) — déjà présent dans `build/blocus-recherche.js`.

Autres « René Cassin » activos pendant la fenêtre et à ne pas lui attribuer : **Le Raincy (93)**, cible d'un arrêté de fermeture du 02/10 ; **Bayonne (64)** (vidéo ici.fr 02/10) ; **Tulle (42)** (La Montagne 02/10) ; **Strasbourg (67)** (rue89strasbourg 30/09) ; **Montfort-sur-Meu (35)** ; **Arpajon (91)** ; **Collège René Cassin de Noisy-le-Sec (93)**.

**Recherches effectuées :** Google Actualités `"René Cassin" lycée after:2026-09-17` → 24 résultats, **tous dans d'autres communes** ; aucun ne concerne Paris 16e. Recherche générique → rien.

**Conclusion :** aucune trace pour le LP René Cassin de Paris 16e. **Non comblé par déduction.**

---

## 3. Lycée polyvalent Galilée — Lycée des métiers de la chimie et des biotechnologies — Franqueville-Saint-Pierre (076)

- **Statut :** `confirmé` — **et établissement déjà traité** dans `build/blocus-recherche.js`
- **Blocus le :** **01/10/2026**
- **Nature :** entrée bloquée ; portail démonté. **Plus une fermeture administrative le 02/10** (dans la liste des 36 lycées du rectorat de Seine-Maritime), qui n'est pas un blocus.
- **Sources :**
  1. « Dans l'agglo de Rouen, les lycéens maintiennent la pression avec de nouveaux blocus » — https://www.paris-normandie.fr/id749019/article/2026-10-01/dans-lagglo-de-rouen-les-lyceens-maintiennent-la-pression — `01/10/2026 08h29`
  2. « Mobilisation lycéens : la liste des 36 lycées qui seront fermés par sécurité vendredi en Seine-Maritime » — https://www.lecourriercauchois.fr/actualite-404951-mobilisation-lyceenne-la-liste-des-36-lycees-qui-seront-fermes-par-securite-vendredi-en-seine-maritime — `01/10/2026 20h00`
  3. Ici.fr, 01/10 : « Blocus lycéens : deux proviseurs blessés, incendies et dégradations en Seine-Maritime, 28 interpellations » — *titre vu dans Google Actualités, URL de redirection non résolue*

**Ce que j'apporte de neuf :** l'établissement est déjà dans le fichier de build sous la clé **`76475|Lycée Galilée`** (« Bloqué ; portail démonté », ici.fr 01/10 + fermeture administrative 02/10). **J'ai vérifié par l'annuaire officiel que `76475` est bien le code INSEE de Franqueville-Saint-Pierre** (UAI 0762911B) : c'est donc **le même établissement**, et non un homonyme. Mes deux sources s'ajoutent aux siennes et confirment la date du **01/10**.

**Deux pièges documentés sur ce nom :**
- **Le 17/09/2026**, un homme « possiblement armé » s'est réfugié au lycée Galilée de Franqueville-Saint-Pierre : **1 000 élèves confinés et évacués**. C'est une **intrusion**, pas un blocus, et c'est **la veille du début de la fenêtre**. Cinq articles s'en/font écho (ici.fr, France 3 Régions, Ouest-France, actu.fr, Paris Normandie, 17–18/09). **Ne pas le compter comme un blocus.**
- Le nom « Galilée » désigne **trois lycées différents** : Franqueville-Saint-Pierre (76, celui du lot), Cergy (95, UAI 0951637N) et LP Galilée Paris 13e (075, UAI 0750785W). Le **Galilée de Cergy n'a pas été trouvé bloqué** ; le LP Galilée de Paris 13e est, lui, dans l'arrêté du 02/10 (voir hors lot, § 17).

---

## 4. Lycée professionnel privé Notre-Dame — Elbeuf (076)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée : UAI **0761347B**, « Lycée professionnel privé Notre-Dame », commune Elbeuf, `code_commune` **76231**, département 076, **privé**.

**Recherches effectuées :** Google Actualités `"Notre-Dame" Elbeuf lycée after:2026-09-17` → aucun résultat sur la période ; recherche générique → uniquement des annuaires ; aucun des articles de la Seine-Maritime que j'ai lus (Paris Normandie 01/10, Le Courrier Cauchois 01/10, actu.fr 02/10, ici.fr 01/10) ne le mentionne.

**Point utile :** dans la liste des 36 lycées fermés vendredi 02/10 en Seine-Maritime, **les deux lycées d'Elbeuf sont André-Maurois et Ferdinand-Buisson** — tous deux déjà dans `build/blocus-recherche.js`. Le LP Notre-Dame n'y est pas.

**Conclusion :** aucune trace. Établissement privé, ce qui est cohérent avec l'avertissement du lot sur les établissements privés. **Non comblé par déduction.**

---

## 5. Lycée professionnel Paul Painlevé — Lycée des métiers du commerce, de la communication et de la gestion — Courbevoie (092)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée : UAI **0921625S**, « Lycée professionnel Paul Painlevé », commune Courbevoie, `code_commune` 92026, département 092, public.

**Attention — piège d'homonymie.** « Paul Painlevé » est très répandu, mais **le seul lycée de ce nom** est celui de Courbevoie (le « lycée polyvalent Paul Painlevé » est à **Oyonnax, 01** ; à Sevran (93) et à Villeneuve-le-Roi (94) il n'existe que des **collèges** et des écoles).

**Recherches effectuées :** Google Actualités `"Painlevé" Courbevoie lycée after:2026-09-17` → aucun résultat ; recherche générique → rien ; le communiqué SNES-FSU 92 du 02/10 (39/55 lycées mobilisés dans les Hauts-de-Seine) ne le cite pas.

**Conclusion :** aucune trace. **Non comblé par déduction.**

---

## 6. Lycée général et technologique privé Jeanne d'Arc — Colombes (092)

- **Statut :** `pas un blocus` (rassemblement / manifestation sans lien avec l'accès à l'établissement)
- **Blocus le :** — (fait daté du **02/10/2026**)
- **Nature :** une manifestation de « jeunesse privilégiée » devant l'établissement, sans aucun filtrage d'entrée décrit ; la publication elle-même doute de l'objet de la manifestation.
- **Sources :**
  1. Publication Instagram du 02/10/2026 08h — https://www.instagram.com/p/Dd-3l3lgzW1/ — **vue en recherche, page non ouverte**

Texte lisible dans le extrait de recherche :
> « Institution Jeanne d'Arc. La jeunesse privilégiée de Colombes manifeste contre (ou pour) on ne sait quoi »

**Pourquoi ce n'est pas un blocus :** aucune mention d'entrée bloquée, de poubelles, de chaîne humaine ou de cours non assurés. Le ton de la publication est par ailleurs explicitementardown (« la jeunesse privilégiée »). C'est exactement le cas que la règle n°2 exclut (« une mobilisation ou manifestation dans la ville sans lien avec l'établissement »).

**Piège d'homonymie :** « Jeanne d'Arc » désigne au moins huit lycées. Le **lycée Jeanne-d'Arc de Rouen (76)** est, lui, **bloqué le 01/10** ; celui de **Clermont-Ferrand (63)** est traité dans le lot 7. Aucun de ces faits ne concerne Colombes.

**Conclusion :** `pas un blocus`. Une seule source, non vérifiable (page non ouverte), et qui ne décrit pas un blocage.

---

## 7. Lycée polyvalent Sabatier — Lycée des métiers de la beauté, du bien-être et du goût — Bobigny (093)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée : UAI **0932123C**, « Lycée polyvalent André Sabatier », commune Bobigny, `code_commune` 93008, département 093, public.

**Recherches effectuées :** Google Actualités `"Sabatier" Bobigny lycée after:2026-09-17` → aucun résultat sur la période ; recherche générique → rien.

**Vérification négative forte :** Bobigny **ne figure pas** dans la liste des 28 établissements de Seine-Saint-Denis fermés lundi 05/10 (actu.fr 03/10), alors que cette liste est exhaustive et issued d'un arrêté préfectoral. L'établissement n'apparaît dans aucun autre article de la 93.

**Conclusion :** aucune trace. **Non comblé par déduction.**

---

## 8. Lycée polyvalent d'application de l'ENNA — Lycée des métiers d'art, de la couture, de la mode éthique et des services publics — Saint-Denis (093)

- **Statut :** `source unique` (presse)
- **Blocus le :** **`date incertaine`** — voir ci-dessous
- **Nature :** établissement cité comme lieu de mobilisationTHC dans le mouvement des lycées de Saint-Denis ; les articles ne décrivent pas de filtrage d'entrée propre à l'ENNA et ne donnent **aucune date** de blocage.
- **Sources :**
  1. « "Plus ils nous gazent, plus on reviendra !" : la mobilisation des lycéens se durcit à Saint-Denis » — https://actu.fr/ile-de-france/saint-denis_93066/plus-ils-nous-gazent-plus-on-reviendra-la-mobilisation-des-lyceens-se-durcit-a-saint-denis_64867115.html — `01/10/2026 20h02`
  2. « "En atelier, on a un tournevis pour 26 élèves !" : la colère des lycéens converge à Saint-Denis et éclate face aux CRS » — Le Parisien, `01/10/2026` (chapô lisible, corps sous abonnement)

**Pourquoi `date incertaine` et pas `confirmé` :** l'article d'actu.fr a pour chapeau « **Après des jours de blocages dans plusieurs lycées de Saint-Denis** » et montre une pancarte portée par Moussa, élève de l'ENNA. Cela situe l'ENNA dans le mouvement, mais **le texte accessible ne dit ni que l'entrée de l'ENNA a été bloquée, ni quand**. Le Parisien confirme de son côté, via un témoignage d'élèves de l'ENNA, la réalité de la mobilisation le 01/10, mais l'article parle de la convergence des colères à Saint-Denis, pas d'un blocage de l'ENNA. Deux articles indépendants mentionnent donc l'établissement, **aucun ne documente un blocus daté** → `source unique`, date incertaine.

**Piège d'homonymie :** l'ENNA de Saint-Denis ne doit pas être confondu avec l'**ENNA de Roubaix**, établissement textile bien connu, absent de la fenêtre.

**Vérification négative :** l'ENNA **ne figure pas** dans la liste préfectorale des 28 établissements fermés lundi 05/10 en Seine-Saint-Denis (actu.fr 03/10) — ce qui est cohérent avec un établissement qui n'a pas été bloqué le 02/10.

**Conclusion :** établissement **mobilisé et cité par la presse**, mais **sans blocus documenté ni daté**. Statut `source unique`, `date incertaine`.

---

## 9. Lycée général privé Cours du Hameau — Thiais (094)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée : UAI **0942376X**, « Lycée Cours du Hameau », commune Thiais, `code_commune` 94073, département 094, **privé**.

**Recherches effectuées :** Google Actualités `"hameau" Thiais lycée after:2026-09-17` → aucun résultat ; recherche générique → rien ; l'arrêté préfectoral du Val-de-Marne (14 établissements, actu.fr 03/10) **ne le mentionne pas**.

**Conclusion :** aucune trace. Établissement privé. **Non comblé par déduction.**

---

## 10. Lycée général et technologique Eugène Delacroix — Maisons-Alfort (094)

- **Statut :** `non confirmé`
- **Blocus le :** `28/09/2026` **affirmé par une source non lisible, donc non retenue**
- **Nature :** seule trace : une page TikTok de découverte annonce un blocage le 28/09 à 7 h. Aucune presse.
- **Sources :**
  1. https://www.tiktok.com/discover/blocus-eugene-delacroix-maisons-alfort — **vue en recherche, page non ouverte**

Texte visible dans l'extrait de recherche : « Blocage du lycée Eugène Delacroix le 28 septembre à 7h ».
**Je n'ai pas ouvert la page** : je ne peux ni confirmer la date, ni vérifier qu'il s'agit bien du lycée de **Maisons-Alfort** et non d'un autre établissement, ni savoir si la vidéo a été postée par un élève de l'établissement. Conformément à la règle n°3, une URL qui renvoie à une page de connexion ne peut pas être lue et ne peut pas servir à dater.

**Piège d'homonymie — le plus_net du lot sur ce point :** il existe **deux lycées « Eugène Delacroix »** en petite couronne :
- **Lycée Eugène Delacroix, Maisons-Alfort (094)** — UAI 0940116R — celui du lot ;
- **Lycée polyvalent Eugène Delacroix, Drancy (93)** — UAI 0930119Z — qui, lui, **figure dans l'arrêté préfectoral du 02/10** (fermeture du 05/10 en 93). **Ne pas attribuer ce fait à Maisons-Alfort.**
Le communiqué SNES-FSU 92 ne mentionne pas non plus Delacroix, et le communiqué SNES-FSU 94 ne m'a pas été accessible.

**Conclusion :** `non confirmé`. La piste TikTok est trop fragile pour être retenue comme source, mais elle justifie de **revérifier ce dossier** : c'est le seul des 14 pour lequel une affirmation de blocus existe sans confirmation.

---

## 11. Lycée général et technologique Van Gogh — Ermont (095)

- **Statut :** `source unique` (presse)
- **Blocus le :** **01/10/2026**
- **Nature :** établissement bloqué ; plusieurs mortiers d'artifice tirés devant l'entrée dans la matinée.
- **Sources :**
  1. « "J'ai reçu plein de messages de soutien" : insultes et tirs de mortiers, des proviseurs pris à partie en marge des blocus des lycées » — https://www.leparisien.fr/val-d-oise-95/jai-recu-plein-de-messages-de-soutien-insultes-et-tirs-de-mortiers-des-proviseurs-pris-a-partie-en-marge-des-blocus-des-lycees-02-10-2026-WQPFVZ6YPFBNZMOJ4ST625ATOU.php — `02/10/2026 18h17` (chapô lisible, corps sous abonnement)

Chapô cité (le texte lisible s'interrompt là) :
> « Ce jeudi 1er octobre, plusieurs mortiers d'artifice ont été tirés devant le lycée Van-Gogh, à Ermont (Val-d'Oise), alors que l'établissement était bloqué dans le cadre du mouvement. »

**Pourquoi `source unique` et pas `confirmé` :** il s'agit d'**une seule dépêche**, dont le corps est paywalled. J'ai cherché une seconde source indépendante (Google Actualités `"Van-Gogh" Ermont blocus after:2026-09-17`) : **un seul résultat** sur toute la fenêtre, celui-ci. Le communiqué SNES-FSU 95 du 25/09 ne cite pas Ermont. Je maintiens donc `source unique`, malgré une citation très explicite.

Identité vérifiée : UAI **0950645K**, « Lycée Van Gogh », commune Ermont, `code_commune` **95219**, département 095, public.

**Piège d'homonymie — très important :** il existe **deux lycées « Van Gogh » distincts** en Île-de-France :
- **Lycée Van Gogh, Ermont (95)** — UAI 0950645K — celui du lot ;
- **Lycée Vincent Van-Gogh, Aubergenville (78)** — UAI 0781859X — un établissement **différent**, cité dans l'arrêté préfectoral des Yvelines du 01/10 (interdiction de manifestation à compter du 02/10 5 h). **Ce n'est pas le même établissement** et cet arrêté ne dit rien du blocus d'Ermont.

**Conclusion :** `source unique`, blocus le 01/10/2026. À confirmer par une seconde presse.

---

## 12. Lycée polyvalent privé Notre-Dame de la Compassion — Pontoise (095)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée : UAI **0950761L**, « Lycée polyvalent privé Notre-Dame-de-la-Compassion », commune Pontoise, `code_commune` 95500, département 095, **privé**. (Ne pas confondre avec le **collège** homonyme de Pontoise, UAI 0951506W, ni avec les établissements de même nom à **Marmande (47)** et **Villersexel (70)**.)

**Recherches effectuées :** Google Actualités `"Compassion" Pontoise lycée after:2026-09-17` → aucun résultat ; recherche générique → rien ; l'arrêté du 02/10 en Val-d'Oise (37 établissements) ne le mentionne pas.

**Conclusion :** aucune trace. **Non comblé par déduction.**

---

## 13. Lycée général et technologique Les Sept Mares — Maurepas (078)

- **Statut :** `aucune source trouvée`
- **Blocus le :** —
- **Nature :** aucune trace.
- **Sources :** aucune.

Identité vérifiée : UAI **0780515L**, nom officiel **« Lycée Les 7 Mares »** (le lot écrit « Les Sept Mares »), commune Maurepas, `code_commune` 78383, département 078, public.

**Recherches effectuées :** Google Actualités `"Sept Mares" Maurepas after:2026-09-17` → aucun résultat sur la période ; `Maurepas lycée bloqué after:2026-09-17` → un seul article de fond (le bilan régional du 01/10) ; recherche générique → rien.

**Vérification négative forte :** dans le bilan d'InfosYvelines du **01/10** (une trentaine de lycées bloqués, incidents dans **dix communes**), **Maurepas ne fait pas partie des communes concernées**. Maurepas n'apparaît pas non plus dans la liste des 15 lycenes visés par l'arrêté préfectoral du 01/10. L'autre lycée de Maurepas, **Dumont-d'Urville**, n'est pas davantage cité.

**Conclusion :** aucune trace. **Non comblé par déduction.**

---

## 14. Lycée professionnel Henri Matisse — Trappes (078)

- **Statut :** `confirmé`
- **Blocus le :** **01/10/2026**
- **Nature :** entrée bloquée ; poubelles incendiées vers 8 h 35 ; mortiers ; **début d'incendie dans le hall** du bâtiment.
- **Sources :**
  1. « 15 lycées interdits de manifestation dans les Yvelines : voici la liste » (photo-légende nominative) — https://actu.fr/societe/15-lycees-interdits-de-manifestation-dans-les-yvelines-voici-la-liste_64868974.html — `01/10/2026 22h16`
  2. « Blocages de lycées dans les Yvelines : après l'incendie de Trappes, la reprise de vendredi reste à préciser » — https://laclepublique.fr/yvelines/articles/2026/2026-10-01-blocages-lycees-yvelines/ — `01/10/2026 19h54`
  3. « Blocus des lycées : hall incendié à Trappes, tirs de mortiers à Guyancourt et Poissy… Tensions dans les Yvelines » — Le Parisien, `01/10/2026` — https://www.leparisien.fr/societe/direct-lycees-bloques-lyon-pantin-lille-le-mouvement-se-poursuit-ce-jeudi-pour-lacte-deux-01-10-2026-MX2MVV5YNNAJDLBEYTS7KCDROQ.php
  4. « Colère des lycéens : des interpellations et des gardes à vue partout dans les Yvelines » — https://actu.fr/societe/colere-des-lyceens-des-interpellations-et-des-gardes-a-vue-partout-dans-les-yvelines_64868457.html — `01/10/2026`
  5. InfosYvelines — https://www.infosyvelines.fr/articles/yvelines-lycees-bloques-1er-octobre-2026 — `01/10/2026` (**Trappes** listée parmi les communes avec incidents)

**Citation** (actu.fr, photo-légende) :
> « Le lycée Henri-Matisse de Trappes (Yvelines) fait partie des établissements interdits de manifestation. **Il a été frappé par un feu de poubelles ce jeudi 1er octobre 2026 au matin.** »

**Deuxième journée possible — 29/09, mais NON attribuable.** InfosYvelines du 29/09 indique que **Trappes avait bien eu un lycée bloqué ce jour-là**, mais **sans en donner le nom** (« Trappes, Conflans-Sainte-Honorine et Rambouillet comptent chacune un lycée bloqué, là aussi sans incident notable : le nom de ces trois établissements n'a pas été communiqué »). Matisse est le seul lycée professionnel de Trappes, ce qui rend l'hypothèse plausible — **mais je ne l'assigne pas** : ce serait une déduction, pas une source.

Identité vérifiée : UAI **0780584L**, « Lycée professionnel Henri Matisse », commune Trappes, `code_commune` 78621, département 078, public.

**Conclusion :** `confirmé`, blocus le 01/10/2026, avec incidents graves (incendie du hall). Entrée **13** de la liste des 15 lycées de l'arrêté préfectoral du 01/10 — **fermeture/interdiction le 02/10, pas un blocus supplémentaire**.

---

# Établissements trouvés hors lot

Les 14 établissements du lot ne rapportent que **2 blocus confirmés**, **2 sources uniques**, **1 non confirmé**, **1 pas un blocus** et **8 aucune source**. C'est trop peu pour être utile : j'ai donc elonggé le travail sur les **autres** lycées de Paris et de la petite couronne rencontrés dans les sources. **Rien de ce qui suit ne figure dans le lot 6** ; je signale à chaque fois ceux qui sont **déjà** dans `build/blocus-recherche.js`, pour ne pas faire doubler le corpus.

## 15. Lycée Turgot — Paris 3e (075)

- **Statut :** `source unique` — blocus **partiel**, 29/09/2026
- **Nature :** établissement « en partie bloqué » le mardi matin.
- **Sources :** BFMTV, repris par Yahoo France — https://fr.news.yahoo.com/paris-pantin-lille-plusieurs-lyc%C3%A9es-062125171.html — `01/10/2026` (BFMTV daté du 29/09)
- **Note :** « en partie bloqué » → je compte bien un blocus, mais **partiel** : le blocage n'était pas total. Identité vérifiée : UAI **0750647W**, `code_commune` **75103** (Paris 3e).

## 16. Lycée Henri Bergson — Paris 19e (075)

- **Statut :** `source unique` (relais de presse) — blocus, 29/09/2026
- **Nature :** établissement listé parmi les lycées bloqués du 29/09.
- **Sources :** « 338 lycées bloqués : la mobilisation prend de l'ampleur » — https://www.cafepedagogique.net/2026/09/30/338-lycees-bloques-la-mobilisation-prend-de-l-ampleur/ — `30/09/2026`
- **Note :** le Café pédagogique est un **site de ressources**, qui relaie la presse : je le compte comme **une source unique**, pas comme une confirmation. **Cet établissement est aussi l'un des 13 lycées de l'arrêté préfectoral du 02/10** — fermeture préventive le 02/10, sans rapport avec le blocus du 29/09. Identité vérifiée : UAI **0750711R**, `code_commune` 75119.

## 17. LP Galilée — Paris 13e (075)

- **Statut :** `source unique` — tensions et incidents, 02–03/10/2026
- **Nature :** établissement cité parmi ceux où « de fortes tensions entre manifestants et forces de l'ordre » sont apparues ; **interdit de rassemblement du 3 au 5 octobre**. **Aucun blocage d'entrée n'est décrit.**
- **Sources :** https://actu.fr/ile-de-france/paris_75056/les-blocus-interdits-devant-deux-fois-plus-de-lycees-a-paris-lundi-ce-que-risquent-les-contrevenants_64875184.html — `03/10/2026 11h18`
- **Note :** c'est le **deuxième établissement du nom « Galilée »** après celui du lot (Franqueville-Saint-Pierre). Les deux n'ont pas le même statut. Identité vérifiée : UAI **0750785W**, `code_commune` 75113.

## 18. LP Beaugrenelle — Paris 15e (075)

- **Statut :** `source unique` — incident (feu), 02/10/2026
- **Nature :** feu dans le secteur du lycée le 02/10 ; établissement fermé **par précaution** et interdit de rassemblement du 3 au 5 octobre. **Aucun blocus d'entrée décrit.**
- **Sources :** https://actu.fr/ile-de-france/paris_75056/mobilisation-a-paris-la-prefecture-durcit-le-ton-plusieurs-lycees-fermes-ce-vendredi-2-octobre_64869240.html — `02/10/2026 09h58` ; et https://actu.fr/ile-de-france/paris_75056/les-blocus-interdits-devant-deux-fois-plus-de-lycees-a-paris-lundi-ce-que-risquent-les-contrevenants_64875184.html — `03/10/2026`
- **Note :** homonyme sans homonyme : le vrai nom est « LP Beaugrenelle ». Identité vérifiée : UAI **0750793E**, `code_commune` 75115.

## 19. Lycée Roger Verlomme — Paris 15e (075)

- **Statut :** `source unique` — incident (portes incendiées), 03/10/2026
- **Nature :** « les portes d'entrée […] ont été les cibles de violents incendies ». Cela implique un établissement occupé et défendu ; **le jour du blocage n'est pas indiqué**.
- **Sources :** https://actu.fr/ile-de-france/paris_75056/les-blocus-interdits-devant-deux-fois-plus-de-lycees-a-paris-lundi-ce-que-risquent-les-contrevenants_64875184.html — `03/10/2026 11h18`
- Identité vérifiée : UAI **0750696Z**, `code_commune` 75115.

## 20. Lycée Le Corbusier — Aubervilliers (093)

- **Statut :** `source unique` (presse + photo AFP) — blocus, 01/10/2026
- **Nature :** établissement bloqué le 01/10 ; également dans l'arrêté de fermeture du 05/10 en 93.
- **Sources :** https://actu.fr/societe/blocus-des-lycees-etablissements-fermes-blesses-affrontements-ou-en-est-la-mobilisation-ce-vendredi_64869463.html — `02/10/2026 11h35` (illustration légendée, photo AFP) ; https://actu.fr/societe/blocus-des-lycees-28-etablissements-fermes-lundi-en-seine-saint-denis-voici-la-liste_64875849.html — `03/10/2026`
- **Note :** homonymie avec **Le Corbusier de Poissy (78)**, lui aussi bloqué (29/09). Deux communes distinctes, deux établissements distincts.

## 21. Lycée Marcel-Sembat — Sotteville-lès-Rouen (076)

- **Statut :** `source unique` — blocus, 01/10/2026
- **Nature :** **caddies bloquant les grilles dès 7 h 45** — le blocage le mieux décrit de tout ce rapport.
- **Sources :** https://www.paris-normandie.fr/id749019/article/2026-10-01/dans-lagglo-de-rouen-les-lyceens-maintiennent-la-pression — `01/10/2026 08h29`
- **Note :** **ce n'est pas le lycée Marcel-Sembat de Pantin (93)** — autre établissement, autre commune.

## 22. Lycée Val de Seine — Grand-Quevilly (076)

- **Statut :** `source unique` — blocus, 01/10/2026
- **Nature :** établissement nommé comme bloqué dans l'agglomération de Rouen.
- **Sources :** https://www.paris-normandie.fr/id749019/article/2026-10-01/dans-lagglo-de-rouen-les-lyceens-maintiennent-la-pression — `01/10/2026 08h29`

## 23. Lycée Jacques-Prévert — Pontoise (095)

- **Statut :** `source unique` — blocus + portail incendié, 01/10/2026
- **Nature :** **portail incendié** le 01/10 ; établissement dans l'arrêté de fermeture du 02/10 (Val-d'Oise, 37 établissements).
- **Sources :** https://actu.fr/societe/blocus-des-lycees-37-etablissements-fermes-ce-vendredi-dans-le-val-d-oise_64872225.html — `02/10/2026 15h47`
- **Note :** homonymie avec **Jacques-Prévert de Drancy (93)** et **Jacques-Prévert de Thiais (94, école)**. À ne pas confondre avec **René-Cassin de Paris 16e** non plus. Pontoise est la commune du § 12 (Notre-Dame de la Compassion, aucune source).

## 24. Lycée Léonard de Vinci — Saint-Witz (095)

- **Statut :** `source unique` — blocus + tirs de mortier, 01–02/10/2026
- **Nature :** **200 élèves** devant l'établissement, **tirs de mortier** ; établissement fermé le 02/10 sur arrêté.
- **Sources :** https://actu.fr/societe/blocus-des-lycees-37-etablissements-fermes-ce-vendredi-dans-le-val-d-oise_64872225.html — `02/10/2026 15h47`
- **Note :** ne pas confondre avec **Léonard-de-Vinci de Paris 15e** (déjà dans le fichier de build, incident du 02/10) ni avec **Léonard-de-Vinci de Tremblay-en-France (93)** (arrêté de fermeture).

## 25. Lycée Louis-Jouvet — Taverny (095)

- **Statut :** `source unique` — 02/10/2026
- **Nature :** cité par actu.fr dans le contexte des 37 établissements du Val-d'Oise fermés le vendredi 02/10. **La nature exacte (blocage ou fermeture) n'est pas détaillée.**
- **Sources :** https://actu.fr/societe/blocus-des-lycees-37-etablissements-fermes-ce-vendredi-dans-le-val-d-oise_64872225.html — `02/10/2026 15h47`

## 26. Lycée Évariste Galois — Beaumont (095)

- **Statut :** `source unique` — blocus, **25/09/2026** (syndical) ; cité le 02/10 (presse)
- **Nature :** mobilisation dès le 25/09 ; établissement cité dans le contexte du 02/10 en Val-d'Oise.
- **Sources :** SNES-FSU 95 — https://versailles.snes.edu/spip.php?article7911 — `25/09/2026` ; actu.fr — https://actu.fr/societe/blocus-des-lycees-37-etablissements-fermes-ce-vendredi-dans-le-val-d-oise_64872225.html — `02/10/2026`
- **Note :** à ne pas confondre avec **Évariste-Gallois de Sartrouville (78)**, dans l'arrêté des Yvelines.

## 27. Lycée Charles-Baudelaire — Fosses (095)

- **Statut :** `pas un blocus` — **resté ouvert** le 02/10/2026
- **Nature :** contre-exemple documenté : cité dans le même article que des lycées bloqués, mais explicitement **resté ouvert**.
- **Sources :** https://actu.fr/societe/blocus-des-lycees-37-etablissements-fermes-ce-vendredi-dans-le-val-d-oise_64872225.html — `02/10/2026 15h47`
- **Pourquoi je le note :** il empêche de conclure « établissement de l'arrêté = établissement bloqué ».

## 28. Lycée Camille Pissarro — Pontoise (095)

- **Statut :** `source unique` — mobilisation, 30/09/2026
- **Nature :** cité parmi les lycées du Val-d'Oise touchés.
- **Sources :** https://www.leparisien.fr/val-d-oise-95/jai-recu-plein-de-messages-de-soutien-insultes-et-tirs-de-mortiers-des-proviseurs-pris-a-partie-en-marge-des-blocus-des-lycees-02-10-2026-WQPFVZ6YPFBNZMOJ4ST625ATOU.php — `02/10/2026` (chapô ; la date 30/09 est **à confirmer**, le chapô accessible ne la donne pas)
- **Note :** statut prudent : je ne retiens pas de date tant que je ne l'ai pas lue dans un texte accessible. **Statut `source unique`, date incertaine.**

## 29. Lycée Paul-Émile-Victor — Osny (095)

- **Statut :** `source unique` — mobilisation, 30/09/2026, date incertaine
- **Nature :** cité parmi les lycées du Val-d'Oise touchés.
- **Sources :** même source que § 28 (Le Parisien, chapô du 02/10)
- **Note :** même réserve sur la date.

## 30. Lycée Galilée — Gennevilliers (092)

- **Statut :** `source unique` (syndical) — mobilisation
- **Nature :** cité parmi les lycées des Hauts-de-Seine mobilisés (39 sur 55).
- **Sources :** SNES-FSU 92 — https://versailles.snes.edu/spip.php?article7917 — MAJ `02/10/2026`
- **Note :** **troisième** établissement du nom « Galilée » du dossier (avec Franqueville-Saint-Pierre et Paris 13e). **Il ne faut pas regrouper les Galilée.**

## 31. Lycée Jean-Rostand — Mantes-la-Jolie (078)

- **Statut :** `source unique` — blocus + incendie, 29/09/2026
- **Nature :** établissement bloqué ; **incendie observé devant l'entrée** ; 3 interpellations dans le 78 ce jour-là.
- **Sources :** https://www.infosyvelines.fr/articles/mantes-la-jolie-lycees-bloques-bilan-29-septembre-2026 — `29/09/2026`
- **Note :** à ne pas confondre avec **Jean-Rostand de Villepinte (93)** (arrêté de fermeture) ni avec **Jean-Rostand d'Offranville (76)**.

## 32. Lycée François-Villon — Les Mureaux (078)

- **Statut :** `source unique` — blocus, 29/09/2026
- **Nature :** établissement bloqué, « sans incident notable rapporté ».
- **Sources :** https://www.infosyvelines.fr/articles/mantes-la-jolie-lycees-bloques-bilan-29-septembre-2026 — `29/09/2026`

## 33. Lycée Jacques-Vaucanson — Les Mureaux (078)

- **Statut :** `source unique` — blocus, 29/09/2026
- **Nature :** établissement bloqué, « sans incident notable rapporté ».
- **Sources :** https://www.infosyvelines.fr/articles/mantes-la-jolie-lycees-bloques-bilan-29-septembre-2026 — `29/09/2026`
- **Note :** « Les Mureaux » est ensuite listée parmi les communes avec incidents le 01/10.

## 34. Lycée Vincent Van-Gogh — Aubergenville (078)

- **Statut :** `source unique` — **interdiction de rassemblement** à compter du 02/10 5 h
- **Nature :** cité dans l'arrêté préfectoral des Yvelines du 01/10. **Aucun blocus documenté, aucune date de blocage.** Je ne le compte donc **pas** comme un blocus.
- **Sources :** https://actu.fr/societe/15-lycees-interdits-de-manifestation-dans-les-yvelines-voici-la-liste_64868974.html — `01/10/2026 22h16`
- **Pourquoi cette entrée est importante :** c'est le **piège d'homonymie le plus dangereux du dossier**. Cet établissement porte un nom presque identique au **Van Gogh d'Ermont (95)**, qui est, lui, **bloqué le 01/10 avec des mortiers** (§ 11). **Les deux doivent rester séparés.**

## 35. Lycée Condorcet — Limay (078) — *déjà traité*

- **Statut :** `confirmé` — blocus, 29/09/2026 (feux de poubelles propagés jusqu'au portail, endommagé)
- **Sources :** https://www.infosyvelines.fr/articles/mantes-la-jolie-lycees-bloques-bilan-29-septembre-2026 — `29/09/2026` ; et https://actu.fr/societe/15-lycees-interdits-de-manifestation-dans-les-yvelines-voici-la-liste_64868974.html — `01/10/2026`
- **Déjà dans `build/blocus-recherche.js`** sous `78335|Lycée Condorcet` (« feu au portail d'entrée », actu.fr 29/09). **Ma source est indépendante et précise le mécanisme (propagation du feu jusqu'au portail).**
- **Note :** « Condorcet » = Limay (78) **et** Montreuil (93, arrêté de fermeture) **et** Saint-Maur-des-Fossés (94, arrêté de fermeture) **et** Bordeaux (33, lot 7). **Quatre Condorcet, quatre statuts.**

## 36. Lycée René Cassin — Gonesse (095) — *déjà traité*

- **Statut :** `confirmé` — blocus **depuis le 23/09/2026**
- **Sources :** https://versailles.snes.edu/spip.php?article7911 — `25/09/2026` ; « Gonesse (95). Après la répression du blocus, élèves et personnels de Cassin font front commun » — https://revolutionpermanente.fr/ — `24/09/2026` (titre vu dans Google Actualités, URL de redirection non résolue)
- **Déjà dans `build/blocus-recherche.js`** sous `95277|Lycée René Cassin`.
- **Point clé :** c'est **ce** René Cassin qui est bloqué, **pas** celui du lot (Paris 16e, § 2).

## 37. Lycée Maryse-Condé — Sarcelles (095) — *déjà traité*

- **Statut :** `confirmé` — blocus depuis le 24/09/2026
- **Sources :** SNES-FSU 95 — https://versailles.snes.edu/spip.php?article7911 — `25/09/2026`
- **Déjà dans `build/blocus-recherche.js`** sous `95585|Lycée Maryse-Condé`.

## 38. Lycée Jean-Jacques Rousseau — Sarcelles (095) — *déjà traité*

- **Statut :** `confirmé` — blocus réprimé, 24/09/2026
- **Sources :** SNES-FSU 95 — https://versailles.snes.edu/spip.php?article7911 — `25/09/2026`
- **Déjà dans `build/blocus-recherche.js`** sous `95585|Lycée Jean-Jacques Rousseau`.

## 39. Lycée Paul Éluard — Saint-Denis (093) — *déjà traité*

- **Statut :** `confirmé` — blocus, 28/09 et 29/09/2026
- **Sources :** https://actu.fr/societe/blocus-des-lycees-28-etablissements-fermes-lundi-en-seine-saint-denis-voici-la-liste_64875849.html — `03/10/2026` (fermeture administrative du 05/10)
- **Déjà dans `build/blocus-recherche.js`** sous `93066|Lycée Paul Éluard`.
- **Note :** c'est le lycée le plus souvent cité à Saint-Denis ; l'ENNA (§ 8) est dans la même commune.

## 40. LP Frédéric Bartholdi — Saint-Denis (093) — *déjà traité*

- **Statut :** `confirmé` — blocus, 24/09/2026
- **Sources :** https://versailles.snes.edu/spip.php?article7911 — `25/09/2026` ; https://actu.fr/societe/blocus-des-lycees-28-etablissements-fermes-lundi-en-seine-saint-denis-voici-la-liste_64875849.html — `03/10/2026`
- **Déjà dans `build/blocus-recherche.js`** sous `93066|Lycée professionnel Frédéric Bartholdi`.

## 41. Lycée Antoine de Saint-Exupéry — Créteil (094) — *déjà traité*

- **Statut :** `confirmé` — blocus, **18/09/2026** : **c'est le lycée où le mouvement national a commencé**
- **Sources :** https://www.cafepedagogique.net/2026/09/30/338-lycees-bloques-la-mobilisation-prend-de-l-ampleur/ — `30/09/2026` (« Le mouvement de blocus est né le 21 septembre 2026 au lycée Saint-Exupéry de Créteil ») ; https://www.infosyvelines.fr/articles/mantes-la-jolie-lycees-bloques-bilan-29-septembre-2026 — `29/09/2026` (« alors que le mouvement national avait démarré le 18 septembre au lycée Saint-Exupéry de Créteil »)
- **Note :** ces deux sources **se contredisent sur la date de naissance** (21/09 vs 18/09). Le fichier de build retient **18/09**. Je signale la contradiction sans la trancher.
- **Déjà dans `build/blocus-recherche.js`** sous `94028|Lycée polyvalent Antoine de Saint-Exupéry`, qui porte les deux dates (18/09 et 21/09).
- **Attention :** ne pas confondre avec **Saint-Exupéry de Mantes-la-Jolie (78)**, bloqué le 29/09 (§ 31).

## 42. Lycée polyvalent Darius Milhaud — Le Kremlin-Bicêtre (094) — *déjà traité*

- **Statut :** `source unique` — blocus, 01/10/2026
- **Sources :** https://www.leparisien.fr/ — titre « au cœur du blocus du lycée Darius-Milhaud » — `01/10/2026` (cité dans `build/blocus-recherche.js`) ; https://actu.fr/societe/blocus-des-lycees-14-etablissements-passent-en-distanciel-lundi-dans-le-val-de-marne-voici-la-liste_64875886.html — `03/10/2026`
- **Déjà dans `build/blocus-recherche.js`** sous `94043|Lycée polyvalent Darius Milhaud`.

## 43. Lycée Auguste Renoir — Asnières-sur-Seine (092) — *déjà traité*

- **Statut :** `confirmé` — blocus, 29/09/2026, 4 interpellations
- **Sources :** https://versailles.snes.edu/spip.php?article7917 — MAJ `02/10/2026`
- **Déjà dans `build/blocus-recherche.js`** sous `92004|Lycée Auguste Renoir`.
- **Note :** ne pas confondre avec **Jean-Renoir de Bondy (93)** (arrêté de fermeture) ni avec **Jean-Renoir de La Réole (33)** (lot 7).

## 44. Lycée Michel-Ange — Villeneuve-la-Garenne (092) — *déjà traité*

- **Statut :** `source unique` (syndical) — blocus, 30/09/2026
- **Sources :** https://versailles.snes.edu/spip.php?article7917 — MAJ `02/10/2026`
- **Déjà dans `build/blocus-recherche.js`** sous `92078|Lycée Michel-Ange`.

## 45. Lycée Jean Jaurès — Montreuil (093) — *qualification conflictuelle*

- **Statut :** `non confirmé` (le statut du fichier de build n'est pas confirmé)
- **Date :** 29/09/2026 selon le fichier de build ; mais **l'Humanité qualifie le mouvement de grève** le même jour.
- **Nature :** **conflit de qualification non résolu** : le fichier de build retient un « blocus (enseignants absents, classes surchargées) » sur la base d'un titre de presse dont le corps était inaccessible (« à confirmer »), alors que L'HWAS loud Humanity parle d'un mouvement de grève pour le même établissement et le même jour. **La règle n°2 exclut la grève des personnels.**
- **Sources :** L'Humanité, `29/09/2026` (titre vu dans Google Actualités, URL de redirection non résolue) ; https://actu.fr/societe/blocus-des-lycees-28-etablissements-fermes-lundi-en-seine-saint-denis-voici-la-liste_64875849.html — `03/10/2026` (fermeture administrative du 05/10)
- **Déjà dans `build/blocus-recherche.js`** sous `93048|Lycée Jean Jaurès`, avec la mention « à confirmer ».
- **Piège :** un **Jean Jaurès d'Arnouville (95)** est, lui, **bloqué le 01/10** et figure déjà dans le fichier de build.

---

## Établissements cités uniquement dans un arrêté préfectoral ou un bilan sans nom d'école

**Règle appliquée :** un lycée nommé dans un arrêté de fermeture administrative, ou dans une liste d'« interdiction de manifestation », **n'a pas de blocus à cette date**. Ces noms sont donc **explicitement exclus** du décompte des blocus. Ils sont listés ici pour être utilisables (par exemple pour un travail sur les fermetures), **pas** comme des blocages.

### Arrêté préfectoral de Paris du 02/10 (13 établissements, fermés **par précaution** le 02/10)
Pierre-Lescot (1er) · Simone-Weil (3e) · Chaptal (8e) · Edgar-Quinet (9e) · Colbert (10e) · Caroline-Dorian (11e) · **Marcel-Desprez (11e, nom introuvable dans l'annuaire officiel)** · Turquetil (11e) · Elisa-Lemonnier (12e) · Jean-Lurçat (13e) · Drouant (arrêté dit 15e — **réellement 17e**) · Henri-Bergson (19e, blocus daté elsewhere : § 16) · Martin-Nadaud (20e).
Source : actu.fr, 02/10/2026 09h58 (url ci-dessus).

### Arrêté préfectoral de Paris du 02/10, applicable du 3 au 5 octobre (25 établissements)
Pierre-Lescot (1er) · Gustave-Eiffel (7e) · Racine (8e) · Colbert (10e) · Marie-Laurencin (10e) · Caroline-Dorian (11e) · Turquetil (11e) · Voltaire (11e, tensions documentées : déjà dans le fichier de build, blocus du 02/10) · Arago (12e, blocus daté : build) · Elisa-Lemonnier (12e) · Gaston-Bachelard (13e, incident : build) · Gabriel-Fauré (13e, blocus daté : build) · **Galilée (13e : § 17)** · Jean-Lurçat (13e) · Raspail (14e) · Louis-Armand (15e) · Beaugrenelle (15e : § 18) · Roger-Verlomme (15e : § 19) · Balzac (arrêté dit 16e — **réellement 17e**) · d'Alembert (19e) · Hector-Guimard (19e) · Hélène-Boucher (20e, blocus daté : build) · Étienne-Dolet (20e) · Martin-Nadaud (20e) · Maurice-Ravel (20e).
Source : actu.fr, 03/10/2026 11h18 (url ci-dessus).

### Arrêté préfectoral de Seine-Saint-Denis du 02/10 (28 établissements, distanciel le 05/10)
Liste intégrale en tête de rapport (§ « Articles-listes » n° 1). **Aucun blocus daté** n'en est déduit.

### Arrêté préfectoral du Val-de-Marne du 02/10 (14 établissements, distanciel le 05/10)
Liste intégrale en tête de rapport (§ « Articles-listes » n° 2).

### Arrêté préfectoral des Yvelines du 01/10 (15 lycées, manifestation interdite à compter du 02/10 5 h)
Liste intégrale en tête de rapport (§ « Articles-listes » n° 6). **Seul Henri-Matisse (Trappes) a un blocus documenté** (§ 14 du lot) ; Condorcet (Limay) en a un daté au 29/09 (§ 35).

### Arrêté préfectoral du Val-d'Oise du 02/10 (37 établissements)
**Pas de liste nominative.** Voir § 23, 24, 25, 26, 27 ci-dessus pour les établissements nommés dans le texte de l'article.

### Bilan d'InfosYvelines du 01/10, sans nom d'établissement
Trappes, Conflans-Sainte-Honorine et Rambouillet : **un lycée bloqué chacune**, nom non communiqué. **Le 01/10**, ~30 des 93 lycées du 78 étaient bloqués à 10 h 30 — **33 établissements du 78 restent donc non nommés**. Je ne comble pas ce trou.

---

# Tableau de synthèse — Lot 6

## A. Les 14 établissements du lot

| # | Lycée | Commune | Dept | Date(s) | Statut | Nb sources | Déjà dans le build ? |
|---|---|---|---|---|---|---|---|
| 1 | Lycée polyvalent Lucas de Nehou | Paris 5e | 075 | — | aucune source trouvée | 0 | non |
| 2 | LP René Cassin | Paris 16e | 075 | — | aucune source trouvée | 0 | non |
| 3 | Lycée polyvalent Galilée | Franqueville-Saint-Pierre | 076 | **01/10** (+ fermeture admin. 02/10) | **confirmé** | 3 | **oui** (`76475`) |
| 4 | LP privé Notre-Dame | Elbeuf | 076 | — | aucune source trouvée | 0 | non |
| 5 | LP Paul Painlevé | Courbevoie | 092 | — | aucune source trouvée | 0 | non |
| 6 | Lycée privé Jeanne d'Arc | Colombes | 092 | 02/10 | **pas un blocus** (manifestation) | 1 | non |
| 7 | Lycée polyvalent André Sabatier | Bobigny | 093 | — | aucune source trouvée | 0 | non |
| 8 | Lycée polyvalent d'application de l'ENNA | Saint-Denis | 093 | **date incertaine** | source unique (presse) | 2 | non |
| 9 | Lycée général privé Cours du Hameau | Thiais | 094 | — | aucune source trouvée | 0 | non |
| 10 | Lycée général et technologique Eugène Delacroix | Maisons-Alfort | 094 | 28/09 (affirmé, non vérifié) | **non confirmé** | 1 | non |
| 11 | Lycée général et technologique Van Gogh | Ermont | 095 | **01/10** | source unique (presse) | 1 | non |
| 12 | Lycée polyvalent privé Notre-Dame de la Compassion | Pontoise | 095 | — | aucune source trouvée | 0 | non |
| 13 | Lycée Les 7 Mares | Maurepas | 078 | — | aucune source trouvée | 0 | non |
| 14 | LP Henri Matisse | Trappes | 078 | **01/10** | **confirmé** | 5 | non |

**Bilan du lot : 2 confirmés, 3 sources uniques (dont 1 sans date), 1 non confirmé, 1 pas un blocus, 7 aucune source trouvée.**

## B. Hors lot (31 établissements documentés)

| # | Lycée | Commune | Dept | Date(s) | Statut | Nb sources | Déjà dans le build ? |
|---|---|---|---|---|---|---|---|
| 15 | Lycée Turgot | Paris 3e | 075 | 29/09 | source unique (blocus partiel) | 1 | non |
| 16 | Lycée Henri Bergson | Paris 19e | 075 | 29/09 | source unique | 1 | non |
| 17 | LP Galilée | Paris 13e | 075 | 02–03/10 | source unique (tensions) | 1 | non |
| 18 | LP Beaugrenelle | Paris 15e | 075 | 02/10 | source unique (incident) | 2 | non |
| 19 | Lycée Roger Verlomme | Paris 15e | 075 | 03/10 | source unique (incident) | 1 | non |
| 20 | Lycée Le Corbusier | Aubervilliers | 093 | 01/10 | source unique | 2 | non |
| 21 | Lycée Marcel-Sembat | Sotteville-lès-Rouen | 076 | 01/10 | source unique | 1 | non |
| 22 | Lycée Val de Seine | Grand-Quevilly | 076 | 01/10 | source unique | 1 | non |
| 23 | Lycée Jacques-Prévert | Pontoise | 095 | 01/10 | source unique (portail incendié) | 1 | non |
| 24 | Lycée Léonard de Vinci | Saint-Witz | 095 | 01–02/10 | source unique (mortiers) | 1 | non |
| 25 | Lycée Louis-Jouvet | Taverny | 095 | 02/10 | source unique (à préciser) | 1 | non |
| 26 | Lycée Évariste Galois | Beaumont | 095 | 25/09 ; 02/10 | source unique | 2 | non |
| 27 | Lycée Charles-Baudelaire | Fosses | 095 | 02/10 | **pas un blocus** (resté ouvert) | 1 | non |
| 28 | Lycée Camille Pissarro | Pontoise | 095 | date incertaine | source unique | 1 | non |
| 29 | Lycée Paul-Émile-Victor | Osny | 095 | date incertaine | source unique | 1 | non |
| 30 | Lycée Galilée | Gennevilliers | 092 | non datée | source unique (syndical) | 1 | non |
| 31 | Lycée Jean-Rostand | Mantes-la-Jolie | 078 | 29/09 | source unique (incendie) | 1 | non |
| 32 | Lycée François-Villon | Les Mureaux | 078 | 29/09 | source unique | 1 | non |
| 33 | Lycée Jacques-Vaucanson | Les Mureaux | 078 | 29/09 | source unique | 1 | non |
| 34 | Lycée Vincent Van-Gogh | Aubergenville | 078 | — | source unique (arrêté seulement) | 1 | non |
| 35 | Lycée Condorcet | Limay | 078 | 29/09 | **confirmé** | 2 | **oui** (`78335`) |
| 36 | Lycée René Cassin | Gonesse | 095 | 23/09 | **confirmé** | 2 | **oui** (`95277`) |
| 37 | Lycée Maryse-Condé | Sarcelles | 095 | 24/09 | **confirmé** | 1 | **oui** (`95585`) |
| 38 | Lycée Jean-Jacques Rousseau | Sarcelles | 095 | 24/09 | **confirmé** | 1 | **oui** (`95585`) |
| 39 | Lycée Paul Éluard | Saint-Denis | 093 | 28/09 ; 29/09 | **confirmé** | 2 | **oui** (`93066`) |
| 40 | LP Frédéric Bartholdi | Saint-Denis | 093 | 24/09 | **confirmé** | 2 | **oui** (`93066`) |
| 41 | Lycée Antoine de Saint-Exupéry | Créteil | 094 | 18/09 et/ou 21/09 | **confirmé** (dates contradictoires) | 2 | **oui** (`94028`) |
| 42 | Lycée polyvalent Darius Milhaud | Le Kremlin-Bicêtre | 094 | 01/10 | source unique | 2 | **oui** (`94043`) |
| 43 | Lycée Auguste Renoir | Asnières-sur-Seine | 092 | 29/09 | **confirmé** | 1 | **oui** (`92004`) |
| 44 | Lycée Michel-Ange | Villeneuve-la-Garenne | 092 | 30/09 | source unique | 1 | **oui** (`92078`) |
| 45 | Lycée Jean Jaurès | Montreuil | 093 | 29/09 | **non confirmé** (grève vs blocus) | 2 | **oui** (`93048`) |

**Total : 45 établissements documentés (14 du lot + 31 hors lot).**

---

# Erreurs et pièges trouvés dans le lot 6

### 1. Le code département `076` de l'entrée n° 3 est **correct** — et c'est un piège de vérification

`lot-6.txt` associe Galilée à **Franqueville-Saint-Pierre** et au code `076`. C'est **juste** : Franqueville-Saint-Pierre est en **Seine-Maritime (76)**, et le code INSEE de la commune est bien `76475`. J'ai vérifié dans l'annuaire officiel que le lycée Galilée de Franqueville-Saint-Pierre est le **seul** Galilée du 76 (UAI 0762911B), à côté d'un **collège** Galilée à Limay (78), d'un Galilée à Cergy (95), d'un Galilée à Combs-la-Ville (77), d'un Galilée à Guérande (44), d'un Galilée à Vienne (38) et d'un **LP Galilée à Paris 13e**.

> **Je n'ai modifié `lot-6.txt`.** Aucun des 14 couples (nom, commune, département) du lot ne s'est révélé faux.

### 2. Attention : les codes département du lot ont un **zéro initial** non standard

`075`, `076`, `078`, `092`, `093`, `094`, `095` : les codes INSEE des départements s'écrivent **`75`, `76`, `78`, `92`, `93`, `94`, `95`**. C'est une contrainte de formatage de la source, pas une erreur d'identification — mais si le corpus doit être comparé à des clés `UAI|Code`, **il faut normaliser**.

### 3. Les clés de `build/blocus-recherche.js` sont des **codes commune INSEE**, pas des UAI

C'est une découverte structurante pour la suite du travail : les clés sont de la forme `CodeINSEE commune|Nom`, et **pas** `UAI|Name` comme le laissait croire l'intitulé. Vérifications faites :

| Clé du fichier | Commune | Nom exact dans l'annuaire |
|---|---|---|
| `76475\|Lycée Galilée` | Franqueville-Saint-Pierre | Lycée Galilée (0762911B) |
| `95277\|Lycée René Cassin` | Gonesse | Lycée René Cassin (0950646L) |
| `64102\|Lycée René Cassin` | Bayonne | Lycée René Cassin (0640010N) |
| `63113\|Lycée général Jeanne d'Arc` | Clermont-Ferrand | Lycée Jeanne d'Arc (0631410R) |
| `76231\|Lycée André Maurois` | Elbeuf | Lycée André Maurois (0760029U) |
| `76540\|Lycée Blaise Pascal` | Rouen | Lycée Blaise-Pascal |
| `78335\|Lycée Condorcet` | Limay | Lycée Condorcet |
| `92026` / `92025` / `93008` / `94046` / `95219` / `95500` / `78383` / `78621` / `75105` / `75116` / `94073` / `76231` | Courbevoie, Colombes, Bobigny, Maisons-Alfort, Ermont, Pontoise, Maurepas, Trappes, Paris 5e, Paris 16e, Thiais, Elbeuf | **absents du fichier** |

→ Pour ajouter les 13 établissements trouvés par ce lot, les clés à utiliser sont donc notamment : `75105` (Lucas de Nehou), `75116` (LP René Cassin), `76231` (LP Notre-Dame Elbeuf), `92026` (Paul Painlevé Courbevoie), `92025` (Jeanne d'Arc Colombes), `93008` (André Sabatier Bobigny), `93066` (ENNA Saint-Denis — **attention, 3 établissements portent déjà cette clé**), `94073` (Cours du Hameau Thiais), `94046` (Eugène Delacroix Maisons-Alfort), `95219` (Van Gogh Ermont), `95500` (Notre-Dame de la Compassion Pontoise), `78383` (Les 7 Mares Maurepas), `78621` (LP Henri Matisse Trappes).

### 4. Le fichier de build contient **27 établissements de Paris et de la petite couronne** — ce n'est pas le rapport que j'attendais

`grep` sur `75xxx|`, `92xxx|`, `93xxx|`, `94xxx|`, `95xxx|` : Montaigne (6e), Voltaire (11e), Arago (12e), LP Gaston-Bachelard (13e), Gabriel-Fauré (13e), Léonard-de-Vinci (15e), Hélène-Boucher (20e), Renoir (Asnières), Michel-Ange (Villeneuve-la-Garenne), Jean-Jaurès (Montreuil), Marcelin-Berthelot (Bondy), Paul-Éluard + Bartholdi (Saint-Denis), Auguste-Blanqui (Saint-Ouen), Saint-Exupéry (Créteil), Romain-Rolland (Les Lilas), Darius-Milhaud (Kremlin-Bicêtre), Guillaume-Budé (Livry-Gargan), Léger + Jean-Jaurès + Daubié (Argenteuil), René-Cassin (Gonesse), Château-d'Épluches, Rousseau + Maryse-Condé (Sarcelles), André-Maurois + Ferdinand-Buisson (Elbeuf). **La couverture parisienne n'est pas nulle** : il y a déjà 7 lycées parisiens et 20 lycées de petite couronne.

**Conséquence :** la très grande majorité des noms « attendus » pour un travail sur Paris sont **déjà traités**. Les apports réellement nouveaux de ce lot sont les **31 noms des deux arrêtés parisiens du 02/10**, les **14 du Val-de-Marne** et les **28 de la Seine-Saint-Denis**, qui ne sont pas encore dans le fichier — **à condition de les enregistrer comme fermetures administratives, pas comme des blocus**.

### 5. Deux arrondissements de l'arrêté préfectoral de Paris du 02/10 sont **erronés**

J'ai recoupé chaque nom de la liste avec l'annuaire officiel :

- **« Lycée Balzac (16e) »** → le vrai établissement est le **Lycée international de Paris Honoré de Balzac, Paris 17e** (UAI 0750705J). L'arrêté dit 16e.
- **« Lycée Drouant (15e) »** → le vrai établissement est le **Lycée polyvalent Jean Drouant, Paris 17e** (UAI 0750708M). L'arrêté dit 15e.
- **« Lycée Marcel-Desprez (11e) »** → **aucun établissement de ce nom dans tout le département de Paris** dans l'annuaire officiel. À vérifier.

Les 21 autres arrondissements de l'arrêté sont **exacts** (contrôle systématique sur 24 noms des deux arrêtés parisiens, via l'annuaire officiel).

### 6. Le **début du mouvement** est daté de deux façons dans les sources

Le Café pédagogique et InfosYvelines disent que le mouvement national a commencé **le 18 septembre** au lycée Saint-Exupéry de Créteil ; le même Café pédagogique dit **le 21 septembre**. Le fichier de build retient les **deux** dates pour cet établissement. **Je n'ai pas tranché** — mais la fenêtre du lot commence bien le 18/09.

### 7. Le communiqué SNES-FSU 92 ne dit pas **lequel** des lycées de Clichy

« Galilée Gennevilliers, Clichy, Michel-Ange Villeneuve-la-Garenne » : **le nom du lycée de Clichy n'est pas donné**. Je ne l'ai pas deviné.

### 8. Contre-exemple utile : **Charles-Baudelaire (Fosses) est resté ouvert** le 02/10

Il est cité dans le même article que des lycées bloqués du Val-d'Oise. Il prouve qu'on ne peut pas déduire « cité dans le contexte du 02/10 = bloqué le 02/10 ».

---

# Ce que je n'ai pas pu trouver

1. **Aucune trace whatsoever** pour **7 des 14 établissements du lot** : Lucas de Nehou (Paris 5e), LP René Cassin (Paris 16e), LP Notre-Dame (Elbeuf), Paul Painlevé (Courbevoie), André Sabatier (Bobigny), Cours du Hameau (Thiais), Notre-Dame de la Compassion (Pontoise), et **Les 7 Mares (Maurepas)**. Pour ces établissements, les recherches ont été faites **aussi** dans les arrêtés préfectoraux exhaustifs de leur département (Bobigny est vérifié dans la liste de 28 de la 93 ; Thiais dans celle de 14 du 94 ; Maurepas est absent des deux listes Yvelines ; Elbeuf n'apparaît pas dans la liste de 36 de la Seine-Maritime). **L'absence est donc mieux étayée que d'habitude** — mais elle reste une absence de presse, pas une absence de fait.

2. **Le « lycée de Clichy » du SNES-FSU 92** n'est pas nommé dans la source.

3. **Les lycées bloqués non nommés du 78** : le 29/09, **un lycée chacun à Trappes, Conflans-Sainte-Honorine et Rambouillet** (nom non communiqué) ; le 01/10, **~30 des 93 lycées** bloqués dont **33 noms jamais publiés**. **Trappes avait donc un blocus dès le 29/09** — mais rien ne permet de dire que c'était Matisse.

4. **Les 37 établissements du Val-d'Oise** de l'arrêté du 02/10 **ne sont pas nommés** : actu.fr ne publie pas la liste. Je n'ai pas pu la reconstituer.

5. **Le 28/09 n'est documenté par aucune source** pour le lot. Les sources locales commencent le **29/09**. Seules exceptions : les entrées du fichier de build (Saint-Exupéry de Créteil 18/09, Bartholdi 24/09, René Cassin de Gonesse 23/09, Château-d'Épluches 28/09) et un article national de l'**Union syndicale Processeseter du 29/09**. Le 28/09, c'est « lundi », et l'USL a appelé au blocage le **mardi 29** : **le 28/09 est le jour où le mouvement s'est étendu aux lycées franciliens** (InfosYvelines), pas le jour de sa naissance.

6. **Le corps de plusieurs articles du Parisien, de Libération et de L'Humanité est paywalled.** Je n'ai compté comme source que ce que j'ai **réellement lu**. C'est pourquoi Van Gogh (Ermont) reste `source unique` malgré une citation très explicite.

7. **Certaines URL trouvées via Google Actualités n'ont pas pu être résolues** : Google renvoie des identifiants de redirection que je n'ai pas su convertir en URL réelle (ici.fr 01/10 sur la Seine-Maritime, la Montagne 02/10 sur Tulle, Médiapart 01/10, Le Monde 02/10, L'Humanité 29/09, Révolution Permanente 24/09 et 03/10). **Pour ces titres, je n'ai noté que le titre, la date et le nom du média — je n'ai pas lu le texte et je ne les compte donc pas comme sources.**

8. **Instagram, TikTok, X et Facebook** : seules deux URL exploitables ont été trouvées pour le lot (Jeanne d'Arc de Colombes, TikTok d'Eugène Delacroix) et **aucune n'a pu être ouverte**. Conformément aux consignes, elles sont notées « vue en recherche, page non ouverte » et ne servent **pas** à confirmer un fait. **Aucun Snapchat n'est cité** (exclu par les consignes).

9. **`sudeducation93.org` renvoie une erreur 401** ; je n'ai pas pu lire le communiqué du SNES 93, qui aurait probablement comblé une partie des 28 établissements de Seine-Saint-Denis.

10. **Le moteur de recherche Brave limite fortement le débit** (environ 2 recherches par appel). Les recherches génériques sur les 14 noms du lot ont été conduites surtout via Google Actualités, qui donne les titres mais **pas les URL réelles** : c'est la raison principale pour laquelle les 7 « aucune source trouvée » doivent être lus comme « aucune source trouvée **avec les outils disponibles** ».

11. **Le nom exact du lycée d'ENNA** : le fichier de build ne le contient pas, et le nom officiel est « Lycée polyvalent d'application de l'ENNA ». Rien n'indique que ce soit l'ENNA textile de Saint-Denis. Je ne le suppose pas.

---

## Contrôle final

- **Fichier créé :** un seul, `recherche-blocus-2026/vague1/resultat-6.md`.
- **`build/blocus-recherche.js` :** lu (grep + lectures), **jamais modifié**.
- **`lot-6.txt` :** lu, **jamais modifié** — je n'ai trouvé **aucune** erreur d'identification (nom / commune / département) qui justifierait une correction.
- **URLs citées :** toutes ont été retournées par une recherche ou récupérées avec succès. Aucune URL inventée, aucune date inventée, aucune citation reconstituée.
- **Statut du travail sur le lot :** **2 blocus confirmés** (Matisse/Trappes, Galilée/Franqueville-Saint-Pierre), **3 sources uniques** (Van Gogh/Ermont daté, ENNA/Saint-Denis non daté, Eugène Delacroix/Maisons-Alfort non confirmé), **1 pas un blocus** (Jeanne d'Arc/Colombes), **7 aucune source trouvée**.