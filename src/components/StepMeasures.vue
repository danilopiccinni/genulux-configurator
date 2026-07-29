<template>
  <div class="step-card">


    <h2>
      {{ locales[config.currentLang].measureType }}
    </h2>




    <!-- SCELTA TIPO MISURA -->

    <div class="measure-choice">


      <button
        class="option-card"
        :class="{ active: config.type === 'measureLuce' }"
        @click="selectMeasureType('light')"
      >

      <img
        :src="lightMeasureIcon"
        alt="Light Measure"
        class="option-icon"
      />

        <strong>
          {{ locales[config.currentLang].measureLuce }}
        </strong>

        <small>
          {{ locales[config.currentLang].international }}
        </small>

      </button>





      <button
        class="option-card"
        :class="{ active: config.type === 'measurePorta' }"
        @click="selectMeasureType('door')"
      >

      <img
        :src="doorMeasureIcon"
        alt="Door Measure"
        class="option-icon"
      />

        <strong>
          {{ locales[config.currentLang].measurePorta }}
        </strong>

        <small>
          {{ locales[config.currentLang].germany }}
        </small>

      </button>





      <button
        class="option-card"
        :class="{ active: config.type === 'measureMuro' }"
        @click="selectMeasureType('wall')"
      >

      <img
        :src="wallMeasureIcon"
        alt="Wall Measure"
        class="option-icon"
      />

        <strong>
          {{ locales[config.currentLang].measureMuro }}
        </strong>

        <small>
          IT / DE
        </small>

      </button>


    </div>







    <!-- TIPO ATTIVO -->

    <!-- <div
      v-if="config.type"
      class="info-box"
    >

      <strong>
        {{ locales[config.currentLang].measureType }}:
      </strong>


      {{ locales[config.currentLang][config.type] }}


    </div> -->







    <!-- INSERIMENTO -->

    <div
      v-if="config.type"
      class="measure-inputs"
    >


      <h3>
        {{ locales[config.currentLang].insertMeasures }}
      </h3>





      <div class="mode">


        <label>

          <input
            type="radio"
            value="fixed"
            v-model="config.mode"
          />

          {{ locales[config.currentLang].standardMeasures }}

        </label>




        <label>

          <input
            type="radio"
            value="custom"
            v-model="config.mode"
          />

          {{ locales[config.currentLang].customMeasures }}

        </label>


      </div>







      <div
        v-if="config.mode === 'fixed'"
        class="input-box"
      >


        <select
          v-model.number="config.width"
          @change="widthChanged"
        >

          <option disabled value="">
            {{ locales[config.currentLang].width }}
          </option>


          <option
            v-for="w in availableWidths"
            :key="w"
            :value="w"
          >

            {{ w }} mm

          </option>


        </select>





        <select
          v-model.number="config.height"
          @change="heightChanged"
        >

          <option disabled value="">
            {{ locales[config.currentLang].height }}
          </option>


          <option
            v-for="h in availableHeights"
            :key="h"
            :value="h"
          >

            {{ h }} mm

          </option>


        </select>


      </div>








      <div
        v-else
        class="input-box"
      >


        <div class="field">

          <label>
            {{ locales[config.currentLang].width }}:
            {{ config.width }} mm
          </label>


          <input
            class="measure-input"
            :class="{ invalid: widthInvalid }"
            type="number"
            :min="measureConfig.limits.minWidth"
            :max="measureConfig.limits.maxWidth"
            :step="measureConfig.limits.stepWidth"
            v-model.number="config.width"
          />

          <p
            v-if="widthInvalid"
            class="field-error"
          >
            {{ locales[config.currentLang].width }}
            {{ locales[config.currentLang].measureOutOfRange }}

            ({{ measureConfig.limits.minWidth }} –
            {{ measureConfig.limits.maxWidth }} mm)
          </p>

        </div>





        <div class="field">

          <label>
            {{ locales[config.currentLang].height }}:
            {{ config.height }} mm
          </label>


          <input
            class="measure-input"
            :class="{ invalid: heightInvalid }"
            type="number"
            :min="measureConfig.limits.minHeight"
            :max="measureConfig.limits.maxHeight"
            :step="measureConfig.limits.stepHeight"
            v-model.number="config.height"
          />

          <p
            v-if="heightInvalid"
            class="field-error"
          >
            {{ locales[config.currentLang].height }}
            {{ locales[config.currentLang].measureOutOfRange }}

            ({{ measureConfig.limits.minHeight }} –
            {{ measureConfig.limits.maxHeight }} mm)
          </p>

        </div>


      </div>







      <div
        v-if="availabilityInfo"
        class="availability"
        :class="availabilityInfo.type"
      >

        <strong>
          {{ availabilityInfo.title }}
        </strong>

        <p>
          {{ availabilityInfo.description }}
        </p>


      </div>







      <button
        class="next"
        :disabled="!canContinue"
        @click="goNext"
      >

        {{ locales[config.currentLang].continue }}

      </button>


    </div>


  </div>
