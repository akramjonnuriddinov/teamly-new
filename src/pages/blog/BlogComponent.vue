<template>
  <section class="relative bg-white py-10">
    <div>
      <img class="absolute bottom-2 left-[2%]" src="@/assets/images/blog/blog_shape01.png" alt="" />
      <img class="absolute right-36 top-[20%]" src="@/assets/images/blog/blog_shape02.png" alt="" />
      <img class="absolute right-10 top-[40%]" src="@/assets/images/blog/blog_shape03.png" alt="" />
    </div>
    <div class="container relative z-10 mx-auto w-full px-5">
      <base-top-title class="pb-[70px]">
        <template v-slot:subtitle>Latest news updates</template>
        <template v-slot:title>
          Check Our Company
          <br class="max-[500px]:hidden" />
          Inside Story
        </template>
      </base-top-title>

      <ul v-if="isLoading" class="flex w-full flex-wrap justify-between max-[1200px]:flex-col">
        <li v-for="blog in 5" class="w-1/2 px-4 max-[1200px]:w-auto" :key="blog">
          <div class="blog-inner mb-7 flex rounded-[10px] transition-all duration-300 max-[650px]:flex-col">
            <Skeleton width="318px" height="230px" :theme="ESkeletonTheme.LIGHT" />
            <div
              class="flex w-full flex-col items-start rounded-br-[10px] rounded-tr-[10px] border border-l-0 border-[#f5f2f2] bg-white px-[30px] py-[25px] transition-all duration-300 max-[1200px]:w-auto max-[650px]:rounded-bl-[10px] max-[650px]:rounded-tl-none max-[650px]:rounded-tr-none max-[650px]:border max-[650px]:border-t-0"
            >
              <Skeleton width="140px" height="28px" :theme="ESkeletonTheme.LIGHT" />
              <div class="mt-4">
                <Skeleton width="287px" height="80px" :theme="ESkeletonTheme.LIGHT" />
              </div>
              <div
                class="mt-auto flex w-full items-center justify-between font-medium text-tg-paragraph-color max-[1200px]:justify-start"
              >
                <div class="mr-8 flex items-center">
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
      <ul v-else class="flex w-full flex-wrap justify-between max-[1200px]:flex-col">
        <li v-for="blog in blogs" :key="blog" class="w-1/2 px-4 max-[1200px]:w-auto">
          <div class="blog-inner mb-7 flex rounded-[10px] transition-all duration-300 max-[650px]:flex-col">
            <img
              :src="blog.image"
              class="h-[230px] w-[240px] rounded-bl-[10px] rounded-tl-[10px] object-cover max-[650px]:h-full max-[650px]:w-full max-[650px]:rounded-bl-none max-[650px]:rounded-tr-[10px]"
              width="771"
              height="430"
              alt=""
            />
            <div
              class="blog-content flex w-full flex-col items-start rounded-br-[10px] rounded-tr-[10px] border border-l-0 border-[#f5f2f2] bg-white px-[30px] py-[25px] transition-all duration-300 max-[1200px]:w-auto max-[650px]:rounded-bl-[10px] max-[650px]:rounded-tl-none max-[650px]:rounded-tr-none max-[650px]:border max-[650px]:border-t-0"
            >
              <span
                class="mb-4 max-w-[250px] truncate rounded-[5px] bg-[#EEE8FF] px-[11px] py-[6px] text-xs font-semibold capitalize text-tg-primary-color-two transition-all duration-300 hover:bg-tg-primary-color-two hover:text-tg-white max-[1300px]:max-w-[200px]"
                >{{ blog.subtitle }}</span
              >
              <router-link
                :to="{
                  name: 'blog',
                  params: {
                    id: blog.id,
                  },
                }"
                class="transition-color mb-4 line-clamp-3 text-[22px] font-bold leading-[1.2] text-tg-heading-font-color duration-300 hover:text-tg-primary-color"
                >{{ blog.title }}</router-link
              >
              <div
                class="mt-auto flex w-full items-center justify-between font-medium text-tg-paragraph-color max-[1200px]:justify-start"
              >
                <div class="mr-8 flex items-center">
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
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'
import BaseTopTitle from '@/components/BaseTopTitle.vue'

const blogs = ref<any>([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  blogs.value = await fetchData('blog')
  isLoading.value = false
})
</script>

<style scoped>
.blog-inner:hover .blog-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}
</style>
