import { defineStore } from "pinia";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: <any>null,
        users: <any>[],
        token: localStorage.getItem('token')
    }),
    actions: {
        signIn(payload: any) {
            localStorage.setItem('token', payload.accessToken)
            this.token = payload.accessToken
        },
        fetchProfile() {
          const auth = getAuth();
          onAuthStateChanged(auth, async (user) => {
          if (user) {
              this.user = {email: user.email, id: user.uid, name: user.displayName};
          } else {
              this.user = null;
          }
        })
      },
        logout() {
            localStorage.removeItem('token')
            this.token = ''
            this.user = null;
        }
    }
})
