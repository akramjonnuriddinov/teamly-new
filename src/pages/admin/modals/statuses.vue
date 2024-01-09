<template>
  <admin-base-modal :input="props.input" url="statuses" :old-value="status" modal_title="Statuses">
    <form class="w-full h-auto overflow-y-auto">
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full mb-3">
          <label class="text-gray-700" for="username">Title</label>
          <input
            v-model="status.title"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full mb-3">
          <label class="text-gray-700" for="nativeColorPicker1">Color</label>
          <input
            class="w-[80%] bg-transparent p-0 border-none h-[40px]"
            id="nativeColorPicker1"
            type="color"
            v-model="status.color"
          />
        </div>
        <div class="flex items-center justify-between w-full mb-2">
          <label class="text-gray-700" for="username">Definition</label>
          <textarea
            v-model="status.definition"
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
