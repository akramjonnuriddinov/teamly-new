<template>
  <section class="relative z-10 mb-[100px] pb-[45px] pt-[50px]">
    <div class="container relative mx-auto w-full px-5">
      <p class="mb-12 text-lg text-[#1C1C37]">{{ vacancy.text }}</p>
      <div class="description mb-12" v-html="vacancy.description"></div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps(['vacancy'])
</script>

<style>
.description li {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.description li::before {
  @apply bg-tg-primary-color;
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 4px;
}

.description h1,
.description h2,
.description h3 {
  @apply mb-5 mt-10 text-xl font-semibold text-[#1C1C37];
}
</style>
