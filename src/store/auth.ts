import { defineStore } from "pinia";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {  storage } from '@/firebase'
import { getDownloadURL, list, ref } from 'firebase/storage'
import { getDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { log } from "console";


const db = useFirestore()

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
          const docRef = doc(db, 'users', user.uid);
          const userSnapshot = await getDoc(docRef);
          const userInfo = userSnapshot.data()
          if (userInfo) {
            this.user = { email: user.email, id: user.uid, name: user.displayName, telegram: userInfo.telegram, phone: userInfo.phone, github: userInfo.github, linkedin: userInfo.linkedin };
          } else {
            this.user = { email: user.email, id: user.uid, name: user.displayName,};
          }
          try {
            const userDirectory = `users/${user.uid}`;
            const userRef = ref(storage, userDirectory);
            const url = await getDownloadURL(userRef);
            this.resume = url;
          } catch (error) {
            // console.error('Ошибка:', error);
          }
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
