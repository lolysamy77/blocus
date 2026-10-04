/* ===========================================================================
   rev-panneau.js — les revendications d'un collège ou d'un lycée, dans le
   panneau de l'établissement.

   Le panneau de index.html montre deux choses : la liste des blocus de
   l'établissement choisi, puis — c'est ici que ce fichier intervient — le
   tableau des revendications que ses élèves ont écrites, avec le pourcentage
   de soutien de chacune et le nombre d'appareils qui ont voté dans
   l'établissement.

   Une revendication n'appartient pas à une liste nationale : elle est celle de
   ce collège, de ce lycée. Deux élèves du même établissement écrivent chacun
   leur revendication, le tableau les range côte à côte, et chacun vote sur
   chacune — pour ou contre.

   ---------------------------------------------------------------------------
   LA RÈGLE DU VOTE
   ---------------------------------------------------------------------------
   Un appareil = une voix, et une voix dans un seul établissement. Ce n'est
   pas une subtilité d'interface : le serveur la vérifie (POST /api/voix
   refuse un appareil qui a déjà voté ailleurs), et cette page ne fait que
   s'y conformer pour ne pas proposer un vote qui serait refusé.

   Sans serveur, le vote part en fichier : la page télécharge le .json et
   demande de le déposer dans votes/. C'est le même mécanisme que pour un
   signalement hors ligne, et c'est la seule chose qu'une page ouverte par
   double-clic puisse faire.

   ---------------------------------------------------------------------------
   LES DONNÉES
   ---------------------------------------------------------------------------
   Deux sources, la même forme :

     build/revendications.js   ce qui est dans le dépôt : sans serveur, c'est
                               la seule source. Les comptes y sont figés au
                               moment de la génération.
     GET api/rev              quand un serveur local répond : les propositions
                               qui attendent une relecture s'y trouvent aussi,
                               et les comptes sont frais.

   La clé d'un établissement est « codeInsee|nom », le nom exactement comme
   l'annuaire l'écrit ; l'identifiant d'une revendication est « r » + dix
   chiffres du SHA-1 de « clé|titre comparable » (voir
   build/import-revendications.js et serve.py, qui écrivent la même règle).

   L'interface :

       REV.rendre({ code, nom, dep, type })   appelé par index.html à la fin
                                              du dessin du panneau
       REV.meta(e, code)                      une phrase pour la liste des
                                              établissements, ou ""
       REV.etat()                             "serveur", "fichier" ou "vide"
   =========================================================================== */

