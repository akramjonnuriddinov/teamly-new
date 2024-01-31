<template>
  <section class="dark:bg-dark pb-12 pt-20 lg:pb-[90px] lg:pt-[120px]">
    <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center">
            <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-primary-color"
              >Our Project
            </span>
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
                  'text-body-color dark:text-dark-6 hover:bg-tg-primary-color hover:text-white':
                    selectedCategory !== category,
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
            <div class="overflow-hidden rounded-[10px]">
              <img :src="item.image" alt="portfolio" class="w-full" />
            </div>
            <div
              class="dark:bg-dark-2 shadow-portfolio dark:shadow-box-dark relative z-10 mx-7 -mt-20 rounded-lg bg-white px-3 py-[34px] text-center"
            >
              <span class="text-primary mb-2 block text-sm font-medium">{{ item.category }}</span>
              <h3 class="text-dark mb-5 text-xl font-bold dark:text-white">{{ item.title }}</h3>
              <a
                :href="item.buttonLink"
                class="text-body-color dark:text-dark-6 border-stroke dark:border-dark-3 inline-block rounded-md border px-7 py-[10px] text-sm font-medium transition hover:border-tg-primary-color hover:bg-tg-primary-color hover:text-white"
              >
                {{ item.buttonText }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface PortfolioItem {
  image: string
  category: string
  title: string
  buttonText: string
  buttonLink: string
}

const portfolioItems = ref<PortfolioItem[]>([
  {
    image: 'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-01.jpg',
    category: 'Branding',
    title: 'Branding Design',
    buttonText: 'View Details',
    buttonLink: '#',
  },
  {
    image: 'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-02.jpg',
    category: 'Marketing',
    title: 'Best Marketing tips',
    buttonText: 'View Details',
    buttonLink: '#',
  },
  {
    image: 'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-03.jpg',
    category: 'Development',
    title: 'Web Design Trend',
    buttonText: 'View Details',
    buttonLink: '#',
  },
  {
    image: 'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-04.jpg',
    category: 'Design',
    title: 'Business Card Design',
    buttonText: 'View Details',
    buttonLink: '#',
  },
  {
    image: 'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-05.jpg',
    category: 'Marketing',
    title: 'Digital marketing',
    buttonText: 'View Details',
    buttonLink: '#',
  },
  {
    image: 'https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-06.jpg',
    category: 'Branding',
    title: 'Creative Agency',
    buttonText: 'View Details',
    buttonLink: '#',
  },
])

const selectedCategory = ref<string>('All')

const uniqueCategories = ref<string[]>([])
const filteredItems = ref<PortfolioItem[]>([])

// Extract unique categories from portfolioItems
onMounted(() => {
  uniqueCategories.value = Array.from(new Set(portfolioItems.value.map((item) => item.category)))
  filterItems()
})

const selectCategory = (category: string) => {
  selectedCategory.value = category
  filterItems()
}

const filterItems = () => {
  if (selectedCategory.value === 'All') {
    filteredItems.value = portfolioItems.value
  } else {
    filteredItems.value = portfolioItems.value.filter((item) => item.category === selectedCategory.value)
  }
}
</script>
