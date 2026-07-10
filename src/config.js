import { reactive, watch } from 'vue'

export const config = reactive({

  currentLang: 'it',

  // Viene impostato automaticamente da StepMeasures
  // IT -> Passaggio luce
  // DE -> Misura porta
  standard:'',

  door:'',

  wallType: '',

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

  config.wallType = ''

  config.wall=''

  config.type=''

  config.mode='fixed'

  config.width=''

  config.height=''

  config.currentStep='/door-thickness'

}

/**
 * Verifica se esiste una configurazione salvata
 *
 * Utilizzata dalla Welcome Page
 *
 * Serve per decidere se mostrare:
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