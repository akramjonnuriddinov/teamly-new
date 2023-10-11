<template>
  <div class="banner-area">
    <banner-area />
    <the-service />
    <about-company />
    <our-project />
  </div>
</template>

<script setup lang="ts">
import BannerArea from "@/components/BannerArea.vue"
import TheService from "@/components/TheService.vue"
import AboutCompany from "@/components/AboutCompany.vue"
import OurProject from "@/components/OurProject.vue"
</script>

<style>
.banner-area::before {
  content: "";
  position: absolute;
  top: -195px;
  left: -117px;
  width: 1077px;
  height: 1077px;
  background: linear-gradient(
    209.85deg,
    rgba(0, 178, 255, 0.1) 18.23%,
    rgba(255, 0, 15, 0) 96.18%
  );
  filter: blur(150px);
  z-index: -1;
}
</style>
