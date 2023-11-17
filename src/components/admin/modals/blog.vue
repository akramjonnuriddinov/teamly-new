<template>
  <base-modal :input="props.input" url="blog" :old-value="blog" :is-disabled="isDisabled" modal_title="Blog">
    <form class="w-full h-auto overflow-y-auto">
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full">
          <label class="text-gray-700" for="title">Title</label>
          <input
            v-model="blog.title"
            id="title"
            class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
            type="text"
          />
        </div>
        <div class="flex items-center justify-between w-full mt-5">
          <!-- <label class="text-gray-700" for="text">Text</label> -->
          <editor v-model="editorContent" :options="editorOptions" :disabled="editorDisabled">
            <div class="id" slot="toolbar">
              <!-- Your custom toolbar components/buttons -->
            </div>
          </editor>
        </div>
      </div>
    </form>
  </base-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseModal from '@/components/admin/modals/BaseModal.vue'
import Editor from '@/components/reusables/Editor.vue'

const props = defineProps(['input'])

// const editor
const editorContent = ref('')
const editorOptions = ref({})
const editorDisabled = ref(false)

const initialBlog = {
  id: '',
  title: '',
}
const blog = ref({
  ...initialBlog,
  ...props.input,
})

const isDisabled = computed(() => {
  return !blog.value.title?.trim()
})
</script>
