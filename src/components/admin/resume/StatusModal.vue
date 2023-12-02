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
                <select
                  v-model="comments.status"
                  class="w-[80%] p-2 mt-2 border border-gray-200 rounded-md outline-blue-300"
                  id="category"
                >
                  <option value="" disabled selected>Status</option>
                  <option class="flex items-center" v-for="status in statuses">
                    {{ status.status }}
                  </option>
                </select>
              </div>
              <div class="flex items-center justify-between w-full mt-2 mb-2">
                <label class="text-gray-700" for="text">Comment</label>
                <editor @input="handleCommentFromChild" :edit-editor="comments.comment" class="w-[80%]" />
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
import { addDoc, collection } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const collectionRef = collection(db, 'applayer_statuses')
const props = defineProps(['currentUser'])

const comments = ref<any>({
  status: 'initial',
  comment: '',
  applayer_id: '',
  vacancy_id: '',
  status_color: '',
  status_id: '',
})
const statuses = ref([
  {
    id: 'in_review',
    status: 'in review',
    defination: 'resume in review',
    color: 'yellow-400',
  },
  {
    id: 'reject',
    status: 'reject',
    defination: 'resume rejected',
    color: 'red-400',
  },
  {
    id: 'accept',
    status: 'accept',
    defination: 'resume accepted',
    color: 'green-400',
  },
  {
    id: 'online',
    status: 'online',
    defination: 'resume online',
    color: 'blue-400',
  },
  {
    id: 'offline',
    status: 'offline',
    defination: 'resume offline',
    color: 'gray-400',
  },
  {
    id: 'enhancement',
    status: 'enhancement',
    defination: 'resume enhancement',
    color: '[#a2eeef]',
  },
])

const add = async () => {
  try {
    const status_color = statuses.value.filter((item) => item.status === comments.value.status)
    console.log('status_color', status_color[0].color)
    comments.value.applayer_id = props.currentUser.applayer_id
    comments.value.vacancy_id = props.currentUser.vacancy_id
    comments.value.status_color = status_color[0].color

    const newValue = {
      ...comments.value,
      date: Date.now(),
    }
    const res = await addDoc(collectionRef, newValue)
    const optionVal = {
      ...newValue,
      id: res.id,
    }
    console.log(optionVal)
  } catch (error) {
    console.error('status adding error...')
  } finally {
    console.log('done')
  }
}

const handleCommentFromChild = (comment: string) => {
  comments.value.comment = comment
}
</script>
