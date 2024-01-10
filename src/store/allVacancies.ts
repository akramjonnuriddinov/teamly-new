import { defineStore } from 'pinia'
import { fetchData } from '@/composables/fetchData'

export const useAllVacanciesStore = defineStore('allVacancies', {
  state: () => ({
    vacancies: <any>null
  }),
  actions: {
    async fetchVacancy() {
      if (!this.vacancies)
        this.vacancies = await fetchData('vacancies')
    }
  }
})
