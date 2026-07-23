<template>

  <div class="summary-page">


    <div class="summary-card">


      <!-- ========================================
           DOCUMENT HEADER
      ========================================= -->

      <section class="document-header">


        <h2>

          {{ locales[currentLang].documentSubtitle }}

        </h2>


        <div class="image-container">


          <img

            :src="data.images.summaryHeader"

            alt="Disegno tecnico"

          />


        </div>


      </section>








      <!-- ========================================
           TECHNICAL MEASURES
      ========================================= -->


      <section class="technical-section">


        <div class="section-title">

          {{ locales[currentLang].technicalMeasuresTitle }}

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


                <td>

                  {{ measures?.muro?.width }}

                </td>



                <td>

                  {{ measures?.telaio?.width }}

                </td>



                <td>

                  {{ measures?.luce?.width }}

                </td>



                <td>


                  {{
                    measures?.telaio?.width &&
                    measures?.luce?.width
                      ? (measures.telaio.width - measures.luce.width) - 41.5
                      : ''
                  }}


                </td>



                <td>

                  {{ measures?.luce?.height }}

                </td>



                <td>

                  {{ measures?.porta?.height }}

                </td>



                <td>

                  {{ measures?.telaio?.height }}

                </td>



                <td>

                  {{ measures?.muro?.height }}

                </td>



                <td>

                  {{ measures?.porta?.width }}

                </td>


              </tr>


            </tbody>


          </table>


        </div>


      </section>









      <!-- ========================================
           CONFIGURATION DATA
      ========================================= -->


      <section class="configuration-section">


        <div class="section-title">


          {{ locales[currentLang].configuration }}


        </div>





        <div class="summary-info">



          <!-- STANDARD -->


          <div class="summary-row">


            <div class="summary-label">


              {{ locales[currentLang].configurationStandard }}


            </div>


            <div class="summary-value">


              {{ config.standard }}

              -

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


      </section>









      <!-- ========================================
           AVAILABILITY
      ========================================= -->


      <section

        v-if="availabilityInfo"

        class="availability-section"


      >


        <p

          :class="'availability-' + availabilityInfo.type"

        >


          <b>

            {{ locales[currentLang].availability }}

          </b>


          <br>


          {{ availabilityInfo.title }}


          <br>


          {{ availabilityInfo.description }}



        </p>



      </section>









      <!-- ========================================
           INSTALLATION NOTES
      ========================================= -->


      <section

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



      </section>









      <!-- ========================================
           ACTIONS
      ========================================= -->


      <section class="actions">


        <button

          @click="printRef.download()"

        >


          {{ locales[currentLang].downloadPdf }}


        </button>



      </section>








      <!-- ========================================
           PRINT COMPONENT
      ========================================= -->


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

