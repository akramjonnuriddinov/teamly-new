import { ref } from 'vue'
import { collection, query, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()

export const fetchData = async (path: string) => {
  const options = ref<any>([])
  try {
    const q = query(collection(db, path))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => {
      const item = ref()
      item.value = doc.data()
      await options.value.push({ ...item.value, id: doc.id })
    })
    return options.value
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}