window.REV = (function () {
  var CLE_LOT = "rvbloc";             /* le bloc, dans la vue « blocus » */
  var donnees = null;                 /* { etablissements: { … } } */
  var source = "";                   /* "serveur", "fichier" ou "" */
  var courant = null;                 /* l'établissement affiché */
  var charger = false;                /* une requête est-elle en cours ? */
  var rafraichie = false;            /* la liste a-t-elle déjà été complétée ? */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function zone() {
    return document.querySelector('#panneau .pv[data-v="blocus"]');
  }

  function pluriel(n, mot) {
    return n + " " + mot + (n > 1 ? "s" : "");
  }

  /** « 1 sur 2 », « 4 sur 7 ». Le nombre et son mot, tout simplement : c'est la
      forme qui dit ce qu'on lit, et « 1 sur 2 » ne se conteste pas. */
  function sur(n, total) {
    return n + " sur " + total;
  }

  /** Combien d'appareils ont voté dans cet établissement. « 1 élève a voté »
      et « 4 élèves ont voté » : pluriel() ajoute un s, il ne sait pas qu'un
      participe change avec son nombre. */
  function votants(texte) {
    if (!texte) return "Personne n'a encore voté";
    return texte === 1
      ? "1 élève a voté dans cet établissement"
      : texte + " élèves ont voté dans cet établissement";
  }

  /** La clé de l'établissement affiché : c'est elle qui relie le tableau aux
      votes, et elle s'écrit partout de la même façon. */
  function cle(ctx) {
    return (ctx.code || "") + "|" + (ctx.nom || "");
  }

  function lot(ctx) {
    return (donnees && donnees.etablissements && donnees.etablissements[cle(ctx)]) || null;
  }

  /* ------------------------------------------------------ les données */

  /** Le fichier du dépôt d'abord — il est là, il est petit, et le tableau
      s'affiche sans attendre un serveur. Ensuite, si un serveur répond, on
      prend ce qu'il dit : c'est plus frais, et cela ajoute les propositions
      qui n'ont pas encore été relues. */
  function chargerDonnees() {
    if (!donnees && window.REVENDICATIONS) {
      donnees = window.REVENDICATIONS;
      source = "fichier";
      if (courant) dessiner();
    }
    if (charger) return;
    charger = true;
    /* L'identifiant de l'appareil part dans la requête, pour que le serveur
       sache à qui il parle même si le cookie a été vidé — un navigateur peut
       garder le localStorage et perdre les cookies, ou l'inverse. Sans cela,
       `moi` serait vide et la page reproposerait un vote déjà pris. */
    var url = "api/rev";
    if (typeof APPAREIL !== "undefined") url += "?appareil=" + encodeURIComponent(APPAREIL.id());
    fetch(url, { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || !j.etablissements) return;
        donnees = { etablissements: j.etablissements };
        source = "serveur";
        if (typeof APPAREIL !== "undefined") APPAREIL.aligner(j);
        if (courant) dessiner();
        completerListe();
      })
      .catch(function () {
        /* Pas de serveur, ou pas cette route : le fichier du dépôt suffit,
           et la page le dira en proposing le vote en fichier. */
      })
      .then(function () { charger = false; });
  }

  /** Après l'arrivée des données, compléter la liste des établissements : une
      école qui a des revendications le dit dans sa ligne. On touche seulement
      ce que le panneau a dessiné — on n'y redessine rien, ce qui fermerait le
      panneau que la personne vient d'ouvrir. */
  function completerListe() {
    if (rafraichie || !donnees || !donnees.etablissements) return;
    var lignes = document.querySelectorAll('#panneau .pv[data-v="liste"] .ec');
    if (!lignes.length) return;
    var order = typeof ecoleOrdre !== "undefined" ? ecoleOrdre : null;
    /* le code de la commune se lit comme dans index.html : l'entrée de commune
       sélectionnée, puis son champ `c`. */
    var entree = (typeof selectedCommune !== "undefined" && selectedCommune && selectedCommune.c) || null;
    var ville = (entree && entree.c) || "";
    var touche = 0;
    for (var i = 0; i < lignes.length; i++) {
      var e = order && order[+lignes[i].dataset.i];
      if (!e) continue;
      var phrase = meta(e, ville);
      if (!phrase) continue;
      var em = lignes[i].querySelector(".em");
      if (!em) {
        em = document.createElement("div");
        em.className = "em";
        lignes[i].appendChild(em);
      }
      if (em.dataset.rv === "1") continue;
      em.innerHTML = em.innerHTML ? em.innerHTML + " · " + esc(phrase) : esc(phrase);
      em.dataset.rv = "1";
      touche++;
    }
    if (touche) rafraichie = true;
  }

  /* ------------------------------------------------------ le dessin */

  function pourcentage(r) {
    var total = (r.pour || 0) + (r.contre || 0);
    if (!total) return null;
    return Math.round((r.pour / total) * 100);
  }

  /** Une ligne du tableau : le titre, ce que l'on sait de la revendication, la
      barre de soutien, les deux boutons — ou le vote déjà exprimé. */
  function ligne(r, ctx, cleEtab) {
    var p = pourcentage(r);
    var mon = typeof APPAREIL !== "undefined" ? APPAREIL.choix(r.id) : "";
    var compte = (r.pour || 0) + (r.contre || 0);
    var h = '<tr class="rvligne" data-rid="' + esc(r.id) + '"><th scope="row"><div class="rvt">' +
      esc(r.titre) + "</div>";

    if (r.description) {
      h += '<div class="rvd">' + esc(r.description.length > 220
        ? r.description.slice(0, 220) + "…" : r.description) + "</div>";
    }

    var note = [];
    if (r.etat === "proposee") note.push("à relire");
    if (r.proposeurs > 1) note.push(pluriel(r.proposeurs, "proposition"));
    if (r.etat === "publiee" && r.publiee_le) note.push("retenue le " + r.publiee_le);
    if (note.length) h += '<div class="rvn">' + esc(note.join(" · ")) + "</div>";

    if (p !== null) {
      h += '<div class="rvb"><span class="rvf" style="width:' + p + '%"></span></div>';
    }

    /* Les deux boutons, sauf si le vote est déjà pris — par cet appareil
       (choix) ou ailleurs, ce que le serveur_signale par « ailleurs ». */
    var ailleurs = typeof APPAREIL !== "undefined" && APPAREIL.etablissement() &&
      APPAREIL.etablissement() !== cleEtab;
    if (mon) {
      h += '<div class="rvv">Votre vote&nbsp;: <b>' +
        (mon === "pour" ? "soutien" : "opposition") + "</b>" +
        (source === "serveur" ? "" : " — pas encore compté") + "</div>";
    } else if (ailleurs) {
      var nom = APPAREIL.etablissement().split("|").slice(1).join("|");
      h += '<div class="rvv rvv-non">Cet appareil a déjà voté à ' + esc(nom) +
        " : une voix, un établissement.</div>";
    } else {
      h += '<div class="rvbts"><button type="button" class="rvbt oui" data-rid="' +
        esc(r.id) + '">Je soutiens</button><button type="button" class="rvbt non" data-rid="' +
        esc(r.id) + '">Je ne soutiens pas</button></div>';
    }

    h += "</th><td class=\"rvp\">";
    if (p === null) {
      h += '<span class="rvp0">—</span>';
    } else {
      h += "<b>" + p + " %</b><span>" + sur(r.pour || 0, compte) + "</span>";
    }
    h += "</td></tr>";
    return h;
  }

  /** Le bloc complet : le titre, le nombre de votants de l'établissement, le
      tableau, et le lien pour en ajouter une. */
  function dessiner() {
    var z = zone();
    if (!z || !courant) return;
    /* Un seul bloc, toujours le dernier : la vue est vidée à chaque changement
       d'établissement, mais les données, elles, arrivent après — il faut donc
       retirer le bloc précédent plutôt que de le laisser se empiler. */
    var ancien = z.querySelector(".rv");
    if (ancien) ancien.remove();

    var ctx = courant;
    var l = lot(ctx);
    var h = '<section class="rv ' + CLE_LOT + '" aria-label="Revendications de l\'établissement">';

    if (!l || !l.revendications.length) {
      h += '<div class="rvi"><b>Aucune revendication pour l\'instant.</b>' +
        "<span>Les élèves de l'établissement n'en ont pas encore écrite, " +
        "ou aucune n'a été retenue.</span></div>";
    } else {
      var n = l.revendications.length;
      h += '<div class="rvh"><b>' + pluriel(n, "revendication") + "</b>";
      h += "<span>" + votants(l.votants) + "</span>";
      h += "</div>";
      h += '<table class="rvtab" aria-label="Soutien des élèves pour chaque ' +
        "revendication de cet établissement\">" +
        '<thead><tr><th scope="col">La revendication</th>' +
        '<th scope="col">Soutien</th></tr></thead><tbody>' +
        l.revendications.map(function (r) { return ligne(r, ctx, cle(ctx)); }).join("") +
        "</tbody></table>";
    }

    h += '<a class="rva" href="' + lien(ctx) + '">Ajouter une revendication à cet établissement</a>';
    h += '<p class="rvnote">Un appareil ne vote que dans un seul établissement' +
      (source === "serveur" ? "" : " ; sans serveur, le vote est téléchargé en fichier") +
      ".</p>";
    h += '<p class="rvmsg" role="status" aria-live="polite"></p>';
    h += "</section>";
    z.insertAdjacentHTML("beforeend", h);
  }

  /** Le lien vers le questionnaire, pré-rempli comme celui du blocus : le
      département, le genre, le nom de l'établissement. */
  function lien(ctx) {
    var p = new URLSearchParams();
    if (ctx.dep) p.set("dep", ctx.dep);
    if (ctx.type) p.set("type", ctx.type);
    if (ctx.nom) p.set("eta", ctx.nom);
    if (ctx.code) p.set("commune", ctx.code);
    p.set("certifie", "1");
    return "ajouter-une-revendication.html?" + p.toString();
  }

  function dire(texte, classe) {
    var z = zone();
    if (!z) return;
    var m = z.querySelector(".rvmsg");
    if (!m) return;
    m.textContent = texte;
    m.className = "rvmsg" + (classe ? " " + classe : "");
  }

  /* ---------------------------------------------------------- voter */

  /** Le fichier d'un vote, proposé au téléchargement : sans serveur, on ne
      peut rien écrire sur le disque depuis une page. Le contenu est exactement
      celui qu'aurait écrit le serveur. */
  function telechargerVote(rid, choix, titre) {
    var corps = {
      version: 1,
      recu_le: new Date().toISOString().slice(0, 19),
      source: "index.html",
      appareil: APPAREIL.id(),
      etablissement: cle(courant),
      etablissement_nom: courant.nom,
      revendication: rid,
      titre: titre,
      choix: choix,
    };
    var texte = JSON.stringify(corps, null, 2) + "\n";
    var url = URL.createObjectURL(new Blob([texte], { type: "application/json" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = APPAREIL.id().slice(0, 16) + "-" + rid + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function voter(rid, choix) {
    if (!courant || typeof APPAREIL === "undefined") return;
    var cleEtab = cle(courant);
    var l = lot(courant);
    var r = l && l.revendications.filter(function (x) { return x.id === rid; })[0];

    /* Le navigateur d'abord : pas de vote si l'appareil a déjà tranché, et
       pas de vote dans un autre établissement. Le serveur le dira de toute
       façon — mais mieux vaut une réponse claire qu'un 409. */
    if (APPAREIL.choix(rid)) {
      dire("Vous avez déjà voté pour cette revendication.", "rvmsg-non");
      return;
    }
    var deja = APPAREIL.etablissement();
    if (deja && deja !== cleEtab) {
      dire("Cet appareil a déjà voté à " + deja.split("|").slice(1).join("|") +
        " : une voix, un établissement.", "rvmsg-non");
      return;
    }

    if (source !== "serveur") {
      telechargerVote(rid, choix, r ? r.titre : "");
      APPAREIL.noter(cleEtab, rid, choix);
      dessiner();
      dire("Vote téléchargé. Placez le fichier dans le dossier votes/, puis " +
        "relancez node build/import-revendications.js pour qu'il entre dans le " +
        "décompte.", "rvmsg-part");
      return;
    }

    dire("Enregistrement du vote…", "rvmsg-part");
    APPAREIL.poster("api/voix", APPAREIL.signature({
      etablissement: cleEtab,
      revendication: rid,
      choix: choix,
    })).then(function (reponse) {
      var c = reponse.corps || {};
      if (!reponse.ok) {
        if (c.etablissement) APPAREIL.aligner({ etablissement: c.etablissement });
        dire(c.erreur || "vote refusé", "rvmsg-non");
        return;
      }
      APPAREIL.aligner(c);
      APPAREIL.noter(cleEtab, rid, choix);
      /* Les chiffres du serveur font foi : on les replace dans les données
         avant de redessiner, pour que la ligne soit juste sans recharger. */
      if (r) {
        r.pour = c.pour;
        r.contre = c.contre;
        if (typeof c.votants === "number") l.votants = c.votants;
      }
      dessiner();
      dire("Vote enregistré.", "rvmsg-oui");
    }).catch(function (err) {
      dire("Aucun serveur n'a répondu (" + err.message + "). Votre vote n'a " +
        "pas été pris : votez une autre fois quand le serveur tourne.", "rvmsg-non");
    });
  }

  /* ---------------------------------------------------------- l'appel */

  function rendre(ctx) {
    courant = ctx;
    chargerDonnees();
    dessiner();
  }

  /** Une phrase pour la liste des établissements : « 3 revendications ·
      27 votants ». Vide quand l'établissement n'en a pas — la ligne reste
      celle qu'elle était. */
  function meta(e, code) {
    if (!donnees || !code || !e) return "";
    var l = donnees.etablissements[code + "|" + e.n];
    if (!l || !l.revendications.length) return "";
    var bits = [pluriel(l.revendications.length, "revendication")];
    if (l.votants) bits.push(pluriel(l.votants, "votant"));
    return bits.join(" · ");
  }

  function etat() {
    return source;
  }

  function demarrer() {
    document.addEventListener("click", function (ev) {
      var b = ev.target.closest && ev.target.closest("button.rvbt");
      if (!b) return;
      voter(b.dataset.rid, b.classList.contains("oui") ? "pour" : "contre");
    });
    /* Les données peuvent arriver après le premier dessin : la liste des
       établissements est alors complétée sans y toucher. */
    chargerDonnees();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }

  return {
    rendre: rendre,
    meta: meta,
    etat: etat,
    voter: voter,
    cle: cle,
  };
})();