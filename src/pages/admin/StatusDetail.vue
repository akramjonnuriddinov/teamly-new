<template>
  <the-transition>
    <div v-if="expanded" class="overflow-hidden px-5">
      <ul v-if="listLoading" @click.stop class="relative border-s border-gray-200">
        <li class="mb-10 ms-4 pt-4">
          <div class="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white">
            <Skeleton width="12px" height="12px" :theme="ESkeletonTheme.LIGHT" />
          </div>
          <time class="mb-1 flex text-sm font-normal leading-none text-gray-400">
            <Skeleton width="176px" height="18px" :theme="ESkeletonTheme.LIGHT" />
          </time>
          <h3 class="text-lg font-semibold text-gray-900">
            <Skeleton class="block" width="100%" height="28px" :theme="ESkeletonTheme.LIGHT" />
          </h3>
        </li>
      </ul>
      <ul v-else @click.stop class="relative border-s border-gray-200">
        <li v-for="applierStatus in applierStatuses" :key="applierStatus.id" class="mb-10 ms-4 pt-4">
          <div
            :style="`background-color: ${applierStatus.status?.color}`"
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

          <div
            class="px-5 text-slate-500"
            v-html="applierStatus.shortDescription || applierStatus.status?.definition"
          />
        </li>
      </ul>
    </div>
  </the-transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheTransition from '@/components/TheTransition.vue'
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'

const props = defineProps(['expanded', 'applier_id', 'status_id', 'statuses'])
const applierStatuses = ref<any>([])
const tasks = ref<any>([])
const listLoading = ref(true)

const loadApplierStatuses = async () => {
  const applierStatusesQuery = query(
    collection(db, 'applier_statuses'),
    where('applier_id', '==', props.applier_id),
    orderBy('date', 'desc'),
  )
  const applierStatusesSnapshot = await getDocs(applierStatusesQuery)

  const tasksQuery = query(collection(db, 'tasks'))
  const tasksSnapshot = await getDocs(tasksQuery)
  tasks.value = tasksSnapshot.docs.map((doc) => doc.data())

  applierStatuses.value = applierStatusesSnapshot.docs.map((doc) => {
    const item = doc.data()
    return {
      ...item,
      status: props.statuses.find((el: any) => el.id === item.status_id),
      task: tasks.value.filter((task: any) => task.id === item.task_id)[0],
    }
  })
}

onMounted(async () => {
  try {
    await loadApplierStatuses()
  } catch (error) {
    console.error('Error:', error)
  } finally {
    listLoading.value = false
  }
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
  @apply bg-tg-primary-color;
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 4px;
}

.comment h1,
.comment h2,
.comment h3 {
  @apply mb-5 mt-5 text-xl font-semibold text-[#1C1C37];
}
</style>
