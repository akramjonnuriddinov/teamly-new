import { reactive } from 'vue';

const loadingState = reactive({
  isLoading: false,
});

export function showLoader() {
  loadingState.isLoading = true;
}

export function hideLoader() {
  loadingState.isLoading = false;
}

export function isLoading() {
  return loadingState.isLoading;
}
