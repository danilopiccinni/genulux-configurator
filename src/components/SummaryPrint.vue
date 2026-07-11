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





          <tr>

            <th>
              {{ locales[currentLang].doorDimensions }}
            </th>


            <td>

              {{ measures?.porta?.width }}
              ×
              {{ measures?.porta?.height }}
              mm

            </td>


          </tr>





          <tr>

            <th>
              {{ locales[currentLang].lightPassageDimensions }}
            </th>


            <td>

              {{ measures?.luce?.width }}
              ×
              {{ measures?.luce?.height }}
              mm

            </td>


          </tr>





          <tr>

            <th>
              {{ locales[currentLang].wallOpeningDimensions }}
            </th>


            <td>

              {{ measures?.muro?.width }}
              ×
              {{ measures?.muro?.height }}
              mm

            </td>


          </tr>





          <tr>

            <th>
              Telaio
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
              {{ locales[currentLang].doorThickness }}
            </th>

            <td>

              {{
                door === 'wood'
                  ? locales[currentLang].woodDoor
                  : locales[currentLang].glassDoor
              }}

            </td>

          </tr>



        </tbody>

      </table>


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

  wallPanel: String,

  type:String,

  width:String,

  height:String,


  data:Object,


  measures:Object,


  availabilityInfo:Object,


  currentLang:String

})



const pdfContent = ref(null)





async function download(){


  const canvas = await html2canvas(

    pdfContent.value,

    {
      scale:2
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
    (canvas.height * pdfWidth)
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



  pdf.save("Genulux.pdf")


}



defineExpose({

  download

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


</style>