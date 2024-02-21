import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import AOS from 'aos'
import InlineSvg from 'vue-inline-svg'
import SwiperClass from 'swiper'
import Vue3Lottie from 'vue3-lottie'
import { createHead } from '@vueuse/head'
import 'aos/dist/aos.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'swiper/css'
import LogRocket from 'logrocket'
LogRocket.init('5obype/teamly-uz')

const pinia = createPinia()
const app = createApp(App)
const head = createHead()

SwiperClass.use([])
app.use(Vue3Lottie)
AOS.init()
app.component('inline-svg', InlineSvg)
app.use(pinia)
app.use(router)
app.use(head)
router.isReady().then(() => {
  app.mount('#app')
})
