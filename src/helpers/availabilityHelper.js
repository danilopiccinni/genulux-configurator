/**
 * ============================================================================
 * Availability Helper
 * ----------------------------------------------------------------------------
 *
 * Gestisce la traduzione e la visualizzazione dello stato disponibilità
 * delle misure standard.
 *
 * Gli stati arrivano dal measureCatalog:
 *
 * - stock
 * - production
 * - discontinued
 *
 * Questo file NON decide la disponibilità.
 * La disponibilità viene definita nel catalogo prodotto.
 *
 * ============================================================================
 */


export function getAvailabilityInfo(
  availability,
  currentLang,
  locales
) {


  switch (availability) {



    case 'stock':

      return {

        type: 'success',

        title:
          locales[currentLang].availabilityStock,

        description:
          locales[currentLang].availabilityStockDelivery

      }





    case 'production':

      return {

        type: 'warning',

        title:
          locales[currentLang].availabilityProduction,

        description:
          locales[currentLang].availabilityProductionDelivery

      }





    case 'discontinued':

      return {

        type: 'error',

        title:
          locales[currentLang].availabilityUnavailable,

        description:
          locales[currentLang].availabilityContact

      }





    default:

      return null

  }


}