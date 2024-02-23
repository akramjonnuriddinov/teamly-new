<template>
  <section class="fixed left-0 top-0 z-50 flex h-full w-[100vw] items-start justify-center bg-[#00000080] p-10">
    <div
      @click.stop
      class="container relative mx-auto flex h-full w-full max-w-full flex-col overflow-y-hidden rounded-xl bg-white"
    >
      <div class="sticky top-0 z-50 mb-5 flex w-full items-center justify-between bg-white px-10 py-5">
        <h1 class="text-center text-4xl">{{ modal_title }}</h1>
        <button @click="close" class="text-tg-heading-font-color transition-all duration-300 hover:opacity-80">
          <inline-svg class="h-[18px]" src="svg/close.svg" />
        </button>
      </div>
      <div class="flex h-full flex-col overflow-y-auto pb-5">
        <div class="h-full px-10">
          <slot></slot>
        </div>
        <div class="mt-auto flex justify-end px-10 pt-5">
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
import { addDoc, collection, updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { ESize, EThemes, Vacancy } from '@/types'
import BaseButton from '@/components/BaseButton.vue'
import InlineSvg from '@/components/InlineSvg.vue'
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

    const newDoc = doc(collectionRef, res.id)
    await setDoc(newDoc, {
      ...newValue,
      id: res.id,
    })

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
      date: Date.now(),
    })
  } catch (error) {
    console.error('Error updating data:', error)
  } finally {
    isLoading.value = false
    close()
  }
}
</script>
