<template>

  <div class="step-card">


<div class="welcome-header">


  <div class="welcome-label">

    {{ locales[config.currentLang].welcomeBrandLabel }}

  </div>




  <div class="brand-title">


    <h1>

      {{ locales[config.currentLang].welcomeBrandTitle }}

    </h1>



    <div class="welcome-subtitle">

      {{ locales[config.currentLang].welcomeBrandSubtitle }}

    </div>


  </div>





  <div class="welcome-divider"></div>





  <p class="description">

    {{ locales[config.currentLang].welcomeText1 }}

  </p>



</div>







    <!-- CONFIGURAZIONE SALVATA -->

    <div

      v-if="hasSavedConfiguration()"

      class="saved-box"

    >


      <h3>

        {{ locales[config.currentLang].savedConfigurationTitle }}

      </h3>



      <p>

        {{ locales[config.currentLang].savedConfigurationDescription }}

      </p>





      <div class="buttons">


        <button

          class="primary"

          @click="continueConfiguration"

        >

          {{ locales[config.currentLang].continueConfiguration }}

        </button>





        <button

          class="secondary"

          @click="startNewConfiguration"

        >

          {{ locales[config.currentLang].newConfiguration }}

        </button>


      </div>


    </div>








    <!-- NESSUN SALVATAGGIO -->

    <div

      v-else

      class="buttons"

    >


      <button

        class="primary start"

        @click="startNewConfiguration"

      >

        {{ locales[config.currentLang].startConfiguration }}

      </button>


    </div>



  </div>


</template>





<script setup>

import { useRouter } from 'vue-router'

import { locales } from '../locales'


import {

  config,

  resetConfig,

  hasSavedConfiguration

} from '../config'

const props = defineProps({
  config: Object,
  data: Object
})



const router = useRouter()






function continueConfiguration(){


  router.push(

    config.currentStep || '/door'

  )


}







function startNewConfiguration(){


  resetConfig()


  router.push('/door')


}



</script>





<style scoped>


/*
========================================
WELCOME CARD
========================================
*/


.step-card {


  max-width:850px;


  margin:

    100px auto 40px;



  background:

    v-bind('data.colors.cardBg');



  padding:

    60px 70px;



  border-radius:

    v-bind('data.colors.radiusXL');



  box-shadow:

    v-bind('data.colors.cardShadow');



  border:

    1px solid

    v-bind('data.colors.cardBorder');



  text-align:center;



  transition:.3s ease;



}




.step-card:hover {


  transform:

    translateY(-3px);



  box-shadow:

    v-bind('data.colors.cardShadowHover');



}







/*
========================================
HEADER
========================================
*/


.welcome-header{


  max-width:

    720px;


  margin:

    0 auto;


}








.welcome-label{


  margin-bottom:

    25px;


  font-size:

    1.25rem;


  font-weight:

    700;


  letter-spacing:

    2px;


  text-transform:

    uppercase;


  color:

    v-bind('data.colors.textSecondary');


}









/*
========================================
GENULUX BRAND
========================================
*/


.brand-title{


  position:

    relative;



  display:

    inline-block;



}







.brand-title h1{


  margin:

    0;



  font-size:

    clamp(3rem,6vw,4rem);



  line-height:

    1;



  font-weight:

    900;



  letter-spacing:

    1px;



  color:

    v-bind('data.colors.primary');



}








.welcome-subtitle{


  margin-top:

    10px;



  font-size:

    clamp(1.5rem,3vw,2rem);



  font-weight:

    600;



  letter-spacing:

    1px;



  color:

    v-bind('data.colors.text');



}









/*
========================================
DIVIDER
========================================
*/


.welcome-divider{


  width:

    70px;



  height:

    3px;



  margin:

    35px auto;



  background:

    v-bind('data.colors.primary');



  border-radius:

    10px;


}









/*
========================================
DESCRIPTION
========================================
*/


.description{


  max-width:

    650px;



  margin:

    0 auto 18px;



  font-size:

    1.05rem;



  line-height:

    1.8;



  color:

    v-bind('data.colors.textSecondary');


}






/*
========================================
SAVED CONFIGURATION
========================================
*/


.saved-box{


  margin-top:

    45px;



  padding:

    30px;



  border-radius:

    v-bind('data.colors.radius');



  background:

    rgba(140,29,64,.05);



  border:

    1px solid

    rgba(140,29,64,.12);



}






.saved-box h3{


  margin:

    0 0 12px;



  color:

    v-bind('data.colors.primary');



}






.saved-box p{


  margin:

    0;



  color:

    v-bind('data.colors.textSecondary');



  line-height:

    1.6;



}









/*
========================================
BUTTONS
========================================
*/


.buttons{


  display:flex;



  justify-content:center;



  align-items:center;



  gap:

    18px;



  flex-wrap:

    wrap;



  margin-top:

    40px;



}







button{


  padding:

    15px 38px;



  border-radius:

    v-bind('data.colors.radius');



  border:none;



  cursor:pointer;



  font-size:

    1rem;



  font-weight:

    700;



  transition:

    .25s ease;



}






button:hover{


  transform:

    translateY(-3px);



}







.primary{


  background:

    v-bind('data.colors.buttonActive');



  color:

    v-bind('data.colors.buttonActiveText');



  box-shadow:

    0 10px 25px rgba(140,29,64,.25);



}







.primary:hover{


  box-shadow:

    0 15px 35px rgba(140,29,64,.35);



}







.secondary{


  background:

    transparent;



  color:

    v-bind('data.colors.primary');



  border:

    1px solid

    v-bind('data.colors.primary');



}







.secondary:hover{


  background:

    rgba(140,29,64,.08);



}








.start{


  min-width:

    260px;



}









/*
========================================
MOBILE
========================================
*/


@media(max-width:700px){



.step-card{


  margin:

    40px 15px;



  padding:

    40px 25px;



}





.welcome-header h1{


  font-size:

    2rem;



}





.welcome-header h3{


  margin-bottom:

    25px;



}





.description{


  font-size:

    .95rem;



}





.buttons{


  flex-direction:

    column;



}





button{


  width:

    100%;



}



}

</style>