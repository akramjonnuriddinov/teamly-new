import { ref } from 'vue'
import { collection, query, getDocs, limit, startAfter, orderBy } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()

export const fetchDataWithLimit = async (path: string, limitCount: number, lastDoc: any = null) => {
  const options = ref<any>([])
  try {
    let q = query(collection(db, path), orderBy('date', 'desc'), limit(limitCount))

    if (lastDoc) {
      q = query(q, startAfter(lastDoc))
    }

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
