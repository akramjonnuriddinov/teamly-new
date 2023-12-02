<template>
  <div v-if="expanded" class="px-5">
    <div>
      <div v-if="statusApplayers" class="flex items-center gap-3">
        <!-- <img src="@/assets/images/fontawesome/icon-experience.svg" alt="" /> -->
        <!-- <h3 class="pl-3 my-4 text-3xl">History of Applayer User</h3> -->
      </div>
      <ul class="p-5">
        <li
          v-for="statusApplayer in statusApplayers"
          @click.stop
          :class="`border-${statusApplayer.status_color} border-l-2 border-opacity-40`"
          class="relative flex"
        >
          <span
            :class="`bg-${statusApplayer.status_color}`"
            class="block min-w-[16px] min-h-[16px] max-h-[16px] max-w-[16px] -translate-x-1/2 rounded-full"
          ></span>
          <div class="px-3 py-10 comment">
            <div class="flex items-center font-medium text-gray-600">
              <span>{{ formatTimestampToLocaleString(statusApplayer.date) }} -</span>
              <span>{{ statusApplayer.status }}</span>
            </div>
            <div v-html="statusApplayer.comment"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchData } from '@/composables/fetchData'

const props = defineProps(['expanded', 'applayer_id'])

const statusApplayers = ref()

fetchData('applayer_statuses').then((result) => {
  statusApplayers.value = result.filter((item: any) => item.applayer_id === props.applayer_id)
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
