<template>
  <div
    :class="{
      'translate-y-[100%]': translateYCustom,
      'translate-y-[-28px]': !translateYCustom,
    }"
    class="fixed bottom-0 right-12 z-50 flex flex-col items-center transition-all duration-700 ease-out"
  >
    <a href="tel:+998337737737" class="hidden">
      <app-animation :options="defaultOptions" :width="90" :speed="1" />
    </a>
    <a
      class="flex h-[50px] w-[50px] items-center justify-center rounded-md bg-tg-primary-color text-white hover:bg-tg-secondary-color"
      href="#"
    >
      <inline-svg src="svg/arrow-top.svg" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InlineSvg from '@/components/InlineSvg.vue'
import AppAnimation from '@/components/AppAnimation.vue'
import PhoneAnimation from '@/assets/images/animation/phone2.json'

const translateYCustom = ref(true)
const defaultOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: PhoneAnimation,
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
      translateYCustom.value = false
    } else {
      translateYCustom.value = true
    }
  })
})
</script>
