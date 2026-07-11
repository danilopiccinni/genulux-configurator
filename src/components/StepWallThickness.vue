<template>
  <div class="step-card">


    <!--
    ========================================
    TIPO MURO
    ========================================
    -->

    <div class="choice-box">


      <h2>
        {{ locales[config.currentLang].wallType }}
      </h2>



      <div class="button-group">


        <button

          class="option-button"

          :class="{
            active: config.wallType === 'massivbau'
          }"

          @click="selectWallType('massivbau')"

        >

          {{ locales[config.currentLang].massivbau }}

        </button>





        <button

          class="option-button"

          :class="{
            active: config.wallType === 'trockenbau'
          }"

          @click="selectWallType('trockenbau')"

        >

          {{ locales[config.currentLang].trockenbau }}

        </button>


      </div>


    </div>









    <!--
    ========================================
    SPESSORE MURO
    ========================================
    -->


    <div

      v-if="config.wallType"

      class="choice-box"

    >


      <h2>

        {{ locales[config.currentLang].wallThickness }}

      </h2>




      <div class="thickness-list">


        <div

          v-for="item in availableWallThickness"

          :key="item.value"

          class="thickness-item"

        >



          <button

            class="option-button"

            :disabled="!item.enabled"

            :class="{

              active: config.wall === item.value,

              disabled: !item.enabled

            }"

            @click="selectThickness(item)"

          >

            {{ item.value }} cm


          </button>





          <!--
          Informazione tecnica derivata
          SOLO TROCKENBAU
          -->

          <small

            v-if="
              config.wallType === 'trockenbau'
              &&
              item.panel
            "

            class="panel-note"

          >

            {{ locales[config.currentLang].wallPanel }}:

            {{ locales[config.currentLang][item.panel] }}


          </small>



        </div>


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
 * Lista spessori disponibili
 * in base al tipo muro scelto
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
 * Reset delle scelte
 * dipendenti
 */
function selectWallType(type){


  props.config.wallType = type


  props.config.wall = ''

  props.config.wallPanel = ''


}









/**
 * Scelta spessore
 *
 * Nel caso trockenbau:
 * la pannellatura viene ricavata
 * automaticamente dallo spessore
 */
function selectThickness(item){


  if(!item.enabled){

    return

  }



  props.config.wall = item.value





  if(props.config.wallType === 'trockenbau'){


    props.config.wallPanel = item.panel || ''


  }
  else {


    props.config.wallPanel = ''


  }





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


}






.choice-box {


  width:100%;

  padding:25px;

  margin-bottom:25px;

  border-radius:12px;

  background:#f9fafb;

  text-align:center;


}






h2 {


  margin-bottom:20px;

  font-size:1.1rem;


}






.button-group {


  display:flex;

  justify-content:center;

  gap:15px;

  flex-wrap:wrap;


}






.thickness-list {

  display:flex;

  justify-content:center;

  align-items:flex-start;

  gap:20px;

  flex-wrap:wrap;

}






.thickness-item {


  display:flex;

  flex-direction:column;

  align-items:center;

  gap:8px;


}






.option-button {


  min-width:150px;

  padding:15px 25px;

  border-radius:10px;

  border:2px solid v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonBg');

  font-weight:600;

  cursor:pointer;

  transition:.2s;


}






.option-button:hover:not(:disabled) {


  background:v-bind('data.colors.buttonHover');

  transform:translateY(-2px);


}






.option-button.active {


  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

  border-color:v-bind('data.colors.buttonActive');


}






.option-button:disabled,
.option-button.disabled {


  opacity:.35;

  cursor:not-allowed;

  background:#e5e7eb;


}






.panel-note {


  color:#4b5563;

  font-size:.9rem;

  font-style:italic;


}


</style>