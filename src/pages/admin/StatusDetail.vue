<template>
  <the-transition>
    <div v-if="expanded" class="overflow-hidden px-5">
      <ul @click.stop class="relative border-s border-gray-200">
        <li v-for="applierStatus in applierStatuses" class="mb-10 ms-4 pt-4">
          <div
            :style="`background-color: ${applierStatus.status.color}`"
            class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white"
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
            <div class="mt-2 flex items-center space-x-2 text-slate-500">
              <span>Term:</span>
              <span>
                {{ applierStatus.task.dedline }}
              </span>
            </div>
            <a
              class="my-2 text-lg font-medium text-tg-primary-color-two underline hover:text-tg-secondary-color"
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
import TheTransition from '@/components/TheTransition.vue'
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'

const props = defineProps(['expanded', 'applier_id', 'status_id', 'statuses'])
const applierStatuses = ref<any>([])
const tasks = ref<any>([])

onMounted(async () => {
  // tasks.value = await fetchData('tasks')

  let allStatuses = await fetchData('applier_statuses')

  allStatuses = allStatuses.map((item: any) => ({
    ...item,
    status: props.statuses.find((el: any) => el.id === item.status_id),
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
  @apply mb-5 mt-5 text-xl font-semibold text-[#1C1C37];
}
</style>
