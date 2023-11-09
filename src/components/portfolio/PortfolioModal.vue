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
        <h1 class="mb-5 text-4xl text-center">Portfolio Modal</h1>
        <form
          class="w-full h-auto overflow-y-auto"
          @submit.prevent="addVacancy"
        >
          <div class="flex flex-col w-full">
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
            <div class="flex items-center justify-between w-full mb-5">
              <label class="text-gray-700" for="username">Text</label>
              <input
                v-model="vacancy.text"
                class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                type="text"
              />
            </div>

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  @change="onFileSelected"
                  type="file"
                  class="hidden"
                />
              </label>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              @click="$emit('edit')"
              type="button"
              :disabled="isDisabled"
              class="bg-tg-green text-tg-white rounded-[10px] font-bold inline-block text-center mr-5 whitespace-nowrap py-[18px] px-8 tracking-[0.5px] transition-all duration-300 disabled:cursor-auto disabled:bg-gray-500 max-[990px]:w-ful max-[990px]:mt-5 hover:bg-tg-secondary-color"
            >
              Edit Vacancy
            </button>
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
import { ref, computed } from "vue"
import { useFirestore } from "vuefire"
import { addDoc, collection } from "firebase/firestore"
import { v4 as uuidv4 } from "uuid"
import { TextFields, Vacancy, Category } from "@/components/admin/models"

const db = useFirestore()
const props = defineProps(["input"])

const vacancyCollectionRef = collection(db, "vacancies")
const vacancy = ref<Vacancy>({
  id: uuidv4(),
  location: "",
  title: "",
  category: "",
  time: "",
  text: "",
  requirements: [],
  tasks: [],
})

const categories = ref<Category>(["Backend", "Mobile", "Design", "Frontend"])

const textFields = ref<TextFields>({
  requirements: "",
  tasks: "",
})

props.input ? (vacancy.value = { ...props.input }) : vacancy.value

const emit = defineEmits(["close", "edit"])

const addVacancy = async () => {
  textFields.value.tasks
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

const onFileSelected = (event: any) => {
  console.log(event)
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

const emptyVacancy = {
  id: "",
  location: "",
  title: "",
  category: "",
  time: "",
  text: "",
  requirements: [],
  tasks: [],
}

function clearInput() {
  vacancy.value = { ...emptyVacancy }
}
</script>
