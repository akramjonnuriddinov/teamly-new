<template>
  <section class="banner-area">
    <div class="container relative px-5 mx-auto max-w-7xl">
      <div class="flex pt-[75px] items-center justify-between">
        <div class="relative w-full max-w-2xl">
          <img
            class="absolute transition-all duration-1000 ease-out -top-10 -left-10"
            :class="{
              'translate-x-[50px]': customTranslateY,
              'translate-x-[0]': !customTranslateY,
            }"
            src="@/assets/images/banner_shape01.png"
            alt=""
          />
          <h1
            style="line-height: 1.2"
            class="mb-4 text-6xl font-bold text-tg-heading-font-color"
          >
            Shaping Digital Dreams
          </h1>
          <p class="mb-10 text-lg text-tg-heading-font-color">
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
.banner-area {
  position: relative;
  z-index: 1;
  overflow: hidden;
}
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
