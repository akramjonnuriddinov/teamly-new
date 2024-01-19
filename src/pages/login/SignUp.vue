<template>
  <section class="mt-[86px] bg-[#F9F9FA]">
    <div class="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <div class="text-center">
            <h2 class="block text-2xl font-bold text-gray-800">Sign up</h2>
            <p class="mt-2 text-sm text-gray-600">
              Already have an account?
              <router-link to="/sign-in" class="cursor-pointer font-medium text-[#7e54f8] decoration-2 hover:underline">
                Sign in here
              </router-link>
            </p>
          </div>
          <div v-if="isVerification">
            <div class="border-l-4 border-yellow-500 bg-yellow-200 p-4 text-yellow-700" role="alert">
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
              class="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
            >
              <inline-svg src="fontawesome/google.svg" />
              Sign up with Google
            </button>
            <div
              class="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200"
            >
              Or
            </div>
            <form @submit.prevent class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="name" class="mb-2 block text-sm font-medium text-gray-900">Your name</label>
                <input
                  v-model="newUser.name"
                  type="text"
                  required
                  name="name"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                />
              </div>
              <div>
                <label for="email" class="mb-2 block text-sm font-medium text-gray-900">Your email</label>
                <input
                  v-model="newUser.email"
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
                  v-model="newUser.password"
                  type="password"
                  required
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  :class="{ 'border-red-500': isError }"
                />
                <p v-if="isError" class="text-red-500">Somthing get wrong, please try again</p>
              </div>
              <base-button
                @click="signUp()"
                type="submit"
                :is-loading="isLoading"
                :disabled="disabled"
                class="h-[52px] w-full bg-[#7e54f8]"
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
import { ref, computed } from 'vue'
import { setDoc, doc } from 'firebase/firestore'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  sendSignInLinkToEmail,
  sendEmailVerification,
} from 'firebase/auth'
import { signWithGoogle, sendMailMessage } from '@/composables/auth'
import BaseButton from '@/components/BaseButton.vue'
import { db } from '@/firebase'
import InlineSvg from '@/components/InlineSvg.vue'
import { isDisabled } from '@/composables/isDisabled'

const isVerification = ref(false)
const isError = ref(false)
const isLoading = ref(false)
const newUser = ref({
  email: '',
  name: '',
  password: '',
})

const disabled = computed(() => {
  return isDisabled(newUser.value)
})

const signUp = async (): Promise<void> => {
  try {
    isLoading.value = true
    const auth = getAuth()

    if (newUser.value.email && newUser.value.name && newUser.value.password) {
      const userCredential: any = await createUserWithEmailAndPassword(
        auth,
        newUser.value.email,
        newUser.value.password,
      )
      const id = userCredential.user.uid
      const actionCodeSettings = {
        url: `${window.location.origin}/verify?id=${id}`,
        handleCodeInApp: true,
      }

      sendSignInLinkToEmail(auth, newUser.value.email, actionCodeSettings)
      const user = userCredential.user

      sendEmailVerification(user, actionCodeSettings)

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
          isVerification.value = true // bu kod tepparoqda true bo'lishi kerak
          isLoading.value = false // bu kod tepparoqda false bolishi kerak
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
