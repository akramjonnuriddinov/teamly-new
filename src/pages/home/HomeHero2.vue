<template>
  <div class="pt-[100px]">
    <section class="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div class="relative">
            <p class="mb-3 font-font1 text-lg font-bold text-tg-primary-color">Weaving Dreams into Digital Realities</p>
            <h1 class="mt-4 text-7xl font-bold text-tg-dark-blue-color">Shaping Digital Dreams</h1>
            <p class="mt-4 font-font1 text-base text-black sm:text-xl lg:mt-8">
              We help you transform your ideas into reality. Contact us today and let us shape your digital dreams.
            </p>
            <div class="mt-5 flex items-center justify-between">
              <a href="tel:+998337737737" class="inline-flex items-center py-4">
                <app-animation :options="phoneOptions" :width="90" />
                <span class="text-xl font-semibold">+998 (33) 773-77-37</span>
              </a>
              <a href="https://t.me/m_mirahmad" class="" target="_blank">
                <app-animation :options="telegramOptions1" :width="190" />
              </a>
            </div>
          </div>
          <div>
            <div class="w-full">
              <AppAnimation :options="defaultOptions" :width="600" />
            </div>
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
