<template>
  <div class="header-hero-wrapper">
    <home-hero />
    <Service />
    <about-us />
    <works-component />
    <project-component />
    <testimonial-component />
    <team-component />
    <blog-component />
  </div>
  <loader-wrapper v-if="isLoading()">
    <app-loader />
  </loader-wrapper>
</template>

<script setup lang="ts">
import HomeHero from '@/pages/home/HomeHero2.vue'
import Service from '@/components/static/Service.vue'
import AboutUs from '@/components/static/AboutUs.vue'
import ProjectComponent from '@/pages/home/ProjectComponent.vue'
import TestimonialComponent from '@/pages/home/TestimonialComponent.vue'
import TeamComponent from '@/pages/home/TeamComponent.vue'
import BlogComponent from '@/pages/blog/BlogComponent.vue'
import AppLoader from '@/components/AppLoader.vue'
import LoaderWrapper from '@/components/LoaderWrapper.vue'
import { isLoading } from '@/composables/loader'
import WorksComponent from '@/pages/home/WorksComponent.vue'
</script>

<style scoped>
.header-hero-wrapper {
  overflow-x: hidden;
}
.header-hero-wrapper::before {
  content: '';
  position: absolute;
  top: -195px;
  left: -117px;
  max-width: 1077px;
  width: 100%;
  height: 1077px;
  /* background-image: linear-gradient(209.85deg, rgba(0, 178, 255, 0.1) 18.23%, rgba(255, 0, 15, 0) 96.18%); */
  filter: blur(150px);
  z-index: -1;
  background-size: cover;
}
</style>
