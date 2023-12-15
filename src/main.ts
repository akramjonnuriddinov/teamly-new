import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { VueFire } from 'vuefire'
import { firebaseApp } from '@/firebase/index'
import InlineSvg from 'vue-inline-svg'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import SwiperClass, { } from 'swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'

const pinia = createPinia()
const app = createApp(App)

SwiperClass.use([]);

AOS.init();
app.component('inline-svg', InlineSvg)
app.use(VueFire, {
  firebaseApp,
  modules: [],
})
app.use(pinia)
app.use(VueAwesomeSwiper)
app.use(router)
app.use(VueQuillEditor)
router.isReady().then(() => {
  app.mount('#app')
})
