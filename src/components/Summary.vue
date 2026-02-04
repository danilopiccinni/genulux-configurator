<template>
  <div class="summary">
    <h2>Riepilogo configurazione</h2>

    <div class="image-container">
        <img :src="data.images.summaryHeader" alt="Disegno tecnico" />
    </div>

    <div class="card">
      <p><b>Porta:</b> {{ config.door }} mm</p>
      <p><b>Muro:</b> {{ config.wall }} cm</p>
      <p><b>Tipo misura:</b> {{ config.type }}</p>
      <p><b>Dimensioni:</b> {{ config.width }} × {{ config.height }} mm</p>
    </div>

    <div class="actions">
      <button @click="printRef.download()">Download PDF</button>
    </div>

    <SummaryPrint ref="printRef" v-bind="config" :data="data" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SummaryPrint from './SummaryPrint.vue'

const props = defineProps({
  config: Object,
  data: Object
})

const config = props.config
const data = props.data

const printRef = ref(null)
</script>

<style scoped>
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
