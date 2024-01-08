<template>
  <BaseModal title="Status" @close="$emit('close')">
    <div class="flex flex-col justify-between h-full">
      <div class="px-10">
        <form class="w-full h-full overflow-y-auto">
          <div class="flex flex-col w-full">
            <div class="flex items-center justify-between w-full mb-2">
              <label class="text-gray-700" for="category">Status</label>
              <div class="flex relative items-center w-[80%]">
                <select
                  v-model="comment.status_id"
                  class="w-full p-2 border border-gray-200 rounded-md outline-blue-300"
                  id="category"
                >
                  <option value="" disabled selected>Status</option>
                  <option class="flex items-center" :value="status.id" :key="status.id" v-for="status in statuses">
                    {{ status.title }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="isTaskShow" class="flex items-center justify-between w-full mb-2">
              <label class="text-gray-700" for="tasks">Tasks</label>
              <div class="flex relative items-center w-[80%]">
                <select
                  v-model="comment.task_id"
                  class="w-full p-2 border border-gray-200 rounded-md outline-blue-300"
                  id="tasks"
                >
                  <option value="" disabled selected>Task</option>
                  <option v-for="task in tasks" class="flex items-center" :value="task.id" :key="task.id">
                    {{ task.title }}
                  </option>
                </select>
              </div>
            </div>
            <div class="flex items-center justify-between w-full mt-2 mb-2">
              <label class="text-gray-700" for="text">Comment</label>
              <editor
                @input="handleShortDescriptionFromChild"
                :edit-editor="comment.shortDescription"
                class="w-[80%]"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="flex justify-end px-10 pt-5 mt-auto">
        <base-button :is-loading="isLoading" @click="add" :size="ESize.SMALL" type="button"> Add </base-button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Editor from '@/components/reusables/Editor.vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize } from '@/types'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import BaseModal from '@/components/reusables/BaseModal.vue'
import { fetchData } from '@/composables/fetchData'

const collectionRef = collection(db, 'applier_statuses')
const props = defineProps(['currentUser', 'statuses'])
const isLoading = ref(false)
const emit = defineEmits(['close'])

const statuses = ref()
statuses.value = props.statuses

const comment = ref<any>({
  status_id: '',
  shortDescription: '',
  applier_id: props.currentUser.applier_id,
  vacancy_id: props.currentUser.vacancy_id,
  task_id: '',
})
const tasks = ref<any>([])
const isTaskShow = ref(false)

onMounted(async () => {
  if (!tasks.value.length) {
    tasks.value = await fetchData('tasks')
  }
})

watch(
  comment,
  (newVal: any) => {
    if (newVal.status_id === '8nJTTRTAQephYvWWQNWx') {
      isTaskShow.value = true
    } else isTaskShow.value = false
  },
  {
    deep: true,
  },
)

const add = async () => {
  try {
    isLoading.value = true
    await addDoc(collectionRef, { ...comment.value, date: Date.now() })
    // update status of applier
    const docRef = doc(collection(db, 'appliers'), props.currentUser.applier_id)
    await updateDoc(docRef, {
      status_id: comment.value.status_id,
    })
  } catch (error) {
    console.error('status adding error...', error)
  } finally {
    emit('close')
    isLoading.value = false
  }
}

const handleShortDescriptionFromChild = (shortDescription: string) => {
  comment.value.shortDescription = shortDescription
}
</script>
