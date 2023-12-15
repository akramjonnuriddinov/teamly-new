<template>
  <the-transition>
    <div v-if="expanded" class="px-5 overflow-hidden">
      <div>
        <ul @click.stop class="relative mt-4 border-gray-200 border-s">
          <template v-if="isLoading">
            <li v-for="status in 1" class="pt-0 mb-10 ms-4" :key="status">
              <div class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white">
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
            <li v-for="userApplierStatus in userApplierStatuses" class="pt-0 mb-10 ms-4">
              <div
                :style="`background-color: ${userApplierStatus.userStatus?.color}`"
                class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white"
              ></div>
              <time class="mb-1 text-sm font-bold leading-none text-tg-primary-color">{{
                formatTimestampToLocaleString(userApplierStatus.date)
              }}</time>
              <h3 class="text-lg font-semibold text-gray-900">{{ userApplierStatus.userStatus?.status }}</h3>
              <div class="px-5 text-slate-500">
                {{ userApplierStatus.userStatus?.definition }}
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
import { fetchData } from '@/composables/fetchData'
import TheTransition from '@/components/reusables/TheTransition.vue'
import Skeleton, { ESkeletonTheme } from '@/components/skeleton/Skeleton.vue'

const props = defineProps(['expanded', 'applierStatuses', 'vacancy_id', 'commentLoading'])

const statuses = ref<any>([])
const isLoading = ref(false)

const userApplierStatuses = ref<any>([])
userApplierStatuses.value = props.applierStatuses.filter((item: any) => item.vacancy_id === props.vacancy_id)

onMounted(async () => {
  isLoading.value = true
  statuses.value = await fetchData('statuses')
  userApplierStatuses.value = userApplierStatuses.value.map((item: any) => ({
    ...item,
    userStatus: statuses.value.find((el: any) => item.status_id === el.id),
  }))
  console.log(userApplierStatuses, 'asdafa')
  isLoading.value = false
})

function formatTimestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp)
  const options: object = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
</script>
