import { reactive, watch } from 'vue'

export const config = reactive({
  door: '',
  wall: '',
  type: '',
  mode: 'fixed',
  width: '',
  height: '',
  currentStep: '/door-thickness'
})

watch(
  config,
  (newVal) => {
    localStorage.setItem('doorConfig', JSON.stringify(newVal))
  },
  { deep: true }
)

export function loadConfig() {
  const saved = JSON.parse(localStorage.getItem('doorConfig'))
  if (saved) Object.assign(config, saved)
}

export function resetConfig() {
  localStorage.removeItem('doorConfig')
  config.door = ''
  config.wall = ''
  config.type = ''
  config.mode = 'fixed'
  config.width = ''
  config.height = ''
  config.currentStep = '/door-thickness'
}
