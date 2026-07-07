<template>
  <div class="step-card">

    <h2>
      {{ locales[config.currentLang].doorThickness }}
    </h2>

    <div class="button-group">

      <button
        :class="{ active: config.door === 'wood' }"
        @click="select('wood')"
      >

        <strong>
          {{ locales[config.currentLang].woodDoor }}
        </strong>

      </button>



      <button
        :class="{ active: config.door === 'glass' }"
        @click="select('glass')"
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

.step-card{

  background:v-bind('data.colors.cardBg');

  padding:30px;

  border-radius:12px;

  box-shadow:v-bind('data.colors.cardShadow');

  text-align:center;

}

.button-group{

  display:flex;

  justify-content:center;

  gap:20px;

  flex-wrap:wrap;

  margin-top:25px;

}

button{

  min-width:220px;

  padding:18px;

  border-radius:12px;

  border:2px solid v-bind('data.colors.primary');

  background:v-bind('data.colors.buttonBg');

  cursor:pointer;

  transition:all .25s ease;

  display:flex;

  flex-direction:column;

  align-items:center;

  gap:8px;

}

button strong{

  font-size:1rem;

}

button small{

  font-size:.85rem;

  opacity:.8;

}

button:hover{

  background:v-bind('data.colors.buttonHover');

  transform:translateY(-2px);

}

button.active{

  background:v-bind('data.colors.buttonActive');

  color:v-bind('data.colors.buttonActiveText');

  border-color:v-bind('data.colors.buttonActive');

}

</style>