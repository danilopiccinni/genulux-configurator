import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../components/Welcome.vue'
import StepDoor from '../components/StepDoor.vue'
import StepWallThickness from '../components/StepWallThickness.vue'
import StepMeasures from '../components/StepMeasures.vue'
import Summary from '../components/Summary.vue'
import Impressum from '../components/Impressum.vue'

const routes = [

  {
    path: '/',
    component: Welcome
  },

  {
    path: '/door',
    component: StepDoor
  },

  {
    path: '/wall-thickness',
    component: StepWallThickness
  },

  {
    path: '/measures',
    component: StepMeasures
  },

  {
    path: '/summary',
    component: Summary
  },

  {
    path: '/impressum',
    component: Impressum
  }

]

export default createRouter({

  history: createWebHistory(),

  routes

})