<template>
  <BaseModal title="Status" @close="$emit('close')">
    <div class="h-full overflow-y-auto pb-[110px]">
        <div class="px-10">
          <form class="w-full h-auto overflow-y-auto">
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
                      {{ status.status }}
                    </option>
                  </select>
                  <input
                    class="absolute right-0 h-full p-0 bg-transparent"
                    id="nativeColorPicker1"
                    type="color"
                    v-model="comment.color"
                  />
                </div>
              </div>
              <div class="flex items-center justify-between w-full mt-2 mb-2">
                <label class="text-gray-700" for="text">Comment</label>
                <editor @input="handleDescriptionFromChild" :edit-editor="comment.description" class="w-[80%]" />
              </div>
            </div>
          </form>
        </div>
        <div class="flex justify-end px-10 pb-5 mt-4">
          <base-button :is-loading="isLoading" @click="add" :size="ESize.SMALL" type="button"> Add </base-button>
        </div>
      </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@/components/reusables/Editor.vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize } from '@/types'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import BaseModal from '@/components/reusables/BaseModal.vue'

const db = useFirestore()
const collectionRef = collection(db, 'applier_statuses')
const props = defineProps(['currentUser', 'statuses'])
const isLoading = ref(false)
const emit = defineEmits<{
  (e: 'close'): void
}>()

const comment = ref<any>({
  status_id: '',
  description: '',
  color: '#cccccc',
})

const add = async () => {
  try {
    isLoading.value = true
    comment.value.applier_id = props.currentUser.applier_id
    comment.value.vacancy_id = props.currentUser.vacancy_id

    const newValue = {
      ...comment.value,
      date: Date.now(),
    }

    await addDoc(collectionRef, newValue)
    // update status of applier
    const docRef = doc(collection(db, 'appliers'), props.currentUser.applier_id)
    await updateDoc(docRef, {
      status_id: newValue.status_id,
    })
  } catch (error) {
    console.error('status adding error...')
  } finally {
    emit('closeStatusModal')
    isLoading.value = false
  }
}

const handleDescriptionFromChild = (description: string) => {
  comment.value.description = description
}
</script>
