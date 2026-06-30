<template>
  <div class="step-card">

    <h2>
      {{ locales[config.currentLang].measureType }}
    </h2>


    <!-- SCELTA TIPO MISURA -->
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



    <!-- INSERIMENTO MISURE -->
    <div v-if="config.type" class="measure-inputs">


      <h3>
        {{ locales[config.currentLang].insertMeasures }}
      </h3>



      <!-- SCELTA MODALITÀ -->
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




      <!-- MISURE STANDARD -->
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





      <!-- MISURE LIBERE -->
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

import { computed, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'

import { locales } from '../locales'
import { generateMeasureOptions } from '../helpers/measureCatalog'



const props = defineProps({

  config:Object,
  data:Object

})



const router = useRouter()





/**
 * Preselezione automatica tipo misura
 * in base allo standard scelto
 */
watch(
  () => props.config.standard,

  (standard) => {


    if (!standard) {
      return
    }



    /**
     * Imposta il tipo solo se
     * l'utente non ha già scelto
     */
    if (!props.config.type) {


      if (standard === 'IT') {

        props.config.type = 'measureLuce'

      }



      if (standard === 'DE') {

        props.config.type = 'measurePorta'

      }



      props.config.mode = 'fixed'

      props.config.width = ''

      props.config.height = ''


    }


  },

  {
    immediate:true
  }

)








/**
 * Configurazione limiti custom
 */
const measureConfig = computed(() => {


  if (!props.config.type) {

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
 * Misure generate dallo standard
 */
const standardMeasures = computed(() => {


  if (
    !props.config.standard ||
    !props.config.type
  ) {

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
const availableWidths = computed(() => {


  return [

    ...new Set(

      standardMeasures.value.map(
        item => item.width
      )

    )

  ]


})









/**
 * Altezze disponibili
 * filtrate dalla larghezza scelta
 */
const availableHeights = computed(() => {


  if (!props.config.width) {

    return []

  }



  return [

    ...new Set(

      standardMeasures.value

        .filter(item =>
          item.width === props.config.width
        )

        .map(item =>
          item.height
        )

    )

  ]


})









function widthChanged() {


  const exists = standardMeasures.value.some(item =>

    item.width === props.config.width &&
    item.height === props.config.height

  )



  if (!exists) {

    props.config.height = ''

  }

}









function heightChanged() {


  const exists = standardMeasures.value.some(item =>

    item.width === props.config.width &&
    item.height === props.config.height

  )



  if (!exists) {

    props.config.width = ''

  }


}









function selectType(type) {


  props.config.type = type

  props.config.mode = 'fixed'

  props.config.width = ''

  props.config.height = ''

}









function goNext() {


  if (
    props.config.type &&
    props.config.width &&
    props.config.height
  ) {

    props.config.currentStep='/summary'


    nextTick(()=>{

      router.push('/summary')

    })


  }


}


</script>



<style scoped>

.step-card {

  background:v-bind('data.colors.cardBg');

  padding:30px;

  border-radius:12px;

  box-shadow:v-bind('data.colors.cardShadow');

  transition:transform 0.3s;

}


h2 {

  margin-bottom:1rem;

  text-align:center;

}


.choices {

  display:flex;

  gap:15px;

  justify-content:center;

  flex-wrap:wrap;

  margin-bottom:20px;

}


.choices button {

  padding:10px 20px;

  border-radius:8px;

  border:2px solid v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonBg');

  font-weight:600;

  cursor:pointer;

}


.choices button.active {

  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

}


.measure-inputs {

  margin-top:2rem;

  display:flex;

  flex-direction:column;

  align-items:center;

  gap:1.5rem;

}


.mode {

  display:flex;

  gap:2rem;

}


.fixed,
.custom {

  display:flex;

  flex-direction:column;

  gap:1.5rem;

  width:100%;

  max-width:500px;

}


select,
input[type="range"] {

  padding:0.8rem;

  border-radius:6px;

  border:1px solid #d1d5db;

  width:100%;

}


.slider-group {

  display:flex;

  flex-direction:column;

}


.slider-labels {

  display:flex;

  justify-content:space-between;

  font-size:.85rem;

}


.next {

  margin-top:2rem;

  padding:12px 25px;

  font-weight:bold;

  border-radius:8px;

  cursor:pointer;

  border:none;

  color:white;

  background:v-bind('data.colors.buttonActive');

}


.next:disabled {

  background:#9ca3af;

  cursor:not-allowed;

}

</style>