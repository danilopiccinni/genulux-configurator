import Disegno from './assets/images/disegno_tecnico.png'

/*
|--------------------------------------------------------------------------
| Disponibilità misure
|--------------------------------------------------------------------------
*/

export const AvailabilityStatus = {

  STOCK: 'stock',

  PRODUCTION: 'production',

  DISCONTINUED: 'discontinued'

}



export const ConfigData = {

  images: {
    summaryHeader: Disegno
  },


  /*
  |--------------------------------------------------------------------------
  | Spessori
  |--------------------------------------------------------------------------
  */

  doorOptions: ['40', '44'],

  /*
  |--------------------------------------------------------------------------
  | Configurazione muro
  |--------------------------------------------------------------------------
  */


 /*
|--------------------------------------------------------------------------
| Configurazione muro
|--------------------------------------------------------------------------
*/


wallTypes: [

  'massivbau',

  'trockenbau'

],




/*
|--------------------------------------------------------------------------
| Spessori muro disponibili
|--------------------------------------------------------------------------
|
| enabled:
|
| true  = selezionabile
|
| false = visibile ma bloccato
|
|
| panel:
|
| utilizzato solo per trockenbau
|
| definisce automaticamente
| la pannellatura derivata
|
*/


wallThicknessOptions: {


  massivbau:[


    {

      value:'10',

      enabled:false

    },


    {

      value:'12.5',

      enabled:true

    }


  ],





  trockenbau:[


    {

      value:'10',

      enabled:false,

      panel:'singlePanel'

    },


    {

      value:'12.5',

      enabled:true,

      panel:'doublePanel'

    }


  ]


},




  /*
  |--------------------------------------------------------------------------
  | Tipi di misura disponibili
  |--------------------------------------------------------------------------
  */

  measureTypes: [

    {
      label: 'Misura luce',
      value: 'measureLuce'
    },

    {
      label: 'Misura porta',
      value: 'measurePorta'
    },

    {
      label: 'Apertura muro',
      value: 'measureMuro'
    }

  ],



  /*
  |--------------------------------------------------------------------------
  | Catalogo misure standard
  |--------------------------------------------------------------------------
  */

  standards: {

    IT: {

      label: 'Internazionale',

      baseMeasure: 'measureLuce',

      catalog: [

        {
          width: 700,
          height: 2100,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 800,
          height: 2100,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 900,
          height: 2100,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 700,
          height: 2400,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 800,
          height: 2400,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 900,
          height: 2400,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 900,
          height: 2700,
          availability: AvailabilityStatus.PRODUCTION
        }

      ]

    },


    DE: {

      label: 'Norma industria Germania',

      baseMeasure: 'measurePorta',

      catalog: [

        {
          width: 735,
          height: 2110,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 860,
          height: 2110,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 985,
          height: 2110,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 735,
          height: 2235,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 860,
          height: 2235,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 985,
          height: 2235,
          availability: AvailabilityStatus.STOCK
        },

        {
          width: 900,
          height: 2500,
          availability: AvailabilityStatus.PRODUCTION
        }

      ]

    }

  },



  /*
  |--------------------------------------------------------------------------
  | Configurazione modalità personalizzata
  |--------------------------------------------------------------------------
  */

  measuresConfig: {

    measureLuce: {

      limits: {

        minWidth: 700,
        maxWidth: 1100,

        minHeight: 2000,
        maxHeight: 3000,

        stepWidth: 1,
        stepHeight: 1

      }

    },

    measurePorta: {

      limits: {

        minWidth: 730,
        maxWidth: 1100,

        minHeight: 1985,
        maxHeight: 3000,

        stepWidth: 1,
        stepHeight: 1

      }

    },

    measureMuro: {

      limits: {

        minWidth: 1534,
        maxWidth: 2334,

        minHeight: 1950,
        maxHeight: 3063,

        stepWidth: 1,
        stepHeight: 1

      }

    }

  },



  /*
  |--------------------------------------------------------------------------
  | Colori
  |--------------------------------------------------------------------------
  */
  colors: {

    /* ==========================================================
    * BRAND
    * Colori principali Genulux / AGS
    * ========================================================== */

    primary: '#8C1D40',
    primaryHover: '#A3244B',
    primaryDark: '#6F1732',
    primaryLight: '#F8EEF2',



    /* ==========================================================
    * BACKGROUND
    * ========================================================== */

    background: '#F6F7F9',
    surface: '#FFFFFF',
    surfaceAlt: '#FAFAFA',



    /* ==========================================================
    * TESTI
    * ========================================================== */

    text: '#222222',
    textSecondary: '#5F6368',
    textLight: '#8C8C8C',
    textWhite: '#FFFFFF',



    /* ==========================================================
    * BORDI
    * ========================================================== */

    border: '#E3E5E8',
    borderLight: '#F1F2F4',
    borderDark: '#CFCFCF',



    /* ==========================================================
    * BOTTONI
    * ========================================================== */

    buttonBg: '#FFFFFF',
    buttonHover: '#F8EEF2',

    buttonActive: '#8C1D40',
    buttonActiveHover: '#A3244B',
    buttonActiveText: '#FFFFFF',

    buttonSecondary: '#F5F5F5',
    buttonSecondaryHover: '#ECECEC',



    /* ==========================================================
    * CARD
    * ========================================================== */

    cardBg: '#ffffff9b',
    cardBorder: '#ECECEC',

    cardShadow:
      '0 8px 24px rgba(0,0,0,.08)',

    cardShadowHover:
      '0 14px 35px rgba(0,0,0,.12)',



    /* ==========================================================
    * PROGRESS BAR
    * ========================================================== */

    completedStep: '#8C1D40',
    activeStep: '#A3244B',
    inactiveStep: '#FFFFFF',
    lockedStep: '#ECECEC',



    /* ==========================================================
    * INPUT
    * ========================================================== */

    inputBg: '#FFFFFF',
    inputBorder: '#D7D7D7',
    inputBorderFocus: '#8C1D40',
    inputPlaceholder: '#A5A5A5',



    /* ==========================================================
    * INFO BOX
    * ========================================================== */

    infoBg: '#F8EEF2',
    infoBorder: '#D69AB0',
    infoText: '#6F1732',



    /* ==========================================================
    * SUCCESS
    * ========================================================== */

    successBg: '#ECFDF5',
    successBorder: '#22C55E',
    successText: '#166534',



    /* ==========================================================
    * WARNING
    * ========================================================== */

    warningBg: '#FFF7ED',
    warningBorder: '#F59E0B',
    warningText: '#B45309',



    /* ==========================================================
    * ERROR
    * ========================================================== */

    errorBg: '#FEF2F2',
    errorBorder: '#EF4444',
    errorText: '#B91C1C',



    /* ==========================================================
    * TRANSITIONS
    * ========================================================== */

    transitionFast: '.18s ease',
    transition: '.25s ease',
    transitionSlow: '.35s ease',



    /* ==========================================================
    * BORDER RADIUS
    * ========================================================== */

    radiusSmall: '6px',
    radius: '10px',
    radiusLarge: '16px',
    radiusXL: '22px'

  }

}