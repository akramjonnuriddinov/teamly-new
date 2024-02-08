<template>
  <div class="flex-col overflow-hidden" id="app">
    <the-navbar v-if="!isAdmin" />
    <div class="flex-1">
      <router-view />
    </div>
    <div v-if="!isAdmin" :class="{ 'bg-[#F9F9FA]': isProfileBg }">
      <contact-us v-show="!isProfile && !isContact" />
      <!-- <the-brand v-if="!isProfile" /> -->
      <the-footer class="main-footer" />
      <scroll-top />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// import {defineAsyncComponent} from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import ScrollTop from '@/components/static/ScrollTop.vue'
import ContactUs from '@/components/static/ContactUs.vue'

const route = useRoute()
// const TheBrand = defineAsyncComponent(() => import('@/components/static/TheBrand.vue'))
const isAdmin = computed(() => {
  return route.path.includes('admin')
})

const isProfile = computed(() => {
  return route.path.includes('profile') || route.path.includes('login')
})

const isContact = computed(() => {
  return route.path.includes('contact')
})

const isProfileBg = computed(() => {
  return route.path === '/profile' ? true : false
})
</script>
