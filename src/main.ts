import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import SwiperClass, { } from 'swiper'
import { VueFire } from 'vuefire'
import { firebaseApp } from '@/firebase/index.ts'

// SwiperClass.use([])

const pinia = createPinia()

const app = createApp(App)

AOS.init();

app.use(VueFire, {
  firebaseApp,
  modules: [],
})

app.use(pinia)
app.use(VueAwesomeSwiper)
app.use(router)
app.mount('#app')