import { generateWallOpeningOptions } from '../helpers/measureCatalog'





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


  if(!measures.value){

    return null

  }




  let availability




  /**
   * Apertura muro
   *
   * Usa il catalogo unificato IT + DE
   */
  if(config.type === 'measureMuro'){


    const wallCatalog =
      generateWallOpeningOptions()



    const selected =
      wallCatalog.find(item =>


        item.width === measures.value.muro.width &&


        item.height === measures.value.muro.height


      )




    availability =
      selected?.availability || 'production'


  }







  /**
   * Passaggio luce / Porta
   *
   * Usano resolver standard
   */
  else {


    let width

    let height



    if(config.type === 'measureLuce'){


      width =
        measures.value.luce.width


      height =
        measures.value.luce.height


    }




    if(config.type === 'measurePorta'){


      width =
        measures.value.porta.width


      height =
        measures.value.porta.height


    }




    const result =
      resolveAvailability({


        standard:config.standard,


        width,


        height


      })



    availability =
      result.availability


  }





  return getAvailabilityInfo(


    availability,


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


/*
================================================
SUMMARY PAGE
================================================
*/


.summary-page{


  width:100%;


  display:flex;


  justify-content:center;


  padding-bottom:40px;



}




.summary-card{


  width:min(900px,95%);



  background:

    v-bind('data.colors.cardBg');



  border-radius:18px;



  padding:35px;



  box-shadow:

    v-bind('data.colors.cardShadow');



}








/*
================================================
DOCUMENT HEADER
================================================
*/


.document-header{


  text-align:center;


}



.document-header h2{


  margin:0 0 30px;


  color:

    v-bind('data.colors.primary');



  font-size:1.7rem;



  font-weight:700;



}






.image-container{


  width:100%;


  display:flex;


  justify-content:center;


  margin-bottom:35px;



}



.image-container img{


  max-width:100%;


  height:auto;


  object-fit:contain;



}








/*
================================================
SECTION TITLES
================================================
*/


.section-title{


  margin-bottom:18px;



  font-size:1.1rem;



  font-weight:700;



  color:

    v-bind('data.colors.primary');



  border-left:

    4px solid

    v-bind('data.colors.primary');



  padding-left:12px;



}









/*
================================================
TECHNICAL TABLE
================================================
*/


.technical-section{


  margin-bottom:40px;


}





.technical-measures-table{


  width:100%;


  overflow-x:auto;



  border-radius:14px;



}






.technical-measures-table table{


  width:100%;


  border-collapse:separate;


  border-spacing:0;



  min-width:750px;



  overflow:hidden;



  border-radius:14px;



  box-shadow:

    0 8px 25px rgba(0,0,0,.08);



}






.technical-measures-table th{


  background:

    v-bind('data.colors.primary');



  color:white;



  padding:13px 8px;



  font-size:.8rem;



  font-weight:700;



}






.technical-measures-table td{


  background:white;



  height:50px;



  text-align:center;



  padding:10px;



  font-size:.9rem;



  font-weight:600;



  color:

    v-bind('data.colors.text');



  border-bottom:

    1px solid #eeeeee;



}







.technical-measures-table tbody tr:last-child td{


  border-bottom:none;


}









/*
================================================
CONFIGURATION INFO
================================================
*/


.configuration-section{


  margin-bottom:40px;


}






.summary-info{


  background:white;



  border-radius:14px;



  overflow:hidden;



  border:

    1px solid #e5e7eb;



}






.summary-row{


  display:flex;



  justify-content:space-between;



  align-items:center;



  gap:30px;



  padding:15px 20px;



  border-bottom:

    1px solid #eeeeee;



}





.summary-row:last-child{


  border-bottom:none;


}






.summary-label{


  font-weight:700;



  color:

    v-bind('data.colors.text');



  text-align:left;



}






.summary-value{


  text-align:right;



  color:

    v-bind('data.colors.textSecondary');



  font-weight:600;



}









/*
================================================
AVAILABILITY
================================================
*/


.availability-section{


  margin-bottom:35px;



}




.availability-section p{


  margin:0;


  padding:20px;



  border-radius:14px;



  font-size:.95rem;



  line-height:1.5;



}







.availability-success{


  background:#ecfdf5;


  border:

    1px solid #86efac;


  color:#166534;



}






.availability-warning{


  background:#fffbeb;


  border:

    1px solid #fde68a;


  color:#92400e;



}






.availability-error{


  background:#fef2f2;


  border:

    1px solid #fecaca;


  color:#991b1b;



}









/*
================================================
INSTALLATION NOTES
================================================
*/


.installation-notes{


  display:flex;


  flex-direction:column;


  gap:15px;



  margin-bottom:35px;



}






.installation-note{


  padding:20px;



  background:#f8fafc;



  border:

    1px solid #e2e8f0;



  border-radius:14px;



}






.installation-note h3{


  margin:0 0 10px;



  color:

    v-bind('data.colors.primary');



  font-size:1rem;



}






.installation-note p{


  margin:0;



  line-height:1.5;



  color:

    v-bind('data.colors.textSecondary');



}









/*
================================================
ACTIONS
================================================
*/


.actions{


  display:flex;


  justify-content:center;


  margin-top:30px;



}





.actions button{


  padding:13px 28px;



  border:none;



  border-radius:

    v-bind('data.colors.radius');



  background:

    v-bind('data.colors.buttonActive');



  color:

    v-bind('data.colors.buttonActiveText');



  font-weight:700;



  cursor:pointer;



  transition:.25s ease;



}







.actions button:hover{


  background:

    v-bind('data.colors.secondary');



  transform:

    translateY(-2px);



}









/*
================================================
TABLET
================================================
*/


@media(max-width:900px){


  .summary-card{


    width:94%;


    padding:28px;



  }



}









/*
================================================
MOBILE
================================================
*/


@media(max-width:700px){



  .summary-page{


    padding-bottom:20px;



  }





  .summary-card{


    width:94%;


    padding:20px;



    border-radius:14px;



  }





  .document-header h2{


    font-size:1.35rem;



  }





  .summary-row{


    flex-direction:column;



    align-items:flex-start;



    gap:8px;



    padding:14px 16px;



  }





  .summary-value{


    text-align:left;



  }





  .technical-measures-table{


    margin-left:-5px;



    margin-right:-5px;



  }





  .actions button{


    width:100%;



  }




}









/*
================================================
VERY SMALL MOBILE
================================================
*/


@media(max-width:420px){


  .summary-card{


    padding:15px;



  }





  .document-header h2{


    font-size:1.2rem;



  }



}






</style>