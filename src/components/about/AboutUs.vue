<template>
  <section class="py-[140px] bg-tg-white">
    <div class="container w-full px-5 mx-auto max-w-7xl" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
      <div class="flex max-[1024px]:flex-col max-[1024px]:items-center">
        <div class="relative z-10">
          <img class="z-50" src="@/assets/images/about/about-img.png" alt="" />
        </div>
        <div
          class="relative px-4 ml-12 max-w-[600px] w-full max-[1024px]:max-w-[720px] max-[1024px]:pt-10 max-[576px]:px-0"
        >
          <div>
            <span class="mb-3 text-lg font-bold text-tg-primary-color">About Our Company</span>
            <h2 class="font-bold text-tg-dark-blue-color leading-[1.2] text-5xl mb-9 max-sm:text-4xl">
              Teamly that Help you go
              <br class="max-[1024px]:hidden" />
              Ahead.
            </h2>
            <p class="text-tg-paragraph-color leading-[1.8] mb-5">
              Founded by a passionate team of tech enthusiasts, Teamly is a leading IT solutions provider with a deep
              understanding of the ever-evolving digital landscape.
            </p>
            <ul class="mb-14">
              <li v-for="aboutContent in aboutContents" class="flex items-center mb-1">
                <img class="mr-3" src="@/assets/images/about/check.svg" alt="" />
                <p class="text-tg-paragraph-color leading-[1.8]">
                  {{ aboutContent }}
                </p>
              </li>
            </ul>
            <base-button :theme="EThemes.RED"> Find Out More </base-button>
          </div>
          <div>
            <img class="absolute -z-10 -bottom-10 right-10" src="@/assets/images/about/about_shape01.png" alt="" />
            <img class="absolute -z-10 bottom-44 right-10" src="@/assets/images/about/about_shape02.png" alt="" />
          </div>
        </div>
      </div>
      <!-- <watch-video /> -->
    </div>
  </section>
</template>

<script setup lang="ts">
// import WatchVideo from '@/components/static/WatchVideo.vue'
import { ref } from 'vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { EThemes } from '@/types'

const aboutContents = ref(['Web Development', 'App Development', 'Consulting'])
</script>
