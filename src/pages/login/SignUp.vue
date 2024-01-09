<template>
  <section class="bg-[#F9F9FA]">
    <div class="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">

      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">Sign up</h1>
            <p class="mt-2 text-sm text-gray-600">
              Already have an account?
              <router-link
              to="/sign-in"
                class="cursor-pointer text-[#7e54f8] decoration-2 hover:underline font-medium"
              >
                Sign in here
              </router-link>
            </p>
          </div>
          <div v-if="isVerification">
            <div class="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
              <p class="font-bold">Verification Link Sent!</p>
              <p>We've sent a verification link to your email address. Please check your inbox and follow the link to verify.</p>
              <a class="text-[#3498db] underline" href="https://mail.google.com/" target="_blank">Check your email</a>
            </div>
          </div>
          <div v-else>
            <button
            @click="signWithGoogle"
            type="button"
            class="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg class="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            Sign up with Google
          </button>
          <div
            class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6"
          >
            Or
          </div>
          <form @submit.prevent class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your name</label>
              <input
                v-model="newUser.name"
                type="text"
                required
                name="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input
                v-model="newUser.email"
                type="email"
                required
                name="email"
                placeholder="name@company.com"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :class="{ 'border-red-500': isError }"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                v-model="newUser.password"
                type="password"
                required
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :class="{ 'border-red-500': isError }"
              />
              <p v-if="isError" class="text-red-500">Somthing get wrong, please try again</p>
            </div>
            <base-button
              @click="signUp()"
              type="submit"
              :is-loading="isLoading"
              class="bg-[#7e54f8] w-full h-[52px]"
            >
              Sign up
            </base-button>
          </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFirestore } from 'vuefire'
import { setDoc, doc } from 'firebase/firestore'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { signWithGoogle, sendMailMessage } from '@/composables/auth'
import BaseButton from '@/components/reusables/BaseButton.vue'

const db = useFirestore()
const isVerification = ref(false)
const isError = ref(false)
const isLoading = ref(false)
const newUser = ref({
  email: '',
  name: '',
  password: '',
})

const signUp = async (): Promise<void> => {
  try {
    isLoading.value = true
    const auth = getAuth()
    if (newUser.value.email && newUser.value.name && newUser.value.password) {
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.value.email, newUser.value.password)
      const user = userCredential.user
      await updateProfile(user, {
        displayName: newUser.value.name,
      })
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const newUser = ref({
            id: user.uid,
            name: user.displayName,
            email: user.email,
            verified: false
          })
          const colRef = doc(db, 'users', user.uid)
          setDoc(colRef, newUser.value)
          await sendMailMessage(newUser.value.email, newUser.value.id)
          isVerification.value = true
          isLoading.value = false
        }
      })
    }
  } catch (error) {
    isError.value = true
    setTimeout(() => {
     return isError.value = false
    }, 3000);
    newUser.value.name = ''
    newUser.value.email = ''
    newUser.value.password = ''
    isLoading.value = false
  }
}
</script>
