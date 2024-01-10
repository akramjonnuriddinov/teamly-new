<template>
  <section class="bg-[#F9F9FA]">
    <div class="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
      <div v-if="isCreated" class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">Sign in</h1>
            <p class="mt-2 text-sm text-gray-600">
              Don't have an account yet?
              <router-link to="/sign-up" class="cursor-pointer text-[#7e54f8] decoration-2 hover:underline font-medium">
                Sign up here
              </router-link>
            </p>
          </div>
          <button
            @click="handleSignWithGoogle"
            type="button"
            class="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            <inline-svg src="fontawesome/google.svg" />
            Sign in with Google
          </button>
          <div
            class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6"
          >
            Or
          </div>
          <form @submit.prevent class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input
                v-model="user.email"
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
                v-model="user.password"
                type="password"
                required
                name="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                :class="{ 'border-red-500': isError }"
              />
              <p v-if="isError && !errorMessage" class="text-red-500">Please write your correct email & password</p>
              <p v-else-if="isError" class="text-red-500">{{ errorMessage }}</p>
            </div>
            <base-button @click="signIn" type="submit" :is-loading="isLoading" class="bg-[#7e54f8] w-full h-[52px]">
              Sign in
            </base-button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { signWithGoogle } from '@/composables/auth'
import BaseButton from '@/components/BaseButton.vue'
import InlineSvg from '@/components/InlineSvg.vue'

const store = useAuthStore()
const isCreated = ref(true)
const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')
const user = ref({
  email: '',
  password: '',
})

const signIn = async () => {
  try {
    isLoading.value = true
    if (user.value.email && user.value.password) {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, user.value.email, user.value.password)
      const response = await store.signIn(userCredential.user)
      if (response) {
        errorMessage.value = response
        errorHandler()
      }
    }
  } catch {
    errorHandler()
  } finally {
    isLoading.value = false
  }
}

const handleSignWithGoogle = async () => {
  isLoading.value = true
  await signWithGoogle()
  isLoading.value = false
}

const errorHandler = () => {
  isError.value = true
  setTimeout(() => {
    isError.value = false
    errorMessage.value = ''
  }, 3000)
}
</script>
