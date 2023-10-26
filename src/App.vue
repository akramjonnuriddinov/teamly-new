<template>
  <div class="flex flex-col min-h-screen" id="app">
    <the-navbar />
    <div class="flex-1">
      <router-view class="main-content" />
    </div>
    <the-brand />
    <the-footer class="main-footer" />
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
import TheNavbar from "@/components/TheNavbar.vue"
import TheFooter from "@/components/TheFooter.vue"
import ScrollTop from "@/components/ScrollTop.vue"
import TheBrand from "@/components/TheBrand.vue"
import PreLoader from "@/components/PreLoader.vue"

const isShow = ref(true)

onMounted(() => {
  window.addEventListener("load", () => {
    setTimeout(() => {
      isShow.value = false
    }, 1500)
  })
})
</script>

<style>
.preloader-hidden {
  display: none;
}
</style>
