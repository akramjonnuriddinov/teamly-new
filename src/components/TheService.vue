<template>
  <section
    class="bg-[#131313] pt-[115px] pb-[90px] relative z-10 text-tg-white"
  >
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <div
        class="absolute -z-50 transition-all duration-1000 right-[4%] top-[9%]"
      >
        <img src="@/assets/images/service/services_shape.png" alt="" />
      </div>
      <div class="pb-[70px]">
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >We Can Do For You</span
        >
        <h2
          class="text-center font-bold leading-[1.2] text-5xl max-sm:text-4xl"
        >
          Experts in every aspect <br />
          lifecycle
        </h2>
      </div>

      <ul class="flex flex-wrap justify-between">
        <!-- max-w-[390px] w-full -->
        <li
          class="w-1/3 px-2.5 py-2.5 service-item max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="(service, index) in services"
          :key="index"
        >
          <div
            class="flex flex-col h-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black"
          >
            <router-link
              class="mb-[22px] text-2xl font-bold transition-colors duration-300 whitespace-nowrap hover:text-tg-primary-color"
              to="/"
              >{{ service.title }}</router-link
            >
            <img
              class="mb-6 service-item-img w-[110px] h-[110px] object-cover"
              :src="service.img_url"
              alt="img"
            />
            <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
              {{ service.text }}
            </p>
            <router-link
              class="flex items-center gap-2 mt-auto font-medium transition-colors duration-300 hover:text-tg-primary-color"
              to="/"
            >
              <span>Find out more</span>
              <svg
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const services = ref([
  {
    title: "Web Development",
    text: "Build a site your customers love to use.",
    img_url: "src/assets/images/service/services_icon03.png",
  },
  {
    title: "Mobile Development",
    text: "Create a cross-platform mobile app with native functionality.",
    img_url: "src/assets/images/service/services_icon05.png",
  },
  {
    title: "UX/UI Design",
    text: "For the redesign of the web design and technique of your website or your brand.",
    img_url: "src/assets/images/service/services_icon02.png",
  },
  {
    title: "Daily Updates",
    text: "Stay Ahead of the Curve with IT Updates.",
    img_url: "src/assets/images/service/services_icon01.png",
  },
  {
    title: "SEO Analytics",
    text: "We help you analyze, and optimize your SEO strategy with our cutting-edge tools and expertise.",
    img_url: "src/assets/images/service/services_icon04.png",
  },
  {
    title: "Support Team",
    text: "We are always ready to help you with any IT issue. Contact us anytime, anywhere.",
    img_url: "src/assets/images/service/services_icon06.png",
  },
])
</script>

<style scoped>
.service-item {
  transition: 0.3s ease-in-out;
}
.service-item-img {
  transform: rotateY(0);
  transition: 0.5s;
}

.service-item:hover .service-item-img {
  transform: rotateY(180deg);
}

.service-item:hover .service-item-text {
  color: #9c9c9c;
  transition: 0.3s ease-in-out;
}
</style>
