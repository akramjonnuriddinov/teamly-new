<template>
  <div>
    <hero-banner :title="hero_content.title" :text="hero_content.text" :img_url="hero_content.img_url" />
    <about-us />
    <work-process />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/reusables/HeroBanner.vue'
import AboutUs from '@/components/about/AboutUs.vue'
import WorkProcess from '@/components/about/WorkProcess.vue'
import { getImageUrl } from '@/composables/getImgUrl'
import { onMounted } from 'vue'
import { toggleLoader } from '@/composables/loader'

const hero_content = {
  title: 'Welcome to Teamly: Where Digital Expertise Shapes Dreams',
  text: 'We are a team of dedicated professionals with a shared vision - to shape dreams into tangible digital experiences',
  img_url: getImageUrl('about-view/breadcrumb_img02.png'),
}

onMounted(() => {
  window.addEventListener('DOMContentLoaded', () => {
    toggleLoader()
    console.log('fsafsd')
  })
})
</script>
