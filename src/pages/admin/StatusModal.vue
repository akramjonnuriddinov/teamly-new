<template>
  <BaseModal title="Status" @close="$emit('close')">
    <div class="flex h-full flex-col justify-between">
      <div class="px-10">
        <form class="h-full w-full overflow-y-auto">
          <div class="flex w-full flex-col">
            <div class="mb-2 flex w-full items-center justify-between">
              <label class="text-gray-700" for="category">Status</label>
              <div class="relative flex w-[80%] items-center">
                <select
                  v-model="comment.status_id"
                  class="w-full rounded-md border border-gray-200 p-2 outline-blue-300"
                  id="category"
                >
                  <option value="" disabled selected>Status</option>
                  <option class="flex items-center" :value="status.id" :key="status.id" v-for="status in statuses">
                    {{ status.title }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="isTaskShow" class="mb-2 flex w-full items-center justify-between">
              <label class="text-gray-700" for="tasks">Tasks</label>
              <div class="relative flex w-[80%] items-center">
                <select
                  v-model="comment.task_id"
                  class="w-full rounded-md border border-gray-200 p-2 outline-blue-300"
                  id="tasks"
                >
                  <option value="" disabled selected>Task</option>
                  <option v-for="task in tasks" class="flex items-center" :value="task.id" :key="task.id">
                    {{ task.title }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-2 mt-2 flex w-full items-center justify-between">
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
      <div class="mt-auto flex justify-end px-10 pt-5">
        <base-button :is-loading="isLoading" @click="add" :size="ESize.SMALL" type="button"> Add </base-button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import Editor from '@/components/Editor.vue'
import BaseButton from '@/components/BaseButton.vue'
import { ESize } from '@/types'
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import BaseModal from '@/components/BaseModal.vue'
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
    const res = await addDoc(collectionRef, { ...comment.value, date: Date.now() })
    const newDoc = doc(collectionRef, res.id)
    await setDoc(newDoc, {
      id: res.id,
      ...comment.value,
      date: Date.now(),
    })

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
