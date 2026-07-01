import Disegno from './assets/images/disegno-tecnico.webp'

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

  doorThicknessOptions: ['40', '44'],

  wallThicknessOptions: ['10', '12.5'],


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

        minWidth: 500,
        maxWidth: 1200,

        minHeight: 1800,
        maxHeight: 2600,

        stepWidth: 1,
        stepHeight: 1

      }

    },

    measurePorta: {

      limits: {

        minWidth: 550,
        maxWidth: 1100,

        minHeight: 1900,
        maxHeight: 2400,

        stepWidth: 1,
        stepHeight: 1

      }

    },

    measureMuro: {

      limits: {

        minWidth: 600,
        maxWidth: 1300,

        minHeight: 2000,
        maxHeight: 2700,

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

    primary: '#1f2937',

    secondary: '#3b82f6',

    background: '#f3f4f6',

    completedStep: '#10b981',

    activeStep: '#facc15',

    buttonBg: '#ffffff',

    buttonHover: '#e5e7eb',

    buttonActive: '#3b82f6',

    buttonActiveText: '#ffffff',

    cardBg: '#ffffff',

    cardShadow: '0 4px 6px rgba(0,0,0,0.1)'

  }

}