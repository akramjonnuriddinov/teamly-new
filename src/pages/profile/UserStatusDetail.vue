<template>
  <the-transition>
    <div v-if="expanded" class="overflow-hidden px-5 max-[990px]:p-0" style="padding-left: 8px">
      <div>
        <ul @click.stop class="relative mt-4 border-s border-gray-200">
          <template v-if="isLoading">
            <li v-for="status in 1" class="mb-10 ms-4 pt-0" :key="status">
              <div class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white">
                <Skeleton width="12px" height="12px" :theme="ESkeletonTheme.LIGHT" />
              </div>
              <time class="mb-1">
                <Skeleton width="203px" height="18px" :theme="ESkeletonTheme.LIGHT" />
              </time>
              <div class="mt-4">
                <Skeleton width="100%" height="24px" :theme="ESkeletonTheme.LIGHT" />
              </div>
            </li>
          </template>
          <template v-else>
            <li v-for="userApplierStatus in allData" class="mb-10 ms-4 pt-0">
              <div
                :style="`background-color: ${userApplierStatus.status?.color}`"
                class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white"
              ></div>
              <time class="mb-1 text-sm font-bold leading-none text-tg-primary-color">{{
                formatTimestampToLocaleString(userApplierStatus.date, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              }}</time>
              <h3 class="text-lg font-semibold text-gray-900">{{ userApplierStatus.status?.title }}</h3>
              <div class="px-5 text-slate-500">
                <div v-if="userApplierStatus.task" class="flex flex-col">
                  <div class="mb-1 flex items-center space-x-2">
                    <span>Task:</span>
                    <a
                      :href="userApplierStatus.task.link"
                      class="text-lg font-medium text-tg-primary-color-two underline hover:text-tg-secondary-color"
                      target="_blank"
                    >
                      {{ userApplierStatus.task.title }}</a
                    >
                  </div>
                  <div class="mb-1 flex items-center space-x-2">
                    <span>Term:</span>
                    <span>
                      {{ userApplierStatus.task.dedline }}
                    </span>
                  </div>
                  <div>
                    {{ userApplierStatus.task.definition }}
                  </div>
                  <div class="my-4">
                    <SubmittedTask link="something" />
                  </div>
                </div>
                <span v-else>
                  {{ userApplierStatus.status?.definition }}
                </span>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </the-transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheTransition from '@/components/TheTransition.vue'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import SubmittedTask from './SubmittedTask.vue'

const props = defineProps(['expanded', 'applier_id'])
const statuses = ref<any>([])
const isLoading = ref(false)
const tasks = ref<any>([])
const userApplierStatuses = ref<any>([])
const allData = ref<any>([])

onMounted(async () => {
  isLoading.value = true
  await loadData()
  isLoading.value = false
})

const loadData = async () => {
  const applierStatusesQuery = query(
    collection(db, 'applier_statuses'),
    orderBy('date', 'desc'),
    where('applier_id', '==', props.applier_id),
  )
  const userApplierStatusesSnapshot = await getDocs(applierStatusesQuery)
  const statusesQuery = query(collection(db, 'statuses'))
  const statusesPromise = getDocs(statusesQuery)
  const tasksQuery = query(collection(db, 'tasks'))
  const tasksPromise = getDocs(tasksQuery)
  const [statusesSnapshot, tasksSnapshot] = await Promise.all([statusesPromise, tasksPromise])

  statuses.value = statusesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  userApplierStatuses.value = userApplierStatusesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  tasks.value = tasksSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  allData.value = userApplierStatuses.value.map((item: any) => ({
    id: item.id,
    ...item,
    status: statuses.value.filter((status: any) => status.id === item.status_id)[0],
    task: tasks.value.filter((task: any) => task.id === item.task_id)[0],
  }))
}
</script>
