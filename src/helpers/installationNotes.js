/**
 * ============================================================================
 * Installation Notes Helper
 * ----------------------------------------------------------------------------
 *
 * Genera le note tecniche da mostrare nel Summary
 * e nella stampa PDF.
 *
 * NON contiene testi.
 * I testi vengono recuperati da locales.js.
 *
 * ============================================================================
 */


export function getInstallationNotes(config) {


  const notes = []



  /**
   * Massivbau
   *
   * Necessario pannello porta intonaco.
   */
  if(config.wallType === 'massivbau'){


    notes.push({

      type:'info',

      titleKey:'solidcostructionInfoTitle',

      textKey:'solidcostructionInfoText'

    })


  }



  return notes


}