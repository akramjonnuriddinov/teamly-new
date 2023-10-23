<template>
  <div>
    <a
      class="fixed z-50 rounded-md transition-all duration-700 ease-out bottom-0 right-12 text-white bg-tg-primary-color w-[50px] h-[50px] flex items-center justify-center hover:bg-tg-secondary-color max-[767px]:w-8 max-[767px]:h-8"
      :class="{
        'translate-y-[100%]': translateYCustom,
        'translate-y-[-28px]': !translateYCustom,
      }"
      href="#"
    >
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
      >
        <path
          d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"
        />
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

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
