<template>
  <div class="progress">
    <div
      v-for="(step, index) in steps"
      :key="step.path"
      class="step"
      :class="{
        active: isActive(step.path),
        completed: isCompleted(step.path),
        locked: isLocked(step.path)
      }"
      @click="tryGo(step.path)"
    >
      <div class="step-number">{{ index + 1 }}</div>
      <div class="step-label">{{ step.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({ config: Object })
const router = useRouter()
const route = useRoute()

const steps = [
  { path: '/door-thickness', label: 'Spessore porta' },
  { path: '/wall-thickness', label: 'Spessore muro' },
  { path: '/measures', label: 'Misure' },
  { path: '/summary', label: 'Riepilogo' }
]

function isActive(path) {
  return props.config.currentStep === path || route.path === path
}

function isCompleted(path) {
  switch (path) {
    case '/door-thickness': return !!props.config.door
    case '/wall-thickness': return !!props.config.wall
    case '/measures':
      return !!props.config.type && !!props.config.width && !!props.config.height
    default: return false
  }
}

// Un passo è bloccato se uno qualsiasi dei passi precedenti non è completato
function isLocked(path) {
  const order = steps.map(s => s.path)
  const stepIndex = order.indexOf(path)
  if (stepIndex === 0) return false

  for (let i = 0; i < stepIndex; i++) {
    if (!isCompleted(order[i])) return true
  }
  return false
}

// Blocca il salto se il passo è locked
function tryGo(path) {
  if (isLocked(path)) return
  rollbackData(path)
  props.config.currentStep = path
  router.push(path)
}

// Reset dei dati dei passi successivi
function rollbackData(path) {
  const order = steps.map(s => s.path)
  const index = order.indexOf(path)

  order.slice(index + 1).forEach(p => {
    if (p === '/door-thickness') props.config.door = ''
    if (p === '/wall-thickness') props.config.wall = ''
    if (p === '/measures') {
      props.config.type = ''
      props.config.mode = 'fixed'
      props.config.width = ''
      props.config.height = ''
    }
  })
}
</script>

<style scoped>
.progress {
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
}

.step {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.step-number {
  font-weight: bold;
  margin-bottom: 4px;
}

.step-label {
  font-size: 0.85rem;
}

/* Stati passo */
.step.active {
  background-color: #facc15;
  color: #1f2937;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.step.completed {
  background-color: #10b981;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.step.locked {
  opacity: 0.4;
  pointer-events: none;
}

/* Hover solo su passi non bloccati */
.step:not(.locked):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>
