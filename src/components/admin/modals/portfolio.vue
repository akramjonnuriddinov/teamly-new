<template>
  <base-modal
    :is-disabled="isDisabled"
    :close="close"
    @add="addVacancy"
    @update="updateVacancy"
  >
    <form class="w-full h-auto overflow-y-auto" @submit.prevent="addVacancy">
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

        <div
          class="flex overflow-hidden self-end relative items-center justify-center w-[80%]"
        >
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <inline-svg
                class="text-3xl text-gray-500"
                src="svg/fontawesome/upload.svg"
              />

              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
              <img
                v-if="vacancy.image"
                class="absolute top-0 object-cover w-full h-full rounded-lg"
                :src="vacancy.image"
                alt=""
              />
            </div>
            <input
              id="dropzone-file"
              @change="uploadImage"
              type="file"
              class="hidden"
            />
          </label>
          <button
            v-if="vacancy.image"
            @click="deleteImage"
            class="absolute flex items-center justify-center text-2xl text-white transition-all bg-gray-900 rounded-[3px] w-7 h-7 top-5 right-5 hover:text-red-500"
            type="button"
          >
            <inline-svg src="svg/fontawesome/xmark.svg" />
          </button>
        </div>
      </div>
    </form>
  </base-modal>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useFirestore } from "vuefire"
import { addDoc, collection } from "firebase/firestore"
import { Category } from "../models"
import InlineSvg from "@/components/reusables/InlineSvg.vue"
import BaseModal from "@/components/admin/modals/BaseModal.vue"

const db = useFirestore()
const props = defineProps(["input"])

const vacancyCollectionRef = collection(db, "portfolio")
const vacancy = ref<any>({
  id: "",
  title: "",
  category: "",
  text: "",
  image: null,
})

const categories = ref<Category>(["Backend", "Mobile", "Design", "Frontend"])

props.input ? (vacancy.value = { ...props.input }) : vacancy.value

const emit = defineEmits(["close", "edit"])
const close = () => emit("close")

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

const updateVacancy = () => {
  console.log("portfolio updated")
}

const uploadImage = (e: any) => {
  const image = e.target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = (event: any) => {
    vacancy.value.image = event.target.result
  }
}

const deleteImage = () => {
  vacancy.value.image = null
}

const isDisabled = computed(() => {
  return !(
    vacancy.value.title?.trim() &&
    vacancy.value.category &&
    vacancy.value.text?.trim() &&
    vacancy.value.image
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
