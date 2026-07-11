import { reactive, watch } from 'vue'

/**
 * Lingua iniziale del configuratore.
 *
 * Al primo avvio viene utilizzata
 * la lingua del browser.
 *
 * Se non è supportata,
 * viene usato l'italiano.
 */
function getBrowserLanguage(){

  const lang =
    navigator.language
      .split('-')[0]
      .toLowerCase()

  const supported = [

    'it',

    'en',

    'de',

    'fr',

    'es'

  ]

  return supported.includes(lang)

    ? lang

    : 'it'

}

export const config = reactive({

  currentLang: getBrowserLanguage(),

  // Viene impostato automaticamente da StepMeasures
  // IT -> Passaggio luce
  // DE -> Misura porta
  standard:'',

  door:'',

  wallType:'',

  wall:'',

  type:'',

  mode:'fixed',

  width:'',

  height:'',

  currentStep:'/door-thickness'

})

watch(

  config,

  (newVal)=>{

    localStorage.setItem(

      'doorConfig',

      JSON.stringify(newVal)

    )

  },

  {
    deep:true
  }

)

export function loadConfig(){

  const saved = JSON.parse(

    localStorage.getItem('doorConfig')

  )

  if(saved){

    Object.assign(

      config,

      saved

    )

  }

}

export function resetConfig(){

  localStorage.removeItem('doorConfig')

  config.standard=''

  config.door=''

  config.wallType=''

  config.wall=''

  config.type=''

  config.mode='fixed'

  config.width=''

  config.height=''

  config.currentStep='/door-thickness'

}

/**
 * Verifica se esiste una configurazione salvata.
 *
 * Utilizzata dalla Welcome Page
 * per decidere se mostrare:
 *
 * - Continua configurazione
 * - Nuova configurazione
 */
export function hasSavedConfiguration(){

  return !!(

    config.door ||

    config.wallType ||

    config.wall ||

    config.type ||

    config.width ||

    config.height

  )

}