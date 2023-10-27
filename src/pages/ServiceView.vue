<template>
  <div class="mt-[86px]">
    <hero-banner
      :title="hero_content.title"
      :text="hero_content.text"
      :img_url="hero_content.img_url"
    />
    <the-service2 />
    <home-contact />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from "@/components/reusables/HeroBanner.vue"
import TheService2 from "@/components/TheService2.vue"
import HomeContact from "@/components/HomeContact.vue"
import { getImageUrl } from "@/composables/getImgUrl"

const hero_content = {
  title: "Dreams Transformed: Our Digital Shaping Services",
  text: "We're committed to transforming your innovative ideas into reality, nurturing your digital dreams and bringing them to life.",
  img_url: getImageUrl("service-view/breadcrumb_img.png"),
}
</script>
