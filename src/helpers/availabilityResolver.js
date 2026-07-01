/**
 * ============================================================================
 * Availability Resolver
 * ----------------------------------------------------------------------------
 *
 * Decide la disponibilità reale di una misura.
 *
 * Legge il valore dal catalogo:
 *
 * - stock
 * - production
 * - discontinued
 *
 * Se la misura non esiste:
 * -> production
 *
 * Usato anche per misure libere.
 * ============================================================================
 */


import { ConfigData } from '../configData'


export function resolveAvailability({

  standard,

  width,

  height

}) {


  const catalog =
    ConfigData.standards?.[standard]?.catalog



  if(!catalog){

    return {

      availability:'production'

    }

  }



  const match = catalog.find(item =>


    Number(item.width) === Number(width)

    &&

    Number(item.height) === Number(height)


  )



  if(match){


    return {

      availability:
        match.availability || 'production'

    }


  }



  return {

    availability:'production'

  }


}