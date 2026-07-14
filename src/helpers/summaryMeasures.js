/**
 * ============================================================================
 * Summary Measures Helper
 * ----------------------------------------------------------------------------
 *
 * Gestisce l'ordine di visualizzazione delle misure
 * nel Summary e nel PDF.
 *
 * La prima misura mostrata è sempre quella scelta
 * dall'utente nello step misure.
 *
 * NON contiene testi.
 * I testi vengono recuperati da locales.js.
 *
 * ============================================================================
 */


export function getSummaryMeasures(config, measures){


  const result = []



  const measuresList = {


    porta:{

      key:'porta',

      labelKey:'doorDimensions',

      value:measures?.porta

    },



    luce:{

      key:'luce',

      labelKey:'lightPassageDimensions',

      value:measures?.luce

    },



    muro:{

      key:'muro',

      labelKey:'wallOpeningDimensions',

      value:measures?.muro

    }


  }





  /**
   * Misura principale scelta dall'utente
   */
  switch(config.type){



    case 'measureLuce':

      result.push(
        measuresList.luce
      )

      break



    case 'measurePorta':

      result.push(
        measuresList.porta
      )

      break



    case 'measureMuro':

      result.push(
        measuresList.muro
      )

      break


  }





  /**
   * Completiamo con le altre misure
   * mantenendo ordine tecnico.
   */
  Object.values(measuresList)
    .forEach(item=>{


      if(

        item.value &&

        !result.some(
          existing =>
          existing.key === item.key
        )

      ){

        result.push(item)

      }


    })




  return result


}