<template>
  <div class="bg-tg-dark-blue-color text-white">
    <div class="container mx-auto items-center px-5">
      <div class="flex items-center justify-end gap-2">
        <a href="tel:+998337737737" class="inline-flex items-center">
          <app-animation :options="phoneOptions" :width="40" />
          <span class="whitespace-nowrap text-base font-semibold max-sm:text-sm">+998 (33) 773-77-37</span>
        </a>
        <a href="https://t.me/m_mirahmad" class="ml-auto mr-3 transition-all hover:-translate-y-[2px]" target="_blank">
          <img src="@/assets/images/svg/telegram.svg" alt="you tube icon" />
        </a>
        <a
          href="https://www.linkedin.com/company/teamly-uz/"
          class="mr-3 transition-all hover:-translate-y-[2px]"
          target="_blank"
        >
          <img src="@/assets/images/svg/linkedin.svg" alt="linkedin icon" />
        </a>
        <span class="mr-3 cursor-not-allowed transition-all max-[500px]:hidden">
          <img src="@/assets/images/svg/twitter.svg" alt="twitter icon" />
        </span>
        <span class="mr-3 cursor-not-allowed transition-all max-[500px]:hidden">
          <img src="@/assets/images/svg/facebook.svg" alt="facebook icon" />
        </span>
        <span class="mr-3 cursor-not-allowed transition-all max-[500px]:hidden">
          <img src="@/assets/images/svg/instagram.svg" alt="instagram icon" />
        </span>
      </div>
    </div>
  </div>
  <header :class="header" class="home-header header fixed z-50 w-full">
    <div class="container mx-auto p-5">
      <div class="flex items-center justify-between">
        <router-link class="mr-20 flex" to="/">
          <the-logo />
        </router-link>

        <nav
          class="navbar mr-20 transition-all duration-300 max-[990px]:flex max-[990px]:flex-col max-[990px]:overflow-y-auto"
          :class="{
            'translate-x-full-custom transition-all duration-500': isHidden,
          }"
        >
          <div class="hidden w-full max-w-[300px] justify-between bg-tg-white px-[25px] py-[30px] max-[990px]:flex">
            <router-link to="/">
              <the-logo />
            </router-link>
            <button class="flex h-7 w-9 items-center justify-center" @click="toggleModal">
              <img class="h-5 w-4" src="@/assets/images/svg/close.svg" alt="close-icon" />
            </button>
          </div>
          <ul class="navbar__list top-[100px] flex justify-between">
            <li v-if="store.user" class="hidden max-[990px]:block">
              <div
                @click.stop="isDropDown = !isDropDown"
                class="relative"
                onmousedown="return false;"
                onselectstart="return false;"
              >
                <div
                  class="user mb-2 flex cursor-pointer items-center whitespace-nowrap px-[25px] hover:text-tg-primary-color"
                >
                  <img v-if="user?.photoURL" class="mr-2 flex h-10 w-10 rounded-full" :src="user?.photoURL" alt="" />
                  <div
                    v-else
                    class="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-tg-primary-color text-xl font-bold text-tg-white"
                  >
                    {{ user?.name[0] }}
                  </div>
                  <div class="mr-4 max-w-full overflow-hidden truncate whitespace-nowrap py-4 font-semibold">
                    {{ user?.name }}
                  </div>
                  <inline-svg
                    class="ml-auto h-6 w-6 font-bold opacity-60"
                    :class="{ 'rotate-180': isDropDown }"
                    src="svg/profile-toggle.svg"
                  />
                </div>
                <the-transition>
                  <div
                    @click.stop
                    v-show="isDropDown"
                    class="relative right-0 ml-[43px] w-auto whitespace-nowrap bg-white font-semibold"
                  >
                    <router-link
                      @click="(isDropDown = false), (isHidden = true)"
                      to="/profile"
                      class="flex cursor-pointer items-center gap-3 pb-2.5 hover:text-tg-primary-color"
                    >
                      <inline-svg src="svg/user-profile/user.svg" />
                      My profile
                    </router-link>
                    <button
                      @click="logoutHandle(), (isHidden = true)"
                      type="button"
                      class="flex cursor-pointer items-center gap-3 py-2.5 hover:text-tg-primary-color"
                    >
                      <inline-svg src="svg/user-profile/log-out.svg" />
                      Logout
                    </button>
                  </div>
                </the-transition>
              </div>
            </li>
            <li v-else class="min-[990px]:hidden">
              <router-link
                @click="isHidden = true"
                to="/signin"
                class="flex max-w-full overflow-hidden truncate whitespace-nowrap px-[25px] py-4 font-semibold hover:bg-tg-primary-color"
              >
                <inline-svg fill="currentColor" class="mr-3" src="svg/user-profile/user.svg" />
                <span>Login</span>
              </router-link>
            </li>
            <li
              class="navbar__item relative mr-10 max-[1120px]:mr-5 max-[990px]:bg-white"
              v-for="link in links"
              :key="link.name"
            >
              <router-link
                class="nav-link py-0 font-semibold text-tg-heading-font-color transition-colors duration-200 hover:text-tg-primary-color"
                @click="isHidden = true"
                :to="link.url"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
          <div class="mt-auto hidden flex-wrap justify-center gap-2.5 px-5 py-[30px] max-[990px]:flex">
            <a
              v-for="social in socials"
              :key="social.name"
              class="flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#e3e3e3] text-base transition-all duration-300 hover:bg-tg-primary-color hover:text-white"
              :href="social.url"
              target="_blank"
            >
              <inline-svg :src="social.name" />
            </a>
          </div>
        </nav>
        <div
          @click="toggleModal"
          v-if="!isHidden"
          class="fixed left-0 top-0 -z-50 h-[150vh] w-[100vw] bg-[#00000080]"
        ></div>

        <div class="flex items-center">
          <div class="mr-5 max-[990px]:hidden">
            <the-language />
          </div>
          <router-link v-if="!store.user" to="/signin" class="max-[990px]:hidden">
            <inline-svg src="svg/user-profile/user.svg" />
          </router-link>
          <div
            v-else
            @click.stop="isDropDown = !isDropDown"
            class="relative max-[990px]:hidden"
            onmousedown="return false;"
            onselectstart="return false;"
          >
            <div class="user flex cursor-pointer items-center whitespace-nowrap hover:text-tg-primary-color">
              <img
                v-if="user?.photoURL"
                width="40"
                height="40"
                class="flex max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded-full"
                :src="user?.photoURL"
                alt=""
              />
              <div
                v-else
                class="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-tg-primary-color text-xl font-bold text-tg-white"
              >
                {{ user?.name[0] }}
              </div>
              <inline-svg
                class="h-6 w-6 font-bold opacity-60"
                :class="{ 'rotate-180': isDropDown }"
                src="svg/profile-toggle.svg"
              />
            </div>
            <div
              @click.stop
              v-show="isDropDown"
              class="absolute right-0 top-12 w-[220px] min-w-full whitespace-nowrap rounded-[10px] border border-slate-200 bg-white p-3 px-4 shadow-md"
            >
              <div class="mb-4 font-semibold">{{ user.name }}</div>
              <router-link
                @click="isDropDown = false"
                to="/profile"
                class="mb-1 flex cursor-pointer hover:text-tg-primary-color"
                >My profile</router-link
              >
              <router-link
                v-if="user.isAdmin"
                @click="isDropDown = false"
                to="/admin"
                class="mb-1 flex cursor-pointer hover:text-tg-primary-color"
                >Admin</router-link
              >
              <button type="button" @click="logoutHandle" class="cursor-pointer hover:text-tg-primary-color">
                Logout
              </button>
            </div>
          </div>
          <button @click="toggleModal" class="hidden h-[30px] w-[26px] max-[990px]:flex">
            <img
              class="block h-[30px] w-[26px]"
              width="26"
              height="30"
              src="@/assets/images/svg/bars.svg"
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
import TheLanguage from '@/components/TheLanguage.vue'
import TheLogo from '@/components/TheLogo.vue'
import InlineSvg from '@/components/InlineSvg.vue'
import TheTransition from '@/components/TheTransition.vue'
import { useRouter } from 'vue-router'
import AppAnimation from '@/components/AppAnimation.vue'
import PhoneAnimation from '@/assets/images/animation/phone2.json'

