import { defineStore } from 'pinia'
import { fetchData } from '@/composables/fetchData'

export const useStatusesStore = defineStore('allStatuses', {
  state: () => ({
    statuses: <any>null
  }),
  actions: {
    async fetchStatuses() {
      if (!this.statuses)
        this.statuses = await fetchData('statuses')
    }
  }
})
