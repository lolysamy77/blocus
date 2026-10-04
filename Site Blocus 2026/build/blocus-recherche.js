/* Les blocus relevés sur le terrain — fichier généré.
 * Sources : recherche-blocus-2026/blocus-lycees-2026.json
 *           blocus_lycees_colleges_france_2026.txt (rapport du 3 octobre)
 * Régénérer : node build/import-blocus.js
 *
 * Les deux sources sont fusionnées établissement par établissement et jour
 * par jour : une même ligne racontée deux fois n'en fait qu'une, qui garde le
 * lien de presse de la recherche et la citation du rapport.
 *
 * 877 relevés, 838 rattachés à un établissement,
 * 649 établissements, 39 à relire
 * (voir build/blocus-a-relire.txt).
 *
 * 1 jour écarté à la main :
 *   2026-10-05  Lycée général et technologique Gerville Réache — la presse ne signale qu'un rassemblement, pas un blocus
 *
 * Champs : n = le blocus, j = le jour, z = les dates, l = le lien de presse,
 * p = d'où vient la ligne et avec quelle certitude, q = la citation de la
 * source, m = les médias cités quand il n'y a pas de lien.
 *
 * Ne pas modifier ce fichier : pour ajouter un blocus à la main, c'est
 * build/blocus.js. Les deux sont lus par la page : les relevés comme les
 * relevés. */
window.BLOCUS = window.BLOCUS || {};

window.BLOCUS["02408|Lycée Paul Claudel"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« le lycée Claudel de nouveau bloqué ce jeudi »", m: "lunion.fr, 01/10" }
];

window.BLOCUS["02691|Lycée Condorcet"] = [
  { n: "Blocus (Blocage des accès)", j: "29/09", z: "2026-09-29", p: "presse", q: "« les accès du lycée Condorcet ont été bloqués dès les premières heures de la journée »", m: "actu.fr, 29/09" }
];

window.BLOCUS["02691|Lycée professionnel Colard Noël"] = [
  { n: "Blocus (Grilles fermées)", j: "29/09", z: "2026-09-29", p: "presse", q: "« les grilles de l'établissement ont été fermées »", m: "actu.fr, 29/09" }
];

window.BLOCUS["02722|Lycée Gérard de Nerval"] = [
  { n: "Blocus (Ras-le-bol)", j: "30/09", z: "2026-09-30", p: "presse", q: "« au lycée Nerval à Soissons, un blocus des lycéens » (titre)", m: "lunion.fr, 30/09" }
];

window.BLOCUS["02722|Lycée polyvalent Léonard de Vinci"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« le blocus des lycéens se transforme en confrontation avec les forces de l'ordre »", m: "lunion.fr, 01/10" }
];

window.BLOCUS["03185|Lycée général Madame de Staël"] = [
  { n: "Blocus (Locaux, effectifs)", j: "01/10", z: "2026-10-01", p: "presse", q: "« les élèves ont barré l'accès réservé aux professeurs et l'entrée piétonne, drapeaux à la main… entre 250 et 300 »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["04070|Lycée Alexandra David-Néel"] = [
  { n: "Blocus (Moyens, profs non remplacés)", j: "01/10", z: "2026-10-01", p: "presse", q: "« Les lycéens ont bloqué l'accès aux lycées dignois durant la matinée » (8 h – 11 h)", m: "hauteprovenceinfo.com, 01/10" }
];

window.BLOCUS["04070|Lycée professionnel Alphonse Beau de Rochas"] = [
  { n: "Blocus (Moyens, profs non remplacés)", j: "01/10", z: "2026-10-01", p: "presse", q: "« 400 élèves des lycées David Neel et Beau de Rochas se sont rassemblés pour bloquer les établissements »", m: "hauteprovenceinfo.com, 01/10" }
];

window.BLOCUS["04112|Lycée Félix Esclangon"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« On a organisé un blocus devant le lycée Félix-Esclangon ce matin vers 8 heures » (témoignage élève)", m: "laprovence.com, 01/10" }
];

window.BLOCUS["05179|Lycée professionnel Pierre Mendès-France"] = [
  { n: "Blocus (Conditions d internat, restauration, surcharge des classes)", j: "01/10", z: "2026-10-01", p: "presse", q: "« une centaine d'éléves [.] ont bloqué l'établissement à partir de 8 h » ; titre : « Un blocus au lycée professionnel de Veynes : « C'est le seul moyen de se faire entendre ! » ; selon le témoignage de SELENA, 16 ans : « Le blocus, c'est le seul moyen de se faire entendre ! » ; poubelle incendiée sur le parking, un mineur interpellé ; la gendarmerie est intervenue", m: "ledauphine.com, 01/10 (article OUVERT) ATTENTION homonymie : ne pas confondre avec le lycée Pierre-Mendés-France d'Autun (71) ni d'Albi (81)" }
];

window.BLOCUS["06004|Lycée Jacques Audiberti"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« le blocus initialement installé devant le lycée Jacques-Audiberti » ; environ 600 élèves dès 7 h 30", m: "nicematin.com, 01/10" }
];

window.BLOCUS["06004|Lycée Léonard de Vinci"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Jacques-Dolle, Jacques-Audiberti, Léonard-de-Vinci. Trois lycées d'Antibes, tous entravés »", m: "nicematin.com, 01/10" }
];

window.BLOCUS["06004|Lycée professionnel Jacques Dolle"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Un blocus s'est tenu ce mercredi 30 septembre devant le lycée professionnel Jacques Dolle »", m: "france3cotedazur.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« ont bloqué l'accès au lycée Dolle » (élèves de terminale et de première, 10 h 37)", m: "nicematin.com, 01/10" }
];

window.BLOCUS["06027|Lycée Auguste Renoir"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nicematin.com/societe/education/blocage-des-lycees-un-vendredi-sous-haute-tension-syndicats-et-lyceens-recus-par-le-ministre-10732083", p: "à confirmer" }
];

window.BLOCUS["06069|Lycée Alexis de Tocqueville"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« le lycée régional Alexis de Tocqueville de Grasse reste bloqué » depuis 7 h 30, environ 150 élèves", m: "nicematin.com, 01/10" }
];

window.BLOCUS["06069|Lycée professionnel Francis de Croisset"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« lycée Francis de Croisset à Grasse » (parmi les établissements bloqués)", m: "rcf.fr, 30/09" }
];

window.BLOCUS["06083|Lycée Pierre et Marie Curie"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« lycée Curie à Menton » (parmi les établissements bloqués)", m: "rcf.fr, 30/09" },
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.facebook.com/france3provencealpes/posts/1569598021870169/", p: "à confirmer (réseaux sociaux)" }
];

window.BLOCUS["06088|Lycée Albert Calmette"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« Dès mardi, nous avons participé au blocage » ; assis devant la porte d'entrée", m: "actu.fr, 29/09" }
];

window.BLOCUS["06088|Lycée du Parc Impérial"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "Titre : « Blocage, dégagement de fumée, interpellation… au lycée du Parc Impérial, ce mardi matin »", m: "nicematin.com, 29/09" },
  { n: "Tentative de blocus", j: "30/09", z: "2026-09-30", p: "presse", q: "Maire de Nice : « tentative de blocage » — TENTATIVE", m: "rcf.fr ; lefigaro.fr, 30/09" }
];

window.BLOCUS["06088|Lycée Honoré d'Estienne d'Orves"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "Légende : « Blocus au lycée Estienne-d'Orves à Nice lundi 28 septembre 2026 au matin »", m: "franceinfo.fr (légende), 29/09" },
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« le lycée d'Estienne-d'Orves de nouveau bloqué ce matin »", m: "bfmtv.com, 30/09" }
];

window.BLOCUS["06088|Lycée Mélinée et Missak Manouchian"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Blocus à Nice : feux de poubelle […] devant le lycée Manouchian »", m: "nicematin.com, 01/10" }
];

window.BLOCUS["06088|Lycée professionnel Magnan"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« plusieurs établissements bloqués à Nice (Palais Impérial et Magnan) »", m: "rcf.fr, 30/09" }
];

window.BLOCUS["07010|Lycée agrotechnologique privé d'Annonay"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Plusieurs établissements scolaires ardéchois ont été la cible de blocages jeudi 1er octobre. Les lycées d'Aubenas, du Teil, du Cheylard, de Privas, de Tournon-sur-Rhône et d'Annonay ont tous été concernés » + « À Privas, devant le lycée Vincent d'Indy »", m: "hebdo-ardeche.fr, 01/10" }
];

window.BLOCUS["07019|Lycée polyvalent Astier"] = [
  { n: "Blocus (Bâtiment, classes)", j: "02/10", z: "2026-10-02", p: "presse", q: "« Dès 7 h 30, ils étaient une centaine du lycée Astier à bloquer l'entrée de leur établissement »", m: "ledauphine.com, 02/10" }
];

window.BLOCUS["07064|Lycée polyvalent du Cheylard"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Plusieurs établissements scolaires ardéchois ont été la cible de blocages jeudi 1er octobre. Les lycées d'Aubenas, du Teil, du Cheylard, de Privas, de Tournon-sur-Rhône et d'Annonay ont tous été concernés »", m: "hebdo-ardeche.fr, 01/10" }
];

window.BLOCUS["07186|Lycée polyvalent Vincent d'Indy"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Plusieurs établissements scolaires ardéchois ont été la cible de blocages jeudi 1er octobre. Les lycées d'Aubenas, du Teil, du Cheylard, de Privas, de Tournon-sur-Rhône et d'Annonay ont tous été concernés » + « À Privas, devant le lycée Vincent d'Indy »", m: "hebdo-ardeche.fr, 01/10" }
];

window.BLOCUS["09194|Cité scolaire de Mirepoix - lycée polyvalent"] = [
  { n: "Blocus (Tenues vestimentaires imposées par le…)", j: "01/10", z: "2026-10-01", p: "presse", q: "«Devant la cité scolaire de Mirepoix, en Ariége, les lycéens ont mené un blocus plutôt pacifiste ce jeudi 1er octobre 2026. Il y avait bien quelques barriéres, plots de chantier ou palettes en bois » — FILTRANT : «Une entrée a méme été libérée pour permettre aux collégiens et professeurs d" }
];

window.BLOCUS["10387|Lycée Polyvalent Les Lombards"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« près de 300 élèves ont choisi de bloquer leur établissement » ; « barrages filtrants à l'entrée »", m: "canal32.fr, 29/09" }
];

window.BLOCUS["10387|Lycée Polyvalent Marie de Champagne"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« Des élèves ont pu entrer au sein du lycée à 7 h 45, puis le lycée a fermé ses grilles, plus personne ne pouvant ni entrer, ni sortir. » — accès totalement empêché", m: "lest-eclair.fr, 01/10/2026 — ARTICULE NON OUVERT (HTTP 403 / Akamai) ; citation obtenue via blocus-lycees-umber.vercel.app qui cite lest-eclair.fr" }
];

window.BLOCUS["11069|Lycée polyvalent Jules Fil"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« entrée bloquée » (palettes et poubelles en feu), environ 300 élèves n'entrent pas, réouverture à 10 h 30", m: "lejournaltoulousain.fr, 30/09 ; lindependant.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Blocus maintenu, grenades de désencerclement", m: "lejournaltoulousain.fr, 01/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "Titre : « 250 élèves bloquent le lycée Jules-Fil à Carcassonne »", m: "lindependant.fr, 02/10" }
];

window.BLOCUS["11203|Lycée polyvalent Ernest Ferroul"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« les lycées Lacroix et Ferroul à Narbonne […] sont bloqués par les élèves »", m: "lindependant.fr, 30/09" }
];

window.BLOCUS["11262|Lycée Docteur Lacroix"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« les lycées Lacroix et Ferroul à Narbonne […] sont bloqués par les élèves »", m: "lindependant.fr, 30/09" }
];

window.BLOCUS["12145|Lycée général et technologique Jean Vigo"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« malgré le blocus, les cours ont été assurés » — blocus concomitant à des cours maintenus", m: "centrepresseaveyron.fr, 29/09" }
];

window.BLOCUS["13028|Lycée polyvalent de la Méditerranée"] = [
  { n: "Incidents (proviseur aspergé d'essence)", j: "02/10", z: "2026-10-02", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "presse" }
];

window.BLOCUS["13055|Lycée Honoré Daumier"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« plusieurs lycées, appartenant à la courte liste de ceux restés ouverts, ont été bloqués. Parmi eux : Daumier (8e), Marseilleveyre (8e) et Simone-Veil (13e) »", m: "lamarseillaise.fr, 03/10 06 h 47 (article OUVERT) — sources préfectorales citées dans le même article : 19 établissements concernés par des attroupements, 1 800 participants au plus fort, 59 interpellations dont 27 à Marseille" }
];

window.BLOCUS["13055|Lycée Marseilleveyre"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« plusieurs lycées, appartenant à la courte liste de ceux restés ouverts, ont été bloqués. Parmi eux : Daumier (8e), Marseilleveyre (8e) et Simone-Veil (13e) »", m: "lamarseillaise.fr, 03/10 (article OUVERT)" }
];

window.BLOCUS["13055|Lycée polyvalent Simone Veil"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« plusieurs lycées, appartenant à la courte liste de ceux restés ouverts, ont été bloqués. Parmi eux : Daumier (8e), Marseilleveyre (8e) et Simone-Veil (13e) »", m: "lamarseillaise.fr, 03/10 (article OUVERT) — PIEGE D'HOMONYMIE : un autre lycée Simone-Veil existe à Tulle (19) et à Liffré (35) ; ne pas confondre" }
];

window.BLOCUS["13055|Lycée professionnel la Floride"] = [
  { n: "Incidents (bus incendié)", j: "01/10", z: "2026-10-01", l: "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France", p: "presse" }
];

window.BLOCUS["13055|Lycée Saint-Exupéry"] = [
  { n: "Blocus national + incidents", j: "01/10", z: "2026-10-01", l: "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France", p: "presse", q: "Légende : « action de blocage le 1er octobre 2026 » ; camion de marins-pompiers incendié", m: "tf1info.fr (photo AFP), 01/10" }
];

window.BLOCUS["14118|Lycée agricole Lemonnier"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.ouest-france.fr/education/reportage-deuxieme-journee-de-blocage-des-lycees-a-caen-aujourdhui-on-veut-ressayer-de-maniere-pacifique-c48f3b4a-be47-11f1-7db-555e86a524f6", p: "presse" }
];

window.BLOCUS["14118|Lycée Augustin Fresnel"] = [
  { n: "Blocus national + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/normandie/caen_14118/les-lyceens-bloquent-de-nouveau-des-etablissements-a-caen-ce-vendredi-le-campus-1-de-luniversite-ferme_64869795.html", p: "presse", q: "Bloqué ; gaz lacrymogène", m: "actu.fr, 01/10" },
  { n: "Blocus national + incidents", j: "02/10", z: "2026-10-02", l: "https://actu.fr/normandie/caen_14118/les-lyceens-bloquent-de-nouveau-des-etablissements-a-caen-ce-vendredi-le-campus-1-de-luniversite-ferme_64869795.html", p: "presse", q: "Bloqué", m: "actu.fr, 02/10" }
];

window.BLOCUS["14118|Lycée Charles de Gaulle"] = [
  { n: "Blocus", j: "02/10", z: "2026-10-02", l: "https://www.ouest-france.fr/education/direct-blocage-des-lycees-en-normandie-mobilisation-barricades-tensions-la-contestation-sociale-se-poursuit-ba023a99-c62e-46cb-9817-8644560d6b16", p: "presse" }
];

window.BLOCUS["14118|Lycée François de Malherbe"] = [
  { n: "Blocus national + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/normandie/caen_14118/blocage-de-nombreux-lycees-a-caen-ce-jeudi-pourquoi-les-lyceens-sont-en-colere-et-manifestent_64864647.html", p: "presse", q: "« Blocus dès 7 h, poubelles à l'entrée »", m: "actu.fr, 01/10" },
  { n: "Blocus national + incidents", j: "02/10", z: "2026-10-02", l: "https://actu.fr/normandie/caen_14118/blocage-de-nombreux-lycees-a-caen-ce-jeudi-pourquoi-les-lyceens-sont-en-colere-et-manifestent_64864647.html", p: "presse", q: "« entrée bloquée »", m: "actu.fr, 02/10" }
];

window.BLOCUS["14118|Lycée Jean Rostand"] = [
  { n: "Blocus national + incidents + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.ouest-france.fr/education/en-images-blocages-des-lycees-en-normandie-journee-tendue-a-caen-et-a-alencon-situation-plus-calme-dans-la-manche-02736c32-bd90-11f1-8ea4-97dc4d7cca62", p: "presse", q: "Titre : « Lycées bloqués » (incendies, direct)", m: "actu.fr, 01/10" },
  { n: "Blocus national + incidents + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.ouest-france.fr/education/en-images-blocages-des-lycees-en-normandie-journee-tendue-a-caen-et-a-alencon-situation-plus-calme-dans-la-manche-02736c32-bd90-11f1-8ea4-97dc4d7cca62", p: "presse", q: "« les lycéens bloquent de nouveau des établissements à Caen » ; campus 1 fermé", m: "actu.fr, 02/10" }
];

window.BLOCUS["14118|Lycée Laplace - Dumont d'Urville"] = [
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://www.ouest-france.fr/education/reportage-deuxieme-journee-de-blocage-des-lycees-a-caen-aujourdhui-on-veut-ressayer-de-maniere-pacifique-c48f3b4a-be47-11f1-7db-555e86a524f6", p: "presse" },
  { n: "Blocus national + incidents", j: "02/10", z: "2026-10-02", l: "https://www.ouest-france.fr/education/reportage-deuxieme-journee-de-blocage-des-lycees-a-caen-aujourdhui-on-veut-ressayer-de-maniere-pacifique-c48f3b4a-be47-11f1-7db-555e86a524f6", p: "presse", q: "« Barrières de chantier devant l'entrée »", m: "actu.fr, 02/10" }
];

window.BLOCUS["14118|Lycée Victor Hugo"] = [
  { n: "Blocus (EDD / options / accueil handicapé)", j: "15/09", z: "2026-09-15", l: "https://actu.fr/normandie/caen_14118/un-lycee-bloque-par-des-eleves-a-caen-ils-denoncent-une-mauvaise-organisation-interne_64794136.html", p: "presse", q: "« Impossible d'entrer dans l'enceinte du lycée Victor Hugo à Caen [...] Seuls les élèves des classes prépa et le personnel de l'établissement pouvaient franchir le barrage » ; « Le blocage a été levé à la mi-journée »", m: "actu.fr, 15/09 18 h 27 (article OUVERT) — ANTÉRIEUR à la vague nationale" }
];

window.BLOCUS["14327|Lycée Salvador Allende"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://actu.fr/normandie/caen_14118/les-lyceens-bloquent-de-nouveau-des-etablissements-a-caen-ce-vendredi-le-campus-1-de-luniversite-ferme_64869795.html", p: "presse", q: "« ont bloqué l'établissement »", m: "actu.fr, 01/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", l: "https://actu.fr/normandie/caen_14118/les-lyceens-bloquent-de-nouveau-des-etablissements-a-caen-ce-vendredi-le-campus-1-de-luniversite-ferme_64869795.html", p: "presse", q: "Accès impossible", m: "actu.fr, 02/10" }
];

window.BLOCUS["14366|Lycée Paul Cornu"] = [
  { n: "Blocus", j: "30/09, 01/10 et 02/10", z: "2026-09-30;2026-10-01;2026-10-02", l: "https://actu.fr/normandie/lisieux_14366/blocus-dans-les-lycees-a-lisieux-150-personnes-devant-cornu-cest-calme-devant-gambier_64869477.html", p: "presse" }
];

