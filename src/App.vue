<template>
  <div class="flex flex-col min-h-screen" id="app">
    <Navbar v-if="!isAdmin" />
    <div class="flex-1">
      <router-view class="main-content" />
    </div>
    <div v-if="!isAdmin">
      <contact-us />
      <Brand />
      <Footer class="main-footer" />
      <scroll-top />
    </div>
    <div
      v-if="isShow"
      class="overflow-hidden transition-all duration-500"
      :class="{ 'opacity-0 -z-50': !isShow }"
    >
      <pre-loader />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import Navbar from "@/components/static/Navbar.vue"
import Footer from "@/components/static/Footer.vue"
import ScrollTop from "@/components/static/ScrollTop.vue"
import Brand from "@/components/static/Brand.vue"
import PreLoader from "@/components/static/PreLoader.vue"
import ContactUs from "@/components/static/ContactUs.vue"
import { useRoute } from "vue-router"

const route = useRoute()

const isShow = ref(true)

onMounted(() => {
  window.addEventListener("load", () => {
    setTimeout(() => {
      isShow.value = false
    }, 800)
  })
})

const isAdmin = computed(() => {
  return route.path.includes("admin")
})
</script>

<style>
.preloader-hidden {
  display: none;
}
</style>
