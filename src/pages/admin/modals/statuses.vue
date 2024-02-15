<template>
  <admin-base-modal :input="props.input" url="statuses" :old-value="status" modal_title="Statuses">
    <form class="h-auto w-full overflow-y-auto">
      <div class="flex w-full flex-col">
        <div class="mb-3 flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Title</label>
          <input
            v-model="status.title"
            class="mt-2 w-[80%] rounded-md border border-gray-200 p-2 outline-blue-300"
            type="text"
          />
        </div>
        <div class="mb-3 flex w-full items-center justify-between">
          <label class="text-gray-700" for="nativeColorPicker1">Color</label>
          <input
            class="h-[40px] w-[80%] border-none bg-transparent p-0"
            id="nativeColorPicker1"
            type="color"
            v-model="status.color"
          />
        </div>
        <div class="mb-2 flex w-full items-center justify-between">
          <label class="text-gray-700" for="username">Definition</label>
          <textarea
            v-model="status.definition"
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
const intialStatus = {
  title: '',
  definition: '',
  color: '',
}
const status = ref({
  ...intialStatus,
  ...props.input,
})
</script>
