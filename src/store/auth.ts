import { defineStore } from "pinia";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { storageRef, storage } from '@/firebase'
import { getDownloadURL, } from 'firebase/storage'
import { log } from "console";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: <any>null,
    users: <any>[],
    resume: '',
    token: localStorage.getItem('token')
  }),
  actions: {
    signIn(payload: any) {
      localStorage.setItem('token', payload.accessToken)
      this.token = payload.accessToken
      this.user = { email: payload.email, id: payload.uid, name: payload.displayName };
    },
    fetchProfile() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = { email: user.email, id: user.uid, name: user.displayName };
          const userDirectory = `users/${user.uid}`
          const fileReference = storageRef(storage, userDirectory)
          const url = await getDownloadURL(fileReference)
          this.resume = url
        } else {
          this.user = null;
          this.resume = ''
        }
      })
    },
    removeResume() {
      this.resume = ''
    },
    logout() {
      localStorage.removeItem('token')
      this.token = ''
      this.user = null;
      this.resume = ''
    }
  }
})
