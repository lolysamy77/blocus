/* ===========================================================================
   import-blocus.js — met la recherche de terrain dans la carte.

   Entrées
     recherche-blocus-2026/blocus-lycees-2026.json   les relevés (établissement,
                                                      commune, dates, statut,
                                                      lien de presse)
     build/ecoles/XX.js                              l'annuaire de l'Éducation,
                                                      12 287 établissements
     blocus_lycees_colleges_france_2026.txt          le rapport du 3 octobre :
                                                       les mêmes relevés, avec
                                                       la citation de la source
                                                       et son degré de certitude
     build/communes/XX.js                            les noms des communes

   Sorties
     build/blocus-recherche.js   les blocus, au format de build/blocus.js
     build/ecoles-fr.js         tous les établissements de France, pour le menu
                                déroulant du questionnaire de signalement
     build/blocus-a-relire.txt   les relevés que le rapprochement n'a pas su
                                trancher, avec la raison : ils méritent un coup
                                d'œil humain, pas une décision automatique

   Ces fichiers sont générés : on ne les modifie pas à la main. Pour ajouter un
   blocus soi-même, c'est build/blocus.js qu'on complète — voir sa documentation
   en tête.

       node build/import-blocus.js          -> écrit les trois fichiers
       node build/import-blocus.js --dry    -> affiche le compte rendu seul
   =========================================================================== */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DRY = process.argv.includes("--dry");

const SRC_RELEVES = path.join(ROOT, "recherche-blocus-2026", "blocus-lycees-2026.json");
const SRC_DOC = path.join(ROOT, "blocus_lycees_colleges_france_2026.txt");
const DIR_ECOLES = path.join(ROOT, "build", "ecoles");
const DIR_COMMUNES = path.join(ROOT, "build", "communes");
const OUT_BLOCUS = path.join(ROOT, "build", "blocus-recherche.js");
const OUT_ECOLES = path.join(ROOT, "build", "ecoles-fr.js");
const OUT_DEPNOMS = path.join(ROOT, "build", "dep-noms.js");
const OUT_COMNOMS = path.join(ROOT, "build", "communes-blocus.js");
const OUT_RELIRE = path.join(ROOT, "build", "blocus-a-relire.txt");

/* ------------------------------------------------------------------ outils */

/** majuscules, minuscules, sans accent, sans ponctuation : deux écritures
    différentes d'un même nom deviennent comparables. Les ligatures sont
    dépliées d'abord, car « Cœur » ne se décompose pas comme « é ». */
