"""
Serveur local pour les pages HTML du projet.

Lancement :
    python serve.py               # http://localhost:8000
    python serve.py --port 5500   # autre port
    python serve.py --no-open     # sans ouvrir le navigateur
    python serve.py --folder projet  # sert un sous-dossier

Cinq choses que le seul service de fichiers ne fait pas :

  * POST /api/demande : enregistre un signalement de blocus dans
    demandes_blocus/, un fichier .json par signalement. Deux personnes qui
    signalent le meme etablissement le meme jour ne s'ecrasent pas : la
    premiere garde son nom, les suivantes sont numerotees _#1, _#2… Sans
    serveur, la page signaler-un-blocus.html propose le meme fichier au
    telechargement :
    il n'y a plus qu'a le deposer dans le dossier.

  * POST /api/revendication : enregistre une revendication *dans son
    etablissement*, un .json par revendication dans
    demandes_revendications/. Une revendication ne rejoint pas la liste
    nationale de revendications.html : elle appartient au college ou au lycee
    de celle qui l'ecrit, et s'y ajoute aux autres — d'ou la numerotation
    _#1, _#2… par etablissement et par jour. La page
    ajouter-une-revendication.html fait comme le signalement : elle propose le
    fichier au telechargement quand aucun serveur ne repond.

  * POST /api/voix : enregistre un vote dans votes/, un .json par appareil et
    par revendication. Un appareil ne vote que dans un seul etablissement : le
    serveur s'en assure lui-meme, et le dit s'il est deja tranche ailleurs.
    L'identifiant de l'appareil vient de la page (localStorage et cookie) ; le
    serveur le recopie dans un cookie, ce qui evite qu'un simple rechargement
    donne une seconde voix.

  * GET /api/rev : les revendications de tous les etablissements, publiees et
    proposees, avec le compte des voix et le nombre d'appareils ayant vote.
    C'est cette route que le panneau de l'etablissement lit quand un serveur
    repond ; sans serveur, la page se rabat sur build/revendications.js.

  * GET /api/demandes et GET /api/revendications : la liste de ce qui a deja ete
    enregistre dans chaque dossier, pour verifier d'un coup d'oeil que le
    formulaire fonctionne.

Ctrl+C pour arreter le serveur.
"""

import argparse
import functools
import hashlib
import http.server
import json
import re
import socketserver
import sys
import threading
import time
import unicodedata
import webbrowser
from datetime import datetime
from http.cookies import SimpleCookie
from pathlib import Path
from urllib.parse import parse_qs

ROOT = Path(__file__).resolve().parent
DOSSIER_DEMANDES = "demandes_blocus"
DOSSIER_REVENDICATIONS = "demandes_revendications"
DOSSIER_VOTES = "votes"

# Les revendications publiees : la source de verite, relue a la main. Le
# generateur build/import-revendications.js en tire build/revendications.js pour
# les pages, et le serveur s'en sert pour completer ce qu'il lit dans les
# dossiers de demandes et de votes.
PUBLIE_REV = "build/revendications.json"

# Les revendications nationales : ce qu'on peut choisir dans le formulaire.
# Elles sont ecrites a la main dans la page revendications.html, et
# build/extraire-rev-nationales.js en tire ce fichier. Le serveur s'y tient :
# une demande qui porte un autre titre est refusee, plutot que d'ajouter une
# ligne que personne n'a relue et que le tableau ne doit pas montrer.
NATIONALES_REV = "build/rev-nationales.json"

CLE_APPAREIL = "appareil"

BANNER = """
+------------------------------------------------------+
|  Serveur local actif                                 |
+------------------------------------------------------+
|  Dossier : {folder}
|  Adresse : {urls}
|  Arret    : Ctrl+C
+------------------------------------------------------+

 Pages disponibles :
{pages}

 Fichiers servis :
{files}

 [INFO] Appuyez sur Ctrl+C pour arreter.
"""


def sans_accents(s: str) -> str:
    """« Lycée André Aliker » -> « lycee-andre-aliker », pour un nom de fichier
    qu'on puisse taper et chercher dans un explorateur."""
    import unicodedata

    s = unicodedata.normalize("NFD", s or "")
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s or "sans-nom"


def _jour(valeur) -> str:
    """Une date en ISO, ou celle du jour si ce qu'on a reçu n'en est pas une.
    On ne devine pas : « mardi prochain » n'est pas une date, et la déduire
    serait fausse dans les deux sens."""
    v = str(valeur or "").strip()
    return v if re.fullmatch(r"\d{4}-\d{2}-\d{2}", v) else datetime.now().strftime("%Y-%m-%d")


def _texte(valeur) -> str:
    return str(valeur).strip() if valeur is not None else ""


def _vrai(valeur) -> bool:
    return _texte(valeur).lower() in ("true", "on", "1", "oui", "oui!", "vrai")


TYPES_LISIBLES = {
    "C": "collège ou lycée général et technologique",
    "L": "lycée professionnel, agricole ou institut",
}

# Combien de revendications un même appareil peut proposer pour un même
# établissement le même jour. L'idée demande est « plusieurs par personne » :
# la limite n'existe que pour qu'un appareil ne puisse pas noyer le tableau des
# pourcentages, et elle est vérifiée par le serveur, pas par la page.
PLAFOND_REVENDICATIONS = 10


