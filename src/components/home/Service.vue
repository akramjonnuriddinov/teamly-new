<template>
  <section class="bg-[#fff] pt-[80px] pb-[90px] relative z-10 text-tg-black">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <div class="absolute hidden -z-50 transition-all duration-1000 right-[4%] top-[9%]">
        <img src="@/assets/images/service/services_shape.png" alt="" />
      </div>
      <div class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >We Can Do For You</span
        >
        <h2 class="text-center text-tg-dark-blue-color font-bold leading-[1.2] text-5xl max-sm:text-4xl">
          Experts in every aspect <br class="max-[500px]:hidden" />
          lifecycle
        </h2>
      </div>

      <ul class="flex flex-wrap justify-between">
        <li
          class="w-1/3 px-2.5 py-2.5 service-item max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="(service, index) in services"
          :key="index"
          @mouseover="hoverItem(index)"
        >
          <div
            :class="{ 'shadow-service-inner': isHover[index] }"
            class="service-item-inner flex flex-col h-full bg-[#F6F9FB1] px-[35px] py-[50px] rounded-[20px]"
          >
            <router-link
              class="mb-[22px] text-2xl font-bold transition-colors duration-300 whitespace-nowrap hover:text-tg-primary-color"
              to="/"
              >{{ service.title }}</router-link
            >
            <img class="mb-6 service-item-img w-[75px] h-[75px] object-cover" :src="service.image" alt="img" />
            <p class="service-item-text mb-4 leading-[1.8] text-tg-paragraph-color">
              {{ service.text }}
            </p>
            <router-link
              class="flex items-center gap-2 mt-auto font-medium transition-colors duration-300 hover:text-tg-primary-color"
              to="/"
            >
              <span>Find out more</span>
              <arrow-right />
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrowRight from '@/components/icons/ArrowRight.vue'
import { Service } from '@/types'
import { fetchData } from '@/composables/fetchData'

const services = ref<Service[]>([])
fetchData('services').then((result) => {
  services.value = result
})

const isHover = ref<boolean[]>([])

const hoverItem = (index: number) => {
  isHover.value = []
  isHover.value[index] = true
}
</script>

<style scoped>
.service-item {
  transition: 0.3s ease-in-out;
}
.service-item-img {
  transform: rotateY(0);
  transition: 0.5s;
}

.hover-class {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
}

.service-item:hover div {
  transition: box-shadow 0.4s ease-in-out;
}

.service-item:hover .service-item-img {
  transform: rotateY(180deg);
}

.service-item:hover .service-item-text {
  color: #9c9c9c;
  transition: 0.3s ease-in-out;
}
</style>
