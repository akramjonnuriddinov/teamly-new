import { defineStore } from 'pinia'
import { fetchDataWithWhere } from '@/composables/fetchDataWithWhere'
import { useAuthStore } from './auth'
const store = useAuthStore()

export const useAppliersStore = defineStore('allAppliers', {
  state: () => ({
    appliers: <any>null
  }),
  actions: {
    async fetchAppliers() {
      if (!this.appliers)
        this.appliers = (await fetchDataWithWhere('appliers', 'user_id', '==', store.user.id))
    }
  }
})
