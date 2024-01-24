<template>
  <section class="our-team bg-[#EFF7FF] bg-auto bg-no-repeat pb-[240px] pt-[135px]">
    <div class="container mx-auto w-full max-w-full px-5">
      <div class="pb-[70px]">
        <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-primary-color"
          >Our Amazing Team
        </span>
        <h2 class="text-center text-5xl font-bold leading-[1.2] text-tg-dark-blue-color max-sm:text-4xl">
          Our Talented Team
          <br class="max-[500px]:hidden" />
          Players.
        </h2>
      </div>
      <ul v-if="isLoading" class="flex flex-wrap justify-center gap-4 gap-y-20">
        <li
          class="bg-trasnparent team-content relative rounded-[30px] max-[700px]:w-full max-[700px]:max-w-full"
          v-for="team in 4"
          :key="team"
        >
          <div class="w-full overflow-hidden rounded-[30px]">
            <Skeleton
              class="team-content-img h-[331px] w-full min-w-[318px] max-w-full scale-100 object-cover duration-700 ease-in-out max-[700px]:max-w-full"
              width="100%"
              height="331px"
              :theme="ESkeletonTheme.LIGHT"
            />
          </div>
          <div
            class="absolute bottom-0 left-1/2 flex w-full max-w-[90%] -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center rounded-[20px] bg-tg-white p-[30px] max-[700px]:max-w-[80%] max-[600px]:px-5 max-[400px]:max-w-[90%] max-[400px]:p-4"
          >
            <h3
              class="max-w-[258px] overflow-hidden text-ellipsis text-center text-2xl font-bold leading-[1.2] text-tg-heading-font-color transition-all duration-300 hover:text-tg-primary-color max-[700px]:max-w-full max-[480px]:text-xl"
            >
              <Skeleton width="251px" height="31px" :theme="ESkeletonTheme.LIGHT" />
            </h3>
            <span
              class="leadin-1 mt-4 max-w-[258px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg text-tg-paragraph-color"
              ><Skeleton width="168px" height="28px" :theme="ESkeletonTheme.LIGHT"
            /></span>
          </div>
        </li>
      </ul>
      <ul v-else class="flex flex-wrap justify-center gap-4 gap-y-20">
        <li
          class="bg-trasnparent team-content relative rounded-[30px] max-[700px]:w-full max-[700px]:max-w-full"
          v-for="(team, index) in teams"
          :key="index"
        >
          <div class="w-full overflow-hidden rounded-[30px]">
            <router-link :to="{ name: 'home' }">
              <img
                class="team-content-img h-[331px] w-full min-w-[318px] max-w-full scale-100 object-cover duration-700 ease-in-out max-[700px]:max-w-full"
                width="318"
                :src="team.image"
                alt="user_img"
              />
            </router-link>
          </div>
          <div
            class="absolute bottom-0 left-1/2 flex w-full max-w-[90%] -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center rounded-[20px] bg-tg-white p-[30px] max-[700px]:max-w-[80%] max-[600px]:px-5 max-[400px]:max-w-[90%] max-[400px]:p-4"
          >
            <h3
              class="max-w-[258px] overflow-hidden text-ellipsis text-center text-2xl font-bold leading-[1.2] text-tg-heading-font-color transition-all duration-300 hover:text-tg-primary-color max-[700px]:max-w-full max-[480px]:text-xl"
            >
              <a class="whitespace-nowrap" :href="team.linkedin || '#'" target="_blank">{{ team.title }}</a>
            </h3>
            <span
              class="max-w-[258px] overflow-hidden text-ellipsis whitespace-nowrap text-center text-lg leading-[1] text-tg-paragraph-color"
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
