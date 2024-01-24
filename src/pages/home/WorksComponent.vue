<template>
  <section class="works py-[105px]">
    <div class="container relative mx-auto w-full max-w-7xl px-5 text-tg-white">
      <div class="absolute z-10 hidden h-full w-full items-center justify-center rounded-md backdrop-blur-md">
        Coming soon
      </div>
      <div class="items-cebter flex justify-between">
        <div v-for="work in works" class="flex flex-wrap items-center justify-between">
          <inline-svg
            :src="work.image"
            class="mr-4 h-[55px] w-[55px] bg-transparent"
            fill="transparent"
            stroke="trasnparent"
          />
          <div class="flex flex-col">
            <span class="whitespace-nowrap text-4xl font-bold leading-[0.8]">{{ work.count }}</span>
            <p class="whitespace-nowrap text-xl leading-[1.8]">{{ work.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from '@/components/InlineSvg.vue'

const works = ref([
  {
    id: '',
    title: 'Satisfied Clients',
    count: '5',
    image: 'about-view/work01.svg',
  },
  {
    id: '',
    title: 'Active Project',
    count: '3',
    image: 'about-view/work02.svg',
  },
  {
    id: '',
    title: 'Winning Award',
    count: '0',
    image: 'about-view/work03.svg',
  },
  {
    id: '',
    title: 'Expert Teams',
    count: '10',
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
