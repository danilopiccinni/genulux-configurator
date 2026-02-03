<template>
  <div :style="{ background: ConfigData.colors.background, color: ConfigData.colors.primary }" class="app">
    <ProgressBar :config="config" :data="ConfigData" />
    <router-view :config="config" :data="ConfigData" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ProgressBar from './components/ProgressBar.vue'
import { config, loadConfig } from './config'
import { ConfigData } from './configData'

onMounted(() => loadConfig())
</script>

<style>
.app {
  max-width: 900px;
  margin: auto;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
  transition: background 0.3s, color 0.3s;
}
</style>
