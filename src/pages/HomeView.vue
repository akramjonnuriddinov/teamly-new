<template>
  <div class="header-hero-wrapper">
    <banner-area />
    <the-service />
    <about-company />
    <our-project />
    <client-testimonial />
    <our-team />
    <our-blog />
    <home-contact />
    <the-brand />
  </div>
</template>

<script setup lang="ts">
import BannerArea from "@/components/BannerArea.vue"
import TheService from "@/components/TheService.vue"
import AboutCompany from "@/components/AboutCompany.vue"
import OurProject from "@/components/OurProject.vue"
import ClientTestimonial from "@/components/ClientTestimonial.vue"
import OurTeam from "@/components/OurTeam.vue"
import OurBlog from "@/components/OurBlog.vue"
import HomeContact from "@/components/HomeContact.vue"
import TheBrand from "@/components/TheBrand.vue"
</script>

<style scoped>
.header-hero-wrapper {
  overflow-x: hidden;
}
.header-hero-wrapper::before {
  content: "";
  position: absolute;
  top: -195px;
  left: -117px;
  max-width: 1077px;
  width: 100%;
  height: 1077px;
  background-image: linear-gradient(
    209.85deg,
    rgba(0, 178, 255, 0.1) 18.23%,
    rgba(255, 0, 15, 0) 96.18%
  );
  filter: blur(150px);
  z-index: -1;
  background-size: cover;
}
</style>
