<template>
  <div class="step-card">
    <h2>Tipo di misura</h2>

    <!-- scelta tipo misura -->
    <div class="choices">
      <button
        v-for="type in data.measureTypes"
        :key="type.value"
        :class="{ active: measureType === type.value }"
        @click="selectType(type.value)"
      >
        {{ type.label }}
      </button>
    </div>

    <!-- inserimento misure -->
    <div v-if="measureType" class="measure-inputs">
      <h3>Inserisci le misure</h3>

      <!-- modalità -->
      <div class="mode">
        <label><input type="radio" value="fixed" v-model="mode" /> Misure standard</label>
        <label><input type="radio" value="custom" v-model="mode" /> Misure libere</label>
      </div>

      <!-- misure standard -->
      <div v-if="mode==='fixed'" class="fixed">
        <select v-model.number="width">
          <option disabled value="">Larghezza</option>
          <option v-for="w in data.fixedWidths" :key="w" :value="w">{{ w }} mm</option>
        </select>
        <select v-model.number="height">
          <option disabled value="">Altezza</option>
          <option v-for="h in data.fixedHeights" :key="h" :value="h">{{ h }} mm</option>
        </select>
      </div>

      <!-- misure libere -->
      <div v-else class="custom">
        <input type="number" v-model.number="width" placeholder="Larghezza (mm)" min="100" />
        <input type="number" v-model.number="height" placeholder="Altezza (mm)" min="100" />
      </div>

      <button class="next" :disabled="!width || !height" @click="goNext">Continua</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ config: Object, data: Object })
const router = useRouter()

const measureType = ref(props.config.type || '')
const mode = ref(props.config.mode || 'fixed')
const width = ref(props.config.width || '')
const height = ref(props.config.height || '')

function selectType(type) { measureType.value = type }

watch([measureType, mode, width, height], () => {
  props.config.type = measureType.value
  props.config.mode = mode.value
  props.config.width = width.value
  props.config.height = height.value
})

function goNext() {
  if(measureType.value && width.value && height.value) router.push('/summary')
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
  gap: 1rem;
}

.mode {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.fixed, .custom {
  display: flex;
  gap: 1rem;
}

input, select {
  padding: 0.8rem;
  width: 200px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
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
