import { createRouter, createWebHistory } from 'vue-router'

import StepDoorThickness from '../components/StepDoorThickness.vue'
import StepWallThickness from '../components/StepWallThickness.vue'
import StepMeasures from '../components/StepMeasures.vue'
import Summary from '../components/Summary.vue'

const routes = [
  { path: '/', redirect: '/door-thickness' },
  { path: '/door-thickness', component: StepDoorThickness },
  { path: '/wall-thickness', component: StepWallThickness },
  { path: '/measures', component: StepMeasures },
  { path: '/summary', component: Summary }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
