<template>
  <div>
    <vacancy-banner />
    <job-lists />
    <apply-modal />
  </div>
</template>

<script setup lang="ts">
import VacancyBanner from "@/components/vacancy/VacancyBanner.vue"
import JobLists from "@/components/job/JobLists.vue"
import ApplyModal from "@/components/ApplyModal.vue"
</script>
