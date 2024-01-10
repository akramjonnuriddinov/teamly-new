<template>
  <section class="bg-[#F9F9FA] mt-[86px]">
    <div
      class="flex container px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <profile-sidebar @selectItem="updateSelectedComponent" />
      <div
        class="main-content min-h-screen flex-grow relative top-10 py-4 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 mt-[85px] ps-[111px]"
      >
        <component :is="selectedComponent"></component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import ProfileSidebar from '@/pages/profile/ProfileSidebar.vue'
import ProfileDetail from '@/pages/profile/ProfileDetail.vue'
import AppliedVacancies from '@/pages/profile/AppliedVacancies.vue'

const selectedComponent = shallowRef(ProfileDetail)

const updateSelectedComponent = (itemName: string) => {
  if (itemName === 'Profile details') {
    selectedComponent.value = ProfileDetail
  } else if (itemName === 'Applied vacancies') {
    selectedComponent.value = AppliedVacancies
  }
}
</script>
