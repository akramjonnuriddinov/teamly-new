<template>
  <section class="mt-[86px] bg-tg-white bg-cover bg-no-repeat">
    <div
      v-if="isLoading"
      class="container relative mx-auto px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <h1
        class="mb-4 w-full max-w-[1170px] pt-[90px] text-[50px] font-medium leading-[1.2] text-tg-heading-font-color max-sm:text-4xl"
      >
        <Skeleton width="100%" height="80px" :theme="ESkeletonTheme.LIGHT" />
      </h1>
      <div class="blog-inner mb-7 flex flex-col rounded-[10px] transition-all duration-300">
        <div class="max-w-[770px]">
          <Skeleton width="100%" height="430px" :theme="ESkeletonTheme.LIGHT" />
        </div>
        <div
          class="mt-auto flex w-full items-center py-10 font-medium text-tg-paragraph-color max-[1200px]:justify-start"
        >
          <div class="mr-8 flex items-center">
            <Skeleton width="170px" height="24px" :theme="ESkeletonTheme.LIGHT" />
          </div>
          <div class="flex items-center">
            <Skeleton width="70px" height="24px" :theme="ESkeletonTheme.LIGHT" />
          </div>
        </div>
        <Skeleton width="100%" height="100vh" :theme="ESkeletonTheme.LIGHT" />
      </div>
    </div>
    <div
      v-else
      class="container relative mx-auto px-5 max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <h1
        class="mb-4 w-full max-w-[1170px] pt-[90px] text-[50px] font-medium leading-[1.2] text-tg-heading-font-color max-sm:text-4xl"
      >
        {{ blog.title }}
      </h1>
      <div class="blog-inner mb-7 flex flex-col rounded-[10px] transition-all duration-300">
        <img
          :src="blog.image"
          class="h-[430px] w-[770px] rounded-[10px] object-cover max-[650px]:h-full max-[650px]:w-full"
          width="771"
          height="430"
          alt=""
        />
        <div
          class="mt-auto flex w-full items-center py-10 font-medium text-tg-paragraph-color max-[1200px]:justify-start"
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
        <div v-html="blog.text"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import { useRoute } from 'vue-router'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'

const route = useRoute()
const blogs = ref<any>([])
const blog = ref<any>([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  blogs.value = await fetchData('blog')
  blog.value = blogs.value.filter((item: any) => item.id === route.params.id)[0]
  isLoading.value = false
})
</script>

<style>
.blog-inner:hover .blog-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

pre {
  font-family:
    JetBrains Mono,
    MonoLisa,
    SF Mono,
    Fira Code,
    Roboto,
    Consolas;
  color: #eff;
  background: #263238;
  border-radius: 10px;
  padding: 10px;
  overflow: auto;
}

.blog-inner h1,
.blog-inner h2,
.blog-inner h3 {
  @apply mb-2 mt-10 text-xl font-semibold text-[#1C1C37];
}

.blog-inner a {
  color: rgb(126 84 248) !important;
}
</style>
