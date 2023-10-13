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
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img01.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img04.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img06.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img01.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img04.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img06.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img01.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img04.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img06.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img01.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img04.png"
              alt=""
            />
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="w-full">
            <img
              class="brand-item-img"
              src="@/assets/images/brand/brand_img06.png"
              alt=""
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
