<template>
  <section
    @click="$emit('close')"
    class="h-full bg-[#00000080] min-h-screen flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-[999]"
  >
    <div
      @click.stop
      class="container rounded-xl overflow-y-hidden h-full bg-white relative mx-auto max-w-[520px] w-full"
    >
      <div class="sticky top-0 z-50 flex items-center justify-between w-full px-10 py-5 mb-5 bg-white">
        <h1 class="text-4xl text-center">{{ 'Apply' }}</h1>
        <button @click="$emit('close')" class="transition-all duration-300 text-tg-heading-font-color hover:opacity-80">
          <close-icon class="h-[18px]" />
        </button>
      </div>
      <div class="h-full px-10 overflow-y-auto pb-[150px]">
        <form @submit.prevent>
          <div class="flex flex-col items-center justify-between gap-4">
            <div class="w-full max-[800px]:w-full mb-0">
              <label for="name" class="block mb-2">Full name</label>
              <input
                class="p-2.5 border rounded-lg w-full outline-none"
                v-model="resume.name"
                type="text"
                id="name"
                placeholder="Full name"
                autocomplete="off"
                required
              />
            </div>
            <div class="mb-6 w-full max-[800px]:w-full">
              <label for="text" class="block mb-2">Phone number</label>
              <input
                class="p-2.5 border rounded-lg w-full outline-none"
                v-model="resume.phone"
                type="text"
                id="text"
                placeholder="Phone number"
                autocomplete="off"
                required
              />
            </div>
          </div>
          <div class="flex flex-col-reverse items-center justify-between gap-4">
            <div class="mb-6 w-full max-[800px]:w-full relative">
              <label for="file-input" class="block mb-2">Upload your CV</label>
              <input
                class="block w-full p-3 text-sm border border-gray-200 rounded-md shadow-sm cursor-pointer file:hidden"
                @change="handleFileChange"
                type="file"
                name="file-input"
                id="file-input"
              />
            </div>
          </div>
          <div class="w-full max-[800px]:w-full mx-auto flex justify-center">
            <base-button @click="uploadFile" class="w-full" :size="ESize.SMALL">Submit</base-button>
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
import { useFileDialog } from '@vueuse/core'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'

const storage = useFirebaseStorage()
const mountainFileRef = storageRef(storage, '../assets/images/about/about-img.png')
const { upload } = useStorageFile(mountainFileRef)

const selectedFile = ref(null)
const resume = ref({
  name: '',
  phone: '',
  type: '',
  file: '',
})

const handleFileChange = (event: any) => {
  selectedFile.value = event.target.files[0]
}

const { files } = useFileDialog()
const uploadFile = () => {
  const data = files.value?.item(0)
  if (data) {
    upload(data)
  }
}
</script>
