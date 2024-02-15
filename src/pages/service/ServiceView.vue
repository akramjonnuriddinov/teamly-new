<template>
  <div class="service">
    <hero-banner :title="hero_content.title" :text="hero_content.text" />
    <service-component />
    <work-process />
  </div>
</template>

<script setup lang="ts">
import HeroBanner from '@/components/HeroBanner.vue'
import ServiceComponent from '@/pages/service/ServiceComponent.vue'
import WorkProcess from '@/pages/about/WorkProcess.vue'

const hero_content = {
  title: 'Our Services',
  text: "We're committed to transforming your innovative ideas into reality, nurturing your digital dreams and bringing them to life.",
}
</script>
