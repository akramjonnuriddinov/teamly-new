<template>
  <div class="pt-[100px]">
    <section class="bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div class="relative max-lg:text-center">
            <p class="mb-4 text-xl font-bold text-tg-indigo max-xl:text-base">Weaving Dreams into Digital Realities</p>
            <h1 class="mb-4 text-7xl font-bold text-tg-dark-blue-color max-xl:text-5xl max-sm:text-4xl">
              Shaping Digital Dreams
            </h1>
            <p class="text-xl text-black max-xl:text-base">
              We help you transform your ideas into reality. Contact us today and let us shape your digital dreams.
            </p>
            <div class="mt-10 flex items-center max-md:justify-center">
              <base-button>
                <router-link to="/contact">Contact Us</router-link>
              </base-button>
              <a href="https://t.me/teamly_uz" target="_blank">
                <app-animation :options="telegramOptions1" :width="190" />
              </a>
            </div>
          </div>
          <div class="w-full max-[600px]:w-auto">
            <app-animation :options="defaultOptions" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AnimationJson from '@/assets/images/animation/hero3.json'
import AppAnimation from '@/components/AppAnimation.vue'
import TelegramAnimation1 from '@/assets/images/animation/telegram1.json'
import BaseButton from '@/components/BaseButton.vue'

const customTranslateY = ref(false)

const defaultOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: AnimationJson,
}

const telegramOptions1 = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: TelegramAnimation1,
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
      customTranslateY.value = true
    } else {
      customTranslateY.value = false
    }
  })
  // anim.value.playSegments([40, 92], true) // animation-3
})
</script>
