<template>
  <the-navbar />
  <router-view />
  <the-brand />
  <the-footer />
  <scroll-top />
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue"
import TheFooter from "@/components/TheFooter.vue"
import ScrollTop from "@/components/ScrollTop.vue"
import TheBrand from "@/components/TheBrand.vue"
</script>
