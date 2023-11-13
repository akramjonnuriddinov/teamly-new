<template>
  <Suspense>
    <section
      @click="$emit('close')"
      class="bg-[#00000080] h-full min-h-screen flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-50"
    >
      <div
        @click.stop
        class="container overflow-y-auto h-full bg-white relative px-5 rounded-xl p-5 mx-auto max-w-[600px] w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      >
        <h1 class="mb-5 text-4xl text-center">Vacancy Modal</h1>
        <form
          class="w-full h-auto overflow-y-auto"
          @submit.prevent="addVacancy"
        >
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
              <label class="text-gray-700" for="category">Category</label>
              <select
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                v-model="vacancy.category"
                id="category"
              >
                <option value="" disabled selected>Select Category</option>
                <option
                  selected
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="time">Time</label>
              <select
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                v-model="vacancy.time"
                id="time"
              >
                <option value="" disabled selected>Select Time</option>
                <option
                  selected
                  v-for="(time, index) in times"
                  :key="index"
                  :value="time"
                >
                  {{ time }}
                </option>
              </select>
            </div>
            <div class="flex items-center justify-between w-full">
              <label class="text-gray-700" for="username">Text</label>
              <input
                v-model="vacancy.text"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>
            <div class="relative flex items-center justify-between w-full mb-2">
              <label class="text-gray-700" for="username">Requirements</label>
              <input
                v-model="textFields.requirements"
                class="w-[80%] p-2 pr-14 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
              <button
                @click="addItem('requirements')"
                type="button"
                class="absolute text-base font-semibold -translate-y-[35%] rounded-md top-1/2 right-3 text-tg-secondary-color"
              >
                + add
              </button>
            </div>
            <ul class="w-[80%] p-2 ml-auto max-h-[200px] overflow-y-auto">
              <li v-for="(requirement, index) in vacancy.requirements">
                {{ index + 1 }}. {{ requirement }}
              </li>
            </ul>
            <div class="relative flex items-center justify-between w-full mb-2">
              <label class="text-gray-700" for="username">Tasks</label>
              <input
                v-model="textFields.tasks"
                class="w-[80%] p-2 pr-14 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
              <button
                @click="addItem('tasks')"
                type="button"
                class="absolute text-base font-semibold -translate-y-[35%] rounded-md top-1/2 right-3 text-tg-secondary-color"
              >
                + add
              </button>
            </div>
            <ul class="w-[80%] p-2 ml-auto max-h-[100px] overflow-y-auto">
              <li v-for="(task, index) in vacancy.tasks">
                {{ index + 1 }}. {{ task }}
              </li>
            </ul>
          </div>

          <div class="flex justify-end mt-4">
            <base-button
              :size="ESize.SMALL"
              :theme="EThemes.GREEN"
              @click="$emit('edit')"
              type="button"
              :disabled="isDisabled"
              class="max-[990px]:mt-5 mr-5"
            >
              Update
            </base-button>
            <base-button
              :size="ESize.SMALL"
              :disabled="isDisabled"
              class="max-[990px]:mt-5"
            >
              Add
            </base-button>
          </div>
        </form>
      </div>
    </section>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useFirestore } from "vuefire"
import { addDoc, collection } from "firebase/firestore"
import { TextFields, Category } from "../models"
import BaseButton from "@/components/reusables/BaseButton.vue"
import type { Vacancy } from "@/types"
import { ESize, EThemes } from "@/types"

const db = useFirestore()
const props = defineProps(["input"])

const vacancyCollectionRef = collection(db, "vacancies")
const vacancy = ref<Vacancy>({
  id: "",
  location: "",
  title: "",
  category: "",
  time: "",
  date: 0,
  text: "",
  requirements: [],
  tasks: [],
})

const categories = ref<Category>(["Backend", "Mobile", "Design", "Frontend"])
const times = ref(["Online, Fulltime", "Onsite, Fulltime"])

const textFields = ref<TextFields>({
  requirements: "",
  tasks: "",
})

props.input ? (vacancy.value = { ...props.input }) : vacancy.value

const emit = defineEmits(["close", "edit"])

const addVacancy = async () => {
  try {
    const newVacancy = {
      ...vacancy.value,
      date: Date.now(),
    }
    await addDoc(vacancyCollectionRef, newVacancy)
    clearInput()
    emit("close")
  } catch (error) {
    console.error("Error adding vacancy: ", error)
  }
}

const isDisabled = computed(() => {
  return !(
    vacancy.value.location?.trim() &&
    vacancy.value.title?.trim() &&
    vacancy.value.category &&
    vacancy.value.time &&
    vacancy.value.text?.trim() &&
    vacancy.value.requirements.length &&
    vacancy.value.tasks.length
  )
})

function addItem(slug: keyof TextFields) {
  const trimmedText = textFields.value[slug].trim()
  if (trimmedText) {
    vacancy.value[slug].push(trimmedText)
    textFields.value[slug] = ""
  }
}

const emptyVacancy = {
  id: "",
  location: "",
  title: "",
  category: "",
  time: "",
  text: "",
  requirements: [],
  tasks: [],
  date: 0,
}

function clearInput() {
  vacancy.value = { ...emptyVacancy }
}
</script>
