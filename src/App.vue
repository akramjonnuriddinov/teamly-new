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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import ScrollTop from '@/components/ScrollTop.vue'
import ContactUs from '@/components/ContactUs.vue'
import { useHead } from '@vueuse/head'
import { getImageUrl } from './composables/getImgUrl'

const meta = {
  title: 'Teamly UZ - Shaping Digital Dreams!',
  url: 'teamly.uz',
  description:
    'Custom software development company. We create world-class e-Commerce platforms, custom web portals, and enterprise-grade web apps',
  image: getImageUrl('logos/logo.png'),
}

useHead({
  title: 'Teamly UZ - Shaping Digital Dreams!',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: meta?.description,
    },
    { hid: 'og:title', property: 'og:title', content: meta?.title },
    { hid: 'og:url', property: 'og:url', content: meta?.url },
    { hid: 'og:description', property: 'og:description', content: meta?.description },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:image', property: 'og:image', content: meta?.image },
  ],
})

const route = useRoute()
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
