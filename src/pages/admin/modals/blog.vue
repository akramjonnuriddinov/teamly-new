<template>
  <admin-base-modal :input="props.input" url="blog" :old-value="blog" modal_title="Blog">
    <form class="h-auto w-full overflow-y-auto">
      <div class="flex w-full flex-col">
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="subtitle">Subtitle</label>
          <input
            v-model="blog.subtitle"
            id="subtitle"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="mb-2 flex w-full items-center justify-between">
          <label class="text-gray-700" for="title">Title</label>
          <input
            v-model="blog.title"
            id="title"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="mb-2 flex w-full items-center justify-between">
          <label class="text-gray-700" for="text">Text</label>
          <the-editor @input="handlePostFromChild" :edit-editor="blog.text" class="w-[80%]" />
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
                v-if="blog.image"
                class="absolute top-0 h-full w-full rounded-lg object-cover"
                :src="blog.image"
                alt=""
              />
            </div>
            <input id="dropzone-file" @change="uploadImage" type="file" class="hidden" />
          </label>
          <button
            v-if="blog.image"
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
const initialBlog = {
  title: '',
  subtitle: '',
  text: '',
  image: null,
}
const blog = ref({
  ...initialBlog,
  ...props.input,
})
const uploadImage = (e: any) => {
  const image = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (event: any) => {
    if (blog.value) {
      blog.value.image = event.target.result
    }
  }
}
const handlePostFromChild = (post: any) => {
  blog.value.text = post
}
const deleteImage = () => {
  blog.value.image = null
}
</script>
