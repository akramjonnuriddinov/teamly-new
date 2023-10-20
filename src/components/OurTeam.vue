<template>
  <section
    class="bg-[#EFF7FF] our-team bg-no-repeat bg-auto pt-[135px] pb-[240px]"
  >
    <div class="container w-full max-w-full px-5 mx-auto">
      <div class="pb-[70px]">
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Our Amazing Team
        </span>
        <h2
          class="text-center font-bold leading-[1.2] text-5xl max-sm:text-4xl"
        >
          Our Talented Team
          <br />
          Players.
        </h2>
      </div>
      <ul class="flex flex-wrap justify-center gap-4 gap-y-20">
        <li
          class="bg-trasnparent relative team-content rounded-[30px] max-[700px]:max-w-full max-[700px]:w-full"
          v-for="(team, index) in teams"
          :key="index"
        >
          <div class="rounded-[30px] overflow-hidden w-full">
            <router-link :to="{ name: 'home' }">
              <img
                class="object-cover max-w-[318px] h-[331px] scale-100 w-full team-content-img max-[700px]:max-w-full ease-in-out duration-700"
                :src="getImageUrl(team.img_url)"
                alt="user_img"
              />
            </router-link>
          </div>
          <div
            class="flex flex-col absolute items-center p-[30px] max-w-[258px] w-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[20px] justify-center bg-tg-white max-[700px]:max-w-[80%]"
          >
            <h3
              class="leading-[1.2] font-bold text-2xl text-tg-heading-font-color hover:text-tg-primary-color transition-all duration-300 max-[480px]:text-xl max-w-[258px] overflow-hidden text-ellipsis text-center px-2 max-[700px]:max-w-[80%]"
            >
              <router-link class="whitespace-nowrap" :to="{ name: 'home' }">{{
                team.name
              }}</router-link>
            </h3>
            <span
              class="text-lg leadin-1 whitespace-nowrap text-tg-paragraph-color"
              >{{ team.position }}</span
            >
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"

const getImageUrl = (name: any) => {
  return new URL(`../assets/images/team/${name}`, import.meta.url).href
}

const teams = ref([
  {
    name: "Mirahmad Mirzajonov",
    position: "CTO",
    img_url: "team_img01-removebg.png",
  },
  {
    name: "Doston Rustamov",
    position: "Frontend Developer",
    img_url: "team_img02-removebg.png",
  },
  {
    name: "Diyorbek Rajabov",
    position: "Frontend Developer",
    img_url: "team_img03-removebg.png",
  },
  {
    name: "Akramjon Nuriddinov",
    position: "Frontend Developer",
    img_url: "team_img01.jpg",
  },
  {
    name: "Samandar Mirzarahmonov",
    position: "Frontend Developer",
    img_url: "team_img04.jpg",
  },
])
</script>

<style scoped>
.our-team {
  background-image: url("@/assets/images/team/team_shape.png");
  background-position: center 35px;
}

.team-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07);
}

.team-content:hover .team-content-img {
  transform: scale(1.08);
}
</style>
