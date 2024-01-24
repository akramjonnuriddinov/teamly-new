<template>
  <div>
    <hero-banner :title="hero_content.title" :text="hero_content.text" :img_url="hero_content.img_url" />
    <about-us />
    <work-process />
  </div>
  <team-component />
</template>

<script setup lang="ts">
import HeroBanner from '@/components/HeroBanner.vue'
import AboutUs from '@/components/static/AboutUs.vue'
import WorkProcess from '@/pages/about/WorkProcess.vue'
import { getImageUrl } from '@/composables/getImgUrl'
import TeamComponent from '@/pages/home/TeamComponent.vue'

const hero_content = {
  title: 'About Teamly',
  text: 'We are a team of dedicated professionals with a shared vision - to shape dreams into tangible digital experiences',
  img_url: getImageUrl('about-view/breadcrumb_img02.png'),
}
</script>
