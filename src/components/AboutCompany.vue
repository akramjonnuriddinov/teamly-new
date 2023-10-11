<template>
  <section class="bg-tg-white py-[140px]">
    <div class="container max-w-7xl w-full mx-auto px-5">
      <div class="flex">
        <div class="relative z-10">
          <img class="z-50" src="@/assets/images/about/about-img.png" alt="" />
          <!-- <img
            class="absolute top-0 -z-10"
            src="@/assets/images/about/about_img02.png"
            alt=""
          /> -->
        </div>
        <div class="relative px-4 ml-12 max-w-[600px] w-full">
          <span class="text-tg-primary-color mb-3 text-lg font-bold"
            >About Our Company</span
          >
          <h2 class="font-bold leading-[1.2] text-5xl mb-9">
            Creative Agency that Help you go <br />
            Ahead.
          </h2>
          <p class="text-[#757589] leading-[1.8] mb-5">
            Lorem ipsum dolor sit amet consectetur. Ut tellus suspendisse nulla
            aliquam. Risus rutrum tellus eget ultrices pretium nisi amet
            facilisis vulputate tortor egestas.
          </p>
          <ul class="mb-14">
            <li class="mb-1 flex items-center">
              <img class="mr-3" src="@/assets/images/about/check.svg" alt="" />
              <p class="text-[#757589] leading-[1.8]">
                Risus ultrices amet facilisis vulputate tortor egestas
              </p>
            </li>
            <li class="mb-1 flex items-center">
              <img class="mr-3" src="@/assets/images/about/check.svg" alt="" />
              <p class="text-[#757589] leading-[1.8]">
                Pretium nisi amet vulputate tortor egestas.
              </p>
            </li>
            <li class="mb-1 flex items-center">
              <img class="mr-3" src="@/assets/images/about/check.svg" alt="" />
              <p class="text-[#757589] leading-[1.8]">
                Tellus eget ultrices facilisis vulputate tortor egestas.
              </p>
            </li>
          </ul>
          <router-link
            class="bg-tg-secondary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap"
            style="padding: 18px 25px; letter-spacing: 0.5px"
            to="/"
            >Find Out More</router-link
          >
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
</script>
