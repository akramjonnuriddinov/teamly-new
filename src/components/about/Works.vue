<template>
  <section class="py-[105px] works">
    <div class="container w-full px-5 mx-auto max-w-7xl text-tg-white">
      <div class="flex justify-between items-cebter">
        <div v-for="work in works" class="flex flex-wrap items-center justify-between">
          <inline-svg
            :src="work.image"
            class="bg-transparent w-[55px] h-[55px] mr-4"
            fill="transparent"
            stroke="trasnparent"
          />
          <div class="flex flex-col">
            <span class="text-4xl whitespace-nowrap leading-[0.8] font-bold">{{ work.count }}</span>
            <p class="text-xl whitespace-nowrap leading-[1.8]">{{ work.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'

const works = ref([
  {
    id: '',
    title: 'Satisfied Clients',
    count: '2500',
    image: 'about-view/work01.svg',
  },
  {
    id: '',
    title: 'Active Project',
    count: '176K',
    image: 'about-view/work02.svg',
  },
  {
    id: '',
    title: 'Winning Award',
    count: '28+',
    image: 'about-view/work03.svg',
  },
  {
    id: '',
    title: 'Expert Teams',
    count: '150+',
    image: 'about-view/work04.svg',
  },
])
</script>

<style scoped>
.works {
  background-image: url('../../assets/images/about/counter_bg.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
