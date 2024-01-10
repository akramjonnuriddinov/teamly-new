<template>
  <header :class="header" class="fixed top-0 z-50 w-full py-5 home-header header">
    <div
      class="container px-5 mx-auto max-w-7xl max-xl:max-w-[1100px] max-[1050px]:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div class="flex items-center justify-between">
        <router-link class="flex mr-20" to="/">
          <the-logo />
        </router-link>

        <nav
          class="mr-20 transition-all duration-300 max-[990px]:overflow-y-auto navbar"
          :class="{
            'translate-x-full-custom transition-all duration-500': isHidden,
          }"
        >
          <div class="hidden bg-tg-white w-full max-w-[300px] justify-between py-[30px] px-[25px] max-[990px]:flex">
            <router-link to="/">
              <the-logo />
            </router-link>
            <button class="flex items-center justify-center w-9 h-7" @click="toggleModal">
              <img class="w-4 h-5" src="@/assets/images/svg/close.svg" alt="close-icon" />
            </button>
          </div>
          <ul class="flex justify-between top-[100px] navbar__list">
            <li class="relative mr-10 navbar__item" v-for="(link, index) in links" :key="index">
              <router-link
                class="py-0 font-semibold transition-colors duration-200 nav-link navbar__link text-tg-heading-font-color hover:text-tg-primary-color"
                @click="isHidden = true"
                :to="link.url"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
          <div class="hidden py-[30px] flex-wrap justify-center px-5 gap-2.5 max-[990px]:flex">
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
        </nav>
        <div
          @click="toggleModal"
          v-if="!isHidden"
          class="bg-[#00000080] h-[150vh] fixed top-0 left-0 w-[100vw] -z-50"
        ></div>

        <div class="flex items-center">
          <div class="mr-5 max-[990px]:hidden">
            <the-language />
          </div>
          <router-link v-if="!store.user" to="/sign-in">
            <inline-svg src="fontawesome/user-profile/user.svg" />
          </router-link>
          <div
            v-else
            @click.stop="isDropDown = !isDropDown"
            class="relative"
            onmousedown="return false;"
            onselectstart="return false;"
          >
            <div class="flex items-center cursor-pointer whitespace-nowrap user hover:text-tg-primary-color">
              <img class="flex w-10 h-10 rounded-full" :src="user.photoURL" alt="" />
              <inline-svg
                class="w-6 h-6 font-bold opacity-60"
                :class="{ 'rotate-180': isDropDown }"
                src="fontawesome/profile-toggle.svg"
              />
            </div>
            <div
              @click.stop
              v-show="isDropDown"
              class="min-w-full w-[200px] shadow-2xl whitespace-nowrap absolute right-0 top-12 border border-slate-200 p-3 bg-white rounded-[10px]"
            >
              <div class="mb-2 font-semibold">{{ user.name }}</div>
              <router-link @click="isDropDown = false" to="/profile" class="cursor-pointer hover:text-tg-primary-color"
                >My profile</router-link
              >
              <div @click="logout" class="cursor-pointer hover:text-tg-primary-color">Logout</div>
            </div>
          </div>
          <button @click="toggleModal" class="h-[30px] hidden w-[26px] max-[990px]:flex">
            <img
              class="w-[26px] block h-[30px]"
              width="26"
              height="30"
              src="@/assets/images/fontawesome/bars.svg"
              alt="bars_icon"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref, onUpdated, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import TheLanguage from '@/components/static/TheLanguage.vue'
import { getSVG } from '@/composables/getSVG'
import TheLogo from '@/components/TheLogo.vue'
import InlineSvg from '@/components/InlineSvg.vue'

const store = useAuthStore()

const user = computed(() => store.user)

const logout = async () => {
  await store.logout()
  window.location.reload()
}
const isDropDown = ref(false)

onMounted(() => {
  window.addEventListener('click', () => {
    isDropDown.value = false
  })
})

const header = ref('')
const socials = [
  {
    name: 'facebook',
    url: '',
  },
  {
    name: 'twitter',
    url: '',
  },
  {
    name: 'instagram',
    url: '',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/company/teamly-uz/',
  },
  {
    name: 'telegram',
    url: 'https://t.me/teamly_uz',
  },
]
const links = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Service',
    url: '/service',
  },
  {
    name: 'Portfolio',
    url: '/portfolio',
  },
  {
    name: 'Vacancy',
    url: '/vacancy',
  },
]
const isHidden = ref(true)

const toggleModal = () => {
  isHidden.value = !isHidden.value
  isHidden.value ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
}

onUpdated(() => {
  isHidden.value ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
})

onMounted(() => {
  window.addEventListener('scroll', () => {
    const list = window.scrollY >= 300 ? 'bg-tg-white header-shadow fixed' : 'transparent absolute'
    header.value = list + ' transition-all top-0 duration-300'
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

.user:hover path {
  fill: #7e54f8;
}

.router-link-active {
  color: #7e54f8;
}

.nav-link::before {
  content: '';
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
