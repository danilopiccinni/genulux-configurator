<template>
  <div class="step-card">
    <h2>Tipo di misura</h2>

    <!-- SCELTA TIPO MISURA -->
    <div class="choices">
      <button
        v-for="type in data.measureTypes"
        :key="type.value"
        :class="{ active: config.type === type.value }"
        @click="selectType(type.value)"
      >
        {{ type.label }}
      </button>
    </div>

    <!-- INSERIMENTO MISURE -->
    <div v-if="config.type" class="measure-inputs">
      <h3>Inserisci le misure</h3>

      <!-- SCELTA MODALITÀ -->
      <div class="mode">
        <label>
          <input type="radio" value="fixed" v-model="config.mode" /> Misure standard
        </label>
        <label>
          <input type="radio" value="custom" v-model="config.mode" /> Misure libere
        </label>
      </div>

      <!-- MISURE STANDARD -->
      <div v-if="config.mode === 'fixed'" class="fixed">
        <select v-model.number="config.width">
          <option disabled value="">Larghezza</option>
          <option
            v-for="w in measureConfig.fixed.widths"
            :key="w"
            :value="w"
          >
            {{ w }} mm
          </option>
        </select>

        <select v-model.number="config.height">
          <option disabled value="">Altezza</option>
          <option
            v-for="h in measureConfig.fixed.heights"
            :key="h"
            :value="h"
          >
            {{ h }} mm
          </option>
        </select>
      </div>

      <!-- MISURE LIBERE CON SLIDER -->
      <div v-else class="custom">
        <div class="slider-group">
          <label>Larghezza: {{ config.width }} mm</label>
          <input
          type="range"
          :min="measureConfig.limits.minWidth"
          :max="measureConfig.limits.maxWidth"
          :step="measureConfig.limits.stepWidth"
          v-model.number="config.width"
          />
          <div class="slider-labels">
            <span>min {{ measureConfig.limits.minWidth }}</span>
            <span>max {{ measureConfig.limits.maxWidth }}</span>
          </div>
        </div>

        <div class="slider-group">
          <label>Altezza: {{ config.height }} mm</label>
          <input
          type="range"
          :min="measureConfig.limits.minHeight"
            :max="measureConfig.limits.maxHeight"
            :step="measureConfig.limits.stepHeight"
            v-model.number="config.height"
            />
          </div>
          <div class="slider-labels">
            <span>min {{ measureConfig.limits.minHeight }}</span>
            <span>max {{ measureConfig.limits.maxHeight }}</span>
          </div>
      </div>

      <button
        class="next"
        :disabled="!config.width || !config.height"
        @click="goNext"
      >
        Continua
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ config: Object, data: Object })
const router = useRouter()

// Config misure per il tipo selezionato
const measureConfig = computed(() => {
  if (!props.config.type)
    return { fixed: { widths: [], heights: [] }, limits: { minWidth:0, maxWidth:0, minHeight:0, maxHeight:0, stepWidth:1, stepHeight:1 } }
  return props.data.measuresConfig[props.config.type]
})

function selectType(type) {
  props.config.type = type
  props.config.mode = 'fixed'
  props.config.width = ''
  props.config.height = ''
}

function goNext() {
  if (props.config.type && props.config.width && props.config.height) {
    router.push('/summary')
  }
}
</script>

<style scoped>
.step-card {
  background: v-bind('data.colors.cardBg');
  padding: 30px;
  border-radius: 12px;
  box-shadow: v-bind('data.colors.cardShadow');
  transition: transform 0.3s;
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
}

.choices {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.choices button {
  padding: 10px 20px;
  border-radius: 8px;
  border: 2px solid v-bind('data.colors.primary');
  background: v-bind('data.colors.buttonBg');
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.choices button.active {
  background: v-bind('data.colors.buttonActive');
  color: v-bind('data.colors.buttonActiveText');
  border-color: v-bind('data.colors.buttonActive');
}

.choices button:hover {
  background: v-bind('data.colors.buttonHover');
}

.measure-inputs {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.mode {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.fixed, .custom {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
}

input[type="number"], select, input[type="range"] {
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  width: 100%;
}

.slider-group {
  display: flex;
  flex-direction: column;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.next {
  margin-top: 2rem;
  padding: 12px 25px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  color: white;
  background: v-bind('data.colors.buttonActive');
  transition: background 0.3s;
}

.next:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}
</style>
