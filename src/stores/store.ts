import { ref } from 'vue'
import { defineStore } from 'pinia'

const useBgAnimStore = defineStore('bgAnim', () => {
  const bgAnim = ref(true)
  function flip() {
    bgAnim.value = !bgAnim.value
  }
  return { bgAnim, flip }
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {
  useBgAnimStore,
  sleep
}