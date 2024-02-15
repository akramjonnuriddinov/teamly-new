<template>
  <admin-base-modal :input="props.input" url="portfolio" :old-value="portfolio" modal_title="Portfolio">
    <form class="h-auto w-full overflow-y-auto">
      <div class="flex w-full flex-col">
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Title</label>
          <input
            v-model="portfolio.title"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="category">Category</label>
          <input
            v-model="portfolio.category"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="link">Link</label>
          <input
            v-model="portfolio.link"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="my-2 flex w-full items-center justify-between">
          <label class="text-gray-700" for="text">Text</label>
          <the-editor @input="handlePostFromChild" :edit-editor="portfolio.text" class="w-[80%]" />
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
                v-if="portfolio.image"
                class="absolute top-0 h-full w-full rounded-lg object-cover"
                :src="portfolio.image"
                alt=""
              />
            </div>
            <input id="dropzone-file" @change="uploadImage" type="file" class="hidden" />
          </label>
          <button
            v-if="portfolio.image"
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
import TheEditor from '@/components/TheEditor.vue'

const props = defineProps(['input'])
const initialPortfolio = {
  title: '',
  category: '',
  link: '',
  image: null,
  text: `<h2>Definition</h2>
  <br />
  <h2>Support 24/7</h2>
  <br />
  <h2>Used technologies</h2>
  <br />
  <h2>Challenges and Solutions</h2>
  <br />`,
}
const portfolio = ref({
  ...initialPortfolio,
  ...props.input,
})

const uploadImage = (e: any) => {
  const image = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (event: any) => {
    if (portfolio.value) {
      portfolio.value.image = event.target.result
    }
  }
}
const handlePostFromChild = (post: any) => {
  portfolio.value.text = post
}
const deleteImage = () => {
  portfolio.value.image = null
}
</script>
