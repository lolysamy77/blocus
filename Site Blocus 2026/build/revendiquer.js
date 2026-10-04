/* ===========================================================================
   revendiquer.js — le questionnaire de revendication d'un établissement.

   On ne rédige pas une revendication : on en choisit une. Les titres possibles
   sont ceux de l'onglet Revendications, écrits à la main dans la page et lus
   par build/extraire-rev-nationales.js, qui en fait build/rev-nationales.js —
   la même liste que celle que le serveur vérifie. Le formulaire commence donc
   par demander de quel établissement il s'agit (c'est le même principe que pour
   un signalement de blocus, et c'est build/porte-ecole.js, partagé avec
   signaler-un-blocus.html, qui remplit les deux menus), puis propose les quatorze
   demandes, et il ne reste qu'à dire ce qui manque chez soi.

   Une personne peut en proposer plusieurs : jusqu'à dix par établissement et
   par jour, plafond que le serveur applique seul. Le tableau des pourcentages,
   lui, vit dans le panneau de l'établissement (build/rev-panneau.js).

   Deux chemins pour envoyer, comme pour le signalement :

     * serveur local (python serve.py) : POST /api/revendication, et la
       revendication est écrite dans demandes_revendications/, un .json par
       revendication, avec `_#1`, `_#2`… quand d'autres élèves du même
       établissement en ont écrit le même jour ;

     * double-clic sur le fichier : aucun serveur ne peut rien écrire sur le
       disque, donc on propose le .json au téléchargement, à déposer dans
       demandes_revendications/.

   Le brouillon est gardé dans le navigateur : on ne recommence pas à tout
   retaper parce qu'on a rechargé la page.

       <script src="build/dep-noms.js"></script>
       <script src="build/ecoles-fr.js"></script>
       <script src="build/porte-ecole.js"></script>
       <script src="build/appareil.js"></script>
       <script src="build/rev-nationales.js"></script>
       <script src="build/revendiquer.js"></script>
   =========================================================================== */

window.REVENDIQUER = window.REVENDIQUER || {};

