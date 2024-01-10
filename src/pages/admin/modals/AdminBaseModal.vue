<template>
  <section
    @click="close"
    class="h-full bg-[#00000080] flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-50"
  >
    <div
      @click.stop
      class="container flex flex-col rounded-xl overflow-y-hidden h-full bg-white relative mx-auto max-w-[620px] w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div class="sticky top-0 z-50 flex items-center justify-between w-full px-10 py-5 mb-5 bg-white">
        <h1 class="text-4xl text-center">{{ modal_title }}</h1>
        <button @click="close" class="transition-all duration-300 text-tg-heading-font-color hover:opacity-80">
          <close-icon class="h-[18px]" />
        </button>
      </div>
      <div class="flex flex-col h-full pb-5 overflow-y-auto">
        <div class="px-10">
          <slot></slot>
        </div>
        <div class="flex justify-end px-10 pt-5 mt-auto">
          <base-button
            v-if="isUpdate"
            :is-loading="isLoading"
            :size="ESize.SMALL"
            :theme="EThemes.GREEN"
            @click="update"
            type="button"
            :disabled="disabled"
          >
            Update
          </base-button>
          <base-button v-else @click="add" :is-loading="isLoading" :size="ESize.SMALL" :disabled="disabled">
            Add
          </base-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, computed, ref } from 'vue'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { ESize, EThemes, Vacancy } from '@/types'
import BaseButton from '@/components/BaseButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { isDisabled } from '@/composables/isDisabled'

const props = defineProps(['oldValue', 'url', 'close', 'input', 'modal_title'])
const collectionRef = collection(db, props.url)
let docRef: any = null
const { close, updateList, addToList } = inject<any>('uiManager')
const isUpdate = !!props.input
const isLoading = ref(false)

const disabled = computed(() => {
  return isDisabled(props.oldValue)
})

const add = async () => {
  try {
    isLoading.value = true
    const newValue = {
      ...props.oldValue,
      date: Date.now(),
    }
    const res = await addDoc(collectionRef, newValue)
    const optionVal: Vacancy = {
      ...newValue,
      id: res.id,
    }
    if (optionVal) {
      addToList(optionVal)
    }
  } catch (error) {
    console.error('Error adding ...', error)
  } finally {
    isLoading.value = false
    close()
  }
}

if (isUpdate) {
  docRef = doc(collection(db, props.url), props.oldValue.id)
}

const update = async () => {
  try {
    isLoading.value = true
    updateList(props.oldValue)
    await updateDoc(docRef, {
      ...props.oldValue,
    })
  } catch (error) {
    console.error('Error updating data:', error)
  } finally {
    isLoading.value = false
    close()
  }
}
</script>