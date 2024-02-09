<template>
  <div class="flex h-screen w-full flex-col overflow-y-scroll p-8">
    <h2 class="mb-10 text-3xl capitalize">{{ title }}</h2>
    <div>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <div v-else-if="dataEntries?.length">
        <div
          class="mb-5 flex items-center justify-between rounded-md bg-gray-50 p-5"
          v-for="item in dataEntries"
          :key="item.id"
        >
          <component
            :is="hasInnerPage ? 'router-link' : 'span'"
            :to="{
              name: 'resume',
              query: {
                id: item.id,
              },
            }"
          >
            {{ item.title }}
          </component>
          <div class="flex gap-4">
            <button @click="editOption(item)" class="text-blue-500 hover:text-blue-700">Edit</button>
            <button
              @click="removeItem(item.id)"
              :disabled="removeDisabled"
              class="text-red-500 hover:text-red-700 disabled:cursor-not-allowed disabled:text-gray-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div v-else>Nothing found...</div>
    </div>
    <div class="flex justify-end">
      <base-button class="mt-12" @click="createModal" :size="ESize.SMALL"> Create </base-button>
    </div>
  </div>
  <component :is="currentModal" v-if="isShow" :input="selectedItem" :action="addToList" />
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import BaseButton from '@/components/BaseButton.vue'
import { ESize } from '@/types'
import { provide } from 'vue'
import { UiManager } from '@/types'
import AppLoader from '@/components/AppLoader.vue'
import { fetchData } from '@/composables/fetchData'

const props = defineProps<{
  title: string
  hasInnerPage: Boolean
}>()
const dataEntries = ref<any>([])
const currentModal = ref(null)
const isShow = ref<Boolean>(false)
const isLoading = ref(true)
const removeDisabled = ref(false)

watch(
  () => props.title,
  async (value) => {
    isLoading.value = true
    dataEntries.value = await fetchData(value)
    currentModal.value = defineAsyncComponent(() => import(`./modals/${props.title}.vue`))
    isLoading.value = false
  },
  {
    immediate: true,
  },
)

const selectedItem = ref<any>(null)
const editOption = (item: any) => {
  selectedItem.value = item
  isShow.value = true
}

const removeItem = async (id: any) => {
  removeDisabled.value = true
  await deleteDoc(doc(db, props.title, id))
  dataEntries.value = dataEntries.value.filter((item: any) => item.id != id)
  removeDisabled.value = false
}

const createModal = () => {
  isShow.value = true
  selectedItem.value = null
}

const close = () => (isShow.value = false)
const addToList = (item: any) => dataEntries.value?.push(item)
const updateList = (item: any) => {
  const indexToUpdate = dataEntries.value.findIndex((item: any) => item.id === item.id)
  if (indexToUpdate !== -1) {
    dataEntries.value[indexToUpdate] = item
  }
}

const uiManager: UiManager = {
  close,
  addToList: addToList,
  updateList: updateList,
}

provide('uiManager', uiManager)
</script>
