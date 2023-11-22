<template>
  <div class="pt-[86px] service">
    <hero-banner :title="hero_content.title" :text="hero_content.text" :img_url="hero_content.img_url" />
    <Service />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/reusables/HeroBanner2.vue'
import Service from '@/components/home/Service.vue'
import { getImageUrl } from '@/composables/getImgUrl'

const hero_content = {
  title: 'Dreams Transformed: Our Digital Shaping Services',
  text: "We're committed to transforming your innovative ideas into reality, nurturing your digital dreams and bringing them to life.",
  img_url: getImageUrl('service-view/breadcrumb_img.png'),
}
</script>

<style scoped>
.service {
  background-image: url(https://itcroctheme.com/wp/demos/themes/xotric-final/wp-content/uploads/2023/10/hero_bg.svg);
  background-position: top -150px center;
  background-repeat: no-repeat;
}
</style>
