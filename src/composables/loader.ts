import { reactive } from 'vue'

interface LoadingState {
  isLoading: boolean,
}

const loadingState = reactive<LoadingState>({
  isLoading: true,
})

export function toggleLoader(status = false) {
  loadingState.isLoading = status
}

export function isLoading() {
  return loadingState.isLoading
}
