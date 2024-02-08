<template>
  <admin-base-modal :input="props.input" url="about" :old-value="about" modal_title="About">
    <form class="h-auto w-full overflow-y-auto">
      <div class="flex w-full flex-col">
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Fullname</label>
          <input
            v-model="about.title"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>

        <div class="mb-5 flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Position</label>
          <input
            v-model="about.position"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>

        <div class="mb-5 flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Linkedin</label>
          <input
            v-model="about.linkedin"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>

        <div class="relative flex w-[80%] items-center justify-center self-end overflow-hidden">
          <label
            for="dropzone-file"
            class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
          >
            <div class="flex flex-col items-center justify-center pb-6 pt-5">
              <inline-svg class="text-3xl text-gray-500" src="svg /upload.svg" />

              <p class="mb-2 text-sm text-gray-500">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              <img
                v-if="about.image"
                class="absolute top-0 h-full w-full rounded-lg object-cover"
                :src="about.image"
                alt=""
              />
            </div>
            <input id="dropzone-file" @change="uploadImage" type="file" class="hidden" />
          </label>
          <button
            v-if="about.image"
            @click="deleteImage"
            class="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-[3px] bg-gray-900 text-2xl text-white transition-all hover:text-red-500"
            type="button"
          >
            <inline-svg src="svg/close.svg" />
          </button>
        </div>
      </div>
    </form>
  </admin-base-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from '@/components/InlineSvg.vue'
import AdminBaseModal from '@/pages/admin/modals/AdminBaseModal.vue'

const props = defineProps(['input'])
const initialAbout = {
  title: '',
  position: '',
  image: null,
  linkedin: '',
}
const about = ref({
  ...initialAbout,
  ...props.input,
})

const uploadImage = (e: any) => {
  const image = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (event: any) => {
    if (about.value) {
      about.value.image = event.target.result
    }
  }
}

const deleteImage = () => {
  about.value.image = null
}
</script>
