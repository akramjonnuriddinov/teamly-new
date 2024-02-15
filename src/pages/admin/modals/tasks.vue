<template>
  <admin-base-modal :input="props.input" url="tasks" :old-value="task" modal_title="Tasks">
    <form class="h-auto w-full overflow-y-auto">
      <div class="flex w-full flex-col">
        <div class="mb-3 flex w-full items-center justify-between">
          <label class="text-gray-700" for="title">Title</label>
          <input
            id="title"
            v-model="task.title"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="mb-3 flex w-full items-center justify-between">
          <label class="text-gray-700" for="link">Link</label>
          <input
            id="link"
            v-model="task.link"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="mb-3 flex w-full items-center justify-between">
          <label class="text-gray-700" for="dedline">Term</label>
          <input
            id="dedline"
            v-model="task.dedline"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="mb-2 flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Definition</label>
          <textarea
            v-model="task.definition"
            class="h-[180px] w-[80%] resize-none rounded-md border border-gray-200 p-2 outline-blue-300"
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
import AdminBaseModal from '@/pages/admin/modals/AdminBaseModal.vue'

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
