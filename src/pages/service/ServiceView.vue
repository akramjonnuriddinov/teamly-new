<template>
  <div class="service">
    <hero-banner :title="hero_content.title" :text="hero_content.text" :img_url="hero_content.img_url" />
    <service-component />
    <work-process />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/HeroBanner.vue'
import ServiceComponent from '@/components/static/ServiceComponent.vue'
import { getImageUrl } from '@/composables/getImgUrl'
import WorkProcess from '@/pages/about/WorkProcess.vue'

const hero_content = {
  title: 'Our Services',
  text: "We're committed to transforming your innovative ideas into reality, nurturing your digital dreams and bringing them to life.",
  img_url: getImageUrl('service-view/breadcrumb_img.png'),
}
</script>

<style scoped>
.service {
  /* background-image: url(https://itcroctheme.com/wp/demos/themes/xotric-final/wp-content/uploads/2023/10/hero_bg.svg);
  background-position: top -220px center;
  background-repeat: no-repeat; */
}
</style>
