<template>
  <div class="step-card">

    <h2>
      {{ locales[config.currentLang].door }}
    </h2>

    <div class="button-group">

      <button
        class="option-card"
        :class="{ active: config.door === 'wood' }"
        @click="select('wood')"
      >


      <img
        :src="woodIcon"
        alt=""
        class="option-icon"
      >

        <strong>
          {{ locales[config.currentLang].woodDoor }}
        </strong>

      </button>



      <button
        class="option-card"
        :class="{ active: config.door === 'glass' }"
        @click="select('glass')"
      >

      <img
        :src="glassIcon"
        alt=""
        class="option-icon"
      >

        <strong>
          {{ locales[config.currentLang].glassDoor }}
        </strong>

      </button>

    </div>

  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'
import { locales } from '../locales'

import woodIcon from '../assets/images/ICONS_Konfigurator/legno.png'
import glassIcon from '../assets/images/ICONS_Konfigurator/vetro.png'

const props = defineProps({
  config: Object,
  data: Object
})

const router = useRouter()

function select(type) {

  props.config.door = type

  props.config.currentStep = '/wall-thickness'

  router.push('/wall-thickness')

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

  margin:0;

  color:v-bind('data.colors.text');

  font-size:1.4rem;

  font-weight:700;

}





.button-group {

  display:flex;

  justify-content:center;

  gap:20px;

  flex-wrap:wrap;

  margin-top:35px;

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





.option-card:hover {

  transform:translateY(-4px);

  border-color:v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonHover');

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



  transform:translateY(-4px);

}





.option-card.active strong {

  color:v-bind('data.colors.buttonActiveText');

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


</style>