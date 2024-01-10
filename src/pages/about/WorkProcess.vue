<template>
  <section class="bg-[#EFF7FF] relative pt-[40px] pb-[105px]">
    <div class="container w-full px-5 mx-auto max-w-7xl">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Working Process
        </span>
        <h2 class="text-center text-tg-dark-blue-color font-bold leading-[1.2] text-5xl max-sm:text-4xl">
          Creating World Class <br class="max-[500px]:hidden" />
          Experiences
        </h2>
      </div>
      <ul class="flex flex-wrap items-center justify-between gap-x-6 gap-y-10">
        <li
          v-for="project in projects"
          class="relative project-wrapper w-1/5 flex flex-col items-center overflow-hidden max-[1000px]:w-[40%] max-[760px]:max-w-[100%] max-[530px]:w-full"
        >
          <div class="w-[150px] bg-tg-white rounded-full h-[150px] flex items-center justify-center mb-5">
            <img :src="getImageUrl(project.img_url)" alt="" />
          </div>
          <div class="flex flex-col items-center font-bold">
            <span class="mb-1 text-tg-primary-color">{{ project.title }}</span>
            <h3 class="text-[22px] text-center text-tg-heading-font-color">
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
    text: 'Website Test',
  },
  {
    id: '4',
    title: 'Step Four',
    img_url: 'about-view/work_icon04.svg',
    text: 'Build Website',
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
