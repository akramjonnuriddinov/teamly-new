<template>
  <section class="banner-area relative overflow-hidden z-[1] h-screen">
    <div
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="flex justify-between max-[990px]:flex-wrap max-[990px]:flex-col-reverse max-[990px]:items-center max-[990px]:justify-center max-[990px]:pb-[110px] max-[990px]:pt-[50px]"
      >
        <div
          class="relative pt-[100px] w-full max-w-2xl max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[40px]"
        >
          <img
            class="absolute transition-all duration-1000 ease-out top-10 -left-10 max-sm:top-0"
            :class="{
              'translate-x-[50px]': customTranslateY,
              'translate-x-[0]': !customTranslateY,
            }"
            src="@/assets/images/banner_shape01.png"
            alt=""
          />
          <h1
            class="mb-4 text-6xl font-bold leading-[1.2] text-tg-heading-font-color max-[990px]:text-center max-sm:text-4xl"
          >
            Shaping Digital Dreams
          </h1>
          <p
            class="mb-10 text-lg text-tg-heading-font-color max-[990px]:text-center"
          >
            We help you transform your ideas into reality. Contact us today and
            let us shape your digital dreams.
          </p>
          <router-link
            class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[25px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
            to="/"
            >Get Started</router-link
          >
        </div>
        <img
          class="max-w-[470px] w-full pt-[30px] max-[990px]:pb-0 max-[990px]:pt-16 pb-[130px]"
          data-aos=""
          data-aos-duration="3000"
          src="@/assets/images/banner_img.png"
          alt=""
        />
      </div>
      <img
        class="absolute transition-all duration-1000 ease-out -left-5 -bottom-0"
        :class="{
          'translate-y-[80px]': customTranslateY,
          'translate-x-[0]': !customTranslateY,
        }"
        src="@/assets/images/banner_shape03.png"
        alt=""
      />
      <div class="absolute banner-shaper"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

const customTranslateY = ref(false)

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
      customTranslateY.value = true
    } else {
      customTranslateY.value = false
    }
  })
})
</script>

<style scoped>
.banner-area::after {
  content: "";
  position: absolute;
  right: -389px;
  bottom: -430px;
  width: 1035px;
  height: 950px;
  background: #fa4729;
  border-radius: 50% 50% 50% 50% / 45% 45% 55% 55%;
  will-change: border-radius, transform, opacity;
  animation: bannerShape 10s linear infinite;
  display: block;
  z-index: -1;
}

@media (max-width: 990px) {
  .banner-area::after {
    display: none;
  }
}

@keyframes bannerShape {
  0%,
  100% {
    border-radius: 45% 55% 60% 40% / 45% 45% 55% 55%;
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  34% {
    border-radius: 60% 50% 46% 54% / 40% 39% 61% 60%;
    transform: translate3d(0, 5px, 0) rotateZ(0.01deg);
  }
  50% {
    transform: translate3d(0, 0, 0) rotateZ(0.01deg);
  }
  67% {
    border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%;
    transform: translate3d(0, -3px, 0) rotateZ(0.01deg);
  }
}
</style>
