<template>
  <div class="flex-col overflow-hidden" id="app">
    <the-navbar v-if="!isAdmin" />
    <div class="flex-1">
      <router-view />
    </div>
    <div v-if="!isAdmin">
      <contact-us v-show="!isProfile && !isContact" />
      <the-footer class="main-footer" />
      <scroll-top />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import ScrollTop from '@/components/ScrollTop.vue'
import ContactUs from '@/components/ContactUs.vue'
import { useRoute } from 'vue-router'
import { useSeo } from '@/composables/useSeo.ts'

const route = useRoute()

watch(
  () => route,
  (value) => {
    useSeo(value.name, value.path)
  },
  {
    immediate: true,
    deep: true,
  },
)
const isAdmin = computed(() => {
  return route.path.includes('admin')
})
const isProfile = computed(() => {
  return route.path.includes('profile') || route.path.includes('login')
})
const isContact = computed(() => {
  return route.path.includes('contact')
})
</script>
