<template>
  <section id="vacancies" class="pt-[115px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <ul class="flex flex-wrap justify-start">
        <li
          class="w-1/3 px-2.5 py-2.5 service-item max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="(vacancy, index) in vacancies"
          :key="index"
        >
          <div
            class="service-item__inner bg-white flex flex-col h-full rounded-[32px] px-[35px] py-[50px]"
          >
            <span class="text-[#5B5A78] mb-5">{{ vacancy.location }}</span>
            <router-link
              :to="{
                name: 'vacancyDetail',
                params: {
                  id: vacancy.id,
                },
              }"
              class="text-3xl font-bold text-[#1C1C37] leading-[1.2em] mb-7 transition-all duration-300 hover:text-tg-secondary-color"
            >
              {{ vacancy.title }}
            </router-link>
            <div
              class="text-tg-primary-color tracking-[-0.3px] font-bold flex items-center gap-3 mb-5"
            >
              <span>{{ vacancy.category }}</span>
              <span
                class="block w-2 h-2 rounded-full bg-tg-primary-color"
              ></span>
              <span>{{ vacancy.time }}</span>
            </div>
            <p class="text-[#5B5A78] mb-12">{{ vacancy.text }}</p>
            <base-button
              :size="ESize.BIG"
              :theme="EThemes.DEFAULT"
              @click="$emit('open')"
              styles="mt-auto py-[18px] px-[25px]"
            >
              Apply
            </base-button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { collection, query, getDocs } from "firebase/firestore"
import { useFirestore } from "vuefire"
import BaseButton from "@/components/reusables/BaseButton.vue"
import { ESize, EThemes } from "@/types/types"
import type { Vacancy } from "@/types/types"

defineProps(["isShow"])
const db = useFirestore()

const vacancies = ref<Vacancy[]>([])

onMounted(async () => {
  const q = query(collection(db, "vacancies"))
  const querySnapshot = await getDocs(q)
  vacancies.value = []
  querySnapshot.forEach((doc) => {
    const vacancy: Vacancy = {
      id: doc.id,
      title: doc.data().title,
      category: doc.data().category,
      location: doc.data().location,
      time: doc.data().time,
      text: doc.data().text,
      requirements: doc.data().requirements,
      tasks: doc.data().tasks,
      date: doc.data().date,
    }
    vacancies.value?.push(vacancy)
  })
})
</script>

<style scoped>
.service-item__inner {
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
}
</style>
