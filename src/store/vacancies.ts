import { defineStore } from 'pinia'
import { fetchDataWithWhere } from '@/composables/fetchDataWithWhere'

export const useVacanciesStore = defineStore('vacancies', {
  state: () => ({
    applicationSent: false,
    statusDefault: { color: "#49e4b0", title: "Submitted" },
    status: <any>null
  }),
  actions: {
    updateApplicationSent(value: boolean) {
      this.applicationSent = value
      this.status = this.statusDefault
    },
    async fetchStatus(status_id: string) {
      this.status = await fetchDataWithWhere('statuses', 'id', '==', status_id)
      this.status = this.status[0]
    }
  }
})
