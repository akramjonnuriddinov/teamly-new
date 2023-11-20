<template>
  <base-modal :input="props.input" url="blog" :old-value="blog" :is-disabled="isDisabled" modal_title="Blog">
    <form class="w-full h-auto overflow-y-auto">
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full">
          <label class="text-gray-700" for="createAt">CreateAt</label>
          <input
            v-model="blog.createAt"
            id="createAt"
            placeholder="October 16, 2002"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full">
          <label class="text-gray-700" for="subtitle">Subtitle</label>
          <input
            v-model="blog.subtitle"
            id="subtitle"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full mb-2">
          <label class="text-gray-700" for="title">Title</label>
          <input
            v-model="blog.title"
            id="title"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full mb-2">
          <label class="text-gray-700" for="text">Text</label>
          <textarea
            v-model="blog.text"
            class="w-[80%] h-[180px] resize-none p-2 border border-gray-200 rounded-md outline-blue-300"
            name=""
            id="text"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="flex overflow-hidden self-end relative items-center justify-center w-[80%]">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <inline-svg class="text-3xl text-gray-500" src="svg/fontawesome/upload.svg" />

              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              <img
                v-if="blog.image"
                class="absolute top-0 object-cover w-full h-full rounded-lg"
                :src="blog.image"
                alt=""
              />
            </div>
            <input id="dropzone-file" @change="uploadImage" type="file" class="hidden" />
          </label>
          <button
            v-if="blog.image"
            @click="deleteImage"
            class="absolute flex items-center justify-center text-2xl text-white transition-all bg-gray-900 rounded-[3px] w-7 h-7 top-5 right-5 hover:text-red-500"
            type="button"
          >
            <inline-svg src="fontawesome/xmark.svg" />
          </button>
        </div>
      </div>
    </form>
  </base-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
import BaseModal from '@/components/admin/modals/BaseModal.vue'
const props = defineProps(['input'])
const initialBlog = {
  id: '',
  title: '',
  subtitle: '',
  text: '',
  createAt: '',
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
    } else {
      console.log('blog.value is undefined')
    }
  }
}
const deleteImage = () => {
  blog.value.image = null
}
const isDisabled = computed(() => {
  return !(
    blog.value.createAt?.trim() &&
    blog.value.subtitle?.trim() &&
    blog.value.title?.trim() &&
    blog.value.text?.trim() &&
    blog.value.image
  )
})
</script>
