<template>
  <header :class="header" class="fixed top-0 z-50 w-full py-5 home-header header">
    <div
      class="container px-5 mx-auto max-w-7xl max-xl:max-w-[1100px] max-[1050px]:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div class="flex items-center justify-between">
        <router-link class="mr-20 w-[150px] flex" to="/">
          <img
            class="w-[150px] min-w-[150px]"
            width="150"
            height="36"
            src="@/assets/images/logos/custom-logo17.png"
            alt="logo"
          />
        </router-link>

        <nav
          class="mr-20 transition-all duration-300 max-[990px]:overflow-y-auto navbar"
          :class="{
            'translate-x-full-custom transition-all duration-500': isHidden,
          }"
        >
          <div class="hidden bg-tg-white w-full max-w-[300px] justify-between py-[30px] px-[25px] max-[990px]:flex">
            <router-link class="mobile-logo w-[150px]" to="/">
              <img
                class="w-[150px] min-w-[150px]"
                width="150"
                height="36"
                src="@/assets/images/logos/custom-logo17.png"
                alt="logo"
              />
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
          <div class="max-[990px]:hidden">
            <Language />
          </div>
          <router-link class="text-red-500" v-if="!store.user" to="/login">
            <svg class="" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path fill="#111827" fill-rule="evenodd" d="M3.72 12.887a4.167 4.167 0 0 1 2.947-1.22h6.666a4.167 4.167 0 0 1 4.167 4.166V17.5a.833.833 0 0 1-1.667 0v-1.667a2.5 2.5 0 0 0-2.5-2.5H6.667a2.5 2.5 0 0 0-2.5 2.5V17.5a.833.833 0 0 1-1.667 0v-1.667c0-1.105.439-2.165 1.22-2.946zM10 3.333a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm-4.167 2.5a4.167 4.167 0 1 1 8.334 0 4.167 4.167 0 0 1-8.334 0z" clip-rule="evenodd"/>
            </svg>
          </router-link>
          <div v-else @click.stop="isDropDown = !isDropDown" class="relative" onmousedown='return false;' onselectstart='return false;'>
            <div class="cursor-pointer user flex items-center hover:text-tg-primary-color">
              <div class="font-semibold p-2">{{user.name}}</div>
              <svg :class="{'rotate-180': isDropDown}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#111827" fill-rule="evenodd" clip-rule="evenodd" d="M5.23017 7.20938C5.52875 6.92228 6.00353 6.93159 6.29063 7.23017L10 11.1679L13.7094 7.23017C13.9965 6.93159 14.4713 6.92228 14.7698 7.20938C15.0684 7.49647 15.0777 7.97125 14.7906 8.26983L10.5406 12.7698C10.3992 12.9169 10.204 13 10 13C9.79599 13 9.60078 12.9169 9.45938 12.7698L5.20938 8.26983C4.92228 7.97125 4.93159 7.49647 5.23017 7.20938Z"/>
              </svg>
            </div>
            <div @click.stop v-show="isDropDown" class="w-full absolute top-10 border border-slate-200 p-2 bg-white rounded-[10px]">
              <div class="cursor-pointer hover:text-tg-primary-color">My profile</div>
              <div @click="logout" class="cursor-pointer hover:text-tg-primary-color">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref, onUpdated, computed } from 'vue'
import { useAuthStore } from "@/store/auth";
import Language from '@/components/static/Language.vue'
import { getSVG } from '@/composables/getSVG'

const store = useAuthStore();

const user = computed(() => store.user)

const logout = () => {
  store.logout()
}
const isDropDown = ref(false)

onMounted(() => {
      window.addEventListener('click', ()=>{
        isDropDown.value = false
      });
});


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
