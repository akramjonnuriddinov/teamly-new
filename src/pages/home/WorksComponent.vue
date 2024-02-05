<template>
  <div v-if="true" class="bg-gray-50 py-24 sm:py-32">
    <div class="mx-auto px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="space-y-4 text-center">
          <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-primary-color"
            >Innovation in Numbers
          </span>
          <h2 class="text-center text-5xl font-bold leading-[1.2] tracking-tight text-tg-dark-blue-color">
            Our Stats Tell the Story
          </h2>
          <p class="text-lg leading-8 text-tg-body-font-color">
            We can help you grow your audience and your business, no matter the size.
          </p>
        </div>
        <div
          class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
        >
          <div v-for="work in works" class="flex flex-col bg-white p-8">
            <h4 class="text-sm font-semibold leading-6 text-tg-dark-blue-color">{{ work.title }}</h4>
            <p class="order-first text-3xl font-semibold tracking-tight text-tg-primary-color">{{ work.count }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const works = ref([
  {
    id: '',
    title: 'Satisfied Clients',
    count: '50+',
    image: 'about-view/work01.svg',
  },
  {
    id: '',
    title: 'Active Projects',
    count: '100+',
    image: 'about-view/work02.svg',
  },
  {
    id: '',
    title: 'Winning Awards',
    count: '0',
    image: 'about-view/work03.svg',
  },
  {
    id: '',
    title: 'Expert Teams',
    count: '22',
    image: 'about-view/work04.svg',
  },
])
</script>

<style scoped>
.works {
  background-image: url('@/assets/images/about/counter_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
