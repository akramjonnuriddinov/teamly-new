<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <h2 class="mb-10 text-3xl capitalize">{{ title }}</h2>
    <div>
      <div
        class="flex items-center justify-between p-5 mb-5 rounded-md bg-gray-50"
        v-for="item in options"
        :key="item.id"
      >
        <h3>
          {{ item.title }}
        </h3>
        <div class="flex gap-4">
          <button
            @click="$emit('open-modal')"
            class="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button class="text-red-500 hover:text-red-700">Remove</button>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        class="bg-tg-primary-color mt-12 text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[120px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
      >
        Create
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { collection, query, getDocs } from "firebase/firestore"
import { useFirestore } from "vuefire"
defineProps(["title"])
const db = useFirestore()

const options = ref([]) as any
onMounted(async () => {
  const q = query(collection(db, "vacancies"))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    const job = {
      id: doc.id,
      title: doc.data().title,
      category: doc.data().category,
      location: doc.data().location,
      time: doc.data().time,
      text: doc.data().text,
    }
    options.value.push(job)
  })
})
</script>
