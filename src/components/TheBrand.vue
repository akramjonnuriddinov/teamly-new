<template>
  <section class="bg-white">
    <div
      class="container relative flex px-5 pb-16 mx-auto transition-all duration-300 max-w-7xl"
    >
      <swiper
        :slidesPerView="6"
        :spaceBetween="0"
        :pagination="{
          clickable: true,
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="brand in brands">
          <div class="w-full">
            <img
              class="block transition-all cursor-pointer brand-item-img opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
              :src="`src/assets/images/brand/${brand}`"
              alt="brand"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"

const brands = ref([
  "brand_img01.png",
  "brand_img04.png",
  "brand_img06.png",
  "brand_img01.png",
  "brand_img04.png",
  "brand_img06.png",
  "brand_img01.png",
  "brand_img04.png",
  "brand_img06.png",
])
</script>
