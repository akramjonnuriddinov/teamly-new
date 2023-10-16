<template>
  <header :class="header" class="fixed z-50 w-full py-5 home-header header">
    <div
      class="container px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[990px]:max-w-3xl"
    >
      <div class="flex items-center justify-between">
        <router-link class="mr-20 w-[150px] flex" to="/">
          <img
            class="w-[150px] min-w-[150px]"
            width="150"
            height="36"
            src="@/assets/images/custom-logo.svg"
            alt="logo"
          />
        </router-link>

        <nav
          class="mr-20 transition-all duration-300 max-[990px]:overflow-y-auto navbar"
          :class="{
            'translate-x-full-custom transition-all duration-500': isHidden,
          }"
        >
          <div
            class="hidden bg-tg-white w-full max-w-[300px] justify-between py-[30px] px-[25px] max-[990px]:flex"
          >
            <router-link class="mobile-logo w-[150px]" to="/">
              <img
                class="w-[150px] min-w-[150px]"
                width="150"
                height="36"
                src="@/assets/images/custom-logo.svg"
                alt="logo"
              />
            </router-link>
            <button
              class="flex items-center justify-center w-9 h-7"
              @click="toggleModal"
            >
              <img
                class="w-4 h-5"
                src="@/assets/images/svg/close.svg"
                alt="close-icon"
              />
            </button>
          </div>
          <ul class="flex justify-between top-[100px] navbar__list">
            <li
              class="relative mr-10 navbar__item"
              v-for="(link, index) in links"
              :key="index"
            >
              <router-link
                class="py-0 font-semibold transition-colors duration-200 nav-link navbar__link text-tg-heading-font-color hover:text-tg-primary-color"
                :to="link.url"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
          <!-- SOCIALS -->
          <div
            class="hidden py-[30px] flex-wrap justify-center px-5 gap-2.5 max-[990px]:flex"
          >
            <a
              v-for="(social, index) in socials"
              :key="index"
              class="flex items-center justify-center w-10 text-base h-10 border rounded-[3px] border-[#e3e3e3] transition-all duration-300 hover:bg-tg-primary-color hover:text-white"
              :href="social.url"
              target="_blank"
            >
              <span v-html="getSVG(social.name)" />
            </a>
          </div>
          <!-- /SOCIALS -->
        </nav>
        <div
          @click="toggleModal"
          v-if="!isHidden"
          class="bg-[#00000080] h-[100vh] fixed top-0 left-0 w-[100vw] -z-50"
        ></div>

        <div class="flex items-center ml-auto">
          <a
            class="block py-0 mr-10 font-medium whitespace-nowrap text-tg-heading-font-color hover:text-tg-primary-color transition-colors duration-200 max-[1050px]:hidden"
            href="https://t.me/m_mirahmad"
            target="_blank"
            >+998 (33) 773 77 37</a
          >

          <div class="max-[990px]:hidden">
            <the-language />
          </div>
          <button
            class="h-[30px] hidden w-[26px] max-[990px]:flex"
            @click="toggleModal"
          >
            <img
              class="w-[26px] block h-[30px]"
              width="26"
              height="30"
              src="../assets/images/fontawesome/bars.svg"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import TheLanguage from "@/components/TheLanguage.vue"
import { getSVG } from "@/composables/getSVG"

const header = ref("transparent top-0 absolute")

const socials = [
  {
    name: "facebook",
    url: "",
  },
  {
    name: "twitter",
    url: "",
  },
  {
    name: "instagram",
    url: "",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/teamly-uz/",
  },
  {
    name: "telegram",
    url: "https://t.me/teamly_uz",
  },
]

const links = ref([
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "about",
  },
  {
    name: "Service",
    url: "service",
  },
  {
    name: "Work",
    url: "work",
  },
  {
    name: "Career",
    url: "career",
  },
])

const isHidden = ref(true)

const toggleModal = () => {
  isHidden.value = !isHidden.value
  if (isHidden.value == false) {
    document.body.classList.add("overflow-hidden")
  } else {
    document.body.classList.remove("overflow-hidden")
  }
}

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 300) {
      header.value =
        "bg-tg-white header-shadow fixed transition-all top-0 duration-300"
    } else {
      header.value = "transparent absolute transition-all top-0 duration-300"
    }
  })
})
</script>

<style scoped>
.header-shadow {
  box-shadow: 0 10px 15px rgba(25, 25, 25, 0.1);
  animation: 1000ms ease-in-out 0s normal none 1 running fadeInDown;
}

.header {
  animation: 1000ms ease-in-out 0s normal none 1 running fadeInDown;
}

.router-link-active {
  color: #7e54f8;
}

.nav-link::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: #7e54f8;
  bottom: -6px;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.nav-link:hover::before {
  transform-origin: right;
  transform: scaleX(0.8);
}

.router-link-active::before {
  transform: scaleX(0.8);
}

@media (max-width: 990px) {
  .translate-x-full-custom {
    transform: translateX(100%);
  }
  .header {
    z-index: 999;
  }
  .navbar {
    position: fixed;
    background-color: #fff;
    right: 0;
    top: 0;
    margin-right: 0;
    bottom: 0;
    padding-bottom: 100px;
  }

  .navbar__list {
    flex-direction: column;
    justify-content: start;
    width: 300px;
  }
  .navbar__item {
    padding: 10px 60px 10px 25px;
    width: 100%;
    border-top: 1px solid rgb(0 0 0 / 10%);
  }
  .navbar__item:last-child {
    border-bottom: 1px solid rgb(0 0 0 / 10%);
  }

  .nav-link::before {
    transform: scaleX(0) !important;
  }
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
