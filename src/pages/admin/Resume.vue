<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <h2 class="mb-10 text-3xl capitalize">{{ 'title' }}</h2>
    <div>
      <div>
        <div v-for="resume in resumes" class="flex items-center justify-between p-5 mb-5 rounded-md bg-gray-50">
          <div class="flex w-full gap-5">
            <h3 class="w-[40%]">{{ resume.title }}</h3>
            <a :href="`tel:${resume.phone}`">{{ resume.phone }}</a>
          </div>
          <div class="flex gap-4">
            <button class="font-semibold text-tg-green hover:opacity-80">Dowload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchData } from '@/composables/fetchData'

const resumes = ref<any>([])
fetchData('resume').then((result) => {
  resumes.value = result
})
</script>
