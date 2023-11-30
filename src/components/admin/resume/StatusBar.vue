<template>
  <div class="relative">
    <button @click.stop="$emit('openStatus')" class="flex items-center text-tg-black-two">
      <span>Status</span>
      <inline-svg class="w-2 ml-1" src="svg/fontawesome/caret-down.svg" />
    </button>
    <ul
      v-if="isShow"
      class="absolute left-full top-8 -translate-x-full flex flex-col z-50 justify-start bg-white border rounded-lg w-[200px]"
    >
      <li v-for="status in statuses" class="border-b">
        <button
          @click="console.log(status.status)"
          class="flex items-center w-full h-full p-3 transition-all hover:bg-gray-50"
        >
          <span :class="status.color" class="min-w-[8px] w-2 h-2 mr-2 rounded-full"></span>
          <div class="flex flex-col items-start">
            <button class="capitalize">{{ status.status }}</button>
            <span class="text-xs text-tg-body-font-color">{{ status.defination }}</span>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
defineProps(['isShow'])
const statuses = ref([
  {
    id: 'in_review',
    status: 'in review',
    defination: 'resume in review',
    color: 'bg-yellow-400',
  },
  {
    id: 'reject',
    status: 'reject',
    defination: 'resume rejected',
    color: 'bg-red-400',
  },
  {
    id: 'accept',
    status: 'accept',
    defination: 'resume accepted',
    color: 'bg-green-400',
  },
])
</script>

<style scoped>
li:last-child {
  border-bottom: 0;
}
</style>
