import { ref } from 'vue'

export const isDisabled = (obj: any) => {
  const isDisabled = ref(false)
  for (const [_, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (value.trim() === '') {
        isDisabled.value = true
      }
    }
    if (typeof value === 'object') {
      if (value === null) {
        isDisabled.value = true
      }
    }
  }
  return isDisabled.value
}