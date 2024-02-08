<template>
  <div
    @click.stop="toggle"
    class="relative flex w-[100px] cursor-pointer items-center font-bold uppercase text-gray-600"
  >
    <button @click.stop="toggle" type="button" class="flex items-center">
      <img class="mr-2 h-5 w-5 rounded-full" src="@/assets/images/flags/usa.png" alt="flag" />
      <span>En</span>
    </button>
    <ul
      v-if="isShow"
      class="absolute left-0 top-10 z-30 w-full -translate-x-[16px] rounded-lg border bg-white p-4 text-base font-bold text-gray-600 shadow-lg transition"
    >
      <li class="mb-3">
        <button class="flex items-center">
          <img class="mr-2 h-5 w-5 rounded-full" src="@/assets/images/flags/usa.png" alt="" />
          <span class="block w-full whitespace-nowrap p-0 uppercase">en</span>
        </button>
      </li>
      <li class="mb-3">
        <button
          disabled
          class="flex items-center disabled:cursor-not-allowed disabled:text-tg-paragraph-color disabled:opacity-70"
        >
          <img class="mr-2 h-5 w-5 rounded-full" src="@/assets/images/flags/uz.svg" alt="" />
          <span class="block w-full whitespace-nowrap p-0 uppercase">uz</span>
        </button>
      </li>
      <li>
        <button
          disabled
          class="flex items-center disabled:cursor-not-allowed disabled:text-tg-paragraph-color disabled:opacity-70"
        >
          <img class="mr-2 h-5 w-5 rounded-full" src="@/assets/images/flags/ru.svg" alt="" />
          <span class="block w-full whitespace-nowrap p-0 uppercase"> ru </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref(false)

const toggle = () => (isShow.value = !isShow.value)
</script>
