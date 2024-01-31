<!-- <template>
  <section class="our-team bg-[#EFF7FF] bg-auto bg-no-repeat pb-[240px] pt-[135px]">
    <div class="container w-full max-w-full px-5 mx-auto">
      <div class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
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
</style> -->
<script setup lang="ts">
import { ref } from 'vue'

const teamItems = ref([
  {
    image: 'https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-01.jpg',
    name: 'Coriss Ambady',
    profession: 'Web Developer',
  },
  {
    image: 'https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-02.jpg',
    name: 'Glorius Cristian',
    profession: 'App Developer',
  },
  {
    image: 'https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-03.jpg',
    name: 'Jackie Sanders',
    profession: 'UI/UX Designer',
  },
  {
    image: 'https://cdn.tailgrids.com/1.0/assets/images/team/team-01/image-04.jpg',
    name: 'Nikolas Brooten',
    profession: 'Sales Manager',
  },
])
</script>

<template>
  <section class="dark:bg-dark pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
    <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div class="mx-auto mb-[60px] max-w-[510px] text-center">
            <span class="mb-3 flex justify-center text-center text-lg font-bold text-tg-primary-color"
              >Our Amazing Team
            </span>
            <h2 class="text-center text-5xl font-bold leading-[1.2] text-tg-dark-blue-color max-sm:text-4xl">
              Our Talented Team
              <br class="max-[500px]:hidden" />
              Players.
            </h2>
          </div>
        </div>
      </div>

      <div class="-mx-4 flex flex-wrap justify-center">
        <template v-for="item in teamItems">
          <div class="w-full px-4 md:w-1/2 xl:w-1/4">
            <div class="mx-auto mb-10 w-full max-w-[370px]">
              <div class="relative overflow-hidden rounded-lg">
                <img :src="item.image" alt="image" class="w-full" />
                <div class="absolute bottom-5 left-0 w-full text-center">
                  <div class="dark:bg-dark-2 relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5">
                    <h3 class="text-dark text-base font-semibold dark:text-white">
                      {{ item.name }}
                    </h3>
                    <p class="text-body-color dark:text-dark-6 text-xs">{{ item.profession }}</p>
                    <div>
                      <span class="absolute bottom-0 left-0">
                        <svg width="61" height="30" viewBox="0 0 61 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="16" cy="45" r="45" fill="#13C296" fill-opacity="0.11" />
                        </svg>
                      </span>
                      <span class="absolute right-0 top-0">
                        <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle
                            cx="0.706257"
                            cy="24.3533"
                            r="0.646687"
                            transform="rotate(-90 0.706257 24.3533)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="6.39669"
                            cy="24.3533"
                            r="0.646687"
                            transform="rotate(-90 6.39669 24.3533)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="12.0881"
                            cy="24.3533"
                            r="0.646687"
                            transform="rotate(-90 12.0881 24.3533)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="17.7785"
                            cy="24.3533"
                            r="0.646687"
                            transform="rotate(-90 17.7785 24.3533)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="0.706257"
                            cy="18.6624"
                            r="0.646687"
                            transform="rotate(-90 0.706257 18.6624)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="6.39669"
                            cy="18.6624"
                            r="0.646687"
                            transform="rotate(-90 6.39669 18.6624)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="12.0881"
                            cy="18.6624"
                            r="0.646687"
                            transform="rotate(-90 12.0881 18.6624)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="17.7785"
                            cy="18.6624"
                            r="0.646687"
                            transform="rotate(-90 17.7785 18.6624)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="0.706257"
                            cy="12.9717"
                            r="0.646687"
                            transform="rotate(-90 0.706257 12.9717)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="6.39669"
                            cy="12.9717"
                            r="0.646687"
                            transform="rotate(-90 6.39669 12.9717)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="12.0881"
                            cy="12.9717"
                            r="0.646687"
                            transform="rotate(-90 12.0881 12.9717)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="17.7785"
                            cy="12.9717"
                            r="0.646687"
                            transform="rotate(-90 17.7785 12.9717)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="0.706257"
                            cy="7.28077"
                            r="0.646687"
                            transform="rotate(-90 0.706257 7.28077)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="6.39669"
                            cy="7.28077"
                            r="0.646687"
                            transform="rotate(-90 6.39669 7.28077)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="12.0881"
                            cy="7.28077"
                            r="0.646687"
                            transform="rotate(-90 12.0881 7.28077)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="17.7785"
                            cy="7.28077"
                            r="0.646687"
                            transform="rotate(-90 17.7785 7.28077)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="0.706257"
                            cy="1.58989"
                            r="0.646687"
                            transform="rotate(-90 0.706257 1.58989)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="6.39669"
                            cy="1.58989"
                            r="0.646687"
                            transform="rotate(-90 6.39669 1.58989)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="12.0881"
                            cy="1.58989"
                            r="0.646687"
                            transform="rotate(-90 12.0881 1.58989)"
                            fill="#3056D3"
                          />
                          <circle
                            cx="17.7785"
                            cy="1.58989"
                            r="0.646687"
                            transform="rotate(-90 17.7785 1.58989)"
                            fill="#3056D3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