const router = useRouter()
const store = useAuthStore()
const user = computed(() => store.user)
const isDropDown = ref(false)
const header = ref('top-10')
const phoneOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: PhoneAnimation,
}
const socials = [
  {
    name: 'svg/linkedin.svg',
    url: 'https://www.linkedin.com/company/teamly-uz/',
  },
  {
    name: 'svg/telegram.svg',
    url: 'https://t.me/teamly_uz',
  },
  {
    name: 'svg/facebook.svg',
    url: '',
  },
  {
    name: 'svg/twitter.svg',
    url: '',
  },
  {
    name: 'svg/instagram.svg',
    url: '',
  },
]
const links = [
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Service',
    url: '/service',
  },
  {
    name: 'Project',
    url: '/project',
  },
  {
    name: 'Vacancy',
    url: '/vacancy',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
]
const isHidden = ref(true)

onMounted(() => {
  window.addEventListener('click', () => {
    isDropDown.value = false
  })
  window.addEventListener('scroll', () => {
    const list = window.scrollY >= 300 ? 'bg-tg-white top-0 header-shadow fixed' : 'transparent top-10 absolute'
    header.value = list + ' transition-all duration-300 '
  })
})
onUpdated(() => {
  isHidden.value ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
})

const logoutHandle = async () => {
  await store.logout()
  router.push('/')
}
const toggleModal = () => {
  isHidden.value = !isHidden.value
  isHidden.value ? document.body.classList.remove('overflow-hidden') : document.body.classList.add('overflow-hidden')
}
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
  @apply text-tg-primary-color;
}

.nav-link::before {
  @apply bg-tg-primary-color;
  content: '';
  position: absolute;
  width: 100%;
  height: 3px;
  border-radius: 3px;
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
