<template>
  <section class="vacancy-detail mt-[86px] bg-[#F9F9FA]">
    <div class="container relative mx-auto px-5 max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl">
      <div
        class="relative flex w-full items-center justify-between pb-[60px] pt-[100px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-start max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <div class="flex max-w-[750px] flex-col">
          <span class="mb-5 text-[#5B5A78]">{{ vacancy.location }}</span>
          <h1 class="mb-4 text-[70px] font-extrabold leading-[1.2] text-[#38386E] max-[800px]:text-5xl max-sm:text-4xl">
            {{ vacancy.title }}
          </h1>
          <div class="mb-5 flex items-center gap-3 font-bold tracking-[-0.3px] text-tg-primary-color">
            <span>{{ vacancy.category }}</span>
            <img width="8" height="8" src="@/assets/images/svg/circle.svg" alt="circle" />
            <span>{{ vacancy.time }}</span>
            <img width="8" height="8" src="@/assets/images/svg/circle.svg" alt="circle" />
            <span>{{ formatTimestampToLocaleString(vacancy.date) }}</span>
          </div>
        </div>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'

defineProps(['vacancy'])
</script>

<style scoped>
.vacancy-detail {
  border-radius: 0px 0px 64px 64px;
}
</style>
