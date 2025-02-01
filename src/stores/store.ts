import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBgAnimStore = defineStore('bgAnim', () => {
  const bgAnim = ref(true)
  function flip() {
    bgAnim.value = !bgAnim.value
  }
  return { bgAnim, flip }
})
