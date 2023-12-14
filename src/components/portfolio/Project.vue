<template>
  <section class="bg-tg-white py-[105px]">
    <div class="container w-full px-5 mx-auto max-w-7xl">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color">Our Project </span>
        <h2 class="text-center text-tg-dark-blue-color font-bold leading-[1.2] text-5xl max-sm:text-4xl">
          Our Amazing <br class="max-[500px]:hidden" />
          23 Creative Works.
        </h2>
      </div>
      <ul v-if="isLoading" class="flex flex-wrap items-center justify-center gap-x-6 gap-y-10">
        <li
          v-for="project in 3"
          :key="project"
          class="relative project-wrapper overflow-hidden border-red-400 rounded-[30px] max-w-[290px] w-full max-[970px]:max-w-[40%] max-[760px]:max-w-[100%]"
        >
          <Skeleton width="290px" height="393px" :theme="ESkeletonTheme.LIGHT" />
        </li>
      </ul>
      <ul v-else class="flex flex-wrap items-center justify-center gap-x-6 gap-y-10">
        <li
          v-for="project in projects"
          class="relative project-wrapper overflow-hidden border-red-400 rounded-[30px] max-w-[290px] w-full max-[970px]:max-w-[40%] max-[760px]:max-w-[100%]"
        >
          <div class="project-thumb"></div>
          <img
            class="w-full h-[393px] object-cover rounded-[30px]"
            width="307"
            height="393"
            :src="project.image"
            alt="img"
          />
          <div
            class="absolute bottom-0 w-full left-0 flex items-center justify-between px-10 pb-10 capitalize text-tg-white max-[760px]:w-full"
          >
            <div class="max-w-[180px] w-full mr-2 max-[760px]:max-w-full">
              <h3 class="mb-2 text-2xl font-bold leading-[1.2]">
                <router-link to="/">{{ project.title }}</router-link>
              </h3>
              <p class="text-xl leading-[1]">{{ project.text }}</p>
            </div>
            <router-link
              class="flex items-center justify-center p-3 transition-all duration-300 rounded-full opacity-0 project-wrapper-link hover:bg-tg-primary-color hover:text-tg-white text-tg-primary-color bg-tg-white"
              to="/"
            >
              <arrow-right class="w-6 h-6" />
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ArrowRight from '@/components/icons/ArrowRight.vue'
import { Portfolio } from '@/types'
import { fetchData } from '@/composables/fetchData'
import Skeleton, { ESkeletonTheme } from '@/components/skeleton/Skeleton.vue'

const projects = ref<Portfolio[]>([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  projects.value = await fetchData('portfolio')
  isLoading.value = false
})
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

.project-wrapper:hover .project-wrapper-link {
  transition: all 0.4s ease;
  opacity: 1;
}
</style>
