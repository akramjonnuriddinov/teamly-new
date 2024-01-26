<template>
  <section class="banner-area relative z-[1] overflow-hidden min-[1400px]:h-auto min-[1400px]:min-h-screen">
    <div
      class="container relative mx-auto max-w-7xl px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div
        class="flex justify-between pt-[75px] max-[990px]:flex-col-reverse max-[990px]:flex-wrap max-[990px]:items-center max-[990px]:justify-center max-[990px]:pb-[110px] max-[990px]:pt-[50px]"
      >
        <div
          class="relative w-full max-w-2xl pt-[100px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[40px] min-[1400px]:pt-[200px]"
        >
          <img
            class="absolute transition-all duration-1000 ease-out -left-10 top-10 max-sm:top-0"
            :class="{
              'translate-x-[50px]': customTranslateY,
              'translate-x-[0]': !customTranslateY,
            }"
            src="@/assets/images/banner_shape01.png"
            alt=""
          />
          <h1
            class="mb-4 text-6xl font-bold leading-[1.2] text-tg-dark-blue-color max-[990px]:text-center max-sm:text-4xl min-[1400px]:text-[70px]"
          >
            Shaping Digital Dreams
          </h1>
          <p class="mb-10 text-lg text-tg-heading-font-color max-[990px]:text-center">
            We help you transform your ideas into reality. Contact us today and let us shape your digital dreams.
          </p>
          <base-button> <router-link to="/contact"> Get Started </router-link> </base-button>
        </div>
        <div class="preloader__animation absolute -right-[200px] top-[280px]">
          <AppAnimation :options="defaultOptions" :width="600" @animCreated="handleAnimation" />
        </div>
      </div>
      <img
        class="absolute transition-all duration-1000 ease-out -bottom-40 -left-5"
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
import { onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import AnimationJson from '@/assets/images/animation/home-hero-animation-8.json'
import AppAnimation from '@/components/AppAnimation.vue'

const customTranslateY = ref(false)
const anim = ref<any>(null)

const defaultOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: AnimationJson,
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
      customTranslateY.value = true
    } else {
      customTranslateY.value = false
    }
  })
  // anim.value.playSegments([85, 181], true) // animation-3
})

const handleAnimation = (createdAnim: any) => {
  anim.value = createdAnim
}
</script>

<style scoped>
.banner-image {
  margin-right: -200px;
}
.banner-area::after {
  /* content: ''; */
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
@media (min-width: 1400px) {
  .banner-area::after {
    width: 1400px;
    height: 1200px;
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
