<template>
  <div
    :style="{ background: ConfigData.colors.background, color: ConfigData.colors.primary }"
    class="app"
  >

    <div class="header">
      <h1>
        <strong>
          Genulux
        </strong>
      </h1>

      <h5>
        {{ locales[config.currentLang].h2 }}
      </h5>
    </div>


    <div class="button-container">
      <LanguageSelector/>

      <!-- RESET SEMPRE VISIBILE -->
      <button class="reset-btn" @click="newConfig">
        {{ locales[config.currentLang].newConfiguration }}
      </button>
    </div>


    <ProgressBar 
      :config="config" 
      :data="ConfigData" 
    />


    <router-view 
      :config="config" 
      :data="ConfigData" 
    />

  </div>
</template>


<script setup>

import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import ProgressBar from './components/ProgressBar.vue'
import LanguageSelector from './components/LanguageSelector.vue'

import { config, loadConfig, resetConfig } from './config'
import { ConfigData } from './configData'
import { locales } from './locales.js'

import {
  rollbackToStep,
  isRollback,
  canEnterStep
} from './helpers/configHelpers'


const router = useRouter()
const route = useRoute()


/**
 * Ultimo step realmente valido raggiunto
 *
 * Serve per impedire al tasto avanti
 * del browser di saltare step incompleti
 */
let lastValidStep = '/standard'



onMounted(() => {

  loadConfig()

  const startStep = config.currentStep || '/standard'

  lastValidStep = startStep

  router.replace(startStep)

})



function newConfig() {

  resetConfig()

  lastValidStep = '/standard'

  router.replace('/standard')

}



/**
 * Gestione navigazione browser
 */
watch(
  () => route.path,
  (newPath, oldPath) => {


    if (!oldPath) return



    /**
     * BACK browser
     */
    if (isRollback(oldPath, newPath)) {


      rollbackToStep(
        config,
        newPath
      )


      config.currentStep = newPath


      lastValidStep = newPath


      return

    }



    /**
     * FORWARD browser
     * oppure URL scritto manualmente
     */
    if (!canEnterStep(config, newPath)) {


      router.replace(
        lastValidStep
      )


      return

    }



    /**
     * Step valido
     */
    config.currentStep = newPath

    lastValidStep = newPath


  }
)

</script>



<style>

.app {
  max-width: 900px;
  margin: auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
  transition: background 0.3s, color 0.3s;
  position: relative;
}


.header{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}



/* PULSANTE RESET */
.button-container{

  display: flex;
  justify-content:space-between;
  padding: 20px;
  margin-bottom: 20px;

}



.reset-btn {

  padding: 8px 14px;
  font-size: 0.85rem;
  font-weight: 600;

  border-radius: 8px;
  border: 1px solid #d1d5db;

  background: white;
  color: #374151;

  cursor: pointer;

  transition: all 0.2s;

}



.reset-btn:hover {

  background: #f3f4f6;

}

</style>