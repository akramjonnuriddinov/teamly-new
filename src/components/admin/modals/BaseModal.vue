<template>
  <Suspense>
    <section
      @click="close"
      class="h-full bg-[#00000080] min-h-screen flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-50"
    >
      <div
        @click.stop
        class="container overflow-y-auto h-full bg-white relative px-5 rounded-xl p-5 mx-auto max-w-[600px] w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      >
        <h1 class="mb-5 text-4xl text-center">{{ modal_title }}</h1>
        <slot></slot>
        <div class="flex justify-end mt-4">
          <base-button
            v-if="isUpdate"
            :size="ESize.SMALL"
            :theme="EThemes.GREEN"
            @click="update"
            type="button"
            :disabled="isDisabled"
            class="max-[990px]:mt-5 mr-5"
          >
            Update
          </base-button>
          <base-button v-else @click="add" :size="ESize.SMALL" :disabled="isDisabled" class="max-[990px]:mt-5">
            Add
          </base-button>
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

const db = useFirestore()
const close: any = inject('close')
const addToList = inject<Vacancy | any>('addToList')
const updateList = inject<Vacancy | any>('updateList')
const isLoadingFalse = inject<any>('isLoadingFalse')
const props = defineProps(['oldValue', 'url', 'isDisabled', 'close', 'input', 'modal_title'])
const collectionRef = collection(db, props.url)

// ***ADD ITEM
const add = async () => {
  try {
    console.log('added ...')
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
    console.log('done...')
    isLoadingFalse()
  }
}

// ***UPDATE ITEM
let docRef: any = null

const update = async () => {
  try {
    close()
    updateList(props.oldValue)
    console.log('updating...')
    await updateDoc(docRef, {
      ...props.oldValue,
    })
  } catch (error) {
    console.error('Error updating data:', error)
  } finally {
    console.log('updated...')
  }
}

const isUpdate = !!props.input
if (isUpdate) {
  docRef = doc(collection(db, props.url), props.oldValue.id)
}
</script>
