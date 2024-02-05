<template>
  <div>
    <home-hero />
    <service-component />
    <about-us />
    <works-component />
    <portfolio-component />
    <testimonial-component />
    <team-component />
    <blog-component />
  </div>
</template>

<script setup lang="ts">
import HomeHero from '@/pages/home/HomeHero.vue'
import ServiceComponent from '@/components/static/ServiceComponent.vue'
import AboutUs from '@/components/static/AboutUs.vue'
import PortfolioComponent from '@/pages/portfolio/PortfolioComponent.vue'
import TestimonialComponent from '@/pages/home/TestimonialComponent.vue'
import TeamComponent from '@/pages/home/TeamComponent.vue'
import BlogComponent from '@/pages/blog/BlogComponent.vue'
import WorksComponent from '@/pages/home/WorksComponent.vue'
</script>
