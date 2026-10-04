/* ===========================================================================
   signaler.js — le questionnaire de signalement d'un blocus.

   Le formulaire est court, parce qu'une personne répond entre deux cours :
   un établissement, un jour, un paragraphe, une preuve. Tout le reste est
   facultatif.

   Deux chemins pour envoyer, parce que la page doit marcher sans serveur :

     * serveur local (python serve.py) : POST /api/demande, et la demande est
       écrite dans demandes_blocus/ en un .json par signalement ;

     * double-clic sur le fichier (protocole file://) : aucun serveur ne peut
       rien ecrire sur le disque, donc on propose le .json au telechargement.
       Il reste a le deposer dans demandes_blocus/, ce que la page explique.

   L'etat du formulaire est memorise : on ne recommence pas a tout retaper si
   on a oublie de valider.

       <script src="build/dep-noms.js"></script>
       <script src="build/ecoles-fr.js"></script>
       <script src="build/porte-ecole.js"></script>
       <script src="build/signaler.js"></script>
   =========================================================================== */

window.SIGNALER = window.SIGNALER || {};

(function () {
  var CLE = "blocus.signaler.v1";

  /* Les natures de blocus qu'on a vues sur le terrain. C'est une liste
     courte : on ne demande pas de choisir dans un catalogue, on demande
     de dire ce qui s'est passe. */
  var NATURES = [
    ["blocus", "Blocus : l'entrée est bloquée"],
    ["blocus-incidents", "Blocus et incidents"],
    ["rassemblement", "Rassemblement devant l'établissement"],
    ["grève", "Grève, appel à la grève"],
    ["fermeture", "Fermeture administrative"],
    ["manifestation", "Manifestation"],
    ["occupation", "Occupation"],
    ["autre", "Autre (à expliquer dans la description)"],
  ];

  function el(id) { return document.getElementById(id); }
  function echap(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function aujourdhui() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) +
           "-" + (d.getDate() < 10 ? "0" : "") + d.getDate();
  }

  /* ---------------------------------------------------------- la porte */

  /* Le formulaire ne s'ouvre qu'après le département et la certification.
     Ce n'est pas une formalityité : une carte de France n'a pas grand sens
     pour qui se trouve hors de France, et les signalements hors France
     fausseraient les décomptes par département.

     Les deux menus — départements, puis établissements — sont remplis par
     build/porte-ecole.js, que ajouter-une-revendication.html utilise aussi. */
  function porte() {
    PORTE.remplirDepartements(el("dep"));
  }

  function majPorte() {
    var d = el("dep").value;
    var c = el("certifie").checked;
    var ok = !!d && c;
    var b = el("ouvrir");
    b.disabled = !ok;
    var pourquoi = el("pourquoi");
    if (ok) {
      pourquoi.textContent = "";
    } else if (!d && !c) {
      pourquoi.textContent = "Choisissez votre département, puis cochez la case.";
    } else if (!d) {
      pourquoi.textContent = "Il manque le département.";
    } else {
      pourquoi.textContent = "Il reste à cocher la case du bas.";
    }
  }

  /* ------------------------------------------------- les établissements */

  /** Les établissements d'un département, et le menu qui les propose : c'est
      aussi dans build/porte-ecole.js, pour que les deux formulaires du site
      proposent exactement la même liste. */
  function etablissements(dep, type) {
    return PORTE.liste(dep, type);
  }

  function majEtablissements() {
    PORTE.remplirEtablissements(el("dep").value, el("type").value, el("eta"), el("etaMsg"));
  }

  /** remplit le menu des natures. La liste est courte et figée : elle
      describes ce qu'on a réellement vu, et non toutes les catégories
      imaginables. */
  function majNature() {
    var n = el("nature");
    var t = n.value;
    n.innerHTML = '<option value="">Choisir…</option>' +
      NATURES.map(function (x) {
        return '<option value="' + echap(x[0]) + '">' + echap(x[1]) + "</option>";
      }).join("");
    if (t) n.value = t;
  }

  /* ------------------------------------------------------ ce qu'on garde */

  function lire() {
    return {
      dep: el("dep").value,
      certifie: el("certifie").checked,
      type: el("type").value,
      eta: el("eta").value,
      date: el("date").value,
      nature: el("nature").value,
      description: el("description").value,
      lien: el("lien").value,
      source: el("source").value,
    };
  }

  function garder() {
    try { localStorage.setItem(CLE, JSON.stringify(lire())); } catch (e) { /* plein ou bloqué */ }
  }

  function commander() {
    var d = lire();
    var u = new URLSearchParams();
    if (d.dep) u.set("dep", d.dep);
    if (d.eta) u.set("eta", d.eta.split("|")[0]);
    if (d.type) u.set("type", d.type);
    if (d.date) u.set("date", d.date);
    u.set("certifie", "1");
    return u.toString();
  }

  /* ---------------------------------------------------------- envoyer */

  /** Un nom de fichier lisible : sans accents, sans ponctuation. Les accents
      sont décomposés puis supprimés — c'est le seul moyen d'en venir à bout
      quelle que soit la façon dont le navigateur a encodé la chaîne.

      C'est le nom que porterait le serveur : jour_établissement_heure, dans
      cet ordre, avec les mêmes abréviations. Le serveur, lui, ajoute `_#1`,
      `_#2`… quand d'autres personnes ont signalé le même établissement ce
      jour-là ; hors ligne, rien ne sait ce que contient déjà le dossier, et
      c'est à la main qu'on renomme le fichier déposé. */
  function nomFichier(d) {
    var etab = (d.eta || "etablissement").split("|")[0];
    var sans = etab.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var slug = sans.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      .toLowerCase().slice(0, 48);
    var maintenant = new Date();
    var heure = maintenant.toTimeString().slice(0, 8).replace(/:/g, "");
    return (d.date || aujourdhui()) + "_" + (slug || "etablissement") +
      "_" + heure + ".json";
  }

  /** Ce qu'on enregistre. Les champs sont en français : le fichier doit être
      lisible par quelqu'un qui l'ouvre dans un éditeur de texte, et par
      l'importeur s'il fabrique un jour un blocus à partir des signalements. */
  function demande(d) {
    var i = d.eta.lastIndexOf("|");
    var nomEtab = i < 0 ? d.eta : d.eta.slice(0, i);
    var codeCom = i < 0 ? "" : d.eta.slice(i + 1);
    return {
      version: 1,
      recu_le: new Date().toISOString().slice(0, 19),
      departement: d.dep,
      nom_departement: (window.DEP_FR || {})[d.dep] || "",
      certifie_en_france: true,
      type: d.type,
      type_lisible: d.type === "C" ? "collège ou lycée général et technologique"
                  : d.type === "L" ? "lycée professionnel, agricole ou institut"
                  : "",
      etablissement: nomEtab,
      code_insee_commune: codeCom,
      date: d.date,
      nature: d.nature,
      description: d.description,
      lien_preuve: d.lien,
      signale_par: d.source,
    };
  }

  function afficher(texte, classe) {
    var r = el("resultat");
    r.className = "res " + (classe || "");
    r.innerHTML = texte;
    r.hidden = false;
  }

  function envoyer(e) {
    e.preventDefault();
    var d = lire();
    var erreurs = [];
    if (!d.dep) erreurs.push("le département");
    if (!d.certifie) erreurs.push("la case « je certifie être en France »");
    if (!d.type) erreurs.push("le genre d'établissement");
    if (!d.eta) erreurs.push("l'établissement");
    if (!d.description.trim()) erreurs.push("la description");
    if (erreurs.length) {
      afficher("Il manque : " + erreurs.join(", ") + ".", "ko");
      return;
    }

    var corps = demande(d);
    el("envoyer").disabled = true;
    afficher("Envoi en cours…", "attente");

    /* Un serveur local répond ; un double-clic sur le fichier, non. On tente
       le POST, et au premier échec on bascule sur le téléchargement. */
    fetch("api/demande", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corps),
    }).then(function (r) {
      return r.json().then(function (j) { return { ok: r.ok, corps: j }; });
    }).then(function (r) {
      if (!r.ok) throw new Error((r.corps && r.corps.erreur) || "réponse refusée");
      /* Plusieurs personnes signalent le même établissement le même jour : le
         serveur a numéroté ce fichier pour le distinguer des autres, et le dit
         à la personne — un numéro n'a pas d'intérêt si personne ne le voit. */
      var monde = r.corps.personnes || 1;
      var serie = monde > 1
        ? " D'autres personnes avaient signalé cet établissement ce jour-là : " +
          "votre signalement est le " + monde + "e de la série, d'où le " +
          "<code>_#" + (monde - 1) + "</code> dans son nom."
        : "";
      afficher(
        "<b>Demande enregistrée.</b> Votre demande de signalement a été mise dans " +
        "le dossier des demandes (<code>demandes_blocus/" + echap(r.corps.fichier) +
        "</code>).<br>Elle n'apparaît pas encore sur la carte : les signalements sont " +
        "relus avant d'être publiés." + serie, "ok");
      try { localStorage.removeItem(CLE); } catch (x) { /* rien à faire */ }
      el("formulaire").reset();
      /* reset() revient à la valeur inscrite dans le HTML, et le champ date
         n'en a pas : sans ceci, un second signalement depuis la même page
         partirait sans jour et serait refusé. */
      el("date").value = aujourdhui();
      majPorte();
      majEtablissements();
    }).catch(function (err) {
      /* Pas de serveur : on donne le fichier. C'est le même contenu, écrit
         par la main dans le dossier, et la page explique comment. */
      telecharger(corps, d);
      afficher(
        "<b>Aucun serveur n'a répondu</b> (" + echap(err.message) + ").<br>" +
        "Votre demande a été téléchargée sous le nom " +
        "<code>" + echap(nomFichier(d)) + "</code> : placez le fichier dans le " +
        "dossier des demandes <code>demandes_blocus/</code>. Pour que " +
        "l'enregistrement soit automatique, lancez <code>python serve.py</code> " +
        "et rechargez la page.",
        "partiel");
    }).then(function () {
      el("envoyer").disabled = false;
    });
  }

  /** le même .json, proposé au téléchargement : c'est le seul moyen
      d'écrire un fichier depuis une page ouverte par double-clic */
  function telecharger(corps, d) {
    var texte = JSON.stringify(corps, null, 2) + "\n";
    var blob = new Blob([texte], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = nomFichier(d);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  /* --------------------------------------------------------- démarrage */

  function demarrer() {
    porte();
    majNature();
    majPorte();
    majEtablissements();

    var p = new URLSearchParams(location.search);
    PORTE.depuisUrl(function (d) {
      if (d.dep && el("dep").querySelector('option[value="' + d.dep + '"]')) el("dep").value = d.dep;
      if (d.type && el("type").querySelector('option[value="' + d.type + '"]')) el("type").value = d.type;
      el("certifie").checked = d.certifie;
    });

    var date = p.get("date");
    el("date").value = /^\d{4}-\d{2}-\d{2}$/.test(date || "") ? date : aujourdhui();

    majPorte();
    majEtablissements();

    /* Le lien « Signaler un blocus ici » du panneau d'un établissement arrive
       avec le nom déjà écrit : on le sélectionne dans le menu, et on le
       propose tel quel s'il n'y est plus — un établissement peut avoir changé
       de nom, et il vaut mieux un nom à relire qu'un signalement perdu. */
    PORTE.choisirOuProposer(el("eta"), p.get("eta"));

    /* Un brouillon écrit dans le navigateur, repris au retour.

     La description est le champ le plus long et le plus difficile à
     réécrire : perdre une demi-page de récit parce qu'on a rechargé la page
     par accident serait la meilleure façon de décourager les gens. Le
     brouillon est effacé dès l'envoi. Il est ignoré si la page arrive d'un
     lien « Signaler un blocus ici », qui sait déjà l'établissement : là,
     c'est le lien qui gagne, puisqu'il vient d'être cliqué. */
  function reprendre() {
    var b;
    try { b = JSON.parse(localStorage.getItem(CLE) || "null"); } catch (e) { return; }
    if (!b || typeof b !== "object") return;
    if (new URLSearchParams(location.search).get("dep")) return;

    if (b.dep && el("dep").querySelector('option[value="' + b.dep + '"]')) {
      el("dep").value = b.dep;
    }
    if (b.type && el("type").querySelector('option[value="' + b.type + '"]')) {
      el("type").value = b.type;
    }
    /* la case d'abord : c'est elle qui donne au bouton « Ouvrir » son droit
       d'exister, et la rappeler après majPorte() laisserait la porte fermée
       alors que le questionnaire est déjà rempli */
    if (b.certifie) el("certifie").checked = true;
    majPorte();
    majEtablissements();

    if (b.eta) {
      for (var i = 0; i < el("eta").options.length; i++) {
        if (el("eta").options[i].value === b.eta) { el("eta").selectedIndex = i; break; }
      }
    }
    ["date", "nature", "description", "lien", "source"].forEach(function (id) {
      if (b[id]) el(id).value = b[id];
    });

    /* Le formulaire se rouvre seulement s'il était déjà ouvert : revenir sur
       la porte fermée, c'est respecter le lecteur. */
    if (b.eta || b.description) {
      el("formulaire").hidden = false;
      el("ouvrir").textContent = "Refermer le questionnaire";
    }
  }

  reprendre();

    el("ouvrir").addEventListener("click", function () {
      var f = el("formulaire");
      f.hidden = !f.hidden;
      this.textContent = f.hidden ? "Ouvrir le questionnaire" : "Refermer le questionnaire";
      if (!f.hidden) {
        majEtablissements();
        el("type").focus();
      } else {
        el("dep").focus();
      }
    });

    ["dep", "certifie", "type", "eta", "date", "nature", "description", "lien", "source"]
      .forEach(function (id) {
        var f = el(id);
        if (!f) return;
        f.addEventListener("change", function () {
          if (id === "dep" || id === "type") majEtablissements();
          if (id === "dep" || id === "certifie") majPorte();
          garder();
        });
        f.addEventListener("input", garder);
      });

    el("formulaire").addEventListener("submit", envoyer);

    window.SIGNALER.natures = NATURES;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }

  window.SIGNALER.etablissements = etablissements;
  window.SIGNALER.demande = demande;
  window.SIGNALER.nomFichier = nomFichier;
})();