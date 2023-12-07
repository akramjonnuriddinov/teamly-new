<template>
  <div>
    <vacancy-banner />
    <job-lists @open="isOpen" />
    <apply-modal v-if="isShow" @close="isShow = false" :vacancyId="vacancyId" />
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import VacancyBanner from '@/components/vacancy/VacancyBanner.vue'
import JobLists from '@/components/job/JobLists.vue'
import ApplyModal from '@/components/ApplyModal.vue'

const isShow = ref(false)
const vacancyId = ref()
const isOpen = (id: any) => {
  vacancyId.value = id
  isShow.value = true
}
onUpdated(() => {
  isShow.value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})
</script>
