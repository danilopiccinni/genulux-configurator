<template>

  <div class="page">


    <!-- ========================================
         HEADER BRAND
    ========================================= -->


    <header class="topbar">


      <div class="logo-container">


        <img

          class="logo"

          src="./assets/images/logo_ags_weis.png"

          alt="AGS"

        />


      </div>





      <div class="topbar-actions">


        <LanguageSelector />





        <div
          v-if="route.path !== '/'"
          class="header-actions"
        >



          <!-- HOME CONFIGURATORE -->

          <button

            class="header-btn"

            @click="goHome"

          >

            {{ locales[config.currentLang].homeConfigurator }}


          </button>






          <!-- NUOVA CONFIGURAZIONE -->

          <button

            class="header-btn"

            @click="newConfig"

          >

            {{ locales[config.currentLang].newConfiguration }}


          </button>



        </div>


      </div>


    </header>








    <!-- ========================================
         AREA CONFIGURATORE
    ========================================= -->


    <main class="configurator">



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



    </main>


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





<style scoped>


/*
========================================
PAGE BACKGROUND
========================================
*/


.page {


  min-height:100vh;


  font-family:'Inter',sans-serif;


  background:


    linear-gradient(

      rgba(255, 255, 255, 0),

      rgba(255, 255, 255, 0)

    ),


    url('./assets/images/bild_start.jpg');



  background-size:cover;


  background-position:left center;


  background-repeat:no-repeat;


  background-attachment:fixed;



  color:v-bind('ConfigData.colors.text');

}





/*
========================================
TOPBAR
========================================
*/


.topbar {


  height:68px;


  display:flex;


  justify-content:space-between;


  align-items:center;



  padding:

    0 45px;



  background:

    v-bind('ConfigData.colors.primary');




  box-shadow:


    0 6px 25px rgba(0,0,0,.05);



  position:relative;


  z-index:10;


}







/*
========================================
LOGO
========================================
*/


.logo {


  width:145px;


  height:auto;


  display:block;


}








.logo-container {


  display:flex;


  align-items:center;


}









/*
========================================
RIGHT ACTIONS
========================================
*/


.topbar-actions {


  display:flex;


  align-items:center;


  gap:20px;


}








.header-actions {


  display:flex;


  align-items:center;


  gap:12px;


}








.header-btn {


  padding:

    10px 18px;



  font-size:.85rem;


  font-weight:600;



  border-radius:

    v-bind('ConfigData.colors.radius');



  border:

    1px solid

    v-bind('ConfigData.colors.border');



  background:

    v-bind('ConfigData.colors.surface');



  color:

    v-bind('ConfigData.colors.text');



  cursor:pointer;



  transition:

    all

    v-bind('ConfigData.colors.transition');



}







.header-btn:hover {


  background:

    v-bind('ConfigData.colors.primaryLight');



  border-color:

    v-bind('ConfigData.colors.primary');



  color:

    v-bind('ConfigData.colors.primary');



  transform:

    translateY(-2px);


}









/*
========================================
CONFIGURATOR POSITION
========================================
*/


.configurator {


  width:

    min(900px,90%);



  margin-left:auto;



  margin-right:6vw;



  padding:


    45px 0 70px;



  position:relative;


  z-index:2;


}








/*
========================================
ROUTE TRANSITION
========================================
*/


.fade-slide-enter-active,
.fade-slide-leave-active {


  transition:


    opacity .35s ease,


    transform .35s ease;


}





.fade-slide-enter-from {


  opacity:0;


  transform:

    translateX(30px);


}






.fade-slide-leave-to {


  opacity:0;


  transform:

    translateX(-30px);


}









/*
========================================
RESPONSIVE
========================================
*/


@media(max-width:900px){


  .topbar {


    padding:

      0 25px;


  }



  .configurator {


    width:92%;


    margin:

      0 auto;


  }



}






@media(max-width:650px){



  .topbar {


    height:auto;


    padding:

      20px;


    flex-direction:column;


    gap:20px;


  }




  .topbar-actions {


    flex-direction:column;


  }




}

</style>