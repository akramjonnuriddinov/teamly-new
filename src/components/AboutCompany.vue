<template>
  <section class="bg-tg-white py-[140px]">
    <div
      class="container w-full px-5 mx-auto max-w-7xl"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div class="flex">
        <div class="relative z-10">
          <img class="z-50" src="@/assets/images/about/about-img.png" alt="" />
        </div>
        <div class="relative px-4 ml-12 max-w-[600px] w-full">
          <div>
            <span class="mb-3 text-lg font-bold text-tg-primary-color"
              >About Our Company</span
            >
            <h2 class="font-bold leading-[1.2] text-5xl mb-9">
              Creative Agency that Help you go <br />
              Ahead.
            </h2>
            <p class="text-tg-paragraph-color leading-[1.8] mb-5">
              Lorem ipsum dolor sit amet consectetur. Ut tellus suspendisse
              nulla aliquam. Risus rutrum tellus eget ultrices pretium nisi amet
              facilisis vulputate tortor egestas.
            </p>
            <ul class="mb-14">
              <li
                v-for="aboutContent in aboutContents"
                class="flex items-center mb-1"
              >
                <img
                  class="mr-3"
                  src="@/assets/images/about/check.svg"
                  alt=""
                />
                <p class="text-tg-paragraph-color leading-[1.8]">
                  {{ aboutContent }}
                </p>
              </li>
            </ul>
            <router-link
              class="bg-tg-secondary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap"
              style="padding: 18px 25px; letter-spacing: 0.5px"
              to="/"
              >Find Out More</router-link
            >
          </div>
          <div>
            <img
              class="absolute -bottom-10 right-10"
              src="@/assets/images/about/about_shape01.png"
              alt=""
            />
            <img
              class="absolute bottom-44 right-10"
              src="@/assets/images/about/about_shape02.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <watch-video />
    </div>
  </section>
</template>

<script setup lang="ts">
import WatchVideo from "@/components/WatchVideo.vue"
import { ref } from "vue"

const aboutContents = ref([
  "Risus ultrices amet facilisis vulputate tortor egestas.",
  "Pretium nisi amet vulputate tortor egestas.",
  "Tellus eget ultrices facilisis vulputate tortor egestas.",
])
</script>
