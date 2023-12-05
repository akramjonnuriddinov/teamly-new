<template>
  <section class="bg-[#F9F9FA] mt-[86px] h-screen">
    <div
      class="flex container px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <Sidebar @selectItem="updateSelectedComponent" />
      <div
        class="main-content flex-grow relative top-10 py-4 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 mt-[85px] ps-[111px]"
      >
        <component :is="selectedComponent"></component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import Sidebar from './Sidebar.vue'
import Detail from '@/components/profile/Details.vue'
import AppliedVacancies from '@/components/profile/AppliedVacancies.vue'

const selectedComponent = shallowRef(Detail)

const updateSelectedComponent = (itemName: string) => {
  if (itemName === 'Profile details') {
    selectedComponent.value = Detail
  } else if (itemName === 'Applied vacancies') {
    selectedComponent.value = AppliedVacancies
  }
}
</script>
