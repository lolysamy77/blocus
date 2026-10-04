#!/usr/bin/env python3
 # -*- coding: utf-8 -*-
"""
Suivi d'avancement des agents de recherche blocus.

Lit la base OpenCode (opencode.db) et affiche, par agent : nombre de
messages, appels d'outils, recherches web, compressions de contexte,
dernier mouvement, et surtout l'avancement reel du fichier de resultat
(fiches tranchees / total).

Les deux vagues n'ont pas les memes conventions de nommage :
  vague 1 : lot-N.txt          -> resultat-N.md
  vague 2 : a-trancher-N.txt   -> resultat-N.txt
Le script detecte les deux.

Usage :
    python build/agents-avancement.py
    python build/agents-avancement.py vague2
"""

import sqlite3
import json
import datetime
import os
import re
import sys
import glob

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.expanduser(r'~\.local\share\opencode\opencode.db')

TITRES = ("SELECT id, title, time_created, time_updated FROM session_v2 "
          "WHERE title LIKE '%Blocus lot%' "
          "   OR title LIKE '%vague 2%lot%' "
          "   OR title LIKE '%vague2 lot%' "
          "ORDER BY time_created")


def ts(v):
    try:
        if isinstance(v, (int, float)):
            v = v / 1000.0
        return datetime.datetime.fromtimestamp(v).strftime('%H:%M:%S')
    except Exception:
        return '?'


def outils(session_id, cur):
    """-> (compte par outil, nb messages, nb compressions)."""
    lignes = cur.execute(
        "SELECT type, data FROM session_message WHERE session_id=?",
        (session_id,)).fetchall()
    compte = {}
    compressions = 0
    for typ, d in lignes:
        if typ == 'compaction':
            compressions += 1
        try:
            j = json.loads(d)
        except Exception:
            continue
        for item in (j.get('content') or []):
            t = item.get('type')
            if t in ('tool-call', 'tool-call-incomplete', 'tool'):
                nom = item.get('name') or item.get('tool') or '?'
                compte[nom] = compte.get(nom, 0) + 1
    return compte, len(lignes), compressions


def fichiers_du_lot(dossier, num):
    """-> (fichier d'entree, fichier de sortie) pour un numero de lot."""
    for motif_in, motif_out in (('lot-%s.txt', 'resultat-%s.md'),
                                ('a-trancher-%s.txt', 'resultat-%s.txt')):
        fi = os.path.join(dossier, motif_in % num)
        fo = os.path.join(dossier, motif_out % num)
        if os.path.exists(fi):
            return fi, fo
    return None, None


def avancement(fichier_sortie):
    """-> (nb_fiches_traitees, nb_fiches_total, etat_texte).

Une fiche est traitee quand son STATUT n'est plus 'EN COURS' ni vide.
En vague 1 (markdown libre) on se rabat sur le compte des sections.
"""
    if not fichier_sortie or not os.path.exists(fichier_sortie):
        return 0, 0, 'non started'
    txt = open(fichier_sortie, encoding='utf-8', errors='replace').read()
    ko = os.path.getsize(fichier_sortie) // 1024
    statuts = re.findall(r'STATUT\s*:?\s*(.+)', txt)
    if statuts:
        total = len(statuts)
        # « traite » = l'agent a rendu un verdict. Les libelles d'attente
        # (EN COURS, A TRANCHER) ne comptent pas.
        EN_ATTENTE = ('EN COURS', 'A TRANCHER', 'À TRANCHER', 'EN ATTENTE')
        fait = sum(1 for s in statuts
                   if s.strip()
                   and not any(a in s.upper() for a in EN_ATTENTE))
        return fait, total, '%d Ko' % ko
    n_eta = txt.count('\n## ')
    return (0, n_eta, '%d Ko / %d etab.' % (ko, n_eta)) if n_eta \
        else (0, 0, '%d Ko' % ko)


def main():
    filtre = sys.argv[1].lower() if len(sys.argv) > 1 else None
    if not os.path.exists(DB):
        print("Base OpenCode introuvable : %s" % DB)
        return
    con = sqlite3.connect('file:%s?mode=ro' % DB.replace('\\', '/'), uri=True)
    cur = con.cursor()

    sess = cur.execute(TITRES).fetchall()
    if not sess:
        print("Aucune session de recherche trouvee.")
        return

    # derniere session par titre (les relances remplacent)
    par_titre = {}
    for sid, titre, tc, tu in sess:
        par_titre[titre] = (sid, tc, tu)

    dossiers = sorted(glob.glob(
        os.path.join(RACINE, 'recherche-blocus-2026', 'vague*')))

    print("=" * 104)
    print("AVANCEMENT AGENTS RECHERCHE BLOCUS   -   %s"
          % datetime.datetime.now().strftime('%d/%m/%Y %H:%M'))
    print("=" * 104)
    print()
    print("%-22s %5s %6s %6s %6s %-9s  %s"
          % ("AGENT", "MSG", "TOOLS", "WEB", "COMPR", "DERNIERE", "AVANCEMENT"))
    print("-" * 104)

    for dossier in dossiers:
        v = os.path.basename(dossier)
        if filtre and not v.lower().startswith(filtre):
            continue
        # on n'affiche que les sessions de CETTE vague : les noms de titre
        # different ("Blocus lot N" en vague 1, "vague2 lot N" en vague 2)
        if v.lower().startswith('vague1'):
            attendus = [t for t in par_titre
                         if t.lower().startswith('blocus lot')]
        else:
            attendus = [t for t in par_titre
                        if re.match(r'vague\s*\d+\s*lot', t, re.I)]
        print("  dossier : %s" % v)
        for titre in sorted(attendus):
            m = re.search(r'lot\s*(\d+)', titre, re.I)
            if not m:
                continue
            num = m.group(1)
            entree, sortie = fichiers_du_lot(dossier, num)
            if entree is None:
                continue
            sid, tc, tu = par_titre[titre]
            compte, nmsg, compr = outils(sid, cur)
            web = compte.get('websearch', 0) + compte.get('webfetch', 0)
            ntools = sum(compte.values())
            fait, total, etat = avancement(sortie)
            if total:
                av = "%3d / %3d fiches  (%s)" % (fait, total, etat)
            else:
                av = "en cours... (%s)" % etat
            print("  %-22s %5d %6d %6d %6d  %-9s  %s"
                  % (titre[:22], nmsg, ntools, web, compr, ts(tu), av))
        print()

    print("-" * 104)
    print("  COMPR = compressions de contexte : au-dela de 2, l'agent sature")
    print("  et risque d'abandonner en cours de route.")
    print()


if __name__ == '__main__':
    main()