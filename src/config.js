import { reactive, watch } from 'vue'

export const config = reactive({
  door: '',
  wall: '',
  type: '',
  mode: 'fixed',
  width: '',
  height: ''
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
