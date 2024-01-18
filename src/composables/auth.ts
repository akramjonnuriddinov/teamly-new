import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { setDoc, doc, getDoc, collection, addDoc, getFirestore } from 'firebase/firestore'
import { useAuthStore } from '@/store/auth'
import { firebaseApp } from '@/firebase/index'
import { db } from '@/firebase/index'

const store = useAuthStore()
const firestore = getFirestore(firebaseApp)
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
}

export const sendMailMessage = async (email: any, id: any) => {
  try {
    const mailCollection = collection(firestore, 'mail')
    const currentDate = new Date()
    const dateTime = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      hours: currentDate.getHours(),
      minutes: currentDate.getMinutes(),
      seconds: currentDate.getSeconds()
    }

    const verifyLink = `${window.location.origin}/verify?id=${id}`
    const data = {
      to: email,
      message: {
        subject: 'Verify your email for Teamly.uz',
        html: `
          <h1>Hello,</h1>
          <p>111We received a request to sign in to Teamly.uz using this email address, at ${dateTime.year}-${dateTime.month}-${dateTime.day} ${dateTime.hours}:${dateTime.minutes}:${dateTime.seconds}. If you want to sign in with your ${email} account, click this <br> <a href="${verifyLink}">link</a>.</p>
          <img src="https://media.licdn.com/dms/image/D4D3DAQEOUK939l3CAA/image-scale_191_1128/0/1693891453607/teamly_uz_cover?e=2147483647&v=beta&t=rm4pmArgwdoeuCen8YkujxA4-jSMtqJI9UvJEVAjRDA" alt="Teamly Logo" style="display:block; width: 200px; height: auto;">
        `
      }
    }

    await addDoc(mailCollection, data)
  } catch (error) {
    console.error('Error adding data to Firestore: ', error)
  }
}