window.BLOCUS["14437|Lycée Jules Verne"] = [
  { n: "Blocus", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/normandie/caen_14118/degradations-lors-des-blocages-des-lycees-dans-le-calvados-la-region-normandie-condamne-et-va-porter-plainte_64869266.html", p: "presse" }
];

window.BLOCUS["16015|Lycée Marguerite de Valois"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« À Marguerite-de-Valois […] le blocus avait dégénéré en affrontements » ; tir de mortier visant un policier « jeudi matin, devant le lycée »", m: "charentelibre.fr (direct), 02/10" }
];

window.BLOCUS["17300|Lycée polyvalent Léonce Vieljeux"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Hier, il n'y avait que des élèves de Vieljeux sur le blocus »", m: "sudouest.fr, 02/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« les portes se sont fermées avant 8 heures […] objets de chantier empilés devant l'établissement »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["17300|Lycée René-Josué Valin"] = [
  { n: "Blocus national, accès filtrant", j: "02/10", z: "2026-10-02", p: "presse", q: "« L'entrée principale était fermée […] allées et venues par une porte latérale »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["17306|Lycée Cordouan"] = [
  { n: "Blocus national, accès filtrant", j: "01/10", z: "2026-10-01", p: "presse", q: "« un blocage filtrant a été mis en place à l'entrée »", m: "sudouest.fr / sudouest17.fr, 01/10" }
];

window.BLOCUS["18033|Lycée Jacques Coeur"] = [
  { n: "Rassemblement puis blocus", j: "29/09 et 01/10", z: "2026-09-29;2026-10-01", l: "https://www.ici.fr/centre-val-de-loire/cher-18/bourges/bourges-face-a-face-tendu-entre-lyceens-et-policiers-2736416", p: "presse" }
];

window.BLOCUS["18033|Lycée polyvalent Pierre-Émile Martin"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/centre-val-de-loire/cher-18/bourges/bourges-face-a-face-tendu-entre-lyceens-et-policiers-2736416", p: "presse" }
];

window.BLOCUS["18033|Lycée professionnel Vauvert"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/centre-val-de-loire/cher-18/bourges/bourges-face-a-face-tendu-entre-lyceens-et-policiers-2736416", p: "presse" }
];

window.BLOCUS["18279|Lycée polyvalent Édouard Vaillant"] = [
  { n: "Incidents (poubelles incendiées)", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/centre-val-de-loire/cher-18/bourges/bourges-face-a-face-tendu-entre-lyceens-et-policiers-2736416", p: "presse" }
];

window.BLOCUS["19272|Lycée Edmond Perrier"] = [
  { n: "Blocus national, accès filtrant", j: "01/10", z: "2026-10-01", p: "presse", q: "« des blocus filtrants avaient été mis en place au lycée Edmond Perrier »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["2A247|Lycée polyvalent Jean-Paul de Rocca Serra"] = [
  { n: "Blocus (Solidarité avec la mobilisation agricole)", j: "25/09", z: "2026-09-25", p: "presse", q: "« a été bloqué par des étudiants […] ont incendié des palettes devant l'entrée du lycée, empêchant l'accès à l'établissement »", m: "corsematin.com, 25/09" },
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "« les élèves bloquent en ce moment le lycée […] de nouveau bloqué ce lundi matin »", m: "corsematin.com, 28/09" }
];

window.BLOCUS["2B033|Lycée Giocante de Casabianca"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Le blocage opéré par les lycéens avait commencé dans le calme » ; environ 200 élèves", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["2B251|Lycée polyvalent du Fium'orbu"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Le rectorat recense la cité scolaire parmi les établissements bloqués", m: "france3-regions.fr, 01/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« toujours bloqué par des élèves »", m: "ici.fr, 02/10" }
];

window.BLOCUS["21038|Lycée polyvalent Prieur de la Côte-d'Or"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.infos-dijon.com/news/bourgogne-franche-comte/bourgogne-franche-comte/bourgogne-point-de-situation-des-blocages-de-lycees-1790719200.html", p: "presse" }
];

window.BLOCUS["21231|Lycée général et technologique Carnot"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/cote-d-or-21/dijon/la-mobilisation-lyceenne-se-poursuit-en-cote-d-or-et-en-saone-et-loire-les-forces-de-l-ordre-presentes-7169294", p: "presse" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Dès le blocage de l'entrée de l'établissement »", m: "france3-regions.fr (direct), 02/10" }
];

window.BLOCUS["21231|Lycée général et technologique Montchapet"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/cote-d-or-21/dijon/la-mobilisation-lyceenne-se-poursuit-en-cote-d-or-et-en-saone-et-loire-les-forces-de-l-ordre-presentes-7169294", p: "presse" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« le lycée Montchapet a été bloqué tôt ce matin vendredi par environ 200 élèves »", m: "france3-regions.fr (direct), 02/10" }
];

window.BLOCUS["21231|Lycée polyvalent Hippolyte Fontaine"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://france3-regions.franceinfo.fr/bourgogne-franche-comte/cote-d-or/blocage-des-lycees-4-etablissements-perturbes-16-interpellations-le-point-sur-la-situation-en-bourgogne-mercredi-3426027.html", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« des élèves se sont regroupés devant les grilles et ont installé des poubelles pour matérialiser le blocage »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["21231|Lycée polyvalent Le Castel"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.infos-dijon.com/news/bourgogne-franche-comte/bourgogne-franche-comte/bourgogne-point-de-situation-des-blocages-de-lycees-1790719200.html", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.infos-dijon.com/news/bourgogne-franche-comte/bourgogne-franche-comte/bourgogne-point-de-situation-des-blocages-de-lycees-1790719200.html", p: "presse", q: "« des barricades et des poubelles ont de nouveau été installées devant le lycée »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["21231|Lycée polyvalent Saint-Joseph La Salle"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/cote-d-or-21/dijon/la-mobilisation-lyceenne-se-poursuit-en-cote-d-or-et-en-saone-et-loire-les-forces-de-l-ordre-presentes-7169294", p: "presse" }
];

window.BLOCUS["21231|Lycée polyvalent Simone Weil"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/cote-d-or-21/dijon/la-mobilisation-lyceenne-se-poursuit-en-cote-d-or-et-en-saone-et-loire-les-forces-de-l-ordre-presentes-7169294", p: "presse" }
];

window.BLOCUS["21231|Lycée technologique Gustave Eiffel"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/cote-d-or-21/dijon/la-mobilisation-lyceenne-se-poursuit-en-cote-d-or-et-en-saone-et-loire-les-forces-de-l-ordre-presentes-7169294", p: "presse" }
];

window.BLOCUS["21425|Lycée professionnel Eugène Guillaume"] = [
  { n: "Blocus (Self, temps de repas…)", j: "30/09", z: "2026-09-30", p: "presse", q: "«À Montbard, des éléves ont bloqué leur établissement et lancé des pétards ce mercredi 30 septembre, vers 8 heures. La gendarmerie est intervenue. » + «Des barriéres et chariots de supermarché ont été installés à l" }
];

window.BLOCUS["22113|Lycée Félix le Dantec"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« ont entrepris de bloquer leur établissement […] 500 lycéens massés devant les grilles […] avant 16 h blocage levé »", m: "actu.fr, 01/10 12 h 28" }
];

window.BLOCUS["23079|Lycée polyvalent des métiers du bâtiment"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les lycéens […] ont bloqué les accès au principal lycée technique du département »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["24037|Lycée Maine de Biran"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "400 à 500 jeunes « pour bloquer »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["24322|Lycée Bertran de Born"] = [
  { n: "Blocus national, accès filtrant", j: "01/10", z: "2026-10-01", p: "presse", q: "« barrage filtrant, avant de bloquer complètement le passage » (poubelles, palettes, mobilier)", m: "sudouest.fr, 01/10 17 h 52" }
];

window.BLOCUS["24322|Lycée Jay de Beaufort"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Le blocus a continué devant Jay-de-Beaufort »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["24322|Lycée Laure Gatet"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« la manifestation se poursuit devant Laure-Gatet » ; referred to comme « blocus »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["24322|Lycée professionnel Pablo Picasso"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cortège déplacé vers l'établissement (« zone de blocage »)", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["24352|Lycée Arnaut Daniel"] = [
  { n: "Blocus national, accès filtrant", j: "02/10", z: "2026-10-02", p: "presse", q: "« les élèves ont filtré l'entrée du lycée »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["25031|Lycée professionnel Nelson Mandela"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/", p: "presse" }
];

window.BLOCUS["25056|Lycée général et technologique Louis Pasteur"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/des-perturbations-dans-neuf-lycees-de-franche-comte-le-lycee-pasteur-de-besancon-bloque-2800466", p: "presse", q: "« Plusieurs lycées de Besançon sont bloqués le mardi 29 septembre […] notamment les lycées Pasteur et Louis Pergaud »", m: "france3-regions.fr, 29/09" },
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/des-perturbations-dans-neuf-lycees-de-franche-comte-le-lycee-pasteur-de-besancon-bloque-2800466", p: "presse" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« incidents autour des lycées Jules Haag, Condé et Pasteur. Des cours ont été annulés »", m: "estrepublicain.fr, 02/10" }
];

window.BLOCUS["25056|Lycée général et technologique Louis Pergaud"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", l: "https://www.macommune.info/blocage-des-lycees-departs-de-feu-camions-de-pompiers-caillasses-et-policier-blesse-a-besancon/", p: "presse", q: "« Plusieurs lycées de Besançon sont bloqués le mardi 29 septembre […] notamment les lycées Pasteur et Louis Pergaud »", m: "france3-regions.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« le blocus du lycée Louis Pergaud était déjà en place »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["25056|Lycée général et technologique Victor Hugo"] = [
  { n: "Blocus national + rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/le-mouvement-des-lyceens-reprend-en-franche-comte-mobilisation-devant-plusieurs-lycees-notamment-a-besancon-8081004", p: "presse", q: "« La plupart des lycées de Franche-Comté étaient bloqués par les élèves ce 1er octobre au matin » ; « 7 lycées bloqués »", m: "france3-regions.fr, 01/10 10 h 30" }
];

window.BLOCUS["25056|Lycée polyvalent Claude Nicolas Ledoux"] = [
  { n: "Incidents", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/le-mouvement-des-lyceens-reprend-en-franche-comte-mobilisation-devant-plusieurs-lycees-notamment-a-besancon-8081004", p: "presse" }
];

window.BLOCUS["25056|Lycée polyvalent Jules Haag"] = [
  { n: "Blocus national + rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/le-mouvement-des-lyceens-reprend-en-franche-comte-mobilisation-devant-plusieurs-lycees-notamment-a-besancon-8081004", p: "presse", q: "« Coincée entre le blocus et la police » ; « la situation dégénère totalement »", m: "france3-regions.fr, 01/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« plusieurs dizaines d'élèves imposent un blocus », délogés à 8 h 10", m: "estrepublicain.fr, 03/10 (événement 02/10)" }
];

window.BLOCUS["25056|Lycée professionnel Condé"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/le-mouvement-des-lyceens-reprend-en-franche-comte-mobilisation-devant-plusieurs-lycees-notamment-a-besancon-8081004", p: "presse" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« incidents autour des lycées Jules Haag, Condé et Pasteur. Des cours ont été annulés »", m: "estrepublicain.fr, 02/10" }
];

window.BLOCUS["25056|Lycée professionnel Pierre-Adrien Pâris"] = [
  { n: "Tentative de blocus + incidents", j: "29/09", z: "2026-09-29", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/lycees-bloques-cinq-interpellations-a-besancon-apres-des-echauffourees-avec-la-police-7856952", p: "presse" }
];

window.BLOCUS["25056|Lycée professionnel privé Sainte-Famille"] = [
  { n: "Perturbation", j: "29/09", z: "2026-09-29", l: "https://www.macommune.info/blocage-des-lycees-departs-de-feu-camions-de-pompiers-caillasses-et-policier-blesse-a-besancon/", p: "presse" }
];

window.BLOCUS["25388|Lycée général et technologique Georges Cuvier"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/", p: "presse" }
];

window.BLOCUS["25388|Lycée polyvalent Germaine Tillion"] = [
  { n: "Blocus national + rassemblement", j: "01/10", z: "2026-10-01", l: "https://letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/", p: "presse", q: "« La plupart des lycées de Franche-Comté étaient bloqués » ; « un blocage est en cours »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["25462|Lycée polyvalent Xavier Marmier"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/bourgogne-franche-comte/doubs-25/besancon/le-mouvement-des-lyceens-reprend-en-franche-comte-mobilisation-devant-plusieurs-lycees-notamment-a-besancon-8081004", p: "presse" }
];

window.BLOCUS["25580|Lycée général et technologique Armand Peugeot"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/", p: "presse" }
];

window.BLOCUS["26198|Collège Alain Borne"] = [
  { n: "Blocus national, accès filtrant", j: "01/10", z: "2026-10-01", p: "presse", q: "« des centaines d'élèves ont à nouveau protesté […] en effectuant un blocus filtrant, ce jeudi 1er octobre »", m: "ledauphine.com, 01/10" }
];

window.BLOCUS["27016|Lycée Jean Moulin"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/faits-divers/manifestations-lyceennes-les-andelys-gisors-et-gaillon-rejoignent-le-mouvement-le-lycee-malraux-confine_64865080.html", p: "presse" }
];

window.BLOCUS["27229|Lycée général et technologique Aristide Briand"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« bloquent l'établissement » dès 7 h 30", m: "actu.fr (Évreux), 01/10" }
];

window.BLOCUS["27229|Lycée Léopold Sédar Senghor"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.paris-normandie.fr/id749095/article/2026-10-01/dans-leure-plusieurs-blocages-de-lycees-dans-le-departement-un-lyceen-interpelle", p: "presse", q: "« les lycées d'Évreux n'échappent pas aux blocus »", m: "france3-regions.fr (Normandie), 01/10" }
];

window.BLOCUS["27229|Lycée professionnel du bâtiment Augustin Hébert"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/normandie/orne/alencon/en-images-blocus-lyceens-la-mobilisation-continue-et-se-renforce-en-normandie-3426141.html", p: "presse" }
];

window.BLOCUS["27275|Lycée André Malraux"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/faits-divers/manifestations-lyceennes-les-andelys-gisors-et-gaillon-rejoignent-le-mouvement-le-lycee-malraux-confine_64865080.html", p: "presse" }
];

window.BLOCUS["27284|Lycée polyvalent Louise Michel"] = [
  { n: "Rassemblement (non bloqué)", j: "01/10", z: "2026-10-01", l: "https://actu.fr/faits-divers/manifestations-lyceennes-les-andelys-gisors-et-gaillon-rejoignent-le-mouvement-le-lycee-malraux-confine_64865080.html", p: "presse" }
];

window.BLOCUS["27375|Lycée polyvalent Jean-Baptiste Decrétot"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/normandie/louviers_27375/ils-lont-passe-a-tabac-colere-et-tensions-devant-un-lycee-de-louviers-apres-linterpellation-dun-eleve_64864321.html", p: "presse" }
];

window.BLOCUS["27375|Lycée polyvalent Les Fontenelles"] = [
  { n: "Blocus national + incidents + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://actu.fr/normandie/louviers_27375/ils-lont-passe-a-tabac-colere-et-tensions-devant-un-lycee-de-louviers-apres-linterpellation-dun-eleve_64864321.html", p: "presse et officiel", q: "« Des blocages ont été observés à Évreux, Gisors, Louviers et Vernon »", m: "paris-normandie.fr, 01/10" },
  { n: "Blocus + incidents + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/normandie/louviers_27375/ils-lont-passe-a-tabac-colere-et-tensions-devant-un-lycee-de-louviers-apres-linterpellation-dun-eleve_64864321.html", p: "presse+officiel" }
];

window.BLOCUS["28085|Lycée Fulbert"] = [
  { n: "Blocus", j: "29/09", z: "2026-09-29", l: "https://www.intensite.net/chartres-mobilises-les-lyceens-rejoignent-la-greve", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.intensite.net/chartres-mobilises-les-lyceens-rejoignent-la-greve", p: "presse", q: "« Les élèves chartrains ont bloqué leurs lycées » ; plusieurs centaines devant Jehan-de-Beauce et Fulbert", m: "lechorepublicain.fr, 01/10" }
];

window.BLOCUS["28085|Lycée Marceau"] = [
  { n: "Rassemblement", j: "29/09", z: "2026-09-29", l: "https://www.intensite.net/chartres-mobilises-les-lyceens-rejoignent-la-greve", p: "presse" }
];

window.BLOCUS["28085|Lycée polyvalent Jehan de Beauce"] = [
  { n: "Blocus (Profs de français)", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs centaines de lycéens se massent pour bloquer l'entrée du lycée et la rue » ; 2 interpellations, gaz lacrymogène", m: "lechorepublicain.fr, 01/10" }
];

window.BLOCUS["28134|Lycée polyvalent Édouard Branly"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Des élèves des lycées Edouard-Branly et Rotrou ont bloqué l'accès à leur établissement dès 8 heures »", m: "lechorepublicain.fr, 30/09" }
];

window.BLOCUS["28134|Lycée Rotrou"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Des élèves des lycées Edouard-Branly et Rotrou ont bloqué l'accès à leur établissement dès 8 heures » + « les deux rond-points proches ont également été bloqués » (voirie)", m: "lechorepublicain.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« l'accès au lycée Rotrou bloqué »", m: "lechorepublicain.fr, 01/10" }
];

window.BLOCUS["28220|Lycée polyvalent Silvia Monfort"] = [
  { n: "Rassemblement", j: "29/09", z: "2026-09-29", l: "https://www.intensite.net/chartres-mobilises-les-lyceens-rejoignent-la-greve", p: "presse" }
];

window.BLOCUS["29019|Lycée Dupuy de Lôme"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "Bloqué + feux de poubelles", m: "ici.fr, 01/10 08 h 52" }
];

window.BLOCUS["29220|Lycée René Laënnec"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les accès au lycée René Laennec sont bloqués »", m: "ici.fr, 01/10" }
];

window.BLOCUS["29232|Lycée professionnel Jean Chaptal"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« plusieurs centaines d'élèves ont bloqué le lycée Chaptal »", m: "ici.fr, 02/10 09 h 29" }
];

window.BLOCUS["29232|Lycée Yves Thépot"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "Bloqué + feux", m: "ici.fr, 01/10 08 h 52" }
];

window.BLOCUS["30007|Lycée polyvalent Jean-Baptiste Dumas"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "Titre : « Le lycée Jean-Baptiste Dumas d'Alès bloqué par 250 élèves »", m: "ici.fr, 28/09" },
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« des blocages à Jean-Baptiste-Dumas et Jacques-Prévert »", m: "midilibre.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« un blocus levé après des affrontements » ; 4 interpellations", m: "midilibre.fr, 01/10" }
];

window.BLOCUS["30028|Lycée polyvalent Albert Einstein"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "Titre : « après le blocage du lycée de Bagnols-sur-Cèze » ; 5 GAV, 2 policiers blessés", m: "ici.fr, 28/09" }
];

window.BLOCUS["30189|Lycée Alphonse Daudet"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« des établissements de la ville ont été bloqués […] rejoints à Dhuoda » ; blocus de 8 h à 9 h 15", m: "midilibre.fr ; lereveildumidi.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité parmi les « lycées bloqués » de Nîmes", m: "midilibre.fr, 02/10" }
];

window.BLOCUS["30189|Lycée Dhuoda"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« des établissements de la ville ont été bloqués […] rejoints à Dhuoda » ; blocus de 8 h à 9 h 15", m: "midilibre.fr ; lereveildumidi.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité parmi les « lycées bloqués » de Nîmes", m: "midilibre.fr, 02/10" }
];

window.BLOCUS["30189|Lycée Frédéric Mistral"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« la grille d'entrée a été complètement couchée »", m: "midilibre.fr, 02/10 (bilan du 01/10)" }
];

window.BLOCUS["30243|Lycée polyvalent Jacques Prévert"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« des blocages à Jean-Baptiste-Dumas et Jacques-Prévert »", m: "midilibre.fr, 29/09" }
];

window.BLOCUS["31149|Lycée professionnel Eugène Montel"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31395|Lycée polyvalent Charles de Gaulle"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31395|Lycée polyvalent Pierre d'Aragon"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« blocage devant un lycée près de Toulouse » (caddies en barrière), 80 personnes, gazé, 1 arrestation", m: "actu.fr, 29/09" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Collège Sainte-Marie de Nevers"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Collège Sainte-Marie des Ursulines"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée général et technologique des Arènes"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« plusieurs autres blocages en cours »", m: "actu.fr, 29/09" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée général et technologique Henri de Toulouse-Lautrec"] = [
  { n: "Fermeture administrative + incidents", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée général et technologique Marcelin Berthelot"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« plusieurs autres blocages en cours »", m: "actu.fr, 29/09" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée général et technologique privé Sainte-Marie de Nevers"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée général et technologique Stéphane Hessel"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée polyvalent Bellevue"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée polyvalent Déodat de Séverac"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« blocage du lycée Déodat » ; tramway T1 interrompu", m: "actu.fr, 29/09" }
];

window.BLOCUS["31555|Lycée polyvalent hôtellerie et tourisme d'Occitanie"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée polyvalent Joseph Gallieni"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée polyvalent Raymond Naves"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée polyvalent Roland Garros"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée professionnel Hélène Boucher"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31555|Lycée professionnel privé Sainte-Marie Saint-Sernin"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["31557|Lycée polyvalent Marie-Louise Dissard Françoise"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/occitanie/toulouse_31555/apres-les-violences-de-jeudi-de-nombreux-lycees-suspendent-les-cours-en-haute-garonne-voici-la-liste_64868865.html", p: "officiel (préfecture, via Actu)" }
];

window.BLOCUS["32013|Lycée général et technologique Pardailhan"] = [
  { n: "Blocus national, accès filtrant", j: "01/10", z: "2026-10-01", p: "presse", q: "« un barrage filtrant était en place ce matin »", m: "ladepeche.fr, 01/10" }
];

window.BLOCUS["32013|Lycée polyvalent Le Garros"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Hier, on a bloqué une demi-journée parce que c'était mercredi »", m: "ladepeche.fr, 01/10" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« des blocages ont été signalés aux lycées du Garros et de Pardailhan » ; établissement fermé, relais de la localite", m: "ladepeche.fr, 01/10" }
];

window.BLOCUS["33009|Lycée de Grand Air"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« comme la veille, bloqué par une partie des lycéens »", m: "sudouest.fr, 02/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« devant les grilles fermées »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["33039|Lycée polyvalent Václav Havel"] = [
  { n: "Blocus cité par la préfecture", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Nommé parmi les établissements bloqués le 01/10 par la préfecture de la Gironde ; aucune source ne décrit précisément le blocage. Aucune citation disponible.", m: "préfecture de la Gironde, via sudouest.fr, 01/10" }
];

window.BLOCUS["33039|Lycée professionnel Émile Combes"] = [
  { n: "Blocus cité par la préfecture", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Nommé parmi les établissements bloqués le 01/10 par la préfecture de la Gironde ; aucune source ne décrit précisément le blocage. Aucune citation disponible.", m: "préfecture de la Gironde, via sudouest.fr, 01/10" }
];

window.BLOCUS["33063|Lycée François Mauriac"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Amoncellement défendu contre « les adultes qui tentaient de déblayer l'entrée »", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["33063|Lycée Michel Montaigne"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« poubelles et barricades devant l'entrée principale »", m: "sudouest.fr, 29/09" }
];

window.BLOCUS["33063|Lycée Montesquieu"] = [
  { n: "Blocus cité par la préfecture", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Nommé parmi les établissements bloqués le 01/10 par la préfecture de la Gironde ; aucune source ne décrit précisément le blocage. Aucune citation disponible.", m: "préfecture de la Gironde, via sudouest.fr, 01/10" }
];

window.BLOCUS["33063|Lycée Nicolas Brémontier"] = [
  { n: "Blocus cité par la préfecture", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Nommé parmi les établissements bloqués le 01/10 par la préfecture de la Gironde ; aucune source ne décrit précisément le blocage. Aucune citation disponible.", m: "préfecture de la Gironde, via sudouest.fr, 01/10" }
];

window.BLOCUS["33063|Lycée polyvalent Gustave Eiffel"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« rassemblés devant le lycée Gustave Eiffel à partir de 7 heures, bloquant l'accès »", m: "ici.fr, 30/09 12 h 48" }
];

window.BLOCUS["33063|Lycée privé Le Mirail - le lycée du matin"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Poubelles et barrières de chantier amassées […] évacuer la barricade »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["33063|Lycée professionnel des Menuts"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« poubelles et barrières de chantier […] devant la porte de l'établissement »", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["33063|Lycée Saint-Louis"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« On a bloqué l'entrée avec des poubelles » (témoignage d'élève)", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["33249|Lycée professionnel Jacques Brel"] = [
  { n: "Blocus (EDT surchargés)", j: "17/09", z: "2026-09-17", p: "presse", q: "« ont bloqué leur établissement dès 8 h 30 » — DATE LA PLUS ANCIENNE DU CORPUS", m: "ici.fr (Gironde), 17/09" }
];

window.BLOCUS["33522|Lycée polyvalent Victor Louis"] = [
  { n: "Blocus cité par la préfecture", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Nommé parmi les établissements bloqués le 01/10 par la préfecture de la Gironde ; aucune source ne décrit précisément le blocage. Aucune citation disponible.", m: "préfecture de la Gironde, via sudouest.fr, 01/10" }
];

window.BLOCUS["34003|Lycée polyvalent Auguste Loubatières"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « Blocus du lycée d'Agde »", m: "midilibre.fr, 02/10" }
];

window.BLOCUS["34172|Lycée Georges Clemenceau"] = [
  { n: "Blocus (Classes à 30)", j: "01/10", z: "2026-10-01", p: "presse", q: "« les barrages filtrants dénonçaient les classes à 30 élèves »", m: "midilibre.fr, 03/10" }
];

window.BLOCUS["34172|Lycée Joffre"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Joffre, Mermoz, Monnet… le blocage des lycées se poursuit »", m: "lagazettedemontpellier.fr, 01/10" }
];

window.BLOCUS["34172|Lycée polyvalent Jean Mermoz"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « les lycées Jean Mermoz et Jules Guesde bloqués à Montpellier »", m: "actu.fr, 01/10" }
];

window.BLOCUS["34172|Lycée polyvalent Jules Guesde"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « les lycées Jean Mermoz et Jules Guesde bloqués à Montpellier » + incendie de la loge du gardien", m: "midilibre.fr, 01/10" }
];

window.BLOCUS["34301|Lycée polyvalent Irène et Frédéric Joliot-Curie"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « Blocus des lycées à Sète »", m: "lindependant.fr, 01/10" }
];

window.BLOCUS["35115|Lycée Jean Guéhenno"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« a été bloqué par les lycéens »", m: "ici.fr, 01/10" }
];

window.BLOCUS["35238|Lycée Bréquigny"] = [
  { n: "Blocus national + manifestation", j: "29/09", z: "2026-09-29", l: "https://actu.fr/societe/greve-du-29-septembre-manifestations-perturbations-suivez-avec-nous-cette-journee-noire_64849101.html", p: "presse", q: "« des jeunes ont bloqué le lycée Bréquigny » ; 3 mineurs interpellés", m: "actu.fr, 29/09 15 h 14" },
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« plusieurs lycées de nouveau bloqués à Rennes » ; une dizaine de poubelles incendiées", m: "ici.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages devant des établissements scolaires à Rennes » (avec Chateaubriand, Descartes-Coëtlogon, Jaurès, Macé)", m: "ici.fr, 01/10 08 h 35" }
];

window.BLOCUS["35238|Lycée Chateaubriand"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages devant des établissements scolaires à Rennes » — établissement cité nommément, date commune", m: "ici.fr, 01/10 08 h 35" }
];

window.BLOCUS["35238|Lycée Jean Macé"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages devant des établissements scolaires à Rennes » — établissement cité nommément, date commune", m: "ici.fr, 01/10 08 h 35" },
  { n: "Rassemblement + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "presse" }
];

window.BLOCUS["35238|Lycée polyvalent Pierre Mendès France"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« plusieurs lycées toujours bloqués depuis ce matin » ; « Mendès France, et Coëtlogon »", m: "actu.fr ; france3-regions.fr, 30/09" }
];

window.BLOCUS["35238|Lycée professionnel Jean Jaurès"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Jean Jaurès est lui aussi bloqué »", m: "actu.fr ; france3-regions.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages devant des établissements scolaires à Rennes » — établissement cité nommément, date commune", m: "ici.fr, 01/10 08 h 35" }
];

window.BLOCUS["35238|Lycée René Descartes"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« plusieurs lycées toujours bloqués depuis ce matin » ; « Mendès France, et Coëtlogon »", m: "actu.fr, 30/09 10 h 39 ; france3-regions.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages devant des établissements scolaires à Rennes » — établissement cité nommément, date commune", m: "ici.fr, 01/10 08 h 35" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Deux barricades dressées devant l'entrée » ; titre : « blocus pacifiste »", m: "actu.fr, 02/10 18 h 51" }
];

window.BLOCUS["35240|Lycée agricole Théodore Monod"] = [
  { n: "Blocus (EDD non définis, sureffectif, options supprimées)", j: "07/09", z: "2026-09-07", p: "presse", q: "« Depuis ce lundi 7 heures, le lycée Théodore Monod situé sur la commune du Rheu est bloqué par les élèves de la filière générale » ; « Une mobilisation a été organisée ce lundi dès 7h, devant l'entrée principale » ; « Là, il n'y a aucun collégien en cours »", m: "france3-regions.fr, 07/09 11 h 54 (article OUVERT) ; tvr.bzh (émission du 07/09) ; rte.ie, 01/10 ; ouest-france.fr, 21/09 — PREMIER BLOCUS DOCUMENTÉ DE LA RENTRÉE 2026" },
  { n: "Blocus", j: "08/09", z: "2026-09-08", p: "à confirmer · presse", q: "« le blocage du lycée va se poursuivre au moins jusqu'à demain, mardi » (déclaration d'une élève de terminale, la veille)", m: "france3-regions.fr, 07/09 (annonce explicite) ; 20minutes.fr, 09/09 (« bloqué pendant deux jours »)" }
];

window.BLOCUS["36044|Lycée Jean Giraudoux"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceene-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["36044|Lycée Pierre et Marie Curie"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["36044|Lycée polyvalent Blaise Pascal"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["37003|Lycée Léonard de Vinci"] = [
  { n: "Rassemblement (blocage empêché)", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["37072|Lycée polyvalent François Rabelais"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« mobilisée […] pour bloquer l'établissement »", m: "ici.fr, 29/09" },
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "presse" }
];

window.BLOCUS["37072|Lycée professionnel Joseph Cugnot"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["37122|Lycée Jean Monnet"] = [
  { n: "Rassemblement", j: "29/09", z: "2026-09-29", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "presse" }
];

window.BLOCUS["37132|Lycée polyvalent Thérèse Planiol"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["37261|Lycée Balzac"] = [
  { n: "Blocus national + incidents + fermeture administrative", j: "29/09", z: "2026-09-29", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "presse", q: "Blocus ; Maël, 16 ans, grièvement blessé au visage par un tir de LBD (perte de l'œil droit), enquête IGPN", m: "ici.fr, 29/09 ; ledauphine.com" },
  { n: "Blocus national + incidents + fermeture administrative", j: "30/09", z: "2026-09-30", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "presse", q: "Blocus maintenu", m: "ici.fr, 29/09 (cumulé) ; fr.wikipedia.org" },
  { n: "Blocus + incidents + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "presse" }
];

window.BLOCUS["37261|Lycée Grandmont"] = [
  { n: "Blocus national + incidents + fermeture administrative", j: "29/09", z: "2026-09-29", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "presse", q: "« Barrières + poubelles devant le portail »", m: "ici.fr, 29/09" },
  { n: "Blocus + incidents + fermeture administrative", j: "30/09", z: "2026-09-30", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "presse" },
  { n: "Blocus national + incidents + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/centre-val-de-loire/indre-et-loire-37/tours/des-degradations-et-trois-interpellations-en-marge-des-blocus-de-lycees-en-indre-et-loire-1156497", p: "officiel (préfecture)", q: "Affrontements de 8 h à 12 h ; 5 policiers blessés, 2 interpellations (tirs de mortier)", m: "actu.fr ; préfecture 37, 02/10" }
];

window.BLOCUS["37261|Lycée Paul-Louis Courier"] = [
  { n: "Blocus + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["37261|Lycée professionnel Henri Becquerel"] = [
  { n: "Blocus + incidents", j: "29/09, 30/09 et 01/10", z: "2026-09-29;2026-09-30;2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["38053|Lycée général et technologique l'Oiselet"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité dans la liste des « lycées bloqués »", m: "travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38053|Lycée professionnel Gambetta"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité dans la liste des « lycées bloqués »", m: "travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38053|Lycée professionnel Jean-Claude Aubry"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité dans la liste des « lycées bloqués »", m: "travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38151|Lycée général et technologique Marie Curie"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Poubelles brûlées devant l'entrée du lycée Marie-Curie […] lors du blocage de l'établissement, le 29 septembre 2026 »", m: "franceinfo.fr, 02/10" },
  { n: "Blocus (Portail forcé) + manifestation", j: "01/10", z: "2026-10-01", l: "https://www.facebook.com/LeDauphineLibereGrenoble/posts/1761334225993647/", p: "presse", q: "« des jeunes ont réussi à casser et franchir le portail de l'établissement »", m: "ledauphine.com (direct), 01/10" }
];

window.BLOCUS["38151|Lycée professionnel Thomas Edison"] = [
  { n: "Manifestation", j: "01/10", z: "2026-10-01", l: "https://www.facebook.com/LeDauphineLibereGrenoble/posts/1761334225993647/", p: "presse (extrait, à confirmer)" }
];

window.BLOCUS["38185|Lycée général Champollion"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", l: "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France", p: "presse", q: "Légende de photo : « Blocage du lycée Champollion de Grenoble, le 30 septembre 2026 »", m: "fr.wikipedia.org (Mouvement lyceeen et blocus de 2026)" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« l'entrée du lycée Champollion a été bloquée par du mobilier urbain avant 8 heures » ; « l'entrée est bloquée par une centaine d'élèves »", m: "france3-regions.fr (direct), 01/10" }
];

window.BLOCUS["38185|Lycée général et technologique Les Eaux Claires"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "Cité avec Mounier, Stendhal, Eaux-Claires, Vaucanson, Lesdiguières, Clos d'Or, Marie-Curie parmi les établissements bloqués", m: "travailleur-alpin.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« La rue des Eaux Claires est complètement barrée par des poubelles devant les grilles du lycée du même nom » ; cité parmi les « lycées bloqués »", m: "ledauphine.com (direct) ; travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38185|Lycée général Stendhal"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "Cité avec Mounier, Stendhal, Eaux-Claires, Vaucanson, Lesdiguières, Clos d'Or, Marie-Curie parmi les établissements bloqués", m: "travailleur-alpin.fr, 30/09" },
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« il s'est propagé mardi et mercredi » ; « Mercredi 30 septembre, des blocus sont toujours en cours »", m: "actu.fr ; ledauphine.com" }
];

window.BLOCUS["38185|Lycée polyvalent André Argouges"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "Cité avec Mounier, Stendhal, Eaux-Claires, Vaucanson, Lesdiguières, Clos d'Or, Marie-Curie parmi les établissements bloqués", m: "travailleur-alpin.fr, 30/09" },
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« il s'est propagé mardi et mercredi » ; « Mercredi 30 septembre, des blocus sont toujours en cours »", m: "actu.fr ; ledauphine.com (direct 01/10)" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Une barricade, faite de poubelles, a été enflammée devant le portique d'entrée du lycée Argouges »", m: "ledauphine.com (direct), 01/10 18 h 10" }
];

window.BLOCUS["38185|Lycée polyvalent Emmanuel Mounier"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "« le lycée Mounier a ainsi été bloqué […] poubelles brûlées ou renversées, disséminées devant le portail d'entrée » ; « Emmanuel-Mounier qui a été entièrement bloqué »", m: "travailleur-alpin.fr, 30/09 ; actu.fr" },
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Un blocage reconduit dès le début de matinée, ce mardi 29 septembre »", m: "travailleur-alpin.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.facebook.com/france3provencealpes/posts/1569598021870169/", p: "presse", q: "« il reste une centaine de jeunes devant les portes de l'établissement » ; cité parmi les « lycées bloqués »", m: "ledauphine.com (direct) ; travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38185|Lycée polyvalent hôtelier Lesdiguières"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "Cité avec Mounier, Stendhal, Eaux-Claires, Vaucanson, Lesdiguières, Clos d'Or, Marie-Curie parmi les établissements bloqués", m: "travailleur-alpin.fr, 30/09" }
];

window.BLOCUS["38185|Lycée polyvalent Louise Michel"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« l'entrée du lycée Louise-Michel a été incendiée »", m: "france3-regions.fr (direct) ; tgplus.fr, 01/10" }
];

window.BLOCUS["38185|Lycée polyvalent Vaucanson"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "Cité avec Mounier, Stendhal, Eaux-Claires, Vaucanson, Lesdiguières, Clos d'Or, Marie-Curie parmi les établissements bloqués", m: "travailleur-alpin.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« poubelles ont été mises en travers de la rue et devant la grille de l'établissement avant d'être incendiées »", m: "ledauphine.com (direct), 01/10" }
];

window.BLOCUS["38193|Lycée polyvalent Philibert Delorme"] = [
  { n: "Blocus (Route barrée)", j: "01/10", z: "2026-10-01", p: "presse", q: "« les élèves bloquent partiellement la route devant le lycée Delorme » (13 h : cours maintenus)", m: "ledauphine.com (direct), 01/10" }
];

window.BLOCUS["38416|Lycée polyvalent La Saulaie"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« un blocus devant le lycée La Saulaie où une poubelle a été incendiée »", m: "ledauphine.com (direct), 01/10 15 h 21" }
];

window.BLOCUS["38421|Lycée polyvalent Pablo Neruda"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« il s'est propagé mardi et mercredi » ; « Mercredi 30 septembre, des blocus sont toujours en cours »", m: "actu.fr ; ledauphine.com" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les lycées isérois bloqués et mobilisés a encore grossi ce jeudi 1er octobre » ; feux de poubelles devant l'établissement à 8 h 30", m: "travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38485|Lycée général et technologique Aristide Bergès"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« il s'est propagé mardi et mercredi » ; « Mercredi 30 septembre, des blocus sont toujours en cours »", m: "actu.fr ; ledauphine.com" }
];

window.BLOCUS["38509|Lycée polyvalent Élie Cartan"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité dans la liste des « lycées bloqués »", m: "travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38544|Lycée polyvalent Galilée"] = [
  { n: "Blocus (Personnel bloqué)", j: "01/10", z: "2026-10-01", p: "presse", q: "« Au lycée Galilée, à Vienne, les professeurs sont également bloqués »", m: "ledauphine.com (direct), 01/10 09 h 44" }
];

window.BLOCUS["38563|Lycée polyvalent Édouard Herriot"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité dans la liste des « lycées bloqués »", m: "travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["38563|Lycée polyvalent Ferdinand Buisson"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Cité dans la liste des « lycées bloqués »", m: "travailleur-alpin.fr, 01/10" }
];

window.BLOCUS["39097|Lycée polyvalent Paul-Émile Victor"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« après un blocus au lycée Paul-Emile Victor, mercredi »", m: "leprogres.fr, 02/10 (rappel du 30/09)" }
];

window.BLOCUS["39198|Lycée général Charles Nodier"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/bourgogne-franche-comte/dole_39198/manifestation-sauvage-des-lyceens-a-dole-que-sest-il-passe-ce-1er-octobre_64864500.html", p: "presse" }
];

window.BLOCUS["39198|Lycée polyvalent Jacques Duhamel"] = [
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/bourgogne-franche-comte/dole_39198/manifestation-sauvage-des-lyceens-a-dole-que-sest-il-passe-ce-1er-octobre_64864500.html", p: "presse" }
];

window.BLOCUS["39198|Lycée professionnel Jacques Prévert"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/bourgogne-franche-comte/dole_39198/manifestation-sauvage-des-lyceens-a-dole-que-sest-il-passe-ce-1er-octobre_64864500.html", p: "presse" }
];

window.BLOCUS["40217|Lycée polyvalent Antoine de Saint-Exupéry"] = [
  { n: "Blocus national, accès filtrant", j: "30/09", z: "2026-09-30", p: "presse", q: "« ont organisé un barrage filtrant devant leur établissement »", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["40284|Lycée Sud des Landes"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« afin d'y organiser un blocus de l'établissement » (légende de photo)", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["40312|Lycée professionnel Ambroise Croizat"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Les élèves ont bloqué les grilles cette nuit » (nuit du 30 au 31/09)", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["41018|Collège Augustin Thierry"] = [
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["41018|Lycée Philibert Dessaignes"] = [
  { n: "Blocus national + rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse", q: "« Plusieurs établissements ont été bloqués […] notamment le lycée Dessaignes à Blois »", m: "sweetfm.fr, 01/10" }
];

window.BLOCUS["41194|Lycée Claude de France"] = [
  { n: "Blocus national + rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse", q: "« bloqué » ; « reconduire le blocage ce vendredi »", m: "sweetfm.fr, 01/10" }
];

window.BLOCUS["41199|Collège Honoré de Balzac"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "presse" }
];

window.BLOCUS["41269|Lycée Ronsard"] = [
  { n: "Blocus, motif non précisé + manifestation", j: "01/10", z: "2026-10-01", l: "https://www.lanouvellerepublique.fr/deux-sevres/direct-mobilisation-lyceenne-la-colere-etudiante-se-poursuit-en-centre-val-de-loire-et-dans-le-poitou-1790835628", p: "à confirmer · presse", q: "« bloqués ou fortement mobilisés » — la formule associe deux statuts différents", m: "sweetfm.fr, 01/10" }
];

window.BLOCUS["42187|Lycée Jean Puy"] = [
  { n: "Blocus, motif non précisé", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« Jusqu'à 200 élèves sont devant le lycée Jean-Puy à Roanne avec des blocages dans d'autres villes » — la phrase peut désigner Roanne ou d'autres villes", m: "actu.fr, 01/10" }
];

window.BLOCUS["42207|Lycée Claude Lebois"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« des blocages dans d'autres villes comme à Saint-Chamond »", m: "actu.fr, 01/10" }
];

window.BLOCUS["42218|Lycée Étienne Mimard"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Des blocus sont en cours, notamment dans le lycée Étienne-Mimard »", m: "actu.fr, 01/10" }
];

window.BLOCUS["42275|Lycée Simone Weil"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« avec des blocages dans d'autres villes comme à Saint-Chamond ou le lycée Simone Weil à Saint-Priest-en-Jarez »", m: "actu.fr, 01/10" }
];

window.BLOCUS["43096|LEGTA de Brioude Bonnefont Saugues - site de Fontannes"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« des centaines d'élèves ont bloqué leurs lycées » ; « la cité scolaire de Brioude lancent l'opération de blocage »", m: "france3-regions.fr ; 63.force-ouvriere.org" }
];

window.BLOCUS["43137|Lycée général et technologique Léonard de Vinci"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« ce mardi 29 septembre, des blocages ont eu lieu devant plusieurs lycées du département. L'un des principaux blocages a été réalisé devant le lycée Léonard-de-Vinci »", m: "rcf.fr, 30/09" }
];

window.BLOCUS["43157|Lycée général et technologique Simone Weil"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Plusieurs dizaines de jeunes ont aussi réalisé un blocage devant le lycée Simone-Weil » ; corroboré par FO 63 (« Situation identique dans des lycées au Puy en Velay »)", m: "rcf.fr, 30/09 ; 63.force-ouvriere.org" }
];

window.BLOCUS["44109|Lycée Clemenceau"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages à Nantes »", m: "ici.fr, 01/10" }
];

window.BLOCUS["44109|Lycée Gabriel Guist'hau"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages à Nantes »", m: "ici.fr, 01/10" }
];

window.BLOCUS["44109|Lycée Nelson Mandela"] = [
  { n: "Blocus national + incidents + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "officiel (préfecture)", q: "« 10:41 Le hall du lycée Nelson Mandela a été entièrement détruit par un incendie volontaire lors du blocage »", m: "tf1info.fr (direct préfecture), 01/10" },
  { n: "Incidents + fermeture administrative (hall incendié)", j: "02/10", z: "2026-10-02", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "presse" }
];

window.BLOCUS["44109|Lycée polyvalent Gaspard Monge - La Chauvinière"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages à Nantes »", m: "ici.fr, 01/10" }
];

window.BLOCUS["44131|Lycée du Pays de Retz"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Bloqué", m: "ici.fr, 01/10" }
];

window.BLOCUS["44143|Lycée Jean Perrin"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs blocages à Nantes »", m: "ici.fr, 01/10" }
];

window.BLOCUS["44184|Lycée Aristide Briand"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Bloqué", m: "ici.fr, 01/10" }
];

window.BLOCUS["45068|Lycée polyvalent Château Blanc"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-agressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["45155|Lycée Bernard Palissy"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-agressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["45155|Lycée professionnel Marguerite Audoux"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-agressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["45169|Lycée polyvalent Maurice Genevoix"] = [
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-agressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["45234|Lycée Charles Péguy"] = [
  { n: "Blocus", j: "28/09, 29/09 et 01/10", z: "2026-09-28;2026-09-29;2026-10-01", l: "https://actu.fr/centre-val-de-loire/orleans_45234/manifestation-des-lyceens-on-n-est-pas-une-generation-de-debiles-blocage-du-lycee-benjamin-franklin-a-orleans_64852294.html", p: "presse" }
];

window.BLOCUS["45234|Lycée polyvalent Benjamin Franklin"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", l: "https://actu.fr/centre-val-de-loire/orleans_45234/manifestation-des-lyceens-on-n-est-pas-une-generation-de-debiles-blocage-du-lycee-benjamin-franklin-a-orleans_64852294.html", p: "presse", q: "« ont bloqué leur établissement » ; plus de 100 élèves, 20 policiers, gaz lacrymogène", m: "actu.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://actu.fr/centre-val-de-loire/orleans_45234/manifestation-des-lyceens-on-n-est-pas-une-generation-de-debiles-blocage-du-lycee-benjamin-franklin-a-orleans_64852294.html", p: "presse", q: "« dès le début du blocus » ; environ 2400 élèves ; 9 interpellations", m: "ici.fr, 01/10" }
];

window.BLOCUS["45234|Lycée polyvalent Jean Zay"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", l: "https://actu.fr/centre-val-de-loire/orleans_45234/manifestation-des-lyceens-on-n-est-pas-une-generation-de-debiles-blocage-du-lycee-benjamin-franklin-a-orleans_64852294.html", p: "à confirmer · presse", q: "« Après un blocage au lycée Jean-Zay, lundi 28 »", m: "la-republique.fr, 28/09" },
  { n: "Blocus", j: "29/09 et 01/10", z: "2026-09-29;2026-10-01", l: "https://actu.fr/centre-val-de-loire/orleans_45234/manifestation-des-lyceens-on-n-est-pas-une-generation-de-debiles-blocage-du-lycee-benjamin-franklin-a-orleans_64852294.html", p: "presse" }
];

window.BLOCUS["45234|Lycée Voltaire"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-agressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["45252|Lycée Duhamel du Monceau"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-aggressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["45284|Lycée Jacques Monod"] = [
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-agressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["45284|Lycée polyvalent Henri Gaudier-Brzeska"] = [
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://actu.fr/centre-val-de-loire/saint-jean-de-braye_45284/blocags-des-lycees-ce-sont-des-casseurs-des-sauvages-le-coup-de-gueule-d-un-maire-du-loiret_64866427.html", p: "presse" }
];

window.BLOCUS["45338|Lycée Durzy"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/brocages-des-lycees-une-proviseure-agressee-des-policiers-blesses-et-plusieurs-interpellations-dans-le-loiret_64865032.html", p: "presse" }
];

window.BLOCUS["46042|Lycée polyvalent Gaston Monnerville"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« blocage de l'entrée »", m: "actu.fr, 01/10" }
];

window.BLOCUS["47001|Lycée Bernard Palissy"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "300 élèves « devant les grilles » ; « c'est un blocus pour que l'on soit entendu »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["47106|Lycée Marguerite Filhol"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« qui bloquent les entrées de l'établissement […] comme ils l'avaient déjà fait mardi »", m: "sudouest.fr, 29/09" },
  { n: "Blocus filtrant", j: "01/10", z: "2026-10-01", p: "presse", q: "« sans totalement bloquer les accès »", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["47157|Lycée polyvalent Val de Garonne"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« jusqu'à 300 lycéens massés devant les grilles » ; « le blocus devrait se poursuivre »", m: "sudouest.fr, 01/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« les lycéens ont bloqué l'entrée de leur établissement ce 2 octobre »", m: "sudouest.fr, 02/10" }
];

window.BLOCUS["47195|Lycée George Sand"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« ont bloqué les entrées et sorties avec des barrières de travaux »", m: "sudouest.fr, 01/10" }
];

window.BLOCUS["48095|Lycée général et technologique Émile Peytavin"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Les grévistes ont installé des poubelles pour bloquer l'accès à l'établissement » (dès 7 h 30)", m: "lalozerenouvelle.com, 01/10" }
];

window.BLOCUS["49007|Lycée Auguste et Jean Renoir"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« À Angers, des blocages partiels ont touché dès le mardi 29 septembre le lycée Chevrollier, situé à la Roseraie, le lycée Auguste et Jean Renoir dans la Doutre, ainsi que le lycée Jean Bodin, aux Ponts-de-Cé »", m: "angers.villactu.fr, 30/09/2026 (OUVERT)" }
];

window.BLOCUS["49007|Lycée David d'Angers"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "FILTRANT — « Barrage filtrant des 7h30 le 1er octobre 2026 ; le proviseur a fermé les portes du lycée peu après 8h » ; titre de source : « Il faut nous écouter : des lycéens bloquent le lycée David-d'Angers »", m: "ouest-france.fr, 01/10/2026 — ARTICULE NON OUVERT (HTTP 403) ; citation via blocus-lycees-umber.vercel.app" }
];

window.BLOCUS["49007|Lycée Joachim du Bellay"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« bloqué — Accès bloqués par plusieurs centaines de lycéens le 1er octobre 2026 à Angers » ; source commune : « Blocage des lycées et des universités à Angers : plusieurs centaines de lycéens mobilisés »", m: "ouest-france.fr, 01/10/2026 — ARTICULE NON OUVERT (HTTP 403)" }
];

window.BLOCUS["49007|Lycée polyvalent Chevrollier"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "FILTRANT — « plusieurs centaines d'élèves, parmi les 2 700 que compte le lycée Chevrollier, ont bloqué l'entrée principale de l'établissement, tout en laissant les élèves qui le souhaitaient entrer par un autre accès »", m: "angers.villactu.fr, 30/09/2026 (OUVERT) ; my-angers.info, 01/10/2026 (OUVERT) : « Mercredi, plusieurs centaines d'élèves avaient bloqué les accès au lycée »" }
];

window.BLOCUS["49015|Lycée professionnel Paul-Émile Victor"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« Un important blocus est signalé ce jeudi matin devant l'établissement » ; « des feux de poubelles et de caddies auraient également été allumés devant le lycée, perturbant l'accès à l'établissement et son fonctionnement »", m: "my-angers.info, 01/10/2026 (OUVERT) — source elle-même prudente : « selon les informations recueillies par notre rédaction », « encore en cours de vérification »" }
];

window.BLOCUS["49099|Lycée polyvalent Fernand Renaudeau"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« symboliquement barrée par des conteneurs à poubelles »", m: "my-angers.info, 02/10" }
];

window.BLOCUS["49246|Lycée Jean Bodin"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« des blocages partiels ont touché dès le mardi 29 septembre […] le lycée Jean Bodin, aux Ponts-de-Cé »", m: "angers.villactu.fr, 30/09/2026 (OUVERT)" }
];

window.BLOCUS["49328|Lycée Duplessis Mornay"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« L'établissement public Duplessis-Mornay est bloqué le 1er octobre 2026 (barrières), plusieurs dizaines de jeunes avec pancartes » ; titre de source : « Les lycéens à Saumur se mobilisent, deux établissements bloqués »", m: "ouest-france.fr, 01/10/2026 (vidéo) — ARTICULE NON OUVERT (HTTP 403)" }
];

window.BLOCUS["50025|Lycée Émile Littré"] = [
  { n: "Rassemblement", j: "30/09", z: "2026-09-30", l: "https://www.paris-normandie.fr/id748927/article/2026-09-30/gaz-lacrymogenes-incendie-garde-vue-ou-en-sont-les-blocus-et-mobilisations", p: "presse" }
];

window.BLOCUS["50099|Lycée Sivard de Beaulieu"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", l: "https://actu.fr/normandie/cherbourg-en-cotentin_50129/on-bloque-plus-personne-ne-rentre-300-eleves-mobilises-au-lycee-millet-a-cherbourg_64851171.html", p: "presse", q: "« ont également formé un blocus dès l'ouverture »", m: "actu.fr, 29/09" }
];

window.BLOCUS["50129|Lycée Alexis de Tocqueville"] = [
  { n: "Rassemblement", j: "29/09", z: "2026-09-29", l: "https://actu.fr/normandie/cherbourg-en-cotentin_50129/on-bloque-plus-personne-ne-rentre-300-eleves-mobilises-au-lycee-millet-a-cherbourg_64851171.html", p: "presse" },
  { n: "Tentative de blocus", j: "01/10", z: "2026-10-01", p: "presse", q: "« une tentative de blocus » (dispersée par les forces de l'ordre)", m: "actu.fr, 01/10" }
];

window.BLOCUS["50129|Lycée Jean-François Millet"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", l: "https://actu.fr/normandie/cherbourg-en-cotentin_50129/on-bloque-plus-personne-ne-rentre-300-eleves-mobilises-au-lycee-millet-a-cherbourg_64851171.html", p: "presse", q: "« On bloque, plus personne ne rentre » ; environ 300 élèves, de 6 h à 15 h", m: "actu.fr, 29/09" }
];

window.BLOCUS["50129|Lycée Victor Grignard"] = [
  { n: "Blocus filtrant", j: "01/10", z: "2026-10-01", l: "https://www.ouest-france.fr/education/direct-blocage-des-lycees-en-normandie-mobilisation-barricades-tensions-la-contestation-sociale-se-poursuit-ba023a99-c62e-46cb-9817-8644560d6b16", p: "presse", q: "Blocus filtrant, environ 200 élèves", m: "actu.fr, 01/10" }
];

window.BLOCUS["50502|Lycée Le Verrier"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", l: "https://actu.fr/normandie/cherbourg-en-cotentin_50129/on-bloque-plus-personne-ne-rentre-300-eleves-mobilises-au-lycee-millet-a-cherbourg_64851171.html", p: "presse", q: "« ont été bloqués dans la matinée »", m: "actu.fr, 29/09" }
];

window.BLOCUS["50502|Lycée polyvalent Curie-Corot"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« ont été bloqués dans la matinée »", m: "actu.fr, 29/09" }
];

window.BLOCUS["51108|Lycée Pierre Bayen"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/en-images-sept-lycees-de-la-marne-et-des-ardennes-perturbes-par-des-manifestations-d-eleves-ce-mercredi-1052304", p: "presse" }
];

window.BLOCUS["51108|Lycée polyvalent Étienne Oehmichen"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/en-images-sept-lycees-de-la-marne-et-des-ardennes-perturbes-par-des-manifestations-d-eleves-ce-mercredi-1052304", p: "presse" }
];

window.BLOCUS["51108|Lycée polyvalent Jean Talon"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/en-images-sept-lycees-de-la-marne-et-des-ardennes-perturbes-par-des-manifestations-d-eleves-ce-mercredi-1052304", p: "presse" }
];

window.BLOCUS["51230|Lycée polyvalent des métiers Stéphane Hessel"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.ici.fr/grand-est/marne-51/en-images-sept-lycees-de-la-marne-et-des-ardennes-perturbes-par-des-manifestations-d-eleves-ce-mercredi-1052304", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/en-images-sept-lycees-de-la-marne-et-des-ardennes-perturbes-par-des-manifestations-d-eleves-ce-mercredi-1052304", p: "presse", q: "« quelques centaines d'étudiants bloquent le lycée Stéphane-Hessel »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["51454|Lycée Clemenceau"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" }
];

window.BLOCUS["51454|Lycée Colbert"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" }
];

window.BLOCUS["51454|Lycée Jean Jaurès"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse", q: "« Des élèves ont bloqué les deux entrées à 8 h » ; cours suspendus", m: "ici.fr, 30/09" },
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" }
];

window.BLOCUS["51454|Lycée Libergier"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« bloquant l'accès au lycée Libergier » ; bacs à poubelles renversés devant la porte d'entrée", m: "france3-regions.fr, 29/09" },
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" }
];

window.BLOCUS["51454|Lycée polyvalent François Arago"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "officiel (préfecture)", q: "Recteur : pas de reprise des cours (cité avec Joliot-Curie)", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["51454|Lycée polyvalent Georges Brière"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" }
];

window.BLOCUS["51454|Lycée polyvalent Saint-Michel"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" }
];

window.BLOCUS["51454|Lycée professionnel Gustave Eiffel"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« dont l'entrée a été obstruée par des conteneurs poubelles »", m: "france3-regions.fr, 30/09" }
];

window.BLOCUS["51454|Lycée professionnel Joliot-Curie"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse", q: "« un blocus a démarré vers 9 h » ; « ont bloqué l'entrée »", m: "ici.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "officiel (préfecture)", q: "Le recteur déclare ne pas pouvoir « assurer la reprise des cours » — preuve institutionnelle", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["51454|Lycée professionnel Raymond Kopa"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" }
];

window.BLOCUS["51454|Lycée Roosevelt"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.ici.fr/grand-est/marne-51/blocages-des-lycees-une-vingtaine-d-etablissements-de-l-academie-de-reims-perturbes-par-des-rassemblements-ce-jeudi-7813180", p: "officiel (préfecture)", q: "Recteur : pas de reprise des cours", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["52121|Lycée polyvalent Charles de Gaulle"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://jhm.fr/le-lycee-bouchardon-a-vecu-sa-premiere-journee-de-mobilisation/", p: "presse" }
];

window.BLOCUS["52121|Lycée polyvalent Edmé Bouchardon"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://jhm.fr/le-lycee-bouchardon-a-vecu-sa-premiere-journee-de-mobilisation/", p: "presse" }
];

window.BLOCUS["52121|Lycée professionnel Eugène Decomble"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://jhm.fr/le-lycee-bouchardon-a-vecu-sa-premiere-journee-de-mobilisation/", p: "presse" }
];

window.BLOCUS["53130|Lycée Ambroise Paré"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plus de 1 150 élèves ont participé à des blocus […] Les principaux établissements concernés sont »", m: "ici.fr, 01/10" }
];

window.BLOCUS["53130|Lycée professionnel Gaston Lesnard"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plus de 1 150 élèves ont participé à des blocus […] Les principaux établissements concernés sont »", m: "ici.fr, 01/10" }
];

window.BLOCUS["53130|Lycée Réaumur"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plus de 1 150 élèves ont participé à des blocus […] Les principaux établissements concernés sont »", m: "ici.fr, 01/10" }
];

window.BLOCUS["53147|Lycée Lavoisier"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Bloqué", m: "ici.fr, 01/10" }
];

window.BLOCUS["53147|Lycée professionnel Léonard de Vinci"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Bloqué", m: "ici.fr, 01/10" }
];

window.BLOCUS["54273|Lycée polyvalent Jean Zay"] = [
  { n: "Blocus national + incidents", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/faits-divers-justice/2026/10/02/blocus-lyceens-feu-et-mortiers-des-debordements-a-jarny", p: "officiel (préfecture)", q: "Liste préfectorale des 12 établissements", m: "préfecture 54 via magnumlaradio.com, 01/10" },
  { n: "Blocus + incidents", j: "02/10", z: "2026-10-02", l: "https://www.republicain-lorrain.fr/faits-divers-justice/2026/10/02/blocus-lyceens-feu-et-mortiers-des-debordements-a-jarny", p: "presse" }
];

window.BLOCUS["54323|Lycée polyvalent Alfred Mézières"] = [
  { n: "Blocus", j: "29/09", z: "2026-09-29", l: "https://france3-regions.franceinfo.fr/grand-est/meurthe-et-moselle/personne-ne-nous-ecoute-a-longwy-la-colere-des-lyceens-s-installe-devant-les-grilles-3425120.html", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/meurthe-et-moselle/personne-ne-nous-ecoute-a-longwy-la-colere-des-lyceens-s-installe-devant-les-grilles-3425120.html", p: "officiel (préfecture)", q: "Liste préfectorale des 12 établissements", m: "préfecture 54 via magnumlaradio.com, 01/10" }
];

window.BLOCUS["54323|Lycée professionnel Darche"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "presse" }
];

window.BLOCUS["54395|Lycée Frédéric Chopin"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "presse", q: "« un feu de poubelle […] mène au lycée Chopin lui aussi bloqué » ; idem liste préfectorale", m: "magnumlaradio.com ; actu.fr, 01/10" }
];

window.BLOCUS["54395|Lycée Henri Loritz"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", l: "https://actu.fr/grand-est/nancy_54395/video-350-eleves-bloquent-un-lycee-au-centre-ville-de-nancy-on-a-le-droit-a-de-l-argent-pour-nos-etudes_64858345.html", p: "presse", q: "« blocage aux abords du lycée Henri Loritz » ; accès bloqué dès 7 h 50, filtrage puis barricades", m: "ici-c-nancy.fr, 30/09" }
];

window.BLOCUS["54395|Lycée Henri Poincaré"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« Blocage matinal au lycée Henri-Poincaré »", m: "francebleu.fr, 29/09" },
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "officiel (préfecture)", q: "Nommé par la préfecture parmi les établissements où « des blocages étaient en cours » (12 établissements)", m: "préfecture 54 via magnumlaradio.com, 01/10" }
];

window.BLOCUS["54526|Lycée Arthur Varoquaux"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Liste préfectorale des 12 établissements", m: "préfecture 54 via magnumlaradio.com, 01/10" }
];

window.BLOCUS["54526|Lycée des métiers des services et du commerce Marie Marvingt"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "presse" }
];

window.BLOCUS["54528|Lycée Louis Majorelle"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "presse" }
];

window.BLOCUS["54547|Lycée Jacques Callot"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/un-policier-touche-par-un-tir-de-mortier-a-saint-avold-suivez-l-evolution-des-manifestations-en-lorraine", p: "à confirmer · officiel (préfecture)", q: "Liste préfectorale des 12 établissements", m: "préfecture 54 via magnumlaradio.com, 01/10" }
];

window.BLOCUS["55029|Lycée professionnel Émile Zola"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Une centaine d'élèves bloque le lycée Zola, à Bar-le-Duc » ; « les élèves barisiens […] bloquent Zola »", m: "estrepublicain.fr, 30/09" }
];

window.BLOCUS["56260|Lycée Charles de Gaulle"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« les lycéens du lycée Charles de Gaulle bloquent l'établissement »", m: "actumorbihan.fr, 29/09" },
  { n: "Blocus national", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", p: "presse", q: "« deux matinées de blocus, mercredi 1er et vendredi 2 octobre 2026 »", m: "ouest-france.fr ; letelegramme.fr — RESERVE DE CALENDRIER : le 01/10/2026 est un JEUDI (le mercredi était le 30/09). La source paraît comporter une erreur de jour de semaine. Dates retenues : 01/10 et 02/10. Voir section 7." }
];

window.BLOCUS["57160|Lycée polyvalent Félix Mayer"] = [
  { n: "Blocus", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.republicain-lorrain.fr/faits-divers-justice/2026/10/02/blocus-lyceens-au-felix-mayer-a-creutzwald-on-n-est-pas-la-pour-casser-mais-pour-etre-entendus", p: "presse" }
];

window.BLOCUS["57206|Lycée Antoine de Saint-Exupéry"] = [
  { n: "Blocus", j: "29/09 et 02/10", z: "2026-09-29;2026-10-02", l: "https://www.franceinfo.fr/economie/greve/nord-val-d-oise-ariege-plus-d-une-centaine-de-lycees-bloques-mardi-en-france_8214575.html", p: "presse" }
];

window.BLOCUS["57227|Collège La Providence"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.radiomelodie.com/a/23394-manifestations-lyceennes-des-tensions-eclatent-entre-jeunes-et-forces-de-lordre-a-forbach", p: "presse" }
];

window.BLOCUS["57227|Lycée Antoine Gapp - Site de Forbach"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.radiomelodie.com/a/23394-manifestations-lyceennes-des-tensions-eclatent-entre-jeunes-et-forces-de-lordre-a-forbach", p: "presse" }
];

window.BLOCUS["57227|Lycée des métiers Blaise Pascal"] = [
  { n: "Rassemblement + incidents", j: "02/10", z: "2026-10-02", l: "https://www.radiomelodie.com/a/23394-manifestations-lyceennes-des-tensions-eclatent-entre-jeunes-et-forces-de-lordre-a-forbach", p: "presse" }
];

window.BLOCUS["57227|Lycée Jean Moulin"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.radiomelodie.com/a/23394-manifestations-lyceennes-des-tensions-eclatent-entre-jeunes-et-forces-de-lordre-a-forbach", p: "presse" }
];

window.BLOCUS["57463|Ensemble scolaire Saint-Étienne - Site Anne de Méjanès (lycée professionnel)"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France", p: "presse" }
];

window.BLOCUS["57463|Lycée Fabert"] = [
  { n: "Blocus + incidents", j: "30/09", z: "2026-09-30", l: "https://www.republicain-lorrain.fr/education/2026/10/02/blocus-des-lycees-la-colere-des-jeunes-ne-flechit-pas", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« la veille, l'établissement fonctionnait normalement. Ce jeudi, le blocage a démarré en tout début de matinée »", m: "france3-regions.fr (direct), 01/10 11 h 33" },
  { n: "Blocus national + incidents", j: "02/10", z: "2026-10-02", l: "https://www.republicain-lorrain.fr/education/2026/10/02/blocus-des-lycees-la-colere-des-jeunes-ne-flechit-pas", p: "presse", q: "« les lycéens qui font bloc devant le lycée Fabert […] poubelles placées face à l'entrée »", m: "republicain-lorrain.fr, 02/10" }
];

window.BLOCUS["57463|Lycée Georges de la Tour"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France", p: "presse" }
];

window.BLOCUS["57463|Lycée Louis Vincent"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.republicain-lorrain.fr/education/2026/09/30/blocus-des-lycees-a-metz-les-eleves-de-louis-vincent-veulent-une-union-de-tous-pour-faire-bouger-les-choses", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/education/2026/09/30/blocus-des-lycees-a-metz-les-eleves-de-louis-vincent-veulent-une-union-de-tous-pour-faire-bouger-les-choses", p: "presse", q: "« Des opérations de blocage des lycées ont eu lieu ce jeudi 1er octobre à Metz […] puis à Louis-Vincent »", m: "republicain-lorrain.fr, 01/10" }
];

window.BLOCUS["57463|Lycée polyvalent Louis de Cormontaigne"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/marne/blocage-des-lycees-vives-tensions-entre-lyceens-et-policiers-a-reims-de-nombreux-etablissements-toujours-bloques-3426384.html", p: "presse" }
];

window.BLOCUS["57606|Lycée des métiers du tertiaire Jean-Victor Poncelet"] = [
  { n: "Blocus + incidents", j: "30/09 et 02/10", z: "2026-09-30;2026-10-02", l: "https://www.republicain-lorrain.fr/education/2026/10/01/blocus-des-lycees-la-situation-se-tend-aux-abords-du-lycee-poncelet-un-policier-touche-par-un-tir-de-mortier", p: "presse" }
];

window.BLOCUS["57606|Lycée des métiers et des technologies innovantes Charles Jully"] = [
  { n: "Blocus + incidents", j: "30/09 et 02/10", z: "2026-09-30;2026-10-02", l: "https://www.republicain-lorrain.fr/social/2026/10/02/a-saint-avold-la-mobilisation-lyceenne-a-bascule-dans-les-heurts", p: "presse" }
];

window.BLOCUS["57630|Lycée polyvalent Charles Mangin"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/blocus-lyceens-a-sarrebourg-les-eleves-manifestent-avec-l-autorisation-du-proviseur", p: "presse" }
];

window.BLOCUS["57630|Lycée professionnel Dominique Labroise"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/social/2026/10/01/blocus-lyceens-a-sarrebourg-les-eleves-manifestent-avec-l-autorisation-du-proviseur", p: "presse" }
];

window.BLOCUS["57631|Lycée des métiers transfrontalier des services aux entreprises Henri Nominé"] = [
  { n: "Blocus + incidents", j: "29/09", z: "2026-09-29", l: "https://www.republicain-lorrain.fr/faits-divers-justice/2026/09/29/poubelles-brulees-un-lyceen-interpelle-par-la-police", p: "presse" }
];

window.BLOCUS["57631|Lycée professionnel Simon Lazard"] = [
  { n: "Rassemblement", j: "29/09", z: "2026-09-29", l: "https://www.republicain-lorrain.fr/faits-divers-justice/2026/09/29/poubelles-brulees-un-lyceen-interpelle-par-la-police", p: "presse" }
];

window.BLOCUS["57672|Lycée des métiers des sciences et des techniques La Briquerie"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/education/2026/10/01/blocus-lyceens-thionville-rejoint-le-mouvement", p: "presse" }
];

window.BLOCUS["57672|Lycée Hélène Boucher"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/education/2026/10/01/blocus-lyceens-thionville-rejoint-le-mouvement", p: "presse" }
];

window.BLOCUS["57672|Lycée polyvalent Rosa Parks"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.republicain-lorrain.fr/education/2026/10/01/blocus-lyceens-thionville-rejoint-le-mouvement", p: "presse" }
];

window.BLOCUS["58079|Lycée polyvalent Romain Rolland"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lejdc.fr/nevers-58000/actualites/ce-qui-change-au-1er-octobre-des-blocus-lyceens-pacifiques-dans-la-nievre-mais-animes-ailleurs-lactu-a-retenir-de-ce-jeudi_15056390/", p: "à confirmer" }
];

window.BLOCUS["58194|Lycée général et technologique Alain Colas"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lejdc.fr/nevers-58000/actualites/ce-qui-change-au-1er-octobre-des-blocus-lyceens-pacifiques-dans-la-nievre-mais-animes-ailleurs-lactu-a-retenir-de-ce-jeudi_15056390/", p: "à confirmer" }
];

window.BLOCUS["58194|Lycée général et technologique Jules Renard"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lejdc.fr/nevers-58000/actualites/ce-qui-change-au-1er-octobre-des-blocus-lyceens-pacifiques-dans-la-nievre-mais-animes-ailleurs-lactu-a-retenir-de-ce-jeudi_15056390/", p: "à confirmer" }
];

window.BLOCUS["58194|Lycée général et technologique Raoul Follereau"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lejdc.fr/nevers-58000/actualites/ce-qui-change-au-1er-octobre-des-blocus-lyceens-pacifiques-dans-la-nievre-mais-animes-ailleurs-lactu-a-retenir-de-ce-jeudi_15056390/", p: "à confirmer" }
];

window.BLOCUS["58194|Lycée professionnel Jean Rostand"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lejdc.fr/nevers-58000/actualites/ce-qui-change-au-1er-octobre-des-blocus-lyceens-pacifiques-dans-la-nievre-mais-animes-ailleurs-lactu-a-retenir-de-ce-jeudi_15056390/", p: "à confirmer" }
];

window.BLOCUS["59008|Lycée professionnel Pierre Joseph Laurent"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59009|Lycée Raymond Queneau"] = [
  { n: "Blocus (Suppression des cours du samedi, réorganisation)", j: "14/09", z: "2026-09-14", l: "https://www.lavoixdunord.fr/1742319/article/2026-10-01/villeneuve-d-ascq-le-lycee-queneau-bloque-par-la-police-lfi-lance-la-polemique", p: "presse", q: "« une vingtaine de jeunes (dont une douzaine d'élèves) ont bloqué la nouvelle entrée de l'établissement » ; proviseur Marc Verplancke : « On ne peut pas laisser une douzaine d'élèves bloquer un établissement de 950 lycéens » ; « on a été contraints d'annuler la plupart des cours »", m: "lavoixdunord.fr, 14/09 17 h 01 (« ce lundi ») — DATE CONTRADICTOIRE, voir section 7 : l'ATP/RTE la date du 15/09" },
  { n: "Tentative de blocus", j: "21/09", z: "2026-09-21", l: "https://www.lavoixdunord.fr/1742319/article/2026-10-01/villeneuve-d-ascq-le-lycee-queneau-bloque-par-la-police-lfi-lance-la-polemique", p: "presse", q: "« Un nouveau et bref blocage, ce lundi matin » ; « L'entrée dans le lycée a été perturbée par une dizaine de personnes, dont seulement trois élèves. Mais dès 9 h, l'accès à Queneau a pu se refaire normalement »", m: "lavoixdunord.fr, 21/09 — NON RÉALISÉ : accès rétabli à 9 h" },
  { n: "Tentative de blocus", j: "28/09", z: "2026-09-28", l: "https://www.lavoixdunord.fr/1742319/article/2026-10-01/villeneuve-d-ascq-le-lycee-queneau-bloque-par-la-police-lfi-lance-la-polemique", p: "presse", q: "tentative de blocage, la porte est restée ouverte", m: "lavoixdunord.fr, 28/09 — NON RÉALISÉ" },
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742319/article/2026-10-01/villeneuve-d-ascq-le-lycee-queneau-bloque-par-la-police-lfi-lance-la-polemique", p: "presse" }
];

window.BLOCUS["59017|Lycée Paul Hazard"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59017|Lycée polyvalent Gustave Eiffel"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59036|Lycée polyvalent Jessé de Forest"] = [
  { n: "Blocus + rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lobservateur.fr/au-tour-lycee-jesse-de-forest-detre-mobilise/", p: "presse" }
];

window.BLOCUS["59122|Lycée Fénelon"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["59122|Lycée Paul Duez"] = [
  { n: "Rassemblement", j: "30/09", z: "2026-09-30", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse" }
];

window.BLOCUS["59122|Lycée professionnel Louis Blériot"] = [
  { n: "Rassemblement", j: "30/09", z: "2026-09-30", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse" }
];

window.BLOCUS["59172|Lycée Alfred Kastler"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59172|Lycée Jules Mousseron"] = [
  { n: "Blocus + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse+officiel" }
];

window.BLOCUS["59178|Lycée Albert Châtelet"] = [
  { n: "Blocus + rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lobservateur.fr/mobilisation-lyceens-douai-sin/", p: "presse" }
];

window.BLOCUS["59178|Lycée polyvalent Élisa Lemonnier"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59183|Lycée professionnel Guy Debeyre"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59286|Lycée polyvalent Beaupré"] = [
  { n: "Blocus + rassemblement + fermeture administrative", j: "30/09 et 02/10", z: "2026-09-30;2026-10-02", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse+officiel" }
];

window.BLOCUS["59295|Institut d'Hazebrouck"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« les manifestations n'ont pas pu retourner en cours » - l'article rapporte que la reprise des cours a été empêchée ; établissement non nommé", m: "lavoixdunord.fr, 02/10 [URL non résoluble - titre + date de source]" }
];

window.BLOCUS["59331|Lycée Dupleix"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lobservateur.fr/au-tour-lycee-jesse-de-forest-detre-mobilise/", p: "presse" }
];

window.BLOCUS["59350|Lycée César Baggio"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« le lycée César Baggio, à Lille, bloqué par ses élèves » (photo AFP)", m: "france24.fr, 29/09" },
  { n: "Blocus national + incidents + fermeture administrative", j: "30/09", z: "2026-09-30", l: "https://www.nordlittoral.fr/299564/article/2026-09-30/calais-lille-roubaix-dunkerque-ou-en-est-la-mobilisation-des-lyceens-ce-mercredi", p: "presse et officiel", q: "« le lycée César-Baggio […] demeurait fermé »", m: "actu.fr, 30/09" },
  { n: "Incidents + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nordlittoral.fr/299564/article/2026-09-30/calais-lille-roubaix-dunkerque-ou-en-est-la-mobilisation-des-lyceens-ce-mercredi", p: "presse+officiel" }
];

window.BLOCUS["59350|Lycée Faidherbe"] = [
  { n: "Blocus filtrant", j: "29/09", z: "2026-09-29", p: "presse", q: "« Trois entrées sur quatre étaient filtrées aux alentours de 8 h »", m: "ici.fr, 29/09" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59350|Lycée Fénelon"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59350|Lycée Gaston Berger"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59350|Lycée international Montebello"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« le blocus organisé par les élèves a entraîné la suspension des cours » (photo AFP)", m: "actu.fr, 29/09" },
  { n: "Blocus national + incidents + fermeture administrative + rassemblement", j: "30/09", z: "2026-09-30", l: "https://www.nordlittoral.fr/299564/article/2026-09-30/calais-lille-roubaix-dunkerque-ou-en-est-la-mobilisation-des-lyceens-ce-mercredi", p: "presse et officiel", q: "« Police et pompiers déployés devant le lycée Montebello » ; blocage reconduit", m: "actu.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Blocage maintenu", m: "actu.fr, 01/10" },
  { n: "Rassemblement + incidents + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nordlittoral.fr/299564/article/2026-09-30/calais-lille-roubaix-dunkerque-ou-en-est-la-mobilisation-des-lyceens-ce-mercredi", p: "presse+officiel" }
];

window.BLOCUS["59350|Lycée Jean Prouvé - Lomme"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59350|Lycée Louis Pasteur"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« un feu de cartons a été allumé devant l'entrée bloquée »", m: "actu.fr ; ici.fr, 29/09" },
  { n: "Rassemblement + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.lavoixdunord.fr/1742371/article/2026-10-01/embrasement-de-la-colere-dans-les-lycees-plus-de-manifestants-plus-de-blesses", p: "presse+officiel" }
];

window.BLOCUS["59350|Lycée professionnel Aimé Césaire"] = [
  { n: "Rassemblement + incidents + fermeture administrative", j: "30/09 et 02/10", z: "2026-09-30;2026-10-02", l: "https://www.nordlittoral.fr/299564/article/2026-09-30/calais-lille-roubaix-dunkerque-ou-en-est-la-mobilisation-des-lyceens-ce-mercredi", p: "presse+officiel" }
];

window.BLOCUS["59350|Lycée professionnel Sonia Delaunay"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59360|Lycée professionnel Maurice Duhamel"] = [
  { n: "Incidents", j: "30/09", z: "2026-09-30", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse" }
];

window.BLOCUS["59378|Lycée Yves Kernanec"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59392|Lycée polyvalent André Lurçat"] = [
  { n: "Blocus + incidents", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lavoixdunord.fr/1742124/article/2026-10-01/la-tension-monte-d-un-cran-dans-les-lycees-de-maubeuge", p: "presse" }
];

window.BLOCUS["59392|Lycée polyvalent Pierre Forest"] = [
  { n: "Blocus + rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742124/article/2026-10-01/la-tension-monte-d-un-cran-dans-les-lycees-de-maubeuge", p: "presse" }
];

window.BLOCUS["59512|Lycée Charles Baudelaire"] = [
  { n: "Tentative de blocus, non réalisée + fermeture administrative", j: "30/09 et 02/10", z: "2026-09-30;2026-10-02", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse+officiel" }
];

window.BLOCUS["59512|Lycée Jean Rostand"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59512|Lycée Maxence Van Der Meersch"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59512|Lycée polyvalent Jean Moulin"] = [
  { n: "Blocus national + incidents + fermeture administrative", j: "30/09", z: "2026-09-30", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse et officiel", q: "« la grille du lycée Jean-Moulin a été partiellement démontée »", m: "lavoixdunord.fr, 30/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Après plusieurs jours de blocus et de dégradations »", m: "lavoixdunord.fr, 01/10" },
  { n: "Blocus + incidents + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse+officiel" }
];

window.BLOCUS["59512|Lycée professionnel Léonard de Vinci"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59512|Lycée professionnel Louis Loucheur"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59512|Lycée professionnel Saint-François d'Assise"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59512|Lycée Saint-Rémi"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59526|Lycée polyvalent Ernest Couteaux"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", l: "https://www.lavoixdunord.fr/1741844/article/2026-09-30/manifs-blocages-tensions-une-vingtaine-de-lycees-nouveau-concernes-ce-mercredi", p: "presse", q: "« Blocage également au lycée Ernest-Couteaux »", m: "lavoixdunord.fr, 30/09" }
];

window.BLOCUS["59560|Lycée professionnel Les Hauts de Flandre"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59569|Lycée Arthur Rimbaud"] = [
  { n: "Rassemblement + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.lobservateur.fr/mobilisation-lyceens-douai-sin/", p: "presse+officiel" }
];

window.BLOCUS["59599|Lycée polyvalent Colbert"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59599|Lycée professionnel Sévigné"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["59606|Lycée de l'Escaut"] = [
  { n: "Blocus + rassemblement", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lobservateur.fr/mouvement-lyceen-incidents-valenciennes/", p: "presse" }
];

window.BLOCUS["59606|Lycée du Hainaut"] = [
  { n: "Incidents", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lobservateur.fr/mouvement-lyceen-incidents-valenciennes/", p: "presse" }
];

window.BLOCUS["59606|Lycée Watteau"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", l: "https://www.lobservateur.fr/mouvement-lyceen-incidents-valenciennes/", p: "presse", q: "« Des barricades et un feu concernaient le lycée Watteau, bloqué »", m: "lavoixdunord.fr, 30/09" }
];

window.BLOCUS["59650|Lycée polyvalent Émile Zola"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nord.gouv.fr/Actualites/Actualites/Mouvements-lyceens-Mesures-prefectorales", p: "officiel" }
];

window.BLOCUS["60057|Lycée Félix Faure"] = [
  { n: "Blocus (Départemental)", j: "02/10", z: "2026-10-02", p: "à confirmer · presse", q: "« À 15 h 30, 730 personnes étaient encore mobilisées et deux lycées demeuraient PERTURBÉS : Pierre-d'Ailly à Compiègne et Félix-Faure à Beauvais » ; « le lendemain, vendredi 2 octobre, LES DIFFÉRENTS BLOCUS ORGANISÉS devant chaque lycée se déroulaient dans le calme »", m: "L'Oise Hebdo, 02/10 et 03/10/2026 (OUVERTS) + ici.fr, 02/10 (OUVERT)" }
];

window.BLOCUS["60157|Lycée Cassini"] = [
  { n: "Blocus (Départemental)", j: "01/10", z: "2026-10-01", p: "à confirmer · officiel (préfecture)", q: "« Les élèves du lycée Cassini de Clermont (Oise) ont rejoint le mouvement de contestation ce jeudi 1er octobre, BLOQUANT L'ÉTABLISSEMENT » ; « Vers 8 heures, la rue Henri-Breuil était fermée à la circulation. Et les élèves N'AVAIENT PAS LA POSSIBILITÉ D'ENTRER dans l'établissement »", m: "L'Oise Hebdo, 01/10/2026 (OUVERT)" },
  { n: "Tentative de blocus", j: "02/10", z: "2026-10-02", p: "à confirmer · presse", q: "« Des jeunes avaient tenté de faire un blocus à l'entrée du lycée, en allumant un feu »", m: "actu.fr, 02/10" }
];

window.BLOCUS["60159|Lycée Pierre d'Ailly"] = [
  { n: "Blocus (Départemental)", j: "02/10", z: "2026-10-02", p: "à confirmer · officiel (préfecture)", q: "« À 15 h 30 […] deux lycées demeuraient perturbés : PIERRE-D'AILLY à Compiègne et Félix-Faure à Beauvais » (bilan provisoire de la préfecture à 15 h 30, 730 personnes encore mobilisées)", m: "L'Oise Hebdo, 02/10/2026 (OUVERT) + ici.fr, 02/10/2026 (OUVERT)" }
];

window.BLOCUS["60395|Lycée Condorcet"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "« Une trentaine d'élèves ont initié un blocus et des feux d'artifices »", m: "evasionfm.com, 28/09" }
];

window.BLOCUS["60471|Lycée Jean Calvin"] = [
  { n: "Blocus (Départemental)", j: "30/09", z: "2026-09-30", p: "à confirmer · presse", q: "FILTRANT — « une bonne partie des élèves est restée devant l'établissement, sous l'œil des forces de l'ordre qui CONTRÔLAIENT L'ACCÈS à l'établissement » ; « Notre rôle a été principalement de permettre aux élèves qui voulaient aller en cours de pouvoir le faire sans heurts »", m: "L'Oise Hebdo, 30/09/2026 (OUVERT)" },
  { n: "Blocus (Départemental)", j: "01/10", z: "2026-10-01", p: "presse", q: "FILTRANT — « Les lycéens et étudiants des lycées général et technologique Jean Calvin et professionnel Charles de Bovelles ont organisé LEUR DEUXIÈME BLOCUS ce jeudi 1er octobre. Un mouvement anticipé, comme hier mercredi, par les forces de l'ordre » ; « un dispositif de FILTRAGE »", m: "L'Oise Hebdo, 01/10/2026 (OUVERT)" }
];

window.BLOCUS["61001|Lycée polyvalent Leclerc - Navarre"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« trois établissements scolaires en cours de blocage à Alençon »", m: "ouest-france.fr ; ici.fr, 01/10" }
];

window.BLOCUS["62041|Lycée Gambetta Carnot"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["62041|Lycée Robespierre"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« l'entrée du lycée Robespierre a été bloquée pendant environ une heure, entre 8 heures et 9 heures »", m: "lavoixdunord.fr, 29/09" }
];

window.BLOCUS["62048|Lycée professionnel Fernand Degrugillier"] = [
  { n: "Blocus + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.lavoixdunord.fr/1742377/article/2026-10-01/proviseur-hospitalise-les-cours-se-feront-en-distanciel-ce-vendredi-au-lycee", p: "presse+officiel" }
];

window.BLOCUS["62065|Lycée polyvalent Pablo Picasso"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742114/article/2026-10-01/blocage-des-lycees-une-femme-de-18-ans-blessee-bully-les-mines-des-incidents", p: "presse" }
];

window.BLOCUS["62119|Lycée général et technologique André Malraux"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["62119|Lycée général et technologique Louis Blaringhem"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["62119|Lycée général privé Saint-Vaast-Saint-Dominique"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["62119|Lycée professionnel Salvador Allende"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["62126|Lycée polyvalent Marguerite Yourcenar"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["62160|Collège privé Saint-Joseph de Navarin"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse", q: "« les lycées (Mariette, Branly, Cazin et Saint-Joseph) sont bloqués pour la première fois » — ligne décomposée : la source nomme les quatre établissements dans une même phrase + idem (même phrase source) + idem (même phrase source) + idem (même phrase source)", m: "lavoixdunord.fr, 01/10" }
];

window.BLOCUS["62160|Lycée général et technologique Mariette"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse", q: "« les lycées (Mariette, Branly, Cazin et Saint-Joseph) sont bloqués pour la première fois » — ligne décomposée : la source nomme les quatre établissements dans une même phrase", m: "lavoixdunord.fr, 01/10" }
];

window.BLOCUS["62160|Lycée polyvalent Édouard Branly"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse", q: "« les lycées (Mariette, Branly, Cazin et Saint-Joseph) sont bloqués pour la première fois » — ligne décomposée : la source nomme les quatre établissements dans une même phrase + idem (même phrase source)", m: "lavoixdunord.fr, 01/10" }
];

window.BLOCUS["62160|Lycée professionnel Jean-Charles Cazin"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse", q: "« les lycées (Mariette, Branly, Cazin et Saint-Joseph) sont bloqués pour la première fois » — ligne décomposée : la source nomme les quatre établissements dans une même phrase + idem (même phrase source) + idem (même phrase source)", m: "lavoixdunord.fr, 01/10" }
];

window.BLOCUS["62178|Lycée polyvalent Carnot"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["62186|Lycée polyvalent Léo Lagrange"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742114/article/2026-10-01/blocage-des-lycees-une-femme-de-18-ans-blessee-bully-les-mines-des-incidents", p: "presse" }
];

window.BLOCUS["62193|Lycée général et technologique Pierre de Coubertin"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« près de 150 lycéens ont bloqué les établissements Coubertin et Sophie-Berthelot »", m: "lavoixdunord.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Après un premier blocage vers 8 heures […] tentative de forcer le portail »", m: "nordlittoral.fr, 01/10" }
];

window.BLOCUS["62193|Lycée général et technologique Sophie Berthelot"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« près de 150 lycéens ont bloqué les établissements Coubertin et Sophie-Berthelot »", m: "lavoixdunord.fr, 29/09" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.nordlittoral.fr/299740/article/2026-10-01/le-lycee-berthelot-ferme-aujourdhui-les-cours-en-distanciel", p: "officiel" }
];

window.BLOCUS["62193|Lycée polyvalent Léonard de Vinci"] = [
  { n: "Rassemblement + incidents", j: "30/09", z: "2026-09-30", l: "https://www.nordlittoral.fr/299564/article/2026-09-30/calais-lille-roubaix-dunkerque-ou-en-est-la-mobilisation-des-lyceens-ce-mercredi", p: "presse" }
];

window.BLOCUS["62193|Lycée professionnel du Détroit"] = [
  { n: "Rassemblement + incidents", j: "30/09", z: "2026-09-30", l: "https://www.nordlittoral.fr/299564/article/2026-09-30/calais-lille-roubaix-dunkerque-ou-en-est-la-mobilisation-des-lyceens-ce-mercredi", p: "presse" }
];

window.BLOCUS["62427|Lycée Fernand Darchicourt"] = [
  { n: "Blocus + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.lavoixdunord.fr/1742114/article/2026-10-01/blocage-des-lycees-une-femme-de-18-ans-blessee-bully-les-mines-des-incidents", p: "presse+officiel" }
];

window.BLOCUS["62427|Lycée polyvalent Louis Pasteur"] = [
  { n: "Incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.nordlittoral.fr/299732/article/2026-10-01/direct-blocus-des-lycees-des-etablissements-du-pas-de-calais-seront-fermes", p: "presse+officiel" }
];

window.BLOCUS["62427|Lycée professionnel Henri Senez"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.lavoixdunord.fr/1742377/article/2026-10-01/proviseur-hospitalise-les-cours-se-feront-en-distanciel-ce-vendredi-au-lycee", p: "presse+officiel" }
];

window.BLOCUS["62498|Lycée Condorcet"] = [
  { n: "Rassemblement + incidents + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742114/article/2026-10-01/blocage-des-lycees-une-femme-de-18-ans-blessee-bully-les-mines-des-incidents", p: "presse+officiel" }
];

window.BLOCUS["62498|Lycée professionnel Maximilien de Robespierre"] = [
  { n: "Blocus + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.lavoixdunord.fr/1742377/article/2026-10-01/proviseur-hospitalise-les-cours-se-feront-en-distanciel-ce-vendredi-au-lycee", p: "presse+officiel" }
];

window.BLOCUS["62510|Lycée Henri Darras"] = [
  { n: "Blocus + rassemblement", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lavoixdunord.fr/1742114/article/2026-10-01/blocage-des-lycees-une-femme-de-18-ans-blessee-bully-les-mines-des-incidents", p: "presse" }
];

window.BLOCUS["62588|Lycée polyvalent Eugène Woillez"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lavoixdunord.fr/1742371/article/2026-10-01/embrasement-de-la-colere-dans-les-lycees-plus-de-manifestants-plus-de-blesses", p: "presse" }
];

window.BLOCUS["62767|Lycée professionnel Pierre Mendès France"] = [
  { n: "Rassemblement", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lavoixdunord.fr/1742176/article/2026-10-01/colere-dans-les-lycees-du-nord-et-pas-de-calais-un-proviseur-hospitalise-une", p: "presse" }
];

window.BLOCUS["63075|Lycée polyvalent Valery Giscard d'Estaing"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Après les blocages aux lycées Murat d'Issoire et Valéry Giscard-d'Estaing à Chamalières »", m: "radioscoop.com, 01/10" }
];

window.BLOCUS["63113|Lycée général Blaise Pascal"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« c'est au tour de plusieurs lycées de Clermont-Ferrand […] d'être bloqués ce jeudi 1er octobre »", m: "radioscoop.com, 01/10" }
];

window.BLOCUS["63113|Lycée général et technologique Ambroise Brugière"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Devant les lycées Sidoine-Apollinaire et Ambroise-Brugière, les élèves bloquent l'accès à l'entrée »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["63113|Lycée général et technologique Sidoine Apollinaire"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Devant les lycées Sidoine-Apollinaire et Ambroise-Brugière, les élèves bloquent l'accès à l'entrée »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["63113|Lycée général Jeanne d'Arc"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« plusieurs jeunes bloquent l'entrée du lycée Jeanne d'Arc »", m: "radioscoop.com, 01/10" }
];

window.BLOCUS["63124|Lycée général et technologique René Descartes"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Le lycée Descartes à Cournon-d'Auvergne est bloqué également »", m: "radioscoop.com, 01/10" }
];

window.BLOCUS["63178|Lycée général et technologique Murat"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« c'est le lycée Murat à Issoire qui a ouvert le bal. Plus de 400 lycéens ont bloqué leur établissement »", m: "63.force-ouvriere.org, 30/09" }
];

window.BLOCUS["64102|Lycée professionnel Paul Bert"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« 150 lycéens ont bloqué le lycée »", m: "larepdespyrenees.fr, 29/09" }
];

window.BLOCUS["64102|Lycée René Cassin"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Le but, bloquer l'entrée du lycée général » (dès 7 h 15, conteneurs)", m: "larepdespyrenees.fr, 01/10" }
];

window.BLOCUS["64430|Lycée Gaston Fébus"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les élèves ont décidé de bloquer une nouvelle fois l'accès »", m: "larepdespyrenees.fr, 01/10" }
];

window.BLOCUS["64445|Lycée professionnel Honoré Baradat"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les premiers blocages […] notamment à Saint-John Perse et Baradat »", m: "larepdespyrenees.fr, 01/10" }
];

window.BLOCUS["64445|Lycée Saint-John-Perse"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« l'entrée du lycée Saint-John Perse, bloquée ce jeudi matin dès 7 h 30 »", m: "larepdespyrenees.fr, 01/10" }
];

window.BLOCUS["64483|Lycée Maurice Ravel"] = [
  { n: "Tentative de blocus", j: "02/10", z: "2026-10-02", p: "presse", q: "« ont tenté de bloquer leur établissement »", m: "larepdespyrenees.fr, 02/10" }
];

window.BLOCUS["65059|Lycée polyvalent Victor Duruy"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture : « quatre blocages connus » ; « le blocage a duré entre 9 h et 12 h »", m: "ici.fr, 01/10" }
];

window.BLOCUS["65258|Lycée général Michelet"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture : « quatre blocages connus »", m: "ici.fr, 01/10" }
];

window.BLOCUS["65286|Lycée des Métiers de l'Arrouza"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture : « quatre blocages connus »", m: "ici.fr, 01/10" }
];

window.BLOCUS["66136|Lycée François Arago"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « Quatre lycées bloqués et une manifestation improvisée » ; photo « blocus du lycée Arago »", m: "lindependant.fr ; actu.fr, 01/10" }
];

window.BLOCUS["66136|Lycée polyvalent Aristide Maillol"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « Quatre lycées bloqués et une manifestation improvisée » ; photo « blocus du lycée Arago » + idem ; liste nominative confirmée par actu.fr", m: "actu.fr, 01/10" }
];

window.BLOCUS["66136|Lycée polyvalent Jean Lurçat"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « Quatre lycées bloqués et une manifestation improvisée » ; photo « blocus du lycée Arago » + idem ; liste nominative confirmée par actu.fr", m: "actu.fr, 01/10" }
];

window.BLOCUS["66136|Lycée polyvalent Pablo Picasso"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Titre : « Quatre lycées bloqués et une manifestation improvisée » ; photo « blocus du lycée Arago » + idem ; liste nominative confirmée par actu.fr", m: "actu.fr, 01/10" }
];

window.BLOCUS["67021|Lycée Édouard Schuré"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.dna.fr/social/2026/10/01/au-lycee-schure-une-centaine-de-jeunes-pas-de-violence-un-echec-et-de-la-deception", p: "presse" }
];

window.BLOCUS["67043|Lycée Marc Bloch"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["67300|Lycée Henri Meck"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["67300|Lycée polyvalent Louis Marchal"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["67437|Lycée Général Leclerc"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.dna.fr/education/2026/10/01/une-bonne-centaine-de-lyceens-dans-la-rue", p: "presse" }
];

window.BLOCUS["67437|Lycée polyvalent du Haut-Barr"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.dna.fr/education/2026/10/01/une-bonne-centaine-de-lyceens-dans-la-rue", p: "presse" }
];

window.BLOCUS["67437|Lycée professionnel Jules Verne"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.dna.fr/education/2026/10/01/une-bonne-centaine-de-lyceens-dans-la-rue", p: "presse" }
];

window.BLOCUS["67462|Lycée Docteur Koeberlé"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lalsace.fr/education/2026/10/01/plusieurs-centaines-de-lyceens-manifestent-devant-leurs-etablissements", p: "presse" }
];

window.BLOCUS["67462|Lycée professionnel Schweisguth"] = [
  { n: "Blocus national + rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lalsace.fr/education/2026/10/01/plusieurs-centaines-de-lyceens-manifestent-devant-leurs-etablissements", p: "presse", q: "« La police est parfois intervenue pour débloquer l'entrée des lycées comme à Sélestat au lycée Schweisguth »", m: "dna.fr, 01/10" }
];

window.BLOCUS["67482|Lycée Fustel de Coulanges"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« n'ont pas pu entrer à 8 h : une vingtaine d'entre eux avait décidé d'en bloquer l'accès » ; intervention police", m: "france3-regions.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« ont eux aussi été bloqués tôt jeudi matin » ; légende : « Le blocage devant le lycée Fustel de Coulanges jeudi 1er octobre »", m: "rue89strasbourg.com, 01/10" }
];

window.BLOCUS["67482|Lycée International les Pontonniers"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse", q: "« ont eux aussi été bloqués tôt jeudi matin »", m: "rue89strasbourg.com, 01/10" }
];

window.BLOCUS["67482|Lycée Jean Monnet"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse", q: "« ont eux aussi été bloqués »", m: "rue89strasbourg.com, 01/10" }
];

window.BLOCUS["67482|Lycée Kléber"] = [
  { n: "Blocus national + incidents", j: "30/09", z: "2026-09-30", l: "https://france3-regions.franceinfo.fr/grand-est/bas-rhin/strasbourg-0/des-heurts-a-strasbourg-entre-lyceens-et-policiers-une-delegation-d-etudiants-vient-grossir-les-rangs-en-centre-ville-3421958.html", p: "presse et officiel", q: "« le lycée Kléber […] a été bloqué comme d'autres dans la ville »", m: "france3-regions.fr, 30/09" },
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/bas-rhin/strasbourg-0/des-heurts-a-strasbourg-entre-lyceens-et-policiers-une-delegation-d-etudiants-vient-grossir-les-rangs-en-centre-ville-3421958.html", p: "presse+officiel" }
];

window.BLOCUS["67482|Lycée Louis Pasteur"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/bas-rhin/strasbourg-0/des-heurts-a-strasbourg-entre-lyceens-et-policiers-une-delegation-d-etudiants-vient-grossir-les-rangs-en-centre-ville-3421958.html", p: "presse" }
];

window.BLOCUS["67482|Lycée Marie Curie"] = [
  { n: "Blocus national + incidents", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/bas-rhin/strasbourg-0/des-heurts-a-strasbourg-entre-lyceens-et-policiers-une-delegation-d-etudiants-vient-grossir-les-rangs-en-centre-ville-3421958.html", p: "presse", q: "« ont eux aussi été bloqués »", m: "rue89strasbourg.com, 01/10" }
];

window.BLOCUS["67482|Lycée polyvalent Jean Geiler"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« bloqué comme d'autres dans la ville »", m: "france3-regions.fr, 30/09" }
];

window.BLOCUS["67482|Lycée polyvalent Jean Rostand"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/bas-rhin/strasbourg-0/des-heurts-a-strasbourg-entre-lyceens-et-policiers-une-delegation-d-etudiants-vient-grossir-les-rangs-en-centre-ville-3421958.html", p: "presse", q: "« ont eux aussi été bloqués »", m: "rue89strasbourg.com, 01/10" }
];

window.BLOCUS["67482|Lycée polyvalent Marcel Rudloff"] = [
  { n: "Blocus national + incidents", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/bas-rhin/strasbourg-0/des-heurts-a-strasbourg-entre-lyceens-et-policiers-une-delegation-d-etudiants-vient-grossir-les-rangs-en-centre-ville-3421958.html", p: "presse et officiel", q: "« le lycée Marcel Rudloff de Hautepierre est lui aussi bloqué »", m: "rue89strasbourg.com, 01/10" }
];

window.BLOCUS["67482|Lycée polyvalent privé Sainte-Clotilde"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« bloqué comme d'autres […] Sainte-Clotilde »", m: "france3-regions.fr, 30/09" }
];

window.BLOCUS["67482|Lycée polyvalent René Cassin"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse", q: "« bloqué comme d'autres […] René Cassin »", m: "france3-regions.fr, 30/09" },
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["68066|Lycée Camille Sée"] = [
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://www.dna.fr/faits-divers-justice/2026/10/01/blocage-des-lycees-des-scenes-de-guerilla-urbane-aux-abords-du-camille-see", p: "presse+officiel" }
];

window.BLOCUS["68112|Lycée polyvalent Théodore Deck"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["68224|Lycée Albert Schweitzer"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« plusieurs eleves interpellés […] suite au blocage du lycée Schweitzer » ; « Le blocus devant le lycée Schweitzer pourrait se poursuivre demain »", m: "france3-regions.fr, 29/09" },
  { n: "Blocus + incidents", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["68224|Lycée Jean Henri Lambert"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["68224|Lycée Louis Armand"] = [
  { n: "Tentative de blocus", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/grand-est/bas-rhin/strasbourg-0/des-heurts-a-strasbourg-entre-lyceens-et-policiers-une-delegation-d-etudiants-vient-grossir-les-rangs-en-centre-ville-3421958.html", p: "presse" }
];

window.BLOCUS["68224|Lycée Michel de Montaigne"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse", q: "« près de 500 lycéens ont bloqué ce matin le lycée Montaigne »", m: "ici.fr, 01/10" }
];

window.BLOCUS["68224|Lycée polyvalent Laurent de Lavoisier"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["68297|Lycée polyvalent Jean Mermoz"] = [
  { n: "Blocus + incidents", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.dna.fr/education/2026/10/01/la-violence-monte-d-un-cran-lors-d-une-nouvelle-journee-de-mobilisation-devant-le-lycee-mermoz", p: "presse" }
];

window.BLOCUS["68334|Lycée Scheurer Kestner"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["68375|Lycée polyvalent Amélie Zurcher"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lalsace.fr/education/2026/09/30/blocages-des-lycees-l-acces-a-plusieurs-etablissements-perturbe-en-alsace", p: "presse" }
];

window.BLOCUS["69010|Lycée professionnel Barthélemy Thimonnier"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69027|Lycée professionnel Gustave Eiffel"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture du Rhône : établissement listé parmi ceux concernés par une opération de blocage (27 au total, dont 5 collèges)", m: "préfecture du Rhône via tf1info.fr, 01/10" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69029|Lycée Jean-Paul Sartre"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69029|Lycée professionnel Émile Béjuit"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69029|Lycée professionnel Tony Garnier"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69034|Lycée professionnel André Cuzin"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69044|Lycée Blaise Pascal"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69091|Lycée polyvalent Aragon-Picasso"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture du Rhône : établissement listé parmi ceux concernés par une opération de blocage (27 au total, dont 5 collèges)", m: "préfecture du Rhône via tf1info.fr (direct), 01/10 08 h 45" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69091|Lycée professionnel Danielle Casanova"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Collège de la cité scolaire internationale"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Collège Victor Schoelcher"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture du Rhône : établissement listé parmi ceux concernés par une opération de blocage (27 au total, dont 5 collèges) + idem ; un collégien blessé", m: "préfecture du Rhône via tf1info.fr, 01/10" }
];

window.BLOCUS["69123|Lycée Ampère"] = [
  { n: "Blocus (cours annulés)", j: "01/10", z: "2026-10-01", l: "https://ampere.ent.auvergnerhonealpes.fr/actualites-lycee/lycee-annulation-des-cours-le-01-10-296272.htm", p: "officiel (établissement, ENT)" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« des centaines d'élèves ont organisé le blocage des lycées Édouard Herriot et Ampère dès le début de matinée »", m: "tribunedelyon.fr, 02/10" }
];

window.BLOCUS["69123|Lycée Antoine de Saint-Exupéry"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée Auguste et Louis Lumière"] = [
  { n: "Blocus + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "presse+officiel (feu dans l'établissement)" }
];

window.BLOCUS["69123|Lycée Colbert"] = [
  { n: "Blocus + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "presse+officiel (feu devant l'établissement)" }
];

window.BLOCUS["69123|Lycée Docteur Charles Mérieux"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée Édouard Herriot"] = [
  { n: "Incidents (heurts)", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "presse" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« des centaines d'élèves ont organisé le blocage des lycées Édouard Herriot et Ampère dès le début de matinée »", m: "tribunedelyon.fr, 02/10" }
];

window.BLOCUS["69123|Lycée International Jean Perrin"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée Juliette Récamier"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée La Martinière Diderot - site Diderot"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée La Martinière Monplaisir"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée Lacassagne"] = [
  { n: "Blocus + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "presse+officiel (feu dans la cité scolaire)" }
];

window.BLOCUS["69123|Lycée polyvalent Édouard Branly"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée polyvalent Hector Guimard"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée professionnel Camille Claudel"] = [
  { n: "Blocus + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "presse+officiel (feu dans l'établissement)" }
];

window.BLOCUS["69123|Lycée professionnel du Premier Film"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée professionnel Jacques de Flesselles"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée professionnel Jean Lurçat"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée professionnel Louise Labé"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69123|Lycée Saint-Just"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69149|Lycée Parc Chabrières"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69149|Lycée professionnel Joseph-Marie Jacquard"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69204|Lycée René Descartes"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69256|Collège Henri Barbusse"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture du Rhône : établissement listé parmi ceux concernés par une opération de blocage (27 au total, dont 5 collèges)", m: "préfecture du Rhône via tf1info.fr, 01/10" }
];

window.BLOCUS["69256|Lycée professionnel les Canuts"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69256|Lycée Robert Doisneau"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69259|Lycée Marcel Sembat"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69259|Lycée polyvalent Jacques Brel"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69266|Collège Jean Jaurès"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture du Rhône : établissement listé parmi ceux concernés par une opération de blocage (27 au total, dont 5 collèges)", m: "préfecture du Rhône via tf1info.fr, 01/10" }
];

window.BLOCUS["69266|Lycée Gilberte et Pierre Brossolette"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69266|Lycée polyvalent Frédéric Faÿs"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69266|Lycée professionnel Magenta"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69266|Lycée professionnel Marie Curie"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69275|Collège Georges Brassens"] = [
  { n: "Incidents (cocktails molotov)", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "presse+officiel" }
];

window.BLOCUS["69275|Lycée polyvalent Charlie Chaplin"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69282|Lycée polyvalent Arnaud Beltrame"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "officiel (préfecture)", q: "Préfecture du Rhône : établissement listé parmi ceux concernés par une opération de blocage (27 au total, dont 5 collèges)", m: "préfecture du Rhône via tf1info.fr, 01/10" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69286|Lycée polyvalent Camus-Sermenaz"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69290|Lycée Condorcet"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["69290|Lycée professionnel Fernand Forest"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-la-liste-des-44-lycees-sans-eleves-vendredi-a-lyon-et-dans-le-rhone-la-prefecture-sort-l-arsenal_64868945.html", p: "officiel (préfecture du Rhône)" }
];

window.BLOCUS["70310|Lycée polyvalent Georges Colomb"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« le Lycée Colomb bloqué ce jeudi matin par environ 200 lycéens »", m: "Les Affiches de la Haute-Saône, 01/10 [URL non résoluble — titre + date]" }
];

window.BLOCUS["70550|Lycée général et technologique Les Haberges"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« le lycée des Haberges et le lycée Belin sont également concernés [bloqués] »", m: "france3-regions.fr, 29/09" }
];

window.BLOCUS["70550|Lycée polyvalent Édouard Belin"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« le lycée des Haberges et le lycée Belin sont également concernés [bloqués] »", m: "france3-regions.fr, 29/09" }
];

window.BLOCUS["71076|Lycée général Pontus de Tyard"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire", p: "presse" }
];

window.BLOCUS["71076|Lycée polyvalent Émiland Gauthey"] = [
  { n: "Tentative de blocus + incidents", j: "30/09", z: "2026-09-30", l: "https://www.lejsl.com/education/2026/09/30/affrontements-lors-du-blocus-des-lycees-que-s-est-il-passe-a-emiland-gauthey", p: "presse", q: "« plusieurs lycéens ont tenté de bloquer » ; « tentative avortée de bloquer »", m: "lejsl.com, 30/09" },
  { n: "Blocus + incidents", j: "01/10", z: "2026-10-01", l: "https://www.lejsl.com/education/2026/09/30/affrontements-lors-du-blocus-des-lycees-que-s-est-il-passe-a-emiland-gauthey", p: "presse" }
];

window.BLOCUS["71076|Lycée polyvalent Hilaire de Chardonnet"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire", p: "presse" }
];

window.BLOCUS["71076|Lycée polyvalent Mathias"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« entre 200 et 300 élèves ont bloqué le lycée Mathias » ; incendie et dispositif policier", m: "lejsl.com, 29/09" },
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire", p: "presse" }
];

window.BLOCUS["71076|Lycée polyvalent Niépce Balleure"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Deux \"blocus\" devant les lycées Mathias et Niépce-Balleure »", m: "lejsl.com, 29/09" },
  { n: "Rassemblement + incidents", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire", p: "presse" }
];

window.BLOCUS["71263|Lycée polyvalent Henri Vincenot"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire", p: "presse" }
];

window.BLOCUS["71270|Lycée général et technologique Lamartine"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire", p: "presse" }
];

window.BLOCUS["71306|Lycée général et technologique Henri Parriat"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Première matinée de blocus au lycée Henri Parriat de Montceau »", m: "lejsl.com, 02/10" }
];

window.BLOCUS["71342|Lycée professionnel Astier"] = [
  { n: "Tentative de blocus", j: "01/10", z: "2026-10-01", l: "https://www.lejsl.com/education/2026/10/01/suivez-la-3e-journee-de-mobilisation-lyceenne-en-saone-et-loire", p: "presse" }
];

window.BLOCUS["72181|Lycée Bellevue"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« environ 200 jeunes étaient rassemblés […] pour bloquer les accès »", m: "ici.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les accès de plusieurs lycées du Mans bloqués » ; « les entrées sont barrées par des poubelles »", m: "ici.fr, 01/10" }
];

window.BLOCUS["72181|Lycée polyvalent Gabriel Touchard - Washington"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Le lycée Touchard-Washington est lui aussi bloqué » (déclaration du chef d'établissement)", m: "ici.fr, 01/10" }
];

window.BLOCUS["75106|Lycée Montaigne"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "presse", q: "« des blocus ont été organisés au lycée Montaigne dans le 6e arrondissement »", m: "actu.fr, 02/10" }
];

window.BLOCUS["75111|Lycée Voltaire"] = [
  { n: "Blocus national + rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.lefigaro.fr/actualite-france/blocage-des-lycees-la-carte-des-etablissements-concernes-20260929", p: "presse", q: "« les blocus se sont poursuivis dans le calme notamment au lycée Voltaire »", m: "actu.fr, 02/10" }
];

window.BLOCUS["75112|Lycée Arago"] = [
  { n: "Blocus (Effectifs)", j: "29/09", z: "2026-09-29", l: "https://www.lefigaro.fr/actualite-france/en-direct-blocus-des-lycees-lyceens-et-etudiants-appellent-ce-jeudi-a-un-acte-deux-de-mobilisation-20261001", p: "officiel (préfecture)", q: "« L'établissement était bloqué mardi matin, a confirmé le rectorat »", m: "actu.fr, 29/09" }
];

window.BLOCUS["75113|LP Gaston Bachelard"] = [
  { n: "Incidents (incendie de l'entrée)", j: "02/10", z: "2026-10-02", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "presse" }
];

window.BLOCUS["75113|Lycée Gabriel Fauré"] = [
  { n: "Blocus", j: "02/10", z: "2026-10-02", l: "https://www.liberation.fr/societe/education/en-direct-blocage-des-lycees-400-etablissements-resteront-fermes-ce-vendredi-selon-le-ministre-de-leducation-20261002_C7IHUUOMLBG65E3QO5KDMG43ZI/", p: "presse (direct)" }
];

window.BLOCUS["75115|Lycée polyvalent Léonard de Vinci"] = [
  { n: "Incidents (feu à la grille d'entrée)", j: "02/10", z: "2026-10-02", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "presse" }
];

window.BLOCUS["75120|Lycée Hélène Boucher"] = [
  { n: "Blocus (Conditions d'étude)", j: "29/09", z: "2026-09-29", p: "presse", q: "« une quarantaine de jeunes font barrage à l'entrée du lycée Hélène-Boucher »", m: "leparisien.fr, 29/09 (chapeau)" }
];

window.BLOCUS["76057|Lycée professionnel Auguste Bartholdi"] = [
  { n: "Rassemblement + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "presse+officiel" }
];

window.BLOCUS["76057|Lycée Thomas Corneille"] = [
  { n: "Rassemblement + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "presse+officiel" }
];

window.BLOCUS["76216|Lycée de la Vallée du Cailly"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76217|Lycée Jehan Ango"] = [
  { n: "Rassemblement + fermeture administrative", j: "30/09, 01/10 et 02/10", z: "2026-09-30;2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/havre/plusieurs-lycees-bloques-au-havre-et-a-dieppe-des-echauffourees-avec-les-forces-de-l-ordre-des-eleves-confines-3425640.html", p: "presse+officiel" }
];

window.BLOCUS["76217|Lycée Pablo Neruda"] = [
  { n: "Rassemblement + fermeture administrative", j: "30/09, 01/10 et 02/10", z: "2026-09-30;2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/havre/plusieurs-lycees-bloques-au-havre-et-a-dieppe-des-echauffourees-avec-les-forces-de-l-ordre-des-eleves-confines-3425640.html", p: "presse+officiel" }
];

window.BLOCUS["76217|Lycée polyvalent du Golf"] = [
  { n: "Rassemblement + fermeture administrative", j: "30/09, 01/10 et 02/10", z: "2026-09-30;2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/havre/plusieurs-lycees-bloques-au-havre-et-a-dieppe-des-echauffourees-avec-les-forces-de-l-ordre-des-eleves-confines-3425640.html", p: "presse+officiel" }
];

window.BLOCUS["76217|Lycée professionnel Émulation Dieppoise"] = [
  { n: "Rassemblement + fermeture administrative", j: "30/09, 01/10 et 02/10", z: "2026-09-30;2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/havre/plusieurs-lycees-bloques-au-havre-et-a-dieppe-des-echauffourees-avec-les-forces-de-l-ordre-des-eleves-confines-3425640.html", p: "presse+officiel" }
];

window.BLOCUS["76231|Lycée André Maurois"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76231|Lycée des métiers Ferdinand Buisson"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76276|Lycée Delamare-Deboutteville"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.paris-normandie.fr/id748927/article/2026-09-30/gaz-lacrymogenes-incendie-garde-vue-ou-en-sont-les-blocus-et-mobilisations", p: "presse" }
];

window.BLOCUS["76319|Lycée professionnel Fernand Léger"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76322|Lycée professionnel Val de Seine"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76322|Lycée Val de Seine"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Bloqué", m: "ici.fr, 01/10" }
];

window.BLOCUS["76351|Lycée Antoine-Laurent de Lavoisier"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76351|Lycée Claude Monet"] = [
  { n: "Blocus national + incidents + fermeture administrative + rassemblement", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse et officiel", q: "Bloqué", m: "ici.fr, 01/10" },
  { n: "Rassemblement + incidents + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76351|Lycée François 1er"] = [
  { n: "Blocus + fermeture administrative", j: "30/09 et 02/10", z: "2026-09-30;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/havre/plusieurs-lycees-bloques-au-havre-et-a-dieppe-des-echauffourees-avec-les-forces-de-l-ordre-des-eleves-confines-3425640.html", p: "presse+officiel" },
  { n: "Blocus filtrant + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/havre/plusieurs-lycees-bloques-au-havre-et-a-dieppe-des-echauffourees-avec-les-forces-de-l-ordre-des-eleves-confines-3425640.html", p: "presse et officiel", q: "Barrage filtrant", m: "ici.fr, 01/10" }
];

window.BLOCUS["76351|Lycée Françoise de Grâce"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76351|Lycée général et technologique Jules Siegfried"] = [
  { n: "Rassemblement + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76351|Lycée Jules Le Cesne"] = [
  { n: "Rassemblement + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76351|Lycée Porte Océane"] = [
  { n: "Rassemblement + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76351|Lycée privé Saint-Joseph"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76351|Lycée privé Saint-Vincent-de-Paul"] = [
  { n: "Incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.tendanceouest.com/actualite-443020-le-havre-au-lycee-saint-vincent-de-paul-la-facade-endommagee-par-un-feu-de-poubelle", p: "presse+officiel" }
];

window.BLOCUS["76351|Lycée Schuman-Perret"] = [
  { n: "Blocus national + incidents + fermeture administrative", j: "30/09", z: "2026-09-30", l: "https://www.paris-normandie.fr/id748829/article/2026-09-30/lycee-schuman-perret-au-havre-des-echauffourees-entre-la-police-et-des-eleves", p: "presse et officiel", q: "Blocage, poubelles incendiées, 2 interpellations", m: "france3-regions.fr, 30/09" },
  { n: "Blocus national + incidents + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.paris-normandie.fr/id748829/article/2026-09-30/lycee-schuman-perret-au-havre-des-echauffourees-entre-la-police-et-des-eleves", p: "presse et officiel", q: "Bloqué ; 2 proviseurs blessés", m: "ici.fr, 01/10" },
  { n: "Blocus + incidents + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.paris-normandie.fr/id748829/article/2026-09-30/lycee-schuman-perret-au-havre-des-echauffourees-entre-la-police-et-des-eleves", p: "presse+officiel" }
];

window.BLOCUS["76384|Lycée Guillaume Le Conquérant"] = [
  { n: "Rassemblement + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "presse+officiel" }
];

window.BLOCUS["76410|Lycée professionnel Bernard Palissy"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76447|Lycée Jean Prévost"] = [
  { n: "Rassemblement + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "presse+officiel" }
];

window.BLOCUS["76475|Lycée Galilée"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Bloqué ; portail démonté", m: "ici.fr, 01/10" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76498|Lycée Élisa Lemonnier"] = [
  { n: "Incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "presse+officiel" }
];

window.BLOCUS["76498|Lycée professionnel Jean-Baptiste Colbert"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76540|Lycée Blaise Pascal"] = [
  { n: "Blocus + incidents", j: "29/09 et 30/09", z: "2026-09-29;2026-09-30", l: "https://www.paris-normandie.fr/id748927/article/2026-09-30/gaz-lacrymogenes-incendie-garde-vue-ou-en-sont-les-blocus-et-mobilisations", p: "presse" },
  { n: "Blocus national + incidents", j: "01/10", z: "2026-10-01", l: "https://www.paris-normandie.fr/id748927/article/2026-09-30/gaz-lacrymogenes-incendie-garde-vue-ou-en-sont-les-blocus-et-mobilisations", p: "presse", q: "Bloqué ; incendie", m: "ici.fr, 01/10" }
];

window.BLOCUS["76540|Lycée Camille Saint-Saens"] = [
  { n: "Blocus national + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/blocags-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse et officiel", q: "Bloqué", m: "ici.fr, 01/10" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocags-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76540|Lycée Gustave Flaubert"] = [
  { n: "Fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76540|Lycée Jeanne d'Arc"] = [
  { n: "Blocus national + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse et officiel", q: "Bloqué", m: "ici.fr, 01/10" },
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76540|Lycée Pierre Corneille"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "à confirmer" }
];

window.BLOCUS["76540|Lycée professionnel Grieu"] = [
  { n: "Fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://actu.fr/societe/blocages-incendies-blesses-quel-bilan-apres-les-soulevements-a-rouen-et-au-havre-et-quels-lycees-sont-fermes_64865631.html", p: "presse+officiel" }
];

window.BLOCUS["76575|Lycée Le Corbusier"] = [
  { n: "Blocus + incidents + fermeture administrative", j: "30/09 et 02/10", z: "2026-09-30;2026-10-02", l: "https://actu.fr/normandie/rouen_76540/blocus-des-lycees-a-rouen-et-au-havre-apres-10-interpellations-la-prefecture-appelle-a-un-dialogue-democratique_64862019.html", p: "presse+officiel" }
];

window.BLOCUS["76681|Lycée Les Bruyères"] = [
  { n: "Fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://france3-regions.franceinfo.fr/normandie/seine-maritime/rouen/blocage-des-lyceens-quels-sont-les-etablissements-fermes-par-le-rectorat-ce-vendredi-en-normandie-3426609.html", p: "officiel" }
];

window.BLOCUS["76681|Lycée Marcel Sembat"] = [
  { n: "Blocus national + fermeture administrative", j: "01/10", z: "2026-10-01", l: "https://www.paris-normandie.fr/id748927/article/2026-09-30/gaz-lacrymogenes-incendie-garde-vue-ou-en-sont-les-blocus-et-mobilisations", p: "presse et officiel", q: "Bloqué", m: "ici.fr, 01/10" },
  { n: "Blocus + fermeture administrative", j: "02/10", z: "2026-10-02", l: "https://www.paris-normandie.fr/id748927/article/2026-09-30/gaz-lacrymogenes-incendie-garde-vue-ou-en-sont-les-blocus-et-mobilisations", p: "presse+officiel" }
];

window.BLOCUS["76758|Lycée privé Jean XXIII"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.lecourriercauchois.fr/actualite-404954-yvetot-les-lyceens-poursuivent-les-manifestations", p: "presse" }
];

window.BLOCUS["76758|Lycée Raymond Queneau"] = [
  { n: "Blocus + rassemblement", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://www.paris-normandie.fr/id749068/article/2026-10-01/manifestation-lyceenne-yvetot-le-blocage-du-lycee-queneau-sans-violence-ni", p: "presse" }
];

window.BLOCUS["77108|Lycée Gaston Bachelard"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« devant le lycée Bachelard de Chelles, un nouveau blocus était organisé »", m: "actu.fr, 30/09" }
];

window.BLOCUS["77183|Lycée Samuel Beckett"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« ont organisé un blocus devant leur établissement […] empêcher l'accès »", m: "actu.fr, 29/09" }
];

window.BLOCUS["77243|Lycée Van Dongen"] = [
  { n: "Tentative de blocus", j: "28/09", z: "2026-09-28", p: "presse", q: "« près de 200 lycéens ont tenté de bloquer le lycée Van Dongen »", m: "actu.fr, 28/09" }
];

window.BLOCUS["77251|Etablissement Expérimental Micro-Lycée de Sénart"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "« Plusieurs lycées seine-et-marnais se sont retrouvés bloqués hier […] C'était le cas à Roissy-en-Brie, Coulommiers, Provins et Rozay-en-Brie »", m: "evasionfm.com, 29/09/2026 (OUVERT) — commune nommée, établissement NON nommé par la source" },
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Des établissements sont resté bloqués : 150 personnes se sont rassemblées à Melun »", m: "evasionfm.com, 29/09/2026 (OUVERT) — commune nommée, établissement NON nommé" }
];

window.BLOCUS["77284|Lycée Henri Moissan"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "FILTRANT — « Dès 6 h du matin, des lycéens étaient postés devant l'entrée de l'établissement » (piquet de filtrage, non un blocage total)", m: "actu.fr / La Marne, 01/10/2026 (OUVERT)" }
];

window.BLOCUS["77284|Lycée Pierre de Coubertin"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« Au plus fort du blocus, 300 jeunes étaient rassemblés devant le lycée Coubertin de Meaux » — l'article employant le mot « blocus », mais décrivant une massation devant l'entrée", m: "actu.fr / La Marne, 29/09/2026 (OUVERT)" }
];

window.BLOCUS["77350|Lycée professionnel Lino Ventura"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« On savait qu'un blocus était prévu […] en prévision du blocage »", m: "actu.fr, 29/09" }
];

window.BLOCUS["77487|Lycée polyvalent Simone Signoret"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Le blocus des élèves du lycée Simone-Signoret de Vaux-le-Pénil a également été perturbé »", m: "actu.fr, 29/09" }
];

window.BLOCUS["78335|Lycée Condorcet"] = [
  { n: "Blocus (USL, EDT, Parcoursup)", j: "29/09", z: "2026-09-29", p: "presse", q: "« Les lycéens ont répondu présents […] bloquer l'accès aux lieux » ; feu au portail d'entrée", m: "actu.fr, 29/09" }
];

window.BLOCUS["78361|Lycée Saint-Exupéry"] = [
  { n: "Blocus (Égalité des chances)", j: "29/09", z: "2026-09-29", p: "presse", q: "« un groupe d'une grosse dizaine […] a décidé de bloquer le lycée »", m: "paris-normandie.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« après un blocus du lycée Saint-Exupéry »", m: "actu.fr, 01/10" }
];

window.BLOCUS["78498|Lycée Le Corbusier"] = [
  { n: "Blocus (Bâtiment, manques)", j: "29/09", z: "2026-09-29", p: "presse", q: "« ont bloqué l'entrée de leur établissement, ce mardi 29 septembre 2026 »", m: "actu.fr, 29/09" }
];

window.BLOCUS["78517|Lycée Louis Bascan"] = [
  { n: "Blocus (Parcoursup, moyens)", j: "29/09", z: "2026-09-29", p: "presse", q: "« Un blocus est organisé par une centaine de jeunes »", m: "actu.fr, 29/09" }
];

window.BLOCUS["79191|Lycée Paul Guérin"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Le blocus du lycée niortais Paul-Guerin s'est transformé en blocage improvisé de l'avenue de Limoges »", m: "ouest-france.fr, 02/10" }
];

window.BLOCUS["79202|Lycée Ernest Pérochon"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les élèves du lycée Ernest-Pérochon […] organisant le premier blocus de leur établissement » (dès 7 h 20)", m: "lanouvellerepublique.fr, 01/10" }
];

window.BLOCUS["80001|Lycée Boucher de Perthes"] = [
  { n: "Tentative de blocus", j: "30/09", z: "2026-09-30", p: "à confirmer · presse", q: "« Après une TENTATIVE DE BLOCAGE RATÉE devant leur établissement la veille, environ 200 élèves du lycée Boucher-de-Perthes d'Abbeville (Somme) manifestent ce jeudi 1er octobre 2026 ». Date déduite du « la veille » rapporté au 01/10 : l'article ne la date pas explicitement", m: "actu.fr / Le Journal d'Abbeville (Yann Defacque), publié 01/10/2026 11h35 (OUVERT)" }
];

window.BLOCUS["80021|Lycée Jean-Baptiste Delambre"] = [
  { n: "Blocus (Départemental)", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« DES BLOCAGES à la cité scolaire et au lycée Delambre » ; « tous les élèves de Michelis et de Robert de Luzarches se sont ensuite dirigés de la cité scolaire Delambre-Montaigne, DONT LES COURS SONT ANNULÉS pour la journée » ; « au lycée Delambre […] quelques 200 élèves se sont rassemblés », une élève a été blessée dans l'explosion d'un feu allumé par les jeunes ; « le BLOCAGE COORDONNÉ de plusieurs établissements scolaires […] notamment à la cité scolaire et au lycée Delambre »", m: "ici.fr, 01/10/2026 (OUVERT) + picardieweb.com, 01/10/2026 (OUVERT)" }
];

window.BLOCUS["80021|Lycée Louis Thuillier"] = [
  { n: "Blocus (Départemental)", j: "01/10", z: "2026-10-01", p: "presse", q: "« Devant le lycée Louis Thuillier, au sud d'Amiens, environ 200 élèves ONT BLOQUÉ L'ENTRÉE de l'établissement et ont mis le feu à quelques poubelles » ; 7 cars de gendarmerie et des policiers intervenus", m: "ici.fr / France Bleu Picardie, 01/10/2026 9h19 (OUVERT)" }
];

window.BLOCUS["80021|Lycée Madeleine Michelis"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Les entrées du lycée Madeleine-Michelis sont également bloquées »", m: "courrier-picard.fr, 02/10" }
];

window.BLOCUS["80021|Lycée polyvalent La Hotoie"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "à confirmer · presse", q: "« dont l'entrée est bloquée depuis le petit matin par des élèves » ; le proviseur précise « on ne peut pas vraiment parler de blocage total »", m: "courrier-picard.fr, 30/09" }
];

window.BLOCUS["80021|Lycée Robert de Luzarches"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "Blocus ; cours non tenus", m: "franceinfo.fr ; evasionfm.com, 30/09" }
];

window.BLOCUS["81004|Lycée général Lapérouse"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« poubelles et barrières condamnent le portail » (vers 10 h) ; titre : « bloquent plusieurs établissements à Albi »", m: "ladepeche.fr, 01/10" }
];

window.BLOCUS["81004|Lycée polyvalent Louis Rascol"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "Poubelles et barrières de chantier devant les grilles (vers 9 h)", m: "ladepeche.fr, 01/10" }
];

window.BLOCUS["81065|Lycée polyvalent La Borde Basse"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« l'accès a été bloqué par près de 300 élèves » ; le personnel a dû dégager les obstacles ; un élève prend feu", m: "letarnlibre.com, 01/10" }
];

window.BLOCUS["82033|Lycée polyvalent Jean de Prades"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "Environ 300 élèves ; « le blocage n'a pas duré »", m: "ladepeche.fr, 01/10" }
];

window.BLOCUS["83023|Lycée Raynouard"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« après le blocage du lycée Raynouard ce jeudi matin avec environ 350 élèves »", m: "ici.fr, 01/10" }
];

window.BLOCUS["83050|Lycée Jean Moulin"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Une partie des élèves bloquent ce mercredi matin l'accès au lycée Jean-Moulin »", m: "nicematin.com, 30/09" }
];

window.BLOCUS["83061|Lycée Albert Camus"] = [
  { n: "Tentative de blocus", j: "01/10", z: "2026-10-01", p: "presse", q: "« mettant fin à la tentative de blocage en cours depuis le début de la matinée »", m: "nicematin.com, 01/10" }
];

window.BLOCUS["83061|Lycée professionnel Galliéni"] = [
  { n: "Tentative de blocus", j: "01/10", z: "2026-10-01", p: "presse", q: "« mettant fin à la tentative de blocage en cours depuis le début de la matinée »", m: "nicematin.com, 01/10" }
];

window.BLOCUS["83069|Lycée Costebelle"] = [
  { n: "Tentative de blocus", j: "01/10", z: "2026-10-01", p: "presse", q: "« quelques dizaines de lycéeens ont tenté de bloquer l'établissement mais celui-ci est resté accessible »", m: "nicematin.com, 01/10" }
];

window.BLOCUS["83069|Lycée professionnel Golf-Hôtel"] = [
  { n: "Tentative de blocus", j: "01/10", z: "2026-10-01", p: "presse", q: "« un début de matinée un peu agité avec des tentatives de blocage »", m: "nicematin.com, 01/10" }
];

window.BLOCUS["83072|Lycée Thomas Edison"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "« Plus de 200 élèves […] ont fait blocus ce lundi 28 septembre »", m: "nicematin.com, 29/09" },
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« plus de 100 jeunes devant le lycée […] pour bloquer les abords »", m: "nicematin.com, 29/09" },
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« Plus de 200 élèves devant le lycée »", m: "nicematin.com, 30/09" }
];

window.BLOCUS["83126|Lycée Paul Langevin"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Des élèves ont empêché l'accès à l'établissement »", m: "varactu.fr, 29/09" }
];

window.BLOCUS["83137|Lycée Bonaparte"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« bloqués pendant environ une heure » ; « Aucune personne ne peut rentrer »", m: "nicematin.com, 01/10" }
];

window.BLOCUS["83137|Lycée Dumont d'Urville"] = [
  { n: "Tentative de blocus", j: "29/09", z: "2026-09-29", p: "presse", q: "« Des lycéens ont tenté de bloquer l'accès »", m: "varactu.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« ont été bloqués pendant environ une heure »", m: "lamarseillaise.fr, 01/10" }
];

window.BLOCUS["83137|Lycée professionnel Claret"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« un blocus était organisé au lycée Claret » ; environ 100 élèves", m: "nicematin.com, 30/09" }
];

window.BLOCUS["83137|Lycée professionnel du Parc Saint-Jean"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« ont été bloqués pendant environ une heure »", m: "lamarseillaise.fr, 01/10" }
];

window.BLOCUS["83137|Lycée professionnel Georges Cisson"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "« Une action comparable avait déjà été signalée la veille, lundi 28 septembre, devant le lycée professionnel Georges-Cisson » — rétrospectif", m: "varactu.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "Élèves dispersés devant le lycée", m: "lamarseillaise.fr, 01/10" }
];

window.BLOCUS["83137|Lycée Rouvière Suzanne Lefort-Rouquette"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« ont été bloqués pendant environ une heure »", m: "lamarseillaise.fr, 01/10" }
];

window.BLOCUS["84007|Collège Saint-Jean-Baptiste de la Salle"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Ce mardi matin encore des barrières bloquent l'entrée du lycée Jean-baptiste Dumas »", m: "laprovence.com, 29/09" }
];

window.BLOCUS["84007|Lycée polyvalent Philippe de Girard"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« une quarantaine de policiers engagés devant le lycée Philippe de Girard » ; unités CRS", m: "laprovence.com, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« BLOCUS AU LYCÉE PHILIPPE DE GIRARD À AVIGNON : TENSIONS AVEC LES CRS »", m: "youtube.com, 01/10" }
];

window.BLOCUS["84031|Lycée polyvalent Victor Hugo"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Le blocus du lycée Victor-Hugo à Carpentras se déplace vers le marché »", m: "ledauphine.com, 02/10" }
];

window.BLOCUS["84087|Lycée de l'Arc"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "Légende : « Blocus d'un lycée à Orange, le 29 septembre 2026 »", m: "franceinfo.fr, 29/09" }
];

window.BLOCUS["86194|Lycée Aliénor d'Aquitaine"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« Après avoir organisé un blocus de plusieurs établissements (Nelson-Mandela […] Réaumur, Aliénor-d'Aquitaine, Victor-Hugo) »", m: "le7.info, 01/10" }
];

window.BLOCUS["86194|Lycée polyvalent Nelson Mandela"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« Les entrées du lycée Nelson-Mandela ont été bloquées par des barrières de chantier, des chariots et des poubelles » (près de 300 élèves avant 8 h)", m: "lanouvellerepublique.fr, 29/09" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« Après avoir organisé un blocus de plusieurs établissements (Nelson-Mandela […] Réaumur, Aliénor-d'Aquitaine, Victor-Hugo) »", m: "le7.info, 01/10" }
];

window.BLOCUS["86194|Lycée professionnel Réaumur"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« Après avoir organisé un blocus de plusieurs établissements (Nelson-Mandela […] Réaumur, Aliénor-d'Aquitaine, Victor-Hugo) »", m: "le7.info, 01/10" }
];

window.BLOCUS["86194|Lycée Victor Hugo"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« Plusieurs lycées de la Vienne et des Deux-Sèvres ont été bloqués mardi, notamment le lycée Victor Hugo de Poitiers »", m: "titrespresse.com (via France Bleu), 29/09" },
  { n: "Blocus filtrant", j: "01/10", z: "2026-10-01", p: "presse", q: "« la majeure partie a pu entrer en cours par la petite porte »", m: "le7.info, 01/10" }
];

window.BLOCUS["87085|Lycée Gay-Lussac"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« les lycéens limougeauds ont bloqué les accès du lycée Gay-Lussac »", m: "france3-regions.fr, 01/10" }
];

window.BLOCUS["87085|Lycée polyvalent Suzanne Valadon"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Les élèves des lycées Limosin, Renoir et Gay-Lussac ont bloqué l'entrée de l'établissement » (à Valadon)", m: "france3-regions.fr, 01/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« L'entrée principale a été bloquée »", m: "france3-regions.fr, 02/10" }
];

window.BLOCUS["88160|Lycée des métiers des sciences et de l'industrie Pierre Mendès France"] = [
  { n: "Blocus", j: "30/09 et 01/10", z: "2026-09-30;2026-10-01", l: "https://www.vosgesmatin.fr/education/2026/10/01/plusieurs-lycees-bloques-dans-le-departement-des-centaines-de-lyceens-mobilises", p: "presse" }
];

window.BLOCUS["88160|Lycée Louis Lapicque"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.vosgesmatin.fr/education/2026/10/01/plusieurs-lycees-bloques-dans-le-departement-des-centaines-de-lyceens-mobilises", p: "presse" },
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://www.vosgesmatin.fr/education/2026/10/01/plusieurs-lycees-bloques-dans-le-departement-des-centaines-de-lyceens-mobilises", p: "presse", q: "« Ce jeudi matin, on dénombre 500 lycéens qui bloquent leur lycée »", m: "vosgesmatin.fr, 01/10 09 h 55" },
  { n: "Tentative de blocus", j: "02/10", z: "2026-10-02", p: "presse", q: "« devant le lycée Louis-Lapicque, des lycéens ont pu rentrer à 8 h avant que certains ne tentent de monter un petit barrage devant la grille »", m: "vosgesmatin.fr, 02/10" }
];

window.BLOCUS["88321|Lycée des métiers des arts de l'habitat et de l'ameublement Pierre et Marie Curie"] = [
  { n: "Blocus", j: "30/09", z: "2026-09-30", l: "https://www.vosgesmatin.fr/education/2026/10/01/plusieurs-lycees-bloques-dans-le-departement-des-centaines-de-lyceens-mobilises", p: "presse" },
  { n: "Blocus (Moyens pour l Éducation nationale, professeurs non remplacés)", j: "01/10", z: "2026-10-01", l: "https://www.vosgesmatin.fr/education/2026/10/01/plusieurs-lycees-bloques-dans-le-departement-des-centaines-de-lyceens-mobilises", p: "officiel (préfecture)", q: "«Jeudi 1er octobre, dés 7 h 30 du matin, prés de 200 collégiens et lycéens se sont rassemblés devant la cité scolaire Pierre-et-Marie-Curie de Neufchâteau. Ils ont décidé de bloquer leur établissement devant les deux entrées rue Jules-Ferry et rue Victor-Martin. » Pétards, pancartes, Marseillaise ; à 15 h 50 déplacement devant la sous-préfecture (place des Cordeliers) avec fumigénes et pétards", m: "jhm.fr, 02/10 (article OUVERT ; action datée 01/10) — les DEUX entrées bloquées, accés pleinement empéché. RETIRè de la section 6A où il avait été classé à tort comme simple mobilisation" }
];

window.BLOCUS["89024|Lycée polyvalent Fourier Saint-Germain"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "presse", q: "« Environ 200 élèves de plusieurs établissements ont bloqué le lycée Fourier à Auxerre, ce jeudi 1er octobre 2026 » ; « les portes de l'établissement avaient été bloquées par plusieurs poubelles et les élèves restés à l'intérieur du lycée étaient appelés à les rejoindre »", m: "lyonne.fr (L'Yonne Républicaine), 01/10/2026 12h45 (OUVERT) — CORRECTION 04/10 : le 89 était à tort classé « sans blocus ». Nom officiel retenu : « Lycée polyvalent Fourier Saint-Germain » (UAI 0890005X) ; la presse écrit « lycée Fourier » et, pour ici.fr, « lycée Joseph-Fourier »" }
];

window.BLOCUS["89387|Lycée professionnel Pierre et Marie Curie"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "presse", q: "TENTATIVE — « Des élèves tentent de bloquer l'entrée du lycée, pendant que le proviseur, Franck Cucheval essaie de dialoguer avec eux »", m: "lyonne.fr, 28/09/2026 13h48 (OUVERT, extrait gratuit)" }
];

window.BLOCUS["90010|Lycée général et technologique Condorcet"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/", p: "presse" }
];

window.BLOCUS["90010|Lycée général et technologique Gustave Courbet"] = [
  { n: "Rassemblement + incidents + fermeture administrative", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/", p: "presse+officiel" }
];

window.BLOCUS["90010|Lycée général et technologique Raoul Follereau"] = [
  { n: "Rassemblement + incidents", j: "01/10", z: "2026-10-01", l: "https://letrois.info/societe/greve-des-lyceens-nouvelles-interpellations-a-belfort/", p: "presse" }
];

window.BLOCUS["92004|Lycée Auguste Renoir"] = [
  { n: "Blocus national", j: "29/09", z: "2026-09-29", p: "presse", q: "« le blocage du lycée Auguste Renoir par les lycéens » ; 4 interpellations", m: "SNES-FSU 92, 30/09" }
];

window.BLOCUS["92078|Lycée Michel-Ange"] = [
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "presse", q: "« le mercredi 30 septembre, pendant le BLOCUS des élèves »", m: "SNES-FSU 92 (communiqué PDF), 30/09" }
];

window.BLOCUS["93048|Lycée Jean Jaurès"] = [
  { n: "Blocus (Enseignants absents, classes surchargées)", j: "29/09", z: "2026-09-29", p: "à confirmer · presse", q: "« les élèves organisent le blocus de leur établissement »", m: "titre de presse, corps inaccessible" }
];

window.BLOCUS["93055|Lycée Marcelin Berthelot"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« un feu allumé devant le lycée Berthelot de Pantin », dans un contexte de blocage", m: "titre de presse (BFM/Orange), corps inaccessible" }
];

window.BLOCUS["93066|Lycée Paul Éluard"] = [
  { n: "Blocus national", j: "28/09", z: "2026-09-28", p: "à confirmer · presse", q: "« plusieurs centaines d'élèves bloquent l'entrée de leur établissement »", m: "liberation.fr, 28/09" },
  { n: "Blocus", j: "29/09", z: "2026-09-29", l: "https://www.tf1info.fr/meteo/direct-meteo-france-previsions-alerte-neige-verglas-7-departements-places-en-vigilance-orange-lundi-5-janvier-2026-transports-scolaires-suspendus-en-ille-et-vilaine-et-en-normandie-2416611.html", p: "presse (extrait)" }
];

window.BLOCUS["93066|Lycée professionnel Frédéric Bartholdi"] = [
  { n: "Blocus national", j: "24/09", z: "2026-09-24", p: "presse", q: "« multiplient des blocages depuis le début de semaine »", m: "france3-regions.fr, 25/09" }
];

window.BLOCUS["93070|Lycée polyvalent Auguste Blanqui"] = [
  { n: "Blocus (Conditions d'étude)", j: "24/09", z: "2026-09-24", p: "presse", q: "« Il y a eu ce (jeudi) matin un blocus du lycée Auguste-Blanqui à Saint-Ouen »", m: "france3-regions.fr, 25/09" }
];

window.BLOCUS["94028|Lycée polyvalent Antoine de Saint-Exupéry"] = [
  { n: "Blocus (début du mouvement national)", j: "18/09", z: "2026-09-18", l: "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France", p: "presse" },
  { n: "Blocus (Proviseur adjoint, DDFPT, infirmerie, AESH)", j: "21/09", z: "2026-09-21", l: "https://fr.wikipedia.org/wiki/Mouvement_lyc%C3%A9en_et_blocus_de_2026_en_France", p: "presse", q: "« les élèves ont bloqué leur lycée » ; « parti le lundi 21 septembre » — DÉBUT DU MOUVEMENT NATIONAL", m: "actu.fr, 24/09" },
  { n: "Blocus national", j: "30/09", z: "2026-09-30", p: "officiel (préfecture)", q: "Blocus levé après le recrutement d'un proviseur adjoint, d'un directeur de formation et d'une infirmière", m: "franceinfo.fr, 30/09" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« les barricades faites de poubelles et barrières ont été retirées »", m: "actu.fr, 02/10" }
];

window.BLOCUS["94041|Lycée Romain-Rolland"] = [
  { n: "Blocus", j: "21/09", z: "2026-09-21", l: "https://creteil.snes.edu/Plan-du-site.html", p: "syndicat (à confirmer)" }
];

window.BLOCUS["94043|Lycée polyvalent Darius Milhaud"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", p: "à confirmer · presse", q: "« au cœur du blocus du lycée Darius-Milhaud »", m: "Le Parisien (titre), 01/10" }
];

window.BLOCUS["94044|Lycée polyvalent Guillaume Budé"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.tf1info.fr/societe/direct-blocus-des-lycees-et-des-universites-le-mouvement-se-poursuit-laurent-nunez-edouard-geffray-france-insoumise-education-les-informations-du-vendredi-2-octobre-2026-2467571.html", p: "presse" }
];

window.BLOCUS["95018|Lycée Fernand et Nadia Léger"] = [
  { n: "Blocus (Blocus inter-établissements)", j: "01/10", z: "2026-10-01", p: "presse", q: "« Un blocus rassemblant 300 à 400 élèves » devant ces deux lycées", m: "actu.fr, 01/10" }
];

window.BLOCUS["95018|Lycée Jean Jaurès"] = [
  { n: "Blocus (Classes bondées, cantine, orientation)", j: "01/10", z: "2026-10-01", p: "presse", q: "« des lycéens d'Argenteuil (95) bloquent leur établissement »", m: "blast-info.fr, 01/10" }
];

window.BLOCUS["95018|Lycée Julie-Victoire Daubié"] = [
  { n: "Blocus (Blocus inter-établissements)", j: "01/10", z: "2026-10-01", p: "presse", q: "« Un blocus rassemblant 300 à 400 élèves » devant ces deux lycées", m: "actu.fr, 01/10" }
];

window.BLOCUS["95277|Lycée René Cassin"] = [
  { n: "Blocus (EDT surchargés, cantine, infirmerie)", j: "23/09", z: "2026-09-23", p: "presse", q: "« un blocus a lieu depuis mercredi 23 septembre »", m: "actu.fr, 30/09" }
];

window.BLOCUS["95572|Lycée des métiers de l'automobile et du transport Château d'Épluches"] = [
  { n: "Blocus (EDT, bus, stages)", j: "28/09", z: "2026-09-28", p: "presse", q: "« Ils avaient alors mis en place un blocus » ; un lyceen blessé par un tir policier, enquête IGPN", m: "actu.fr, 29/09" }
];

window.BLOCUS["95585|Lycée Jean-Jacques Rousseau"] = [
  { n: "Blocus (Blocus réprimé)", j: "24/09", z: "2026-09-24", p: "presse", q: "« le blocus a été réprimé violemment ce jeudi matin » ; 10 GAV", m: "france3-regions.fr, 25/09" }
];

window.BLOCUS["95585|Lycée Maryse-Condé"] = [
  { n: "Blocus (SES absent, chauffage, cantine)", j: "24/09", z: "2026-09-24", p: "presse", q: "« elle participe aux blocus de son lycée […] depuis le 24 septembre »", m: "bastamag.com, 29/09" }
];

window.BLOCUS["97105|Lycée général et technologique Gerville Réache"] = [
  { n: "Blocus national + incidents + fermeture administrative + rassemblement", j: "01/10", z: "2026-10-01", l: "https://rci.fm/guadeloupe/infos/Societe/Mobilisation-lyceenne-Basse-Terre-les-cours-suspendus-Gerville-Reache-apres-des", p: "à confirmer · presse", q: "« Un lycée de Basse-Terre a été bloqué dès jeudi » ; plus de 500 élèves — l'établissement n'est pas nommé dans le texte accessible", m: "la1ere.franceinfo.fr ; rci.fm, 01/10" }
];

window.BLOCUS["97209|Collège Jenny Alpha  (Ex Dillon 2)"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://rci.fm/martinique/infos/Social/Dillon-Bellevue-Trinite-situation-tendue-autour-de-plusieurs-lycees-en-martinique-ce", p: "presse" }
];

window.BLOCUS["97209|Lycée général et technologique de Bellevue"] = [
  { n: "Blocus", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://rci.fm/martinique/infos/Social/Dillon-Bellevue-Trinite-situation-tendue-autour-de-plusieurs-lycees-en-martinique-ce", p: "presse" }
];

window.BLOCUS["97209|Lycée général et technologique Joseph Gaillard"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://rci.fm/martinique/infos/Social/Dillon-Bellevue-Trinite-situation-tendue-autour-de-plusieurs-lycees-en-martinique-ce", p: "presse" }
];

window.BLOCUS["97209|Lycée général et technologique Victor Schoelcher"] = [
  { n: "Rassemblement", j: "01/10 et 02/10", z: "2026-10-01;2026-10-02", l: "https://rci.fm/martinique/infos/Social/Dillon-Bellevue-Trinite-situation-tendue-autour-de-plusieurs-lycees-en-martinique-ce", p: "presse" }
];

window.BLOCUS["97209|Lycée professionnel André Aliker"] = [
  { n: "Incidents", j: "02/10", z: "2026-10-02", l: "https://rci.fm/martinique/infos/Social/Lycees-de-Bellevue-et-Schoelcher-les-eleves-et-agents-mobilises-contre-leurs", p: "presse" }
];

window.BLOCUS["97209|Lycée professionnel Marius Cultier"] = [
  { n: "Blocus", j: "02/10", z: "2026-10-02", l: "https://rci.fm/martinique/infos/Social/Dillon-Bellevue-Trinite-situation-tendue-autour-de-plusieurs-lycees-en-martinique-ce", p: "presse" }
];

window.BLOCUS["97210|Lycée polyvalent la Jetée"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", p: "presse", q: "« Le portail a été cassé et les vitres brisées. Tous les lycéens ont été renvoyés chez eux. Le lycée est bloqué »", m: "la1ere.franceinfo.fr ; rci.fm, 02/10" }
];

window.BLOCUS["97213|Lycée professionnel Léopold Bissol"] = [
  { n: "Incidents", j: "02/10", z: "2026-10-02", l: "https://rci.fm/martinique/infos/Social/Dillon-Bellevue-Trinite-situation-tendue-autour-de-plusieurs-lycees-en-martinique-ce", p: "presse" }
];

window.BLOCUS["97230|Lycée général et technologique Frantz Fanon"] = [
  { n: "Blocus national", j: "01/10", z: "2026-10-01", l: "https://la1ere.franceinfo.fr/martinique/trinite/trinite-des-lyceens-de-frantz-fanon-bloquent-une-entree-de-la-cite-scolaire-1744173.html", p: "presse", q: "« Dans la nuit, les deux accès au lycée ont été obstrués » (vers 01/10)", m: "la1ere.franceinfo.fr, 01/10" },
  { n: "Blocus national", j: "02/10", z: "2026-10-02", l: "https://la1ere.franceinfo.fr/martinique/trinite/trinite-des-lyceens-de-frantz-fanon-bloquent-une-entree-de-la-cite-scolaire-1744173.html", p: "presse", q: "« Le second accès reste bloqué »", m: "la1ere.franceinfo.fr, 02/10" }
];

window.BLOCUS["97302|Lycée Félix Éboué"] = [
  { n: "Blocus national", j: "07/09", z: "2026-09-07", p: "presse", q: "« 12 élèves ont bloqué l'entrée du lycée Félix Eboué ce lundi 7 septembre » — ANTÉRIEUR à la vague nationale", m: "la1ere.franceinfo.fr, 07/09" }
];

window.BLOCUS["97411|Lycée polyvalent Georges Brassens"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://la1ere.franceinfo.fr/reunion/blocage-des-lycees-des-centaines-d-eleves-rassembles-devant-plusieurs-etablissements-de-l-ile-ce-vendredi-matin-1744119.html", p: "presse" }
];

window.BLOCUS["97416|Lycée général et technologique Ambroise Vollard"] = [
  { n: "Blocus", j: "01/10", z: "2026-10-01", l: "https://www.lequotidien.re/article/education/2026/10/01/lycees-bloques-la-mobilisation-gagne-la-reunion-au-lycee-ambroise-vollard", p: "à confirmer" }
];

window.BLOCUS["97416|Lycée polyvalent de Bois d'Olive"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://la1ere.franceinfo.fr/reunion/blocage-des-lycees-des-centaines-d-eleves-rassembles-devant-plusieurs-etablissements-de-l-ile-ce-vendredi-matin-1744119.html", p: "presse" }
];

window.BLOCUS["97416|Lycée professionnel François de Mahy"] = [
  { n: "Manifestation + incidents", j: "02/10", z: "2026-10-02", l: "https://la1ere.franceinfo.fr/reunion/blocage-des-lycees-des-centaines-d-eleves-rassembles-devant-plusieurs-etablissements-de-l-ile-ce-vendredi-matin-1744119.html", p: "presse" }
];

window.BLOCUS["97418|Lycée général et technologique le Verger"] = [
  { n: "Blocus", j: "02/10", z: "2026-10-02", l: "https://la1ere.franceinfo.fr/reunion/blocage-des-lycees-des-centaines-d-eleves-rassembles-devant-plusieurs-etablissements-de-l-ile-ce-vendredi-matin-1744119.html", p: "presse" }
];

window.BLOCUS["97422|Lycée polyvalent Boisjoly Potier"] = [
  { n: "Rassemblement", j: "02/10", z: "2026-10-02", l: "https://www.linfo.re/la-reunion/faits-divers/mobilisation-devant-les-lycees-17-etablissements-concernes-par-les-manifestations", p: "presse" }
];

window.BLOCUS["97422|Lycée polyvalent Roland Garros"] = [
  { n: "Rassemblement", j: "01/10", z: "2026-10-01", l: "https://la1ere.franceinfo.fr/reunion/la-grogne-des-lyceens-gagne-la-reunion-quelques-etablissements-mobilises-dans-le-sud-ce-jeudi-1743519.html", p: "presse" }
];

window.BLOCUS["97603|Lycée polyvalent de Bandrelé"] = [
  { n: "Blocus national", j: "02/10", z: "2026-10-02", l: "https://la1ere.francetvinfo.fr/mayotte/le-bac-approche-toujours-pas-de-prof-de-francais-des-eleves-bloquent-le-lycee-de-bandrele-ce-vendredi-matin-1744155.html", p: "presse", q: "« Des élèves ont bloqué le lycée de Bandrélé ce vendredi matin. Le portail du lycée est constellé de pancartes »", m: "la1ere.franceinfo.fr, 02/10" }
];

window.BLOCUS["97611|Lycée Younoussa Bamana"] = [
  { n: "Manifestation (mouvement local antérieur)", j: "29/09", z: "2026-09-29", l: "https://la1ere.francetvinfo.fr/mayotte/le-bac-approche-toujours-pas-de-prof-de-francais-des-eleves-bloquent-le-lycee-de-bandrele-ce-vendredi-matin-1744155.html", p: "presse" }
];
