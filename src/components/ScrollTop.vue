<template>
  <div
    :class="{
      'translate-y-[100%]': translateYCustom,
      'translate-y-[-28px]': !translateYCustom,
    }"
    class="fixed bottom-0 right-12 z-50 flex flex-col items-center transition-all duration-700 ease-out"
  >
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

const translateYCustom = ref(true)

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
