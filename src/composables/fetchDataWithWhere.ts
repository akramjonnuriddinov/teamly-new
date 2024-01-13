import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore'
// import { db } from '@/firebase'
import { useCollection } from 'vuefire'
const db = getFirestore(firebaseApp)
import { firebaseApp } from '@/firebase'

export const fetchDataWithWhere = async (path: string, field: string, operator: any, value: any) => {
  try {
    const todosRef = query(collection(db, path), where(field, operator, value))
    return useCollection(todosRef)
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
