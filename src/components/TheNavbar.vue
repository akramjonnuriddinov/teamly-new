<template>
  <header :class="header" class="z-50 w-full py-5">
    <div class="container px-5 mx-auto max-w-7xl">
      <div class="flex items-center">
        <router-link class="mr-32" to="/">
          <img
            class="max-w-[150px] w-full"
            width="150"
            height="36"
            src="@/assets/images/logo-no-bg.svg"
            alt=""
          />
        </router-link>
        <nav>
          <ul class="flex">
            <li class="relative mr-20">
              <router-link
                class="py-0 font-medium text-tg-heading-font-color hover:text-tg-primary-color"
                :to="{ name: 'home' }"
                >Home</router-link
              >
            </li>
            <li class="relative mr-20">
              <router-link
                class="py-0 font-medium text-tg-heading-font-color hover:text-tg-primary-color"
                :to="{ name: 'home' }"
                >About</router-link
              >
            </li>
            <li class="relative mr-20">
              <router-link
                class="py-0 font-medium text-tg-heading-font-color hover:text-tg-primary-color"
                :to="{ name: 'home' }"
                >Service</router-link
              >
            </li>
            <li class="relative mr-20">
              <router-link
                class="py-0 font-medium text-tg-heading-font-color hover:text-tg-primary-color"
                :to="{ name: 'home' }"
                >Work</router-link
              >
            </li>
            <li class="relative mr-20">
              <router-link
                class="py-0 font-medium text-tg-heading-font-color hover:text-tg-primary-color"
                :to="{ name: 'home' }"
                >Career</router-link
              >
            </li>
          </ul>
        </nav>
        <div class="flex items-center ml-auto">
          <div>
            <a
              class="py-0 mr-10 font-medium text-tg-heading-font-color"
              href="tel://+998337737737"
              >+998337737737</a
            >
          </div>
          <the-language />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import TheLanguage from "@/components/TheLanguage.vue"

const header = ref("transparent absolute")

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
      header.value = "bg-tg-white header-shadow fixed"
    } else {
      header.value = "transparent absolute"
    }
  })
})
</script>

<style scoped>
.header-shadow {
  box-shadow: 0 10px 15px rgba(25, 25, 25, 0.1);
  animation: 1000ms ease-in-out 0s normal none 1 running fadeInDown;
}

header {
  animation: 1000ms ease-in-out 0s normal none 1 running fadeInDown;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
</style>
