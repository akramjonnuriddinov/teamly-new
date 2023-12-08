<template>
  <the-transition>
    <div v-if="expanded" class="px-5 overflow-hidden">
      <!-- item1 -->
      <ul v-if="profile_status" @click.stop class="relative border-gray-200 border-s">
        <li v-for="userApplierStatus in userApplierStatuses" class="pt-4 mb-10 ms-4">
          <div
            :style="`background-color: ${userApplierStatus.color}`"
            class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white"
          ></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400">{{
            formatTimestampToLocaleString(userApplierStatus.date)
          }}</time>
          <h3 class="text-lg font-semibold text-gray-900">{{ userApplierStatus.userStatus.status }}</h3>
          <div v-if="userApplierStatus.description" v-html="userApplierStatus.description" class="px-5"></div>
          <div v-else class="px-5 text-slate-500">
            {{ userApplierStatus.userStatus.definition }}
          </div>
          <br />
        </li>
      </ul>
      <!-- item2 -->
      <ul v-else @click.stop class="relative border-gray-200 border-s">
        <li v-for="applierStatus in applierStatuses" class="pt-4 mb-10 ms-4">
          <div
            :style="`background-color: ${applierStatus.color}`"
            class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white"
          ></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-400">{{
            formatTimestampToLocaleString(applierStatus.date)
          }}</time>
          <h3 class="text-lg font-semibold text-gray-900">{{ applierStatus.status.status }}</h3>
          <div v-if="applierStatus.description" v-html="applierStatus.description" class="px-5"></div>
          <div v-else class="px-5 text-slate-500">
            {{ applierStatus.status.definition }}
          </div>
          <br />
        </li>
      </ul>
    </div>
  </the-transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import TheTransition from '@/components/reusables/TheTransition.vue'

const props = defineProps(['expanded', 'applier_id', 'status_id', 'applierStatuses', 'vacancy_id', 'profile_status'])
const applierStatuses = ref<any>([])
const statuses = ref<any>([])

const userApplierStatuses = ref<any>([])
userApplierStatuses.value = props.applierStatuses.filter((item: any) => item.vacancy_id === props.vacancy_id)

onMounted(async () => {
  let allStatuses = await fetchData('applier_statuses')
  statuses.value = await fetchData('statuses')
  allStatuses = allStatuses.map((item: any) => ({
    ...item,
    status: statuses.value.find((el: any) => el.id === item.status_id),
  }))
  applierStatuses.value = allStatuses.filter((item: any) => item.applier_id === props.applier_id)
  userApplierStatuses.value = userApplierStatuses.value.map((item: any) => ({
    ...item,
    userStatus: statuses.value.find((el: any) => item.status_id === el.id),
  }))
  console.log(userApplierStatuses.value)
})

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
