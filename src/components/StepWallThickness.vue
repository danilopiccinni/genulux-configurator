<template>
  <div class="step-card">


    <!-- TIPO MURO -->

    <div class="section">

      <h2>
        {{ locales[config.currentLang].wallType }}
      </h2>


      <div class="button-group">


        <button
          class="option-card"
          :class="{
            active: config.wallType === 'massivbau'
          }"
          @click="selectWallType('massivbau')"
        >

        <strong>
          {{ locales[config.currentLang].massivbau }}
        </strong>

        </button>




        <button
          class="option-card"
          :class="{
            active: config.wallType === 'trockenbau'
          }"
          @click="selectWallType('trockenbau')"
        >

        <strong>
          {{ locales[config.currentLang].trockenbau }}
        </strong>

        </button>


      </div>


    </div>





    <!-- INFO MURO MASSIVO -->

    <div
      v-if="config.wallType === 'massivbau'"
      class="info-box"
    >

      <strong>
        ℹ️ {{ locales[config.currentLang].solidcostructionInfoTitle }}
      </strong>


      <p>
        {{ locales[config.currentLang].solidcostructionInfoText }}
      </p>


    </div>






    <!-- SPESSORE MURO -->


    <div
      v-if="config.wallType"
      class="section"
    >


      <h2>

        {{ locales[config.currentLang].wallThickness }}

      </h2>




      <div class="thickness-list">


        <div
          v-for="item in availableWallThickness"
          :key="item.value"
          class="thickness-item"
        >



        
        



          <button
            class="option-card"
            :disabled="!item.enabled"

            :class="{

              active: config.wall === item.value,

              disabled: !item.enabled
              
            }"

@click="selectThickness(item)"
>

<strong>
  {{ item.value }} cm
</strong>


</button>

<!-- INFO PANNELLO CARTONGESSO -->

<div
  v-if="
    config.wallType === 'trockenbau'
    &&
    item.panel
  "
  class="panel-info"
>

  <!-- {{ locales[config.currentLang].wallPanel }}: -->

  <strong>
    {{ locales[config.currentLang][item.panel] }}
  </strong>

</div>



        </div>


      </div>


    </div>



  </div>
</template>










<script setup>


import { computed } from 'vue'

import { useRouter } from 'vue-router'

import { locales } from '../locales'





const props = defineProps({

  config:Object,

  data:Object

})





const router = useRouter()







/**
 * Lista spessori disponibili
 * in base al tipo muro scelto
 */
const availableWallThickness = computed(()=>{


  if(!props.config.wallType){

    return []

  }



  return props.data.wallThicknessOptions[

    props.config.wallType

  ]


})









/**
 * Cambio tipo muro
 *
 * Reset delle scelte
 * dipendenti
 */
function selectWallType(type){


  props.config.wallType = type


  props.config.wall = ''

  props.config.wallPanel = ''


}









/**
 * Scelta spessore
 *
 * Nel caso trockenbau:
 * la pannellatura viene ricavata
 * automaticamente dallo spessore
 */
function selectThickness(item){


  if(!item.enabled){

    return

  }



  props.config.wall = item.value





  if(props.config.wallType === 'trockenbau'){


    props.config.wallPanel = item.panel || ''


  }
  else {


    props.config.wallPanel = ''


  }





  props.config.currentStep='/measures'


  router.push('/measures')


}



</script>









<style scoped>

.step-card {

  background:v-bind('data.colors.cardBg');

  padding:45px;

  border-radius:v-bind('data.colors.radiusXL');

  box-shadow:v-bind('data.colors.cardShadow');

  border:1px solid v-bind('data.colors.cardBorder');

  transition:.25s ease;

}



.step-card:hover {

  box-shadow:v-bind('data.colors.cardShadowHover');

}





.section {

  margin-bottom:35px;

  text-align:center;

}





h2 {

  margin-bottom:25px;

  font-size:1.35rem;

  color:v-bind('data.colors.text');

  font-weight:700;

}





.button-group {

  display:flex;

  justify-content:center;

  gap:20px;

  flex-wrap:wrap;

}





.option-card {

  width:220px;

  min-height:60px;

  padding:20px;

  border-radius:v-bind('data.colors.radiusLarge');

  border:1px solid v-bind('data.colors.border');

  background:v-bind('data.colors.buttonBg');

  cursor:pointer;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  gap:10px;

  transition:.25s ease;

  box-shadow:

    0 6px 18px rgba(0,0,0,.06);

}


.option-card strong {

  font-size:1.05rem;

  color:v-bind('data.colors.primary');

  letter-spacing:.3px;

}




.option-card:hover:not(:disabled) {

  transform:translateY(-4px);

  background:v-bind('data.colors.buttonHover');

  border-color:v-bind('data.colors.primary');

  box-shadow:

    0 12px 28px rgba(140,29,64,.14);

}





.option-card.active {

  background:

    linear-gradient(

      135deg,

      v-bind('data.colors.buttonActive'),

      v-bind('data.colors.primaryHover')

    );


  border-color:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');


  box-shadow:

    0 12px 30px rgba(140,29,64,.28);

}


.option-card.active strong {

  color:v-bind('data.colors.buttonActiveText');

}



.option-card:disabled,
.option-card.disabled {

  opacity:.35;

  cursor:not-allowed;

  background:v-bind('data.colors.lockedStep');

}





.thickness-list {

  display:flex;

  justify-content:center;

  align-items:flex-start;

  gap:20px;

  flex-wrap:wrap;

}





.thickness-item {

  display:flex;

  flex-direction:column;

  align-items:center;

  gap:12px;

}





.info-box {

  margin:20px 0 35px;

  padding:18px;

  border-radius:v-bind('data.colors.radius');

  background:v-bind('data.colors.infoBg');

  border:1px solid v-bind('data.colors.infoBorder');

  color:v-bind('data.colors.infoText');

}





.info-box strong {

  display:block;

  margin-bottom:8px;

}





.info-box p {

  margin:0;

  line-height:1.6;

}





.panel-info {

  padding:10px 14px;

  border-radius:v-bind('data.colors.radiusSmall');

  background:v-bind('data.colors.primaryLight');

  color:v-bind('data.colors.primaryDark');

  font-size:.85rem;

  text-align:center;

  max-width:180px;

}





.panel-info strong {

  display:block;

  margin-top:4px;

}


</style>