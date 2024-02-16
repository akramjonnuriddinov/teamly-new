import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import InlineSvg from 'vue-inline-svg'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import SwiperClass, { } from 'swiper'
import 'swiper/css'
import Vue3Lottie from 'vue3-lottie'

const pinia = createPinia()
const app = createApp(App)

SwiperClass.use([])
app.use(Vue3Lottie)
AOS.init()
app.component('inline-svg', InlineSvg)
app.use(pinia)
app.use(router)
app.use(VueQuillEditor)
router.isReady().then(() => {
  app.mount('#app')
})
