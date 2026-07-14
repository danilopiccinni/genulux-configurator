<template>
  <div
    :style="{ background: ConfigData.colors.background, color: ConfigData.colors.primary }"
    class="app"
  >

    <div class="header">

      <h1>
        <strong>
          Genulux
        </strong>
      </h1>

      <h5>
        {{ locales[config.currentLang].h2 }}
      </h5>

    </div>



    <div class="button-container">

      <LanguageSelector/>


      <div
        v-if="route.path !== '/'"
        class="header-actions"
      >


        <!-- HOME CONFIGURATORE -->

        <button
          class="home-btn"
          @click="goHome"
        >

          {{ locales[config.currentLang].homeConfigurator }}

        </button>





        <!-- NUOVA CONFIGURAZIONE -->

        <button
          class="reset-btn"
          @click="newConfig"
        >

          {{ locales[config.currentLang].newConfiguration }}

        </button>


      </div>


    </div>





    <ProgressBar

      v-if="route.path !== '/'"

      :config="config"

      :data="ConfigData"

    />





    <router-view v-slot="{ Component }">


      <Transition

        name="fade-slide"

        mode="out-in"

      >


        <component

          :is="Component"

          :config="config"

          :data="ConfigData"

        />


      </Transition>


    </router-view>



  </div>
</template>





<script setup>

import { onMounted, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'


import ProgressBar from './components/ProgressBar.vue'

import LanguageSelector from './components/LanguageSelector.vue'


import { config, loadConfig, resetConfig } from './config'

import { ConfigData } from './configData'

import { locales } from './locales.js'


import {
  rollbackToStep,
  isRollback,
  canEnterStep
} from './helpers/configHelpers'





const router = useRouter()

const route = useRoute()





/**
 * Ultimo step valido raggiunto
 *
 * Serve per impedire:
 *
 * - forward browser
 * - URL manuali
 * - salti di configurazione
 */
let lastValidStep = '/door'







onMounted(() => {


  loadConfig()



  /**
   * Compatibilità vecchie configurazioni
   *
   * Prima esisteva:
   *
   * /standard
   *
   * Ora il flusso parte da:
   *
   * /door
   */
  if(config.currentStep === '/standard'){

    config.currentStep = '/door'

  }



  /**
   * NON facciamo più:
   *
   * router.replace(config.currentStep)
   *
   *
   * perché la pagina iniziale ora è:
   *
   * /
   *
   * Welcome
   *
   */



  lastValidStep =
    config.currentStep || '/door'


})








function newConfig(){


  resetConfig()


  lastValidStep = '/door'


  router.replace('/door')


}



function goHome(){

  router.push('/')

}





/**
 * Gestione navigazione browser
 */
watch(

  () => route.path,


  (newPath, oldPath)=>{


    if(!oldPath){

      return

    }




    /**
     * La Welcome non è uno step
     */
    if(newPath === '/'){

      return

    }





    /**
     * BACK browser
     */
    if(
      isRollback(
        oldPath,
        newPath
      )
    ){


      rollbackToStep(

        config,

        newPath

      )



      config.currentStep = newPath



      lastValidStep = newPath



      return

    }








    /**
     * FORWARD browser
     *
     * oppure URL scritto manualmente
     */
    if(
      !canEnterStep(
        config,
        newPath
      )
    ){


      router.replace(

        lastValidStep

      )


      return

    }








    /**
     * Step valido
     */
    config.currentStep = newPath


    lastValidStep = newPath



  }

)





</script>





<style>


.app {

  max-width:900px;

  margin:auto;

  padding:40px 20px;

  font-family:'Inter',sans-serif;

  transition:
    background .3s,
    color .3s;

  position:relative;

}




.header{

  display:flex;

  justify-content:center;

  align-items:center;

  gap:10px;

}






.button-container{


  display:flex;

  justify-content:space-between;

  padding:20px;

  margin-bottom:20px;


}







.reset-btn {


  padding:8px 14px;

  font-size:.85rem;

  font-weight:600;


  border-radius:8px;

  border:1px solid #d1d5db;


  background:white;

  color:#374151;


  cursor:pointer;


  transition:all .2s;


}





.reset-btn:hover {


  background:#f3f4f6;


}







/*
==============================
ROUTE TRANSITION
==============================
*/


.fade-slide-enter-active,
.fade-slide-leave-active {


  transition:

    opacity .35s ease,

    transform .35s ease;


}





.fade-slide-enter-from {


  opacity:0;

  transform:translateX(30px);


}





.fade-slide-leave-to {


  opacity:0;

  transform:translateX(-30px);


}

.header-actions{

  display:flex;

  gap:10px;

  align-items:center;

}



.home-btn {

  padding:8px 14px;

  font-size:.85rem;

  font-weight:600;


  border-radius:8px;

  border:1px solid #d1d5db;


  background:white;

  color:#374151;


  cursor:pointer;


  transition:all .2s;

}



.home-btn:hover {

  background:#f3f4f6;

}



</style>