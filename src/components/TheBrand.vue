<template>
  <section class="bg-white">
    <div class="container relative flex px-5 pb-16 mx-auto max-w-7xl">
      <!-- SWIPER -->
      <swiper
        :slidesPerView="6"
        :spaceBetween="0"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="brand in brands">
          <div class="w-full">
            <img
              class="brand-item-img"
              :src="`src/assets/images/brand/${brand}`"
              alt="brand"
            />
          </div>
        </swiper-slide>
      </swiper>
      <!-- /SWIPER -->
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"
import { ref } from "vue"

const brands = [
  "brand_img01.png",
  "brand_img04.png",
  "brand_img06.png",
  "brand_img01.png",
  "brand_img04.png",
  "brand_img06.png",
  "brand_img01.png",
  "brand_img04.png",
  "brand_img06.png",
]
</script>

<style scoped>
.brand-item-img {
  filter: grayscale(1);
  display: block;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
}

.brand-item-img:hover {
  filter: grayscale(0);
  opacity: 1;
}
</style>
