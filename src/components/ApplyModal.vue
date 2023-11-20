<template>
  <section
    @click="$emit('close')"
    class="bottom-0 flex justify-center min-h-screen h-full right-0 modal bg-[#00000080] fixed top-0 left-0 w-[100vw] z-[999]"
  >
    <div class="w-[40%] flex flex-col pt-[50px] max-[600px]:w-[90%] apply-form max-[990px]:pb-[200px]">
      <button
        class="self-end mb-4 transition-all duration-300 text-tg-white hover:text-tg-secondary-color"
        @click="$emit('close')"
      >
        <close-icon />
      </button>
      <div @click.stop class="p-8 overflow-y-auto bg-white rounded-xl">
        <form @submit.prevent>
          <div class="flex flex-col items-center justify-between gap-4">
            <div class="w-[80%] max-[800px]:w-full mb-0">
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
            <div class="mb-6 w-[80%] max-[800px]:w-full">
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
            <!-- <div class="w-[80%] hidden max-[800px]:w-full relative">
              <div class="w-full mb-6">
                <input
                  class="p-2.5 border rounded-lg w-full outline-none"
                  v-model="resume.type"
                  type="text"
                  placeholder="VueJS"
                  autocomplete="off"
                  required
                />
              </div>
              <ul
                v-if="false"
                class="absolute rounded-lg shadow-2xl top-[50px] w-full px-4 bg-white ounded-lg max-[990px]:overflow-y-auto"
              >
                <li
                  class="flex items-center justify-between py-2 transition-all border-b cursor-pointer text-tg-heading-font-color hover:text-tg-body-font-color"
                  v-for="position in positions"
                >
                  <span>{{ position.title }}</span>
                  <check-icon />
                </li>
              </ul>
            </div> -->
            <div class="mb-6 w-[80%] max-[800px]:w-full relative max-[800px]:mb-0">
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
          <div class="w-[80%] max-[800px]:w-full mx-auto flex justify-center">
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

<style scoped>
.apply-form::-webkit-scrollbar {
  display: none;
}

.apply-form {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
