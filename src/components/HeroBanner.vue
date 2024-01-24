<template>
  <section class="mt-[86px] bg-[#F9F9FA] bg-cover bg-no-repeat">
    <div
      class="container relative mx-auto max-w-7xl px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div
        class="flex justify-between max-[990px]:flex-wrap max-[990px]:items-center max-[990px]:justify-center max-[990px]:pb-[110px] max-[990px]:pt-[50px]"
      >
        <div
          class="relative w-full max-w-2xl pt-[100px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-[990px]:pt-[50px]"
        >
          <h1
            class="mb-4 text-[50px] font-semibold leading-[1.6] text-tg-heading-font-color max-[990px]:text-center max-sm:text-4xl"
          >
            {{ props.title }}
          </h1>
          <p class="mb-10 text-lg text-[#757589] max-[990px]:text-center">
            {{ props.text }}
          </p>
          <base-button> <router-link to="/contact"> Get Started </router-link> </base-button>
        </div>
        <img
          class="w-full max-w-[470px] pb-8 pt-[100px] max-[990px]:pb-0 max-[990px]:pt-16"
          data-aos=""
          data-aos-duration="3000"
          :src="props.img_url"
          alt="img"
        />
      </div>
      <div class="banner-shaper absolute"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps<{
  title?: string
  text?: string
  img_url?: string
}>()
</script>
