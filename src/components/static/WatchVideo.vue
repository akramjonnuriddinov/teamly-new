<template>
  <div class="relative pt-32">
    <div
      class="video-wrap z-[1] w-full h-[670px] bg-center bg-cover flex items-center flex-col rounded-[50px] justify-center relative max-[767px]:h-[400px] max-[600px]:h-[350px]"
    >
      <iframe
        class="w-full h-full rounded-[50px] absolute -z-20"
        src="https://www.youtube.com/embed/8Y3shOLJeW8"
        title="AMERIKA &amp; BUYUK BRITANIYA | EduPodcast 15-son"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <img
        class="absolute w-full object-cover h-full rounded-[50px] -z-10"
        src="@/assets/images/about/video_img.jpg"
        alt=""
      />
      <a
        class="bg-white w-[120px] text-4xl mb-6 transition-all duration-300 rounded-[50%] h-[120px] flex items-center justify-center text-tg-primary-color hover:bg-tg-primary-color hover:text-tg-white max-[640px]:w-[100px] max-[640px]:h-[100px] max-[600px]:w-[70px] max-[600px]:h-[70px] max-[600px]:mb-3"
        href="https://www.youtube.com/watch?v=bixR-KIJKYM#"
        target="_blank"
      >
        <play-icon class="w-14 max-[640px]:w-12 max-[600px]:w-8" />
      </a>
      <h2 class="text-white font-medium text-[40px] max-[600px]:text-3xl">Watch Video</h2>
    </div>
    <div
      class="relative bottom-0 z-10 flex items-center justify-around -translate-y-1/2 max-[1024px]:flex-wrap max-[1024px]:gap-5 max-[1024px]:-translate-y-20"
    >
      <div
        v-for="counter in counters"
        :key="counter.id"
        :class="counter.bg_color"
        class="flex rounded-[30px] px-7 py-10 max-[1024px]:min-w-[323px] max-[710px]:w-[80%] max-[600px]:w-[90%] max-[600px]:px-4 max-[600px]:py-6"
      >
        <img class="mr-4 max-[600px]:mr-2" :src="getImageUrl(counter.img_url)" alt="counter_icon" />
        <div class="">
          <h4 class="font-bold text-[40px] mb-2 leading-[0.7] max-[640px]:text-3xl whitespace-nowrap">
            {{ counter.count }}
          </h4>
          <p class="text-xl font-bold leading-[1.2]">{{ counter.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlayIcon } from '@heroicons/vue/24/solid'
import { getImageUrl } from '@/composables/getImgUrl'

const counters = ref([
  {
    id: '1',
    count: '100 %',
    title: 'Client Satisfaction',
    img_url: 'about/counter_icon01.svg',
    bg_color: 'bg-tg-yellow',
  },
  {
    id: '2',
    count: '1150+',
    title: 'Complete Project',
    img_url: 'about/counter_icon02.svg',
    bg_color: 'bg-tg-pink',
  },
  {
    id: '3',
    count: '1320K',
    title: 'Design Resource',
    img_url: 'about/counter_icon03.svg',
    bg_color: 'bg-tg-indigo',
  },
])
</script>

<style scoped>
.video-wrap::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(19, 19, 19, 0.8);
  border-radius: 50px;
  z-index: -1;
}
</style>
