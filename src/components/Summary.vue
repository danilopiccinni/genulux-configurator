<template>
  <div class="summary">
    <h2>{{ locales[currentLang].documentSubtitle }}</h2>

    <div class="image-container">
      <img :src="data.images.summaryHeader" alt="Disegno tecnico" />
    </div>

    <div class="card">
      <p><b>{{ locales[currentLang].doorDimensions }}:</b> {{ measures.widthPorta }} × {{ measures.heightPorta }} mm</p>
      <p><b>{{ locales[currentLang].lightPassageDimensions }}:</b> {{ measures.widthLuce }} × {{ measures.heightLuce }} mm</p>
      <p><b>{{ locales[currentLang].wallOpeningDimensions }}:</b> {{ measures.widthMuro }} × {{ measures.heightMuro }} mm</p>
      <p><b>{{ locales[currentLang].wallThickness }}:</b> {{ config.wall }} cm</p>
      <p><b>{{ locales[currentLang].doorThickness }}:</b> {{ config.door }} mm</p>
    </div>

    <div class="actions">
      <button @click="printRef.download()">{{ locales[currentLang].downloadPdf }}</button>
    </div>

    <SummaryPrint
      ref="printRef"
      v-bind="config"
      :data="data"
      :measures="measures"
      :currentLang="currentLang"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SummaryPrint from './SummaryPrint.vue'
import { calculateDerivedMeasures } from '../helpers/measureHelpers.js'
import { locales } from '../locales.js'

const props = defineProps({
  config: Object,
  data: Object
})

const config = props.config
const data = props.data
const printRef = ref(null)

const currentLang = computed(() => config.currentLang)

// Misure calcolate in base al tipo e alle dimensioni inserite
const measures = computed(() => {
  if (!config.type || !config.width || !config.height) return {
    widthPorta: 0, heightPorta: 0,
    widthLuce: 0, heightLuce: 0,
    widthMuro: 0, heightMuro: 0
  }
  return calculateDerivedMeasures(config.type, config.width, config.height)
})
</script>



<style scoped>

.image-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}


.summary {
  max-width: 800px;
  margin: auto;
  text-align: center;
  transition: all 0.3s;
}

h2 {
  margin-bottom: 2rem;
  color: v-bind('data.colors.primary');
}

.card {
  background: v-bind('data.colors.cardBg');
  padding: 25px;
  border-radius: 12px;
  box-shadow: v-bind('data.colors.cardShadow');
  margin-bottom: 2rem;
  transition: transform 0.3s;
}

.card p {
  font-size: 1rem;
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.actions button {
  padding: 12px 25px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: v-bind('data.colors.buttonActive');
  color: v-bind('data.colors.buttonActiveText');
  transition: all 0.3s;
}

.actions button:hover {
  background: v-bind('data.colors.secondary');
}
</style>
