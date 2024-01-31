<template>
  <section class="bg-[#EFF7FF] py-[140px]">
    <div class="container mx-auto w-full max-w-7xl px-5">
      <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" class="hidden pb-[70px]">
        <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-primary-color">Our Project </span>
        <h2 class="text-center text-5xl font-bold leading-[1.2] max-sm:text-4xl">
          Our Amazing <br class="max-[500px]:hidden" />
          Creative Works.
        </h2>
      </div>
      <ul v-if="isLoading" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-10">
        <li
          v-for="project in 3"
          :key="project"
          class="project-wrapper relative w-full max-w-[47%] overflow-hidden rounded-[30px] max-[760px]:max-w-[100%]"
        >
          <Skeleton width="582px" height="393px" :theme="ESkeletonTheme.DARK" />
        </li>
      </ul>
      <ul v-else class="flex flex-wrap items-center justify-between gap-x-6 gap-y-10">
        <li
          v-for="project in projects"
          class="project-wrapper relative w-full max-w-[47%] overflow-hidden rounded-[30px] max-[760px]:max-w-[100%]"
        >
          <div
            class="absolute z-10 flex h-full w-full items-center justify-center rounded-md text-white backdrop-blur-md"
          >
            Coming soon
          </div>
          <div class="project-thumb"></div>
          <img
            class="h-[393px] w-full rounded-[30px] object-cover"
            width="307"
            height="393"
            :src="project.image"
            alt="img"
          />
          <div
            class="absolute bottom-0 left-0 flex w-full items-center justify-between px-10 pb-10 capitalize text-tg-white max-[760px]:w-full"
          >
            <div class="mr-2 w-full max-w-full max-[760px]:max-w-full">
              <h3 class="mb-2 text-2xl font-bold leading-[1.2]">
                <router-link to="/">{{ project.title }}</router-link>
              </h3>
              <p class="text-xl leading-[1]">{{ project.text }}</p>
            </div>
            <router-link
              class="project-wrapper-link flex items-center justify-center rounded-full bg-tg-white p-3 text-tg-primary-color opacity-0 transition-all duration-300 hover:bg-tg-primary-color hover:text-tg-white"
              to="/"
            >
              <arrow-right class="h-6 w-6" />
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
import { fetchData } from '@/composables/fetchData'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'

const projects = ref<any>([])
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
