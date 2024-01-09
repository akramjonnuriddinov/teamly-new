<template>
  <section class="bg-[#EFF7FF] our-team bg-no-repeat bg-auto pt-[135px] pb-[240px]">
    <div class="container w-full max-w-full px-5 mx-auto">
      <div class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Our Amazing Team
        </span>
        <h2 class="text-center text-tg-dark-blue-color font-bold leading-[1.2] text-5xl max-sm:text-4xl">
          Our Talented Team
          <br class="max-[500px]:hidden" />
          Players.
        </h2>
      </div>
      <ul v-if="isLoading" class="flex flex-wrap justify-center gap-4 gap-y-20">
        <li
          class="bg-trasnparent relative team-content rounded-[30px] max-[700px]:max-w-full max-[700px]:w-full"
          v-for="team in 4"
          :key="team"
        >
          <div class="rounded-[30px] overflow-hidden w-full">
            <Skeleton
              class="max-w-full min-w-[318px] object-cover h-[331px] scale-100 w-full team-content-img ease-in-out duration-700 max-[700px]:max-w-full"
              width="100%"
              height="331px"
              :theme="ESkeletonTheme.LIGHT"
            />
          </div>
          <div
            class="flex flex-col absolute items-center p-[30px] max-w-[90%] w-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[20px] justify-center bg-tg-white max-[700px]:max-w-[80%] max-[600px]:px-5 max-[400px]:max-w-[90%] max-[400px]:p-4"
          >
            <h3
              class="leading-[1.2] font-bold text-2xl text-tg-heading-font-color transition-all duration-300 max-w-[258px] overflow-hidden text-ellipsis text-center max-[480px]:text-xl max-[700px]:max-w-full hover:text-tg-primary-color"
            >
              <Skeleton width="251px" height="31px" :theme="ESkeletonTheme.LIGHT" />
            </h3>
            <span
              class="text-lg leadin-1 mt-4 whitespace-nowrap text-tg-paragraph-color max-w-[258px] overflow-hidden text-ellipsis text-center"
              ><Skeleton width="168px" height="28px" :theme="ESkeletonTheme.LIGHT"
            /></span>
          </div>
        </li>
      </ul>
      <ul v-else class="flex flex-wrap justify-center gap-4 gap-y-20">
        <li
          class="bg-trasnparent relative team-content rounded-[30px] max-[700px]:max-w-full max-[700px]:w-full"
          v-for="(team, index) in teams"
          :key="index"
        >
          <div class="rounded-[30px] overflow-hidden w-full">
            <router-link :to="{ name: 'home' }">
              <img
                class="max-w-full min-w-[318px] object-cover h-[331px] scale-100 w-full team-content-img ease-in-out duration-700 max-[700px]:max-w-full"
                width="318"
                :src="team.image"
                alt="user_img"
              />
            </router-link>
          </div>
          <div
            class="flex flex-col absolute items-center p-[30px] max-w-[90%] w-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[20px] justify-center bg-tg-white max-[700px]:max-w-[80%] max-[600px]:px-5 max-[400px]:max-w-[90%] max-[400px]:p-4"
          >
            <h3
              class="leading-[1.2] font-bold text-2xl text-tg-heading-font-color transition-all duration-300 max-w-[258px] overflow-hidden text-ellipsis text-center max-[480px]:text-xl max-[700px]:max-w-full hover:text-tg-primary-color"
            >
              <router-link class="whitespace-nowrap" :to="{ name: 'home' }">{{ team.title }}</router-link>
            </h3>
            <span
              class="text-lg leading-[1] whitespace-nowrap text-tg-paragraph-color max-w-[258px] overflow-hidden text-ellipsis text-center"
              >{{ team.position }}</span
            >
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

const teams = ref<any>([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  teams.value = await fetchData('about')
  isLoading.value = false
})
</script>

<style scoped>
.our-team {
  background-image: url('@/assets/images/team/team_shape.png');
  background-position: center 35px;
}

.team-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07);
}

.team-content:hover .team-content-img {
  transform: scale(1.08);
}

.team-content-img {
  object-position: center 35%;
}
</style>
