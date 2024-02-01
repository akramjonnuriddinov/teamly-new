<template>
  <div class="pt-[100px]">
    <section class="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div class="container mx-auto px-5">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div class="relative max-lg:text-center">
            <p class="mb-4 text-xl font-bold text-tg-primary-color max-xl:text-base">
              Weaving Dreams into Digital Realities
            </p>
            <h1 class="mb-4 text-7xl font-bold text-tg-dark-blue-color max-xl:text-5xl max-sm:text-4xl">
              Shaping Digital Dreams
            </h1>
            <p class="mb-4 text-xl text-black max-xl:text-base">
              We help you transform your ideas into reality. Contact us today and let us shape your digital dreams.
            </p>
            <div class="flex items-center justify-between">
              <a href="tel:+998337737737" class="inline-flex items-center">
                <app-animation :options="phoneOptions" :width="90" />
                <span class="whitespace-nowrap text-xl font-semibold max-sm:text-sm">+998 (33) 773-77-37</span>
              </a>
              <a href="https://t.me/m_mirahmad" target="_blank">
                <app-animation :options="telegramOptions1" :width="190" />
              </a>
            </div>
          </div>
          <div class="ml-auto">
            <AppAnimation :options="defaultOptions" :width="600" />
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
import PhoneAnimation from '@/assets/images/animation/phone2.json'
import TelegramAnimation1 from '@/assets/images/animation/telegram1.json'

const customTranslateY = ref(false)

const defaultOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: AnimationJson,
}
const phoneOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: PhoneAnimation,
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
