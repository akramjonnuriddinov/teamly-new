<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue"
import TheFooter from "@/components/TheFooter.vue"
import ScrollTop from "@/components/ScrollTop.vue"
</script>

<template>
  <the-navbar />
  <router-view />
  <the-footer />
  <scroll-top />
</template>

<style></style>
