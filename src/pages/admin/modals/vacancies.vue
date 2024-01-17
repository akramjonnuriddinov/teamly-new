<template>
  <admin-base-modal :input="props.input" url="vacancies" :old-value="vacancy" modal_title="Vacancy">
    <form class="h-auto w-full overflow-y-auto">
      <div class="flex w-full flex-col">
        <div class="flex w-full justify-between">
          <label class="text-gray-700" for="username">Location</label>
          <input
            v-model="vacancy.location"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Title</label>
          <input
            v-model="vacancy.title"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="category">Category</label>
          <select
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            v-model="vacancy.category"
            id="category"
          >
            <option value="" disabled selected>Select Category</option>
            <option selected v-for="(category, index) in categories" :key="index" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
        <div class="mb-2 flex w-full items-center justify-between">
          <label class="text-gray-700" for="time">Time</label>
          <select
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            v-model="vacancy.time"
            id="time"
          >
            <option value="" disabled selected>Select Time</option>
            <option selected v-for="(time, index) in times" :key="index" :value="time">
              {{ time }}
            </option>
          </select>
        </div>
        <div class="flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Text</label>
          <textarea
            v-model="vacancy.text"
            class="h-[180px] w-[80%] resize-none rounded-md border border-gray-200 p-2 outline-blue-300"
            name=""
            id="text"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div class="mt-2 flex w-full items-center justify-between">
          <label class="text-gray-700" for="text">Description</label>
          <editor @input="handleDescriptionFromChild" :edit-editor="vacancy.description" class="w-[80%]" />
        </div>
      </div>
    </form>
  </admin-base-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Category } from '@/types'
import type { Vacancy } from '@/types'
import AdminBaseModal from '@/pages/admin/modals/AdminBaseModal.vue'
import Editor from '@/components/Editor.vue'

const props = defineProps(['input'])

const initialVacancy = {
  location: '',
  title: '',
  category: '',
  time: '',
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
