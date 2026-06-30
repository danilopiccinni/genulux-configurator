import { ConfigData } from '../configData'
import { calculateMeasures } from './measureCalculator'



/**
 * ============================================================================
 * Measure Catalog
 * ----------------------------------------------------------------------------
 *
 * Gestisce la generazione delle misure disponibili partendo
 * dal catalogo standard aziendale.
 *
 * NON contiene formule.
 * Le formule sono esclusivamente in measureCalculator.js
 *
 * ============================================================================
 */



/**
 * Ritorna il catalogo base dello standard scelto
 *
 * esempio:
 *
 * getCatalog('IT')
 *
 * ritorna:
 *
 * [
 *  {width:700,height:2100},
 *  {width:800,height:2100}
 * ]
 */
export function getCatalog(standard) {


  if (!ConfigData.standards[standard]) {
    return []
  }


  return ConfigData.standards[standard].catalog

}





/**
 * Genera tutte le misure disponibili
 *
 * esempio:
 *
 * generateMeasureOptions(
 *    'IT',
 *    'measurePorta'
 * )
 *
 * ritorna tutte le porte
 * calcolate dalle luci standard IT
 *
 */
export function generateMeasureOptions(
  standard,
  inputType
) {


  const catalog = getCatalog(standard)


  const result = []


  catalog.forEach(item => {


    const calculated = calculateMeasures({

      standard,

      inputType:
        ConfigData.standards[standard].baseMeasure,

      width:
        item.width,

      height:
        item.height

    })


    if (!calculated) {
      return
    }



    let selected



    switch(inputType) {


      case 'measureLuce':

        selected = calculated.luce

        break



      case 'measurePorta':

        selected = calculated.porta

        break



      case 'measureMuro':

        selected = calculated.muro

        break

    }



    if (!selected) {
      return
    }



    result.push(selected)


  })



  return removeDuplicates(result)

}





/**
 * Elimina misure duplicate
 *
 * Può succedere perché due combinazioni
 * diverse potrebbero generare la stessa misura.
 */
function removeDuplicates(list) {


  const map = new Map()



  list.forEach(item => {


    const key =
      `${item.width}x${item.height}`



    map.set(
      key,
      item
    )

  })


  return Array.from(
    map.values()
  )

}