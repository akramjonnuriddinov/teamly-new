import { addDoc, collection } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()

export const vacancyApply = async (userID: string, id: any) => {
  const ref = collection(db, 'appliers')
  const data = {
    user_id: userID,
    status_id: null,
    vacancy_id: id,
  }
  await addDoc(ref, data)

}
