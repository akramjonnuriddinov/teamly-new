<template>
  <section
    @click="$emit('closeStatusModal')"
    class="h-full bg-[#00000080] min-h-screen flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-50"
  >
    <div
      @click.stop
      class="container rounded-xl overflow-y-hidden h-full bg-white relative mx-auto max-w-[620px] w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div class="sticky top-0 z-50 flex items-center justify-between w-full px-10 py-5 mb-5 bg-white">
        <h1 class="text-4xl text-center">Status</h1>
        <button class="transition-all duration-300 text-tg-heading-font-color hover:opacity-80">
          <close-icon @click="$emit('closeStatusModal')" class="h-[18px]" />
        </button>
      </div>
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
                    <option class="flex items-center" :value="status.id" v-for="status in statuses">
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
          <base-button @click="add" :size="ESize.SMALL" type="button"> Add </base-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Editor from '@/components/reusables/Editor.vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize } from '@/types'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const collectionRef = collection(db, 'applier_statuses')
const props = defineProps(['currentUser', 'statuses'])

const comment = ref<any>({
  status_id: '',
  description: '',
  color: '#cccccc',
})

const add = async () => {
  try {
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
  }
}

const handleDescriptionFromChild = (description: string) => {
  comment.value.description = description
}
</script>
