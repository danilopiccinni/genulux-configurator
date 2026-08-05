<template>

  <div ref="pdfContent" class="print-wrapper">

    <!-- ====================================================== -->
    <!-- PAGE 1 -->
    <!-- ====================================================== -->

    <section class="pdf-page">

      <!-- HEADER -->

      <header class="page-header">


        <div class="document-title">


          <h1>
            Genulux
          </h1>


          <p>
            {{ locales[currentLang].documentHeader }}
          </p>


        </div>





        <div class="company-logo">

          
          <img

            src="../assets/images/logo_ags.svg"

            alt="Company Logo"

          />


        </div>


      </header>






      <!-- TECHNICAL DRAWING -->

      <section class="drawing-section">

        <img
          :src="data.images.summaryHeader"
          alt="Technical drawing"
        />

      </section>





      <!-- TECHNICAL TABLE -->

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





      <!-- FOOTER PAGE 1 -->

      <footer class="page-footer">

        <span>

          Genulux

        </span>

        <span>

          {{ locales[currentLang].documentHeader }}

        </span>

        <span>

          1 / 2

        </span>

      </footer>

    </section>


        <!-- ====================================================== -->
    <!-- PAGE 2 -->
    <!-- ====================================================== -->

    <section class="pdf-page">

      <!-- HEADER -->

      <header class="page-header">


        <div class="document-title">


          <h1>
            Genulux
          </h1>


          <p>
            {{ locales[currentLang].documentHeader }}
          </p>


        </div>





        <div class="company-logo">

          
          <img

            src="../assets/images/logo_ags.svg"

            alt="Company Logo"

          />


        </div>


      </header>





      <!-- CONFIGURATION -->

      <section class="configuration-section">

        <div class="section-title">

          {{ locales[currentLang].configuration }}

        </div>

        <table class="configuration-table">

          <tbody>

            <tr>

              <th>

                {{ locales[currentLang].configurationStandard }}

              </th>

              <td>

                {{ standard }}

                -

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

                {{ item.value.width }}

                ×

                {{ item.value.height }}

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





            <tr

              v-if="availabilityInfo"

            >

              <th>

                {{ locales[currentLang].availability }}

              </th>

              <td>

                {{ availabilityInfo.title }}

              </td>

            </tr>

          </tbody>

        </table>

      </section>





      <!-- INSTALLATION NOTES -->

      <section

        v-if="installationNotes.length"

        class="installation-section"

      >

        <div class="section-title">

          {{ locales[currentLang].installationInformation }}

        </div>



        <div

          v-for="note in installationNotes"

          :key="note.titleKey"

          class="installation-note"

        >

          <h3>

            {{ locales[currentLang][note.titleKey] }}

          </h3>

          <p>

            {{ locales[currentLang][note.textKey] }}

          </p>

        </div>

      </section>





      <!-- FOOTER PAGE 2 -->

      <footer class="page-footer">

        <span>

          Genulux

        </span>

        <span>

          {{ locales[currentLang].documentHeader }}

        </span>

        <span>

          2 / 2

        </span>

      </footer>

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
 * CREA PDF
 * ============================================================
 */

async function generatePdf(){

  const pdf = new jsPDF(

    'p',

    'mm',

    'a4'

  )



  const pages =

    pdfContent.value.querySelectorAll('.pdf-page')



  for(

    let i = 0;

    i < pages.length;

    i++

  ){



    const canvas = await html2canvas(

      pages[i],

      {

        scale:2,

        useCORS:true,

        backgroundColor:'#ffffff'

      }

    )



    const imgData =

      canvas.toDataURL(

        'image/png'

      )



    const pdfWidth =

      210



    const pdfHeight =

      297



    const imgWidth =

      pdfWidth



    const imgHeight =

      (

        canvas.height *

        imgWidth

      )

      /

      canvas.width



    if(i>0){

      pdf.addPage()

    }



    pdf.addImage(

      imgData,

      'PNG',

      0,

      0,

      imgWidth,

      imgHeight

    )



  }



  return pdf

}





/**
 * ============================================================
 * BLOB
 * ============================================================
 */

async function getPdfBlob(){

  const pdf =

    await generatePdf()



  return pdf.output(

    'blob'

  )

}





/**
 * ============================================================
 * DOWNLOAD
 * ============================================================
 */

async function download(){

  const pdf =

    await generatePdf()



  pdf.save(

    'Genulux.pdf'

  )

}





