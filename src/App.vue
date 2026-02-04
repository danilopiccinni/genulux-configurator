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
    <ProgressBar :config="config" :data="ConfigData" />
    <router-view :config="config" :data="ConfigData" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ProgressBar from './components/ProgressBar.vue'
import { config, loadConfig, resetConfig } from './config'
import { ConfigData } from './configData'
import LanguageSelector from './components/LanguageSelector.vue'
import { locales } from './locales.js'


const router = useRouter()

onMounted(() => {
  loadConfig()
  router.replace(config.currentStep || '/door-thickness')
})

function newConfig() {
  resetConfig()
  router.replace('/door-thickness')
}
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
