<template>
  <the-transition>
    <div v-if="expanded" class="px-5 overflow-hidden">
      <ul @click.stop class="relative border-gray-200 border-s">
        <li v-for="applierStatus in applierStatuses" class="pt-4 mb-10 ms-4">
          <div
            :style="`background-color: ${applierStatus.status.color}`"
            class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white"
          ></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400">{{
            formatTimestampToLocaleString(applierStatus.date, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}</time>
          <h3 class="text-lg font-semibold text-gray-900">{{ applierStatus?.status?.title }}</h3>
          <div v-if="applierStatus.task">
            <div class="flex items-center mt-2 space-x-2 text-slate-500">
              <span>Term:</span>
              <span>
                {{ applierStatus.task.dedline }}
              </span>
            </div>
            <a
              class="my-2 text-lg font-medium underline text-tg-primary-color-two hover:text-tg-secondary-color"
              :href="applierStatus.task.link"
              target="_blank"
              >{{ applierStatus.task.title }}</a
            >
          </div>

          <div class="px-5 text-slate-500">
            {{ applierStatus.status?.definition }}
          </div>
        </li>
      </ul>
    </div>
  </the-transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import TheTransition from '@/components/reusables/TheTransition.vue'
import { fetchDataWithWhere } from '@/composables/fetchDataWithWhere'
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'

const props = defineProps(['expanded', 'applier_id', 'status_id'])
const applierStatuses = ref<any>([])
const statuses = ref<any>([])
const tasks = ref<any>([])
const statusesData = ref<any>([])

onMounted(async () => {
  console.log(new Date().getSeconds(), '1')
  tasks.value = await fetchData('tasks')
  statusesData.value = await fetchDataWithWhere('statuses', 'id', '==', '')
  console.log(new Date().getSeconds(), '2')

  if (!statuses.value.length) statuses.value = await fetchData('statuses')
  let allStatuses = await fetchData('applier_statuses')
  console.log(new Date().getSeconds(), '3')

  console.log(allStatuses, 'allStatuses')
  allStatuses = allStatuses.map((item: any) => ({
    ...item,
    status: statuses.value.find((el: any) => el.id === item.status_id),
  }))
  applierStatuses.value = allStatuses.filter((item: any) => item.applier_id === props.applier_id)
  applierStatuses.value = applierStatuses.value.map((item: any) => ({
    ...item,
    task: tasks.value.filter((task: any) => task.id === item.task_id)[0],
  }))
})
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
