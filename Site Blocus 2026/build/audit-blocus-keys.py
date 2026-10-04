#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Controle d'integrite de build/blocus-recherche.js contre le CSV officiel
des etablissements (lycees-france/lycees_brut.csv).

Pourquoi cet outil existe :
les agents de recherche ont signale 5 "bugs" dans le fichier de donnees
(Le Verrier, Sivard de Beaulieu, Alexis de Tocqueville, Paul Claudel,
Condorcet). Les 5 etaient FAUX. Leur erreur : supposer qu'un nom de lycee
est unique en France, alors que Condorcet existe dans 5 departements,
Paul Claudel a Laon, Lyon et Paris, Le Verrier est a Saint-Lo.

Regle verifiee : les 2 premiers caracteres de la cle = code departement
(sauf 97x et 2Ax/2Bx ou il faut 3 caracteres).

Usage :
    python build/audit-blocus-keys.py
"""

import csv
import re
import os
import unicodedata
import collections

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(RACINE, 'lycees-france', 'lycees_brut.csv')
BUILD = os.path.join(RACINE, 'build', 'blocus-recherche.js')

STOP = {'lycee', 'lycees', 'prof', 'professionnel', 'polyvalent', 'general',
        'et', 'de', 'des', 'la', 'le', 'les', 'du', 'a', 'en', 'technologique',
        'agricole', 'maritime', 'college', 'ens', 'enseignement', 'generalite',
        'lp', 'legta', 'institut', 'etablissement', 'regional', 'prive',
        'geographique', 'equivalent'}


def norm(s):
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z0-9]+', ' ', s.lower()).strip()


def dept_de_cle(code):
    """'59122' -> '59' ; '97105' -> '971' ; '2A247' -> '2A'."""
    c = code.strip()
    if c[:2] in ('97', '2A', '2B'):
        return c[:3]
    return c[:2]


def dept_du_csv(code):
    """'027' -> '27' ; '971' -> '971' ; '2A' -> '2A'."""
    c = (code or '').strip()
    if len(c) <= 2:
        return c
    if c[0] in '019':
        return c[1:]
    return c


def main():
    par_dept = collections.defaultdict(list)
    with open(CSV, encoding='utf-8', errors='replace', newline='') as fh:
        for r in csv.DictReader(fh, delimiter=';'):
            nom = (r.get('appellation_officielle') or '').strip()
            if not nom:
                continue
            par_dept[dept_du_csv(r.get('code_departement'))].append(
                (norm(nom), (r.get('libelle_commune') or '').strip()))

    build = open(BUILD, encoding='utf-8', errors='replace').read()
    cles = re.findall(r'window\.BLOCUS\["([^"]+)"\]', build)

    print("cles du build       : %d" % len(cles))
    print("departements du CSV : %d" % len(par_dept))
    print()

    # --- 1. le departement de la cle est-il valide ?
    departs_vus = set()
    for k in cles:
        departs_vus.add(dept_de_cle(k.split('|')[0]))
    inconnus = sorted(d for d in departs_vus if d not in par_dept)
    print("departements utilises dans les cles : %d" % len(departs_vus))
    print("departements introuvables dans le CSV : %s" % (inconnus or 'aucun'))
    print()

    # --- 2. le nom existe-t-il dans ce depart ?
    ecarts = []
    for k in cles:
        dp, nom = k.split('|', 1)
        d = dept_de_cle(dp)
        jet = [w for w in norm(nom).split() if len(w) > 3 and w not in STOP]
        if not jet:
            continue
        pool = par_dept.get(d, [])
        if not pool:
            ecarts.append((k, d, 'departement absent du CSV', ''))
            continue
        best = (0, '')
        for cn, com in pool:
            ct = set(cn.split())
            sc = sum(1 for j in jet if j in ct)
            if sc > best[0]:
                best = (sc, com)
        if best[0] < len(jet):
            ecarts.append((k, d, '%d/%d jetons' % (best[0], len(jet)), best[1]))

    print("=== ecarts de nom (souvent une abreviation, pas une erreur) ===")
    print("    %d / %d" % (len(ecarts), len(cles)))
    for k, d, why, com in ecarts:
        print("  dept %-4s %-50s %-13s -> CSV : %s" % (d, k, why, com))
    print()

    # --- 3. vrai doublon = meme depart, meme nom, meme commune
    print("=== vrais doublons ( meme depart + meme nom + meme commune ) ===")
    par_cles = collections.defaultdict(list)
    for k in cles:
        dp, nom = k.split('|', 1)
        d = dept_de_cle(dp)
        communes = set()
        jet = [w for w in norm(nom).split() if len(w) > 3 and w not in STOP]
        for cn, com in par_dept.get(d, []):
            ct = set(cn.split())
            if jet and sum(1 for j in jet if j in ct) == len(jet):
                communes.add(com)
        par_cles[(d, norm(nom), tuple(sorted(communes)))].append(k)

    n = 0
    for (d, nom, coms), ks in sorted(par_cles.items()):
        if len(ks) > 1:
            n += 1
            print("  dept %-4s %-44s %s" % (d, ' | '.join(ks), ', '.join(coms)))
    if n == 0:
        print("  aucun")
    print()

    # --- 4. meme nom dans plusieurs departements (piege classique)
    par_nom = collections.defaultdict(set)
    for k in cles:
        dp, nom = k.split('|', 1)
        par_nom[norm(nom)].add(dept_de_cle(dp))
    multi = {n_: d for n_, d in par_nom.items() if len(d) > 1}
    print("=== noms de lycee presents dans plusieurs departements : %d ==="
          % len(multi))
    print("    (ce sont eux qui provoquent les fausses accusations de bug)")
    for n_, ds in sorted(multi.items(), key=lambda x: -len(x[1]))[:15]:
        print("  %-34s %s" % (n_[:34], ', '.join(sorted(ds))))


if __name__ == '__main__':
    main()