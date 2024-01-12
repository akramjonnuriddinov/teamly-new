<template>
  <aside
    class="max-[990px]: relative left-0 z-[400] w-64 pt-10 max-[990px]:mt-[100px] max-[990px]:flex max-[990px]:w-full max-[990px]:justify-center max-[990px]:pt-0 sm:translate-x-0"
  >
    <div
      class="max-[990px]:shadow- h-full overflow-y-auto px-3 py-4 max-[990px]:w-full max-[990px]:rounded-2xl max-[990px]:border max-[990px]:p-4"
    >
      <h1 class="text-2xl font-medium max-[990px]:hidden">Your Profile</h1>
      <ul class="mt-[57px] flex flex-col max-[990px]:mt-0 max-[990px]:flex-row max-[990px]:justify-between">
        <li
          v-for="nav in navigations"
          onmousedown="return false;"
          onselectstart="return false;"
          :class="{
            'cursor-not-allowed text-gray-400 max-[990px]:hidden': nav.disabled,
            'cursor-pointer hover:text-tg-primary-color': !nav.disabled,
          }"
          class="relative mb-3 w-full rounded-md text-base font-semibold max-[990px]:mb-0 max-[990px]:w-[40%] max-[540px]:w-[50%]"
          :key="nav.name"
          @click="selectNavItem(nav.name, nav.disabled)"
        >
          <span
            :class="{ 'bg-tg-primary-color text-white': selectedNavItem === nav.name }"
            class="block w-full whitespace-nowrap rounded-md px-5 py-3"
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
