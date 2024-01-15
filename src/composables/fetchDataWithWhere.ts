import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export const fetchDataWithWhere = async (path: string, field: string, operator: any, value: any) => {
  try {
    const q = query(collection(db, path), where(field, operator, value))
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
