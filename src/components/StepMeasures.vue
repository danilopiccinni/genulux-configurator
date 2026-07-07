<template>
  <div class="step-card">


    <!--
      NUOVA SCELTA STANDARD MISURA

      IT  -> Passaggio luce
      DE  -> Misura porta DIN

    -->
    <h2>
      {{ locales[config.currentLang].measureType }}
    </h2>

    <div class="measure-choice">



      <button
        class="measure-option"
        :class="{ active: config.type === 'measureLuce' }"
        @click="selectMeasureType('light')"
      >

        <strong>
          {{ locales[config.currentLang].measureLuce }}
        </strong>

        <small>
          {{ locales[config.currentLang].international }}
        </small>

      </button>



      <button
        class="measure-option"
        :class="{ active: config.type === 'measurePorta' }"
        @click="selectMeasureType('door')"
      >

        <strong>
          {{ locales[config.currentLang].measurePorta }}
        </strong>

        <small>
          {{ locales[config.currentLang].germany }}
        </small>

      </button>


    </div>





    <!--
      VECCHIA SCELTA TIPO MISURA

      Conservata per eventuale riattivazione futura.

    -->

    <!--

    <div class="choices">

      <button
        v-for="type in data.measureTypes"
        :key="type.value"
        :class="{ active: config.type === type.value }"
        @click="selectType(type.value)"
      >

        {{ locales[config.currentLang][type.value] }}

      </button>

    </div>

    -->





    <!-- TIPO MISURA ATTIVO -->

    <div
      v-if="config.type"
      class="measure-type-info"
    >

      <strong>
        {{ locales[config.currentLang].measureType }}:
      </strong>


      {{ locales[config.currentLang][config.type] }}


    </div>






    <!-- INSERIMENTO -->

    <div
      v-if="config.type"
      class="measure-inputs"
    >



      <h3>
        {{ locales[config.currentLang].insertMeasures }}
      </h3>





      <!-- MODALITA -->

      <div class="mode">


        <label>

          <input
            type="radio"
            value="fixed"
            v-model="config.mode"
          />


          {{ locales[config.currentLang].standardMeasures }}


        </label>




        <label>

          <input
            type="radio"
            value="custom"
            v-model="config.mode"
          />


          {{ locales[config.currentLang].customMeasures }}


        </label>


      </div>








      <!-- STANDARD -->

      <div
        v-if="config.mode === 'fixed'"
        class="fixed"
      >


        <select
          v-model.number="config.width"
          @change="widthChanged"
        >


          <option disabled value="">
            {{ locales[config.currentLang].width }}
          </option>



          <option
            v-for="w in availableWidths"
            :key="w"
            :value="w"
          >

            {{ w }} mm

          </option>


        </select>






        <select
          v-model.number="config.height"
          @change="heightChanged"
        >


          <option disabled value="">
            {{ locales[config.currentLang].height }}
          </option>




          <option
            v-for="h in availableHeights"
            :key="h"
            :value="h"
          >

            {{ h }} mm

          </option>


        </select>


      </div>








      <!-- LIBERE -->

      <div
        v-else
        class="custom"
      >



        <div class="slider-group">


          <label>

            {{ locales[config.currentLang].width }}:
            {{ config.width }} mm

          </label>




          <input
            type="range"
            :min="measureConfig.limits.minWidth"
            :max="measureConfig.limits.maxWidth"
            :step="measureConfig.limits.stepWidth"
            v-model.number="config.width"
          />



          <div class="slider-labels">

            <span>
              min {{ measureConfig.limits.minWidth }}
            </span>

            <span>
              max {{ measureConfig.limits.maxWidth }}
            </span>

          </div>


        </div>








        <div class="slider-group">


          <label>

            {{ locales[config.currentLang].height }}:
            {{ config.height }} mm

          </label>



          <input
            type="range"
            :min="measureConfig.limits.minHeight"
            :max="measureConfig.limits.maxHeight"
            :step="measureConfig.limits.stepHeight"
            v-model.number="config.height"
          />



          <div class="slider-labels">


            <span>
              min {{ measureConfig.limits.minHeight }}
            </span>


            <span>
              max {{ measureConfig.limits.maxHeight }}
            </span>


          </div>


        </div>



      </div>








      <!-- DISPONIBILITA -->

      <div
        v-if="availabilityInfo"
        class="availability"
        :class="availabilityInfo.type"
      >

        <strong>
          {{ availabilityInfo.title }}
        </strong>


        <p>
          {{ availabilityInfo.description }}
        </p>


      </div>







      <button
        class="next"
        :disabled="!config.width || !config.height"
        @click="goNext"
      >

        {{ locales[config.currentLang].continue }}

      </button>



    </div>


  </div>
