/* ===========================================================================
   filtre.js — le jour de blocus affiché, sur les deux cartes.

   Les deux cartes racontent la même chose à des échelles différentes : la
   carte de France colorie les départements, la carte des communes colorie les
   communes. Il faut donc que le filtre soit calculé une seule fois et partagé,
   sans quoi un département violet pourrait cacher des communes blanches.

   ---------------------------------------------------------------------------
   LA RÉPONSE
   ---------------------------------------------------------------------------
   Un jour, choisi entre le 1er septembre et le 31 octobre 2026 : on ne voit
   que les blocus de ce jour-là. La barre propose tous les jours de ces deux
   mois, et non seulement ceux où il y a eu un blocus : le dimanche 4 octobre
   n'a rien, et cette absence doit se voir au lieu de se deviner.

   Il n'y a plus de « blocus en cours ». Ce mode affichait tout ce qui allait
   venir, jour après jour, et son résumé « aujourd'hui et les jours suivants »
   disait sur la carte une information qu'elle donnait déjà. Le jour choisi est
   posé dans le localStorage : on peut changer de carte sans le perdre.

   Le tableau n'a pas de barre : il demande l'état et entoure la ligne du jour,
   il lui faut donc le même jour par défaut que la barre.

   Un blocus qui a duré deux jours compte les deux fois : il est bien présent
   le premier jour, et il l'est encore le second.
   =========================================================================== */

window.FILTRE = window.FILTRE || {};

