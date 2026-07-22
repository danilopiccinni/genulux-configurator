<template>
  <div class="summary">

    
    
    
    <div class="card">
      
      <h2>
        {{ locales[currentLang].documentSubtitle }}
      </h2>
  
  
      <div class="image-container">
  
        <img
          :src="data.images.summaryHeader"
          alt="Disegno tecnico"
        />
  
      </div>

      <div class="technical-measures-table">
        <table>
          <thead>
            <tr>
              <th>CL</th>
              <th>C</th>
              <th>A</th>
              <th>B</th>
              <th>H</th>
              <th>TH</th>
              <th>H1</th>
              <th>HL</th>
              <th>TB</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>


            </tr>
          </tbody>

        </table>
      </div>

      
      
<div class="summary-info">

  <!-- STANDARD -->

  <div class="summary-row">

    <div class="summary-label">

      {{ locales[currentLang].configurationStandard }}

    </div>

    <div class="summary-value">

      {{ config.standard }} -

      {{
        config.standard === 'IT'
          ? locales[currentLang].international
          : locales[currentLang].germany
      }}

    </div>

  </div>



  <!-- MISURE PRINCIPALI -->

  <div
    v-for="item in summaryMeasures"
    :key="item.key"
    class="summary-row"
  >

    <div class="summary-label">

      {{ locales[currentLang][item.labelKey] }}

    </div>

    <div class="summary-value">

      {{ item.value.width }}
      ×
      {{ item.value.height }}
      mm

    </div>

  </div>



  <!-- TELAIO -->

  <div class="summary-row">

    <div class="summary-label">

      {{ locales[currentLang].frame }}

    </div>

    <div class="summary-value">

      {{ measures?.telaio?.width }}
      ×
      {{ measures?.telaio?.height }}
      mm

    </div>

  </div>



  <!-- TIPO MURO -->

  <div class="summary-row">

    <div class="summary-label">

      {{ locales[currentLang].wallType }}

    </div>

    <div class="summary-value">

      {{ locales[currentLang][config.wallType] }}

    </div>

  </div>



  <!-- PANNELLATURA -->

  <div
    v-if="config.wallType === 'trockenbau'"
    class="summary-row"
  >

    <div class="summary-label">

      {{ locales[currentLang].wallPanel }}

    </div>

    <div class="summary-value">

      {{ locales[currentLang][config.wallPanel] }}

    </div>

  </div>



  <!-- SPESSORE MURO -->

  <div class="summary-row">

    <div class="summary-label">

      {{ locales[currentLang].wallThickness }}

    </div>

    <div class="summary-value">

      {{ config.wall }} cm

    </div>

  </div>



  <!-- PORTA -->

  <div class="summary-row">

    <div class="summary-label">

      {{ locales[currentLang].door }}

    </div>

    <div class="summary-value">

      {{
        config.door === 'wood'
          ? locales[currentLang].woodDoor
          : locales[currentLang].glassDoor
      }}

    </div>

  </div>


</div>





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


      <!--
      ================================================
      NOTE INSTALLAZIONE
      ================================================
      -->
      
      <div
        v-if="installationNotes.length"
        class="installation-notes"
      >
  
  
        <div
          v-for="note in installationNotes"
          :key="note.titleKey"
          class="installation-note"
        >
  
  
          <h3>
  
            ℹ️ {{ locales[config.currentLang][note.titleKey] }}
  
          </h3>
  
  
          <p>
  
            {{ locales[config.currentLang][note.textKey] }}
  
          </p>
  
  
        </div>

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
        
        :installationNotes="installationNotes"
        
        :summaryMeasures="summaryMeasures"
        
        />
        
        <QuoteRequest
  
          :printRef="printRef"
  
        />


    </div>








  </div>
</template>




<script setup>

import { ref, computed } from 'vue'


import SummaryPrint from './SummaryPrint.vue'


import { calculateMeasures } from '../helpers/measureCalculator.js'

import { resolveAvailability } from '../helpers/availabilityResolver.js'

import { getAvailabilityInfo } from '../helpers/availabilityHelper.js'

import { locales } from '../locales.js'

import { getInstallationNotes } from '../helpers/installationNotes'

import { getSummaryMeasures } from '../helpers/summaryMeasures'

import QuoteRequest from './QuoteRequest.vue'





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



/**
 * Note tecniche installazione
 *
 * Generate in base alla configurazione scelta.
 */
const installationNotes = computed(()=>{


  return getInstallationNotes(
    props.config
  )


})


const summaryMeasures = computed(()=>{


  if(!measures.value){

    return []

  }


  return getSummaryMeasures(

    config,

    measures.value

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

  margin-top: 35px;

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


.installation-notes{

  width:100%;

  margin-top:2rem;

}


.installation-note{

  padding:18px;

  border-radius:10px;

  background:#f3f4f6;

  border:1px solid #d1d5db;

}


.installation-note h3{

  margin-bottom:10px;

}


.installation-note p{

  margin:0;

}


/*
================================================
TECHNICAL MEASURES TABLE
================================================
*/


.technical-measures-table{

  width:100%;

  margin:35px 0;

  overflow-x:auto;

}





.technical-measures-table table{

  width:100%;

  border-collapse:separate;

  border-spacing:0;

  table-layout:fixed;

  border-radius:12px;

  overflow:hidden;

  box-shadow:
    0 8px 25px rgba(0,0,0,.08);

}





.technical-measures-table th{

  background:

    v-bind('data.colors.primary');


  color:white;

  padding:14px 6px;

  font-size:.85rem;

  font-weight:700;

  border-right:

    1px solid rgba(255,255,255,.2);

}





.technical-measures-table th:last-child{

  border-right:none;

}





.technical-measures-table td{

  height:55px;

  background:white;

  text-align:center;

  padding:12px 6px;

  font-size:.95rem;

  font-weight:600;

  color:

    v-bind('data.colors.text');


  border:

    1px solid #ececec;

}





.technical-measures-table tbody td:first-child{

  border-bottom-left-radius:12px;

}





.technical-measures-table tbody td:last-child{

  border-bottom-right-radius:12px;

}





@media(max-width:700px){


  .technical-measures-table{

    overflow-x:auto;

  }



  .technical-measures-table table{

    min-width:850px;

  }


}

/*
================================================
SUMMARY INFO
================================================
*/

.summary-info{

  margin:35px 0;

  border:1px solid #e5e7eb;

  border-radius:12px;

  overflow:hidden;

  background:#fff;

}



.summary-row{

  display:flex;

  justify-content:space-between;

  align-items:center;

  gap:30px;

  padding:16px 20px;

  border-bottom:1px solid #ececec;

}



.summary-row:last-child{

  border-bottom:none;

}



.summary-label{

  font-weight:700;

  color:v-bind('data.colors.text');

  text-align:left;

}



.summary-value{

  text-align:right;

  color:v-bind('data.colors.text');

}



@media(max-width:700px){

  .summary-row{

    flex-direction:column;

    align-items:flex-start;

    gap:8px;

  }

  .summary-value{

    text-align:left;

  }

}


</style>