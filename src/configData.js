import Disegno from './assets/images/disegno-tecnico.webp'


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
  | Nuovo catalogo standard
  |--------------------------------------------------------------------------
  |
  | Qui inseriamo solo le combinazioni realmente disponibili.
  |
  | NON generiamo tutte le combinazioni altezza/larghezza.
  |
  | Ogni elemento rappresenta una misura realmente producibile.
  |
  |--------------------------------------------------------------------------
  */


  standards: {

    IT: {

      label: 'Internazionale',

      /*
      La misura di partenza dello standard IT
      è la luce passaggio
      */

      baseMeasure: 'measureLuce',


      catalog: [

        {
          width: 700,
          height: 2100
        },

        {
          width: 800,
          height: 2100
        },

        {
          width: 900,
          height: 2100
        },

        {
          width: 700,
          height: 2400
        },

        {
          width: 800,
          height: 2400
        },

        {
          width: 900,
          height: 2400
        }

      ]

    },


    DE: {

      label: 'Norma industria Germania',


      /*
      La misura di partenza dello standard DE
      è il pannello porta
      */

      baseMeasure: 'measurePorta',


      catalog: [

        {
          width: 735,
          height: 2110
        },

        {
          width: 860,
          height: 2110
        },

        {
          width: 985,
          height: 2110
        },

        {
          width: 735,
          height: 2235
        },

        {
          width: 860,
          height: 2235
        },

        {
          width: 985,
          height: 2235
        }

      ]

    }

  },



  /*
  |--------------------------------------------------------------------------
  | CONFIGURAZIONE ATTUALE MISURE
  |--------------------------------------------------------------------------
  |
  | Lasciata temporaneamente per compatibilità.
  |
  | Verrà rimossa quando StepMeasures
  | userà il nuovo measureCatalog.
  |
  |--------------------------------------------------------------------------
  */


  measuresConfig: {


    measureLuce: {

      fixed: {

        widths: [600, 700, 800, 900],

        heights: [2000, 2100, 2200]

      },


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

      fixed: {

        widths: [600, 700, 800],

        heights: [2000, 2100]

      },


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

      fixed: {

        widths: [700, 800, 900],

        heights: [2100, 2200]

      },


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