/**
 * ============================================================================
 * Measure Calculator
 * ----------------------------------------------------------------------------
 * Motore matematico del configuratore Genulux.
 *
 * Il file contiene esclusivamente le formule di conversione tra:
 *
 * - Luce passaggio
 * - Porta (Pannello)
 * - Telaio
 * - Apertura muro
 *
 * Tutti i componenti del configuratore dovranno usare SOLO questo file.
 * ============================================================================
 */


/* ============================================================================
 * COSTANTI
 * ========================================================================== */

const IT = {

  doorWidthOffset: 35,
  doorHeightOffset: -6,

  frameWidthOffset: 124,
  frameHeightOffset: 57.5,

  wallWidthOffset: 134,
  wallHeightOffset: 63

}


const DE = {

  doorWidthOffset: -35,
  doorHeightOffset: 6,

  frameWidthOffset: 54,
  frameHeightOffset: 63.5,

  wallWidthOffset: 64,
  wallHeightOffset: 69

}



/* ============================================================================
 * IT
 * Base = Luce passaggio
 * ========================================================================== */

function fromLuceIT(width, height) {

  const luce = {
    width,
    height
  }

  const porta = {
    width: width + IT.doorWidthOffset,
    height: height + IT.doorHeightOffset
  }

  const telaio = {
    width: (width * 2) + IT.frameWidthOffset,
    height: height + IT.frameHeightOffset
  }

  const muro = {
    width: (width * 2) + IT.wallWidthOffset,
    height: height + IT.wallHeightOffset
  }

  return {
    luce,
    porta,
    telaio,
    muro
  }

}


function fromPortaIT(width, height) {

  const luceWidth = width - IT.doorWidthOffset
  const luceHeight = height - IT.doorHeightOffset

  return fromLuceIT(
    luceWidth,
    luceHeight
  )

}


function fromMuroIT(width, height) {

  const luceWidth =
    (width - IT.wallWidthOffset) / 2

  const luceHeight =
    height - IT.wallHeightOffset

  return fromLuceIT(
    luceWidth,
    luceHeight
  )

}



/* ============================================================================
 * DE
 * Base = Porta
 * ========================================================================== */

function fromPortaDE(width, height) {

  const porta = {
    width,
    height
  }

  const luce = {
    width: width + DE.doorWidthOffset,
    height: height + DE.doorHeightOffset
  }

  const telaio = {
    width: (width * 2) + DE.frameWidthOffset,
    height: height + DE.frameHeightOffset
  }

  const muro = {
    width: (width * 2) + DE.wallWidthOffset,
    height: height + DE.wallHeightOffset
  }

  return {
    luce,
    porta,
    telaio,
    muro
  }

}


function fromLuceDE(width, height) {

  const portaWidth =
    width - DE.doorWidthOffset

  const portaHeight =
    height - DE.doorHeightOffset

  return fromPortaDE(
    portaWidth,
    portaHeight
  )

}


function fromMuroDE(width, height) {

  const portaWidth =
    (width - DE.wallWidthOffset) / 2

  const portaHeight =
    height - DE.wallHeightOffset

  return fromPortaDE(
    portaWidth,
    portaHeight
  )

}



/* ============================================================================
 * API PUBBLICA
 * ========================================================================== */

export function calculateMeasures({
  standard,
  inputType,
  width,
  height
}) {

  width = Number(width)
  height = Number(height)


  if (standard === 'IT') {

    switch (inputType) {

      case 'measureLuce':
        return fromLuceIT(width, height)

      case 'measurePorta':
        return fromPortaIT(width, height)

      case 'measureMuro':
        return fromMuroIT(width, height)

      default:
        return null

    }

  }


  if (standard === 'DE') {

    switch (inputType) {

      case 'measurePorta':
        return fromPortaDE(width, height)

      case 'measureLuce':
        return fromLuceDE(width, height)

      case 'measureMuro':
        return fromMuroDE(width, height)

      default:
        return null

    }

  }


  return null

}