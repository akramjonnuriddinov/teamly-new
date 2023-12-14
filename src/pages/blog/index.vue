<template>
  <section class="bg-no-repeat bg-cover bg-tg-white my-[86px]">
    <div v-if="isLoading"
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <h1
        class="text-tg-heading-font-color max-w-[1170px] w-full pt-[90px] mb-4 font-medium leading-[1.2] text-[50px] max-sm:text-4xl"
      >
      <Skeleton width="100%" height="80px" :theme="ESkeletonTheme.LIGHT" />
      </h1>
      <div class="flex flex-col rounded-[10px] blog-inner mb-7 transition-all duration-300">
        <div class="max-w-[770px]">
          <Skeleton
          width="100%"
          height="430px"
          :theme="ESkeletonTheme.LIGHT"
        />
        </div>
        <div
          class="flex items-center py-10 w-full mt-auto font-medium text-tg-paragraph-color max-[1200px]:justify-start"
        >
          <div class="flex items-center mr-8">
            <Skeleton width="170px" height="24px" :theme="ESkeletonTheme.LIGHT" />
          </div>
          <div class="flex items-center">
            <Skeleton width="70px" height="24px" :theme="ESkeletonTheme.LIGHT" />
          </div>
        </div>
        <Skeleton width="100%" height="100vh" :theme="ESkeletonTheme.LIGHT" />

      </div>
    </div>
    <div v-else
      class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <h1
        class="text-tg-heading-font-color max-w-[1170px] w-full pt-[90px] mb-4 font-medium leading-[1.2] text-[50px] max-sm:text-4xl"
      >
        {{ blog.title }}
      </h1>
      <div class="flex flex-col rounded-[10px] blog-inner mb-7 transition-all duration-300">
        <img
          :src="blog.image"
          class="w-[770px] h-[430px] object-cover rounded-[10px] max-[650px]:w-full max-[650px]:h-full"
          width="771"
          height="430"
          alt=""
        />
        <div
          class="flex items-center py-10 w-full mt-auto font-medium text-tg-paragraph-color max-[1200px]:justify-start"
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
        <div v-html="blog.text"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import { useRoute } from 'vue-router'
import Skeleton , { ESkeletonTheme } from '@/components/skeleton/Skeleton.vue'

const route = useRoute()
const blogs = ref<any>([])
const blog = ref<any>([])
const isLoading = ref(true)


onMounted(async () => {
  isLoading.value = true
  blogs.value = await fetchData('blog')
  blog.value = await blogs.value.filter((item: any) => item.id === route.params.id)[0]
  isLoading.value = false
})

function formatTimestampToLocaleString(timestamp: number) {
  const date = new Date(timestamp)
  const options: object = { month: 'long', day: 'numeric', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
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
</style>
