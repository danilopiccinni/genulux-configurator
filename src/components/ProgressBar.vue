// src/components/ProgressBar.vue

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

import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { locales } from '../locales'
import { stepOrder, rollbackToStep } from '../helpers/configHelpers'


const props = defineProps({
  config: Object,
  data: Object
})


const router = useRouter()
const route = useRoute()



/**
 * STEP REATTIVI ALLA LINGUA
 */
const steps = computed(() => [

  {
    path: '/standard',
    label: locales[props.config.currentLang].standard
  },

  {
    path: '/door-thickness',
    label: locales[props.config.currentLang].doorThickness
  },

  {
    path: '/wall-thickness',
    label: locales[props.config.currentLang].wallThickness
  },

  {
    path: '/measures',
    label: locales[props.config.currentLang].measures
  },

  {
    path: '/summary',
    label: locales[props.config.currentLang].summary
  }

])



function isActive(path) {

  return props.config.currentStep === path ||
         route.path === path

}



function isCompleted(path) {

  switch(path) {


    case '/standard':
      return !!props.config.standard


    case '/door-thickness':
      return !!props.config.door


    case '/wall-thickness':
      return !!props.config.wall


    case '/measures':
      return !!props.config.type &&
             !!props.config.width &&
             !!props.config.height


    default:
      return false
  }

}



function isLocked(path) {

  const index = stepOrder.indexOf(path)

  if (index <= 0) {
    return false
  }


  for(let i = 0; i < index; i++) {

    if(!isCompleted(stepOrder[i])) {
      return true
    }

  }


  return false

}



function tryGo(path) {

  if(isLocked(path)) return


  rollbackToStep(props.config, path)

  props.config.currentStep = path

  router.push(path)

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


.step:not(.locked):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

</style>