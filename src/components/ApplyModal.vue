<template>
  <section
    @click="$emit('close')"
    class="h-full bg-[#00000080] flex justify-center overflow-y-auto items-start p-10 fixed top-0 left-0 w-[100vw] z-[999]"
  >
    <div @click.stop class="container rounded-xl overflow-hidden h-auto bg-white relative mx-auto max-w-[500px] w-full">
      <div class="sticky top-0 z-50 flex items-center justify-between w-full px-10 py-5 mb-5 bg-white">
        <h1 class="text-4xl text-center">{{ 'Apply' }}</h1>
        <button @click="$emit('close')" class="transition-all duration-300 text-tg-heading-font-color hover:opacity-80">
          <close-icon class="h-[18px]" />
        </button>
      </div>
      <div class="flex w-full h-full px-10 pb-10 overflow-y-auto">
        <form class="w-full" @submit.prevent>
          <div class="flex flex-col-reverse items-center justify-between gap-4">
            <div class="mb-6 w-full max-[800px]:w-full relative">
              <label for="file-input" class="block mb-2"
                >To respond, you need to upload a resume, which will be saved in your profile where you can change
                it</label
              >
              <input
                class="block w-full p-3 text-sm border border-gray-200 rounded-md shadow-sm cursor-pointer file:hidden"
                @change="handleFileChange"
                accept=".docx,.pdf,.txt"
                type="file"
                name="file-input"
                id="file-input"
              />
            </div>
          </div>
          <div class="w-full max-[800px]:w-full mx-auto flex justify-center">
            <base-button
              @click="add"
              class="w-full"
              :disabled="!selectedFile"
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
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize } from '@/types'
import { uploadBytes } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useAuthStore } from '@/store/auth'

const emit = defineEmits(['close'])
const props = defineProps(['vacancyId'])

const store = useAuthStore()
const isLoading = ref(false)
const db = useFirestore()
const selectedFile = ref<any>(null)

const add = async () => {
  try {
    isLoading.value = true
    const ref = collection(db, 'appliers')
    const data = {
      user_id: store.user.id,
      status_id: null,
      vacancy_id: props.vacancyId,
    }
    await addDoc(ref, data)

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
  } catch (error) {
    console.error('Error adding resume...')
  } finally {
    isLoading.value = false
    emit('close')
  }
}

const handleFileChange = (event: any) => {
  selectedFile.value = event.target.files[0]
}
</script>

