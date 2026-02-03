<template>
  <div class="step-card">
    <h2>Seleziona spessore muro</h2>

    <div class="button-group">
      <button
        v-for="val in data.wallThicknessOptions"
        :key="val"
        :class="{ active: config.wall === val }"
        @click="select(val)"
      >
        {{ val }} cm
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({ config: Object, data: Object })
const router = useRouter()

function select(value) {
  props.config.wall = value
  router.push('/measures')
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

h2 {
  margin-bottom: 1rem;
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
  font-weight: 600;
  cursor: pointer;
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
