import { defineStore } from 'pinia'
import { fetchData } from '@/composables/fetchData'
import { useAuthStore } from './auth'
const store = useAuthStore()

export const useStatusesStore = defineStore('statuses', {
  state: () => ({
    statuses: <any>null
  }),
  actions: {
    async fetchStatuses() {
      if (!this.statuses && store.user)
        this.statuses = await fetchData('statuses')
    }
  }
})
