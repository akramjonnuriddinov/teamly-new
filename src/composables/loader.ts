import { reactive } from 'vue'

interface LoadingState {
  isLoading: boolean
}

const loadingState = reactive<LoadingState>({
  isLoading: true
})

export function showLoader() {
  loadingState.isLoading = true
}

export function hideLoader() {
  loadingState.isLoading = false
}

export function isLoading() {
  return loadingState.isLoading
}