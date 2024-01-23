<template>
  <section class="mt-[86px] bg-[#F9F9FA]">
    <div
      class="container mx-auto flex max-w-7xl px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[990px]:flex-col max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <profile-sidebar @selectItem="updateSelectedComponent" />
      <div
        class="main-content relative left-0 top-10 z-40 mt-[85px] min-h-screen w-64 flex-grow py-4 ps-[111px] transition-transform max-[990px]:mt-0 max-[990px]:w-full max-[990px]:pl-0 max-[990px]:ps-4 max-[990px]:pt-0 sm:translate-x-0"
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
