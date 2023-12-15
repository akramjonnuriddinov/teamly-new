import { collection, query, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()

export const fetchData = async (path: string) => {
  try {
    const q = query(collection(db, path))
    const querySnapshot = await getDocs(q)
    const options = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const item = doc.data()
        return { ...item, id: doc.id }
      })
    )
    return options
  } catch (error) {
    console.error('Error fetching data: ', error)
    return []
  }
}
