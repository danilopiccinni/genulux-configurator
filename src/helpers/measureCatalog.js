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
 * ============================================================================
 * Ritorna il catalogo base dello standard scelto
 * ============================================================================
 */
export function getCatalog(standard) {


  if (!ConfigData.standards[standard]) {

    return []

  }


  return ConfigData.standards[standard].catalog


}









/**
 * ============================================================================
 * Genera tutte le misure disponibili
 * partendo dal catalogo standard.
 *
 * Utilizzato per:
 *
 * - measureLuce
 * - measurePorta
 *
 * ============================================================================
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


      width:item.width,


      height:item.height


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








    /**
     * Manteniamo anche le informazioni
     * del catalogo originale
     *
     * availability:
     * disponibilità reale prodotto
     *
     */
    result.push({


      ...selected,


      availability:item.availability



    })




  })







  return removeDuplicates(result)



}









/**
 * ============================================================================
 * Apertura muro
 * ----------------------------------------------------------------------------
 *
 * L'apertura muro non appartiene
 * ad un unico standard.
 *
 * Viene generata unendo:
 *
 * - catalogo IT
 * - catalogo DE
 *
 *
 * Ogni misura mantiene il catalogo
 * di origine attraverso:
 *
 * originStandard
 *
 * Questo permette di sapere se la misura
 * deriva dalla logica:
 *
 * IT -> Internazionale
 *
 * oppure:
 *
 * DE -> Norma DIN Germania
 *
 * ============================================================================
 */
export function generateWallOpeningOptions(){



  const result = []




  const standards = [


    'IT',

    'DE'


  ]







  standards.forEach(originStandard => {





    const options = generateMeasureOptions(


      originStandard,


      'measureMuro'


    )







    options.forEach(item => {




      result.push({


        ...item,


        originStandard



      })





    })






  })








  return removeDuplicates(result)









}









/**
 * ============================================================================
 * Rimuove eventuali duplicati
 * ============================================================================
 *
 * In caso due cataloghi generino la stessa apertura muro,
 * viene mantenuta l'ultima occorrenza.
 *
 * ============================================================================
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