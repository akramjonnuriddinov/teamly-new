import { ref } from 'vue'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()

export const fetchDataWithLimit = async (path: string, conditions = [], customLimit = 10) => {
  const options = ref<any>([])
  try {
    let q = query(collection(db, path));

    // Apply where conditions
    conditions.forEach((condition) => {
      const { field, operator, value } = condition
      q = query(q, where(field, operator, value))
    })

    // Apply default or custom limit
    q = query(q, limit(customLimit))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const item = ref()
      item.value = doc.data()
      options.value.push({ ...item.value, id: doc.id })
    })

    return options.value
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}
