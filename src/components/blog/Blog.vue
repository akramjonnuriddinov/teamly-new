<template>
  <section class="bg-white relative our-blog pt-[135px] pb-[340px]">
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
      <div class="flex justify-center">
        <ul class="flex gap-7 flex-wrap gap-y-[280px] pb-10">
          <li
            v-for="blog in blogs"
            :key="blog.id"
            class="bg-trasnparent relative min-w-[40%] blog-content rounded-[20px]"
          >
            <div class="rounded-[20px] overflow-hidden w-full">
              <router-link :to="{ name: 'home' }">
                <img
                  class="blog-content-img object-cover max-w-[570px] w-full max-[1220px]:max-w-[470px] max-[1020px]:max-w-[400px] max-[880px]:max-w-full"
                  :src="blog.image"
                  alt="blog_img"
                />
              </router-link>
            </div>
            <div
              class="blog-post-content flex-col absolute items-center py-[45px] px-[30px] max-w-[510px] w-full top-[100%] translate-y-[-100px] rounded-br-[100px] bg-tg-white max-[880px]:max-w-[90%] max-[880px]:rounded-br-[50px]"
            >
              <router-link
                class="uppercase text-tg-primary-color font-bold hover:text-tg-secondary-color transition-color duration-300 mb-2.5 flex"
                :to="{ name: 'home' }"
                >{{ blog.subtitle }}</router-link
              >
              <h3
                class="mb-5 text-[30px] font-bold transition-color duration-300 leading-[1.2] hover:text-tg-primary-color max-[1020px]:text-2xl"
              >
                <router-link :to="{ name: 'home' }">
                  {{ blog.title }}
                </router-link>
              </h3>
              <div class="text-tg-paragraph-color">
                <div class="flex mb-4 max-[500px]:flex-wrap">
                  <div class="flex mr-12 max-[500px]:mr-0">
                    <img class="mr-2" src="@/assets/images/blog/calendar.svg" alt="" />
                    {{ formatTimestampToLocaleString(blog.date) }}
                  </div>
                  <div class="flex">
                    <img class="mr-2" src="@/assets/images/blog/comments.svg" alt="" />
                    {{ 'No Comments' }}
                  </div>
                </div>
                <div
                  contenteditable="false"
                  class="blog-parent leading-[1.8] line-clamp-3 overflow-hidden max-h-[100px]"
                  v-html="blog.text"
                ></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchData } from '@/composables/fetchData'

const blogs = ref<any>([])

fetchData(blogs.value, 'blog')

function formatTimestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp)
  const options: object = { month: 'long', day: 'numeric', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
</script>

<style>
.blog-content-img {
  transform: scale(1);
  transition: 0.5s ease-in-out;
}

.blog-content:hover .blog-content-img {
  transform: scale(1.08);
}

.blog-post-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
}

.blog-parent * {
  color: #757589 !important;
  line-height: 1.8;
}
</style>
