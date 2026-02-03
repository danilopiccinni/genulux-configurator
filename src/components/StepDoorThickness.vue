<template>
  <div class="step-card">
    <h2>Seleziona spessore porta</h2>
    <div class="button-group">
      <button
        v-for="val in data.doorThicknessOptions"
        :key="val"
        :class="{ active: config.door === val }"
        @click="select(val)"
      >
        {{ val }} mm
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ config: Object, data: Object })
const router = useRouter()

function select(value) {
  props.config.door = value
  router.push('/wall-thickness')
}
</script>

<style scoped>
.step-card {
  background: v-bind('data.colors.cardBg');
  padding: 30px;
  border-radius: 12px;
  box-shadow: v-bind('data.colors.cardShadow');
  text-align: center;
  transition: transform 0.3s;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

button {
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid v-bind('data.colors.primary');
  background: v-bind('data.colors.buttonBg');
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

button.active {
  background: v-bind('data.colors.buttonActive');
  color: v-bind('data.colors.buttonActiveText');
  border-color: v-bind('data.colors.buttonActive');
}

button:hover {
  background: v-bind('data.colors.buttonHover');
}
</style>
