<template>
  <section class="bg-[#EFF7FF] py-[140px]">
    <div class="container w-full px-5 mx-auto max-w-7xl">
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        class="pb-[70px] hidden"
      >
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Our Project
        </span>
        <h2
          class="text-center font-bold leading-[1.2] text-5xl max-sm:text-4xl"
        >
          Our Amazing <br class="max-[500px]:hidden" />
          23 Creative Works.
        </h2>
      </div>
      <ul class="flex flex-wrap items-center justify-between gap-x-6 gap-y-10">
        <li
          v-for="project in projects"
          class="relative project-wrapper overflow-hidden rounded-[30px] max-w-[47%] w-full max-[760px]:max-w-[100%]"
        >
          <div class="project-thumb"></div>
          <img
            class="w-full h-auto object-cover rounded-[30px]"
            width="307"
            height="393"
            :src="getImageUrl(project.img_url)"
            alt="img"
          />
          <div
            class="absolute bottom-0 left-0 flex w-full items-center justify-between px-10 pb-10 capitalize text-tg-white max-[760px]:w-full"
          >
            <div class="max-w-full w-full mr-2 max-[760px]:max-w-full">
              <h3 class="mb-2 text-2xl font-bold leading-[1.2]">
                <router-link to="/">{{ project.title }}</router-link>
              </h3>
              <p class="text-xl leading-[1]">{{ project.text }}</p>
            </div>
            <router-link
              class="flex items-center justify-center p-3 transition-all duration-300 rounded-full opacity-0 project-wrapper-link hover:bg-tg-primary-color hover:text-tg-white text-tg-primary-color bg-tg-white"
              to="/"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { getImageUrl } from "@/composables/getImgUrl"

const projects = ref([
  {
    id: "1",
    title: "Creative Design",
    img_url: "our-project/project01.jpg",
    text: "Design",
  },
  {
    id: "2",
    title: "Business Idea",
    img_url: "our-project/project02.jpg",
    text: "Business",
  },
  {
    id: "3",
    title: "Web Development",
    img_url: "our-project/project03.jpg",
    text: "Development",
  },
  {
    id: "4",
    title: "Mobile Development",
    img_url: "our-project/project04.jpg",
    text: "Mobile",
  },
])
</script>

<style scoped>
.project-thumb::before {
  content: "";
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
