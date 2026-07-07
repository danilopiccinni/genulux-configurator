// src/helpers/configHelpers.js


/**
 * Ordine ufficiale degli step del configuratore
 *
 * Sorgente unica utilizzata per:
 * - ProgressBar
 * - navigazione browser
 * - validazione step
 */
export const stepOrder = [

  '/door-thickness',

  '/wall-thickness',

  '/measures',

  '/summary'

]





/**
 * Ritorna l'indice di uno step
 */
export function getStepIndex(path) {

  return stepOrder.indexOf(path)

}







/**
 * Verifica se la navigazione è un ritorno indietro
 */
export function isRollback(from, to) {


  const fromIndex =
    getStepIndex(from)


  const toIndex =
    getStepIndex(to)



  if(
    fromIndex === -1 ||
    toIndex === -1
  ){

    return false

  }



  return toIndex < fromIndex

}








/**
 * Cancella i dati degli step successivi
 */
export function rollbackToStep(config, path) {


  const index =
    getStepIndex(path)



  if(index === -1){

    return

  }





  stepOrder

    .slice(index + 1)

    .forEach(step => {


      switch(step){



        case '/wall-thickness':

          config.wallType = ''

          config.wall = ''

          break





        case '/measures':

          config.type = ''

          config.mode = 'fixed'

          config.width = ''

          config.height = ''

          config.standard = ''

          break





        case '/summary':

          break


      }


    })

}









/**
 * Controlla se un utente può entrare in uno step
 *
 * Gestisce:
 * - forward browser
 * - URL manuale
 * - protezione navigazione
 */
export function canEnterStep(config, path){


  switch(path){



    case '/door-thickness':

      return true





    case '/wall-thickness':

      return !!config.door





    case '/measures':

      return !!config.door &&
             !!config.wall





    case '/summary':

      return !!config.door &&
             !!config.wall &&
             !!config.type &&
             !!config.width &&
             !!config.height





    default:

      return false

  }


}