</template>





<script setup>

import { computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import { locales } from '../locales'

import { generateMeasureOptions } from '../helpers/measureCatalog'

import { getAvailabilityInfo } from '../helpers/availabilityHelper'

import { resolveAvailability } from '../helpers/availabilityResolver'



const props = defineProps({

  config:Object,

  data:Object

})



const router = useRouter()





/**
 * Scelta nuovo flusso misura
 *
 * light:
 * IT + passaggio luce
 *
 * door:
 * DE + misura porta DIN
 */
function selectMeasureType(type){


  const newType =
    type === 'light'
      ? 'measureLuce'
      : 'measurePorta'



  const newStandard =
    type === 'light'
      ? 'IT'
      : 'DE'



  if(props.config.type !== newType){

    props.config.width=''
    props.config.height=''

  }



  props.config.standard = newStandard

  props.config.type = newType

  props.config.mode='fixed'


}









/**
 * Configurazione limiti custom
 */
const measureConfig = computed(()=>{


  if(!props.config.type){


    return {

      limits:{

        minWidth:0,

        maxWidth:0,

        minHeight:0,

        maxHeight:0,

        stepWidth:1,

        stepHeight:1

      }

    }


  }



  return props.data.measuresConfig[props.config.type]


})









/**
 * Catalogo misure standard
 */
const standardMeasures = computed(()=>{


  if(

    !props.config.standard ||

    !props.config.type

  ){

    return []

  }



  return generateMeasureOptions(

    props.config.standard,

    props.config.type

  )


})









/**
 * Larghezze disponibili
 */
const availableWidths = computed(()=>{


  return [

    ...new Set(

      standardMeasures.value.map(

        item=>item.width

      )

    )

  ]


})









/**
 * Altezze filtrate
 */
const availableHeights = computed(()=>{


  if(!props.config.width){

    return []

  }



  return [

    ...new Set(

      standardMeasures.value

        .filter(item=>

          item.width === props.config.width

        )

        .map(item=>

          item.height

        )

    )

  ]


})









/**
 * Disponibilità reale misura
 */
const currentAvailability = computed(()=>{


  if(

    !props.config.standard ||

    !props.config.width ||

    !props.config.height

  ){

    return null

  }



  return resolveAvailability({

    standard:props.config.standard,

    width:props.config.width,

    height:props.config.height

  })


})









/**
 * Disponibilità tradotta
 */
const availabilityInfo = computed(()=>{


  if(!currentAvailability.value){

    return null

  }



  return getAvailabilityInfo(

    currentAvailability.value.availability,

    props.config.currentLang,

    locales

  )


})









/**
 * Cambio larghezza misura standard
 */
function widthChanged(){


  const exists =
    standardMeasures.value.some(item=>

      item.width === props.config.width &&

      item.height === props.config.height

    )



  if(!exists){

    props.config.height=''

  }


}









/**
 * Cambio altezza misura standard
 */
function heightChanged(){


  const exists =
    standardMeasures.value.some(item=>

      item.width === props.config.width &&

      item.height === props.config.height

    )



  if(!exists){

    props.config.width=''

  }


}









/**
 * ----------------------------------------------------------------
 * VECCHIA SELEZIONE MANUALE TIPO MISURA
 *
 * Conservata per futuro utilizzo.
 *
 * Se si vuole ripristinare basta:
 *
 * 1) togliere il commento
 * 2) riattivare il blocco template choices
 *
 * ----------------------------------------------------------------
 */


/*

function selectType(type){


  props.config.type = type


  props.config.mode='fixed'


  props.config.width=''

  props.config.height=''


}

*/









/**
 * Vai al riepilogo
 */
function goNext(){


  if(

    props.config.type &&

    props.config.width &&

    props.config.height

  ){


    props.config.currentStep='/summary'



    nextTick(()=>{


      router.push('/summary')


    })


  }


}


</script>

<style scoped>

.step-card{

  background:v-bind('data.colors.cardBg');

  padding:30px;

  border-radius:12px;

  box-shadow:v-bind('data.colors.cardShadow');

}



h2{

  margin-bottom:1rem;

  text-align:center;

}






/*
========================================
SCELTA TIPO MISURA NUOVO FLUSSO
========================================
*/


.measure-choice{

  display:flex;

  flex-direction:row;

  justify-content:center;

  align-items:stretch;

  gap:20px;

  flex-wrap:wrap;

}



.measure-option{

  width:240px;

  min-height:120px;

  padding:20px;

  border-radius:12px;

  border:2px solid v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonBg');

  cursor:pointer;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  gap:8px;

  transition:all .25s ease;

}



.measure-option strong{

  font-size:1.1rem;

}



.measure-option small{

  font-size:.85rem;

  opacity:.8;

}



.measure-option:hover{

  transform:translateY(-3px);

  box-shadow:0 6px 15px rgba(0,0,0,.12);

}









/*
========================================
VECCHIA SCELTA MANUALE
(preparata per futuro)
========================================
*/


.choices{

  display:flex;

  gap:15px;

  justify-content:center;

  flex-wrap:wrap;

}



.choices button{

  padding:10px 20px;

  border-radius:8px;

  border:2px solid v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonBg');

  cursor:pointer;

}



.choices button.active{

  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

}









/*
========================================
INSERIMENTO MISURE
========================================
*/


.measure-inputs{

  margin-top:2rem;

  display:flex;

  flex-direction:column;

  align-items:center;

  gap:1.5rem;

}






.mode{

  display:flex;

  gap:2rem;

}






.fixed,
.custom{

  display:flex;

  flex-direction:column;

  gap:1.5rem;

  width:100%;

  max-width:500px;

}






select,
input[type="range"]{

  padding:.8rem;

  border-radius:6px;

  border:1px solid #d1d5db;

  width:100%;

}






.slider-group{

  display:flex;

  flex-direction:column;

}






.slider-labels{

  display:flex;

  justify-content:space-between;

  font-size:.85rem;

}









/*
========================================
DISPONIBILITA
========================================
*/


.availability{

  width:100%;

  max-width:500px;

  padding:14px;

  border-radius:10px;

  text-align:center;

  border:1px solid;

}



.availability strong{

  display:block;

  margin-bottom:5px;

}



.availability p{

  margin:0;

}



.availability.success{

  background:#ecfdf5;

  color:#166534;

  border-color:#22c55e;

}



.availability.warning{

  background:#fff7ed;

  color:#9a3412;

  border-color:#f97316;

}



.availability.error{

  background:#fef2f2;

  color:#991b1b;

  border-color:#ef4444;

}









/*
========================================
PULSANTE CONTINUA
========================================
*/


.next{

  margin-top:2rem;

  padding:12px 25px;

  border:none;

  border-radius:8px;

  cursor:pointer;

  background:v-bind('data.colors.buttonActive');

  color:white;

}



.next:disabled{

  background:#9ca3af;

  cursor:not-allowed;

}









/*
========================================
INFO TIPO MISURA ATTIVO
========================================
*/


.measure-type-info{

  margin:1.5rem auto;

  max-width:500px;

  padding:12px 18px;

  border-radius:8px;

  background:#f3f4f6;

  color:#374151;

  text-align:center;

  font-weight:500;

}


.measure-option.active{

  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

  transform:translateY(-3px);

}


</style>