def _rang(fichier: Path) -> int:
    """Combien de personnes ont envoyé ce sujet, d'après le nom du fichier.

    1 pour le nom nu, N+1 pour un nom `_#N` : la première signalation d'un
    établissement garde son nom, les suivantes sont numérotées. La page s'en
    sert pour dire à la personne où son signalement se range.
    """
    m = re.search(r"_#(\d+)\.json$", fichier.name)
    return int(m.group(1)) + 1 if m else 1


# --- les revendications d'un etablissement ---------------------------------
# Ces trois fonctions decrivent la meme regle que build/import-revendications.js,
# qui produit les donnees des pages. C'est le seul endroit ou les deux langages
# pourraient diverger ; build/controle-revendications.js compare leurs resultats
# sur toutes les donnees reelles, parce que l'ecart se verrait sinon dans les
# pourcentages — et seulement la.


def comparable(s: str) -> str:
    """« Lycée Cœur  Aliker! » -> « lycee coeur aliker ».

    Sert a comparer deux titres, pas a nommer un fichier : la casse, les
    accents et la ponctuation ne doivent pas creer deux revendications
    identiques.

    Les ligatures sont dépliées avant la décomposition, parce que « Cœur » ne
    se décompose pas comme « é ». La meme liste de transformations est écrite
    dans build/import-revendications.js : les deux doivent rendre exactement la
    meme chaine, sans quoi les identifiants — et donc les votes — divergeraient.
    """
    s = (s or "").replace("Œ", "OE").replace("œ", "oe")
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def cle_etablissement(code, nom) -> str:
    """« 37072|Collège Alcuin » : la clé d'un établissement dans tout le site.

    Elle s'écrit des deux côtés de la même façon — le panneau de index.html avec
    le nom que l'annuaire écrit, le serveur avec celui que la page envoie —
    sans normaliser : les deux viennent du même annuaire, et une dérive se
    verrait tout de suite dans les décomptes."""
    return f"{_texte(code)}|{_texte(nom)}"


def id_revendication(cle: str, titre: str) -> str:
    """L'identifiant d'une revendication, déduit de l'établissement et du titre.

    Il est calculé, jamais attribué : une revendication proposée puis publiée
    garde le même identifiant, et les votes déjà exprimés ne se perdent pas au
    passage de « proposée » à « publiée ». Deux personnes qui écrivent le même
    titre dans le même établissement tombent donc sur la même ligne du tableau,
    ce qui est l'effet voulu : le tableau compte des revendications, pas des
    envois."""
    empreinte = hashlib.sha1(
        f"{cle}|{comparable(titre)}".encode("utf-8")).hexdigest()
    return "r" + empreinte[:10]


CACHE_NATIONALES: dict = {"lu": 0.0, "fichier": "", "par_titre": {}}


def rev_nationales(racine: Path) -> dict:
    """Les revendications nationales, par titre comparable.

    Le formulaire ne propose pas d'écrire une phrase : il propose de choisir une
    de celles de la page Revendications. Cette fonction est la réponse du serveur
    à « et si quelqu'un enInvente une quand même ? » — il la refuse.

    Le fichier est écrit par build/extraire-rev-nationales.js depuis la page, et
    il change avec elle, pas entre deux clics : le garder en mémoire quelques
    secondes ne gêne personne. Un fichier illisible donne une liste vide, et le
    formulaire dira alors qu'il n'a rien à proposer — mieux vaut un formulaire
    muet qu'un formulaire qui invente des revendications."""
    maintenant = time.monotonic()
    chemin = Path(racine) / NATIONALES_REV
    if (maintenant - CACHE_NATIONALES["lu"] < 2.0
            and CACHE_NATIONALES["fichier"] == str(chemin)):
        return CACHE_NATIONALES["par_titre"]
    par_titre: dict = {}
    try:
        brut = json.loads(chemin.read_text(encoding="utf-8"))
        for r in (brut.get("revendications") or []):
            if isinstance(r, dict) and _texte(r.get("titre")):
                par_titre[comparable(r["titre"])] = {
                    "titre": _texte(r["titre"]),
                    "texte": _texte(r.get("texte")),
                }
    except (OSError, ValueError, AttributeError):
        par_titre = {}
    CACHE_NATIONALES.update({"lu": maintenant, "fichier": str(chemin), "par_titre": par_titre})
    return par_titre


def id_appareil(brut) -> str:
    """Un identifiant d'appareil, normalisé et borné.

    La page en fabrique un (voir build/appareil.js) ; on ne fait ici que le
    garder dans un format qui ne puisse ni inducir un chemin ni une
    expression."""
    v = _texte(brut)
    return v[:64] if re.fullmatch(r"[A-Za-z0-9_-]{8,64}", v) else ""


CACHE_VOTES: dict = {"lu": 0.0, "dossier": "", "donnees": {}}


