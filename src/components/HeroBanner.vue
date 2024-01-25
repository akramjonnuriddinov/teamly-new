<template>
  <section>
    <div
      class="container relative mx-auto max-w-7xl px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div
        class="relative flex w-full flex-col items-center pt-[216px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <h1 class="mb-4 text-center text-[70px] font-extrabold leading-[1.2] text-tg-dark-blue-color max-sm:text-4xl">
          {{ props.title }}
        </h1>
        <p class="mb-10 max-w-3xl text-center text-lg text-[#757589]">
          {{ props.text }}
        </p>
        <button
          class="flex items-center gap-2 text-lg font-bold text-tg-primary-color transition-all duration-500 hover:text-tg-secondary-color"
          type="button"
        >
          <span>Get Started</span>
          <arrow-circle-icon />
        </button>
      </div>
    </div>
  </section>
  <!-- <section class="mt-[86px] bg-[#F9F9FA] bg-cover bg-no-repeat">
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
          ></h1>
          <p class="mb-10 text-lg text-[#757589] max-[990px]:text-center"></p>
          <base-button> <router-link to="/contact"> Get Started </router-link> </base-button>
        </div>
      </div>
      <div class="absolute banner-shaper"></div>
    </div>
  </section> -->
</template>

<script setup lang="ts">
import ArrowCircleIcon from '@/components/icons/ArrowCircleIcons.vue'

const props = defineProps<{
  title?: string
  text?: string
  img_url?: string
}>()
</script>
