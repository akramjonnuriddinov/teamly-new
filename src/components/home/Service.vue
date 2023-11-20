<template>
  <section class="bg-[#131313] pt-[115px] pb-[90px] relative z-10 text-tg-white">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <div class="absolute -z-50 transition-all duration-1000 right-[4%] top-[9%]">
        <img src="@/assets/images/service/services_shape.png" alt="" />
      </div>
      <div class="pb-[70px]">
        <span class="flex justify-center mb-3 text-lg font-bold text-center text-tg-primary-color"
          >We Can Do For You</span
        >
        <h2 class="text-center font-bold leading-[1.2] text-5xl max-sm:text-4xl">
          Experts in every aspect <br class="max-[500px]:hidden" />
          lifecycle
        </h2>
      </div>

      <ul class="flex flex-wrap justify-between">
        <!-- max-w-[390px] w-full -->
        <li
          class="w-1/3 px-2.5 py-2.5 service-item max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="(service, index) in services"
          :key="index"
        >
          <div class="flex flex-col h-full bg-tg-black-three px-[35px] py-[50px] rounded-[20px] hover:bg-tg-black">
            <router-link
              class="mb-[22px] text-2xl font-bold transition-colors duration-300 whitespace-nowrap hover:text-tg-primary-color"
              to="/"
              >{{ service.title }}</router-link
            >
            <img class="mb-6 service-item-img w-[110px] h-[110px] object-cover" :src="service.image" alt="img" />
            <p class="service-item-text mb-4 leading-[1.8] text-tg-gray">
              {{ service.text }}
            </p>
            <router-link
              class="flex items-center gap-2 mt-auto font-medium transition-colors duration-300 hover:text-tg-primary-color"
              to="/"
            >
              <span>Find out more</span>
              <arrow-right />
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ArrowRight from '@/components/icons/ArrowRight.vue'
import { collection, query, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { showLoader, hideLoader } from '@/composables/loader'
import { Service } from '@/types'

const db = useFirestore()
const services = ref<Service[]>([])

onMounted(async () => {
  try {
    showLoader()
    const q = query(collection(db, 'services'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const service: Service = {
        id: doc.id,
        title: doc.data().title,
        text: doc.data().text,
        category: doc.data().category,
        date: doc.data().date,
        image: doc.data().image,
      }
      services.value?.push(service)
    })
  } catch (error) {
    console.error('Error fetching data: ', error)
  } finally {
    hideLoader()
  }
})
</script>

<style scoped>
.service-item {
  transition: 0.3s ease-in-out;
}
.service-item-img {
  transform: rotateY(0);
  transition: 0.5s;
}

.service-item:hover .service-item-img {
  transform: rotateY(180deg);
}

.service-item:hover .service-item-text {
  color: #9c9c9c;
  transition: 0.3s ease-in-out;
}
</style>
