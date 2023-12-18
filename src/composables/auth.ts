import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()
const db = useFirestore()

export const signWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(getAuth(), provider)
    const colRef = doc(db, 'users', result.user.uid)
    const docSnapshot = await getDoc(colRef)

    if (!docSnapshot.exists()) {
      await setDoc(colRef, {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        verified: true
      })
    }
    await store.signIn(result.user)
    router.push('/')
}
