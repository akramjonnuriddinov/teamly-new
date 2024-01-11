<template>
  <div class="relative border-b border-gray-300 pb-[135px]">
    <div class="mb-7">
      <h1 class="text-[20px] font-medium">Personal information</h1>
      <span class="text-sm text-gray-400">Your main profile information</span>
    </div>
    <div v-if="isLoading">
      <div class="flex justify-between">
        <div class="flex w-[400px] flex-col">
          <label class="mb-2"><Skeleton width="30%" height="20px" :theme="ESkeletonTheme.DARK" /></label>
          <Skeleton width="100%" height="42px" :theme="ESkeletonTheme.DARK" />
        </div>
        <div class="flex w-[400px] flex-col">
          <label class="mb-2"><Skeleton width="30%" height="20px" :theme="ESkeletonTheme.DARK" /></label>
          <Skeleton width="100%" height="42px" :theme="ESkeletonTheme.DARK" />
        </div>
      </div>
      <div class="mt-5 flex justify-between">
        <div class="flex w-[400px] flex-col">
          <label class="mb-2"><Skeleton width="30%" height="20px" :theme="ESkeletonTheme.DARK" /></label>
          <Skeleton width="100%" height="42px" :theme="ESkeletonTheme.DARK" />
        </div>
        <div class="flex w-[400px] flex-col">
          <label class="mb-2"><Skeleton width="30%" height="20px" :theme="ESkeletonTheme.DARK" /></label>
          <Skeleton width="100%" height="42px" :theme="ESkeletonTheme.DARK" />
        </div>
      </div>
      <div class="mt-5 flex justify-between">
        <div class="flex w-[400px] flex-col">
          <label class="mb-2"><Skeleton width="30%" height="20px" :theme="ESkeletonTheme.DARK" /></label>
          <Skeleton width="100%" height="42px" :theme="ESkeletonTheme.DARK" />
        </div>
        <div class="flex w-[400px] flex-col">
          <label class="mb-2"><Skeleton width="30%" height="20px" :theme="ESkeletonTheme.DARK" /></label>
          <Skeleton width="100%" height="42px" :theme="ESkeletonTheme.DARK" />
        </div>
      </div>
      <div class="absolute right-0 mt-7">
        <Skeleton width="250px" height="40px" :theme="ESkeletonTheme.DARK" />
      </div>
    </div>
    <div v-else>
      <div class="flex flex-wrap justify-between space-y-2">
        <div class="flex w-[400px] flex-col">
          <label for="name" class="mb-2 block text-sm font-medium text-gray-900">Your name</label>
          <input
            type="text"
            required
            name="name"
            @input="updateValue($event, 'name')"
            v-model="user.name"
            placeholder="name"
            class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
        </div>
        <div class="flex w-[400px] flex-col">
          <label for="email" class="mb-2 block text-sm font-medium text-gray-900">Email address</label>
          <input
            type="email"
            required
            disabled
            v-model="user.email"
            placeholder="email@company.com"
            class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 opacity-70 sm:text-sm"
          />
        </div>
      </div>
      <div class="mt-5 flex flex-wrap justify-between space-y-2">
        <div class="flex w-[400px] flex-col">
          <label for="git" class="mb-2 block text-sm font-medium text-gray-900">Your GitHub</label>
          <input
            type="text"
            name="git"
            @input="updateValue($event, 'github')"
            v-model="user.github"
            placeholder="link"
            class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
        </div>
        <div class="flex w-[400px] flex-col">
          <label for="linkedin" class="mb-2 block text-sm font-medium text-gray-900">Your Linkedin</label>
          <input
            type="text"
            name="linkedin"
            @input="updateValue($event, 'linkedin')"
            v-model="user.linkedin"
            placeholder="link"
            class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 opacity-70 sm:text-sm"
          />
        </div>
      </div>
      <div class="mt-5 flex flex-wrap justify-between space-y-2">
        <div class="flex w-[400px] flex-col">
          <label for="telegram" class="mb-2 block text-sm font-medium text-gray-900">Your telegram</label>
          <input
            type="text"
            name="telegram"
            @input="updateValue($event, 'telegram')"
            v-model="user.telegram"
            placeholder="username"
            class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
          />
        </div>
        <div class="flex w-[400px] flex-col">
          <label for="phone" class="mb-2 block text-sm font-medium text-gray-900">Your phone</label>
          <input
            type="text"
            name="phone"
            @input="updateValue($event, 'phone')"
            v-model="user.phone"
            placeholder="number"
            class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 opacity-70 sm:text-sm"
          />
        </div>
      </div>
      <base-button
        @click="updateProfileInformation"
        :is-loading="isLoadingProfile"
        :theme="EThemes.DEFAULT"
        class="btn absolute right-0 mt-[35px] rounded-lg bg-[#7e54f8] text-sm text-white"
      >
        Update profile information
      </base-button>
    </div>
  </div>
  <div class="mt-5 flex min-h-fit w-full max-w-[400px] flex-col">
    <div class="relative mb-6 w-full max-[800px]:w-full">
      <label for="file-input" class="mb-2 block text-sm font-medium text-gray-900">Upload your CV</label>
      <input
        class="block w-full cursor-pointer rounded-md border border-gray-300 p-3 text-sm text-gray-900 shadow-sm file:hidden"
        @change="handleFileChange"
        :class="{ hidden: !selectedFile }"
        accept=".docx,.pdf"
        type="file"
        name="file-input"
        id="file-input"
      />
      <label
        :class="{ hidden: selectedFile }"
        for="file-input"
        class="block w-full cursor-pointer rounded-md border border-gray-200 p-3 text-sm shadow-sm"
        >Select file (.docx,.pdf)</label
      >
      <div
        v-if="store.resume && !isLoadingResume"
        @click="showResume"
        class="my-5 w-[220px] cursor-pointer rounded-lg border border-gray-300 bg-[#F5F7FB] px-8 py-4"
      >
        <div class="flex items-center justify-between">
          <span class="truncate text-base font-medium text-[#07074D]"> your resume </span>
          <inline-svg fill="none" src="fontawesome/file.svg" />
          <button @click.stop="deleteResume" class="ml-5 text-[#07074D]">
            <inline-svg src="fontawesome/xmark.svg" />
          </button>
        </div>
      </div>
      <div class="my-8 ml-20" v-if="isLoadingResume">
        <button-loader color="#7e54f8" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ButtonLoader from '@/components/ButtonLoader.vue'
