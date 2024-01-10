import { defineStore } from 'pinia'
import { fetchData } from '@/composables/fetchData'

export const useVacanciesStore = defineStore('vacancies', {
  state: () => ({
    applicationSent: false,
    statusDefault: { color: "#49e4b0", title: "Submitted" },
    status: <any>null,
    statuses: <any>null
  }),
  actions: {
    updateApplicationSent(value: boolean) {
      this.applicationSent = value
      this.status = this.statusDefault
    },
    async fetchStatus(status_id: string) {
      if (!this.statuses) {
        this.statuses = await fetchData('statuses')
      }
      this.status = (this.statuses.filter((item: any) => item.id === status_id))[0]
    }
  }
})
