<template>
  <section class="mt-[86px] bg-[#F9F9FA]">
    <div
      class="container mx-auto flex px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[990px]:flex-col max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <profile-sidebar @selectItem="updateSelectedComponent" />
      <div
        class="min-h-screen w-64 flex-grow pb-6 ps-[110px] pt-10 max-[990px]:mt-0 max-[990px]:w-full max-[990px]:pl-0 max-[990px]:ps-4 max-[990px]:pt-10"
      >
        <component v-if="store.user" :is="selectedComponent"></component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import ProfileSidebar from '@/pages/profile/ProfileSidebar.vue'
import ProfileDetail from '@/pages/profile/ProfileDetail.vue'
import AppliedVacancies from './AppliedVacancies.vue'
import { useAuthStore } from '@/store/auth'

const store = useAuthStore()
const selectedComponent = shallowRef(ProfileDetail)
const updateSelectedComponent = (component: any) => {
  switch (component) {
    case 'ProfileDetail':
      selectedComponent.value = ProfileDetail
      break
    case 'AppliedVacancies':
      selectedComponent.value = AppliedVacancies
      break
  }
}
</script>
