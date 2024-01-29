<template>
  <section class="banner-area relative z-[1] overflow-hidden min-[1400px]:h-auto min-[1400px]:min-h-screen">
    <div
      class="container relative mx-auto max-w-7xl px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div
        class="flex justify-between pt-[75px] max-[990px]:flex-col-reverse max-[990px]:flex-wrap max-[990px]:items-center max-[990px]:justify-center max-[990px]:pb-[110px] max-[990px]:pt-[50px]"
      >
        <div
          class="relative mx-auto w-full max-w-[64rem] pt-[100px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[40px] min-[1400px]:pt-[200px]"
        >
          <h1
            class="mb-4 text-center text-6xl font-bold leading-[1.2] text-tg-dark-blue-color max-[990px]:text-center max-sm:text-4xl min-[1400px]:text-[70px]"
          >
            Shaping Digital <br />
            Dreams
          </h1>
          <span class="flex justify-center text-center text-[3rem] font-bold text-tg-primary-color-two"
            >Identity Verification & PII Storage</span
          >
          <p class="mb-10 text-center text-lg text-tg-heading-font-color max-[990px]:text-center">
            We help you transform your ideas into reality. Contact us today and let us shape your digital dreams.
          </p>
          <div class="flex w-full items-center justify-center gap-5">
            <base-button>
              <router-link to="/contact"> Get Started </router-link>
            </base-button>
            <base-button class="border-2" :theme="EThemes.WHITE">
              <router-link to="/contact"> Contact </router-link>
            </base-button>
          </div>
        </div>
        <div v-if="false" class="preloader__animation absolute -right-[200px] top-[280px]">
          <AppAnimation :options="defaultOptions" :width="600" @animCreated="handleAnimation" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import AnimationJson from '@/assets/images/animation/home-hero-animation-8.json'
import AppAnimation from '@/components/AppAnimation.vue'
import { EThemes } from '@/types'

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
