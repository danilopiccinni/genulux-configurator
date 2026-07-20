<template>

  <div class="step-card">


    <div class="welcome-header">

      <h1>
        Genulux
      </h1>


      <h2>
        {{ locales[config.currentLang].welcomeTitle }}
      </h2>


      <p class="description">

        {{ locales[config.currentLang].welcomeText1 }}

      </p>

            <p class="description">

        {{ locales[config.currentLang].welcomeText2 }}

      </p>

    </div>







    <!-- <div class="features">


      <h3>

        {{ locales[config.currentLang].welcomeFeaturesTitle }}

      </h3>




      <div class="feature-list">


        <div class="feature-item">

          <span class="feature-icon">
            ✓
          </span>

          <p>
            {{ locales[config.currentLang].welcomeFeatureDoor }}
          </p>

        </div>





        <div class="feature-item">

          <span class="feature-icon">
            ✓
          </span>

          <p>
            {{ locales[config.currentLang].welcomeFeatureWallType }}
          </p>

        </div>





        <div class="feature-item">

          <span class="feature-icon">
            ✓
          </span>

          <p>
            {{ locales[config.currentLang].welcomeFeatureWallThickness }}
          </p>

        </div>





        <div class="feature-item">

          <span class="feature-icon">
            ✓
          </span>

          <p>
            {{ locales[config.currentLang].welcomeFeatureMeasures }}
          </p>

        </div>



      </div>


    </div> -->









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
==============================
WELCOME CARD
==============================
*/

.step-card {

  background:v-bind('data.colors.cardBg');

  padding:45px;

  border-radius:v-bind('data.colors.radiusXL');

  box-shadow:v-bind('data.colors.cardShadow');

  border:1px solid v-bind('data.colors.cardBorder');

  text-align:center;

  transition:.25s ease;

}



.step-card:hover {

  box-shadow:v-bind('data.colors.cardShadowHover');

}







.welcome-header{

  max-width:680px;

  margin:auto;

}






h1{

  font-size:2.5rem;

  margin:0 0 18px;

  letter-spacing:1px;

  color:#8C1D40;

  font-weight:700;

}






h2{

  font-size:1.55rem;

  margin-bottom:28px;

  color:#2f2930;

  font-weight:600;

}







.description{

  line-height:1.8;

  font-size:1.08rem;

  color:#5b5560;

  margin-bottom:50px;

}









/*
==============================
FEATURES
==============================
*/


.features{

  max-width:620px;

  margin:0 auto 50px;

}






.features h3{

  margin-bottom:28px;

  font-size:1.2rem;

  color:#2f2930;

}






.feature-list{

  display:flex;

  flex-direction:column;

  gap:16px;

}






.feature-item{

  display:flex;

  align-items:center;

  gap:18px;

  padding:18px 22px;

  background:#faf7f8;

  border-radius:16px;

  text-align:left;

  border:1px solid rgba(140,29,64,.08);

  transition:.25s ease;

}






.feature-item:hover{

  transform:translateY(-3px);

  box-shadow:
    0 8px 20px rgba(140,29,64,.10);

}






.feature-icon{

  width:32px;

  height:32px;

  display:flex;

  align-items:center;

  justify-content:center;

  border-radius:50%;

  background:#8C1D40;

  color:white;

  font-weight:bold;

  flex-shrink:0;

  box-shadow:
    0 4px 10px rgba(140,29,64,.25);

}






.feature-item p{

  margin:0;

  color:#3f3740;

}









/*
==============================
CONFIGURAZIONE SALVATA
==============================
*/


.saved-box{

  border-top:1px solid #eadde1;

  padding-top:40px;

}






.saved-box h3{

  margin-bottom:12px;

  color:#2f2930;

}






.saved-box p{

  color:#5b5560;

}









/*
==============================
BUTTONS
==============================
*/


.buttons{

  display:flex;

  justify-content:center;

  gap:18px;

  flex-wrap:wrap;

  margin-top:35px;

}






button{

  padding:14px 34px;

  border-radius:14px;

  border:none;

  cursor:pointer;

  font-weight:600;

  font-size:.95rem;

  transition:

    transform .25s ease,

    box-shadow .25s ease;

}






button:hover{

  transform:translateY(-3px);

}






.primary{

  background:#8C1D40;

  color:white;

  box-shadow:

    0 8px 18px rgba(140,29,64,.25);

}






.primary:hover{

  background:#B02D53;

  box-shadow:

    0 12px 25px rgba(140,29,64,.30);

}






.secondary{

  background:#f5eef1;

  color:#8C1D40;

  border:1px solid rgba(140,29,64,.15);

}






.secondary:hover{

  background:#eadde1;

}






.start{

  min-width:240px;

}



</style>