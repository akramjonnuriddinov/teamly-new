<template>
  <section id="jobs" class="pt-[115px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <ul class="flex flex-wrap justify-start">
        <li
          class="w-1/3 px-2.5 py-2.5 service-item max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="(job, index) in jobs"
          :key="index"
        >
          <div
            class="service-item__inner bg-white flex flex-col h-full rounded-[32px] px-[35px] py-[50px]"
          >
            <span class="text-[#5B5A78] mb-5">{{ job.location }}</span>
            <router-link
              :to="{
                name: 'vacancyDetail',
                params: {
                  id: job.id,
                },
              }"
              class="text-3xl font-bold text-[#1C1C37] leading-[1.2em] mb-7 transition-all duration-300 hover:text-tg-secondary-color"
            >
              {{ job.title }}
            </router-link>
            <div
              class="text-tg-primary-color tracking-[-0.3px] font-bold flex items-center gap-3 mb-5"
            >
              <span>{{ job.category }}</span>
              <span
                class="block w-2 h-2 rounded-full bg-tg-primary-color"
              ></span>
              <span>{{ job.time }}</span>
            </div>
            <p class="text-[#5B5A78] mb-12">{{ job.text }}</p>
            <button
              @click="store.isShow = true"
              class="mt-auto bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[25px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
            >
              Apply
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useColorStore } from "@/store"
import { collection, query, onSnapshot } from "firebase/firestore"
import { useFirestore } from "vuefire"
// import {useCollection} from 'vuefire'

const db = useFirestore()

const store = useColorStore()

// const jobs = useCollection(collection(db, "vacancies"))

const jobs = ref([]) as any
onMounted(async () => {
  const q = query(collection(db, "vacancies"))
  onSnapshot(q, (querySnapshot) => {
    jobs.value = []
    querySnapshot.forEach((doc) => {
      const job = {
        id: doc.id,
        title: doc.data().title,
        category: doc.data().category,
        location: doc.data().location,
        time: doc.data().time,
        text: doc.data().text,
      }
      jobs.value.push(job)
    })
  })
})

// const jobs = ref([
//   {
//     id: "1",
//     title: "Senior Product Manager",
//     location: "Fergana, Uzbekistan",
//     category: "Product design",
//     time: "Fulltime onsite",
//     text: "We are looking for professionals working in this field. You can apply...",
//   },
//   {
//     id: "2",
//     title: "Frontend — VueJS, Javascript",
//     location: "Fergana, Uzbekistan",
//     category: "Frontend",
//     time: "Fulltime onsite",
//     text: "We are looking for professionals working in this field. You can apply...",
//   },
//   {
//     id: "3",
//     title: "Backend - Python Developer",
//     location: "Fergana, Uzbekistan",
//     category: "Backend",
//     time: "Fulltime onsite",
//     text: "We are looking for professionals working in this field. You can apply...",
//   },
//   {
//     id: "4",
//     title: "UX/UI - Designer",
//     location: "Fergana, Uzbekistan",
//     category: "Design",
//     time: "Fulltime onsite",
//     text: "We are looking for professionals working in this field. You can apply...",
//   },
//   {
//     id: "5",
//     title: "Mobile Developer",
//     location: "Fergana, Uzbekistan",
//     category: "Mobile",
//     time: "Fulltime onsite",
//     text: "We are looking for professionals working in this field. You can apply...",
//   },
// ])
</script>

<style scoped>
.service-item__inner {
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.05);
}
</style>
