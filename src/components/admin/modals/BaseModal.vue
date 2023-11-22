<template>
  <Suspense>
    <section
      @click="close"
      class="h-full bg-[#00000080] min-h-screen flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-50"
    >
      <div
        @click.stop
        class="container rounded-xl overflow-y-auto h-full bg-white relative mx-auto max-w-[620px] w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      >
        <div class="sticky top-0 z-50 flex items-center justify-between w-full px-10 py-5 mb-5 bg-white">
          <h1 class="text-4xl text-center">{{ modal_title }}</h1>
          <button @click="close" class="transition-all duration-300 text-tg-heading-font-color hover:opacity-80">
            <close-icon class="h-[18px]" />
          </button>
        </div>
        <div class="px-10">
          <slot></slot>
        </div>
        <div class="flex justify-end px-5 pb-5 mt-4">
          <base-button
            v-if="isUpdate"
            :size="ESize.SMALL"
            :theme="EThemes.GREEN"
            @click="update"
            type="button"
            :disabled="isDisabled"
          >
            Update
          </base-button>
          <base-button v-else @click="add" :size="ESize.SMALL" :disabled="isDisabled"> Add </base-button>
        </div>
      </div>
    </section>
  </Suspense>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { ESize, EThemes } from '@/types'
import { Vacancy } from '@/types'
import BaseButton from '@/components/reusables/BaseButton.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const db = useFirestore()
const props = defineProps(['oldValue', 'url', 'isDisabled', 'close', 'input', 'modal_title'])
const collectionRef = collection(db, props.url)
let docRef: any = null
const { close, updateList, addToList } = inject<any>('uiManager')
const isUpdate = !!props.input

const add = async () => {
  try {
    const newValue = {
      ...props.oldValue,
      date: Date.now(),
    }
    close()
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
  }
}

const update = async () => {
  try {
    close()
    updateList(props.oldValue)
    await updateDoc(docRef, {
      ...props.oldValue,
    })
  } catch (error) {
    console.error('Error updating data:', error)
  } finally {
  }
}

if (isUpdate) {
  docRef = doc(collection(db, props.url), props.oldValue.id)
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0;
}
</style>
