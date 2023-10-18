<template>
  <section class="bg-[#EFF7FF] our-team pt-[135px] pb-[240px]">
    <div class="container w-full max-w-full px-5 mx-auto">
      <div class="pb-[70px]">
        <span
          class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >Our Amazing Team
        </span>
        <h2 class="text-center font-bold leading-[1.2] text-5xl">
          Our Talented Team
          <br />
          Players.
        </h2>
      </div>
      <ul class="flex gap-4">
        <li
          class="bg-trasnparent relative team-content rounded-[30px]"
          v-for="(team, index) in teams"
          :key="index"
        >
          <div class="rounded-[30px] overflow-hidden w-full">
            <router-link :to="{ name: 'home' }">
              <img
                class="object-cover team-content-img"
                :src="`src/assets/images/team/${team.img_url}`"
                alt=""
              />
            </router-link>
          </div>
          <div
            class="flex flex-col absolute items-center p-[30px] max-w-[258px] w-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-[20px] justify-center bg-tg-white"
          >
            <h3
              class="leading-[1.2] font-bold text-2xl text-tg-heading-font-color hover:text-tg-primary-color transition-all duration-300"
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
])
</script>

<style scoped>
.our-team {
  background-image: url("@/assets/images/team/team_shape.png");
  background-position: center 35px;
  background-repeat: no-repeat;
  background-size: auto;
}

.team-content {
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.07);
}

.team-content-img {
  width: 318px;
  height: 331px;
  transform: scale(1);
  transition: 0.5s ease-in-out;
}

.team-content:hover .team-content-img {
  transform: scale(1.08);
}
</style>