(function () {
  var CLE = "blocus.revendiquer.v1";

  function el(id) { return document.getElementById(id); }
  function echap(s) { return window.PORTE ? window.PORTE.echap(s) : String(s == null ? "" : s); }

  /* ---------------------------------------------------------- la porte */

  /* On ne demande pas « quel département ? » pour classer la revendication dans
     une colonne : on le demande parce que c'est lui qui donne la liste des
     établissements, et qu'une revendication sans établissement n'a pas de lieu
     d'exister — ni à être lue par les élèves concernés, ni à être votée. */
  function porte() {
    PORTE.remplirDepartements(el("dep"));
  }

  function majPorte() {
    var d = el("dep").value;
    var c = el("certifie").checked;
    var ok = !!d && c;
    el("ouvrir").disabled = !ok;
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

  function majEtablissements() {
    PORTE.remplirEtablissements(el("dep").value, el("type").value, el("eta"), el("etaMsg"));
  }

  /* ------------------------------------------------- les revendications possibles */

  /** Les revendications de l'onglet Revendications, telles que
      build/extraire-rev-nationales.js les a lues dans la page. Ce sont les
      seules qu'on peut choisir : si le fichier manque, le menu reste vide et
      le formulaire dit pourquoi, plutôt que d'accepter un titre écrit à la
      main — le serveur le refuserait de toute façon. */
  function liste() {
    var d = window.REV_NATIONALES;
    return d && Array.isArray(d.revendications) ? d.revendications : [];
  }

  /** Le titre choisi, ou null. La comparaison est exacte : les valeurs des
      options viennent de la même liste que le fichier, il n'y a donc rien à
      normaliser. On évite querySelector sur une valeur qui contient une
      apostrophe — une exception dans le console pour un titre. */
  function choisie() {
    var v = el("revendication").value, options = el("revendication").options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === v) return options[i].value ? v : null;
    }
    return null;
  }

  /** Le texte de la revendication choisie, sous le menu : un titre seul ne
      dit pas ce qu'on choisit. */
  function apercu() {
    var a = el("revApercu");
    var r = liste().filter(function (x) { return x.titre === choisie(); })[0];
    a.textContent = "";
    if (!r) return;
    var b = document.createElement("b");
    b.textContent = r.titre;
    a.appendChild(b);
    a.appendChild(document.createTextNode(r.texte || ""));
  }

  function remplirRevendications() {
    var s = el("revendication"), items = liste(), o, i;
    while (s.firstChild) s.removeChild(s.firstChild);
    o = document.createElement("option");
    s.appendChild(o);

    if (!items.length) {
      o.value = "";
      o.textContent = "aucune revendication à choisir";
      s.disabled = true;
      el("revMsg").textContent = "La liste des revendications n'a pas pu être "
        + "chargée. Relancez node build/extraire-rev-nationales.js, puis "
        + "rechargez la page.";
      el("envoyer").disabled = true;
      return;
    }
    o.value = "";
    o.textContent = "Choisir…";
    for (i = 0; i < items.length; i++) {
      o = document.createElement("option");
      o.value = items[i].titre;
      o.textContent = (i + 1) + ". " + items[i].titre;
      s.appendChild(o);
    }
    s.disabled = false;
    el("revMsg").textContent = items.length + " demandes, relues à la main dans "
      + "l'onglet Revendications. Le serveur n'en accepte pas d'autre.";
    apercu();
  }

  /* ------------------------------------------------------ ce qu'on garde */

  function lire() {
    return {
      dep: el("dep").value,
      certifie: el("certifie").checked,
      type: el("type").value,
      eta: el("eta").value,
      revendication: el("revendication").value,
      description: el("description").value,
      contact: el("contact").value,
    };
  }

  function garder() {
    try { localStorage.setItem(CLE, JSON.stringify(lire())); } catch (e) { /* plein */ }
  }

  /** L'établissement, coupé en deux : « Collège Alcuin|37072 » */
  function etablissement(eta) {
    var i = String(eta || "").lastIndexOf("|");
    return i < 0
      ? { nom: eta || "", code: "" }
      : { nom: eta.slice(0, i), code: eta.slice(i + 1) };
  }

  /* ---------------------------------------------------------- envoyer */

  /** Le nom que porterait le fichier : jour_code_établissement_heure, dans cet
      ordre, avec les mêmes abréviations que le serveur. Le serveur, lui,
      ajoute `_#1`, `_#2`… quand d'autres revendications du même établissement
      sont arrivées le même jour ; hors ligne, rien ne sait ce que contient déjà
      le dossier, et c'est à la main qu'on renomme le fichier déposé. */
  function nomFichier(d) {
    var e = etablissement(d.eta);
    var sans = e.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var slug = sans.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      .toLowerCase().slice(0, 48);
    var maintenant = new Date();
    var deux = function (n) { return (n < 10 ? "0" : "") + n; };
    var jour = maintenant.getFullYear() + "-" + deux(maintenant.getMonth() + 1) +
      "-" + deux(maintenant.getDate());
    var heure = deux(maintenant.getHours()) + deux(maintenant.getMinutes()) +
      deux(maintenant.getSeconds());
    return jour + "_" + (e.code || "commune") + "_" + (slug || "etablissement") +
      "_" + heure + ".json";
  }

  /** Ce qu'on enregistre. Les champs sont en français : le fichier doit être
      lisible par quelqu'un qui l'ouvre dans un éditeur de texte, et par le
      générateur qui en fera des lignes de tableau. Le titre est celui de la
      revendication choisie, et `texte_national` emporte la phrase de la page :
      le tableau s'en sert comme description quand l'élève n'a rien ajouté, et
      le dossier reste lisible même si la page change plus tard. */
  function revendication(d) {
    var e = etablissement(d.eta);
    var r = liste().filter(function (x) { return x.titre === d.revendication; })[0] || null;
    return {
      version: 1,
      recu_le: new Date().toISOString().slice(0, 19),
      source: "ajouter-une-revendication.html",
      departement: d.dep,
      nom_departement: (window.DEP_FR || {})[d.dep] || "",
      certifie_dans_etablissement: true,
      type: d.type,
      type_lisible: d.type === "C" ? "collège ou lycée général et technologique"
                  : d.type === "L" ? "lycée professionnel, agricole ou institut"
                  : "",
      etablissement: e.nom,
      code_insee_commune: e.code,
      titre: d.revendication.trim(),
      texte_national: r ? r.texte : "",
      description: d.description.trim(),
      contact: d.contact.trim(),
    };
  }

  function afficher(texte, classe) {
    var r = el("resultat");
    r.className = "res " + (classe || "");
    r.innerHTML = texte;
    r.hidden = false;
  }

  /** le même .json, proposé au téléchargement : c'est le seul moyen
      d'écrire un fichier depuis une page ouverte par double-clic */
  function telecharger(corps, nom) {
    var texte = JSON.stringify(corps, null, 2) + "\n";
    var blob = new Blob([texte], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = nom;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function envoyer(ev) {
    ev.preventDefault();
    var d = lire();
    var erreurs = [];
    if (!d.dep) erreurs.push("le département");
    if (!d.certifie) erreurs.push("la case « je certifie être dans cet établissement »");
    if (!d.type) erreurs.push("le genre d'établissement");
    if (!d.eta) erreurs.push("l'établissement");
    if (!choisie()) erreurs.push("la revendication que l'établissement soutient");
    if (erreurs.length) {
      afficher("Il manque : " + erreurs.join(", ") + ".", "ko");
      return;
    }

    var corps = revendication(d);
    var nom = nomFichier(d);
    el("envoyer").disabled = true;
    afficher("Envoi en cours…", "attente");

    APPAREIL.poster("api/revendication", APPAREIL.signature(corps))
      .then(function (r) {
        if (!r.ok) throw new Error((r.corps && r.corps.erreur) || "réponse refusée");
        var monde = r.corps.personnes || 1;
        var serie = monde > 1
          ? " C'est la " + monde + "e revendication de cet établissement " +
            "aujourd'hui : d'où le <code>_#" + (monde - 1) + "</code> dans son nom."
          : "";
        afficher(
          "<b>Revendication enregistrée.</b> Elle a été mise dans le dossier des " +
          "demandes (<code>demandes_revendications/" + echap(r.corps.fichier) +
          "</code>).<br>« " + echap(corps.titre) + " » apparaît dans le tableau des " +
          "revendications de " + echap(corps.etablissement) + ", à droite des " +
          "blocus de l'établissement, où les élèves pourront la soutenir ou s'y " +
          "opposer." +
          (r.corps.identifiant ? "<br>Son identifiant est <code>" +
            echap(r.corps.identifiant) + "</code> : c'est lui qui la relie à ses votes."
            : "") + serie,
          "ok");
        try { localStorage.removeItem(CLE); } catch (x) { /* rien à faire */ }
        el("formulaire").reset();
        majPorte();
        majEtablissements();
        apercu();
      })
      .catch(function (err) {
        /* Pas de serveur : on donne le fichier. C'est le même contenu, écrit à
           la main dans le dossier, et la page explique comment. */
        telecharger(corps, nom);
        afficher(
          "<b>Aucun serveur n'a répondu</b> (" + echap(err.message) + ").<br>" +
          "Votre revendication a été téléchargée sous le nom " +
          "<code>" + echap(nom) + "</code> : placez le fichier dans le dossier " +
          "<code>demandes_revendications/</code>, puis lancez " +
          "<code>node build/import-revendications.js</code> pour qu'elle rejoigne " +
          "le tableau de l'établissement. Un fichier déposé à la main n'est pas " +
          "relu par le serveur : vérifiez que son <code>titre</code> est bien celui " +
          "d'une revendication de la page. Pour que l'enregistrement soit " +
          "automatique, lancez <code>python serve.py</code> et rechargez la page.",
          "partiel");
      })
      .then(function () {
        el("envoyer").disabled = false;
      });
  }

  /* --------------------------------------------------------- démarrage */

  /** Un brouillon écrit dans le navigateur, repris au retour : la description
      est le champ le plus long et le plus difficile à réécrire. Effacé dès
      l'envoi, et ignoré si la page arrive d'un lien « Ajouter une
      revendication ici », qui sait déjà l'établissement : là, c'est le lien qui
      gagne, puisqu'il vient d'être cliqué.

      La revendication choisie n'est rendue que si elle existe encore dans la
      liste : la page a pu être réécrite depuis, et un menu qui proposerait un
      titre hors de la liste serait un envoi que le serveur refuse. */
  function reprendre() {
    var b;
    try { b = JSON.parse(localStorage.getItem(CLE) || "null"); } catch (e) { return; }
    if (!b || typeof b !== "object") return;
    if (new URLSearchParams(location.search).get("dep")) return;

    if (b.dep && el("dep").querySelector('option[value="' + b.dep + '"]')) el("dep").value = b.dep;
    if (b.type && el("type").querySelector('option[value="' + b.type + '"]')) el("type").value = b.type;
    /* la case d'abord : c'est elle qui donne au bouton « Ouvrir » son droit
       d'exister, et la rappeler après majPorte() laisserait la porte fermée */
    if (b.certifie) el("certifie").checked = true;
    majPorte();
    majEtablissements();
    PORTE.choisir(el("eta"), (b.eta || "").split("|")[0]);
    if (b.revendication) el("revendication").value = b.revendication;
    ["description", "contact"].forEach(function (id) {
      if (b[id]) el(id).value = b[id];
    });
    apercu();

    /* Le formulaire se rouvre seulement s'il était déjà ouvert : revenir sur la
       porte fermée, c'est respecter le lecteur. */
    if (b.eta || b.revendication) {
      el("formulaire").hidden = false;
      el("ouvrir").textContent = "Refermer le formulaire";
    }
  }

  function demarrer() {
    porte();
    remplirRevendications();
    majPorte();
    majEtablissements();

    PORTE.depuisUrl(function (d) {
      if (d.dep && el("dep").querySelector('option[value="' + d.dep + '"]')) el("dep").value = d.dep;
      if (d.type && el("type").querySelector('option[value="' + d.type + '"]')) el("type").value = d.type;
      el("certifie").checked = d.certifie;
      majPorte();
      majEtablissements();
      /* Le lien « Ajouter une revendication ici » du panneau d'un
         établissement : le nom est déjà écrit, on le sélectionne, et on
         ouvre la porte — on vient de cliquer « … ici ». */
      PORTE.choisirOuProposer(el("eta"), d.eta);
      if (d.aDesParametres) {
        el("formulaire").hidden = false;
        el("ouvrir").textContent = "Refermer le formulaire";
      }
    });

    reprendre();

    el("ouvrir").addEventListener("click", function () {
      var f = el("formulaire");
      f.hidden = !f.hidden;
      this.textContent = f.hidden ? "Ouvrir le formulaire" : "Refermer le formulaire";
      if (!f.hidden) {
        majEtablissements();
        el("type").focus();
      } else {
        el("dep").focus();
      }
    });

    ["dep", "certifie", "type", "eta", "revendication", "description", "contact"]
      .forEach(function (id) {
        var f = el(id);
        if (!f) return;
        f.addEventListener("change", function () {
          if (id === "dep" || id === "type") majEtablissements();
          if (id === "dep" || id === "certifie") majPorte();
          /* le texte de la revendication choisie se lit sous le menu, et c'est
             lui qu'on relit avant d'envoyer */
          if (id === "revendication") apercu();
          garder();
        });
        f.addEventListener("input", garder);
      });

    el("formulaire").addEventListener("submit", envoyer);

    window.REVENDIQUER.nomFichier = nomFichier;
    window.REVENDIQUER.revendication = revendication;
    window.REVENDIQUER.liste = liste;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }

  window.REVENDIQUER.etablissement = etablissement;
})();