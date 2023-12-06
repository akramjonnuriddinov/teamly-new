<template>
  <div v-if="expanded" class="px-5">
    <div
      v-if="applierStatuses"
      @click.stop
      class="space-y-8 pt-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent"
    >
      <!-- Item #1 -->
      <div
        v-for="applierStatus in applierStatuses"
        @click.stop
        class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
      >
        <!-- Icon -->
        <div
          :style="`background-color: ${applierStatus.color}`"
          class="flex items-center justify-center w-10 h-10 rounded-full border border-white text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
        >
          <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="12" height="10">
            <path
              fill-rule="nonzero"
              d="M10.422 1.257 4.655 7.025 2.553 4.923A.916.916 0 0 0 1.257 6.22l2.75 2.75a.916.916 0 0 0 1.296 0l6.415-6.416a.916.916 0 0 0-1.296-1.296Z"
            />
          </svg>
        </div>
        <!-- Card -->
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
          <div class="flex items-center justify-between mb-1 space-x-2">
            <div class="font-bold text-slate-900">{{ applierStatus.status.status }}</div>
            <time class="font-medium text-indigo-500 font-caveat">{{
              formatTimestampToLocaleString(applierStatus.date)
            }}</time>
          </div>
          <div v-if="applierStatus.description" v-html="applierStatus.description" class="text-slate-500"></div>
          <div v-else class="text-slate-500">{{ applierStatus.status.definition }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'

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

function formatTimestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp)
  const options: object = { month: 'long', day: 'numeric', year: 'numeric' }
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