function plat(s) {
  return String(s == null ? "" : s)
    .replace(/[\u0152\u0153]/g, (c) => (c === "\u0152" ? "OE" : "oe"))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/* Mots qui ne distinguent pas un établissement d'un autre : à eux seuls, ils
   ne permettent jamais de trancher entre deux candidats. */
const MOTS_GENERIQUES = new Set([
  "le", "la", "les", "de", "des", "du", "et", "a", "au", "aux", "en", "sur",
  "saint", "sainte", "college", "lycee", "c", "lp", "lgt", "e", "m",
  "general", "generale", "gen", "technologique", "techno", "tech",
  "professionnel", "professionnelle", "polyvalent", "polivalente",
  "agricole", "horticole", "institut", "institution", "ensemble", "scolaire",
  "campus", "mater", "secondaire", "priv", "privee", "public", "mixte",
  "cluny", "sous", "cite", "complexe", "site", "sites", "groupe", "ex",
  "nouveau", "nouvelle", "formation", "forme", "reunion", "rattach",
]);

/** Ce qu'il faut comparer entre un nom de presse et un nom officiel.
    Deux lectures :

      jetons  les mots distinctifs, un par un — « Joseph » + « Gaillard ».
              Sert quand la presse écrit « Lycée Joseph-Gaillard » et
              l'annuaire « Lycée général et technologique Joseph Gaillard ».

      colle   tous les mots distinctifs à la suite — « josephgaillard ».
              Sert quand la ponctuation diffère : la presse écrit
              « Bois-Joly-Potier », l'annuaire « Boisjoly Potier ».

    La lecture « collé » ne se compare qu'à l'égalité exacte. Tolérer un radical
    commun y serait un piège : tous les noms d'établissement commencent par
    « lycée » ou « collège », donc « lyceehenri… » et « lyceehenribergson »
    auraient cinq lettres communes pour rien — c'est ce qui faisait accroire
    « Lycée Henri-Bergson » à « Lycée Henri Alain-Fournier ». */
function lectures(nom) {
  const a = plat(nom);
  if (!a) return [];
  const jetons = distinctifs(a);
  const colle = jetons.join("");
  return colle && colle !== a.replace(/ /g, "") && jetons.length > 1
    ? [{ jetons, colle }]
    : [{ jetons }];
}

/** les mots qui identifient l'établissement, sans lecture particulière */
function distinctifs(nom) {
  return plat(nom)
    .split(" ")
    .filter((m) => m && !MOTS_GENERIQUES.has(m));
}

/** quel genre d'établissement le relevé parle-t-il ? "Collège" -> collège,
    tout le reste -> lycée (général, professionnel, agricole…). */
function genreDu(nom) {
  return /^college/i.test(plat(nom)) ? "C" : "L";
}

/** deux mots se ressemblent-ils ? « Olives » pour « Olive », oui ; « Jean »
    pour « Jeanne », peu importe — d'où la longueur minimale de 5 lettres. */
function memeMot(a, b) {
  if (a === b) return true;
  if (a.length < 5 || b.length < 5) return false;
  return a.slice(0, 5) === b.slice(0, 5);
}

/** deux noms désignent-ils le même établissement ? Renvoie 0 si non, sinon un
    score entre 0 et 1 : 1 quand les mots distinctifs coïncident exactement,
    moins que 1 quand le nom officiel en porte un de plus.

    Le sens compte, et c'est le même dans tous les cas : les mots du relevé
    doivent se retrouver dans le nom officiel, jamais l'inverse. La presse
    écrit « Lycée Schoelcher », l'annuaire écrit « Lycée général et
    technologique Victor Schoelcher » — un mot de plus, pas un de moins. Sans
    cette asymétrie, « Lycée Joseph-Gaillard » conviendrait aussi
    « Saint-Joseph de Cluny », qui n'a rien à voir. */
function scoreEtablissement(nomReleve, nomOfficiel) {
  let meilleur = 0;
  for (const ra of lectures(nomReleve)) {
    for (const rb of lectures(nomOfficiel)) {
      const s = scoreLectures(ra, rb);
      if (s > meilleur) meilleur = s;
    }
  }
  return meilleur;
}

function scoreLectures(ra, rb) {
  /* On essaie les deux lectures et on garde la meilleure : la lecture
     « collé » ne vaut que par égalité exacte, mais elle ne doit pas
     empêcher la comparaison mot à mot de réussir — « Bois d'Olives » contre
     « Bois d'Olive » se rate d'un simple s. */
  const s1 = scoreJetons(ra.jetons, rb.jetons);
  const s2 = ra.colle && rb.colle && ra.colle === rb.colle ? 1 : 0;
  return Math.max(s1, s2);
}

/** les mots du relevé se retrouvent-ils tous dans le nom officiel ? */
function scoreJetons(wa, wb) {
  if (!wa.length || !wb.length) return 0;
  /* au moins un mot de 5 lettres : sinon « Lycée Jean Bart » confondrait
     tous les Jean de France */
  if (!wa.some((x) => x.length >= 5)) return 0;
  for (const x of wa) {
    if (!wb.some((y) => memeMot(x, y))) return 0;
  }
  return wa.length / wb.length;
}

/** le code INSEE du département, d'après celui d'une commune */
function depDe(code) {
  const c = String(code);
  return /^97[1-6]/.test(c) ? c.slice(0, 3) : c.slice(0, 2);
}

/** "2026-09-29;2026-10-01" -> "29/09 et 01/10", pour l'affichage */
function jours(dates) {
  const j = datesISO(dates);
  if (!j.length) return "";
  const l = j.map((d) => d.slice(8, 10) + "/" + d.slice(5, 7));
  if (l.length === 1) return l[0];
  return l.slice(0, -1).join(", ") + " et " + l[l.length - 1];
}

/** "2026-09-29;2026-10-01" -> les mêmes dates, séparées par un point-virgule.
    C'est ce champ que la page lit pour proposer un jour : « 29/09 et 01/10 »
    se lit à l'œil, il ne se trie pas. */
function datesISO(dates) {
  return String(dates || "")
    .split(";")
    .map((d) => d.trim())
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort();
}

/** "blocus + incidents" -> "Blocus + incidents" (on garde la précision du
    relevé : c'est elle qui distingue un blocus-avorté d'un blocus installé)
    Trois formulations disaient la même chose de deux façons ; on n'en garde
    qu'une, sinon la carte parle de trois blocus différents là où il n'y en a
    qu'un. */
function libelle(statut) {
  let s = String(statut || "").trim().replace(/\s+/g, " ");
  /* « à confirmer » est une réserve, pas un fait : elle rejoint `p`, que le
     tableau sait compter (voir precisionLigne). La laisser dans le libellé la
     ferait compter comme une source sûre. */
  s = s.replace(/\s*\(\s*[aà]\s*confirmer\s*\)\s*/gi, " ").replace(/\s+/g, " ").trim();
  if (!s) return "Blocus";
  /* « blocus (tentative) », « blocus (tentative empêchée) » et « tentative de
     blocus » : même chose, et « empêchée » veut dire non réalisée. Les accents
     tant écrits de plusieurs façons dans la liste de recherche, on les tolère
     tous. */
  s = s.replace(/\bblocus\s*\(\s*tentative\s*(?:emp[eéèê]?ch[eéèê]?e?)?\s*\)/i,
    (t) => (/emp/i.test(t) ? "tentative de blocus, non réalisée" : "tentative de blocus"));
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** La précision d'une ligne de la recherche : ce que le relevé dit de sa
    source, plus la réserve « à confirmer » que certains statuts portent entre
    parenthèses. */
function precisionLigne(r) {
  const p = String(r.precision || "").trim();
  if (!/\(\s*[aà]\s*confirmer\s*\)/i.test(String(r.statut_action || ""))) return p;
  if (/[aà]\s*confirmer/i.test(p)) return p;
  return p ? "à confirmer · " + p : "à confirmer";
}

function estLien(s) {
  return /^https?:\/\/\S+$/i.test(String(s || "").trim());
}

/* ------------------------------------------------------- le rapport du 3 octobre
   blocus_lycees_colleges_france_2026.txt est un document rédigé, pas une base :
   ses tableaux de la section 4 sont en colonnes séparées par des barres
   verticales, tout le reste est du texte. On ne lit que la section 4 — la liste
   principale des blocus confirmés — et on laisse les sections 6, 7 et 8
   (mobilisations à vérifier, contradictions entre sources, négatifs prouvés)
   dans le rapport de relecture : le document dit lui-même qu'il ne les compte
   pas, et les y mettre reviendrait à annoncer des blocus qui n'ont pas eu lieu.

   Une ligne du rapport est donc (commune, établissement, type, date, motif,
   citation, sources). Le rapport note la certitude d'une ligne de deux façons :
   par un mot dans le motif — « National - FILTRANT », « TENTATIVE » — et par une
   mention en fin de colonne des sources — « — CERTITUDE Moyenne ». On lit les
   deux, en ne prenant pour un marqueur que les mots en capitales : « filtrant »
   dans une citation est du texte, « FILTRANT » dans un motif est une étiquette. */

const ANNEE_DOC = "2026";

/** « ## Département 10 — Aube », « ## Dèpartement 09 - Ariége » : le mot est
    le même, l'accent change de place. Sans cette tolérance, un titre mal écrit
    fait perdre toutes les lignes du département. */
const TITRE_DEP = /^##\s+D[eéè]?partement\s+(\d{2,3}|2[AB])\b/i;

/** "29/09" -> "2026-09-29". Le rapport ne donne jamais l'année : il est annuel. */
function isoJour(ddmm) {
  const m = /^(\d{2})\/(\d{2})$/.exec(String(ddmm || "").trim());
  return m ? ANNEE_DOC + "-" + m[2] + "-" + m[1] : null;
}

/** un titre de section : un nombre, un point, puis des majuscules */
function titreDeSection(ligne) {
  const m = /^(\d+)\.\s+(\S.*)$/.exec(ligne);
  if (!m) return null;
  const mots = m[2].replace(/[^A-Za-z]/g, "");
  return mots && mots === mots.toUpperCase() ? { n: +m[1], titre: m[2] } : null;
}

/** le genre d'établissement, d'après la colonne Type du rapport. Une cité
    scolaire et un lycée agricole sont comptés comme des lycées : c'est ce que
    fait l'annuaire, et « Collège » seul bascule côté collège. */
function genreDoc(type) {
  const s = plat(type);
  if (!s || s === "-") return null;
  return /^college/.test(s) ? "C" : "L";
}

/** Le nom du blocus, d'après le motif. Le motif est soit une révision
    (« National », 355 lignes sur 427), soit une précision locale
    (« Moyens, profs non remplacés »), soit une réserve (« Ambigu »). Le
    rapport distingue aussi ce qui n'a pas eu lieu : une tentative n'est pas un
    blocage, un filtrage laisse une issue de secours. On le dit dans le nom,
    parce que c'est la première chose que le lecteur voit. */
function libelleDoc(motif, preuve, source) {
  const m = plat(motif);
  const tentative = /tentative/.test(m) || /—\s*TENTATIVE/.test(preuve);
  const nonRealise = /NON\s*R[ÉE]ALIS/.test(plat(source));
  const filtrant = /filtrant/.test(m);

  if (tentative) return nonRealise ? "Tentative de blocus, non réalisée" : "Tentative de blocus";
  if (/^national/.test(m)) {
    return filtrant ? "Blocus national, accès filtrant" : "Blocus national";
  }
  if (/^filtrant/.test(m)) return "Blocus filtrant";
  if (/^cite par la prefecture/.test(m)) return "Blocus cité par la préfecture";
  if (/^ambigu/.test(m)) return "Blocus, motif non précisé";
  if (!m || m === "idem") return "Blocus";
  /* Un motif est une formule courte (« National », « Bâtiment, classes »).
     Certaines cellules contiennent une phrase entière : la garder telle quelle
     noierait le panneau. On n'en garde que le début — les deux premiers griefs,
     coupés sur un mot entier — pour que le libellé dise de quoi il s'agit. */
  if (m.length > 60) {
    const debut = String(motif).split(",").slice(0, 2).join(",").replace(/\s+/g, " ").trim();
    return "Blocus (" + libelle(abreger(debut, 40)) + "…)";
  }
  return "Blocus (" + libelle(motif) + ")";
}

/** Coupe un texte sur un mot entier, et dit qu'il s'arrête là. */
function abreger(s, max) {
  const t = String(s).trim();
  if (t.length <= max) return t;
  const coupe = t.slice(0, max);
  const i = coupe.lastIndexOf(" ");
  return (i > max * 0.5 ? coupe.slice(0, i) : coupe).replace(/[\s,;:]+$/, "");
}

/** La précision d'une ligne du rapport. Le rapport note deux choses : d'où
    vient l'information — un média, ou la préfecture — et avec quelle assurance.
    On les garde toutes les deux dans `p`, que le tableau relit pour compter les
    sources. Les mots sont ceux que build/tableau.js sait reconnaître. */
function precisionDoc(source, preuve) {
  const s = plat(source + " " + preuve);
  const officiel = /prefecture|academie|recteur|rectorat|ministere|minister/.test(s);
  const moyenne = /certitude moyenne/.test(s) || /\bmoyenne\b/.test(plat(source).replace(/^.*certitude/, ""));
  let p = officiel ? "officiel (préfecture)" : "presse";
  if (officiel && /\.(fr|com|info|org)\b/.test(plat(source))) p = "presse et officiel";
  return moyenne ? "à confirmer · " + p : p;
}

/** Une cellule du rapport peut nommer plusieurs établissements : « Lycées
    Chateaubriand, René-Descartes-Coëtlogon, Jean-Jaurès, Jean-Macé
    (4 etabl.) ». Le rapport les compte séparément — son unité est le couple
    (établissement, jour) — et il écrit combien il y en a. On ne découpe donc que
    si les morceaux tombent juste : sinon la ligne part entière à la relecture,
    plutôt que de risquer d'attribuer un blocus au mauvais lycée. */
function nomsEtablissements(cellule) {
  const c = String(cellule || "").trim();
  const m = /\((\d+)\s+etabl\.?\s*\)\s*$/.exec(c);
  if (!m) return [c];
  const n = parseInt(m[1], 10);
  const corps = c.slice(0, m.index).trim();

  let parts = corps.split(",").map((x) => x.trim()).filter(Boolean);
  if (parts.length < n) {
    /* « Lycées A et B » : le « et » sépare deux noms — mais « Fernand-et-Nadia »
       n'en sépare qu'un. On ne tente la coupe que si le compte tombe juste. */
    const et = /^([^,]+?)\s+et\s+(.+)$/.exec(parts[0] || "");
    if (et && parts.length === 1) parts = [et[1].trim(), et[2].trim()];
  }
  if (parts.length !== n) return [c];

  return parts.map((p) => {
    /* le rapport écrit « Lycées » au pluriel devant une liste : le premier
       établissement est un établissement, comme les autres */
    const pluriel = /^(Lycées|Collèges|Cités)\s+(.+)$/.exec(p);
    const nom = pluriel ? pluriel[2] : p;
    return /^(lycee|college|cite|institut|ecole|mater|centre)/i.test(plat(nom)) ? nom : "Lycée " + nom;
  });
}

/** Le rapport n'écrit pas deux fois la même citation : « idem » veut dire « comme
    la ligne du dessus ». On le déplie, sinon la carte afficherait « idem » là où
    elle devrait montrer l'article qui prouve le blocus. */
function deplierIdem(cellule, precedent) {
  const c = String(cellule || "").trim();
  if (!/^idem\b/i.test(c)) return c;
  const reste = c.replace(/^idem\s*\+\s*/i, "").replace(/^idem\s*$/i, "");
  if (!precedent) return reste;
  return reste ? precedent + " + " + reste : precedent;
}

/** Une ligne de la liste principale a sept colonnes : commune, établissement,
    type, date, motif, citation, média. Le rapport en oublie parfois la
    dernière — la ligne de Mirepoix et celle de Montbard n'en ont que six. On
    complète plutôt que de laisser le blocus de côté ; une cellule qui ressemble
    à une source (un média, une date) prend la place du média, une autre reste
    la citation, et une cellule vide est signalée à la relecture. */
function completerColonnes(f) {
  if (f.length >= 7 || f.length < 6) return f;
  const dernier = f[5];
  /* Une citation s'ouvre sur un guillemet ou court sur plusieurs phrases ; un
     média tient dans un nom de site ou dans « actu.fr, 02/10 ». */
  const citation = !dernier || /^[«"“]/.test(dernier) || dernier.length > 120;
  if (citation) { f[6] = ""; return f; }
  f[6] = dernier;
  f[5] = "";
  return f;
}

/** Le rapport note sa certitude de lecture en fin de cellule : « — CERTITUDE
    Moyenne », puis parfois une phrase qui l'explique. C'est une note de travail,
    déjà portée par `p` (« à confirmer · presse ») : la carte n'a pas à la
    montrer, et encore moins à la laisser dans une citation censée être mot pour
    mot. On coupe donc tout à partir du mot, en gardant ce qui précède. */
function sansCertitude(s) {
  return String(s == null ? "" : s).replace(/\s+/g, " ").trim()
    .replace(/\s*[—–-]?\s*["“«']?\s*certitude\b.*$/i, "")
    .replace(/["“«']?\s*$/, "")
    .trim();
}

/** Parse le rapport et rend des relevés dans la même forme que le JSON de la
    recherche, plus deux champs que lui seul possède : la citation et le nom des
    sources. Renvoie aussi les lignes des sections 6 et 7, pour le rapport de
    relecture. */
function lireDocument() {
  const texte = fs.readFileSync(SRC_DOC, "utf8");
  const lignes = texte.split(/\r?\n/);

  const releves = [];
  const annexe = [];
  let section = 0, titre = "", dep = null, entete = false, note = "";
  let numLigne = 0;
  /* Les citations et les sources de la ligne précédente, pour déplier les
     « idem » du rapport */
  let preuveAvant = "", sourceAvant = "";

  for (const L of lignes) {
    numLigne++;

    const t = titreDeSection(L);
    if (t) {
      section = t.n;
      titre = t.titre;
      dep = null;
      entete = false;
      continue;
    }

    /* --- sections 4 : la liste principale ------------------------------- */
    if (section === 4) {
      /* Le rapport écrit « Département 10 — Aube », mais aussi « Dèpartement 09 » :
         un accent mal placé ou absent, et le titre passe pour une ligne
         ordinaire — tout le bloc reste alors rattaché au département précédent
         et ses blocus disparaissent. On tolère les trois écritures. */
      const dm = TITRE_DEP.exec(L);
      if (dm) { dep = dm[1]; entete = false; preuveAvant = ""; sourceAvant = ""; continue; }
      if (/^-{20,}$/.test(L)) continue;
      /* les notes indentées sous une ligne en expliquent la réserve */
      if (/^\s{2,}\S/.test(L) && L.indexOf("|") < 0) {
        note = (note ? note + " " : "") + L.trim();
        continue;
      }
      if (/^Commune\s*\|/.test(L)) { entete = true; continue; }
      if (!L.trim() || L.indexOf("|") < 0) { note = ""; continue; }
      if (!dep) { annexe.push({ ligne: numLigne, dep: "??", texte: L.trim(), rejet: "département illisible" }); continue; }

      const f = completerColonnes(L.split("|").map((x) => x.trim()));
      if (f.length < 7) { annexe.push({ ligne: numLigne, dep: dep, texte: L.trim(), rejet: f.length + " colonnes" }); continue; }

      const jour = isoJour(f[3]);
      if (!jour) { annexe.push({ ligne: numLigne, dep: dep, texte: L.trim(), rejet: "date illisible : " + f[3] }); continue; }

      const preuve = deplierIdem(f[5], preuveAvant);
      const medias = deplierIdem(f[6], sourceAvant);
      /* Une ligne sans source ne casse pas le « idem » de la suivante : celle-ci
         continue de recopier la dernière citation réellement écrite. */
      if (preuve) preuveAvant = preuve;
      if (medias) sourceAvant = medias;
      /* Une ligne sans citation ni média passe quand même : c'est un blocus que
         le rapport compte, et le laisser de côté ferait perdre un fait. Elle est
         notée ici pour que la relecture sache qu'il manque la source. */
      if (!preuve && !medias) {
        annexe.push({ ligne: numLigne, dep: dep, texte: L.trim(), rejet: "aucune source" });
      }

      for (const nomDoc of nomsEtablissements(f[1])) releves.push({
        origine: "rapport",
        dep: dep,
        commune: f[0],
        nom_releve: nomDoc,
        type: genreDoc(f[2]),
        dates: jour,
        statut_action: libelleDoc(f[4], preuve, medias),
        precision: precisionDoc(medias, preuve),
        citation: sansCertitude(preuve),
        medias: sansCertitude(medias),
        note: note,
        ligne: numLigne,
      });
      note = "";
      continue;
    }

    /* --- sections 6, 7 et 8 : ce qui n'est pas un blocus confirmé ----------- */
    if (section >= 6 && section <= 8) {
      if (/^-{20,}$/.test(L) || !L.trim()) continue;
      /* Deux écritures dans ces trois sections : la ligne de département
         (« 02 Aisne  … ») et la note numérotée (« (17) LYCEE LE-CORBUSIER —
         PIEGE D'HOMONYMIE »). La seconde ne commence pas par un numéro de
         département : le département y est écrit dans le texte. */
      const dm = /^(\d{2,3}|2[AB])\s+\S/.exec(L);
      const nn = /^\(\d+\)\s+\S/.exec(L);
      if (dm) {
        annexe.push({ ligne: numLigne, dep: dm[1], texte: L.trim(), section: section, suite: null });
      } else if (nn) {
        annexe.push({ ligne: numLigne, dep: null, texte: L.trim(), section: section, suite: null });
      } else if (annexe.length && /^\s{2,}\S/.test(L)) {
        /* La suite indented n'appartient qu'à la dernière entrée de la même
           section : sinon le texte d'une note viendrait compléter la ligne
           d'avant, dans une autre section. */
        const derniere = annexe[annexe.length - 1];
        if (derniere.section === section) derniere.suite = (derniere.suite || "") + " " + L.trim();
      }
      continue;
    }
  }

  return { releves: releves, annexe: annexe, titre: titre };
}

/** ordre des départements : 01 … 19, 2A, 2B, 21 … 95, 971 … 976 */
function rangDep(code) {
  const c = String(code);
  if (/^\d+$/.test(c)) return parseInt(c, 10);
  if (/^2[AB]$/.test(c)) return c === "2A" ? 20.1 : 20.2;
  return 999;
}

/* ------------------------------------------------------------- les données */

/** charge les 101 fichiers build/ecoles/XX.js et build/communes/XX.js */
function charger() {
  const bac = { window: {} };
  vm.createContext(bac);
  for (const d of [DIR_ECOLES, DIR_COMMUNES]) {
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".js"))) {
      vm.runInContext(fs.readFileSync(path.join(d, f), "utf8"), bac);
    }
  }
  return { ecoles: bac.window.ECOLES, communes: bac.window.COMMUNES };
}

/** index à plat : "18/18033" -> établissement, pour chercher sans limite */
function indexer(villes) {
  const index = [];
  for (const [code, liste] of Object.entries(villes || {})) {
    for (const e of liste) index.push({ c: code, e });
  }
  return index;
}

/* ------------------------------------------------- le rapprochement, en 2 temps */

/** la commune d'un relevé : par code INSEE s'il y en a un, sinon par nom.
    Un nom seul ne suffit que s'il ne laisse qu'une seule commune. */
function communeDu(r, communes) {
  if (r.code_insee) return { code: String(r.code_insee).trim(), source: "code INSEE" };
  const cible = plat(r.commune);
  if (!cible) return null;
  const de = communes[r.dep];
  if (!de) return null;
  const liste = de.communes || [];

  /* Paris est la seule commune que la carte découpe en arrondissements : les
     fichiers la rangent en 75101 … 75120. Le rapport écrit « Paris 12e », le
     fichier « 12e arrondissement · Reuilly » : même chiffre, autre mot. */
  const arr = /^paris\s+(\d{1,2})\s*(?:e|er|eme|eme|arr|arrondissement)?\s*$/.exec(cible);
  if (arr) {
    const c = "751" + String(parseInt(arr[1], 10)).padStart(2, "0");
    if (liste.some((x) => x.c === c)) return { code: c, source: "arrondissement de Paris" };
  }

  let exact = liste.filter((c) => plat(c.n) === cible);
  if (exact.length === 1) return { code: exact[0].c, source: "nom de commune" };
  if (exact.length > 1) return { code: null, source: "plusieurs communes nommées " + r.commune };

  /* sinon le nom est un raccourci : « Darnétal » pour « Darnétal », « Montreuil »
     pour « Montreuil-sur-Mer ». Accepté seulement si c'est le seul. */
  const partiels = liste.filter(
    (c) => plat(c.n).startsWith(cible + " ") || cible.startsWith(plat(c.n) + " ")
  );
  if (partiels.length === 1) return { code: partiels[0].c, source: "nom de commune (abrégé)" };
  if (partiels.length > 1) {
    return { code: null, source: partiels.length + " communes peuvent s’appeler « " + r.commune + " »" };
  }
  /* Beauvaisis : l'annuaire écrit « Le Grand-Quevilly », le rapport
     « Grand-Quevilly ». L'article se retire avant de chercher. */
  const sansArticle = (s) => s.replace(/^(?:le|la|les)\s+/, "");
  let articles = liste.filter((c) => sansArticle(plat(c.n)) === cible);
  if (articles.length === 1) {
    return { code: articles[0].c, source: "nom de commune (article en moins : " + articles[0].n + ")" };
  }
  if (articles.length > 1) {
    return { code: null, source: articles.length + " communes peuvent s appeler " + r.commune };
  }

  /* Une faute de frappe de temps en temps : le rapport écrit « Poiters », le
     fichier « Poitiers ». À deux lettres près, et seulement si un seul nom est
     aussi proche — sinon c'est qu'on ne sait pas de quoi on parle. */
  const proches = liste.filter(
    (c) => cible.length >= 6 && Math.abs(cible.length - plat(c.n).length) <= 2 &&
      ecart(cible, plat(c.n)) <= 2
  );
  if (proches.length === 1) {
    return { code: proches[0].c, source: "nom de commune (orthographe approchante : " + proches[0].n + ")" };
  }
  if (proches.length > 1) {
    return { code: null, source: proches.length + " communes sont proches de " + r.commune };
  }

  /* Enfin, cette commune existe peut-être ailleurs : Liévin est dans le 62, le
     rapport l'avait rangé dans le 59. On ne la déplace pas — on le dit, c'est
     une information, pas une décision. */
  const ailleurs = [];
  for (const d of Object.keys(communes)) {
    if (d === r.dep) continue;
    for (const c of communes[d].communes || []) {
      if (plat(c.n) === cible || sansArticle(plat(c.n)) === cible) ailleurs.push(d + " (" + c.c + ")");
    }
  }
  return {
    code: null,
    source: "commune « " + r.commune + " » introuvable dans le " + (r.dep || "?") +
      (ailleurs.length === 1 ? " ; elle est dans le " + ailleurs[0] :
        ailleurs.length > 1 ? " ; elle existe dans " + ailleurs.join(", ") : ""),
  };
}

/** combien de lettres faut-il changer pour passer de a à b */
function ecart(a, b) {
  if (a === b) return 0;
  const c = a.length <= b.length ? a : b;
  const l = a.length <= b.length ? b : a;
  const lig = [];
  for (let i = 0; i <= c.length; i++) lig[i] = i;
  for (let j = 1; j <= l.length; j++) {
    let diag = lig[0];
    lig[0] = j;
    for (let i = 1; i <= c.length; i++) {
      const avant = lig[i];
      lig[i] = Math.min(lig[i] + 1, lig[i - 1] + 1, diag + (c[i - 1] === l[j - 1] ? 0 : 1));
      diag = avant;
    }
  }
  return lig[c.length];
}

/** Le rapport et l'annuaire ne disent pas la même chose du même genre :
    « Lycée professionnel Chaptal » n'a rien à voir avec « Lycée technologique
    Jean Chaptal », et « Lycée Brémontier » avec « Lycée professionnel Nicolas
    Brémontier ». Le qualificatif tranche ce que le score ne sait pas départager :
    +2 si les deux en portent le même, -2 si l'annuaire en ajoute un que le
    relevé n'a pas — la presse écrit « lycée » pour « lycée professionnel » plus
    souvent qu'inversement. « général » et « technologique » ne sont pas des
    qualificatifs de ce genre : un lycée qui ne dit rien d'autre est un lycée
    général et technologique, et c'est ainsi qu'on le note. « privé » n'en fait
    pas partie non plus : ce n'est pas un genre, et les deux candidats de
    Sainte-Clotilde le portent. */
const QUALITES = ["professionnel", "professionnelle", "agricole"];

function memeQualite(nomReleve, nomOfficiel) {
  const a = plat(nomReleve);
  const b = plat(nomOfficiel);
  let note = 0;
  for (const q of QUALITES) {
    if (a.indexOf(q) < 0 && b.indexOf(q) >= 0) note -= 2;
    else if (a.indexOf(q) >= 0 && b.indexOf(q) >= 0) note += 2;
  }
  return note;
}

/** Un nom de presse n'est pas toujours celui de l'annuaire : « Lycée
    Hugues-Libergier » pour « Lycée Libergier », « Lycée Pierre-Lacroix » pour
    « Lycée Docteur Lacroix ». Aucun mot ne suffit alors ; on compte ceux qui se
    retrouvent, et on n'accepte que si le mot le plus long qui coïncide fait
    six lettres au moins. En dessous, « clos » ferait croire à « Collège Le
    Clos Jouvin », qui est un autre collège, dans une autre ville.

    Le second chiffre returned compte les mots qui tombent juste, radical
    compris : « François » ne vaut pas « Françoise », qui ne s'en distingue que
    par deux lettres. */
function scoreApproche(nomReleve, nomOfficiel) {
  const a = distinctifs(nomReleve);
  const b = distinctifs(nomOfficiel);
  if (a.length < 2 || !b.length) return { s: 0, ex: 0 };
  const trouves = a.filter((x) => b.some((y) => memeMot(x, y)));
  if (!trouves.length) return { s: 0, ex: 0 };
  const plusLong = trouves.slice().sort((x, y) => y.length - x.length)[0];
  if (plusLong.length < 6) return { s: 0, ex: 0 };
  const exacts = trouves.filter((x) => b.indexOf(x) >= 0).length;
  return { s: trouves.length / a.length, ex: exacts };
}

/** l'établissement d'un relevé : par nom officiel s'il y en a un, sinon en
    cherchant dans la commune, puis dans le département entier. */
function etablissementDu(r, codeCommune, ecoles) {
  if (r.nom_officiel) {
    return { nom: r.nom_officiel.trim(), note: "nom officiel du relevé" };
  }
  const dep = ecoles[r.dep];
  if (!dep) return { nom: null, note: "département absent de l'annuaire" };

  const cible = plat(r.nom_releve);
  if (!cible) return { nom: null, note: "relevé sans nom d'établissement" };
  const genre = genreDu(r.nom_releve);

  /* Le genre guide d'abord : « Lycée de Bandrélé » ne peut pas être le
     « Collège de Bandrelé » qui porte le même nom. Mais ce n'est qu'une
     préférence — « Collège-lycée André-Aliker » est dans les deux genres, et
     l'annuaire peut avoir rangé l'établissement de l'autre côté. */
  const chercher = (liste) => {
    for (const g of [genre, genre === "C" ? "L" : "C"]) {
      const lot = liste.filter((x) => x.e.t === g);
      const exacts = lot.filter((x) => plat(x.e.n) === cible);
      if (exacts.length === 1) return { x: exacts[0], par: "nom identique" };

      /* sinon on note chaque voisin, et on garde le mieux couvert : entre
         « Lycée général et technologique Ambroise Vollard » et « Micro-Lycée
         Ose 974 du Lycée Ambroise Vollard », c'est le premier. À score égal,
         on renonce — c'est à relire. */
      const notes = lot
        .map((x) => ({ x, s: scoreEtablissement(r.nom_releve, x.e.n), q: memeQualite(r.nom_releve, x.e.n) }))
        .filter((c) => c.s > 0)
        .sort((a, b) => b.s - a.s || b.q - a.q);
      if (notes.length && notes[0].s === 1) return { x: notes[0].x, par: "mêmes mots" };
      if (notes.length > 1 && (notes[0].s > notes[1].s || (notes[0].s === notes[1].s && notes[0].q > notes[1].q))) {
        /* Une différence d'un cheveu entre deux noms courts ne tranche rien :
           « LEGTA de Brioude, site de Fontannes » et « Lycée agricole de
           Brioude, site de Saugues » ne sont pas le même établissement. Cela
           vaut au moins la moitié des mots ; en dessous — ou si seul le
           qualificatif départage — c'est à relire. */
        if (notes[0].s >= 0.5 || notes[0].q > notes[1].q) {
          return { x: notes[0].x, par: "nom approchant" };
        }
      }
      if (notes.length > 1) {
        return { x: null, note: notes.length + " établissements portent un nom voisin : " +
          notes.slice(0, 3).map((p) => p.x.e.n).join(" / ") };
      }
      if (notes.length === 1) return { x: notes[0].x, par: "nom approchant" };

      /* Aucun mot ne colle, mais le nom est peut-être de travers : « Lycée
         Hugues-Libergier » pour « Lycée Libergier ». On ne retient que si un seul
         nom officiel porte les mots du relevé, et le motif est dit, pour qu'on
         puisse le vérifier d'un coup d'œil. */
      const voises = lot
        .map((x) => ({ x, s: scoreApproche(r.nom_releve, x.e.n), q: memeQualite(r.nom_releve, x.e.n) }))
        .filter((c) => c.s.s >= 1 / 3)
        .sort((a, b) => b.s.s - a.s.s || b.q - a.q || b.s.ex - a.s.ex);
      if (voises.length === 1) {
        return { x: voises[0].x, par: "nom approchant (" + Math.round(voises[0].s.s * 100) + " % des mots)" };
      }
      if (voises.length > 1 && (voises[0].s.s > voises[1].s.s ||
        (voises[0].s.s === voises[1].s.s && (voises[0].q > voises[1].q || voises[0].s.ex > voises[1].s.ex)))) {
        return { x: voises[0].x, par: "nom approchant (" + Math.round(voises[0].s.s * 100) + " % des mots)" };
      }
      if (voises.length > 1) {
        return { nom: null, note: voises.length + " établissements se rapprochent du nom : " +
          voises.slice(0, 3).map((p) => p.x.e.n).join(" / ") };
      }
    }
    return null;
  };

  const dansCommune = codeCommune && dep.villes[codeCommune]
    ? chercher(indexer({ [codeCommune]: dep.villes[codeCommune] }))
    : null;
  if (dansCommune && dansCommune.x) {
    if (dansCommune.x.c !== codeCommune) {
      /* L'annuaire et le relevé ne placent pas l'établissement dans la même
         commune : on suit l'annuaire, c'est elle qui alimente la carte. */
      return { nom: dansCommune.x.e.n, code: dansCommune.x.c, note: dansCommune.par + ", autre commune dans l'annuaire" };
    }
    return { nom: dansCommune.x.e.n, code: dansCommune.x.c, note: dansCommune.par };
  }
  if (dansCommune && dansCommune.note) return { nom: null, note: dansCommune.note };

  const partout = chercher(indexer(dep.villes));
  if (partout && partout.x) {
    return {
      nom: partout.x.e.n,
      code: partout.x.c,
      note: partout.par + ", trouvé dans une autre commune du département",
    };
  }
  if (partout && partout.note) return { nom: null, note: partout.note };
  return { nom: null, note: "aucun établissement de ce nom dans l’annuaire du " + (r.dep || "?") };
}

/* ------------------------------------------------------ les blocus relevés */

/** Les mots de nature que le tableau compte à part : un blocus et des incidents
    sont deux choses, et une ligne qui n'en dit qu'un la ferait disparaître. Le
    rapport écrit « Blocus national » là où la recherche écrit « blocus +
    incidents » : on garde le mot du rapport et on lui rend celui de la
    recherche, qui n'est pas dans son nom. */
const NATURES = [
  ["incidents", /incident/i],
  ["fermeture administrative", /fermeture/i],
  ["manifestation", /manifestation/i],
  ["rassemblement", /rassemblement/i],
];

function naturesManquantes(nomRapport, nomRecherche) {
  const base = plat(nomRapport);
  const ajout = [];
  for (const [motif, re] of NATURES) {
    if (re.test(nomRecherche) && !re.test(base)) ajout.push(motif);
  }
  return ajout;
}

/** La précision d'une ligne, une fois les deux sources rapprochées. Le rapport
    garde la main — c'est lui qui note le degré de certitude — mais si la
    recherche a vu une source officielle que le rapport n'a pas vue, on l'ajoute
    plutôt que de la perdre. */
function fusionnerPrecision(pRapport, pRecherche) {
  if (!pRecherche) return pRapport;
  if (!pRapport) return pRecherche;
  if (/officiel/.test(pRecherche) && !/officiel/.test(pRapport)) {
    return pRapport.replace("presse", "presse et officiel");
  }
  return pRapport;
}

/** Réunit en une ligne ce que les deux sources disent d'un même établissement,
    un même jour. Le rapport passe en premier : il est plus récent, il connaît les
    réserves (tentative, filtrant) et il porte la citation ; la recherche n'apporte
    plus que le lien de presse et les mots de nature. */
function fusionner(u, x) {
  const ajout = naturesManquantes(u.n, x.n);
  if (ajout.length) u.n = u.n + " + " + ajout.join(" + ");
  if (!u.l && x.l) u.l = x.l;
  if (!u.m && x.m) u.m = x.m;
  u.p = fusionnerPrecision(u.p, x.p);
  if (!u.q && x.q) u.q = x.q;
  return u;
}

/* --------------------------------------------------------------------------
   Les jours écartés à la main

   Un relevé peut contenir un jour qui n'était pas un jour de blocus : l'article
   annonçait la journée du lendemain, ou ne parlait que d'un rassemblement devant
   l'établissement. La recherche garde ce qu'elle a vu — on ne la réécrit pas —
   mais la carte ne publie que ce qui est un blocus. On écrit donc le jour à
   écarter ici, avec la raison, pour que la décision reste lisible et survive à
   la prochaine régénération.

   Format : "code INSEE@AAAA-MM-JJ". Le code suffit : on décide d'un jour, pas
   du nom que l'annuaire donne à l'établissement.
   ------------------------------------------------------------------------ */
const HORS_CARTE = new Map([
  /* Basse-Terre, 5 octobre : le relevé de la recherche couvre deux jours, mais le
     5 octobre la presse ne parle que d'un rassemblement devant le lycée et de la
     fermeture administrative qui en découle. Le blocus, lui, a eu lieu le
     1er octobre, qui reste dans la carte. */
  ["97105@2026-10-05", "la presse ne signale qu'un rassemblement, pas un blocus"],
]);

function importBlocus(releves, data) {
  const unites = new Map();     /* "cle@jour" -> une ligne, prête à être fusionnée */
  const relire = [];
  const exclus = [];
  let rattaches = 0, deja = 0;

  /* Le rapport d'abord, la recherche ensuite : l'ordre compte, puisque c'est la
     première ligne vue qui donne son nom à l'unité. */
  const ordonnes = releves
    .map((r, i) => ({ r: r, i: i }))
    .sort((a, b) => (a.r.origine === "rapport" ? 0 : 1) - (b.r.origine === "rapport" ? 0 : 1) || a.i - b.i)
    .map((x) => x.r);

  for (const r of ordonnes) {
    const com = communeDu(r, data.communes);
    if (!com || !com.code) {
      relire.push({ r, pourquoi: com ? com.source : "commune introuvable" });
      continue;
    }
    let et = etablissementDu(r, com.code, data.ecoles);
    if (!et.nom) {
      /* Le rapport écrit parfois « Cité scolaire de Brioude (lycée Lafayette) »
         ou « Lycée René-Josué-Valin » : la parenthèse et le nom d usage sont du
         bruit pour l'annuaire, on les retire avant de désespérer. */
      const court = String(r.nom_releve || "").replace(/\s*\([^)]*\)\s*$/, "").trim();
      if (court && court !== r.nom_releve) {
        et = etablissementDu(Object.assign({}, r, { nom_releve: court }), com.code, data.ecoles);
        if (et.nom) et.note = "nom sans parenthèse : " + court;
      }
    }
    if (!et.nom) {
      relire.push({ r, pourquoi: et.note || "établissement introuvable" });
      continue;
    }
    const code = et.code || com.code;
    rattaches++;
    if (et.code && et.code !== com.code) deja++;

    const cle = code + "|" + et.nom;
    const x = { n: libelle(r.statut_action), p: precisionLigne(r) };
    if (r.citation) x.q = String(r.citation).trim();
    if (r.medias) x.m = String(r.medias).trim();
    /* Le rapport cite des noms de médias, la recherche des adresses : on ne garde
       que les adresses, ce sont les seules qui s'ouvrent dans un onglet. */
    if (estLien(r.source)) x.l = String(r.source).trim();

    /* Une unité par jour, comme le rapport : un même établissement bloqué trois
       jours est compté trois fois, et c'est ce qui permet à deux sources de
       parler du même jour sans qu'on l'ajoute deux fois. */
    const iso = datesISO(r.dates);
    if (!iso.length) {
      const u = Object.assign({ cle: cle, jours: [] }, x);
      const k = cle + "@";
      if (unites.has(k)) fusionner(unites.get(k), x);
      else unites.set(k, u);
      continue;
    }
    for (const jour of iso) {
      /* Un jour écarté à la main ne devient pas une ligne. On le trace quand
         même : une exclusion muette ressemblerait à un relevé oublié. */
      const ecart = HORS_CARTE.get(code + "@" + jour);
      if (ecart) {
        exclus.push({ code: code, nom: et.nom, jour: jour, pourquoi: ecart });
        continue;
      }
      const k = cle + "@" + jour;
      if (unites.has(k)) fusionner(unites.get(k), x);
      else unites.set(k, Object.assign({ cle: cle, jours: [jour] }, x));
    }
  }

  /* Les unités d'un même établissement et d'un même nom se regroupent : trois
     jours de suite ne font qu'une ligne, avec « 29/09 et 01/10 » en guise de
     date. Même principe que la recherche, qui écrivait déjà « 01/10 et 02/10 ». */
  const parEtab = {};
  const groupes = new Map();       /* cle -> signature -> { n, q, j[], x } */
  for (const u of unites.values()) {
    const sig = u.cle + "#" + u.n + "#" + (u.q || "");
    let g = groupes.get(sig);
    if (!g) {
      g = { n: u.n, q: u.q, l: u.l, p: u.p, m: u.m, j: [] };
      groupes.set(sig, g);
      (parEtab[u.cle] = parEtab[u.cle] || []).push(g);
    } else {
      if (!g.l && u.l) g.l = u.l;
      if (!g.m && u.m) g.m = u.m;
      g.p = fusionnerPrecision(g.p, u.p);
      if (!g.q && u.q) g.q = u.q;
    }
    for (const j of u.jours) g.j.push(j);
  }

  const cles = Object.keys(parEtab);
  for (const k of cles) {
    for (const g of parEtab[k]) {
      g.jours = [...new Set(g.j)].sort();
      g.z = g.jours.join(";");
      g.j = jours(g.z);
      g.p = String(g.p || "").trim();
      if (!g.l) delete g.l;
      if (!g.m) delete g.m;
      if (!g.q) delete g.q;
    }
    /* tri par date : les blocus se lisent dans l'ordre du mouvement. On compare
       les dates ISO (x.z) et non le libellé affiché (x.j) : « 29/09 et 01/10 »
       se compare après « 01/10 », et les jours se lisaient à l'envers. */
    parEtab[k].sort((a, b) => {
      const za = a.z || a.j || "", zb = b.z || b.j || "";
      if (za !== zb) return za < zb ? -1 : 1;
      return a.n.localeCompare(b.n, "fr");
    });
  }

  cles.sort((a, b) => {
    const ca = a.slice(0, a.indexOf("|"));
    const cb = b.slice(0, b.indexOf("|"));
    const d = rangDep(depDe(ca)) - rangDep(depDe(cb));
    if (d) return d;
    return a.localeCompare(b, "fr");
  });

  return { parEtab, cles, relire, rattaches, deja, unites: unites.size, exclus: exclus };
}

function ecrireBlocus(bl, nbTotaux) {
  const corps = bl.cles
    .map((k) => {
      const liste = bl.parEtab[k]
        .map((x) => {
          const c = ['n: ' + JSON.stringify(x.n)];
          if (x.j) c.push('j: ' + JSON.stringify(x.j));
          if (x.z) c.push('z: ' + JSON.stringify(x.z));
          if (x.l) c.push('l: ' + JSON.stringify(x.l));
          if (x.p) c.push('p: ' + JSON.stringify(x.p));
          if (x.q) c.push('q: ' + JSON.stringify(x.q));
          if (x.m) c.push('m: ' + JSON.stringify(x.m));
          return "  { " + c.join(", ") + " }";
        })
        .join(",\n");
      return "window.BLOCUS[" + JSON.stringify(k) + "] = [\n" + liste + "\n];";
    })
    .join("\n\n");

  const entete =
    "/* Les blocus relevés sur le terrain — fichier généré.\n" +
    " * Sources : recherche-blocus-2026/blocus-lycees-2026.json\n" +
    " *           blocus_lycees_colleges_france_2026.txt (rapport du 3 octobre)\n" +
    " * Régénérer : node build/import-blocus.js\n" +
    " *\n" +
    " * Les deux sources sont fusionnées établissement par établissement et jour\n" +
    " * par jour : une même ligne racontée deux fois n'en fait qu'une, qui garde le\n" +
    " * lien de presse de la recherche et la citation du rapport.\n" +
    " *\n" +
    " * " + nbTotaux.releves + " relevés, " + bl.rattaches + " rattachés à un établissement,\n" +
    " * " + bl.cles.length + " établissements, " + bl.relire.length + " à relire\n" +
    " * (voir build/blocus-a-relire.txt).\n" +
    /* Les jours écartés à la main sont écrits dans le fichier publié : une
       exclusion qu'on ne voit plus finit par ressembler à un oubli. */
    (bl.exclus && bl.exclus.length
      ? " *\n" +
        " * " + bl.exclus.length + (bl.exclus.length > 1 ? " jours écartés à la main" : " jour écarté à la main") + " :\n" +
        bl.exclus.map((e) => " *   " + e.jour + "  " + e.nom + " — " + e.pourquoi + "\n").join("")
      : "") +
    " *\n" +
    " * Champs : n = le blocus, j = le jour, z = les dates, l = le lien de presse,\n" +
    " * p = d'où vient la ligne et avec quelle certitude, q = la citation de la\n" +
    " * source, m = les médias cités quand il n'y a pas de lien.\n" +
    " *\n" +
    " * Ne pas modifier ce fichier : pour ajouter un blocus à la main, c'est\n" +
    " * build/blocus.js. Les deux sont lus par la page : les relevés comme les\n" +
    " * relevés. */\n" +
    "window.BLOCUS = window.BLOCUS || {};\n\n" + corps + "\n";
  return entete;
}

/* ------------------------------------------------------------------ le menu */

/** tous les établissements de France, groupés par département, pour le menu
    déroulant du questionnaire : "Nom|code INSEE de la commune" */
function construireMenu(data) {
  const parDep = {};
  for (const [dep, d] of Object.entries(data.ecoles)) {
    const lot = { C: [], L: [] };
    for (const [code, liste] of Object.entries(d.villes || {})) {
      for (const e of liste) lot[e.t === "C" ? "C" : "L"].push({ n: e.n, c: code });
    }
    for (const t of ["C", "L"]) {
      const vus = new Set();
      lot[t] = lot[t]
        .filter((e) => {
          const k = plat(e.n) + "@" + e.c;
          if (!e.n || vus.has(k)) return false;
          vus.add(k);
          return true;
        })
        .sort((a, b) => a.n.localeCompare(b.n, "fr") || a.c.localeCompare(b.c));
    }
    parDep[dep] = lot;
  }
  const noms = {};
  for (const [dep, d] of Object.entries(data.communes)) noms[dep] = d.nom || dep;

  const deps = Object.keys(parDep).sort((a, b) => rangDep(a) - rangDep(b));
  let n = 0;
  const corps = deps
    .map((d) => {
      n += parDep[d].C.length + parDep[d].L.length;
      return (
        JSON.stringify(d) + ":{" +
        '"C":[' + parDep[d].C.map((e) => JSON.stringify(e.n + "|" + e.c)).join(",") + "]," +
        '"L":[' + parDep[d].L.map((e) => JSON.stringify(e.n + "|" + e.c)).join(",") + "]}"
      );
    })
    .join(",\n");
  return { corps, n, deps, noms };
}

function ecrireMenu(menu) {
  const entete =
    "/* Les établissements de France, par département — fichier généré.\n" +
    " * Source : build/ecoles/XX.js (annuaire de l'Éducation)\n" +
    " * Régénérer : node build/import-blocus.js\n" +
    " *\n" +
    " * Entrée : \"Nom de l'établissement|code INSEE de sa commune\".\n" +
    " * C = collège ou lycée général et technologique\n" +
    " * L = lycée professionnel, LP, lycée agricole, institut…\n" +
    " *\n" +
    " * C'est la liste du menu déroulant du questionnaire de signalement.\n" +
    " * Elle pèse un demi-mégaoctet : les pages qui ont seulement besoin du\n" +
    " * nom des départements chargent dep-noms.js, bien plus léger.\n" +
    " * Ne pas modifier à la main. */\n" +
    "window.ECOLES_FR = {\n" + menu.corps + "\n};\n\n" +
    "window.DEP_FR = " + JSON.stringify(menu.noms) + ";\n";
  return entete;
}

/** Les noms de départements, seuls. 101 entrées pèsent 3 Ko ; les charger à
    côté des 476 Ko d'établissements pour écrire « Indre-et-Loire » serait
    du gaspillage. */
function ecrireNomsDep(menu) {
  return (
    "/* Les noms des départements — fichier généré (une ligne par fichier).\n" +
    " * Source : build/ecoles/XX.js\n" +
    " * Régénérer : node build/import-blocus.js\n" +
    " *\n" +
    " * window.DEP_FR[\"37\"] = \"Indre-et-Loire\"\n" +
    " * Ne pas modifier à la main. */\n" +
    "window.DEP_FR = " + JSON.stringify(menu.noms) + ";\n"
  );
}

/** Les noms des seules communes qui portent un blocus. Le tableau les affiche
    dans ses remarques : « 76351 » n'apprend rien au lecteur, « Le Havre » si.

    On ne lit pas les fichiers de communes — 36 Mo de polygones — mais on en
    extrait les paires « c », « n » par expression régulière : c'est la seule
    information dont on a besoin, et elle est en tête de chaque commune. */
function ecrireNomsCommunes(codes) {
  const parDep = {};
  for (const c of codes) {
    const d = depDe(c);
    (parDep[d] || (parDep[d] = [])).push(c);
  }

  const noms = {};
  for (const d of Object.keys(parDep).sort()) {
    const fichier = path.join(DIR_COMMUNES, d + ".js");
    let texte;
    try { texte = fs.readFileSync(fichier, "utf8"); }
    catch (err) {
      console.warn("  ! pas de fichier de communes pour le département " + d);
      continue;
    }
    /* les codes de Corse sont en lettres (2A004, 2B033) : cinq caractères,
       pas cinq chiffres */
    const re = /"c":"([0-9A-Z]{5})","n":"([^"]*)"/g;
    let m;
    while ((m = re.exec(texte)) !== null) {
      if (parDep[d].indexOf(m[1]) >= 0) noms[m[1]] = m[2];
    }
  }

  const manquantes = [...codes].filter((c) => !noms[c]);
  if (manquantes.length) {
    console.warn("  ! " + manquantes.length + " commune(s) sans nom : " +
      manquantes.slice(0, 10).join(", "));
  }

  return (
    "/* Les noms des communes qui portent un blocus — fichier généré.\n" +
    " * Source : build/communes/XX.js\n" +
    " * Régénérer : node build/import-blocus.js\n" +
    " *\n" +
    ' * window.COMMUNES_BLOCUS["76351"] = "Le Havre"\n' +
    " * Ne pas modifier à la main. */\n" +
    "window.COMMUNES_BLOCUS = " + JSON.stringify(noms) + ";\n"
  );
}

/* -------------------------------------------------------------------- main */

function main() {
  const releves = JSON.parse(fs.readFileSync(SRC_RELEVES, "utf8"));
  for (const r of releves) r.origine = "recherche";
  const doc = lireDocument();
  const tous = doc.releves.concat(releves);

  const data = charger();
  const bl = importBlocus(tous, data);
  const menu = construireMenu(data);

  const parDepBlocus = {};
  for (const k of bl.cles) {
    const d = depDe(k.slice(0, k.indexOf("|")));
    parDepBlocus[d] = (parDepBlocus[d] || 0) + 1;
  }
  const communes = new Set(bl.cles.map((k) => k.slice(0, k.indexOf("|"))));

  if (!DRY) {
    fs.writeFileSync(
      OUT_BLOCUS,
      ecrireBlocus(bl, { releves: tous.length }),
      "utf8"
    );
    fs.writeFileSync(OUT_ECOLES, ecrireMenu(menu), "utf8");
    fs.writeFileSync(OUT_DEPNOMS, ecrireNomsDep(menu), "utf8");
    fs.writeFileSync(OUT_COMNOMS, ecrireNomsCommunes(communes), "utf8");
    fs.writeFileSync(
      OUT_RELIRE,
      relireTexte(bl.relire, tous.length, doc),
      "utf8"
    );
  }

  console.log("lignes du rapport du 3 octobre          :", doc.releves.length);
  console.log("relevés dans le fichier de recherche    :", releves.length);
  console.log("  rattachés à un établissement         :", bl.rattaches);
  console.log("  dont dans une autre commune de l'annuaire :", bl.deja);
  console.log("  à relire à la main                   :", bl.relire.length);
  console.log("  dont issues du seul rapport           :", bl.relire.filter((x) => x.r.origine === "rapport").length);
  console.log("  établissement et jour distincts       :", bl.unites);
  /* Une exclusion qui ne trouve plus rien est presque toujours une faute de
     frappe : elle donne l'illusion d'avoir retiré un blocus de la carte. */
  const ecartes = new Set(bl.exclus.map((e) => e.code + "@" + e.jour));
  const sansEffet = [...HORS_CARTE.keys()].filter((k) => !ecartes.has(k));
  console.log("  jours écartés à la main               :", bl.exclus.length);
  if (sansEffet.length) {
    console.log("  !! exclusions sans effet (rien à retirer) :", sansEffet.join(", "));
  }
  console.log("lignes du rapport laissées de côté      :", doc.annexe.filter((a) => a.section).length);
  console.log("lignes de la liste principale à vérifier :", doc.annexe.filter((a) => !a.section).length);
  console.log("blocus écrits                          :",
    bl.cles.reduce((a, k) => a + bl.parEtab[k].length, 0),
    "sur", bl.cles.length, "établissements");
  console.log("communes colorées                      :", communes.size);
  console.log("départements colorés                   :", Object.keys(parDepBlocus).length);
  console.log("  " + Object.keys(parDepBlocus).sort((a, b) => rangDep(a) - rangDep(b))
    .map((d) => d + ":" + parDepBlocus[d]).join(" "));
  console.log("établissements du menu déroulant       :", menu.n, "sur", menu.deps.length, "départements");
  console.log(DRY ? "(--dry : rien n'a été écrit)" : "écrits : " +
    [OUT_BLOCUS, OUT_ECOLES, OUT_DEPNOMS, OUT_COMNOMS, OUT_RELIRE].map((f) => path.relative(ROOT, f)).join(", "));
}

function relireTexte(relire, nbTotaux, doc) {
  let s = "Relevés non rattachés à un établissement\n" +
    "=====================================\n\n" +
    "Généré par build/import-blocus.js. " + relire.length + " relevés sur " + nbTotaux + ".\n" +
    "Ils ne sont pas dans la carte : chaque ligne dit pourquoi, pour qu'on\n" +
    "puisse trancher à la main (et ajouter le blocus dans build/blocus.js, ou\n" +
    "corriger le relevé puis relancer node build/import-blocus.js).\n\n";
  for (const { r, pourquoi } of relire) {
    s += "- " + (r.dep || "??").padEnd(3) + " " + (r.commune || "?").padEnd(24) +
      " " + (r.nom_releve || "?").padEnd(34) +
      " " + (r.dates || "").padEnd(24) + libelle(r.statut_action) +
      (r.origine === "rapport" ? "   [rapport]" : "") + "\n";
    s += "    -> " + pourquoi + "\n";
    if (r.source) s += "    " + r.source + "\n";
    if (r.citation) s += "    " + r.citation + "\n";
    if (r.medias) s += "    " + r.medias + "\n";
    if (r.note) s += "    note : " + r.note + "\n";
  }

  /* Le rapport distingue aussi ce qui n'est pas un blocus : les mobilisations sans
     accès empêché, les blocages annoncés puis empêchés, les contradictions entre
     sources, les négatifs prouvés. Ce sont des informations, pas des blocus : elles
     ne vont pas dans la carte, mais elles ne doivent pas disparaître non plus. */
  const annexes = [
    [6, "6. Mobilisations, fermetures administratives, tentatives"],
    [7, "7. Contradictions entre sources"],
    [8, "8. Négatifs prouvés — des sources disent qu'il n'y a pas eu de blocus"],
  ];
  const sections = annexes.map(([n, titre]) => [titre + " — " +
    doc.annexe.filter((a) => a.section === n).length + " lignes",
    doc.annexe.filter((a) => a.section === n)]);
  if (sections.some((x) => x[1].length)) {
    s += "\n\nCe que le rapport du 3 octobre laisse de côté\n" +
      "============================================\n\n" +
      "Ces lignes ne satisfont pas la définition retenue : une mobilisation sans\n" +
      "accès empêché n'est pas un blocus, et une contradiction n'est pas un verdict.\n" +
      "Elles sont recopiées telles quelles pour que la relecture les voie, et le\n" +
      "document entier est dans blocus_lycees_colleges_france_2026.txt.\n";
    for (const [titre, liste] of sections) {
      if (!liste.length) continue;
      s += "\n" + titre + "\n" + "-".repeat(titre.length) + "\n";
      for (const a of liste) {
        s += "- " + (a.dep || "  —").padEnd(4) + " " + a.texte + "\n";
        if (a.suite) s += "    " + a.suite + "\n";
      }
    }
  }

  /* Les lignes de la liste principale que le format n'a pas su découper, et
     celles qui sont entrées sans source : la carte les montre quand même, mais
     la relecture doit le savoir — c'est le seul endroit où se voit ce que le
     script a dû deviner. */
  const rates = doc.annexe.filter((a) => !a.section);
  if (rates.length) {
    const sansSource = rates.filter((a) => /aucune source/.test(a.rejet || "")).length;
    s += "\n\nLignes de la liste principale à vérifier — " + rates.length +
      (sansSource ? " (" + sansSource + " sans source)" : "") + "\n" +
      "====================================================\n\n" +
      "Le script a dû compléter ou deviner ces lignes ; elles sont dans la carte,\n" +
      "mais il vaut mieux les relire que les faire disparaître.\n\n";
    for (const a of rates) {
      s += "- ligne " + a.ligne + " (" + a.dep + ") : " + (a.rejet || "format inattendu") + "\n";
      s += "    " + a.texte + "\n";
    }
  }
  return s;
}

main();