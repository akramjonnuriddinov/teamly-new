<template>
  <section v-if="true" class="bg-gray-50 py-24">
    <div class="mx-auto px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:max-w-none">
        <div class="space-y-4 text-center">
          <base-top-title>
            <template v-slot:subtitle>Innovation in Numbers</template>
            <template v-slot:title>Our Stats Tell the Story</template>
          </base-top-title>
          <p class="text-lg leading-8 text-tg-body-font-color">
            We can help you grow your audience and your business, no matter the size.
          </p>
        </div>
        <div
          class="container mx-auto mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4"
        >
          <div v-for="work in works" :key="work.id" class="flex flex-col bg-white p-8">
            <h4 class="text-sm font-semibold leading-6 text-tg-dark-blue-color">{{ work.title }}</h4>
            <p class="order-first text-3xl font-semibold tracking-tight text-tg-primary-color">{{ work.count }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTopTitle from '@/components/BaseTopTitle.vue'

const works = ref([
  {
    id: '1',
    title: 'Satisfied Clients',
    count: '50+',
    image: 'about-view/work01.svg',
  },
  {
    id: '2',
    title: 'Active Projects',
    count: '100+',
    image: 'about-view/work02.svg',
  },
  {
    id: '3',
    title: 'Winning Awards',
    count: '0',
    image: 'about-view/work03.svg',
  },
  {
    id: '4',
    title: 'Expert Teams',
    count: '20+',
    image: 'about-view/work04.svg',
  },
])
</script>
