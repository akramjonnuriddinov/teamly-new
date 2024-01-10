import { defineStore } from 'pinia'
import { fetchData } from '@/composables/fetchData'
import { useAuthStore } from './auth'
const store = useAuthStore()

export const useAppliersStore = defineStore('allAppliers', {
  state: () => ({
    appliers: <any>null
  }),
  actions: {
    async fetchAppliers() {
      if (!this.appliers)
        this.appliers = (await fetchData('appliers')).filter((item: any) => item.user_id === store.user.id)
    }
  }
})
