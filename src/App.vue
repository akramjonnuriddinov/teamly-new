<template>
  <div class="flex flex-col min-h-screen" id="app">
    <Navbar />
    <div class="flex-1">
      <router-view class="main-content" />
    </div>
    <contact-us />
    <Brand />
    <Footer class="main-footer" />
    <scroll-top />
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
import { ref, onMounted } from "vue"
import Navbar from "@/components/static/Navbar.vue"
import Footer from "@/components/static/Footer.vue"
import ScrollTop from "@/components/static/ScrollTop.vue"
import Brand from "@/components/static/Brand.vue"
import PreLoader from "@/components/static/PreLoader.vue"
import ContactUs from "@/components/static/ContactUs.vue"

const isShow = ref(true)

onMounted(() => {
  window.addEventListener("load", () => {
    setTimeout(() => {
      isShow.value = false
    }, 800)
  })
})
</script>

<style>
.preloader-hidden {
  display: none;
}
</style>
