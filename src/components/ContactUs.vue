<template>
  <section class="bg-white py-32">
    <div class="container relative mx-auto px-5">
      <div
        class="flex items-center justify-between rounded-[30px] bg-tg-primary-color px-[100px] py-[85px] max-[990px]:px-[20px]"
      >
        <div
          class="relative w-full max-w-2xl max-xl:max-w-full max-[990px]:flex max-[990px]:max-w-full max-[990px]:flex-col max-[990px]:items-center"
        >
          <span class="mb-3 text-lg font-bold text-tg-white">Unlock Success</span>
          <h2 class="mb-7 text-5xl font-bold leading-[1.2] text-tg-white max-[990px]:text-center max-sm:text-4xl">
            Need a Successful
            <br class="max-[990px]:hidden" />
            Our Project?
          </h2>
          <router-link :to="{ name: 'contact' }">
            <base-button :size="ESize.MEDIUM" :theme="EThemes.WHITE"> Contact Us </base-button>
          </router-link>
        </div>
        <div class="absolute right-10 top-1/2 -translate-y-1/2 max-xl:hidden">
          <app-animation :options="defaultOptions" :width="500" @animCreated="handleAnimation" :speed="1" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { EThemes, ESize } from '@/types'
import AppAnimation from '@/components/AppAnimation.vue'
import ThinkAnimation from '@/assets/images/animation/contact1.json'
import { ref } from 'vue'

const anim = ref()
const defaultOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: ThinkAnimation,
}

const handleAnimation = (createdAnim: any) => {
  anim.value = createdAnim
}
</script>

<style scoped>
::selection {
  @apply text-tg-primary-color-two;
}
</style>
