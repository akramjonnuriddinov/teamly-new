<template>
  <section class="relative bg-[#EFF7FFf] pb-[105px] pt-[40px]">
    <div class="container mx-auto w-full px-5">
      <base-top-title data-aos="fade-up" data-aos-anchor-placement="top-bottom" class="pb-[70px]">
        <template v-slot:subtitle>Working Process</template>
        <template v-slot:title> Optimized Success </template>
      </base-top-title>
      <ul class="flex flex-wrap items-center justify-between gap-x-6 gap-y-10">
        <li
          v-for="project in projects"
          :key="project.id"
          class="project-wrapper relative flex w-1/5 flex-col items-center overflow-hidden max-[1000px]:w-[40%] max-[760px]:max-w-[100%] max-[530px]:w-full"
        >
          <div
            class="mb-5 flex h-[150px] w-[150px] items-center justify-center rounded-full bg-tg-primary-color/80 shadow-job-inner"
          >
            <img :src="getImageUrl(project.img_url)" alt="" />
          </div>
          <div class="flex flex-col items-center font-bold">
            <span class="mb-1 text-tg-primary-color">{{ project.title }}</span>
            <h3 class="text-center text-[22px] text-tg-heading-font-color">
              {{ project.text }}
            </h3>
          </div>
        </li>
      </ul>
      <div></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getImageUrl } from '@/composables/getImgUrl'
import BaseTopTitle from '@/components/BaseTopTitle.vue'

const projects = ref([
  {
    id: '1',
    title: 'Step One',
    img_url: 'about-view/work_icon01.svg',
    text: 'Discover Plan',
  },
  {
    id: '2',
    title: 'Step Two',
    img_url: 'about-view/work_icon02.svg',
    text: 'Prototype Project',
  },
  {
    id: '3',
    title: 'Step Three',
    img_url: 'about-view/work_icon03.svg',
    text: 'Build Application',
  },
  {
    id: '4',
    title: 'Step Four',
    img_url: 'about-view/work_icon04.svg',
    text: 'Application Testing',
  },
])
</script>

<style scoped>
.project-thumb::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -30%;
  width: 100%;
  height: 60%;
  background: #000000;
  filter: blur(150px);
  pointer-events: none;
}

.project-wrapper img {
  transition: all 0.4s ease;
  animation: fadeInUp;
  transform: rotateY(0deg);
}

.project-wrapper:hover img {
  transform: rotateY(180deg);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translateY(20px);
    -ms-transform: translateY(20px);
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
