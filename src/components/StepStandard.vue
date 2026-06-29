<template>
  <div class="step-card">
    <h2>{{ locales[config.currentLang].selectStandard }}</h2>

    <p class="description">
      {{ locales[config.currentLang].selectStandardDescription }}
    </p>

    <div class="choices">
      <div
        class="choice-card"
        :class="{ active: config.standard === 'IT' }"
        @click="select('IT')"
      >
        <div class="code">IT</div>

        <div class="label">
          {{ locales[config.currentLang].international }}
        </div>
      </div>

      <div
        class="choice-card"
        :class="{ active: config.standard === 'DE' }"
        @click="select('DE')"
      >
        <div class="code">DE</div>

        <div class="label">
          {{ locales[config.currentLang].germany }}
        </div>
      </div>
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

function select(standard) {
  props.config.standard = standard
  props.config.currentStep = '/door-thickness'
  router.push('/door-thickness')
}
</script>

<style scoped>
.step-card {
  background: v-bind('data.colors.cardBg');
  padding: 40px;
  border-radius: 12px;
  box-shadow: v-bind('data.colors.cardShadow');
  transition: transform 0.3s;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

.description {
  text-align: center;
  color: #6b7280;
  margin-bottom: 35px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

.choices {
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
}

.choice-card {
  width: 230px;
  padding: 35px 20px;

  border-radius: 12px;
  border: 2px solid v-bind('data.colors.primary');

  background: v-bind('data.colors.buttonBg');

  cursor: pointer;
  user-select: none;

  transition: all .25s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.choice-card:hover {
  background: v-bind('data.colors.buttonHover');
  transform: translateY(-5px);
  box-shadow: 0 10px 22px rgba(0,0,0,.15);
}

.choice-card.active {
  background: v-bind('data.colors.buttonActive');
  border-color: v-bind('data.colors.buttonActive');
  color: v-bind('data.colors.buttonActiveText');
}

.code {
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 12px;
}

.label {
  font-size: 1.05rem;
  font-weight: 600;
  text-align: center;
}
</style>