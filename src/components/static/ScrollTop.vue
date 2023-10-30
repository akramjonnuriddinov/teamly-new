<template>
  <div>
    <a
      class="fixed z-50 rounded-md transition-all duration-700 ease-out bottom-0 right-12 text-white bg-tg-primary-color w-[50px] h-[50px] flex items-center justify-center hover:bg-tg-secondary-color"
      :class="{
        'translate-y-[100%]': translateYCustom,
        'translate-y-[-28px]': !translateYCustom,
      }"
      href="#"
    >
      <arrow-top />
    </a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import ArrowTop from "@/components/icons/ArrowTop.vue"

const translateYCustom = ref(true)

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
      translateYCustom.value = false
    } else {
      translateYCustom.value = true
    }
  })
})
</script>
