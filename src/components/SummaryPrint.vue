<template>
  <div ref="pdfContent" class="print-wrapper">

    <header>
      <h1><strong>Genulux</strong></h1>
      <h3>
        {{ locales[currentLang].documentHeader }}
      </h3>
    </header>


    <div class="image-container">

      <img
        :src="data.images.summaryHeader"
        alt="Disegno tecnico"
      />

    </div>

    <!-- ================================================
     TECHNICAL MEASURES TABLE PDF
================================================ -->

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

        <td>{{ measures?.muro?.width }}</td>

        <td>{{ measures?.telaio?.width }}</td>

        <td>{{ measures?.luce?.width }}</td>

        <td>
          {{
            measures?.telaio?.width &&
            measures?.luce?.width
              ? (measures.telaio.width - measures.luce.width) - 41.5
              : ''
          }}
        </td>

        <td>{{ measures?.luce?.height }}</td>

        <td>{{ measures?.porta?.height }}</td>

        <td>{{ measures?.telaio?.height }}</td>
        
        <td>{{ measures?.muro?.height }}</td>

        <td>{{ measures?.porta?.width }}</td>
        
      </tr>


    </tbody>


  </table>


  </div>



    <section class="data-section">

      <table>

        <tbody>


          <tr>

            <th>
              {{ locales[currentLang].configurationStandard }}
            </th>


            <td>

              {{ standard }} -

              {{
                standard === 'IT'
                  ? locales[currentLang].international
                  : locales[currentLang].germany
              }}

            </td>

          </tr>



          <tr
            v-for="item in summaryMeasures"
            :key="item.key"
          >

            <th>
              {{ locales[currentLang][item.labelKey] }}
            </th>

            <td>

            {{ item.value?.width }}
            ×
            {{ item.value?.height }}
            mm

            </td>

          </tr>



          <tr>

            <th>
              {{ locales[currentLang].frame }}
            </th>


            <td>

              {{ measures?.telaio?.width }}
              ×
              {{ measures?.telaio?.height }}
              mm

            </td>


          </tr>


          <tr>

            <th>
              {{ locales[currentLang].wallType }}
            </th>


            <td>

              {{ locales[currentLang][wallType] }}

            </td>

          </tr>




          <tr
            v-if="wallType === 'trockenbau'"
          >

            <th>
              {{ locales[currentLang].wallPanel }}
            </th>


            <td>

              {{ locales[currentLang][wallPanel] }}

            </td>

          </tr>





          <tr>

            <th>
              {{ locales[currentLang].wallThickness }}
            </th>


            <td>

              {{ wall }} cm

            </td>

          </tr>




          <tr>

            <th>
              {{ locales[currentLang].door }}
            </th>

            <td>

              {{
                door === 'wood'
                  ? locales[currentLang].woodDoor
                  : locales[currentLang].glassDoor
              }}

            </td>

          </tr>


          <!-- DISPONIBILITA -->
          <tr v-if="availabilityInfo">

            <th>
              {{ locales[currentLang].availability }}
            </th>


            <td>

              {{ availabilityInfo.title }}

              -

              {{ availabilityInfo.description }}

            </td>


          </tr>



        </tbody>

      </table>


    </section>


    <section>
      <!--
      ================================================
      INSTALLATION NOTES
      ================================================
      -->

      <div
        v-if="installationNotes.length"
        class="print-section"
      >


        <h2>

          {{ locales[currentLang].installationInformation }}

        </h2>



        <div
          v-for="note in installationNotes"
          :key="note.titleKey"
        >


          <h3>

            {{ locales[currentLang][note.titleKey] }}

          </h3>



          <p>

            {{ locales[currentLang][note.textKey] }}

          </p>


        </div>


      </div>
    </section>


  </div>
</template>




<script setup>

import { ref } from 'vue'

import html2canvas from 'html2canvas'

import jsPDF from 'jspdf'

import { locales } from '../locales.js'



const props = defineProps({

  standard:String,

  door:String,

  wallType:String,

  wall:String,

  wallPanel:String,

  type:String,

  width:String,

  height:String,


  data:Object,

  measures:Object,

  availabilityInfo:Object,

  currentLang:String,

  installationNotes:Array,

  summaryMeasures:Array

})



const pdfContent = ref(null)






/**
 * ============================================================
 * GENERA PDF
 * ------------------------------------------------------------
 *
 * Crea il documento PDF e lo restituisce.
 *
 * Usato da:
 *
 * - download manuale
 * - richiesta preventivo email
 *
 * ============================================================
 */
async function generatePdf(){



  const canvas = await html2canvas(

    pdfContent.value,

    {
      scale:1
    }

  )




  const imgData =
    canvas.toDataURL('image/png')





  const pdf =
    new jsPDF(
      'p',
      'mm',
      'a4'
    )





  const pdfWidth = 210

  const pdfHeight = 297




  const imgWidth = pdfWidth



  const imgHeight =
    (
      canvas.height * pdfWidth
    )
    /
    canvas.width






  let position = 0




  while(position < imgHeight){



    pdf.addImage(

      imgData,

      'PNG',

      0,

      -position,

      imgWidth,

      imgHeight

    )




    position += pdfHeight




    if(position < imgHeight){

      pdf.addPage()

    }


  }




  return pdf


}

/**
 * ============================================================
 * GET PDF BLOB
 * ------------------------------------------------------------
 *
 * Restituisce il PDF come file temporaneo.
 *
 * Usato per:
 *
 * - allegato email
 * - invio preventivo
 *
 * ============================================================
 */
async function getPdfBlob(){


  const pdf =
    await generatePdf()



  return pdf.output('blob')


}








/**
 * ============================================================
 * DOWNLOAD PDF
 * ------------------------------------------------------------
 *
 * Scaricamento manuale utente
 *
 * ============================================================
 */
async function download(){



  const pdf =
    await generatePdf()



  pdf.save(
    "Genulux.pdf"
  )


}








defineExpose({

  download,

  generatePdf,

  getPdfBlob

})


</script>




<style scoped>

.print-wrapper {

  width:210mm;

  min-height:297mm;

  padding:20mm;

  background:white;

  color:black;

  position:fixed;

  top:-9999px;

  left:-9999px;

  font-family:'Inter',sans-serif;

}



header h1 {

  margin-bottom:5px;

  font-size:1.4rem;

}



table {

  width:100%;

  border-collapse:collapse;

  margin-top:20px;

}



th,
td {

  border:1px solid #000;

  padding:10px;

}



th {

  background:#f2f2f2;

  text-align:left;

}

/*
================================================
TECHNICAL MEASURES TABLE PDF
================================================
*/


.technical-measures-table{

  width:100%;

  margin:25px 0;

}





.technical-measures-table table{

  width:100%;

  border-collapse:collapse;

}





.technical-measures-table th{
  text-align: center;

  padding:8px 4px;

  font-size:10px;

  font-weight:bold;

  border:1px solid;

}





.technical-measures-table td{

  height:35px;

  text-align:center;

  border:1px solid #000;

  font-size:10px;

}







</style>