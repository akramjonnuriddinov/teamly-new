<template>
  <div class="flex-col" id="app">
    <the-navbar v-if="!isAdmin" />
    <div class="flex-1">
      <router-view />
    </div>
    <div v-if="!isAdmin && !isLoading()">
      <contact-us v-if="!isPorfile" />
      <!-- <the-brand v-if="!isPorfile" /> -->
      <the-footer class="main-footer" />
      <scroll-top />
    </div>
    <loader-wrapper v-if="isLoading()">
      <app-loader />
    </loader-wrapper>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
// import {defineAsyncComponent} from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import ScrollTop from '@/components/static/ScrollTop.vue'
// import TheBrand from '@/components/static/TheBrand.vue'
import ContactUs from '@/components/static/ContactUs.vue'
import AppLoader from '@/components/AppLoader.vue'
import LoaderWrapper from '@/components/LoaderWrapper.vue'
import { isLoading } from '@/composables/loader'

const route = useRoute()

// const TheBrand = defineAsyncComponent(() => import('@/components/static/TheBrand.vue'))

const isAdmin = computed(() => {
  return route.path.includes('admin')
})

const isPorfile = computed(() => {
  return route.path.includes('profile') || route.path.includes('login')
})
</script>

<style></style>
