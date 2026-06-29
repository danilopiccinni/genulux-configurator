// src/helpers/configHelpers.js


/**
 * Ordine ufficiale degli step del configuratore
 * Questa è la sorgente unica utilizzata per:
 * - ProgressBar
 * - navigazione browser
 * - validazione step
 */
export const stepOrder = [
  '/standard',
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
 *
 * esempio:
 * /summary -> /measures = true
 *
 * /measures -> /summary = false
 */
export function isRollback(from, to) {

  const fromIndex = getStepIndex(from)
  const toIndex = getStepIndex(to)

  if (fromIndex === -1 || toIndex === -1) {
    return false
  }

  return toIndex < fromIndex
}


/**
 * Cancella i dati degli step successivi
 *
 * esempio:
 * rollback a /wall-thickness
 *
 * mantiene:
 * - standard
 * - porta
 *
 * cancella:
 * - muro successivo
 * - misure
 */
export function rollbackToStep(config, path) {

  const index = getStepIndex(path)

  if (index === -1) return


  stepOrder
    .slice(index + 1)
    .forEach(step => {

      switch (step) {

        case '/door-thickness':
          config.door = ''
          break


        case '/wall-thickness':
          config.wall = ''
          break


        case '/measures':
          config.type = ''
          config.mode = 'fixed'
          config.width = ''
          config.height = ''
          break


        case '/summary':
          break
      }

    })
}


/**
 * Controlla se un utente può entrare in uno step
 *
 * Serve per:
 * - forward browser
 * - protezione URL manuale
 * - eventuali link futuri
 */
export function canEnterStep(config, path) {

  switch (path) {


    case '/standard':
      return true


    case '/door-thickness':
      return !!config.standard


    case '/wall-thickness':
      return !!config.standard && !!config.door


    case '/measures':
      return !!config.standard &&
             !!config.door &&
             !!config.wall


    case '/summary':
      return !!config.standard &&
             !!config.door &&
             !!config.wall &&
             !!config.type &&
             !!config.width &&
             !!config.height


    default:
      return false
  }
}