<template>
  <div class="header-hero-wrapper">
    <home-hero />
    <Service />
    <about-us />
    <works />
    <Project />
    <the-testimonial />
    <Team />
    <Blog />
  </div>
  <loader-wrapper v-if="isLoading()">
    <app-loader />
  </loader-wrapper>
</template>

<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import Service from '@/components/home/Service.vue'
import AboutUs from '@/components/about/AboutUs.vue'
import Project from '@/components/portfolio/Project.vue'
import TheTestimonial from '@/components/static/TheTestimonial.vue'
import Team from '@/components/team/Team.vue'
import Blog from '@/components/blog/Blog.vue'
import AppLoader from '@/components/static/AppLoader.vue'
import LoaderWrapper from '@/components/static/LoaderWrapper.vue'
import { isLoading } from '@/composables/loader'
import Works from '@/components/about/Works.vue'
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
  background-image: linear-gradient(209.85deg, rgba(0, 178, 255, 0.1) 18.23%, rgba(255, 0, 15, 0) 96.18%);
  filter: blur(150px);
  z-index: -1;
  background-size: cover;
}
</style>
