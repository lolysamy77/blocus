/* ===========================================================================
   appareil.js — reconnaître l'appareil qui vote.

   Le site n'a pas de compte, et n'en veut pas : une revendication se décide
   entre élèves d'un même établissement, pas entre comptes. Mais il faut
   répondre à une question simple — « cette personne a-t-elle déjà voté ? » —
   sans rien demander à personne.

   La réponse se fait en trois temps, du plus solide au plus fragile :

     1. un cookie « appareil » posé par le serveur. Le serveur en fait foi :
        un identifiant qui ne correspond plus au cookie est ignoré, donc
        changer d'identifiant ne donne pas une seconde voix ;

     2. le localStorage du navigateur, qui survit à la fermeture de la page
        et permet à l'interface de se souvenir de ce qu'on a déjà voté même
        quand aucun serveur ne tourne ;

     3. à défaut, un identifiant tiré au sort, gardé pour la session.

   Ce que cela ne fait pas, et qu'il faut dire : un navigateur qui efface ses
   données ouvre une nouvelle voix. Sans compte, il n'y a rien d'autre sur quoi
   s'appuyer. C'est pourquoi le serveur est la source de vérité, et pourquoi la
   page ne prétend jamais qu'un vote est « garanti ».

   Le module ne fait qu'une chose de plus : se souvenir, en local, de l'unique
   établissement où cet appareil a voté. Une voix, un établissement — c'est la
   règle du site, elle est vérifiée par le serveur et rappelée ici pour que la
   page n'ait pas à la redire.
   =========================================================================== */

window.APPAREIL = (function () {
  var CLE_ID = "blocus.appareil.v1";
  var CLE_VOIX = "blocus.voix.v1";
  var LONGUEUR_ID = 32;          /* 128 bits, largement assez pour un vote */

  /* -------------------------------------------------------- le cookie */

  function lireCookie(nom) {
    var morceaux = (document.cookie || "").split(";");
    for (var i = 0; i < morceaux.length; i++) {
      var p = morceaux[i].trim();
      if (p.indexOf(nom + "=") === 0) {
        return decodeURIComponent(p.slice(nom.length + 1));
      }
    }
    return "";
  }

  /* ------------------------------------------------- l'identifiant */

  function tirer() {
    var octets = new Uint8Array(LONGUEUR_ID / 2);
    if (window.crypto && crypto.getRandomValues) {
      crypto.getRandomValues(octets);
    } else {
      /* Vieux navigateur : ce n'est pas une garantie de secret, seulement de
         différence entre deux appareils. Un vote n'a pas de secret à garder. */
      for (var i = 0; i < octets.length; i++) octets[i] = Math.floor(Math.random() * 256);
    }
    var s = "";
    for (var j = 0; j < octets.length; j++) s += (octets[j] + 256).toString(16).slice(1);
    return s;
  }

  var identifiant = "";

  function fabriquer() {
    /* Le cookie d'abord : c'est lui que le serveur considère, et il survit
       à un localStorage vidé. */
    var duCookie = lireCookie("appareil");
    if (/^[A-Za-z0-9_-]{8,64}$/.test(duCookie)) return duCookie;

    var duStock = "";
    try { duStock = localStorage.getItem(CLE_ID) || ""; } catch (e) { /* bloqué */ }
    if (/^[A-Za-z0-9_-]{8,64}$/.test(duStock)) return duStock;

    var neuf = tirer();
    try { localStorage.setItem(CLE_ID, neuf); } catch (e) { /* plein ou bloqué */ }
    return neuf;
  }

  /** L'identifiant de cet appareil, fabriqué au premier appel. */
  function id() {
    if (!identifiant) identifiant = fabriquer();
    return identifiant;
  }

  /* ------------------------------------------ ce dont on se souvient */

  function voix() {
    try {
      var brut = JSON.parse(localStorage.getItem(CLE_VOIX) || "null");
      return brut && typeof brut === "object" ? brut : {};
    } catch (e) {
      return {};
    }
  }

  function ecrireVoix(v) {
    try { localStorage.setItem(CLE_VOIX, JSON.stringify(v)); } catch (e) { /* plein */ }
  }

  /** La clé « code|nom » de l'établissement où cet appareil a voté, ou "".
      Vide signifie « il peut voter ici » — la règle du site tient par
      établissement, pas par revendication. */
  function etablissement() {
    return voix().etablissement || "";
  }

  /** Ce que cet appareil a voté pour cette revendication : « pour »,
      « contre », ou "" s'il n'a pas voté. */
  function choix(rid) {
    var v = voix().choix || {};
    return v[rid] || "";
  }

  /** Retient un vote dans le navigateur. À appeler après que le serveur a
      confirmé : la mémoire locale ne sert qu'à ne pas re-demander. */
  function noter(cleEtablissement, rid, sens) {
    var v = voix();
    v.etablissement = cleEtablissement;
    v.choix = v.choix || {};
    v.choix[rid] = sens;
    ecrireVoix(v);
  }

  /** Le serveur fait foi : on aligne ce qu'il nous a dit sur ce qu'on
      croyait. Le cookie peut être revenu à une autre valeur après un vidage
      de localStorage, et le serveur peut nous dire « cet appareil a déjà voté
      ailleurs » quand le navigateur l'avait oublié. */
  function aligner(serveur) {
    if (!serveur) return;
    if (typeof serveur.appareil === "string" &&
        /^[A-Za-z0-9_-]{8,64}$/.test(serveur.appareil) && serveur.appareil !== id()) {
      identifiant = serveur.appareil;
      try { localStorage.setItem(CLE_ID, serveur.appareil); } catch (e) { /* plein */ }
    }
    var v = voix();
    var change = false;
    if (typeof serveur.etablissement === "string" && serveur.etablissement &&
        v.etablissement !== serveur.etablissement) {
      v.etablissement = serveur.etablissement;
      change = true;
    }
    if (serveur.moi && typeof serveur.moi === "object") {
      var deja = v.choix || {};
      Object.keys(serveur.moi).forEach(function (rid) {
        if (deja[rid] !== serveur.moi[rid]) { deja[rid] = serveur.moi[rid]; change = true; }
      });
      v.choix = deja;
    }
    if (change) ecrireVoix(v);
  }

  /** Ce que l'appareil declare au serveur, en plus du vote lui-même. */
  function signature(objet) {
    var copie = {};
    Object.keys(objet || {}).forEach(function (k) { copie[k] = objet[k]; });
    copie.appareil = id();
    return copie;
  }

  /** Un POST JSON, et la réponse lue en JSON — `{ ok, corps }`, comme dans
      signaler.js, pour que les deux pages gèrent de la même façon l'absence de
      serveur (l'appelant bascule alors sur le téléchargement du fichier). */
  function poster(url, corps) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corps),
    }).then(function (r) {
      return r.text().then(function (t) {
        var j = null;
        try { j = t ? JSON.parse(t) : null; } catch (e) { j = null; }
        return { ok: r.ok, corps: j };
      });
    });
  }

  return {
    id: id,
    etablissement: etablissement,
    choix: choix,
    noter: noter,
    aligner: aligner,
    signature: signature,
    poster: poster,
  };
})();