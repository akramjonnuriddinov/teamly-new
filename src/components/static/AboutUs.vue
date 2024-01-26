<template>
  <section class="bg-tg-white py-[140px]">
    <div class="container mx-auto w-full max-w-7xl px-5" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
      <div class="flex max-[1024px]:flex-col max-[1024px]:items-center">
        <div class="relative z-10">
          <!-- <img class="z-50" src="@/assets/images/about/about-img.png" alt="" /> -->
          <div class="">
            <app-animation :options="defaultOptions" :width="500" />
          </div>
        </div>
        <div
          class="relative ml-12 w-full max-w-[600px] px-4 max-[1024px]:max-w-[720px] max-[1024px]:pt-10 max-[576px]:px-0"
        >
          <div>
            <span class="mb-3 text-lg font-bold text-tg-primary-color">About Our Company</span>
            <h2 class="mb-9 text-5xl font-bold leading-[1.2] text-tg-dark-blue-color max-sm:text-4xl">
              Teamly that Help you go
              <br class="max-[1024px]:hidden" />
              Ahead.
            </h2>
            <p class="mb-5 leading-[1.8] text-tg-paragraph-color">
              Teamly that Help You Go Ahead: Elevate Your Projects with Collaborative Excellence and Seamless Workflow
              Optimization. Achieve More Together!
            </p>
            <ul class="mb-14">
              <li v-for="aboutContent in aboutContents" class="mb-1 flex items-center">
                <img class="mr-3" src="@/assets/images/about/check.svg" alt="" />
                <p class="leading-[1.8] text-tg-paragraph-color">
                  {{ aboutContent }}
                </p>
              </li>
            </ul>
            <base-button :theme="EThemes.RED"> <router-link to="/about">Find Out More</router-link> </base-button>
          </div>
          <div>
            <img class="absolute -bottom-10 right-10 -z-10" src="@/assets/images/about/about_shape01.png" alt="" />
            <img class="absolute bottom-44 right-10 -z-10" src="@/assets/images/about/about_shape02.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { EThemes } from '@/types'
import AppAnimation from '@/components/AppAnimation.vue'
import GrowAnimation from '@/assets/images/animation/plan.json'
const defaultOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: GrowAnimation,
}

const aboutContents = ref(['Web Development', '1C Development', 'App Development'])
</script>
