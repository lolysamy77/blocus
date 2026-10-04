/* ===========================================================================
   blocus.js — les blocus écrits à la main.

   CE FICHIER EST À COMPLÉTER. Les blocus relevés dans la presse et importés
   automatiquement sont dans build/blocus-recherche.js : les deux fichiers sont
   lus ensemble et fusionnés, il n'y a donc aucune raison de recopier ici ce que
   l'importation a déjà trouvé.

   ---------------------------------------------------------------------------
   FORMAT
   ---------------------------------------------------------------------------
   Une entrée par établissement. La clé associe la commune (code INSEE de la
   commune, celui des fiches communales) et le nom de l'établissement, séparés
   par une barre verticale :

       "37050|lycee descartes": [ ... ]

   La comparaison ignore la casse, les accents, la ponctuation et les espaces
   multiples, et les mots « Collège », « Lycée », « Institut », « École »,
   « Section » ou « Groupement » en tête sont facultatifs : « Descartes » et
   « Lycée Descartes » aboutissent au même établissement.

   Chaque entrée est une liste de blocus, dans l'ordre d'affichage :

       { n: "Nom du blocus", j: "Jour", z: "2026-10-01",
         l: "https://…", p: "confirmé",
         q: "« ce que la source a écrit »", m: "nom du média, 01/10",
         s: "Salle" }

       n  nom du blocus                          (obligatoire)
       j  jour, tel qu'on l'affiche             (facultatif)
       z  jours exacts, « 2026-10-01;2026-10-02 » ou un seul jour, en ISO
          (facultatif, mais c'est lui qui sert au filtre des jours affichés)
       l  lien vers la preuve : article, communiqué, photo  (facultatif)
       p  précision : « confirmé », « à confirmer », « source unique » (facultatif)
       q  la citation de la source, mot pour mot  (facultatif)
       m  les médias cités quand il n'y a pas d'adresse  (facultatif)
       s  salle ou lieu, si le blocus n'occupe pas tout l'établissement

    « l », « q » et « m » sont trois façons de prouver la même chose, pas trois
    niveaux : une adresse s'ouvre, une citation se lit, un nom de média ne prouve
    rien tout seul. Une ligne peut n'en avoir qu'une, et la page affiche ce qu'elle
    a. C'est ainsi que le rapport du 3 octobre alimente la carte : il ne donne que
    des citations et des noms de médias, la recherche donne des adresses.

   « z » et « j » ne se contredisent pas : « j » est ce qu'on lit, « z » est ce
   qu'on compare. Un blocus qui dure deux jours se fait compter sur les deux, et un
   blocus qui n'a pas de date reste toujours visible : on ne sait pas quand il
   a eu lieu, mais on sait qu'il existe.

   Exemple complet :

       window.BLOCUS["37050|lycee descartes"] = [
         { n: "Scrutin 1 - communales", j: "15 mars", z: "2026-03-15", d: "08:00", f: "12:00" },
         { n: "Scrutin 2 - départementales", j: "23 mars", z: "2026-03-23" },
         { n: "Scrutin 3 - établissement", j: "24 mars", z: "2026-03-24",
           s: "Gymnase", l: "https://exemple.fr/article", p: "confirmé", f: "10:00" },
         { n: "Blocage devant le gymnase", j: "1er octobre", z: "2026-10-01",
           q: "« les élèves occupent le gymnase depuis 7 h »",
           m: "le-journal-de-touraine.fr, 01/10" }
       ];

   Un établissement absent de ce fichier affiche « Blocus non renseigné » : il
   reste donc inutile de compléter les 4 215 communes, on ne liste que les
   établissements qui ont des blocus.
   =========================================================================== */

window.BLOCUS = window.BLOCUS || {};