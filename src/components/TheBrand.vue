<template>
  <section class="bg-white">
    <div
      class="container relative flex px-5 pb-16 mx-auto transition-all duration-300 max-w-7xl"
    >
      <swiper
        :slidesPerView="count"
        :spaceBetween="0"
        :pagination="{
          clickable: true,
        }"
        class="mySwiper"
      >
        <swiper-slide
          class="swiper-slide w-1/6 max-[990px]:w-1/3"
          v-for="brand in brands"
        >
          <div class="flex justify-center w-full">
            <img
              class="block transition-all cursor-pointer brand-item-img opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
              :src="getImageUrl(brand)"
              alt="brand"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"

const count = ref(3)
onMounted(() => {
  window.addEventListener("resize", () => {
    if (window.screen.availWidth > 990) {
      count.value = 6
    } else if (
      window.screen.availWidth <= 990 &&
      window.screen.availWidth > 700
    ) {
      count.value = 3
    } else if (
      window.screen.availWidth <= 700 &&
      window.screen.availWidth > 400
    ) {
      count.value = 2
    } else if (window.screen.availWidth <= 400) {
      count.value = 1
    }
  })
})

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

const getImageUrl = (name: any) => {
  return new URL(`../assets/images/brand/${name}`, import.meta.url).href
}
</script>
