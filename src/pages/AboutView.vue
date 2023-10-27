<template>
  <div class="mt-[86px]">
    <hero-banner
      :title="hero_content.title"
      :text="hero_content.text"
      :img_url="hero_content.img_url"
    />
    <about-company />
    <work-process />
    <home-contact />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from "@/components/reusables/HeroBanner.vue"
import AboutCompany from "@/components/AboutCompany.vue"
import HomeContact from "@/components/HomeContact.vue"
import WorkProcess from "@/components/WorkProcess.vue"
import { getImageUrl } from "@/composables/getImgUrl"

const hero_content = {
  title: "Welcome to Teamly: Where Digital Expertise Shapes Dreams",
  text: "We are a team of dedicated professionals with a shared vision - to shape dreams into tangible digital experiences",
  img_url: getImageUrl("about-view/breadcrumb_img02.png"),
}
</script>
