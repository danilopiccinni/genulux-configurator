<template>
  <div class="language-selector">
    <label for="lang-select">Lingua:</label>
    <select id="lang-select" v-model="config.currentLang">
      <option v-for="(label, code) in availableLangs" :key="code" :value="code">
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { config } from '../config.js'

// Definiamo le lingue disponibili
const availableLangs = {
  it: 'Italiano',
  en: 'English',
  de: 'Deutsch',
  es: 'Español'
}
</script>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
}

select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
}
</style>
