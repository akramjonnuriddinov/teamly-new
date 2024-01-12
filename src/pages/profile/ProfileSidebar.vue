<template>
  <aside
    class="max-[990px]: relative left-0 z-[400] w-64 pt-10 max-[990px]:mt-[50px] max-[990px]:flex max-[990px]:w-full max-[990px]:justify-center max-[990px]:pt-0 sm:translate-x-0"
  >
    <div class="h-full overflow-y-auto px-3 py-4 max-[990px]:w-full max-[990px]:p-0 max-[990px]:pb-1">
      <h1 class="text-2xl font-medium max-[990px]:mb-4">Your Profile</h1>
      <ul
        class="mt-[57px] flex flex-col max-[990px]:mt-0 max-[990px]:flex-row max-[990px]:justify-start max-[990px]:gap-2"
      >
        <li
          v-for="nav in navigations"
          onmousedown="return false;"
          onselectstart="return false;"
          :class="{
            'cursor-not-allowed text-gray-400 max-[990px]:px-0': nav.disabled,
            'cursor-pointer hover:text-tg-primary-color': !nav.disabled,
          }"
          class="relative mb-3 w-full rounded-md text-base font-semibold max-[990px]:mb-0 max-[990px]:w-auto max-[990px]:border"
          :key="nav.name"
          @click="selectNavItem(nav.name, nav.disabled)"
        >
          <span
            :class="{ 'bg-tg-primary-color text-white': selectedNavItem === nav.name }"
            class="block w-full whitespace-nowrap rounded-md px-5 py-3 max-[990px]:py-2"
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

<style scoped>
::-webkit-scrollbar {
  height: 0px !important;
}
</style>
