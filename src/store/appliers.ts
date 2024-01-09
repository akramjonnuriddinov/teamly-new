import { defineStore } from 'pinia'
import { fetchData } from '@/composables/fetchData'

export const useAppliersStore = defineStore('allAppliers', {
  state: () => ({
    appliers: <any>null
  }),
  actions: {
    async fetchVacancy() {
      if (!this.appliers)
        this.appliers = await fetchData('appliers')
    }
  }
})
