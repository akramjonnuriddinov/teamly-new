<template>
  <section class="pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
    <div class="container mx-auto">
      <div v-if="isLoading" class="mb-12 flex flex-wrap justify-center gap-2 space-x-1">
        <div class="mb-1">
          <button
            v-for="category in 3"
            :key="category"
            class="mr-2 inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8"
          >
            <Skeleton width="100px" height="48px" :theme="ESkeletonTheme.DARK" />
          </button>
        </div>
        <div class="-mx-4 flex flex-wrap">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            class="w-full px-4 md:w-1/2 xl:w-1/3"
            v-for="item in 3"
            :key="item"
          >
            <div class="relative mb-12">
              <div class="overflow-hidden rounded-[10px]">
                <Skeleton width="490px" height="325px" :theme="ESkeletonTheme.DARK" />
              </div>
              <div
                class="shadow-portfolio relative z-10 mx-7 -mt-20 flex flex-col items-center rounded-lg bg-white px-3 py-[34px] text-center"
              >
                <span class="text-primary mb-2 block text-sm font-medium"
                  ><Skeleton width="100px" height="28px" :theme="ESkeletonTheme.DARK"
                /></span>
                <h3 class="text-dark mb-5 text-xl font-bold">
                  <Skeleton width="100px" height="28px" :theme="ESkeletonTheme.DARK" />
                </h3>
                <div class="inline-block rounded-md px-7 py-[10px]" target="_blank">
                  <Skeleton width="100px" height="48px" :theme="ESkeletonTheme.DARK" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-if="route.name === 'home'" class="-mx-4 flex flex-wrap">
          <div class="w-full px-4">
            <div class="mx-auto mb-[60px] max-w-[510px] text-center">
              <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-indigo">Our Project </span>
              <h2 class="text-center text-5xl font-bold leading-[1.2] text-tg-dark-blue-color max-sm:text-4xl">
                Our Amazing <br class="max-[500px]:hidden" />
                Creative Works.
              </h2>
            </div>
          </div>
        </div>
        <div class="-mx-4 flex w-full flex-wrap justify-center">
          <div class="w-full px-4">
            <ul class="mb-12 flex flex-wrap justify-center gap-2 space-x-1">
              <li class="mb-1">
                <button
                  v-for="category in ['All', ...uniqueCategories]"
                  :key="category"
                  @click="selectCategory(category)"
                  :class="{
                    'bg-tg-primary-color text-white': selectedCategory === category,
                    'text-body-color  hover:bg-tg-primary-color hover:text-white': selectedCategory !== category,
                  }"
                  class="mr-2 inline-block rounded-lg px-5 py-2 text-center text-base font-semibold transition md:py-3 lg:px-8"
                >
                  {{ category }}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="-mx-4 flex flex-wrap">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            class="w-full px-4 md:w-1/2 xl:w-1/3"
            v-for="item in filteredItems"
            :key="item.title"
          >
            <div class="relative mb-12">
              <div class="overflow-hidden rounded-[10px] shadow-service-inner">
                <img :src="item.image" alt="portfolio" class="h-[325px] w-full object-cover" />
              </div>
              <div
                class="relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center shadow-service-inner"
              >
                <span class="text-primary mb-2 block text-sm font-medium">{{ item.category }}</span>
                <h3 class="text-dark mb-5 text-xl font-bold">{{ item.title }}</h3>
                <button
                  @click="$emit('openModal', item)"
                  type="button"
                  class="text-body-color border-stroke inline-block rounded-md border px-7 py-[10px] text-sm font-medium transition hover:border-tg-primary-color hover:bg-tg-primary-color hover:text-white"
                >
                  View detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchData } from '@/composables/fetchData'
import { useRoute } from 'vue-router'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'

const route = useRoute()
const isLoading = ref(true)
const portfolioItems = ref<any>([])
const selectedCategory = ref<string>('All')
const uniqueCategories = ref<string[]>([])
const filteredItems = ref<any[]>([])

onMounted(async () => {
  portfolioItems.value = await fetchData('portfolio')
  isLoading.value = false
  uniqueCategories.value = Array.from(new Set(portfolioItems.value.map((item: any) => item.category)))
  filterItems()
})

const selectCategory = (category: string) => {
  selectedCategory.value = category
  filterItems()
}

const filterItems = () => {
  filteredItems.value =
    selectedCategory.value === 'All'
      ? portfolioItems.value
      : portfolioItems.value.filter((item: any) => item.category === selectedCategory.value)
}
</script>
