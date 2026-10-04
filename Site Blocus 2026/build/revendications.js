/* ===========================================================================
   revendications.js — les revendications d'établissement, pour les pages.

   FICHIER GÉNÉRÉ : ne pas le modifier à la main.
   Sources : build/revendications.json (les revendications retenues, relues à
   la main), demandes_revendications/ (les propositions) et votes/ (les comptes
   de voix, figés au moment de la génération).
   Régénérer : node build/import-revendications.js

   Chaque ligne porte son état :
     etat « publiee »  — retenue, relue, publiée dans le tableau de l'établissement.
     etat « proposee » — proposition d'un élève, en attente de relecture. Elle
                        s'affiche quand même : c'est son lycée, et c'est là
                        qu'elle sera votée et discutée. Elle ne rejoint la liste
                        nationale de revendications.html qu'après relecture.

   Clé d'un établissement : « codeInsee|nom », le nom de l'annuaire.
   Identifiant d'une revendication : « r » + 10 chiffres du SHA-1 de
   « clé|titre comparable » — calculé, jamais attribué, donc stable quand une
   proposition devient retenue. C'est lui qui relie une ligne à ses votes.
   =========================================================================== */

window.REVENDICATIONS = {
  genere_le: "2026-10-04T19:14:47",
  etablissements: {},
};
