<template>
  <the-transition>
    <div v-if="expanded" class="px-5 overflow-hidden">
      <ol @click.stop class="relative border-gray-200 border-s dark:border-gray-700">
        <li v-for="(applierStatus, index) in applierStatuses" class="pt-4 mb-10 ms-4">
          <div
            :style="`background-color: ${applierStatus.color}`"
            class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{
            formatTimestampToLocaleString(applierStatus.date)
          }}</time>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ applierStatus.status.status }}</h3>
          <div v-if="applierStatus.description" v-html="applierStatus.description" class="px-5"></div>
          <div
            v-else
            class="px-5 text-slate-500"
            :class="{ 'line-clamp-none': lineClamp[index], 'line-clamp-5': !lineClamp[index] }"
          >
            {{ applierStatus.status.definition }}
          </div>

          <button
            @click="lineClampChange(index)"
            class="inline-flex items-center px-4 py-2 mt-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700"
          >
            <span v-if="!lineClamp[index]">Learn more</span>
            <span v-else>Learn less</span>
            <svg
              class="w-3 h-3 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </li>
      </ol>
    </div>
  </the-transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import TheTransition from '@/components/reusables/TheTransition.vue'

const props = defineProps(['expanded', 'applier_id', 'status_id'])
const applierStatuses = ref<any>([])
const statuses = ref<any>([])

onMounted(async () => {
  let allStatuses = await fetchData('applier_statuses')
  statuses.value = await fetchData('statuses')
  allStatuses = allStatuses.map((item: any) => ({
    ...item,
    status: statuses.value.find((el: any) => el.id === item.status_id),
  }))
  applierStatuses.value = allStatuses.filter((item: any) => item.applier_id === props.applier_id)
})

const lineClamp = ref<boolean[]>([])
const lineClampChange = (index: number) => {
  lineClamp.value[index] = !lineClamp.value[index]
}

function formatTimestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp)
  const options: object = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
</script>

<style>
.comment li {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.comment li::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #7e54f8;
  margin-right: 4px;
}

.comment h1,
.comment h2,
.comment h3 {
  @apply text-xl font-semibold text-[#1C1C37] mb-5 mt-5;
}
</style>
