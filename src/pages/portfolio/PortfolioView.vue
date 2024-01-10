<template>
  <div>
    <hero-banner :title="hero_content.title" :text="hero_content.text" :img_url="hero_content.img_url" />
    <portfolio-list />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/HeroBanner.vue'
import PortfolioList from '@/pages/portfolio/PortfolioList.vue'
import { getImageUrl } from '@/composables/getImgUrl'

const hero_content = {
  title: 'Bringing Imagination to Life: Our Portfolio',
  text: 'Every project we embark on is a journey—a journey to shape digital dreams into tangible solutions',
  img_url: getImageUrl('portfolio-view/breadcrumb_img03.png'),
}
</script>
