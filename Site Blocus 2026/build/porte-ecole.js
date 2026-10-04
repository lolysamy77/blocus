/* ===========================================================================
   porte-ecole.js — choisir son département, puis son établissement.

   Deux pages ont besoin de la même chose avant d'écrire quoi que ce soit :
   signaler-un-blocus.html (un blocus) et ajouter-une-revendication.html (une
   revendication). Dans les deux cas, une revendication ou un blocus n'a pas
   de sens sans l'établissement dont il parle, et le catalogue des
   établissements est le même — l'annuaire de l'Éducation, réduit à deux
   listes par département dans build/ecoles-fr.js.

   Ce fichier ne dit donc rien du formulaire : il remplit deux menus et lit
   l'adresse. Le texte des messages reste à la page, parce qu'il n'est pas le
   même — « je certifie être en France » pour un blocus, « je certifie être
   dans cet établissement » pour une revendication.

        <script src="build/dep-noms.js"></script>
        <script src="build/ecoles-fr.js"></script>
        <script src="build/porte-ecole.js"></script>

   Une entrée d'établissement est « Nom|code INSEE de sa commune » : le nom
   seul ne suffit pas, deux établissements portent parfois le même nom dans
   deux communes d'un même département, et c'est ce code que la carte et le
   serveur connaissent.
   =========================================================================== */

window.PORTE = (function () {
  function echap(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /** Le menu des départements, dans l'ordre des noms et non des codes :
      « Ain » avant « Aisne » est plus utile que « 01 » avant « 02 ». */
  function remplirDepartements(select) {
    if (!select) return [];
    var noms = window.DEP_FR || {};
    var codes = Object.keys(noms).sort(function (a, b) {
      return String(noms[a]).localeCompare(String(noms[b]), "fr");
    });
    select.innerHTML = '<option value="">Choisir un département…</option>' +
      codes.map(function (c) {
        return '<option value="' + echap(c) + '">' + echap(noms[c]) + " (" + echap(c) + ")</option>";
      }).join("");
    return codes;
  }

  /** Les établissements d'un département : deux listes séparées, « collège »
      d'un côté, « lycée » de l'autre. « autre » — « je ne sais pas » — tombe
      dans le cas général et reçoit les deux : c'est tout l'intérêt de cette
      réponse, elle ne doit pas vider le menu. */
  function liste(dep, type) {
    var tous = (window.ECOLES_FR || {})[dep];
    if (!tous) return [];
    if (type === "C" || type === "L") return (tous[type] || []).slice();
    return (tous.C || []).concat(tous.L || []);
  }

  /** Remplit le menu des établissements. `msg` reçoit une phrase d'aide —
      combien d'établissements, ou pourquoi le menu est vide. */
  function remplirEtablissements(dep, type, select, msg) {
    if (!select) return 0;
    select.innerHTML = '<option value="">Choisir un établissement…</option>';
    if (!dep) {
      if (msg) msg.textContent = "Choisissez d’abord un département.";
      select.disabled = true;
      return 0;
    }
    select.disabled = false;

    var ets = liste(dep, type);
    if (!ets.length) {
      if (msg) msg.textContent = "Aucun établissement dans l’annuaire pour ce choix.";
      return 0;
    }
    select.innerHTML = '<option value="">Choisir un établissement…</option>' +
      ets.map(function (brut) {
        var i = brut.lastIndexOf("|");
        var nom = brut.slice(0, i);
        var code = brut.slice(i + 1);
        return '<option value="' + echap(brut) + '">' + echap(nom) + " — " + echap(code) + "</option>";
      }).join("");
    if (msg) {
      msg.textContent = ets.length + " établissement" + (ets.length > 1 ? "s" : "") + " dans le menu.";
    }
    return ets.length;
  }

  /** Sélectionne une entrée du menu par son nom seul. Renvoie vrai si le menu
      contenait déjà ce nom — le lien « Ajouter une revendication ici » ne
      connaît que le nom, parce que c'est tout ce que la page d'à côté sait
      de l'établissement. */
  function choisir(select, nom) {
    if (!select || !nom) return true;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].value.split("|")[0] === nom) {
        select.selectedIndex = i;
        return true;
      }
    }
    return false;
  }

  /** L'établissement du lien, qu'il soit dans l'annuaire ou non : un
      établissement peut avoir changé de nom, et il vaut mieux un nom à relire
      qu'une revendication perdue. */
  function choisirOuProposer(select, nom) {
    if (!select || !nom) return;
    if (choisir(select, nom)) return;
    var o = document.createElement("option");
    o.value = nom;
    o.textContent = nom + " (hors annuaire)";
    select.insertBefore(o, select.options[1] || null);
    select.selectedIndex = 1;
  }

  /** Ce que l'adresse apporte : un lien « … ici » du panneau d'un
      établissement passe le département, le genre, le nom, et « certifie=1 ».
      La case est cochée d'emblée : on vient de cliquer « … ici », la
      personne a déjà tranché cette question. */
  function depuisUrl(apply, url) {
    var p = new URLSearchParams((url || location.search).replace(/^\?/, ""));
    var demande = {
      dep: p.get("dep") || "",
      type: p.get("type") || "",
      eta: p.get("eta") || "",
      certifie: p.get("certifie") === "1",
      aDesParametres: p.has("dep") || p.has("eta"),
    };
    if (apply) apply(demande);
    return demande;
  }

  return {
    echap: echap,
    remplirDepartements: remplirDepartements,
    liste: liste,
    remplirEtablissements: remplirEtablissements,
    choisir: choisir,
    choisirOuProposer: choisirOuProposer,
    depuisUrl: depuisUrl,
  };
})();