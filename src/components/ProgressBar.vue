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

      <div class="step-number">
        {{ index + 1 }}
      </div>

      <div class="step-label">
        {{ step.label }}
      </div>

    </div>

  </div>
</template>



<script setup>

import { computed } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { locales } from '../locales'

import {
  stepOrder,
  rollbackToStep
} from '../helpers/configHelpers'



const props = defineProps({

  config:Object,

  data:Object

})



const router = useRouter()

const route = useRoute()





/**
 * STEP REATTIVI ALLA LINGUA
 *
 * Lo standard non è più uno step.
 *
 * La scelta IT / DE verrà gestita
 * direttamente dentro StepMeasures.vue.
 */
const steps = computed(() => [


  {
    path:'/door',

    label:
      locales[props.config.currentLang].door
  },


  {
    path:'/wall-thickness',

    label:
      locales[props.config.currentLang].wallThickness
  },


  {
    path:'/measures',

    label:
      locales[props.config.currentLang].measures
  },


  {
    path:'/summary',

    label:
      locales[props.config.currentLang].summary
  }


])







function isActive(path) {

  return (

    props.config.currentStep === path ||

    route.path === path

  )

}








function isCompleted(path) {


  switch(path) {


    case '/door':

      return !!props.config.door



    case '/wall-thickness':

   return !!props.config.wallType &&
          !!props.config.wall



    case '/measures':

      return (

        !!props.config.type &&

        !!props.config.width &&

        !!props.config.height

      )



    default:

      return false

  }

}








function isLocked(path) {


  const index =
    stepOrder.indexOf(path)



  if(index <= 0){

    return false

  }





  for(let i = 0; i < index; i++){


    if(!isCompleted(stepOrder[i])){

      return true

    }


  }



  return false

}








function tryGo(path){


  if(isLocked(path)){

    return

  }



  rollbackToStep(

    props.config,

    path

  )



  props.config.currentStep = path



  router.push(path)

}



</script>



<style scoped>

.progress {

  display:flex;

  justify-content:space-between;

  align-items:flex-start;

  position:relative;

  margin:45px 10px 55px;

}



/*
========================================
LINEA CENTRALE
========================================
*/

.progress::before {

  content:"";

  position:absolute;

  top:18px;

  left:11%;

  right:11%;

  height:2px;

  background:v-bind('data.colors.border');

  z-index:0;

}







.step {

  position:relative;

  z-index:1;

  flex:1;


  display:flex;

  flex-direction:column;

  align-items:center;


  cursor:pointer;


  transition:
    transform .25s ease;

}







.step-number {

  width:38px;

  height:38px;


  display:flex;

  align-items:center;

  justify-content:center;


  border-radius:50%;


  background:v-bind('data.colors.surface');


  border:

    2px solid

    v-bind('data.colors.border');


  color:v-bind('data.colors.textSecondary');


  font-weight:700;


  font-size:.9rem;


  transition:

    all .3s ease;


}







.step-label {

  margin-top:14px;


  font-size:.85rem;


  font-weight:600;


  color:v-bind('data.colors.textWhite');


  transition:.3s ease;


}









/*
========================================
ATTIVO
========================================
*/


.step.active .step-number {


  background:v-bind('data.colors.primary');


  border-color:v-bind('data.colors.primary');


  color:white;


  transform:scale(1.15);


  box-shadow:

    0 8px 22px

    rgba(140,29,64,.35);


}



.step.active .step-label {


  color:v-bind('data.colors.primary');


  font-weight:700;


}









/*
========================================
COMPLETATO
========================================
*/


.step.completed .step-number {


  background:v-bind('data.colors.primary');


  border-color:v-bind('data.colors.primary');


  color:white;


}



.step.completed .step-label {


  color:v-bind('data.colors.text');


}









/*
========================================
BLOCCATO
========================================
*/


.step.locked {


  

  cursor:not-allowed;

}







.step.locked .step-number {


  background:v-bind('data.colors.surfaceAlt');

}









/*
========================================
HOVER
========================================
*/


.step:not(.locked):hover {


  transform:translateY(-4px);


}





.step:not(.locked):hover .step-number {


  box-shadow:

    0 8px 18px

    rgba(0,0,0,.12);


}

</style>