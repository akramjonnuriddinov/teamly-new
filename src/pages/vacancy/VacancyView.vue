<template>
  <vacancy-banner />
  <job-lists />
</template>

<script setup lang="ts">
import VacancyBanner from '@/pages/vacancy/VacancyBanner.vue'
import JobLists from '@/pages/vacancy/JobLists.vue'
import { useHead, UseHeadInput } from '@vueuse/head'

interface MyHeadProperties {
  title: string
  meta: {
    name: string
    content: string
  }[]
}

const headProperties: UseHeadInput<MyHeadProperties> = {
  title: 'My Page',
  meta: [
    { name: 'description', content: 'This is a description' },
    // Add more meta tags as needed
  ],
}
const options: any = {
  forceDocumentTitle: true,
  pinnable: false,
}

useHead<MyHeadProperties>(headProperties, options)
</script>
