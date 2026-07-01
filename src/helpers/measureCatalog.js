import { ConfigData } from '../configData'
import { calculateMeasures } from './measureCalculator'
import { AvailabilityStatus } from '../configData'

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
 */
export function getCatalog(standard) {

  if (!ConfigData.standards[standard]) {
    return []
  }

  return ConfigData.standards[standard].catalog

}




/**
 * Genera tutte le misure disponibili
 * partendo dal catalogo standard.
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

      width: item.width,

      height: item.height

    })


    if (!calculated) {
      return
    }


    let selected


    switch (inputType) {

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


    /**
     * Manteniamo anche le informazioni
     * del catalogo (availability ecc...)
     */
    result.push({

      ...selected,

      availability: item.availability

    })

  })


  return removeDuplicates(result)

}





/**
 * Elimina eventuali duplicati.
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