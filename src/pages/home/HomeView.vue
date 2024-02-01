<template>
  <div>
    <home-hero />
    <Service />
    <about-us />
    <works-component />
    <project-component />
    <testimonial-component />
    <team-component />
    <blog-component />
  </div>
</template>

<script setup lang="ts">
import HomeHero from '@/pages/home/HomeHero.vue'
import Service from '@/components/static/Service.vue'
import AboutUs from '@/components/static/AboutUs.vue'
import ProjectComponent from '@/pages/home/ProjectComponent.vue'
import TestimonialComponent from '@/pages/home/TestimonialComponent.vue'
import TeamComponent from '@/pages/home/TeamComponent.vue'
import BlogComponent from '@/pages/blog/BlogComponent.vue'
import WorksComponent from '@/pages/home/WorksComponent.vue'
</script>
