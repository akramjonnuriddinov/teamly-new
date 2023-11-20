<template>
  <div class="flex flex-col" id="app">
    <Navbar v-if="!isAdmin" />
    <div class="flex-1">
      <router-view class="main-content" />
    </div>
    <div v-if="!isAdmin && !isLoading()">
      <contact-us />
      <Brand />
      <Footer class="main-footer" />
      <scroll-top />
    </div>
    <loader-wrapper v-if="isLoading()">
      <app-loader />
    </loader-wrapper>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/static/Navbar.vue'
import Footer from '@/components/static/Footer.vue'
import ScrollTop from '@/components/static/ScrollTop.vue'
import Brand from '@/components/static/Brand.vue'
import ContactUs from '@/components/static/ContactUs.vue'
import AppLoader from '@/components/static/AppLoader.vue'
import LoaderWrapper from '@/components/static/LoaderWrapper.vue'
import { isLoading } from '@/composables/loader'

const route = useRoute()

const isAdmin = computed(() => {
  return route.path.includes('admin') || route.path.includes('createBlog')
})
</script>
