<template>
  <section class="pt-[115px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <h2 class="text-xl font-semibold text-[#1C1C37] mb-5">Requirements</h2>
      <ul class="flex flex-col">
        <li
          v-for="requirement in requirements"
          class="flex items-center gap-4 mb-2"
        >
          <img
            width="8"
            height="8"
            src="@/assets/images/circle.svg"
            alt="circle"
          />
          <span class="text-[#5B5A78]">{{ requirement.text }}</span>
        </li>
      </ul>
      <h2 class="text-xl font-semibold text-[#1C1C37] my-5">Tasks</h2>
      <ul class="flex flex-col">
        <li v-for="task in tasks" class="flex items-center gap-4 mb-2">
          <img
            width="8"
            height="8"
            src="@/assets/images/circle.svg"
            alt="circle"
          />
          <span class="text-[#5B5A78]">{{ task.text }}</span>
        </li>
      </ul>
      <button
        class="bg-tg-primary-color mt-12 text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[120px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
        @click="store.isShow = true"
      >
        Apply
      </button>
    </div>
  </section>
  <apply-modal />
</template>

<script setup lang="ts">
import { ref } from "vue"
import ApplyModal from "@/components/ApplyModal.vue"
import { useColorStore } from "@/store"

const store = useColorStore()

const requirements = ref([
  {
    id: "1",
    text: "Understand the principles of SOLID, KISS, DRY",
  },
  {
    id: "2",
    text: "Work experience 2+ years",
  },
  {
    id: "3",
    text: "Knowledge of JavaScript and its basic concept of work (prototypal inheritance, event loop, closures, this keyword, ...)",
  },
  {
    id: "4",
    text: "At Java Script it is possible to write modern code, knowing all the new tips",
  },
  {
    id: "5",
    text: "VueJs 2,3 + Pinia + Vue Router",
  },
  {
    id: "6",
    text: "To work with Axios, API",
  },
  {
    id: "7",
    text: "Learning new changes",
  },
  {
    id: "8",
    text: "Tailwind CSS",
  },
  {
    id: "9",
    text: "Knowledge of NPM / Yarn package maneuvers",
  },
  {
    id: "10",
    text: "For Vue CLI / web package / Rollup project meeting",
  },
  {
    id: "11",
    text: "Git, Git Flow",
  },
  {
    id: "12",
    text: "Knowledge of Nuxt.js",
  },
])

const tasks = ref([
  {
    id: "1",
    text: "Support for improved projects and introduce new functionality to them",
  },
  {
    id: "2",
    text: "Working with team",
  },
  {
    id: "3",
    text: "Active participation in programming",
  },
  {
    id: "4",
    text: "Interact with QA testers, Backend programmers, and UI/UX Designers",
  },
])
</script>

<style scoped>
.service-item__inner {
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
}
</style>
