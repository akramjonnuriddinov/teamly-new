<template>
  <div class="relative">
    <div class="video-wrap mt-32">
      <iframe
        class="w-full h-full rounded-[50px] absolute -z-20"
        width=""
        height=""
        src="https://www.youtube.com/embed/8Y3shOLJeW8"
        title="AMERIKA &amp; BUYUK BRITANIYA | EduPodcast 15-son"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <img
        class="absolute w-full h-full rounded-[50px] -z-10"
        src="../assets/images/about/video_img.jpg"
        alt=""
      />
      <a
        class="play-btn text-tg-primary-color bg-white hover:bg-tg-primary-color hover:text-tg-white"
        href="https://www.youtube.com/watch?v=bixR-KIJKYM#"
        target="_blank"
      >
        <play-icon class="w-14" />
      </a>
      <h2 class="text-white font-medium text-[40px]">Watch Video</h2>
    </div>
    <div
      class="flex relative z-10 items-center justify-around bottom-0 -translate-y-1/2"
    >
      <div class="flex bg-tg-yellow rounded-[30px] px-7 py-10">
        <img
          class="mr-4"
          src="../assets/images/about/counter_icon01.svg"
          alt=""
        />
        <div class="">
          <h4 class="font-bold text-[40px] mb-2 leading-[0.7]">100 %</h4>
          <p class="text-xl font-bold leading-[1.2]">Client Satisfaction</p>
        </div>
      </div>
      <div class="flex bg-tg-pink rounded-[30px] px-7 py-10">
        <img
          class="mr-4"
          src="../assets/images/about/counter_icon02.svg"
          alt=""
        />
        <div class="">
          <h4 class="font-bold text-[40px] mb-2 leading-[0.7]">1150+</h4>
          <p class="text-xl font-bold leading-[1.2]">Complete Project</p>
        </div>
      </div>
      <div class="flex bg-tg-indigo rounded-[30px] px-7 py-10">
        <img
          class="mr-4"
          src="../assets/images/about/counter_icon03.svg"
          alt=""
        />
        <div class="">
          <h4 class="font-bold text-[40px] mb-2 leading-[0.7]">1320K</h4>
          <p class="text-xl font-bold leading-[1.2]">Design Resource</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayIcon } from "@heroicons/vue/24/solid"
</script>

<style scoped>
.video-wrap {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 670px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  border-radius: 50px;
  z-index: 1;
}
.video-wrap::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(19, 19, 19, 0.8);
  border-radius: 50px;
  z-index: -1;
}

.play-btn {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 35px;
  margin-bottom: 25px;
  transition: 0.3s ease;
}
</style>
