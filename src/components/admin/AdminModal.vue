<template>
  <Suspense>
    <section
      @click="$emit('close-modal')"
      class="bg-[#00000080] overflow-y-auto h-full min-h-screen flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-50"
    >
      <div
        @click.stop
        class="container overflow-y-auto bg-white relative px-5 rounded-xl p-5 mx-auto max-w-[600px] w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      >
        <h1>Vacancy Modal</h1>
        <form class="w-full" @submit.prevent="addVacancy">
          <div class="flex flex-col w-full">
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Location</label>
              <input
                v-model="vacancy.location"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Title</label>
              <input
                v-model="vacancy.title"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Category</label>
              <input
                v-model="vacancy.category"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Time</label>
              <input
                v-model="vacancy.time"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Text</label>
              <input
                v-model="vacancy.text"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Requirements</label>
              <input
                v-model="vacancy.requirements"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Tasks</label>
              <input
                v-model="vacancy.tasks"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button
              class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-8 tracking-[0.5px] transition-all duration-300 max-[990px]:w-ful max-[990px]:mt-5 hover:bg-tg-green"
            >
              Add Vacancy
            </button>
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
