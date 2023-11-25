import { reactive } from 'vue'

interface LoadingState {
  isLoading: boolean,
  isSubmitting: boolean
}

const loadingState = reactive<LoadingState>({
  isLoading: true,
  isSubmitting: false
})

export function toggleLoader(status = false) {
  loadingState.isLoading = status
}

export function toggleSubmitting(status = false) {
  loadingState.isSubmitting = status
}

export function isLoading() {
  return loadingState.isLoading
}

export function isSubmitting() {
  return loadingState.isSubmitting
}