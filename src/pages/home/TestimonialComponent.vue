<template>
  <section class="relative py-10">
    <div class="absolute right-0 -z-10 -translate-x-1/4 translate-y-1/4">
      <img src="@/assets/images/testimonials/testimonial_shape.png" alt="" />
    </div>
    <div class="container mx-auto w-full px-5">
      <base-top-title class="pb-[70px]">
        <template v-slot:subtitle>Client Testimonial</template>
        <template v-slot:title>
          What People are
          <br class="max-[500px]:hidden" />
          Saying!
        </template>
      </base-top-title>
    </div>
    <div class="container mx-auto w-full px-5">
      <swiper
        :spaceBetween="30"
        :centered-slides="true"
        :loop="true"
        :freeMode="true"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        :breakpoints="breakpoints"
        class="mySwiper"
      >
        <swiper-slide v-for="swiperContent in swiperContents" :key="swiperContent.id">
          <div class="flex items-center justify-center">
            <div class="rounded-[30px] bg-[#FAFCFF] px-11 py-12">
              <div class="flex justify-center">
                <div class="relative">
                  <img :src="getImageUrl(swiperContent.img_url)" alt="testimonial_img" />
                  <div
                    class="absolute -bottom-[3px] -right-[5px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-tg-primary-color"
                  >
                    <img
                      class="max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px]"
                      src="@/assets/images/testimonials/testimonial_icon.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <p
                class="mb-6 line-clamp-4 h-[112px] overflow-hidden text-center text-lg font-medium italic leading-[1.66] text-tg-heading-font-color max-[600px]:text-[15px]"
              >
                {{ swiperContent.text }}
              </p>
              <h3 class="mb-1 text-center text-2xl font-bold capitalize text-tg-heading-font-color max-[600px]:text-xl">
                {{ swiperContent.name }}
              </h3>
              <span class="block text-center text-[15px] font-medium text-[#8C8C8C]">{{ swiperContent.position }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { getImageUrl } from '@/composables/getImgUrl'
import BaseTopTitle from '@/components/BaseTopTitle.vue'
import 'swiper/css/free-mode'
import { FreeMode, Autoplay } from 'swiper'

const modules = [FreeMode, Autoplay]
const breakpoints = ref({
  600: {
    slidesPerView: 1,
  },
  1000: {
    slidesPerView: 3,
  },
})
const swiperContents = [
  {
    id: '1',
    img_url: 'testimonials/testi_avatar02.png',
    text: 'I was looking for a Mobile Application that could help me solve a problem. I came across Teamly and decided to give it a try. I was amazed by how easy and fast it was to get started. The App feature was exactly what I needed. It saved me a lot of time and money. The customer support was also very friendly and helpful. I highly recommend Teamly to anyone who needs a mobile app like this.',
    name: 'John Doe',
    position: 'CTO',
  },
  {
    id: '2',
    img_url: 'testimonials/testi_avatar01.png',
    text: 'Teamly is the best company I have ever seen. It has everything I need to achieve a goal. It is very user-friendly and intuitive. The company project is awesome. It allows me solve my problem',
    name: 'Jenny Wilson',
    position: 'IT Project Manager',
  },
  {
    id: '1',
    img_url: 'testimonials/testi_avatar02.png',
    text: 'I was looking for a Mobile Application that could help me solve a problem. I came across Teamly and decided to give it a try. I was amazed by how easy and fast it was to get started. The App feature was exactly what I needed. It saved me a lot of time and money. The customer support was also very friendly and helpful. I highly recommend Teamly to anyone who needs a mobile app like this.',
    name: 'John Doe',
    position: 'CTO',
  },
  {
    id: '2',
    img_url: 'testimonials/testi_avatar01.png',
    text: 'Teamly is the best company I have ever seen. It has everything I need to achieve a goal. It is very user-friendly and intuitive. The company project is awesome. It allows me solve my problem',
    name: 'Jenny Wilson',
    position: 'IT Project Manager',
  },
]
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
