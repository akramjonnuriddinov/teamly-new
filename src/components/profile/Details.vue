<template>
  <div class="relative pb-[135px] border-b border-gray-300">
    <div class="mb-7">
      <h1 class="text-[20px] font-medium">Personal information</h1>
      <span class="text-sm text-gray-400">Your main profile information</span>
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col w-[400px]">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your name</label>
        <input
          type="text"
          required
          name="name"
          @input="updateFirebaseName"
          v-model="user.name"
          placeholder="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
      </div>
      <div class="flex flex-col w-[400px]">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email address</label>
        <input
          type="email"
          required
          @input="updateFirebaseEmail"
          v-model="user.email"
          placeholder="email@company.com"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        />
      </div>
    </div>

    <div class="flex flex-col w-[400px] mt-5">
      <div class="mb-6 w-full max-[800px]:w-full relative">
        <label for="file-input" class="block mb-2 text-sm font-medium text-gray-900">Upload your CV</label>
        <input
          class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm cursor-pointer file:hidden"
          @change="handleFileChange"
          accept=".docx,.pdf,.txt"
          type="file"
          name="file-input"
          id="file-input"
        />
        <div
          v-if="store.resume"
          @click="showResume"
          class="my-5 cursor-pointer rounded-lg border-gray-300 border w-[200px] bg-[#F5F7FB] py-4 px-8"
        >
          <div class="flex items-center justify-between">
            <span class="truncate text-base font-medium text-[#07074D]"> your resume </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="updateProfileInformation"
      class="w-[250px] transition-all duration-300 bg-tg-primary-color text-tg-white hover:bg-tg-secondary-color absolute right-0 bg-[#7e54f8] text-white mt-[35px] focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-[30px] py-[8px] text-center"
    >
      Update profile information
    </button>
  </div>
</template>

<script setup lang="ts">
import { getAuth, updateProfile, updateEmail } from 'firebase/auth'
import { storageRef, storage } from '@/firebase'
import { useFirestore } from 'vuefire'
import { uploadBytes } from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const store = useAuthStore()
const db = useFirestore()
const user = ref({
  ...store.user,
})
const currentUser = getAuth().currentUser
const updatedUser = ref({
  ...user.value,
})

const selectedFile = ref<any>(null)

const handleFileChange = (event: any) => {
  selectedFile.value = event.target.files[0]
}

const showResume = () => {
  window.open(store.resume, '_blank')
}

const updateFirebaseName = (event: any) => {
  const newValue = event.target.value
  updatedUser.value.name = newValue
}

const updateFirebaseEmail = (event: any) => {
  const newValue = event.target.value
  updatedUser.value.email = newValue
}

const updateProfileInformation = async () => {
  console.log(updatedUser.value)
  try {
    if (currentUser !== null) {
      await updateProfile(currentUser, { displayName: updatedUser.value.name })
      await updateEmail(currentUser, updatedUser.value.email)
      const colRef = doc(db, 'users', updatedUser.value.id)
      setDoc(colRef, updatedUser.value)
      if (selectedFile.value) {
        const userDirectory = `users/${store.user.id}`
        const fileRef = storageRef(storage, userDirectory)
        try {
          await uploadBytes(fileRef, selectedFile.value)
          store.fetchProfile()
        } catch (error) {
          console.error('Error uploading file: ', error)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
