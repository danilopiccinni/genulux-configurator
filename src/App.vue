<template>

  <div class="page">


    <!-- ========================================
         HEADER
    ========================================= -->

<header class="topbar">


  <div class="logo-container">

    <a
      :href="companyWebsite"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="AG Systems"
    >

      <img
        class="logo"
        src="./assets/images/logo_ags_weis.png"
        alt="AG Systems"
      />

    </a>

  </div>




  <!-- DESKTOP ACTIONS -->

  <div class="topbar-actions desktop-menu">


    <LanguageSelector />



    <div
      v-if="route.path !== '/'"
      class="header-actions"
    >


      <button
        class="header-btn"
        @click="goHome"
      >

        {{ locales[config.currentLang].homeConfigurator }}

      </button>



      <button
        class="header-btn"
        @click="newConfig"
      >

        {{ locales[config.currentLang].newConfiguration }}

      </button>


    </div>


  </div>





  <!-- MOBILE BUTTON -->

  <button

    class="mobile-toggle"

    type="button"

    @click="toggleMobileMenu"

  >

    <span v-if="!mobileMenuOpen">
      ☰
    </span>

    <span v-else>
      ✕
    </span>


  </button>





  <!-- MOBILE MENU -->

  <div

    class="mobile-menu"

    :class="{open:mobileMenuOpen}"

  >


    <LanguageSelector />



    <button

      v-if="route.path !== '/'"

      class="header-btn"

      @click="goHome();closeMobileMenu()"

    >

      {{ locales[config.currentLang].homeConfigurator }}

    </button>



    <button

      v-if="route.path !== '/'"

      class="header-btn"

      @click="newConfig();closeMobileMenu()"

    >

      {{ locales[config.currentLang].newConfiguration }}

    </button>


  </div>


</header>









    <!-- ========================================
         CONFIGURATORE
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









    <!-- ========================================
         FOOTER
    ========================================= -->


    <Footer

      :config="config"

      :data="ConfigData"

    />





  </div>


</template>





<script setup>

