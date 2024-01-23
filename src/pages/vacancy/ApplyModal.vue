<template>
  <section
    @click="$emit('close')"
    class="fixed left-0 top-0 z-[999] flex h-full w-[100vw] items-center justify-center overflow-y-auto bg-[#00000080] p-10"
  >
    <div @click.stop class="container relative mx-auto h-auto w-full max-w-[500px] overflow-hidden rounded-xl bg-white">
      <div class="sticky top-0 z-50 mb-5 flex w-full items-center justify-between bg-white px-10 py-5">
        <h1 class="text-center text-4xl">Upload your CV</h1>
        <button @click="$emit('close')" class="text-tg-heading-font-color transition-all duration-300 hover:opacity-80">
          <close-icon class="h-[18px]" />
        </button>
      </div>
      <div class="flex h-full w-full overflow-y-auto px-10 pb-10">
        <form class="w-full" @submit.prevent>
          <div class="flex flex-col-reverse items-center justify-between gap-4">
            <div class="relative mb-6 w-full max-[800px]:w-full">
              <label for="file-input" class="mb-2 block"
                >To respond, you need to upload a resume, which will be saved in your profile where you can change
                it</label
              >
              <input
                class="block w-full cursor-pointer rounded-md border border-gray-200 p-3 text-sm shadow-sm file:hidden"
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
            </div>
          </div>
          <div class="mx-auto flex w-full justify-center max-[800px]:w-full">
            <base-button
              @click="$emit('add')"
              class="w-full"
              :disabled="!isActive"
              :is-loading="isLoading"
              :size="ESize.SMALL"
            >
              Submit
            </base-button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import { ESize } from '@/types'
import { uploadBytes } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'
import { useAuthStore } from '@/store/auth'

const emit = defineEmits(['close', 'add'])
const store = useAuthStore()
const isLoading = ref(false)
const selectedFile = ref<any>(null)
const isActive = ref(false)

const handleFileChange = async (event: any) => {
  const userDirectory = `users/${store.user.id}`
  const fileRef = storageRef(storage, userDirectory)
  try {
    isLoading.value = true
    await uploadBytes(fileRef, event.target.files[0])
    isActive.value = true
    store.fetchProfile()
  } catch (error) {
    console.error('Error uploading file: ', error)
  } finally {
    isLoading.value = false
  }
}
</script>
