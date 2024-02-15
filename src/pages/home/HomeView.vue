<template>
  <div>
    <home-hero />
    <service-component />
    <about-us />
    <stats-component />
    <portfolio-component @openModal="openModal" />
    <testimonial-component />
    <team-component />
    <blog-component />
    <portfolio-detail v-if="modalOpen" @close="closeModal" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeHero from '@/pages/home/HomeHero.vue'
import ServiceComponent from '@/pages/service/ServiceComponent.vue'
import AboutUs from '@/pages/about/AboutUs.vue'
import PortfolioComponent from '@/pages/portfolio/PortfolioComponent.vue'
import TestimonialComponent from '@/pages/home/TestimonialComponent.vue'
import TeamComponent from '@/pages/home/TeamComponent.vue'
import BlogComponent from '@/pages/blog/BlogComponent.vue'
import StatsComponent from '@/pages/home/StatsComponent.vue'
import PortfolioDetail from '@/pages/portfolio/PortfolioDetail.vue'

const modalOpen = ref(false)
const option = ref<any>()

const openModal = (data: any) => {
  modalOpen.value = true
  option.value = data
  document.body.style.overflow = 'hidden'
}
const closeModal = () => {
  modalOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>
