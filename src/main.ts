import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

// SWIPER
// import SwiperClass, { } from 'swiper'
// SwiperClass.use([])
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init();

const app = createApp(App)
app.use(pinia)
app.use(VueAwesomeSwiper)
app.use(router)
app.mount('#app')
