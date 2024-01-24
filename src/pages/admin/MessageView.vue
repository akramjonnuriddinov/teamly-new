<template>
  <div class="flex h-screen w-full flex-col overflow-y-scroll p-8">
    <div>
      <h2 class="mb-10 text-3xl capitalize">Messages</h2>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <ul v-else-if="messages.length">
        <template v-for="message in messages" :key="message">
          <li class="relative mb-5 flex flex-col">
            <div class="flex h-full items-center justify-between rounded-md bg-gray-50 p-5">
              <span @click.stop class="mr-2 w-1/5">{{ message.fullname }}</span>
              <a
                @click.stop
                class="mr-2 mr-2 w-[200px] overflow-hidden truncate whitespace-nowrap"
                :title="message.email"
                :href="`mailto://${message.email}`"
                >{{ message.email }}</a
              >
              <a @click.stop class="mr-2 w-1/6" :href="`tel://${message.phone}`">{{ message.phone }}</a>
              <span @click.stop class="mr-2 w-1/5 overflow-hidden truncate whitespace-nowrap">{{
                formatTimestampToLocaleString(message.date, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
              }}</span>
              <div class="ml-auto flex space-x-5">
                <button @click.stop="openText(message)" class="mr-2 font-medium text-tg-green hover:opacity-80">
                  {{ 'Show message' }}
                </button>
                <button @click.stop="removeMessage(message.id)" class="font-medium text-red-500 hover:opacity-80">
                  Remove
                </button>
              </div>
            </div>
          </li>
        </template>
      </ul>
      <div v-else>Nothing found...</div>
      <text-modal v-if="isShowText" :message="selectedText" @close="closeTextMdal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import AppLoader from '@/components/AppLoader.vue'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import TextModal from '@/pages/admin/TextModal.vue'
import { formatTimestampToLocaleString } from '@/composables/formatTimestampToLocaleString'

const messages = ref<any>([])
const isLoading = ref(true)
const isShowText = ref(false)
const selectedText = ref('')

onMounted(async () => {
  await loadData()
  isLoading.value = false
})

const loadData = async () => {
  const messageQuery = query(collection(db, 'messages'), orderBy('date', 'desc'))
  const messageSnapshot = await getDocs(messageQuery)

  messages.value = messageSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const openText = (text: any) => {
  isShowText.value = true
  selectedText.value = text
}

const closeTextMdal = () => (isShowText.value = false)

const removeMessage = async (id: string) => {
  await deleteDoc(doc(db, 'message', id))
  messages.value = messages.value.filter((item: any) => item.id !== id)
}
</script>
