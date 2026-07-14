<template>

  <div class="welcome-card">


    <div class="welcome-header">

      <h1>
        Genulux
      </h1>


      <h2>
        {{ locales[config.currentLang].welcomeTitle }}
      </h2>


      <p class="description">

        {{ locales[config.currentLang].welcomeDescription }}

      </p>

    </div>







    <div class="features">


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


.welcome-card{


  max-width:850px;

  margin:30px auto;

  padding:55px 60px;

  background:white;

  border-radius:18px;

  box-shadow:
    0 10px 30px rgba(0,0,0,.08);

  text-align:center;

}







.welcome-header{


  max-width:650px;

  margin:auto;

}






h1{


  font-size:2.2rem;

  margin:0 0 15px;

  letter-spacing:.5px;

  color:#1f2937;

}






h2{


  font-size:1.5rem;

  margin-bottom:25px;

  color:#374151;

}







.description{


  line-height:1.7;

  font-size:1.05rem;

  color:#4b5563;

  margin-bottom:45px;

}









/*
==============================
FEATURES
==============================
*/


.features{


  max-width:600px;

  margin:0 auto 45px;

}






.features h3{


  margin-bottom:25px;

  font-size:1.15rem;

}






.feature-list{


  display:flex;

  flex-direction:column;

  gap:15px;

}






.feature-item{


  display:flex;

  align-items:center;

  gap:15px;

  padding:14px 18px;

  background:#f9fafb;

  border-radius:12px;

  text-align:left;

}






.feature-icon{


  width:28px;

  height:28px;

  display:flex;

  align-items:center;

  justify-content:center;

  border-radius:50%;

  background:#2563eb;

  color:white;

  font-weight:bold;

  flex-shrink:0;

}






.feature-item p{


  margin:0;

  color:#374151;

}









/*
==============================
CONFIGURAZIONE SALVATA
==============================
*/


.saved-box{


  border-top:1px solid #e5e7eb;

  padding-top:35px;

}






.saved-box h3{


  margin-bottom:10px;

}






.saved-box p{


  color:#4b5563;

}









/*
==============================
BUTTONS
==============================
*/


.buttons{


  display:flex;

  justify-content:center;

  gap:15px;

  flex-wrap:wrap;

  margin-top:30px;

}






button{


  padding:13px 30px;

  border-radius:10px;

  border:none;

  cursor:pointer;

  font-weight:600;

  font-size:.95rem;

  transition:
    transform .2s,
    box-shadow .2s;

}






button:hover{


  transform:translateY(-2px);

}






.primary{


  background:#2563eb;

  color:white;

  box-shadow:
    0 5px 12px rgba(37,99,235,.25);

}






.secondary{


  background:#f3f4f6;

  color:#374151;

}






.start{


  min-width:230px;

}


</style>