</template>




<script setup>

import { computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'

import { locales } from '../locales'

import { generateMeasureOptions,generateWallOpeningOptions } from '../helpers/measureCatalog'

import { getAvailabilityInfo } from '../helpers/availabilityHelper'

import { resolveAvailability } from '../helpers/availabilityResolver'

import lightMeasureIcon from '../assets/images/ICONS_Konfigurator/passaggioluce.png'
import doorMeasureIcon from '../assets/images/ICONS_Konfigurator/porta.png'
import wallMeasureIcon from '../assets/images/ICONS_Konfigurator/aperturamuro.png'



const props = defineProps({

  config:Object,

  data:Object

})



const router = useRouter()





/**
 * Scelta nuovo flusso misura
 *
 * light:
 * IT + passaggio luce
 *
 * door:
 * DE + misura porta DIN
 */
function selectMeasureType(type){


  let newType = ''
  let newStandard = null



  switch(type){


    case 'light':

      newType = 'measureLuce'
      newStandard = 'IT'

      break



    case 'door':

      newType = 'measurePorta'
      newStandard = 'DE'

      break



    case 'wall':

      newType = 'measureMuro'
      newStandard = null

      break


  }




  if(props.config.type !== newType){

    props.config.width=''
    props.config.height=''

  }




  props.config.standard = newStandard

  props.config.type = newType

  props.config.mode='fixed'


}









/**
 * Configurazione limiti custom
 */
const measureConfig = computed(()=>{


  if(!props.config.type){


    return {

      limits:{

        minWidth:0,

        maxWidth:0,

        minHeight:0,

        maxHeight:0,

        stepWidth:1,

        stepHeight:1

      }

    }


  }



  return props.data.measuresConfig[props.config.type]


})









/**
 * Catalogo misure standard
 */
const standardMeasures = computed(()=>{


  if(!props.config.type){

    return []

  }



  /**
   * Apertura muro
   *
   * Non ha standard iniziale.
   *
   * Il catalogo è unione:
   *
   * IT + DE
   *
   * Lo standard verrà assegnato
   * dopo la scelta della misura.
   */
  if(props.config.type === 'measureMuro'){


    return generateWallOpeningOptions()


  }





  /**
   * Misure normali:
   *
   * measureLuce -> IT
   * measurePorta -> DE
   */
  if(!props.config.standard){

    return []

  }



  return generateMeasureOptions(

    props.config.standard,

    props.config.type

  )


})









/**
 * Larghezze disponibili
 */
const availableWidths = computed(()=>{


  return [

    ...new Set(

      standardMeasures.value.map(

        item=>item.width

      )

    )

  ]


})









/**
 * Altezze filtrate
 */
const availableHeights = computed(()=>{


  const measures = props.config.width

    ? standardMeasures.value.filter(item =>
        item.width === props.config.width
      )

    : standardMeasures.value



  return [

    ...new Set(

      measures.map(item =>
        item.height
      )

    )

  ]


})


/**
 * ============================================================================
 * Validazione configurazione misure
 * ----------------------------------------------------------------------------
 *
 * Abilita il pulsante Continua solo quando:
 *
 * - le misure standard rappresentano una combinazione valida
 * - le misure libere rientrano nei limiti configurati
 *
 * ============================================================================
 */
const canContinue = computed(() => {


  if(

    !props.config.type ||

    !props.config.width ||

    !props.config.height

  ){

    return false

  }



  /**
   * --------------------------------------------------------
   * Misure standard
   * --------------------------------------------------------
   */
  if(props.config.mode === 'fixed'){


    return standardMeasures.value.some(item =>

      item.width === props.config.width &&

      item.height === props.config.height

    )

  }



  /**
   * --------------------------------------------------------
   * Misure libere
   * --------------------------------------------------------
   */
  const limits =
    measureConfig.value.limits



  return (

    props.config.width >= limits.minWidth &&

    props.config.width <= limits.maxWidth &&

    props.config.height >= limits.minHeight &&

    props.config.height <= limits.maxHeight

  )


})



const widthInvalid = computed(() => {

  if (
    props.config.mode !== 'custom' ||
    props.config.width === ''
  ) {
    return false
  }

  const limits = measureConfig.value.limits

  return (
    props.config.width < limits.minWidth ||
    props.config.width > limits.maxWidth
  )

})



const heightInvalid = computed(() => {

  if (
    props.config.mode !== 'custom' ||
    props.config.height === ''
  ) {
    return false
  }

  const limits = measureConfig.value.limits

  return (
    props.config.height < limits.minHeight ||
    props.config.height > limits.maxHeight
  )

})




/**
 * Disponibilità reale misura
 */
const currentAvailability = computed(()=>{


  if(
    !props.config.width ||
    !props.config.height
  ){

    return null

  }



  /**
   * Misura apertura muro
   *
   * Gestione:
   *
   * fixed  -> catalogo IT + DE
   * custom -> resolver limiti
   */
  if(props.config.type === 'measureMuro'){


    if(props.config.mode === 'fixed'){


      const selected =
        standardMeasures.value.find(item =>

          item.width === props.config.width &&

          item.height === props.config.height

        )


      if(selected){


        return {

          availability:
            selected.availability

        }


      }


    }




    if(props.config.mode === 'custom'){


      const selected =
        standardMeasures.value.find(item =>

          item.width === props.config.width &&

          item.height === props.config.height

        )


      if(selected){


        return {

          availability:
            selected.availability

        }


      }



      return {

        availability:'production'

      }


    }



    return null


  }





  /**
   * Misure standard normali
   *
   * Usano il resolver classico
   */
  return resolveAvailability({

    standard:props.config.standard,

    width:props.config.width,

    height:props.config.height

  })


})









/**
 * Disponibilità tradotta
 */
const availabilityInfo = computed(()=>{


  if(!currentAvailability.value){

    return null

  }



  return getAvailabilityInfo(

    currentAvailability.value.availability,

    props.config.currentLang,

    locales

  )


})









/**
 * Cambio larghezza misura standard
 */
function widthChanged(){


  const exists =
    standardMeasures.value.some(item=>

      item.width === props.config.width &&

      item.height === props.config.height

    )



  if(!exists){

    props.config.height=''

  }

  resolveWallStandard()

}









/**
 * Cambio altezza misura standard
 */
function heightChanged(){


  const exists =
    standardMeasures.value.some(item=>

      item.width === props.config.width &&

      item.height === props.config.height

    )



  if(!exists){

    props.config.width=''

  }

  resolveWallStandard()

}




function resolveWallStandard(){


  if(props.config.type !== 'measureMuro'){

    return

  }



  const selected =
    standardMeasures.value.find(item=>

      item.width === props.config.width &&

      item.height === props.config.height

    )



  if(selected?.originStandard){

    props.config.standard =
      selected.originStandard

  }


}





/**
 * ----------------------------------------------------------------
 * VECCHIA SELEZIONE MANUALE TIPO MISURA
 *
 * Conservata per futuro utilizzo.
 *
 * Se si vuole ripristinare basta:
 *
 * 1) togliere il commento
 * 2) riattivare il blocco template choices
 *
 * ----------------------------------------------------------------
 */


/*

function selectType(type){


  props.config.type = type


  props.config.mode='fixed'


  props.config.width=''

  props.config.height=''


}

*/









/**
 * Vai al riepilogo
 */
function goNext(){


  if(

    props.config.type &&

    props.config.width &&

    props.config.height

  ){


    props.config.currentStep='/summary'



    nextTick(()=>{


      router.push('/summary')


    })


  }


}


</script>

<style scoped>


.step-card {

  background:v-bind('data.colors.cardBg');

  padding:45px;

  border-radius:v-bind('data.colors.radiusXL');

  box-shadow:v-bind('data.colors.cardShadow');

  border:1px solid v-bind('data.colors.cardBorder');

  text-align:center;

  transition:.25s ease;

}



.step-card:hover {

  box-shadow:v-bind('data.colors.cardShadowHover');

}







h2 {

  margin-bottom:30px;

  font-size:1.35rem;

  color:v-bind('data.colors.text');

  font-weight:700;

}









/*
========================================
SCELTA TIPO MISURA
========================================
*/


.measure-choice {

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

}







.option-card small {

  color:v-bind('data.colors.textSecondary');

  font-size:.85rem;

}







.option-card:hover {

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

  box-shadow:

    0 12px 30px rgba(140,29,64,.28);

}







.option-card.active strong,
.option-card.active small {

  color:v-bind('data.colors.buttonActiveText');

}









/*
========================================
INFO TIPO MISURA
========================================
*/


.info-box {

  margin:30px auto;

  max-width:520px;

  padding:18px;

  border-radius:v-bind('data.colors.radius');

  background:v-bind('data.colors.infoBg');

  border:

    1px solid

    v-bind('data.colors.infoBorder');

  color:v-bind('data.colors.infoText');

}









/*
========================================
INSERIMENTO MISURE
========================================
*/


.measure-inputs {

  margin-top:35px;

  display:flex;

  flex-direction:column;

  align-items:center;

  gap:25px;

}







.measure-inputs h3 {

  color:v-bind('data.colors.text');

}









/*
========================================
MODALITA STANDARD / CUSTOM
========================================
*/


.mode {

  display:flex;

  justify-content:center;

  gap:30px;

  padding:18px 25px;

  background:v-bind('data.colors.surfaceAlt');

  border-radius:v-bind('data.colors.radius');

  border:

    1px solid

    v-bind('data.colors.borderLight');

}







.mode label {

  font-weight:600;

  color:v-bind('data.colors.textSecondary');

  cursor:pointer;

}









/*
========================================
INPUT
========================================
*/


.input-box {

  width:100%;

  max-width:520px;

  display:flex;

  flex-direction:column;

  gap:18px;

}








select,
input[type="number"] {

  padding:14px;

  border-radius:v-bind('data.colors.radius');

  border:

    1px solid

    v-bind('data.colors.inputBorder');

  background:v-bind('data.colors.inputBg');

  color:v-bind('data.colors.text');

  font-size:1rem;

  transition:.25s ease;

}








select:focus,
input[type="number"]:focus {

  outline:none;

  border-color:v-bind('data.colors.inputBorderFocus');

  box-shadow:

    0 0 0 3px rgba(140,29,64,.12);

}









.field {

  padding:22px;

  border-radius:v-bind('data.colors.radiusLarge');

  background:v-bind('data.colors.surfaceAlt');

  border:

    1px solid

    v-bind('data.colors.borderLight');

}







.field label {

  display:block;

  margin-bottom:10px;

  font-weight:700;

  color:v-bind('data.colors.text');

}









/*
========================================
DISPONIBILITA'
========================================
*/


.availability {

  width:100%;

  max-width:520px;

  padding:18px;

  border-radius:v-bind('data.colors.radiusLarge');

  border:1px solid;

}







.availability.success {

  background:v-bind('data.colors.successBg');

  color:v-bind('data.colors.successText');

  border-color:v-bind('data.colors.successBorder');

}







.availability.warning {

  background:v-bind('data.colors.warningBg');

  color:v-bind('data.colors.warningText');

  border-color:v-bind('data.colors.warningBorder');

}







.availability.error {

  background:v-bind('data.colors.errorBg');

  color:v-bind('data.colors.errorText');

  border-color:v-bind('data.colors.errorBorder');

}









/*
========================================
CONTINUA
========================================
*/


.next {

  margin-top:25px;

  padding:14px 40px;

  border:none;

  border-radius:v-bind('data.colors.radius');

  background:

    linear-gradient(

      135deg,

      v-bind('data.colors.buttonActive'),

      v-bind('data.colors.primaryHover')

    );


  color:v-bind('data.colors.buttonActiveText');

  font-weight:700;

  cursor:pointer;

  transition:.25s ease;

  box-shadow:

    0 10px 25px rgba(140,29,64,.25);

}







.next:hover:not(:disabled) {

  transform:translateY(-3px);

  box-shadow:

    0 15px 30px rgba(140,29,64,.32);

}







.next:disabled {

  background:v-bind('data.colors.lockedStep');

  color:v-bind('data.colors.textLight');

  cursor:not-allowed;

  box-shadow:none;

}


.option-icon {

  width:58px;

  height:58px;

  object-fit:contain;

  transition:
    transform .25s ease,
    filter .25s ease,
    opacity .25s ease;

}

.option-card:hover .option-icon {

  transform:scale(1.08);

}

.option-card.active .option-icon {

  filter:
    brightness(0)
    invert(1);

}

.measure-input.invalid {

  border: 2px solid #dc2626;

}



.field-error {

  margin-top: 6px;

  color: #dc2626;

  font-size: .9rem;

  font-weight: 500;

}


</style>