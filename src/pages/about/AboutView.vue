<template>
  <div>
    <hero-banner :title="hero_content.title" :text="hero_content.text" />
    <about-component />
    <about-us />
  </div>
  <team-component />
</template>

<script setup lang="ts">
import HeroBanner from '@/components/HeroBanner.vue'
import AboutComponent from '@/pages/about/AboutComponent.vue'
import AboutUs from '@/pages/about/AboutUs.vue'
import TeamComponent from '@/pages/home/TeamComponent.vue'

const hero_content = {
  title: 'About Teamly',
  text: 'We are a team of dedicated professionals with a shared vision - to shape dreams into tangible digital experiences',
}
</script>
