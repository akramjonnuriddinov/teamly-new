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
            <div class="relative flex items-center justify-between w-full mb-2">
              <label class="text-gray-700" for="username">Requirements</label>
              <input
                v-model="requirementsText"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
              <button
                @click="addRequirements"
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
                v-model="tasksText"
                class="w-[80%] p-2 pr-14 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
              <button
                @click="addTasks"
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
            <button
              :disabled="isDisabled"
              class="bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-8 tracking-[0.5px] transition-all duration-300 disabled:cursor-auto disabled:bg-gray-500 max-[990px]:w-ful max-[990px]:mt-5 hover:bg-tg-green"
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
import { ref, computed, onMounted } from "vue"
import { useFirestore } from "vuefire"
import { addDoc, collection } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"

const db = useFirestore()
const props = defineProps(["input"])

const requirementsText = ref("") as any
const tasksText = ref("") as any

const vacancyCollectionRef = collection(db, "vacancies")
const vacancy = ref({
  id: uuidv4(),
  location: "",
  title: "",
  category: "",
  time: "",
  text: "",
  requirements: [],
  tasks: [],
}) as any

onMounted(() => {
  if (props.input) {
    vacancy.value = { ...props.input }
  }
})

const addVacancy = () => {
  addDoc(vacancyCollectionRef, {
    ...vacancy.value,
    date: Date.now(),
  })
  clearInput()
}

const addRequirements = () => {
  if (requirementsText.value)
    vacancy.value.requirements.push(requirementsText.value)
  requirementsText.value = ""
}

const addTasks = () => {
  if (tasksText.value) vacancy.value.tasks.push(tasksText.value)
  tasksText.value = ""
}

const isDisabled = computed(() => {
  if (
    vacancy.value.location &&
    vacancy.value.title &&
    vacancy.value.category &&
    vacancy.value.time &&
    vacancy.value.text
  )
    return false
  return true
})

function clearInput() {
  vacancy.value = {
    location: "",
    title: "",
    category: "",
    time: "",
    text: "",
    requirements: [],
    tasks: [],
  }
}
</script>
