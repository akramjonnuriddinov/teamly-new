<template>
  <section :class="{ 'pt-[80px]': !isHome }" class="relative z-10 bg-[#fff] pb-[90px] text-tg-black">
    <div class="container relative mx-auto w-full px-5">
      <div class="absolute right-[4%] top-[9%] -z-50 hidden transition-all duration-1000">
        <img src="@/assets/images/service/services_shape.png" alt="" />
      </div>
      <div v-if="isHome" class="pb-[70px]">
        <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-indigo">We Can Do For You</span>
        <h2
          class="text-center text-5xl font-bold leading-[1.2] text-tg-dark-blue-color max-xl:text-5xl max-sm:text-4xl"
        >
          Experts in every aspect <br class="max-[500px]:hidden" />
          lifecycle
        </h2>
      </div>
      <div v-if="isLoading" class="flex items-center justify-center">
        <ul class="flex flex-wrap justify-between">
          <li
            class="service-item w-1/3 px-2.5 py-2.5 max-[1050px]:w-1/2 max-[710px]:w-full"
            v-for="service in 3"
            :key="service"
          >
            <div class="service-item-inner flex h-full flex-col rounded-[20px] bg-[#F6F9FB1] px-[35px] py-[50px]">
              <div
                class="mb-[22px] whitespace-nowrap text-2xl font-bold transition-colors duration-300 hover:text-tg-primary-color"
              >
                <Skeleton width="330px" height="32px" :theme="ESkeletonTheme.LIGHT" />
              </div>
              <div class="mb-6 h-[75px] w-[75px] object-cover">
                <Skeleton width="70px" height="75px" :theme="ESkeletonTheme.LIGHT" class="rounded-md" />
              </div>
              <p class="service-item-text mb-4 leading-[1.8] text-tg-paragraph-color">
                <Skeleton width="330px" height="90px" :theme="ESkeletonTheme.LIGHT" />
              </p>
              <div
                class="mt-auto flex items-center gap-2 font-medium transition-colors duration-300 hover:text-tg-primary-color"
              >
                <span><Skeleton width="330px" height="24px" :theme="ESkeletonTheme.LIGHT" /></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ul v-else class="flex flex-wrap justify-between">
        <li
          class="service-item w-1/3 px-2.5 py-2.5 max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="(service, index) in services"
          :key="service.id"
          @mouseover="hoverItem(index)"
        >
          <div
            :class="{ 'shadow-service-inner': isHover[index] }"
            class="service-item-inner hover-class flex h-full flex-col rounded-[20px] bg-[#F6F9FB1] px-[35px] py-[50px]"
          >
            <router-link
              class="mb-[22px] whitespace-nowrap text-2xl font-bold transition-colors duration-300 hover:text-tg-primary-color"
              :to="{
                name: 'contact',
                query: {
                  service: service.title,
                  options: serviceOptions,
                },
              }"
              >{{ service.title }}</router-link
            >
            <img class="service-item-img mb-6 h-[75px] w-[75px] object-cover" :src="service.image" alt="img" />
            <p class="service-item-text mb-4 leading-[1.8] text-tg-paragraph-color">
              {{ service.text }}
            </p>
            <router-link
              class="mt-auto flex items-center gap-2 font-medium transition-colors duration-300 hover:text-tg-primary-color"
              to="/service"
            >
              <span>Find out more</span>
              <inline-svg src="svg/arrow-right.svg" />
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import InlineSvg from '@/components/InlineSvg.vue'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { fetchData } from '@/composables/fetchData'
import { useRoute } from 'vue-router'

const route = useRoute()
const services = ref<any[]>([])
const isLoading = ref(true)

const isHome = computed(() => route.path === '/')
const serviceOptions = computed(() => services.value.map((item: any) => item.title))

onMounted(async () => {
  isLoading.value = true
  services.value = await fetchData('services')
  isLoading.value = false
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
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07);
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
