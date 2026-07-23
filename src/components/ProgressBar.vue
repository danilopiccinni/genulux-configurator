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

/*
========================================
PROGRESS CONTAINER
========================================
*/

.progress {

  display:flex;

  justify-content:space-between;

  align-items:flex-start;

  position:relative;


  margin:

    45px 10px 55px;


  width:100%;


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


  left:12%;


  right:12%;


  height:2px;


  background:

    v-bind('data.colors.border');


  z-index:0;


}







/*
========================================
STEP
========================================
*/


.step {


  position:relative;


  z-index:1;


  flex:1;



  display:flex;


  flex-direction:column;


  align-items:center;


  justify-content:flex-start;



  cursor:pointer;



  transition:

    transform .25s ease;


}









/*
========================================
NUMERO
========================================
*/


.step-number {


  width:38px;


  height:38px;



  display:flex;


  align-items:center;


  justify-content:center;



  flex-shrink:0;



  border-radius:50%;



  background:

    v-bind('data.colors.surface');



  border:

    2px solid

    v-bind('data.colors.border');



  color:

    v-bind('data.colors.textSecondary');



  font-weight:700;


  font-size:.9rem;



  transition:

    all .3s ease;



}









/*
========================================
LABEL
========================================
*/


.step-label {


  margin-top:14px;



  width:100%;


  max-width:120px;



  min-height:38px;



  display:flex;


  align-items:flex-start;


  justify-content:center;



  text-align:center;



  line-height:1.2;



  white-space:normal;



  word-break:normal;



  font-size:.85rem;


  font-weight:600;



  color:

    v-bind('data.colors.textWhite');



  transition:.3s ease;



}









/*
========================================
ATTIVO
========================================
*/


.step.active .step-number {


  background:

    v-bind('data.colors.primary');



  border-color:

    v-bind('data.colors.primary');



  color:white;



  transform:

    scale(1.15);



  box-shadow:

    0 8px 22px

    rgba(140,29,64,.35);



}






.step.active .step-label {


  color:

    v-bind('data.colors.primary');



  font-weight:700;



}









/*
========================================
COMPLETATO
========================================
*/


.step.completed .step-number {


  background:

    v-bind('data.colors.primary');



  border-color:

    v-bind('data.colors.primary');



  color:white;



}





.step.completed .step-label {


  color:

    v-bind('data.colors.text');



}









/*
========================================
LOCKED
========================================
*/


.step.locked {


  cursor:not-allowed;


}







.step.locked .step-number {


  background:

    v-bind('data.colors.surfaceAlt');


}









/*
========================================
HOVER
========================================
*/


.step:not(.locked):hover {


  transform:

    translateY(-4px);



}







.step:not(.locked):hover .step-number {


  box-shadow:

    0 8px 18px

    rgba(0,0,0,.12);



}









/*
========================================
TABLET
========================================
*/


@media(max-width:900px){


  .progress {


    margin:

      35px 5px 45px;


  }




  .step-label {


    font-size:.78rem;


    max-width:90px;


  }



}









/*
========================================
MOBILE
========================================
*/


@media(max-width:600px){


  .progress {


    margin:

      25px 0 35px;



  }











  .step-number {


    width:32px;


    height:32px;


    font-size:.8rem;


  }






  .step-label {


    margin-top:10px;



    max-width:70px;



    font-size:.7rem;



  }



}








/*
========================================
VERY SMALL
========================================
*/


@media(max-width:380px){


  .step-label {


    max-width:60px;


    font-size:.65rem;


  }



}

</style>