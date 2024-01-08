import { doc, getDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { db } from '@/firebase'

export const useVacanciesStore = defineStore('vacancies', {
  state: () => ({
    applicationSent: false,
    statusDefault: { color: "#49e4b0", title: "Submitted" },
    status: <any>null
  }),
  actions: {
    updateApplicationSent(value: boolean) {
      this.applicationSent = value;
      this.status = this.statusDefault
    },
    async fetchStatus(status_id: string) {
      const documentPath = `statuses/${status_id}`
      const docRef = doc(db, documentPath)
      const docSnapshot = await getDoc(docRef)
      this.status = docSnapshot.data()
    }
  }
})
