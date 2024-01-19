import { defineStore } from "pinia"
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import { storage } from '@/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { router } from '@/router/index'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: <any>null,
    users: <any>[],
    resume: '',
    token: localStorage.getItem('token'),
  }),
  actions: {
    async signIn(payload: any) {
      const docRef = doc(db, 'users', payload.uid)
      const userSnapshot = await getDoc(docRef)
      const userInfo = userSnapshot.data()
      if (userInfo && userInfo?.verified) {
        localStorage.setItem('token', payload.accessToken)
        this.token = payload.accessToken
        this.user = { email: payload.email, id: payload.uid, name: payload.displayName, photoURL: payload.photoURL, verified: payload.emailVerified }
        router.go(-1)
      } else if (userInfo) {
        console.info(`Your account isn't verified please check your email (don't forget check spam)`)
      }
    },
    async fetchProfile() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user && user.emailVerified) {
          const docRef = doc(db, 'users', user.uid)
          const userSnapshot = await getDoc(docRef)
          const userInfo = userSnapshot.data()
          if (userInfo) {
            this.user = { email: user.email, id: user.uid, name: user.displayName, telegram: userInfo.telegram, phone: userInfo.phone, github: userInfo.github, linkedin: userInfo.linkedin, photoURL: user.photoURL, verified: userInfo.verified }
          } else {
            this.user = { email: user.email, id: user.uid, name: user.displayName, }
          }
          try {
            const userDirectory = `users/${user.uid}`
            const userRef = ref(storage, userDirectory)
            const url = await getDownloadURL(userRef)
            this.resume = url
          } catch (error) {
            console.error('Error:', error)
          }
        } else {
          this.user = null
          this.resume = ''
        }
      })
    },
    removeResume() {
      this.resume = ''
    },
    async logout() {
      const auth = getAuth()

      try {
        await signOut(auth)
        localStorage.removeItem('token')
        this.token = ''
        this.user = null
        this.resume = ''
        return await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
              unsubscribe()
              resolve()
            }
          })
        })
      } catch (error) {
        console.error('Error during logout:', error)
      }
    }
  }
})
