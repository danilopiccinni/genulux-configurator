// src/helpers/measureHelpers.js

/**
 * Calcola le misure derivate (luce e muro) a partire dalla misura inserita dall'utente.
 * @param {string} type - Tipo di misura inserita dall'utente: 'luce', 'porta' o 'muro'
 * @param {number} width - Larghezza inserita
 * @param {number} height - Altezza inserita
 * @returns {object} - Misure calcolate { widthLuce, widthPorta, widthMuro, heightLuce, heightPorta, heightMuro }
 */
export function calculateDerivedMeasures(type, width, height) {
  let widthLuce, widthPorta, widthMuro
  let heightLuce, heightPorta, heightMuro

  // qui ipotizziamo una logica esemplificativa, modificabile con le formule reali
  switch (type) {
    case 'measurePorta':
      widthPorta = width
      heightPorta = height
      widthLuce = widthPorta + 20      // esempio: luce = porta + 20 mm
      widthMuro = widthLuce * 2 + 40       // esempio: muro = luce + 40 mm
      heightLuce = heightPorta + 10
      heightMuro = heightLuce + 20
      break

    case 'measureLuce':
      widthLuce = width
      heightLuce = height
      widthPorta = widthLuce - 20
      widthMuro = widthLuce * 2 + 20
      heightPorta = heightLuce - 10
      heightMuro = heightLuce + 20
      break

    case 'measureMuro':
      widthMuro = width
      heightMuro = height
      widthLuce = widthMuro - 40
      widthPorta = widthLuce - 20
      heightLuce = heightMuro / 2 - 20
      heightPorta = heightLuce / 2 - 10
      break

    default:
      widthLuce = widthPorta = widthMuro = width
      heightLuce = heightPorta = heightMuro = height
  }

  return {
    widthLuce,
    widthPorta,
    widthMuro,
    heightLuce,
    heightPorta,
    heightMuro
  }
}
