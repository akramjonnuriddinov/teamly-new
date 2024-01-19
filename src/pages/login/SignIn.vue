<template>
  <section class="mt-[86px] bg-[#F9F9FA]">
    <div class="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div v-if="isCreated" class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">Sign in</h1>
            <p class="mt-2 text-sm text-gray-600">
              Don't have an account yet?
              <router-link to="/sign-up" class="cursor-pointer font-medium text-[#7e54f8] decoration-2 hover:underline">
                Sign up here
              </router-link>
            </p>
          </div>
          <button
            @click="handleSignWithGoogle"
            type="button"
            class="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
          >
            <inline-svg src="fontawesome/google.svg" />
            Sign in with Google
          </button>
          <div
            class="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200"
          >
            Or
          </div>
          <form @submit.prevent class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-gray-900">Your email</label>
              <input
                v-model="user.email"
                type="email"
                required
                name="email"
                placeholder="name@company.com"
                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                :class="{ 'border-red-500': isError }"
              />
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium text-gray-900">Password</label>
              <input
                v-model="user.password"
                type="password"
                required
                name="password"
                placeholder="••••••••"
                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                :class="{ 'border-red-500': isError }"
              />
              <p v-if="isError && !errorMessage" class="text-red-500">Please write your correct email & password</p>
              <p v-else-if="isError" class="text-red-500">{{ errorMessage }}</p>
            </div>
            <div
              v-if="!isVerification"
              class="border-l-4 border-yellow-500 bg-yellow-200 p-4 text-yellow-700"
              role="alert"
            >
              <p class="font-bold">Your email has not been verified.</p>
              <a class="text-[#3498db] underline" href="https://mail.google.com/" target="_blank">Check your email</a>
            </div>
            <base-button
              @click="signIn"
              type="submit"
              :is-loading="isLoading"
              :disabled="disabled"
              class="h-[52px] w-full bg-[#7e54f8]"
            >
              Sign in
            </base-button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { signWithGoogle } from '@/composables/auth'
import BaseButton from '@/components/BaseButton.vue'
import InlineSvg from '@/components/InlineSvg.vue'
import { isDisabled } from '@/composables/isDisabled'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useAuthStore()
const isCreated = ref(true)
const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')
const user = ref({
  email: '',
  password: '',
})
const isVerification = ref(true)

const disabled = computed(() => {
  return isDisabled(user.value)
})

const signIn = async () => {
  try {
    isLoading.value = true
    if (user.value.email && user.value.password) {
      const auth = getAuth()
      const userCredential: any = await signInWithEmailAndPassword(auth, user.value.email, user.value.password)
      isVerification.value = userCredential.user.emailVerified
      console.log(userCredential.user)
      console.log(isVerification.value)
      const response = (await store.signIn(userCredential.user)) as any
      if (response) {
        errorMessage.value = response
        errorHandler()
      }
    }
  } catch {
    errorHandler()
  } finally {
    isLoading.value = false
    if (isVerification.value) router.push('/')
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
