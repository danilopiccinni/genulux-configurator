<template>
  <div class="summary">

    <h2>
      {{ locales[currentLang].documentSubtitle }}
    </h2>


    <div class="image-container">

      <img
        :src="data.images.summaryHeader"
        alt="Disegno tecnico"
      />

    </div>



    <div class="card">


      <p>

        <b>
          {{ locales[currentLang].configurationStandard }}:
        </b>

        {{ config.standard }} -

        {{
          config.standard === 'IT'
            ? locales[currentLang].international
            : locales[currentLang].germany
        }}

      </p>




      <p>

        <b>
          {{ locales[currentLang].doorDimensions }}:
        </b>

        {{ measures?.porta?.width }}
        ×
        {{ measures?.porta?.height }}
        mm

      </p>




      <p>

        <b>
          {{ locales[currentLang].lightPassageDimensions }}:
        </b>

        {{ measures?.luce?.width }}
        ×
        {{ measures?.luce?.height }}
        mm

      </p>




      <p>

        <b>
          {{ locales[currentLang].wallOpeningDimensions }}:
        </b>

        {{ measures?.muro?.width }}
        ×
        {{ measures?.muro?.height }}
        mm

      </p>




      <p>

        Telaio:

        {{ measures?.telaio?.width }}
        ×
        {{ measures?.telaio?.height }}
        mm

      </p>

      <p>

        <b>
          {{ locales[currentLang].wallType }}:
        </b>

        {{ locales[currentLang][config.wallType] }}

      </p>



      <p
        v-if="config.wallType === 'trockenbau'"
      >

        <b>
          {{ locales[currentLang].wallPanel }}:
        </b>

        {{ locales[currentLang][config.wallPanel] }}

      </p>



      <p>

        <b>
          {{ locales[currentLang].wallThickness }}:
        </b>

        {{ config.wall }} cm

      </p>




      <p>

        <b>
          {{ locales[currentLang].doorThickness }}:
        </b>

        {{
          config.door === 'wood'
            ? locales[currentLang].woodDoor
            : locales[currentLang].glassDoor
        }}

      </p>





      <!-- DISPONIBILITA -->

      <p
        v-if="availabilityInfo"
        :class="'availability-' + availabilityInfo.type"
      >

        <b>
          {{ locales[currentLang].availability }}:
        </b>

        <br>

        {{ availabilityInfo.title }}

        <br>

        {{ availabilityInfo.description }}

      </p>



    </div>





    <div class="actions">

      <button @click="printRef.download()">

        {{ locales[currentLang].downloadPdf }}

      </button>

    </div>




    <SummaryPrint

      ref="printRef"

      v-bind="config"

      :data="data"

      :measures="measures"

      :availabilityInfo="availabilityInfo"

      :currentLang="currentLang"

    />



  </div>
</template>




<script setup>

import { ref, computed } from 'vue'


import SummaryPrint from './SummaryPrint.vue'


import { calculateMeasures } from '../helpers/measureCalculator.js'

import { resolveAvailability } from '../helpers/availabilityResolver.js'

import { getAvailabilityInfo } from '../helpers/availabilityHelper.js'

import { locales } from '../locales.js'





const props = defineProps({

  config: Object,

  data: Object

})





const config = props.config

const data = props.data





const printRef = ref(null)





/**
 * Lingua corrente configuratore
 */
const currentLang = computed(() => {


  return config.currentLang || 'it'


})









/**
 * Calcolo misure derivate
 *
 * Usa esclusivamente:
 * measureCalculator.js
 */
const measures = computed(() => {



  if (

    !config.standard ||

    !config.type ||

    !config.width ||

    !config.height

  ) {


    return null


  }






  return calculateMeasures({


    standard: config.standard,


    inputType: config.type,


    width: config.width,


    height: config.height


  })



})









/**
 * Stato disponibilità misura
 *
 * Risolve:
 *
 * catalogo -> availabilityResolver
 *
 * stato -> availabilityHelper
 *
 */
const availabilityInfo = computed(() => {



  if (

    !config.standard ||

    !config.width ||

    !config.height

  ) {


    return null


  }






  const result = resolveAvailability({


    standard: config.standard,


    width: config.width,


    height: config.height



  })






  return getAvailabilityInfo(


    result.availability,


    currentLang.value,


    locales



  )



})



</script>





<style scoped>

.image-container {

  width: 100%;

  max-width: 100%;

  margin: 0 auto 2rem;

  display:flex;

  justify-content:center;

}



.image-container img {

  max-width:100%;

  height:auto;

  object-fit:contain;

}





.summary {

  max-width:800px;

  margin:auto;

  text-align:center;

  transition:all .3s;

}





h2 {

  margin-bottom:2rem;

  color:v-bind('data.colors.primary');

}





.card {

  background:v-bind('data.colors.cardBg');

  padding:25px;

  border-radius:12px;

  box-shadow:v-bind('data.colors.cardShadow');

  margin-bottom:2rem;

}





.card p {

  font-size:1rem;

  margin:.5rem 0;

}





.availability-success {

  color:#16a34a;

  font-weight:bold;

}



.availability-warning {

  color:#d97706;

  font-weight:bold;

}



.availability-error {

  color:#dc2626;

  font-weight:bold;

}





.actions {

  display:flex;

  gap:15px;

  justify-content:center;

  flex-wrap:wrap;

}





.actions button {

  padding:12px 25px;

  border-radius:8px;

  border:none;

  font-weight:600;

  cursor:pointer;

  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

}





.actions button:hover {

  background:v-bind('data.colors.secondary');

}



</style>