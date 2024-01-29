<template>
  <div>
    <div class="flex gap-4 items-center font-semibold text-tg-primary-color transition-colors mb-4">
      <a class="hover:text-tg-dark-blue-color" href="" target="_blank">Source</a>
      <a class="hover:text-tg-dark-blue-color" href="" target="_blank">Live</a>
      <button class="ml-8">Edit</button>
   </div>
   <base-button :size="ESize.SMALL">Add your work</base-button>
   <SubmittedTasksModal />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ESize } from '@/types'
import BaseButton from '@/components/BaseButton.vue'
import SubmittedTasksModal from "./SubmittedTasksModal.vue";


const props = defineProps(['input'])
</script>
