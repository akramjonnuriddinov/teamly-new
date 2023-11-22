<template>
  <section class="hero-banner pb-[290px]">
    <div class="absolute top-0 pt-[150px] w-full h-full">
      <img class="img1 absolute left-10 max-w-[300px]" src="../../assets/images/hero_img01.png" alt="" />
      <img class="absolute right-0 max-w-[350px]" src="../../assets/images/hero_img02.png" alt="" />
    </div>
    <div
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="relative pt-[80px] flex flex-col items-center w-full max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <h1
          class="max-w-[700px] mb-4 text-[60px] font-extrabold text-tg-heading-font-color leading-[1.2] text-center max-sm:text-4xl"
        >
          Our Digital Shaping Services
        </h1>
        <p class="max-w-xl text-center mb-10 text-lg text-[#757589]">
          We're committed to transforming your innovative ideas into reality, nurturing your digital dreams and bringing
          them to life.
        </p>
        <base-button>Get Started</base-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
</script>

<style scoped>
.img1 {
  animation: photo-object-floating 4.5s infinite ease-in-out alternate;
}

@keyframes photo-object-floating {
  0% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(30px);
  }
}
</style>