import { getAuth, updateProfile } from 'firebase/auth'
import { storageRef, storage } from '@/firebase'
import { db } from '@/firebase'
import { EThemes } from '@/types'
import { uploadBytes, deleteObject, ref as fireRef } from 'firebase/storage'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { setDoc, doc } from 'firebase/firestore'
import { useAuthStore } from '@/store/auth'
import InlineSvg from '@/components/InlineSvg.vue'

const isLoading = ref(false)
const store = useAuthStore()
const user = ref({
  ...store.user,
})
const currentUser = getAuth().currentUser
const updatedUser = ref({
  ...user.value,
})

watch(
  () => store.user,
  (newValue) => {
    user.value = { ...newValue, date: Date.now() }
    isLoading.value = false
  },
  {
    immediate: true,
  },
)

onMounted(async () => {
  store.fetchProfile()
  if (!store.user) {
    isLoading.value = true
  }
})

const selectedFile = ref<any>(null)
const isLoadingResume = ref(false)
const isLoadingProfile = ref(false)

const handleFileChange = async (event: any) => {
  selectedFile.value = event.target.files[0]
  if (selectedFile.value) {
    isLoadingResume.value = true
    const userDirectory = `users/${store.user.id}`
    const fileRef = storageRef(storage, userDirectory)
    try {
      await uploadBytes(fileRef, selectedFile.value)
      store.fetchProfile()
    } catch (error) {
      console.error('Error uploading file: ', error)
    } finally {
      isLoadingResume.value = false
    }
  }
}

const deleteResume = async () => {
  const desertRef = fireRef(storage, `users/${store.user.id}`)
  await deleteObject(desertRef)
  store.removeResume()
  selectedFile.value = null
}

const showResume = () => {
  window.open(store.resume, '_blank')
}

const updateValue = (event: any, slug: string) => {
  const newValue = event.target.value
  updatedUser.value[slug] = newValue
}

const updateProfileInformation = async () => {
  if (currentUser !== null) {
    try {
      isLoadingProfile.value = true
      await updateProfile(currentUser, { displayName: updatedUser.value.name })
      const colRef = doc(db, 'users', updatedUser.value.id)
      setDoc(colRef, updatedUser.value)
      store.fetchProfile()
    } catch (error) {
      console.error(error)
    } finally {
      isLoadingProfile.value = false
    }
  }
}
</script>

<style scoped>
.btn {
  position: absolute;
  width: 250px;
  height: 40px;
  padding: 8px 30px;
}
</style>
