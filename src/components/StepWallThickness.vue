<template>
  <div class="step-card">


    <!--
      SCELTA TIPO MURO

      Rimane sempre disponibile.
      Permette all'utente di correggere
      una scelta errata senza rollback.
    -->

    <div class="wall-choice">


      <h2>
        {{ locales[config.currentLang].wallType }}
      </h2>



      <div class="wall-buttons">


        <button
          class="wall-option"
          :class="{ active: config.wallType === 'massivbau' }"
          @click="selectWallType('massivbau')"
        >

          <strong>
            {{ locales[config.currentLang].massivbau }}
          </strong>

        </button>




        <button
          class="wall-option"
          :class="{ active: config.wallType === 'trockenbau' }"
          @click="selectWallType('trockenbau')"
        >

          <strong>
            {{ locales[config.currentLang].trockenbau }}
          </strong>

        </button>


      </div>


    </div>








    <!--
      SCELTA SPESSORE MURO
    -->

    <div
      v-if="config.wallType"
      class="thickness-choice"
    >


      <h2>
        {{ locales[config.currentLang].wallThickness }}
      </h2>




      <div class="selected-wall">

        <strong>
          {{ locales[config.currentLang].wallType }}:
        </strong>


        {{ locales[config.currentLang][config.wallType] }}


      </div>





      <div class="button-group">


        <button
          v-for="val in availableWallThickness"
          :key="val"
          :class="{ active: config.wall === val }"
          @click="select(val)"
        >

          {{ val }} cm

        </button>


      </div>


    </div>


  </div>
</template>





<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { locales } from '../locales'



const props = defineProps({

  config:Object,

  data:Object

})


const router = useRouter()





/**
 * Spessori disponibili
 *
 * Attualmente uguali per:
 * - massivbau
 * - trockenbau
 *
 * Preparato per future differenze.
 */
const availableWallThickness = computed(()=>{


  if(!props.config.wallType){

    return []

  }



  return props.data.wallThicknessOptions[
    props.config.wallType
  ]


})








/**
 * Cambio tipo muro
 *
 * Rimane sempre possibile.
 *
 * Cambio tipo =
 * reset dello spessore scelto.
 */
function selectWallType(type){


  props.config.wallType = type


  props.config.wall = ''


}









/**
 * Scelta spessore
 */
function select(value){


  props.config.wall = value


  props.config.currentStep='/measures'


  router.push('/measures')


}


</script>





<style scoped>

.step-card {

  background:v-bind('data.colors.cardBg');

  padding:30px;

  border-radius:12px;

  box-shadow:v-bind('data.colors.cardShadow');

  text-align:center;

  transition:transform .3s;

}



h2 {

  margin-bottom:1rem;

}







/*
========================================
TIPO MURO
========================================
*/


.wall-choice {

  display:flex;

  flex-direction:column;

  align-items:center;

}






.wall-buttons {

  display:flex;

  gap:20px;

  justify-content:center;

  flex-wrap:wrap;

}





.wall-option {

  width:220px;

  padding:20px;

  border-radius:12px;

  border:2px solid v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonBg');

  cursor:pointer;

  font-weight:600;

  transition:all .25s ease;

}





.wall-option.active {

  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

  border-color:v-bind('data.colors.buttonActive');

}





.wall-option:hover {

  background:v-bind('data.colors.buttonHover');

  transform:translateY(-3px);

}






.wall-option.active:hover {

  background:v-bind('data.colors.buttonActive');

}









/*
========================================
SPESSORE MURO
========================================
*/


.thickness-choice {

  display:flex;

  flex-direction:column;

  align-items:center;

  margin-top:30px;

}





.selected-wall {

  margin-bottom:20px;

  padding:10px 15px;

  border-radius:8px;

  background:#f3f4f6;

  color:#374151;

}






.button-group {

  display:flex;

  gap:15px;

  justify-content:center;

  flex-wrap:wrap;

}






button {

  padding:12px 20px;

  border-radius:8px;

  border:2px solid v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonBg');

  font-weight:600;

  cursor:pointer;

  transition:all .2s;

}






.button-group button.active {

  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

  border-color:v-bind('data.colors.buttonActive');

}






.button-group button:hover {

  background:v-bind('data.colors.buttonHover');

}


</style>