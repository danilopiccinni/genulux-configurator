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

  '/door',

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

          config.wallPanel = ''

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
 * Verifica se il muro è completo
 *
 * Massivbau:
 * - tipo muro
 * - spessore
 *
 * Trockenbau:
 * - tipo muro
 * - pannellatura
 * - spessore
 */
function isWallComplete(config){


  if(!config.wallType){

    return false

  }



  if(config.wallType === 'massivbau'){

    return !!config.wall

  }




  if(config.wallType === 'trockenbau'){

    return !!config.wall &&
           !!config.wallPanel

  }




  return false

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



    case '/door':


      return true





    case '/wall-thickness':


      return !!config.door





    case '/measures':


      return !!config.door &&
             isWallComplete(config)







    case '/summary':


      return !!config.door &&

             isWallComplete(config) &&

             !!config.type &&

             !!config.width &&

             !!config.height





    default:


      return false

  }


}