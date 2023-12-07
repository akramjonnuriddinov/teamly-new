<template>
  <section
    class="h-screen overflow-y-auto bg-[#ffffff88] flex justify-center items-start fixed top-0 left-0 w-[100vw] z-50"
  >
    <div class="h-auto max-w-lg mx-auto mt-4 mb-4 bg-gray-900 rounded-lg shadow-2xl">
      <div class="flex flex-col items-center pt-6 pb-6 pl-6 pr-6">
        <img
          src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
          class="flex flex-shrink-0 object-cover object-center w-16 h-16 ml-auto mr-auto -mb-8 rounded-full shadow-xl btn-"
        />
        <p class="mt-8 text-2xl font-semibold leading-none tracking-tighter text-white lg:text-3xl">Mark Xenon</p>
        <p class="mt-3 text-base leading-relaxed text-center text-gray-200">
          I am a fullstack software developer with ReactJS for frontend and NodeJS for backend
        </p>
        <div class="flex justify-center w-full mt-6">
          <base-button :size="ESize.SMALL">Hire me</base-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize } from '@/types'
</script>
