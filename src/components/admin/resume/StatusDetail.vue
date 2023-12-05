<template>
  <div v-if="expanded" class="px-5">
    <div>
      <div v-if="applierStatuses" class="flex items-center gap-3">
        <!-- <img src="@/assets/images/fontawesome/icon-experience.svg" alt="" /> -->
        <!-- <h3 class="pl-3 my-4 text-3xl">History of Applayer User</h3> -->
      </div>
      <ul class="p-5">
        <li
          v-for="applierStatus in applierStatuses"
          @click.stop
          :class="`border-${applierStatuses} border-l-2 border-opacity-40`"
          class="relative flex"
        >
          <span
            :class="`bg-${applierStatuses}`"
            class="block min-w-[12px] min-h-[12px] max-h-[12px] max-w-[12px] -translate-x-1/2 rounded-full"
          ></span>
          <div class="px-3 py-10 comment">
            <div class="flex items-center font-medium text-gray-600">
              <span>{{ formatTimestampToLocaleString(applierStatus.date) }} -</span>
              <span>{{ applierStatus.status }} - </span>
              <span>{{ applierStatus.status_id }}</span>
            </div>
            <div v-html="applierStatus.description"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'

const props = defineProps(['expanded', 'applier_id', 'status_id'])
const applierStatuses = ref<any>([])

onMounted(async () => {
  const allStatuses = await fetchData('applier_statuses')
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
