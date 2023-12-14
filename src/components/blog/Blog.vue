<template>
  <section class="bg-white relative our-blog pt-[135px]">
    <div class="">
      <img class="absolute left-[2%] bottom-2" src="@/assets/images/blog/blog_shape01.png" alt="" />
      <img class="absolute top-[20%] right-36" src="@/assets/images/blog/blog_shape02.png" alt="" />
      <img class="absolute top-[40%] right-10" src="@/assets/images/blog/blog_shape03.png" alt="" />
    </div>
    <div class="container relative z-10 w-full px-5 mx-auto max-w-7xl">
      <div class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Latest news updates
        </span>
        <h2 class="text-center text-tg-dark-blue-color font-bold leading-[1.2] text-5xl max-sm:text-4xl">
          Check Our Company
          <br class="max-[500px]:hidden" />
          Inside Story
        </h2>
      </div>
      <ul v-if="isLoading" class="flex flex-wrap justify-between w-full max-[1200px]:flex-col">
        <li v-for="blog in 5" class="w-1/2 px-4 max-[1200px]:w-auto" :key="blog">
          <div class="flex rounded-[10px] blog-inner mb-7 transition-all duration-300 max-[650px]:flex-col">
            <Skeleton width="100%" height="230px" :theme="ESkeletonTheme.LIGHT" />
            <div
              class="flex w-full bg-white px-[30px] py-[25px] flex-col items-start rounded-tr-[10px] rounded-br-[10px] border border-l-0 border-[#f5f2f2] transition-all duration-300 max-[1200px]:w-auto max-[650px]:border max-[650px]:border-t-0 max-[650px]:rounded-tl-none max-[650px]:rounded-tr-none max-[650px]:rounded-bl-[10px]"
            >
              <Skeleton width="140px" height="28px" :theme="ESkeletonTheme.LIGHT" />
              <div class="mt-4">
                <Skeleton width="287px" height="80px" :theme="ESkeletonTheme.LIGHT" />
              </div>
              <div
                class="flex items-center justify-between w-full mt-auto font-medium text-tg-paragraph-color max-[1200px]:justify-start"
              >
                <div class="flex items-center mr-8">
                  <Skeleton width="193px" height="24px" :theme="ESkeletonTheme.LIGHT" />
                </div>
                <div class="flex items-center">
                  <Skeleton width="70px" height="24px" :theme="ESkeletonTheme.LIGHT" />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-else class="flex flex-wrap justify-between w-full max-[1200px]:flex-col">
        <li v-for="blog in blogs" class="w-1/2 px-4 max-[1200px]:w-auto">
          <div class="flex rounded-[10px] blog-inner mb-7 transition-all duration-300 max-[650px]:flex-col">
            <img
              :src="blog.image"
              class="h-[230px] w-[240px] object-cover rounded-tl-[10px] rounded-bl-[10px] max-[650px]:w-full max-[650px]:h-full max-[650px]:rounded-bl-none max-[650px]:rounded-tr-[10px]"
              width="771"
              height="430"
              alt=""
            />
            <div
              class="blog-content flex w-full bg-white px-[30px] py-[25px] flex-col items-start rounded-tr-[10px] rounded-br-[10px] border border-l-0 border-[#f5f2f2] transition-all duration-300 max-[1200px]:w-auto max-[650px]:border max-[650px]:border-t-0 max-[650px]:rounded-tl-none max-[650px]:rounded-tr-none max-[650px]:rounded-bl-[10px]"
            >
              <span
                class="text-tg-primary-color-two font-semibold text-xs py-[6px] px-[11px] capitalize mb-4 bg-[#EEE8FF] rounded-[5px] transition-all duration-300 truncate max-w-[250px] hover:bg-tg-primary-color-two hover:text-tg-white max-[1300px]:max-w-[200px]"
                >{{ blog.subtitle }}</span
              >
              <router-link
                :to="{
                  name: 'blog',
                  params: {
                    id: blog.id,
                  },
                }"
                class="text-[22px] font-bold mb-4 text-tg-heading-font-color leading-[1.2] line-clamp-3 transition-color duration-300 hover:text-tg-primary-color"
                >{{ blog.title }}</router-link
              >
              <div
                class="flex items-center justify-between w-full mt-auto font-medium text-tg-paragraph-color max-[1200px]:justify-start"
              >
                <div class="flex items-center mr-8">
                  <img class="mr-2" src="@/assets/images/blog/calendar.svg" alt="" />
                  <span class="whitespace-nowrap">
                    {{ formatTimestampToLocaleString(blog.date) }}
                  </span>
                </div>
                <div class="flex items-center">
                  <img class="mr-2" src="@/assets/images/blog/user.svg" alt="" />
                  <span>Admin</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import Skeleton, { ESkeletonTheme } from '@/components/skeleton/Skeleton.vue'

const blogs = ref<any>([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  blogs.value = await fetchData('blog')
  isLoading.value = false
})

function formatTimestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp)
  const options: object = { month: 'long', day: 'numeric', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
</script>

<style scoped>
.blog-inner:hover .blog-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}
</style>