(function () {
  var CLE = "blocus.filtre.v2";

  /* La période dont on parle commence au 1er septembre 2026 : avant, le
     mouvement ne couvrait pas encore la France entière. Elle va jusqu'au
     31 octobre 2026, et la barre propose tous les jours de ces deux mois —
     y compris ceux sans aucun blocus, qui sont des jours sans blocus et non
     des jours absents. */
  var DEBUT = "2026-09-01";
  var FIN = "2026-10-31";

  /* ------------------------------------------------------------------ dates */

  /** aujourd'hui, en AAAA-MM-JJ, heure locale */
  function aujourdhui() {
    var d = new Date();
    return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  function iso(a, m, j) {
    return a + "-" + (m < 10 ? "0" : "") + m + "-" + (j < 10 ? "0" : "") + j;
  }

  function plus(texte, n) {
    var p = texte.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  function comparer(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  function enDate(texte) {
    var p = String(texte).split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  /** « mardi 1er septembre » — pour un jour choisi, lisible d'un coup d'œil.
      Une date illisible ne doit pas produire « undefined NaN undefined NaN » :
      elle ne se produit pas, elle est remplacée par un tiret. */
  function long(texte) {
    var d = enDate(texte);
    if (!d || isNaN(d.getTime())) return "—";
    var jours = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    var mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
                "août", "septembre", "octobre", "novembre", "décembre"];
    return jours[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] +
           (d.getFullYear() !== new Date().getFullYear() ? " " + d.getFullYear() : "");
  }

  function court(texte) {
    var p = String(texte).split("-");
    return p[2] + "/" + p[1];
  }

  /* -------------------------------------------------------------- l'état */

  var etat = { jour: "" };
  var lu = false;
  var defautTrouve = false;

  /* Une seule fois, sauf demande : l'état est celui de la barre, et le
     relire à chaque appel le remitait à zéro au milieu d'un rendu. C'est ce
     qui faisait qu'un changement de jour était perdu — le premier
     appelant relisait un état vide et l'écrivait ensuite. */
  function lire(forcer) {
    if (lu && !forcer) return;
    lu = true;
    etat.jour = "";
    try {
      var brut = localStorage.getItem(CLE);
      if (!brut) return;
      var lu2 = JSON.parse(brut);
      /* Le champ `mode` a disparu avec le mode « en cours », on l'ignore donc :
         une ancienne valeur { mode: "jour", jour: … } reste bonne, et une
         ancienne { mode: "cours" } — qui n'a pas de jour — retombe sur le
         jour par défaut, choisi plus bas d'après les blocus connus. */
      if (lu2 && /^\d{4}-\d{2}-\d{2}$/.test(lu2.jour || "")) etat.jour = lu2.jour;
    } catch (err) { /* un localStorage plein ou bloqué ne doit rien casser */ }
  }

  /** relire malgré tout : après une écriture faite ailleurs, comme le
      paramètre ?j= du tableau. Le jour par défaut doit être redonné aussi,
      sinon un jour effacé resterait vide. */
  function recharger() { defautTrouve = false; lire(true); }

  function ecrire() {
    try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (err) { /* idem */ }
  }

  /* --------------------------------------------------------- les blocus */

  /** les jours d'un blocus, en AAAA-MM-JJ.
      Le champ z (que produit la recherche) est fait pour ça. Un blocus écrit
      à la main n'a que j (« 29/09 et 01/10 ») : on lui prête l'année en cours.
      Un blocus sans aucune date n'est jamais filtré : il ne disparait pas
      quand on choisit une journée. */
  function joursDe(x) {
    if (x.z) return String(x.z).split(";").filter(Boolean).sort();
    if (!x.j) return [];
    var annee = new Date().getFullYear();
    return String(x.j).split(/\s+et\s+|,\s*/).map(function (m) {
      var p = m.trim().match(/^(\d{1,2})\/(\d{1,2})$/);
      if (!p) return null;
      return iso(annee, +p[2], +p[1]);
    }).filter(Boolean).sort();
  }

  /** Le dernier jour pour lequel un blocus est connu. C'est une garde, pas la
      fin de la période : un blocus daté après le 31 octobre doit rester
      proposé plutôt que disparaître de la barre. */
  function dernierJour(B) {
    var dernier = "";
    for (var cle in B) {
      if (!Object.prototype.hasOwnProperty.call(B, cle)) continue;
      var liste = B[cle] || [];
      for (var i = 0; i < liste.length; i++) {
        var js = joursDe(liste[i]);
        for (var k = 0; k < js.length; k++) if (js[k] > dernier) dernier = js[k];
      }
    }
    return dernier;
  }

  /** Les jours proposés : tous ceux de la période, du 1er septembre au
      31 octobre 2026, un jour sur un. Les jours sans aucun blocus y sont
      aussi, et c'est délibéré : ils disent quelque chose de vrai — l'absence
      de blocus ce jour-là. On ne pouvait pas vérifier d'un coup d'œil que le
      dimanche 4 octobre est vide parce qu'aucun établissement n'était bloqué,
      et non parce que la barre l'avait oublié. */
  function joursConnus(B, jusqua) {
    lire();
    var out = [];
    var jour = DEBUT;
    var dernier = dernierJour(B || {});
    var fin = jusqua || FIN;
    if (dernier > fin) fin = dernier;
    if (fin < jour) fin = jour;
    /* on ne propose pas une liste infinie : au plus un an après le début */
    if (plus(jour, 400) < fin) fin = plus(jour, 400);
    while (jour <= fin) {
      out.push(jour);
      jour = plus(jour, 1);
    }
    return out;
  }

  /** le filtre s'applique-t-il à ce jour ? */
  function accepte(jour) {
    return !!jour && jour === jourAffiche();
  }

  /** un blocus est-il dans le filtre ?
      Un blocus sans date est toujours visible : on ne sait pas quel jour il
      est, donc on ne le cache pas. */
  function garde(x) {
    var js = joursDe(x);
    if (!js.length) return true;
    for (var i = 0; i < js.length; i++) if (accepte(js[i])) return true;
    return false;
  }

  /** window.BLOCUS réduit au filtre. La forme est celle du fichier, donc le
      reste de la page ne change pas. */
  function filtrer(B) {
    jourAffiche();
    var out = {};
    for (var cle in B) {
      if (!Object.prototype.hasOwnProperty.call(B, cle)) continue;
      var liste = B[cle] || [];
      var garde_ = [];
      for (var i = 0; i < liste.length; i++) if (garde(liste[i])) garde_.push(liste[i]);
      if (garde_.length) out[cle] = garde_;
    }
    return out;
  }

  /** y a-t-il eu un blocus ce jour-là ? Le mot « blocus » dans le nom du blocus
      suffit, et c'est le test que fait déjà le tableau (build/tableau.js, MOTS) :
      « blocus + incidents + fermeture administrative » est bien un blocus, il
      compte pour un. Un jour qui ne rassemble que des rassemblements, des
      incidents ou des fermetures administratives n'a, lui, aucun blocus. */
  function jourBloque(B, jour) {
    for (var cle in B) {
      if (!Object.prototype.hasOwnProperty.call(B, cle)) continue;
      var liste = B[cle] || [];
      for (var i = 0; i < liste.length; i++) {
        if (joursDe(liste[i]).indexOf(jour) < 0) continue;
        if (/\bblocus/i.test(String(liste[i].n || ""))) return true;
      }
    }
    return false;
  }

  /** le jour par défaut : le dernier jour où il y a eu un blocus, c'est-à-dire
      celui qui intéresse le plus souvent. Un jour sans aucun blocus ne
      proposerait qu'une carte vide, alors que rien ne le signale : le
      5 octobre 2026 n'a qu'un rassemblement en Guadeloupe, et le rapport écrit
      lui-même qu'aucun blocus n'est documenté du 3 au 5 octobre. Le jour reste
      proposé dans la barre — on peut vouloir le voir — mais il n'est pas celui
      sur lequel le site s'ouvre. À défaut, le dernier jour connu : mieux vaut
      une carte pauvre qu'une carte absente. Une chaîne vide si les blocus ne
      sont pas encore chargés — on réessaiera à la demande suivante. */
  function jourParDefaut() {
    var B = window.BLOCUS || {};
    var connus = joursConnus(B, "");
    for (var i = connus.length - 1; i >= 0; i--) {
      if (jourBloque(B, connus[i])) return connus[i];
    }
    return connus.length ? connus[connus.length - 1] : "";
  }

  /** Le jour réellement affiché : celui qui est mémorisé, ou le jour par
      défaut. Toutes les entrées du filtre passent par là — la barre, la carte,
      le tableau et le libellé du panneau — parce qu'une page qui n'a pas de
      barre (le tableau, la carte d'un département) n'appelle jamais poser(),
      et affichait alors un jour vide.

      Un jour mémorisé qui n'est plus dans la liste est remplacé lui aussi :
      poser() ne le faisait que sur les pages qui ont la barre, si bien qu'un
      jour devenu inconnu — des données ont été rafraîchies entre-temps —
      vidait le tableau sans qu'aucune barre ne puisse le rattraper. Résolu une
      seule fois : ces deux lectures parcourent tous les blocus, et accepte()
      est appelé autant de fois qu'il y en a. */
  function jourAffiche() {
    lire();
    if (!defautTrouve) {
      var B = window.BLOCUS || {};
      var connus = joursConnus(B, "");
      if (connus.length) {
        defautTrouve = true;
        if (!etat.jour || connus.indexOf(etat.jour) === -1) {
          var d = jourParDefaut();
          if (d) etat.jour = d;
        }
      }
      /* sans données on ne verrouille rien : le jour sera résolu plus tard */
    }
    return etat.jour;
  }

  /** le jour affiché, en toutes lettres — la barre le dit, et le panneau des
      blocus aussi, pour qu'on ne croie pas à une carte générale quand on a
      choisi un jour */
  function libelle() {
    return long(jourAffiche());
  }

  /* ----------------------------------------------------------- la barre */

  var ecouteurs = [];

  /** prévenir les deux cartes quand le filtre change */
  function surChangement(f) {
    if (typeof f === "function") ecouteurs.push(f);
  }

  function changer() {
    /* le jour affiché a pu changer sans passer par la barre — c'est le cas du
       tableau, qui n'en a pas — il faut donc le réécrire, sinon le navigateur
       garderait un jour devenu inconnu et le remettrait au chargement suivant */
    etat.jour = jourAffiche();
    ecrire();
    for (var i = 0; i < ecouteurs.length; i++) ecouteurs[i]();
  }

  /** pose la barre dans l'élément donné, avec le même aspect sur les deux
      cartes. `hote` peut être l'élément ou son identifiant : les trois pages
      qui posent la barre l'appellent de la même façon, et leur faire écrire
      `document.getElementById(...)` trois fois n'ajouterait rien. */
  function poser(hote) {
    if (!hote) return;
    if (typeof hote === "string") hote = document.getElementById(hote);
    if (!hote || !hote.querySelectorAll) return;
    lire();

    var B = window.BLOCUS || {};
    var connus = joursConnus(B, "");
    if (!connus.length) return;

    if (!etat.jour || connus.indexOf(etat.jour) === -1) etat.jour = jourParDefaut();
    ecrire();

    hote.className = "filtre";
    hote.innerHTML =
      '<span class="fl">Blocus</span>' +
      '<select class="fsel" aria-label="Journée des blocus affichés">' +
      connus.map(function (j) {
        return '<option value="' + j + '"' + (j === etat.jour ? " selected" : "") + ">" +
               long(j) + "</option>";
      }).join("") +
      "</select>";

    hote.querySelector(".fsel").addEventListener("change", function (e) {
      etat.jour = e.currentTarget.value;
      changer();
    });
  }

  window.FILTRE = {
    poser: poser,
    surChangement: surChangement,
    changer: changer,
    recharger: recharger,
    filtrer: filtrer,
    garder: garde,
    joursDe: joursDe,
    joursConnus: joursConnus,
    aujourdhui: aujourdhui,
    FIN: FIN,
    plus: plus,
    long: long,
    court: court,
    comparer: comparer,
    libelle: libelle,
    /* Le jour affiché, résolu comme partout ailleurs : une page qui demande
       l'état avant d'avoir posé la barre — le tableau — obtenait un jour vide
       et n'entourait aucune ligne. */
    etat: function () { return { jour: jourAffiche() }; },
    DEBUT: DEBUT,
  };
})();