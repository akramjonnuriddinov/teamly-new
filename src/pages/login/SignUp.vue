<template>
  <section class="bg-[#F9F9FA]">
    <div class="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="text-center">
            <h2 class="block text-2xl font-bold text-gray-800">Sign up</h2>
            <p class="mt-2 text-sm text-gray-600">
              Already have an account?
              <router-link to="/sign-in" class="cursor-pointer text-[#7e54f8] decoration-2 hover:underline font-medium">
                Sign in here
              </router-link>
            </p>
          </div>
          <div v-if="isVerification">
            <div class="p-4 text-yellow-700 bg-yellow-200 border-l-4 border-yellow-500" role="alert">
              <p class="font-bold">Verification Link Sent!</p>
              <p>
                We've sent a verification link to your email address. Please check your inbox and follow the link to
                verify.
              </p>
              <a class="text-[#3498db] underline" href="https://mail.google.com/" target="_blank">Check your email</a>
            </div>
          </div>
          <div v-else>
            <button
              @click="handleSignWithGoogle"
              :is-loading="isLoading"
              type="button"
              class="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            >
              <inline-svg src="fontawesome/google.svg" />
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
              <base-button @click="signUp()" type="submit" :is-loading="isLoading" class="bg-[#7e54f8] w-full h-[52px]">
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
import { setDoc, doc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { signWithGoogle, sendMailMessage } from '@/composables/auth'
import BaseButton from '@/components/BaseButton.vue'
import { db } from '@/firebase'
import InlineSvg from '@/components/InlineSvg.vue'

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
            verified: false,
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
      return (isError.value = false)
    }, 3000)
    newUser.value.name = ''
    newUser.value.email = ''
    newUser.value.password = ''
    isLoading.value = false
  }
}

const handleSignWithGoogle = async () => {
  isLoading.value = true
  await signWithGoogle()
  isLoading.value = false
}
</script>
