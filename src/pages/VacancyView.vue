<template>
  <div class="mt-[86px]">
    <vacancy-banner />
    <job-lists />
    <home-contact />
    <apply-modal />
  </div>
</template>

<script setup lang="ts">
import HomeContact from "@/components/HomeContact.vue"
import VacancyBanner from "@/components/VacancyBanner.vue"
import JobLists from "@/components/JobLists.vue"
import ApplyModal from "@/components/ApplyModal.vue"
</script>
