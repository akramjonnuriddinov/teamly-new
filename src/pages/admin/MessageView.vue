<template>
  <div class="flex h-screen w-full flex-col overflow-y-scroll p-8">
    <div>
      <h2 class="mb-10 text-3xl capitalize">Appliers</h2>
      <div v-if="!isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <ul>
        <template v-for="message in messages" :key="message">
          <li v-if="message.user" class="relative mb-5 flex flex-col">
            <div class="flex h-full items-center justify-between rounded-md border bg-gray-50 p-5">
              <span @click.stop class="mr-2 w-1/5">{{ message.fullname }}</span>
              <a @click.stop class="mr-2 w-1/6" :href="`mailto://${message.email}`">{{
                message.email || 'email undefined'
              }}</a>
              <a @click.stop class="mr-2 w-1/6" :href="`tel://${message.phone}`">{{ message.phone }}</a>
              <span @click.stop class="mr-2 w-1/5">{{ message.text }}</span>
              <div class="ml-auto flex space-x-5">
                <button @click.stop="removeMessage(message.id)" class="font-medium text-red-500 hover:opacity-80">
                  Remove
                </button>
              </div>
            </div>
          </li>
        </template>
        <div v-if="false" class="flex justify-center">
          <button-loader color="#7E54F8" width="50px" height="50px" />
        </div>
      </ul>
      <!-- <div v-else>Nothing found...</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import AppLoader from '@/components/AppLoader.vue'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import ButtonLoader from '@/components/ButtonLoader.vue'

const messages = ref<any>([])
const isLoading = ref(true)

onMounted(async () => {
  await loadData()
  isLoading.value = false
})

const loadData = async () => {
  const messageQuery = query(collection(db, 'message'), orderBy('date'))
  const messageSnapshot = await getDocs(messageQuery)

  messages.value = messageSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const removeMessage = async (id: string) => {
  await deleteDoc(doc(db, 'appliers', id))
  messages.value = messages.value.filter((item: any) => item.id !== id)
}
</script>