defineExpose({

  download,

  generatePdf,

  getPdfBlob

})

</script>




<style scoped>

/*
================================================
PDF DOCUMENT
================================================
*/


.print-wrapper {

  position:fixed;

  top:-10000px;

  left:-10000px;


  width:210mm;


  font-family:'Inter',sans-serif;

  color:

    v-bind('data.colors.text');

}





/*
================================================
SINGLE PAGE
================================================
*/


.pdf-page {


  width:210mm;

  height:297mm;


  padding:18mm;


  box-sizing:border-box;


  background:white;


  position:relative;


  display:flex;

  flex-direction:column;


  overflow:hidden;


}








/*
================================================
HEADER
================================================
*/


.page-header {


  display:flex;


  justify-content:space-between;


  align-items:center;


  padding-bottom:15px;


  margin-bottom:20px;


  border-bottom:

    2px solid

    v-bind('data.colors.primary');


}





.document-title {


  display:flex;


  flex-direction:column;


}





.document-title h1 {


  margin:0;


  font-size:22px;


  letter-spacing:1px;


  font-weight:700;


  color:

    v-bind('data.colors.primary');


}





.document-title p {


  margin:5px 0 0;


  font-size:12px;


  color:

    v-bind('data.colors.textSecondary');


}







.company-logo {


  display:flex;


  justify-content:flex-end;


  align-items:center;


}





.company-logo img {


  max-width:55mm;


  max-height:25mm;


  object-fit:contain;


}








/*
================================================
FOOTER
================================================
*/


.page-footer {


  position:absolute;


  bottom:12mm;


  left:18mm;


  right:18mm;


  display:flex;


  justify-content:space-between;


  align-items:center;


  padding-top:10px;


  border-top:

    1px solid

    #dddddd;


  font-size:10px;


  color:

    v-bind('data.colors.textSecondary');


}









/*
================================================
IMAGE HEADER
================================================
*/


.image-container {


  width:100%;


  display:flex;


  justify-content:center;


  margin-bottom:25px;


}



.image-container img {


  max-width:100%;


  max-height:90mm;


  object-fit:contain;


}









/*
================================================
SECTION TITLE
================================================
*/


.section-title {


  margin-bottom:12px;


  padding-left:10px;


  border-left:

    4px solid

    v-bind('data.colors.primary');


  font-size:15px;


  font-weight:700;


  color:

    v-bind('data.colors.primary');


}









/*
================================================
TECHNICAL TABLE
================================================
*/


.technical-measures-table {


  width:100%;


  margin-bottom:20px;


}



.technical-measures-table table {


  width:100%;


  border-collapse:collapse;


}



.technical-measures-table th {


  background:

    v-bind('data.colors.primary');


  color:white;


  padding:8px 4px;


  text-align:center;


  font-size:10px;


  font-weight:700;


}



.technical-measures-table td {


  height:35px;


  padding:8px 4px;


  text-align:center;


  font-size:10px;


  font-weight:600;


  border:

    1px solid #dddddd;


}









/*
================================================
CONFIGURATION TABLE
================================================
*/


.configuration-section {


  margin-top:5px;


}



.configuration-table {


  width:100%;


  border-collapse:collapse;


}



.configuration-table th {


  width:38%;


  background:

    #f7f7f7;


  text-align:left;


  padding:9px;


  font-size:11px;


  font-weight:700;


  border:

    1px solid #dddddd;


}



.configuration-table td {


  padding:9px;


  font-size:11px;


  font-weight:600;


  border:

    1px solid #dddddd;


}









/*
================================================
INSTALLATION NOTES
================================================
*/


.installation-section {


  margin-top:25px;


}



.installation-note {


  margin-bottom:15px;


  padding:14px;


  background:

    #fafafa;


  border:

    1px solid #e5e5e5;


  border-radius:8px;


}



.installation-note h3 {


  margin:0 0 8px;


  font-size:12px;


  color:

    v-bind('data.colors.primary');


}



.installation-note p {


  margin:0;


  font-size:11px;


  line-height:1.5;


  color:

    v-bind('data.colors.textSecondary');


}









/*
================================================
PDF FIRST PAGE CONTROL
================================================
*/


.pdf-page:first-child {


  justify-content:flex-start;


}



.pdf-page:first-child .page-footer {


  display:flex;


}









/*
================================================
PRINT SAFETY
================================================
*/


table {


  page-break-inside:avoid;


}



section {


  page-break-inside:avoid;


}




</style>