import { ref, onMounted, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'


import ProgressBar from './components/ProgressBar.vue'

import LanguageSelector from './components/LanguageSelector.vue'


import { config, loadConfig, resetConfig } from './config'

import { ConfigData } from './configData'

import { locales } from './locales.js'

import Footer from './components/Footer.vue'


import {
  rollbackToStep,
  isRollback,
  canEnterStep
} from './helpers/configHelpers'


import { computed } from 'vue'




const companyWebsite = computed(() => {

  switch (config.currentLang) {

    case 'it':
      return 'https://www.ags-systems.info/it'

    case 'en':
      return 'https://www.ags-systems.info/en'

    case 'fr':
      return 'https://www.ags-systems.info/fr'

    case 'de':
      return 'https://www.ags-systems.info/'

    case 'es':
      return 'https://www.ags-systems.info/'

    default:
      return 'https://www.ags-systems.info/'

  }

})



const mobileMenuOpen = ref(false)

function toggleMobileMenu(){

  mobileMenuOpen.value =
    !mobileMenuOpen.value

}


function closeMobileMenu(){

  mobileMenuOpen.value = false

}





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
 * Aggiorna il titolo della pagina
 * in base alla lingua selezionata
 */
watch(

  () => config.currentLang,

  (lang) => {

    document.title =
      locales[lang].pageTitle

  },

  {

    immediate: true

  }

)



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
     * Pagine informative
     *
     * Non fanno parte del flusso configuratore
     */
    if(newPath === '/impressum' || newPath === '/privacy'){

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

.page{

  min-height:100vh;

  display:flex;

  flex-direction:column;

  font-family:'Inter',sans-serif;

  background:

    linear-gradient(
      rgba(255,255,255,0),
      rgba(255,255,255,0)
    ),

    url('./assets/images/bild_start.jpg');

  background-size:cover;

  background-position:left center;

  background-repeat:no-repeat;

  background-attachment:fixed;

  color:

    v-bind('ConfigData.colors.text');

}


/*
========================================
TOPBAR
Desktop:
logo | lingua | bottoni
========================================
*/

.topbar{


  position:fixed;


  top:0;

  left:0;


  width:100%;


  height:72px;


  display:flex;


  align-items:center;


  justify-content:space-between;


  padding:0 40px;


  background:

    v-bind('ConfigData.colors.primary');


  box-shadow:

    0 6px 25px rgba(0,0,0,.08);



  z-index:1000;


  box-sizing:border-box;



}






/*
========================================
LOGO
========================================
*/


.logo-container{

  display:flex;

  align-items:center;

  flex-shrink:0;

}

.logo-container a{

  display:inline-flex;

}



.logo{

  width:145px;

  height:auto;

  display:block;

}






/*
========================================
RIGHT AREA
Lingua + pulsanti
========================================
*/


.topbar-actions{


  display:flex;


  align-items:center;


  justify-content:flex-end;


  gap:15px;


  flex:1;


  min-width:0;


  white-space:nowrap;


}







.header-actions{


  display:flex;


  align-items:center;


  justify-content:flex-end;


  gap:10px;


  flex-shrink:0;


}








.header-btn{


  display:flex;


  align-items:center;


  justify-content:center;


  white-space:nowrap;


  flex-shrink:0;


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

    all .25s ease;


}






.header-btn:hover{


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
MOBILE MENU ELEMENTS
========================================
*/


.mobile-toggle{

  display:none;

  position:relative;

  z-index:10000;


  border:none;

  background:transparent;

  color:white;

  font-size:30px;

  cursor:pointer;

}





.mobile-menu{


  position:fixed;


  top:64px;

  left:0;


  width:100%;



  background:

    v-bind('ConfigData.colors.primary');



  padding:20px;



  display:flex;


  flex-direction:column;


  gap:15px;



  box-sizing:border-box;



  transform:

    translateY(-120%);



  opacity:0;


  visibility:hidden;



  transition:

    all .3s ease;



  z-index:9999;



  box-shadow:

    0 15px 30px rgba(0,0,0,.15);


}




.mobile-menu.open{


  transform:

    translateY(0);


  opacity:1;


  visibility:visible;


}







/*
========================================
CONFIGURATOR AREA
========================================
*/


.configurator{


  flex:1;


  width:

    min(900px,90%);



  margin-left:auto;


  margin-right:6vw;



  padding-top:95px;


  padding-bottom:70px;



  position:relative;


  z-index:2;


}







/*
========================================
ROUTE TRANSITION
========================================
*/


.fade-slide-enter-active,
.fade-slide-leave-active{


  transition:


    opacity .35s ease,


    transform .35s ease;


}




.fade-slide-enter-from{


  opacity:0;


  transform:

    translateX(30px);


}





.fade-slide-leave-to{


  opacity:0;


  transform:

    translateX(-30px);


}








/*
========================================
TABLET
========================================
*/

@media(max-width:900px){


  .topbar{


    padding:

      0 20px;


  }



  .logo{


    width:120px;


  }




  .header-btn{


    padding:

      8px 12px;


    font-size:.75rem;


  }




  .configurator{


    width:92%;


    margin:

      0 auto;


  }


}










/*
========================================
MOBILE
========================================
*/

@media(max-width:768px){


.topbar{

  height:64px;

  padding:0 15px;

}



.logo{

  width:95px;

}



.desktop-menu{

  display:none;

}



.mobile-toggle{

  display:flex;

  align-items:center;

  justify-content:center;

}



.mobile-menu{

  top:64px;

}



.mobile-menu.open{

  transform:translateY(0);

  opacity:1;

  pointer-events:auto;

}



.mobile-menu .header-btn{

  width:100%;

}



.configurator{

  width:94%;

  margin:0 auto;

  padding-top:90px;

}


}








/*
========================================
VERY SMALL MOBILE
========================================
*/

@media(max-width:420px){



  .topbar{


    padding:

      8px 10px;


  }





  .logo{


    width:75px;


  }





  .header-btn{


    padding:

      6px;


    font-size:.62rem;


  }




}

</style>