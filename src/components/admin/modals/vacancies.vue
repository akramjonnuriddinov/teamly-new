<template>
  <base-modal :input="props.input" url="vacancies" :old-value="vacancy" modal_title="Vacancy">
    <form class="w-full h-auto overflow-y-auto">
      <div class="flex flex-col w-full">
        <div class="flex justify-between w-full">
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
        <div class="flex items-center justify-between w-full mb-2">
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
          <textarea
            v-model="vacancy.text"
            class="w-[80%] h-[180px] resize-none p-2 border border-gray-200 rounded-md outline-blue-300"
            name=""
            id="text"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="flex items-center justify-between w-full mt-2 mb-2">
          <label class="text-gray-700" for="text">Description</label>
          <editor @input="handleDescriptionFromChild" :edit-editor="vacancy.description" class="w-[80%]" />
        </div>
      </div>
    </form>
  </base-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Category } from '@/types'
import type { Vacancy } from '@/types'
import BaseModal from './BaseModal.vue'
import Editor from '@/components/reusables/Editor.vue'

const props = defineProps(['input'])

const initialVacancy = {
  location: '',
  title: '',
  category: '',
  time: '',
  date: 0,
  text: '',
  description: '',
}

const vacancy = ref<Vacancy>({
  ...initialVacancy,
  ...props.input,
})

const categories = ref<Category>(['Backend', 'Mobile', 'Design', 'Frontend'])
const times = ref(['Online, Fulltime', 'Onsite, Fulltime'])

const handleDescriptionFromChild = (description: any) => {
  vacancy.value.description = description
}
</script>
