<template>
  <section class="bg-no-repeat bg-cover bg-[#F9F9FA]">
    <div
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="flex justify-between max-[990px]:flex-wrap max-[990px]:items-center max-[990px]:justify-center max-[990px]:pb-[110px] max-[990px]:pt-[50px]"
      >
        <div
          class="relative pt-[100px] w-full max-w-2xl max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-[990px]:pt-[50px]"
        >
          <h1
            class="mb-4 text-[50px] font-semibold leading-[1.2] text-tg-heading-font-color max-[990px]:text-center max-sm:text-4xl"
          >
            {{ props.title }}
          </h1>
          <p class="mb-10 text-lg text-[#757589] max-[990px]:text-center">
            {{ props.text }}
          </p>
          <router-link
            class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[25px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
            to="/"
            >Get Started</router-link
          >
        </div>
        <img
          class="max-w-[470px] w-full pt-[100px] max-[990px]:pb-0 max-[990px]:pt-16 pb-8"
          data-aos=""
          data-aos-duration="3000"
          :src="props.img_url"
          alt="img"
        />
      </div>
      <div class="absolute banner-shaper"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  text?: string
  img_url?: string
}>()
</script>
