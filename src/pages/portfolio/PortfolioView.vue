<template>
  <div>
    <hero-banner :title="hero_content.title" :text="hero_content.text" />
    <portfolio-component @openModal="openModal" />
    <portfolio-detail v-if="modalOpen" @close="closeModal" :option="option" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import PortfolioComponent from '@/pages/portfolio/PortfolioComponent.vue'
import PortfolioDetail from '@/pages/portfolio/PortfolioDetail.vue'

const hero_content = {
  title: 'Our Portfolio',
  text: 'Every project we embark on is a journey—a journey to shape digital dreams into tangible solutions',
}
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
