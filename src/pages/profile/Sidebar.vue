<template>
  <aside
    class="relative fixed top-10 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <h1 class="text-2xl font-medium">Your Profile</h1>
      <ul class="mt-[57px]">
        <li
          v-for="nav in navigations"
          onmousedown="return false;"
          onselectstart="return false;"
          :class="{
            'text-gray-400 cursor-not-allowed ': nav.disabled,
            'hover:text-tg-primary-color cursor-pointer': !nav.disabled,
          }"
          class="mt-[30px] w-full font-semibold text-base"
          :key="nav.name"
          @click="selectNavItem(nav.name, nav.disabled)"
        >
          <span
            :class="{ 'bg-tg-primary-color text-white rounded-[5px]': selectedNavItem === nav.name }"
            class="py-3 px-5"
            >{{ nav.name }}</span
          >
        </li>
      </ul>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['selectItem'])

const selectedNavItem = ref('Profile details')

const navigations = ref([
  {
    name: 'Profile details',
    disabled: false,
  },
  {
    name: 'Applied vacancies',
    disabled: false,
  },
  {
    name: 'Applied internships',
    disabled: true,
  },
  {
    name: 'Messages from Teamly',
    disabled: true,
  },
])

const selectNavItem = (itemName: string, disabled: boolean) => {
  if (!disabled) {
    selectedNavItem.value = itemName
    emit('selectItem', itemName)
  }
}
</script>
