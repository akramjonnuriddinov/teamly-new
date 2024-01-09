<template>
  <admin-base-modal :input="props.input" url="tasks" :old-value="task" modal_title="Tasks">
    <form class="w-full h-auto overflow-y-auto">
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full mb-3">
          <label class="text-gray-700" for="title">Title</label>
          <input
            id="title"
            v-model="task.title"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full mb-3">
          <label class="text-gray-700" for="link">Link</label>
          <input
            id="link"
            v-model="task.link"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full mb-3">
          <label class="text-gray-700" for="dedline">Term</label>
          <input
            id="dedline"
            v-model="task.dedline"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full mb-2">
          <label class="text-gray-700" for="username">Definition</label>
          <textarea
            v-model="task.definition"
            class="w-[80%] h-[180px] resize-none p-2 border border-gray-200 rounded-md outline-blue-300"
            name=""
            id="text"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </form>
  </admin-base-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminBaseModal from '@/components/admin_modals/AdminBaseModal.vue'

const props = defineProps(['input'])
const intialTask = {
  title: '',
  link: '',
  dedline: '',
  definition: '',
}
const task = ref({
  ...intialTask,
  ...props.input,
})
</script>
