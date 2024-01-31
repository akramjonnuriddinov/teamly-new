<template>
  <div>
    <div v-if="data.source && data.live" class="flex gap-4 items-center font-semibold text-tg-primary-color transition-colors mb-4">
      <a class="hover:text-tg-dark-blue-color" :href="data.source" :title="data.source" target="_blank">Source</a>
      <a class="hover:text-tg-dark-blue-color" :href="data.live" :title="data.live" target="_blank">Live</a>
      <button class="ml-8 flex items-center gap-2 hover:text-tg-dark-blue-color" @click="isModalOpen = true">
        <InlineSvg src="fontawesome/pencil-icon.svg" />
        Edit
      </button>
   </div>
   <button v-else class="font-semibold text-tg-primary-color" @click="isModalOpen = true"> + Add your work</button>
   <SubmittedTasksModal v-if="isModalOpen" :input="{...data, vacancy: input.vacancy, user}" @close="closeModal"/>
  </div>
</template>

<script setup>
import { ref, onUpdated } from "vue";
import { ESize } from '@/types'
import SubmittedTasksModal from "./SubmittedTasksModal.vue";
import InlineSvg from "@/components/InlineSvg.vue";
import { getDocs, query, collection, where } from "firebase/firestore";
import { fetchDataWithWhere } from "@/composables/fetchDataWithWhere";
import { db } from "@/firebase";
import { useAuthStore } from '@/store/auth';

const store = useAuthStore()
const user = store.user.id

const props = defineProps(['input'])
const data = ref({
  source: props.input.source || '',
  live: props.input.live || '',
  id: props.input.id
})
const isModalOpen = ref(false)

const closeModal = (value) => {
  if (value) {
    data.value = value
  }
  isModalOpen.value = false
}

onUpdated(() => {
  isModalOpen.value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})
</script>
