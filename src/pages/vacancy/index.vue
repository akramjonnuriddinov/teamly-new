<template>
  <div class="mt-[86px]">
    <vacancy-banner />
    <job-lists @open="isShow = true" />
    <apply-modal v-if="isShow" @close="isShow = false" />
  </div>
</template>

<script setup lang="ts">
import VacancyBanner from "@/components/vacancy/VacancyBanner.vue"
import JobLists from "@/components/job/JobLists.vue"
import ApplyModal from "@/components/ApplyModal.vue"
import { ref } from "vue"

const isShow = ref(false)
</script>
