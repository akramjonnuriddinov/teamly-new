<template>
  <section class="bg-white relative our-blog pt-[135px] pb-[340px]">
    <div class="">
      <img
        class="absolute left-[2%] bottom-2"
        src="@/assets/images/blog/blog_shape01.png"
        alt=""
      />
      <img
        class="absolute top-[20%] right-36"
        src="@/assets/images/blog/blog_shape02.png"
        alt=""
      />
      <img
        class="absolute top-[40%] right-10"
        src="@/assets/images/blog/blog_shape03.png"
        alt=""
      />
    </div>
    <div class="container relative z-10 w-full px-5 mx-auto max-w-7xl">
      <div class="pb-[70px]">
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Latest news updates
        </span>
        <h2 class="text-center font-bold leading-[1.2] text-5xl">
          Check Our Company
          <br />
          Inside Story
        </h2>
      </div>
      <div class="flex justify-center">
        <ul class="flex gap-7 flex-wrap gap-y-[280px] pb-10">
          <li
            class="bg-trasnparent relative blog-content rounded-[20px]"
            v-for="blog in blogs"
            :key="blog.id"
          >
            <div class="rounded-[20px] overflow-hidden w-full">
              <router-link :to="{ name: 'home' }">
                <img
                  class="blog-content-img max-w-[570px] w-full max-[1220px]:max-w-[470px] max-[1020px]:max-w-[400px] max-[880px]:max-w-full"
                  :src="`src/assets/images/blog/${blog.img_url}`"
                  alt=""
                />
              </router-link>
            </div>
            <div
              class="blog-post-content flex-col absolute items-center py-[45px] px-[30px] max-w-[510px] w-full top-[100%] translate-y-[-100px] rounded-br-[100px] bg-tg-white max-[880px]:max-w-[90%] max-[880px]:rounded-br-[50px]"
            >
              <router-link
                class="uppercase text-tg-primary-color font-bold hover:text-tg-secondary-color transition-color duration-300 mb-2.5 flex"
                :to="{ name: 'home' }"
                >{{ blog.topic }}</router-link
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
                    <img
                      class="mr-2"
                      src="@/assets/images/blog/calendar.svg"
                      alt=""
                    />
                    {{ blog.date }}
                  </div>
                  <div class="flex">
                    <img
                      class="mr-2"
                      src="@/assets/images/blog/comments.svg"
                      alt=""
                    />
                    {{ `${blog.comment_count} comments` || "No Comments" }}
                  </div>
                </div>
                <p class="leading-[1.8] line-clamp-3 overflow-hidden">
                  {{ blog.text }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const blogs = ref([
  {
    id: "1",
    img_url: "blog01.jpg",
    title: "Fintech Startup Will Finance The Women",
    topic: "DIGITAL MARKETING",
    text: "Women entrepreneurs face many challenges in accessing finance for their businesses. According to a report by the World Bank, women-owned businesses account for only 18% of the total small and medium enterprises (SMEs) in India, and they face a credit gap of US$ 116 billion",
    comment_count: 1,
    date: "October 16, 2023",
  },
  {
    id: "2",
    img_url: "blog02.jpg",
    title: "How Remarketing work any Get More",
    topic: "NEW IDEAS",
    text: "Remarketing, also known as retargeting, is a digital marketing strategy that allows you to show ads to people who have visited your website or interacted with your brand before. Remarketing helps you reconnect with your potential customers, remind them of your products or services, and persuade them to come back and convert.",
    comment_count: 0,
    date: "September 3, 2023",
  },
])
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
</style>
