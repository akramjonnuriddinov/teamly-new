<template>
  <section class="bg-white pb-[200px] pt-[100px]">
    <div class="container relative mx-auto max-w-7xl px-5">
      <div
        class="flex items-center justify-between rounded-[30px] bg-tg-primary-color px-[100px] py-[55px] pt-[75px] max-[990px]:px-[20px]"
      >
        <div
          class="relative w-full max-w-2xl max-[990px]:flex max-[990px]:max-w-full max-[990px]:flex-col max-[990px]:items-center"
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
        <img
          class="absolute -top-20 right-0 max-[990px]:hidden"
          src="@/assets/images/home-contact/newsletter_img.png"
          alt=""
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { EThemes, ESize } from '@/types'
</script>
