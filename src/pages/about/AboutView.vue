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
import { useHead } from '@vueuse/head'
import { getImageUrl } from '@/composables/getImgUrl'
import { useRoute } from 'vue-router'

const route = useRoute()
const meta = {
  title: 'Software Development Company | Teamly UZ',
  url: `teamly.uz${route.path}`,
  description:
    'Custom software development company "Teamly UZ" is a team of professionals with web app development expertise. Learn more about our services.',
  image: getImageUrl('logos/logo.png'),
}

useHead({
  title: meta.title,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: meta?.description,
    },
    { hid: 'og:title', property: 'og:title', content: meta?.title },
    { hid: 'og:url', property: 'og:url', content: meta?.url },
    { hid: 'og:description', property: 'og:description', content: meta?.description },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:image', property: 'og:image', content: meta?.image },
  ],
})

const hero_content = {
  title: 'About Teamly',
  text: 'We are a team of dedicated professionals with a shared vision - to shape dreams into tangible digital experiences',
}
</script>
