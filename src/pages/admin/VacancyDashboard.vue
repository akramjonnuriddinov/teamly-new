<template>
  <Suspense>
    <section>
      <div
        class="container relative px-5 mx-auto max-w-7xl max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      >
        <h1>Vacancy Admin</h1>
        <form @submit.prevent="addVacancy">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="username">Location</label>
              <input
                v-model="vacancy.location"
                class="w-full p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div>
              <label class="text-gray-700" for="username">Title</label>
              <input
                v-model="vacancy.title"
                class="w-full p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div>
              <label class="text-gray-700" for="username">Category</label>
              <input
                v-model="vacancy.category"
                class="w-full p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div>
              <label class="text-gray-700" for="username">Time</label>
              <input
                v-model="vacancy.time"
                class="w-full p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div>
              <label class="text-gray-700" for="username">Text</label>
              <input
                v-model="vacancy.text"
                class="w-full p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div>
              <label class="text-gray-700" for="username">Requirements</label>
              <input
                v-model="vacancy.requirements"
                class="w-full p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div>
              <label class="text-gray-700" for="username">Tasks</label>
              <input
                v-model="vacancy.tasks"
                class="w-full p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <!-- <button
              class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-8 tracking-[0.5px] transition-all duration-300 max-[990px]:w-ful max-[990px]:mt-5 hover:bg-tg-green"
            >
              Add Vacancy
            </button> -->
            <base-button
              styles="py-[18px] px-8 inline-block max-[990px]:w-ful max-[990px]:mt-5"
            >
              Add Vacancy
            </base-button>
          </div>
        </form>
      </div>
    </section>
  </Suspense>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useFirestore } from "vuefire"
import { addDoc, collection } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

const db = useFirestore()

const vacancyCollectionRef = collection(db, "vacancies")
const vacancy = ref({
  id: uuidv4(),
  location: "",
  title: "",
  category: "",
  time: "",
  text: "",
  requirements: "",
  tasks: "",
}) as any

const addVacancy = () => {
  addDoc(vacancyCollectionRef, {
    location: vacancy.value.location,
    title: vacancy.value.title,
    category: vacancy.value.category,
    time: vacancy.value.time,
    text: vacancy.value.text,
    requirements: vacancy.value.requirements,
    tasks: vacancy.value.tasks,
    date: Date.now(),
  })
}
</script>
