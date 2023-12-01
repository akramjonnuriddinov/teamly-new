<template>
  <div ref="select" class="relative">
    <button @click.stop="toggle" class="flex items-center text-tg-black-two">
      <span>Status</span>
      <inline-svg class="w-2 ml-1" src="svg/fontawesome/caret-down.svg" />
    </button>
    <ul
      v-if="isShow"
      class="absolute left-full top-8 -translate-x-full flex flex-col z-50 justify-start bg-white border rounded-lg w-[200px]"
    >
      <li v-for="status in statuses" class="border-b">
        <button @click="$emit('setStatus')" class="flex items-center w-full h-full p-3 transition-all hover:bg-gray-50">
          <span :class="status.color" class="min-w-[8px] w-2 h-2 mr-2 rounded-full"></span>
          <div class="flex flex-col items-start">
            <span class="capitalize">{{ status.status }}</span>
            <span class="text-xs text-tg-body-font-color">{{ status.defination }}</span>
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
const isShow = ref(false)
const select = ref<any>(null)
const toggle = () => {
  isShow.value = !isShow.value
}
watch(isShow, (value) => {
  if (value) {
    document.addEventListener('click', clickHandler)
  } else {
    document.removeEventListener('click', clickHandler)
  }
})

const clickHandler = (e: any) => {
  if (select && (e.target === select.value || select.value.contains(e.target))) {
    console.log(select.value)
    return
  }
  toggle()
}

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
