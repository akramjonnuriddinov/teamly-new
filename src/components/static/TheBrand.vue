<template>
  <section class="testimonial relative pb-32 pt-16">
    <div class="container mx-auto w-full px-5">
      <swiper
        v-if="brands"
        class="swiper"
        :modules="Pagination"
        :loop="true"
        :centered-slides="true"
        :grab-cursor="true"
        :draggable="true"
        :pagination="{
          clickable: true,
        }"
        :breakpoints="breakpoints"
      >
        <swiper-slide v-for="(brand, index) in brands" :key="index" class="slide">
          <img
            :src="getImageUrl(brand)"
            class="brand-item-img block cursor-pointer opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            alt="testimonial_img"
          />
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

const brands = ref([
  'brand/brand_img01.png',
  'brand/brand_img04.png',
  'brand/brand_img06.png',
  'brand/brand_img01.png',
  'brand/brand_img04.png',
  'brand/brand_img06.png',
  'brand/brand_img01.png',
  'brand/brand_img04.png',
  'brand/brand_img06.png',
])

const breakpoints = ref({
  350: {
    slidesPerView: 2,
    spaceBetween: 50,
  },
  500: {
    slidesPerView: 3,
    spaceBetween: 50,
  },
  900: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  1200: {
    slidesPerView: 6,
    spaceBetween: 60,
  },
})
</script>
