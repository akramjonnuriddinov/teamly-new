<template>
  <div>
    <vacancy-banner />
    <job-lists @openSendId="openGetId" />
    <apply-modal :vacancy_id="vacancy_id" v-if="isShow" @close="isShow = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'
import VacancyBanner from '@/components/vacancy/VacancyBanner.vue'
import JobLists from '@/components/job/JobLists.vue'
import ApplyModal from '@/components/ApplyModal.vue'

const isShow = ref(false)
onUpdated(() => {
  isShow.value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})

const vacancy_id = ref<string | undefined>('')

const openGetId = (id: string | undefined) => {
  isShow.value = true
  vacancy_id.value = id
}
</script>
