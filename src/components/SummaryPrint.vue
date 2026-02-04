<template>
  <div ref="pdfContent" class="print-wrapper">
    <header>
      <h1><strong>Genulux</strong></h1>
      <h3>Scheda tecnica – Configurazione porta</h3>
    </header>

    <div class="image-container">
      <img :src="data.images.summaryHeader" alt="Disegno tecnico" />
    </div>

    <section class="data-section">
      <table>
        <tbody>
          <tr><th>Tipo misura inserita</th><td>{{ type }}</td></tr>
          <tr><th>Misura Porta</th><td>{{ measures.widthPorta }} × {{ measures.heightPorta }} mm</td></tr>
          <tr><th>Misura passaggio Luce</th><td>{{ measures.widthLuce }} × {{ measures.heightLuce }} mm</td></tr>
          <tr><th>Misura apertura Muro</th><td>{{ measures.widthMuro }} × {{ measures.heightMuro }} mm</td></tr>
          <tr><th>Spessore porta</th><td>{{ door }} mm</td></tr>
          <tr><th>Spessore muro</th><td>{{ wall }} cm</td></tr>
        </tbody>
      </table>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const props = defineProps({ door: String, wall: String, type: String, width: String, height: String, data: Object, measures: Object })
const pdfContent = ref(null)

async function download() {
  const canvas = await html2canvas(pdfContent.value, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pdfWidth = 210
  const pdfHeight = 297
  let imgWidth = pdfWidth
  let imgHeight = (canvas.height * pdfWidth) / canvas.width
  let position = 0
  while (position < imgHeight) {
    pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight)
    position += pdfHeight
    if (position < imgHeight) pdf.addPage()
  }
  pdf.save('scheda-tecnica-porta.pdf')
}

defineExpose({ download })
</script>


<style scoped>
.print-wrapper {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm;
  background: white;
  color: black;
  position: fixed;
  top: -9999px;
  left: -9999px;
  font-family: 'Inter', sans-serif;
}

header h1 {
  margin-bottom: 5px;
  font-size: 1.4rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #555;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #000;
  padding: 10px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

footer {
  margin-top: 40px;
  font-size: 0.8rem;
  color: #666;
}
</style>
