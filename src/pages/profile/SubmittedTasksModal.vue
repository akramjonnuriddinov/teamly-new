<template>
  <div class="modal-bg fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center" @click="emit('close')">
    <div class="min-w-[420px] rounded-xl bg-white px-8 py-10 text-tg-dark-blue-color" @click.stop>
      <h3 class="mb-6 text-center text-[24px] font-semibold">Add Your Tasks</h3>
      <label class="mb-6 flex flex-col justify-between gap-2">
        <span class="font-medium">Source:</span>
        <input
          v-model="source"
          type="text"
          placeholder="Add link for surce code"
          class="=w-full h-10 rounded-md border px-2 outline-none"
        />
      </label>
      <label class="mb-10 flex flex-col justify-between gap-2">
        <span class="font-medium">Live:</span>
        <input
          v-model="live"
          type="text"
          placeholder="Add link for live project"
          class="=w-full h-10 rounded-md border px-2 outline-none"
        />
      </label>
      <base-button
        :size="ESize.SMALL"
        :is-loading="isLoading"
        :disabled="disabled"
        class="mx-auto w-full"
        @click="saveTask"
        >Save</base-button
      >
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { ESize } from '@/types'
import { isDisabled } from '@/composables/isDisabled'
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
const props = defineProps(['input'])
const emit = defineEmits(['close'])
const source = ref(props.input.source || '')
const live = ref(props.input.live || '')
const isUpdate = !!props.input.source
const isLoading = ref(false)

const disabled = computed(() =>
  isDisabled({
    source: source.value,
    live: live.value,
  }),
)

const saveTask = async () => {
  const request = {
    source: correctSource(source.value),
    live: correctSource(live.value),
    vacancy: props.input.vacancy,
    user: props.input.user,
  }
  let response
  if (!isUpdate) {
    isLoading.value = true
    response = await addDoc(collection(db, 'submitted_tasks'), request)
    isLoading.value = false
    emit('close', {
      source: correctSource(source.value),
      live: correctSource(live.value),
      id: response.id,
    })
    update(response.id)
  } else {
    update(props.input.id, request)
    emit('close', {
      source: correctSource(source.value),
      live: correctSource(live.value),
      id: props.input.id,
    })
  }
}

const correctSource = (source) => {
  return source.includes('https://') || source.includes('http://') ? source : `https://www.${source}`
}

const update = (id, request) => {
  const body = request ? { ...request } : { id }
  updateDoc(doc(db, 'submitted_tasks', id), body)
}
</script>

<style scoped>
.modal-bg {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
