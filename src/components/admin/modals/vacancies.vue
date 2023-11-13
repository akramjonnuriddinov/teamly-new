<template>
  <base-modal :is-update="isUpdate" @add="addVacancy" @update="updateVacancy" :close="close" :is-disabled="isDisabled">
    <form class="w-full h-auto overflow-y-auto">
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
            <option selected v-for="(category, index) in categories" :key="index" :value="category">
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
            <option selected v-for="(time, index) in times" :key="index" :value="time">
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
            @keyup.enter="addItem('requirements')"
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
          <li v-for="(requirement, index) in vacancy.requirements">{{ index + 1 }}. {{ requirement }}</li>
        </ul>
        <div class="relative flex items-center justify-between w-full mb-2">
          <label class="text-gray-700" for="username">Tasks</label>
          <input
            v-model="textFields.tasks"
            @keyup.enter="addItem('tasks')"
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
          <li v-for="(task, index) in vacancy.tasks">{{ index + 1 }}. {{ task }}</li>
        </ul>
      </div>
    </form>
  </base-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDocument } from 'vuefire'
import { useFirestore } from 'vuefire'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { TextFields, Category } from '../models'
import type { Vacancy } from '@/types'
import BaseModal from './BaseModal.vue'

const db = useFirestore()
const props = defineProps(['input'])

const vacancyCollectionRef = collection(db, 'vacancies')
const initialVacancy = {
  location: '',
  title: '',
  category: '',
  time: '',
  date: 0,
  text: '',
  requirements: [],
  tasks: [],
}

const vacancy = ref<Vacancy>({
  ...initialVacancy,
  ...props.input,
})

const isUpdate = !!props.input?.id

const categories = ref<Category>(['Backend', 'Mobile', 'Design', 'Frontend'])
const times = ref(['Online, Fulltime', 'Onsite, Fulltime'])

const textFields = ref<TextFields>({
  requirements: '',
  tasks: '',
})

let docRef: any = null

if (isUpdate) {
  docRef = doc(collection(db, 'vacancies'), vacancy.value.id)
}

const emit = defineEmits(['close', 'edit'])
const close = () => emit('close')

const addVacancy = async () => {
  try {
    console.log('vacancy adding...')
    const newVacancy = {
      ...vacancy.value,
      date: Date.now(),
    }

    await addDoc(vacancyCollectionRef, newVacancy)
    clearInput()
    emit('close')
  } catch (error) {
    console.error('Error adding vacancy: ', error)
  } finally {
    console.log('vacancy added...')
  }
}

const vacancySource: any = useDocument(docRef)
watch(vacancySource, (vacancySource) => {
  vacancy.value = { ...vacancySource } as any
})

const updateVacancy = async () => {
  await updateDoc(docRef, {
    ...vacancy.value,
  })
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
    textFields.value[slug] = ''
  }
}

function clearInput() {
  vacancy.value = { ...initialVacancy }
}
</script>
