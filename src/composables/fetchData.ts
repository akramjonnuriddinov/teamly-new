import { ref, onMounted } from 'vue'
import { collection, query, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { showLoader, hideLoader } from '@/composables/loader'

const db = useFirestore()

export const fetchData = (options: any, path: string) => {
  onMounted(async () => {
    try {
      showLoader()
      const q = query(collection(db, path))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const item = ref()
        item.value = doc.data()
        options.push({ ...item.value, id: doc.id })
      })
    } catch (error) {
      console.error('Error fetching data: ', error)
    } finally {
      hideLoader()
    }
  })
}