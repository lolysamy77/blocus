/* ===========================================================================
   tableau.js — le tableau des blocus, jour par jour.

   Les deux cartes disent « où », cette page dit « quand » et « combien ».
   Elle lit les mêmes fichiers qu'elles, donc elle ne peut pas raconter autre
   chose que ce qu'elles montrent.

       <script src="build/blocus.js"></script>
       <script src="build/blocus-recherche.js"></script>
       <script src="build/ecoles-fr.js"></script>
       <script src="build/filtre.js"></script>
       <script src="build/tableau.js"></script>

   Tout est calculé à l'ouverture, jamais à la compilation : ajouter un blocus
   dans build/blocus.js suffit, il n'y a rien à régénérer.
   =========================================================================== */

window.TABLEAU = window.TABLEAU || {};

(function () {
  var DEBUT = "2026-09-01";

  var JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
              "août", "septembre", "octobre", "novembre", "décembre"];

  function iso(a, m, j) {
    return a + "-" + (m < 10 ? "0" : "") + m + "-" + (j < 10 ? "0" : "") + j;
  }
  function plus(t, n) {
    var p = t.split("-");
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }
  function jourDe(t) { return +t.slice(8, 10); }
  function moisDe(t) { return +t.slice(5, 7); }
  function anneeDe(t) { return +t.slice(0, 4); }

  function dateLongue(t) {
    var d = new Date(anneeDe(t), moisDe(t) - 1, jourDe(t));
    var s = JOURS[d.getDay()] + " " + jourDe(t) + " " + MOIS[d.getMonth()];
    if (anneeDe(t) !== new Date().getFullYear()) s += " " + anneeDe(t);
    return s;
  }
  function dateCourte(t) {
    return jourDe(t) + "/" + (moisDe(t) < 10 ? "0" : "") + moisDe(t);
  }
  function echap(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  /* « 45 blocuss » n'existe pas : « blocus » est un mot invariable, comme
     « grands » devant un nom propre. Il est le seul mot de la liste à ne pas
     prendre de s ; on le règle ici une fois pour toutes. */
  function plural(n, mot) {
    if (mot === "blocus") return n + " blocus";
    return n + " " + mot + (n > 1 ? "s" : "");
  }
  function depDe(code) {
    return /^97[1-6]/.test(code) ? code.slice(0, 3) : code.slice(0, 2);
  }
  function nomDep(code) {
    return (window.DEP_FR && window.DEP_FR[code]) ? window.DEP_FR[code] : "Département " + code;
  }
  /* le nom d'une commune porteuse de blocus, ou son code si le fichier des
     noms n'a pas été régénéré */
  function nomCom(code) {
    return (window.COMMUNES_BLOCUS && window.COMMUNES_BLOCUS[code]) || code;
  }
  function B() { return window.BLOCUS || {}; }

  /* ---------------------------------------------------------- les jours */

  /** Une ligne par jour : combien de blocus, et dans combien
      d'établissements, de communes et de départements.

      Un blocus de deux jours compte deux fois : il a bien eu lieu deux fois,
      et c'est ce que montre la carte du 2e jour. */
  function moments(source) {
    var lignes = {};
    var dernier = null;
    for (var cle in source) {
      if (!Object.prototype.hasOwnProperty.call(source, cle)) continue;
      var p = cle.indexOf("|");
      if (p < 0) continue;
      var code = cle.slice(0, p);
      var dep = depDe(code);
      var liste = source[cle] || [];
      for (var i = 0; i < liste.length; i++) {
        var js = window.FILTRE ? FILTRE.joursDe(liste[i]) : [];
        for (var k = 0; k < js.length; k++) {
          var j = js[k];
          if (!lignes[j]) lignes[j] = { jour: j, n: 0, etabs: {}, communes: {}, deps: {} };
          lignes[j].n++;
          lignes[j].etabs[cle] = true;
          lignes[j].communes[code] = true;
          lignes[j].deps[dep] = true;
          if (!dernier || j > dernier) dernier = j;
        }
      }
    }

    /* La table va du 1er septembre au 31 octobre — les deux mois de la
       période, comme la barre du filtre — ou jusqu'au dernier jour connu si
       des blocus sont annoncés plus tard, ou jusqu'à aujourd'hui si la
       période s'arrête avant. Un jour sans blocus y est une ligne à zéro :
       il faut pouvoir lire que le 4 octobre est vide, et non le supposer. */
    var fin = FILTRE.FIN;
    if (dernier && dernier > fin) fin = dernier;
    var auj = FILTRE.aujourdhui();
    if (fin < auj) fin = auj;
    if (fin < DEBUT) fin = DEBUT;

    var out = [];
    for (var jour = DEBUT; jour <= fin; jour = plus(jour, 1)) {
      var l = lignes[jour];
      out.push({
        jour: jour,
        n: l ? l.n : 0,
        etabs: l ? Object.keys(l.etabs).length : 0,
        communes: l ? Object.keys(l.communes).length : 0,
        deps: l ? Object.keys(l.deps).length : 0,
      });
    }
    return out;
  }

  /* --------------------------------------------------------- les décomptes */

  function cles(source) {
    var out = [];
    for (var k in source) {
      if (Object.prototype.hasOwnProperty.call(source, k)) out.push(k);
    }
    return out;
  }

  /** blocus par département, ou par commune */
  function par(source, quoi) {
    var t = {};
    for (var c of cles(source)) {
      var p = c.indexOf("|");
      var code = c.slice(0, p);
      var g = quoi === "dep" ? depDe(code) : code;
      t[g] = (t[g] || 0) + source[c].length;
    }
    return t;
  }

  /** Un blocus peut contenir plusieurs mots : « blocus + incidents + fermeture
      administrative » se compte trois fois, une fois par mot. C'est ce que dit
      le tableau, et le tableau le dit aussi à voix haute. */
  var MOTS = [
    ["blocus", /blocus/i],
    ["rassemblements", /rassemblement/i],
    ["incidents", /incident/i],
    ["fermetures administratives", /fermeture/i],
    ["manifestations", /manifestation/i],
  ];

  function parNature(source) {
    var t = {};
    for (var c of cles(source)) {
      for (var x of source[c]) {
        var n = String(x.n || "");
        for (var m of MOTS) if (m[1].test(n)) t[m[0]] = (t[m[0]] || 0) + 1;
      }
    }
    return t;
  }

  /* Les précisions relevées sont libres : « presse », « officiel (préfecture du
     Rhône) », « presse+officiel », « source unique »… Comptées telles quelles,
     elles donnaient quinze lignes pour quatre idées. On les ramène donc à ce
     qu'elles signifient, et l'ordre de ces mots importe : « presse et officiel »
     est compté comme recoupé, pas comme de la presse. */
  var RANGEMENT = [
    /* « à confirmer » passe avant tout : c'est le plus précis, et « à
       confirmer » contient « confirme », que le motif suivant attrapait. */
    ["à confirmer", /\ba confirmer\b|\bconfirmer\b|\bnon recoup|\bsource unique\b|\bunique\b/i],
    ["officiel et presse", /officiel\s*(et|\+|\/)\s*(la\s*)?presse|presse\s*(et|\+|\/)\s*(l'?)?officiel/i],
    ["officiel et presse", /\brecoupe|\bconfirme\b|\bcrois|\bplusieurs sources/i],
    ["officiel seul", /\bofficiel|prefecture|academie|recteur|ministere/i],
    ["presse seule", /\bpresse|\bmedia|\barticle/i],
  ];

  /* les accents sont retirés avant le classement : « prefecture » doit
     rattraper « préfecture », sans quoi la moitié des libellés passe à côté */
  function ranger(p) {
    var s = String(p).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
            .replace(/œ/g, "oe").replace(/æ/g, "ae");
    for (var i = 0; i < RANGEMENT.length; i++) {
      if (RANGEMENT[i][1].test(s)) return RANGEMENT[i][0];
    }
    return "autre source";
  }

  function parSources(source) {
    var t = {};
    for (var c of cles(source)) {
      for (var x of source[c]) {
        var p = String(x.p || "").trim();
        if (!p) continue;
        var k = ranger(p);
        t[k] = (t[k] || 0) + 1;
      }
    }
    return t;
  }

  function classer(t) {
    return Object.keys(t)
      .map(function (k) { return { k: k, n: t[k] }; })
      .sort(function (a, b) { return b.n - a.n || a.k.localeCompare(b.k, "fr"); });
  }

  /* ------------------------------------------------------------ le tableau */

  function tableau(lignes, source) {
    var max = 1;
    for (var l of lignes) if (l.n > max) max = l.n;

    var h = '<table class="tab">' +
      "<caption>Les blocus relevés, jour par jour, depuis le 1er septembre</caption>" +
      "<thead><tr>" +
      '<th scope="col" class="g">Jour</th>' +
      '<th scope="col" class="num">Blocus</th>' +
      '<th scope="col">Établissements</th>' +
      '<th scope="col">Communes</th>' +
      '<th scope="col">Départements</th>' +
      '<th scope="col" class="g">Part</th>' +
      "</tr></thead><tbody>";

    var auj = FILTRE.aujourdhui();
    var dessus = false;
    for (var i = 0; i < lignes.length; i++) {
      var l2 = lignes[i];
      var cls;
      if (l2.n) { cls = dessus ? "jour" : "jour jour1"; dessus = true; }
      else cls = "";
      if (l2.jour === auj) cls += " auj";
      h += '<tr class="' + cls + '">' +
        '<th scope="row" class="g">' + echap(dateLongue(l2.jour)) + "</th>" +
        '<td class="num">' + (l2.n || "—") + "</td>" +
        "<td>" + (l2.etabs || "—") + "</td>" +
        "<td>" + (l2.communes || "—") + "</td>" +
        "<td>" + (l2.deps || "—") + "</td>" +
        '<td class="g"><span class="bar" style="width:' +
          Math.round(100 * l2.n / max) + '%"></span></td>' +
        "</tr>";
    }

    var nTot = 0, jourTot = 0;
    for (var l3 of lignes) { nTot += l3.n; if (l3.n) jourTot++; }
    var nEtabs = cles(source).length;
    /* le nombre de relevés eux-mêmes, sans le double comptage des journées :
       c'est la seule somme qui ne bouge pas avec le calendrier */
    var nReleves = 0;
    for (var cle of Object.keys(source)) nReleves += (source[cle] || []).length;

    h += '<tr class="total">' +
      '<th scope="row" class="g">Total</th>' +
      '<td class="num">' + nTot + "</td>" +
      "<td>" + nEtabs + "</td>" +
      "<td>" + Object.keys(par(source, "com")).length + "</td>" +
      "<td>" + Object.keys(par(source, "dep")).length + "</td>" +
      '<td class="g"></td></tr>';
    h += "</tbody></table>";
    h += '<p class="ph">Chaque ligne est un jour : ' + nTot + " blocus répartis sur " +
      plural(jourTot, "journée") + ", comptés établissement par établissement. " +
      "Un blocus qui a duré deux jours figure sur les deux lignes : il a eu lieu " +
      "à chacune d'elles. La dernière ligne est donc plus grande que le nombre " +
      "de relevés, qui est de <b>" + nReleves + "</b>.</p>";
    return h;
  }

  /* --------------------------------------------------------- les remarques */

  function remarques(source, lignes) {
    var out = [];
    var dpts = classer(par(source, "dep"));
    var coms = classer(par(source, "com"));
    var nature = classer(parNature(source));
    var sources = classer(parSources(source));

    var avecN = lignes.filter(function (l) { return l.n > 0; });
    var pire = avecN.slice().sort(function (a, b) { return b.n - a.n; })[0];
    var plusGros = coms[0];

    if (dpts.length) {
      out.push({
        titre: "Les départements les plus touchés",
        corps: "<ul class='lst'>" + dpts.slice(0, 10).map(function (d) {
          return "<li><a href='index.html#" + echap(d.k) + "'>" + echap(nomDep(d.k)) +
                 "</a> <span class='co'>" + echap(d.k) + "</span> — " +
                 plural(d.n, "blocus") + "</li>";
        }).join("") + "</ul>",
      });
    }

    if (pire) {
      var suite = avecN.slice()
        .sort(function (a, b) { return b.n - a.n; })
        .slice(1, 5);
      out.push({
        titre: "Les journées les plus fortes",
        corps: "<p>Le <b>" + echap(dateLongue(pire.jour)) + "</b> est le jour le plus " +
          "chargé : <b>" + pire.n + "</b> blocus dans " +
          plural(pire.communes, "commune") + " et " + plural(pire.deps, "département") +
          ", répartis sur " + plural(pire.etabs, "établissement") + ".</p>" +
          "<p>Les suivants, dans le même ordre : " + suite.map(function (a) {
            return "<a href='tableau-des-blocus.html?j=" + a.jour + "'>" + echap(dateCourte(a.jour)) +
                   "</a> (" + a.n + ")";
          }).join(", ") + ".</p>",
      });
    }

    if (coms.length) {
      /* le nom de la commune vient de build/communes-blocus.js ; s'il manque,
         on garde le code, qui est au moins exact. Le lien, lui, va au
         DÉPARTEMENT : c'est la seule chose que la carte sait ouvrir. */
      out.push({
        titre: "Les communes les plus touchées",
        corps: "<ul class='lst'>" + coms.slice(0, 10).map(function (c) {
          return "<li><a href='index.html#" + echap(depDe(c.k)) + "'>" +
                 echap(nomCom(c.k)) + "</a> <span class='co'>" + echap(nomDep(depDe(c.k))) +
                 "</span> — " + plural(c.n, "blocus") + "</li>";
        }).join("") + "</ul>" +
        "<p class='ph'>Le lien ouvre la carte du département, à la bonne échelle.</p>",
      });
    }

    if (nature.length) {
      out.push({
        titre: "Ce que les élèves ont fait, et ce qu'on peut en dire",
        corps: "<p>Sur l'ensemble des relevés : " + nature.map(function (x) {
          return "<b>" + x.n + "</b> " + echap(x.k);
        }).join(", ") + ".</p>" +
        "<p class='ph'>Un même blocus peut compter deux fois — « blocus et " +
        "incidents » est bien à la fois un blocus et des incidents. C'est pourquoi " +
        "ces nombres s'additionnent à plus que le total des blocus.</p>",
      });
    }

    if (sources.length) {
      out.push({
        titre: "D'où viennent ces informations",
        corps: "<p>" + sources.map(function (x) {
          return "<b>" + x.n + "</b> " + echap(x.k);
        }).join(", ") + ".</p>" +
        "<p class='ph'>« à confirmer » signale un relevé de presse qui n'a pas " +
        "encore été recoupé : il vaut mieux le montrer que le cacher.</p>",
      });
    }

    out.push({
      titre: "Ce que couvre ce tableau",
      corps: "<p>" + plural(cles(source).length, "établissement") + " touché" +
        (cles(source).length > 1 ? "s" : "") + ", dans " +
        plural(dpts.length, "département") + " et " +
        plural(coms.length, "commune") + ", du " + echap(dateLongue(DEBUT)) +
        " à aujourd'hui.</p>" +
        "<p class='ph'>Un établissement peut avoir subi plusieurs blocus : ils " +
        "sont comptés séparément, parce qu'ils se sont produits à des moments " +
        "différents.</p>",
    });

    return out;
  }

  /* ------------------------------------------------------------ démarrage */

  function poser() {
    var source = B();
    var fig = document.getElementById("fig");
    var rem = document.getElementById("rem");
    if (!fig || !rem) return;

    var lignes = moments(source);
    fig.innerHTML = tableau(lignes, source);

    rem.innerHTML = "<h2>Ce que disent les chiffres</h2>" + remarques(source, lignes)
      .map(function (x) {
        return '<section class="rm"><h3>' + echap(x.titre) + "</h3>" + x.corps + "</section>";
      }).join("");

    var d = document.getElementById("quand");
    if (d) d.textContent = dateLongue(FILTRE.aujourdhui());

    /* Un lien vers un jour précis (#37 ou ?j=2026-10-01) met la barre sur ce
       jour-là : le tableau et la carte disent alors la même chose, sans que le
       lecteur ait à les accorder lui-même. */
    var p = new URLSearchParams(location.search);
    var j = p.get("j");
    if (j && /^\d{4}-\d{2}-\d{2}$/.test(j)) {
      try {
        localStorage.setItem("blocus.filtre.v2", JSON.stringify({ jour: j }));
        /* recharger() avant changer() : l'état de la barre a déjà été lu une
           fois, et changer() ne le relit pas tout seul. Sans cet appel, le
           tableau afficherait bien le jour demandé mais la barre et la
           couleur de la carte resteraient sur l'ancien. */
        FILTRE.recharger();
        FILTRE.changer();
      } catch (e) { /* le tableau reste juste, seule la barre ne bouge pas */ }
    }
  }

  window.TABLEAU = {
    poser: poser,
    moments: moments,
    par: par,
    parNature: parNature,
    parSources: parSources,
    remarques: remarques,
    dateLongue: dateLongue,
    dateCourte: dateCourte,
  };
})();