def _compter_votes(dossier: Path) -> dict:
    """Les votes d'un dossier, regroupés par établissement.

    Une seconde de mémoire : le panneau redemande les comptes à chaque
    changement d'établissement, et relire tous les fichiers à chaque clic
    serait du gaspillage pour un nombre qui ne bouge pas. Une seconde d'écart
    est invisible à l'écran, et le serveur ne fait que lire de petits fichiers.

    Un fichier illisible est ignoré, pas signalé : un vote écrit à la main
    dans le dossier n'a pas à empêcher la page de s'afficher."""
    maintenant = time.monotonic()
    if (maintenant - CACHE_VOTES["lu"] < 1.0
            and CACHE_VOTES["dossier"] == str(dossier)):
        return CACHE_VOTES["donnees"]

    par_rev: dict = {}      # etablissement -> revendication -> {pour, contre}
    votants: dict = {}      # etablissement -> nombre d'appareils distincts
    tranche: dict = {}      # appareil -> etablissement
    par_appareil: dict = {} # appareil -> revendication -> choix

    if dossier.is_dir():
        for p in dossier.glob("*.json"):
            try:
                v = json.loads(p.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                continue
            if not isinstance(v, dict):
                continue
            cle = _texte(v.get("etablissement"))
            rev = _texte(v.get("revendication"))
            sens = _texte(v.get("choix"))
            app = id_appareil(v.get("appareil"))
            if not cle or not rev or sens not in ("pour", "contre") or not app:
                continue
            par_rev.setdefault(cle, {}).setdefault(
                rev, {"pour": 0, "contre": 0})[sens] += 1
            tranche[app] = cle
            par_appareil.setdefault(app, {})[rev] = sens

    votants = {cle: sum(1 for a, c in tranche.items() if c == cle)
               for cle in par_rev}
    donnees = {
        "par_rev": par_rev,
        "votants": votants,
        "tranche": tranche,
        "par_appareil": par_appareil,
    }
    CACHE_VOTES.update(lu=maintenant, dossier=str(dossier), donnees=donnees)
    return donnees


def normaliser(brut: dict) -> dict:
    """Ramène un signalement à la forme unique du dossier, quel que soit le
    nom des champs reçus.

    Deux origines sont admises : la page signaler-un-blocus.html, qui envoie déjà la
    forme normalisée, et un fichier déposé à la main, qui emploie plutôt les
    noms courts du formulaire (dep, eta, certifie, lien). Sans cela, il y
    aurait deux formats dans le même dossier et deux lecteurs pour chacun.
    """
    etab = _texte(brut.get("etablissement") or brut.get("eta"))
    code = _texte(brut.get("code_insee_commune"))
    if not code and "|" in etab:                 # « Nom|37072 », comme le menu
        etab, code = etab.rsplit("|", 1)

    genre = _texte(brut.get("type"))
    return {
        "departement": _texte(brut.get("departement") or brut.get("dep")),
        "certifie_en_france": _vrai(
            brut.get("certifie_en_france", brut.get("certifie"))),
        "type": genre,
        "type_lisible": _texte(brut.get("type_lisible")) or TYPES_LISIBLES.get(genre, ""),
        "etablissement": etab,
        "code_insee_commune": code,
        "date": _jour(brut.get("date")),
        "nature": _texte(brut.get("nature")),
        "description": _texte(brut.get("description")),
        "lien_preuve": _texte(brut.get("lien_preuve") or brut.get("lien")),
        "signale_par": _texte(brut.get("signale_par") or brut.get("source")),
    }


class Handler(http.server.SimpleHTTPRequestHandler):
    """Handler avec logs lisibles et cache desactive ( handy pour le dev)."""

    server_version = "LocalHTML/1.0"
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".mjs": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".webmanifest": "application/manifest+json",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        sys.stdout.write(f"  {self.address_string()}  {format % args}\n")
        sys.stdout.flush()

    # ------------------------------------------------------------- l'API

    def _dossier(self, nom: str = DOSSIER_DEMANDES) -> Path:
        """Le dossier des demandes, cree au premier envoi. Il suit le
        dossier servi, pas le script : --folder projet range donc les
        demandes dans projet/demandes_blocus/."""
        d = Path(self.directory) / nom
        d.mkdir(parents=True, exist_ok=True)
        return d

    def _json(self, code: int, donnees, cookies: dict = None) -> None:
        corps = json.dumps(donnees, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corps)))
        for nom, valeur in (cookies or {}).items():
            # Un an, tout le site, et pas de SameSite=None : la page et le
            # serveur sont ici le meme site, et un cookie envoye a un tiers ne
            # servirait a rien.
            self.send_header(
                "Set-Cookie",
                f"{nom}={valeur}; Path=/; Max-Age=31536000; SameSite=Lax")
        self.end_headers()
        self.wfile.write(corps)

    def _cookie(self, nom: str) -> str:
        """La valeur d'un cookie de la requete, ou une chaine vide."""
        brut = self.headers.get("Cookie")
        if not brut:
            return ""
        porte = SimpleCookie()
        try:
            porte.load(brut)
        except Exception:
            return ""
        m = porte.get(nom)
        return m.value if m else ""

    def _param(self, nom: str) -> dict:
        """Un parametre de l'adresse, mis dans la forme d'un corps JSON.

        GET n'a pas de corps, et la page doit pourtant dire a quelle appareil
        elle parle : elle l'ecrit dans la chaine de requete, et on le rend ici
        au meme chemin que les autres entreees."""
        if "?" not in self.path:
            return {}
        valeurs = parse_qs(self.path.split("?", 1)[1]).get(nom) or [""]
        return {nom: valeurs[0]}

    def _appareil(self, donnees: dict):
        """L'appareil de la requete : (identifiant, cookie a ecrire).

        Le cookie fait foi. La page en fabrique un et l'envoie ; le serveur le
        recopie dans un cookie la premiere fois, puis ne retient que celui-la.
        Un rechargement — ou un formulaire renvoye — ne peut donc pas s'attribuer
        une seconde voix en inventant un identifiant, et un localStorage vide ne
        fait pas perdre la voix deja exprimee. C'est la limite honnete de la
        reconnaissance d'appareil : un navigateur efface ses donnees, et c'est
        une nouvelle voix ; sans compte a quoi se rattacher, on ne peut pas
        faire mieux."""
        cookie = self._cookie(CLE_APPAREIL)
        if cookie:
            return cookie, {}
        envoye = id_appareil(donnees.get("appareil"))
        return (envoye, {CLE_APPAREIL: envoye}) if envoye else ("", {})

    def do_GET(self):
        route = self.path.split("?")[0]
        if route == "/":
            # La racine redirige vers l'accueil : sans elle, elle sert
            # index.html, la carte d'un departement, qui sans departement
            # choisi ressemble a un site vide.
            self.send_response(302)
            self.send_header("Location", "/accueil.html")
            self.end_headers()
            return
        if route == "/api/demandes":
            self._lister(DOSSIER_DEMANDES)
            return
        if route == "/api/revendications":
            self._lister(DOSSIER_REVENDICATIONS)
            return
        if route == "/api/rev":
            self._api_rev()
            return
        super().do_GET()

    def _api_rev(self) -> None:
        """GET /api/rev : les revendications et leurs comptes, pour le panneau
        de l'etablissement.

        La page appelle cette route plutot que de lire build/revendications.js
        quand un serveur repond : elle obtient alors aussi les propositions qui
        n'ont pas encore ete relues, et des comptes frais plutot que ceux
        figes au dernier import. Sans serveur, le fichier genere suffit — on ne
        vote alors qu'apres avoir depose le fichier a la main."""
        table = self._revendications()
        votes = _compter_votes(Path(self.directory) / DOSSIER_VOTES)
        sorties = {}
        for cle, e in table.items():
            items = []
            for r in e["revendications"]:
                c = votes["par_rev"].get(cle, {}).get(r["id"], {"pour": 0, "contre": 0})
                items.append({
                    "id": r["id"],
                    "titre": r["titre"],
                    "description": r["description"],
                    "etat": r["etat"],
                    "publiee_le": r.get("publiee_le", ""),
                    "proposee_le": r.get("proposee_le", ""),
                    "proposers": r.get("proposers", 1),
                    "pour": c["pour"],
                    "contre": c["contre"],
                })
            sorties[cle] = {
                "code": e["code"],
                "nom": e["nom"],
                "dep": e["dep"],
                "revendications": items,
                "votants": votes["votants"].get(cle, 0),
            }

        # Ce que l'appareil de la requete a deja vote, si on le sait : le
        # navigateur peut avoir perdu son localStorage sans que le cookie
        # disparaisse, et il ne faut pas lui reproposer un vote deja pris.
        # Le serveur renvoie aussi son identifiant et l'etablissement ou il a
        # vote : la page se met d'accord avec lui plutot que de croire son
        # navigateur, qui peut avoir ete vide entre-temps. Une voix, un
        # etablissement — il faut donc pouvoir dire a la page lequel.
        appareil, cookie = self._appareil(self._param("appareil"))
        moi = dict(votes["par_appareil"].get(appareil, {})) if appareil else {}
        ou = ""
        if moi:
            for cle, e in table.items():
                if any(r["id"] in moi for r in e["revendications"]):
                    ou = cle
                    break

        self._json(200, {
            "etablissements": sorties,
            "moi": moi,
            "appareil": appareil,
            "etablissement": ou,
        }, cookies=cookie)

    def _lister(self, nom: str) -> None:
        """Les fichiers deja deposes dans un dossier de demandes. Les deux
        dossiers se lisent de la meme facon : une seule fonction suffit."""
        dossier = Path(self.directory) / nom
        if not dossier.is_dir():
            self._json(200, {"dossier": nom, "demandes": []})
            return
        noms = sorted(p.name for p in dossier.glob("*.json"))
        self._json(200, {"dossier": nom, "demandes": noms})

    def do_POST(self):
        route = self.path.split("?")[0]
        if route not in ("/api/demande", "/api/revendication", "/api/voix"):
            self._json(404, {"erreur": "route inconnue", "chemin": self.path})
            return

        donnees = self._lire_json()
        if donnees is None:
            return                       # la reponse d'erreur est deja partie

        if route == "/api/voix":
            self._enregistrer_voix(donnees)
        elif route == "/api/revendication":
            self._enregistrer_revendication(donnees)
        else:
            self._enregistrer_signalement(donnees)

    def _lire_json(self):
        """Le corps de la requete, decode. Renvoie None quand il est
        illisible : la reponse a alors deja ete envoyee, et l'appelant n'a
        plus rien a faire."""
        longueur = int(self.headers.get("Content-Length") or 0)
        if longueur <= 0 or longueur > 512 * 1024:
            self._json(400, {"erreur": "corps de requete absent ou trop gros"})
            return None

        try:
            brut = self.rfile.read(longueur).decode("utf-8")
            donnees = json.loads(brut)
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            self._json(400, {"erreur": f"JSON illisible : {exc}"})
            return None

        if not isinstance(donnees, dict):
            self._json(400, {"erreur": "un objet JSON etait attendu"})
            return None
        return donnees

    def _enregistrer_signalement(self, donnees: dict) -> None:
        """Traite un POST /api/demande : on verifie, puis on ecrit."""
        # La page envoie deja la forme normalisee ; un fichier depose a la main
        # peut employer les noms courts du formulaire. On accepte les deux.
        demande = normaliser(donnees)

        # La certification a son propre message : « champs manquants » ne dit
        # pas pourquoi la case est refusee.
        manquants = [
            champ for champ in ("departement", "type", "etablissement", "description")
            if not str(demande.get(champ) or "").strip()
        ]
        if manquants:
            self._json(400, {"erreur": "champs manquants", "champs": manquants})
            return
        if not demande["certifie_en_france"]:
            self._json(403, {
                "erreur": "la case « je certifie etre en France » est obligatoire"})
            return

        fichier = self._enregistrer(demande)
        self._json(200, {
            "enregistre": True,
            "fichier": fichier.name,
            "chemin": f"{DOSSIER_DEMANDES}/{fichier.name}",
            "personnes": _rang(fichier),
        })

    def _enregistrer_revendication(self, donnees: dict) -> None:
        """Traite un POST /api/revendication : le soutien d'un établissement à
        UNE revendication de la liste nationale.

        On ne peut pas écrire une phrase ici : le formulaire propose de choisir
        une des revendications de la page Revendications, et le serveur s'y tient.
        Le titre qu'il reçoit n'est donc pas recopié tel quel — il est cherché
        dans la liste, à la casse et aux accents près, puis remplacé par le
        sien. Ainsi la ligne du tableau porte exactement le texte qui a été
        relu, même si la page a changé entre le chargement et l'envoi.

        Le reste est inchangé : d'où les champs d'établissement, obligatoires, et
        la numérotation _#1, _#2… par établissement et par jour — plusieurs
        revendications pour le même lycée, c'est normal et c'est prévu."""
        titre_demande = _texte(donnees.get("titre"))
        description = _texte(donnees.get("description"))
        etab = _texte(donnees.get("etablissement") or donnees.get("eta"))
        code = _texte(donnees.get("code_insee_commune"))
        if "|" in etab:                       # « Nom|37072 », comme le menu
            etab, code = etab.rsplit("|", 1)

        manquants = [
            champ for champ, valeur in (
                ("titre", titre_demande),
                ("etablissement", etab), ("code_insee_commune", code))
            if not valeur
        ]
        if manquants:
            self._json(400, {"erreur": "champs manquants", "champs": manquants})
            return
        if not re.fullmatch(r"\d{5}", code):
            self._json(400, {"erreur": "code de commune invalide",
                             "code_insee_commune": code})
            return

        # La revendication doit être dans la liste. On répond 400 en donnant la
        # liste, pour qu'un formulaire resté ouvert sur une page plus ancienne
        # se rattrapate tout seul.
        nationales = rev_nationales(self.directory)
        choisie = nationales.get(comparable(titre_demande))
        if not choisie:
            if not nationales:
                self._json(503, {"erreur": "la liste des revendications est "
                                           "introuvable ; le formulaire ne peut "
                                           "rien proposer. Relancez "
                                           "build/extraire-rev-nationales.js."})
            else:
                self._json(400, {
                    "erreur": "choisissez une des revendications de la liste",
                    "revendications": [
                        {"titre": r["titre"], "texte": r["texte"]}
                        for r in nationales.values()
                    ],
                })
            return
        titre = choisie["titre"]

        # La certification a son propre message, comme pour un signalement :
        # une revendication sans établissement n'a pas de lieu d'exister.
        if not _vrai(donnees.get("certifie_dans_etablissement",
                                 donnees.get("certifie"))):
            self._json(403, {"erreur": "la case « je certifie être dans cet "
                                       "établissement » est obligatoire"})
            return

        cle = cle_etablissement(code, etab)
        appareil, cookie = self._appareil(donnees)

        # Plusieurs revendications pour le même établissement : oui. Une
        # montagne : non. Le plafond est par appareil, par établissement et par
        # jour — et il ne compte que les demandes rattachables à cet appareil,
        # donc on ne peut pas l'atteindre par une autre voie.
        jour = datetime.now().strftime("%Y-%m-%d")
        deja = self._proposees_par(appareil, cle, jour)
        if len(deja) >= PLAFOND_REVENDICATIONS:
            self._json(429, {
                "erreur": f"cet appareil a déjà proposé "
                          f"{PLAFOND_REVENDICATIONS} revendications pour cet "
                          f"établissement aujourd'hui",
                "plafond": PLAFOND_REVENDICATIONS,
            }, cookies=cookie)
            return

        maintenant = datetime.now()
        prefixe = f"{jour}_{code}_{sans_accents(etab)[:48]}"
        base = f"{prefixe}_{maintenant.strftime('%H%M%S')}"
        genre = _texte(donnees.get("type"))
        complet = {
            "version": 1,
            "recu_le": maintenant.isoformat(timespec="seconds"),
            "source": "ajouter-une-revendication.html",
            "departement": _texte(donnees.get("departement") or donnees.get("dep")),
            "certifie_dans_etablissement": True,
            "type": genre,
            "type_lisible": _texte(donnees.get("type_lisible")) or TYPES_LISIBLES.get(genre, ""),
            "etablissement": etab,
            "code_insee_commune": code,
            "titre": titre,
            "texte_national": choisie["texte"],
            "description": description,
            "contact": _texte(donnees.get("contact")),
            "appareil": appareil,
        }
        complet["nom_departement"] = self._nom_departement(complet["departement"])

        chemin = self._ecrire(DOSSIER_REVENDICATIONS, prefixe, base, complet)
        self._json(200, {
            "enregistre": True,
            "fichier": chemin.name,
            "chemin": f"{DOSSIER_REVENDICATIONS}/{chemin.name}",
            "personnes": _rang(chemin),
            "identifiant": id_revendication(cle, titre),
            "revendication": titre,
            "etablissement": cle,
        }, cookies=cookie)

    def _proposees_par(self, appareil: str, cle: str, jour: str) -> list:
        """Les demandes qu'un appareil a faites pour un établissement un jour
        donné : c'est sur leur nombre que repose le plafond."""
        if not appareil:
            return []
        dossier = Path(self.directory) / DOSSIER_REVENDICATIONS
        if not dossier.is_dir():
            return []
        trouvees = []
        for p in dossier.glob("*.json"):
            try:
                v = json.loads(p.read_text(encoding="utf-8"))
            except (OSError, ValueError):
                continue
            if not isinstance(v, dict) or _texte(v.get("appareil")) != appareil:
                continue
            if _texte(v.get("recu_le"))[:10] != jour:
                continue
            if cle_etablissement(v.get("code_insee_commune"),
                                 v.get("etablissement")) != cle:
                continue
            trouvees.append(p.name)
        return trouvees

    def _lire_publiees(self) -> dict:
        """build/revendications.json : les revendications relues et publiées.

        Un fichier absent ou abîmé ne doit pas empêcher le site de
        fonctionner : on rend une table vide, et c'est
        build/controle-revendications.js qui signale le fichier cassé."""
        try:
            donnees = json.loads(
                (Path(self.directory) / PUBLIE_REV).read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return {}
        return donnees if isinstance(donnees, dict) else {}

    def _revendications(self) -> dict:
        """Toutes les revendications connues, groupées par établissement.

        Deux sources : ce qui est publié — relu à la main, dans
        build/revendications.json — et ce qui est proposé, les demandes des
        visiteurs dans le dossier. Une revendication passe de l'une à l'autre
        par build/import-revendications.js ; elle garde son identifiant, donc
        les votes déjà exprimés.

        Une proposition qui fait déjà partie de ce qui est publié n'apparaît
        pas deux fois : la publiée gagne, et l'on compte qui l'a proposée."""
        table: dict = {}

        for cle, e in (self._lire_publiees().get("etablissements") or {}).items():
            if not isinstance(e, dict):
                continue
            lot = {
                "code": _texte(e.get("code")),
                "nom": _texte(e.get("nom")),
                "dep": _texte(e.get("departement")),
                "revendications": [],
            }
            for r in (e.get("revendications") or []):
                if not isinstance(r, dict):
                    continue
                titre = _texte(r.get("titre"))
                if not titre:
                    continue
                lot["revendications"].append({
                    "id": id_revendication(cle, titre),
                    "titre": titre,
                    "description": _texte(r.get("description")),
                    "etat": "publiee",
                    "publiee_le": _texte(r.get("publiee_le")),
                    "proposers": 1,
                })
            if lot["revendications"]:
                table[cle] = lot

        dossier = Path(self.directory) / DOSSIER_REVENDICATIONS
        if dossier.is_dir():
            for p in sorted(dossier.glob("*.json")):
                try:
                    v = json.loads(p.read_text(encoding="utf-8"))
                except (OSError, ValueError):
                    continue
                if not isinstance(v, dict):
                    continue
                titre = _texte(v.get("titre"))
                code = _texte(v.get("code_insee_commune"))
                nom = _texte(v.get("etablissement"))
                if not titre or not code or not nom:
                    continue
                cle = cle_etablissement(code, nom)
                lot = table.setdefault(cle, {
                    "code": code, "nom": nom,
                    "dep": _texte(v.get("departement")), "revendications": [],
                })
                rid = id_revendication(cle, titre)
                deja = next((r for r in lot["revendications"] if r["id"] == rid), None)
                if deja:
                    deja["proposers"] = deja.get("proposers", 1) + 1
                    continue
                lot["revendications"].append({
                    "id": rid,
                    "titre": titre,
                    # Sans description de l'élève, c'est la phrase de la
                    # revendication choisie qui fait la ligne : le tableau ne
                    # montre jamais un titre seul. Même règle que le générateur.
                    "description": _texte(v.get("description")) or _texte(v.get("texte_national")),
                    "etat": "proposee",
                    "proposee_le": _texte(v.get("recu_le"))[:10],
                    "proposers": 1,
                })
        return table

    def _enregistrer_voix(self, donnees: dict) -> None:
        """Traite un POST /api/voix : un vote, dans un établissement.

        Deux limites, toutes deux vérifiées ici plutôt que dans la page — une
        page se contourne, un serveur non :

          * un appareil ne vote que dans un seul établissement ;
          * un appareil ne vote qu'une fois par revendication.

        Et une troisième, qui n'est pas une limite mais une condition : la
        revendication doit exister dans cet établissement. Sans cela, on pourrait
        inventer des identifiants et gonfler le nombre de votants d'un lycée."""
        appareil, cookie = self._appareil(donnees)
        if not appareil:
            self._json(400, {"erreur": "identifiant d'appareil absent : "
                                       "recharge la page et réessaie"})
            return

        cle = _texte(donnees.get("etablissement"))
        i = cle.find("|")
        code, nom = (cle[:i], cle[i + 1:]) if i >= 0 else ("", "")
        if not re.fullmatch(r"\d{5}", code.strip()) or not nom.strip():
            self._json(400, {"erreur": "établissement inconnu",
                             "etablissement": cle})
            return

        rid = _texte(donnees.get("revendication"))
        if not re.fullmatch(r"r[0-9a-f]{10}", rid):
            self._json(400, {"erreur": "identifiant de revendication invalide",
                             "revendication": rid})
            return
        choix = _texte(donnees.get("choix"))
        if choix not in ("pour", "contre"):
            self._json(400, {"erreur": "choix invalide : pour ou contre"})
            return

        # L'ordre de ces vérifications est celui de la règle : d'abord ce que
        # l'appareil a déjà fait. Un appareil qui a déjà voté dans un autre
        # établissement n'y votera pas, quoi qu'il demande — et lui répondre
        # « cet établissement n'a aucune revendication » l'enverrait chercher une
        # autre façon de voter, alors que la réponse utile est « votre voix est
        # déjà donnée, là ».
        votes = _compter_votes(Path(self.directory) / DOSSIER_VOTES)
        deja_vote_dans = votes["tranche"].get(appareil)
        if deja_vote_dans and deja_vote_dans != cle:
            self._json(409, {
                "erreur": "cet appareil a déjà voté dans un autre "
                          "établissement",
                "etablissement": deja_vote_dans,
                "nom": deja_vote_dans.split("|", 1)[-1],
            }, cookies=cookie)
            return
        mon_choix = votes["par_appareil"].get(appareil, {}).get(rid)
        if mon_choix:
            self._json(409, {
                "erreur": "cet appareil a déjà voté pour cette revendication",
                "choix": mon_choix,
            }, cookies=cookie)
            return

        lot = self._revendications().get(cle)
        if not lot:
            self._json(404, {"erreur": "cet établissement n'a aucune "
                                       "revendication", "etablissement": cle})
            return
        item = next((r for r in lot["revendications"] if r["id"] == rid), None)
        if not item:
            self._json(404, {"erreur": "revendication inconnue pour cet "
                                       "établissement", "revendication": rid})
            return

        dossier = self._dossier(DOSSIER_VOTES)
        fichier = dossier / f"{appareil[:16]}-{rid}.json"
        fichier.write_text(json.dumps({
            "version": 1,
            "recu_le": datetime.now().isoformat(timespec="seconds"),
            "source": "index.html",
            "appareil": appareil,
            "etablissement": cle,
            "etablissement_nom": lot["nom"],
            "revendication": rid,
            "titre": item["titre"],
            "choix": choix,
        }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"  --> vote enregistré : {DOSSIER_VOTES}/{fichier.name}", flush=True)

        # Le décompte vient de changer : on invalide la mémoire d'une seconde,
        # sinon la réponse ci-dessous renverrait les chiffres d'avant.
        CACHE_VOTES["lu"] = 0.0
        frais = _compter_votes(dossier)
        c = frais["par_rev"].get(cle, {}).get(rid, {"pour": 0, "contre": 0})
        self._json(200, {
            "enregistre": True,
            "appareil": appareil,
            "choix": choix,
            "pour": c["pour"],
            "contre": c["contre"],
            "votants": frais["votants"].get(cle, 0),
        }, cookies=cookie)

    def _ecrire(self, nom_dossier: str, prefixe: str, base: str, complet: dict) -> Path:
        """Ecrit une demande dans un dossier de demandes et renvoie le chemin.

        Le nom se deduit de ce que la personne a reellement ecrit : le prefixe —
        le jour et le sujet, l'etablissement pour un signalement, le titre pour
        une revendication — puis l'heure de reception.

        Deux personnes qui signalent le meme etablissement le meme jour ne
        doivent ni s'ecraser ni se confondre : la premiere garde son nom nu,
        les suivantes sont numerotees `_#1`, `_#2`… Ce que compte le suffixe,
        c'est donc le nombre de personnes, et non le nombre de secondes.

        C'est aussi la seule ecriture au dossier : les deux pages y passent par la.
        """
        dossier = self._dossier(nom_dossier)
        chemin = self._chemin_libre(dossier, prefixe, base)

        complet["nom_fichier"] = chemin.name
        chemin.write_text(
            json.dumps(complet, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        print(f"  --> demande enregistree : {nom_dossier}/{chemin.name}", flush=True)
        return chemin

    def _chemin_libre(self, dossier: Path, prefixe: str, base: str) -> Path:
        """Le nom du prochain envoi : celui d'un envoi deja ecrit n'est jamais
        repris.

        Un seul envoi par sujet garde son nom nu ; les suivants portent
        `_#1`, `_#2`… On prend le plus petit numero libre plutot que le nombre
        de fichiers, pour qu'un fichier supprime ne fasse pas reutiliser un
        numero deja employe ni relancer la numerotation a zero. La boucle
        rattrape enfin deux envois recus dans la meme seconde, qui auraient
        calcule le meme nom.
        """
        pris, deja_vu = set(), False
        for existant in dossier.glob(f"{prefixe}_*.json"):
            m = re.search(r"_#(\d+)\.json$", existant.name)
            if m:
                pris.add(int(m.group(1)))
            else:
                deja_vu = True

        if not pris and not deja_vu:              # premier envoi du sujet
            nu = dossier / f"{base}.json"
            if not nu.exists():
                return nu

        n = 1
        while True:
            candidat = dossier / f"{base}_#{n}.json"
            if n not in pris and not candidat.exists():
                return candidat
            n += 1

    def _enregistrer(self, demande: dict) -> Path:
        """Ecrit un signalement dans demandes_blocus/."""
        jour = _jour(demande.get("date"))
        prefixe = f"{jour}_{sans_accents(demande.get('etablissement'))[:48]}"
        base = f"{prefixe}_{datetime.now().strftime('%H%M%S')}"

        # La date de reception vaut horodatage du serveur : la date du
        # formulaire peut etre celle du blocus, qui n'est pas la meme chose.
        complet = {
            "version": 1,
            "recu_le": datetime.now().isoformat(timespec="seconds"),
            "source": "signaler-un-blocus.html",
        }
        complet.update(demande)
        # Le code reste dans « departement » ; le nom est ajouté à côté, pour
        # que le fichier se lise sans aller le chercher dans dep-noms.js.
        complet["nom_departement"] = self._nom_departement(demande.get("departement"))

        return self._ecrire(DOSSIER_DEMANDES, prefixe, base, complet)

    def _nom_departement(self, code) -> str:
        """Le nom lisible du departement, s'il est dans la page. Inutile au
        fonctionnement, mais un fichier qu'on relit dans six mois doit dire
        « Indre-et-Loire » et non « 37 »."""
        fichier = Path(self.directory) / "build" / "dep-noms.js"
        try:
            source = fichier.read_text(encoding="utf-8")
        except OSError:
            return ""
        m = re.search(r'"%s"\s*:\s*"([^"]*)"' % re.escape(str(code or "")), source)
        return m.group(1) if m else ""


class ThreadedServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def build_urls(host: str, port: int) -> str:
    if host in ("0.0.0.0", "::"):
        return f"http://localhost:{port}  (aussi accessible via votre IP locale)"
    return f"http://localhost:{port}"


def main() -> int:
    # Les consoles Windows utilisent souvent cp1252/cp437 : on force l'UTF-8
    # avec repli pour ne jamais planter sur un accent ou un symbole.
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass

    parser = argparse.ArgumentParser(description="Serveur HTTP local pour pages HTML.")
    parser.add_argument("--port", "-p", type=int, default=8000, help="port (defaut: 8000)")
    parser.add_argument("--host", "-H", default="127.0.0.1", help="interface (defaut: 127.0.0.1)")
    parser.add_argument("--folder", "-f", default=".", help="dossier a servir (defaut: dossier du script)")
    parser.add_argument("--open", "-o", action="store_true", help="ouvrir le navigateur au demarrage")
    parser.add_argument("--no-open", dest="open", action="store_false", help="ne pas ouvrir le navigateur")
    parser.set_defaults(open=True)
    args = parser.parse_args()

    folder = (ROOT / args.folder).resolve()
    if not folder.is_dir():
        print(f"Erreur : dossier introuvable -> {folder}")
        return 1

    port = args.port
    for attempt in range(20):
        try:
            handler = functools.partial(Handler, directory=str(folder))
            httpd = ThreadedServer((args.host, port), handler)
            break
        except OSError as exc:
            if exc.errno in (48, 98, 10048) or getattr(exc, "winerror", None) == 10048:
                port += 1
                if attempt == 19:
                    print("Erreur : aucun port libre entre 20 essais.")
                    return 1
            else:
                print(f"Erreur : {exc}")
                return 1
    else:
        return 1

    pages = sorted(p.name for p in folder.glob("*.html")) or ["(aucune page HTML)"]
    tous = sorted(
        p.relative_to(folder).as_posix()
        for p in folder.rglob("*")
        if p.is_file()
    )
    if tous:
        fichiers = "\n".join("   " + f for f in tous[:24])
        if len(tous) > 24:
            fichiers += f"\n   … et {len(tous) - 24} autres fichiers"
    else:
        fichiers = "   (vide)"
    files = fichiers

    urls = build_urls(args.host, port)
    print(
        BANNER.format(
            folder=str(folder),
            urls=urls,
            pages="\n".join(f"   - http://localhost:{port}/{p}" for p in pages),
            files=files,
        ),
        flush=True,
    )

    if args.open:
        # L'accueil, pas la racine : la racine redirige elle-meme vers
        # l'accueil, autant y aller directement.
        threading.Timer(0.5, lambda: webbrowser.open(f"http://localhost:{port}/accueil.html")).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[INFO] Arret du serveur.")
    finally:
        httpd.server_close()
    return 0


if __name__ == "__main__":
    sys.exit(main())