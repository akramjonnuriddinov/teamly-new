<template>
  <the-transition>
    <div v-if="expanded" class="px-5 overflow-hidden">
      <div v-if="userApplierStatuses.length">
        <ul @click.stop class="relative mt-4 border-gray-200 border-s">
          <li v-for="userApplierStatus in userApplierStatuses" class="pt-0 mb-10 ms-4">
            <!-- {{ userApplierStatus }} -->
            <div
              :style="`background-color: ${userApplierStatus.userStatus.color}`"
              class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white"
            ></div>
            <time class="mb-1 text-sm font-bold leading-none text-tg-primary-color">{{
              formatTimestampToLocaleString(userApplierStatus.date)
            }}</time>
            <h3 class="text-lg font-semibold text-gray-900">{{ userApplierStatus.userStatus.status }}</h3>
            <div class="px-5 text-slate-500">
              {{ userApplierStatus.userStatus.definition }}
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="mt-4 text-lg text-center text-tg-body-font-color">There are currently no statuses</div>
    </div>
  </the-transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import TheTransition from '@/components/reusables/TheTransition.vue'

const props = defineProps(['expanded', 'applierStatuses', 'vacancy_id'])

const statuses = ref<any>([])

const userApplierStatuses = ref<any>([])
userApplierStatuses.value = props.applierStatuses.filter((item: any) => item.vacancy_id === props.vacancy_id)

onMounted(async () => {
  statuses.value = await fetchData('statuses')
  userApplierStatuses.value = userApplierStatuses.value.map((item: any) => ({
    ...item,
    userStatus: statuses.value.find((el: any) => item.status_id === el.id),
  }))
})

function formatTimestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp)
  const options: object = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
</script>
