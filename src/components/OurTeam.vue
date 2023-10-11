<template>
  <section class="bg-[#EFF7FF] our-team pt-[135px] pb-[240px]">
    <div class="container max-w-full w-full mx-auto px-5">
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
        <li class="bg-trasnparent relative team-content rounded-[30px]">
          <div class="rounded-[30px] overflow-hidden w-full">
            <router-link :to="{ name: 'home' }">
              <img
                class="team-content-img"
                src="../assets/images/team/team_img01.jpg"
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
              <router-link :to="{ name: 'home' }">Serhii Ivanenko</router-link>
            </h3>
            <span class="text-lg leadin-1 text-tg-paragraph-color"
              >Abcmarket CTO</span
            >
          </div>
        </li>
        <li class="bg-trasnparent relative team-content rounded-[30px]">
          <div class="rounded-[30px] overflow-hidden w-full">
            <router-link :to="{ name: 'home' }">
              <img
                class="team-content-img"
                src="../assets/images/team/team_img02.jpg"
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
              <router-link :to="{ name: 'home' }">Alay Macdonald</router-link>
            </h3>
            <span class="text-lg leadin-1 text-tg-paragraph-color"
              >Marketing Strategist</span
            >
          </div>
        </li>
        <li class="bg-trasnparent relative team-content rounded-[30px]">
          <div class="rounded-[30px] overflow-hidden w-full">
            <router-link :to="{ name: 'home' }">
              <img
                class="team-content-img"
                src="../assets/images/team/team_img03.jpg"
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
              <router-link :to="{ name: 'home' }">William Adams</router-link>
            </h3>
            <span class="text-lg leadin-1 text-tg-paragraph-color"
              >Marketologist</span
            >
          </div>
        </li>
        <li class="bg-trasnparent relative team-content rounded-[30px]">
          <div class="rounded-[30px] overflow-hidden w-full">
            <router-link :to="{ name: 'home' }">
              <img
                class="team-content-img"
                src="../assets/images/team/team_img04.jpg"
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
              <router-link :to="{ name: 'home' }">Alexey Sergienko</router-link>
            </h3>
            <span class="text-lg leadin-1 text-tg-paragraph-color"
              >Programmer</span
            >
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

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
  transform: scale(1);
  transition: 0.5s ease-in-out;
}

.team-content:hover .team-content-img {
  transform: scale(1.08);
}
</style>
