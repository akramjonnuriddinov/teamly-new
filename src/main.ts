import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// SWIPER
import SwiperClass, { /* swiper modules... */ } from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
SwiperClass.use([/* swiper modules... */])

const app = createApp(App)
app.use(VueAwesomeSwiper)

app.use(router)
app.mount('#app')
