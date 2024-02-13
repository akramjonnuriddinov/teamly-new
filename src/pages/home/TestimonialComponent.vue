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
        class="swiper"
        :modules="Pagination"
        :loop="true"
        :centered-slides="true"
        :grab-cursor="true"
        :pagination="{
          clickable: true,
        }"
        :breakpoints="breakpoints"
      >
        <swiper-slide v-for="swiperContent in swiperContents" :key="swiperContent.id" class="slide">
          <div
            class="mx-[100px] flex items-center justify-center max-[1200px]:mx-[150px] max-[920px]:mx-[200px] max-[600px]:mx-[250px]"
          >
            <div style="" class="w-full min-w-[570px] max-w-[570px] rounded-[30px] bg-[#FAFCFF] px-11 py-12">
              <div class="flex justify-center">
                <div class="relative inline-block">
                  <img :src="getImageUrl(swiperContent.img_url)" alt="testimonial_img" />
                  <div
                    class="absolute -bottom-[3px] -right-[5px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-tg-primary-color"
                  >
                    <img src="@/assets/images/testimonials/testimonial_icon.svg" alt="" />
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
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { getImageUrl } from '@/composables/getImgUrl'
import BaseTopTitle from '@/components/BaseTopTitle.vue'

const swiperContents = [
  {
    id: '1',
    img_url: 'testimonials/testi_avatar02.png',
    text: 'I was looking for a Website that could help me solve a problem. I came across Teamly and decided to give it a try. I was amazed by how easy and fast it was to get started. The Website feature was exactly what I needed. It saved me a lot of time and money. The customer support was also very friendly and helpful. I highly recommend Teamly to anyone who needs a Website like this.',
    name: 'John Doe',
    position: 'CTO',
  },
  {
    id: '2',
    img_url: 'testimonials/testi_avatar01.png',
    text: 'Teamly is the best company I have ever seen. It has everything I need to achieve a goal. It is very user-friendly and intuitive. The company project is awesome. It allows me solve my problem',
    name: 'Jenny Wilson',
    position: 'Director of Content',
  },
  {
    id: '3',
    img_url: 'testimonials/testi_avatar02.png',
    text: 'I was looking for a Website that could help me solve a problem. I came across Teamly and decided to give it a try. I was amazed by how easy and fast it was to get started. The Website feature was exactly what I needed. It saved me a lot of time and money. The customer support was also very friendly and helpful. I highly recommend Teamly to anyone who needs a Website like this.',
    name: 'John Doe',
    position: 'CEO',
  },
  {
    id: '4',
    img_url: 'testimonials/testi_avatar01.png',
    text: 'Teamly is the best company I have ever seen. It has everything I need to achieve a goal. It is very user-friendly and intuitive. The company project is awesome. It allows me solve my problem',
    name: 'Jenny Wilson',
    position: 'Director of Content',
  },
  {
    id: '5',
    img_url: 'testimonials/testi_avatar02.png',
    text: 'Teamly is the best company I have ever seen. It has everything I need to achieve a goal. It is very user-friendly and intuitive. The company project is awesome. It allows me solve my problem',
    name: 'Jenny Wilson',
    position: 'CTO',
  },
  {
    id: '6',
    img_url: 'testimonials/testi_avatar01.png',
    text: 'I was looking for a Website that could help me solve a problem. I came across Teamly and decided to give it a try. I was amazed by how easy and fast it was to get started. The Website feature was exactly what I needed. It saved me a lot of time and money.',
    name: 'Jenny Wilson',
    position: 'Director of Content',
  },
]

const breakpoints = ref({
  350: {
    slidesPerView: 1,
    spaceBetween: 320,
  },
  400: {
    slidesPerView: 1,
    spaceBetween: 220,
  },
  500: {
    slidesPerView: 1,
    spaceBetween: 120,
  },
  600: {
    slidesPerView: 1,
    spaceBetween: 40,
  },
  700: {
    slidesPerView: 1,
    spaceBetween: -20,
  },
  720: {
    slidesPerView: 1,
    spaceBetween: -20,
  },
  900: {
    slidesPerView: 2,
    spaceBetween: 320,
  },
  1000: {
    slidesPerView: 2,
    spaceBetween: 220,
  },
  1100: {
    slidesPerView: 2,
    spaceBetween: 120,
  },
  1200: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
})
</script>
