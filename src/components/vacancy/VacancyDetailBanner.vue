<template>
  <section class="bg-[#F9F9FA] vacancy-detail">
    <div
      class="container relative px-5 mx-auto max-w-7xl max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="relative pt-[80px] pb-[60px] flex items-center justify-between w-full max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <div class="flex flex-col max-w-[750px]">
          <span class="text-[#5B5A78] mb-5">{{ "Fergana, Uzbekistan" }}</span>
          <h1
            class="mb-4 text-[70px] font-extrabold text-[#38386E] leading-[1.2] max-sm:text-4xl max-[800px]:text-5xl"
          >
            Frontend — VueJS, Javascript
          </h1>
          <span>
            {{ jobs }}
          </span>
          <div
            class="text-tg-primary-color tracking-[-0.3px] font-bold flex items-center gap-3 mb-5"
          >
            <span>{{ "Frontend" }}</span>
            <img
              width="8"
              height="8"
              src="@/assets/images/circle.svg"
              alt="circle"
            />
            <span>{{ "Fulltime remote" }}</span>
          </div>
        </div>
        <button
          @click="store.isShow = true"
          class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[120px] tracking-[0.5px] transition-all duration-300 max-[990px]:w-ful max-[990px]:mt-5 hover:bg-tg-secondary-color"
        >
          Apply
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useColorStore } from "@/store"
import { ref, onMounted } from "vue"
import { collection, query, getDocs } from "firebase/firestore"
import { useFirestore } from "vuefire"

const store = useColorStore()

const db = useFirestore()

const jobs = ref([]) as any

onMounted(async () => {
  const q = query(collection(db, "vacancies"))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    jobs.value.push(doc.data())
    jobs.value.push(doc.id)
  })
})

// const test = [
//   {
//     category: "Backend",
//     title: "Backend - Python Developer",
//     text: "We are looking for professionals working in this field. You can apply...",
//     location: "Fergana, Uzbekistan",
//     time: "Fulltime onsite",
//   },
//   {
//     category: "Mobile",
//     time: "Parttime onsite",
//     location: "Namangan, Uzbekistan",
//     title: "Mobile Developer",
//     text: "We are looking for professionals working in this field. You can apply...",
//   },
//   {
//     location: "Fergana, Uzbekistan",
//     time: "Fulltime onsite",
//     title: "Frontend — VueJS, Javascript",
//     text: "We are looking for professionals working in this field. You can apply...",
//     category: "Product design",
//   },
// ]
</script>

<style scoped>
.vacancy-detail {
  border-radius: 0px 0px 64px 64px;
}
</style>
