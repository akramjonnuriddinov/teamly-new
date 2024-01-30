<template>
    <div class="modal-bg fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center" @click="emit('close')">
        <div class="px-8 py-10 bg-white rounded-xl min-w-[420px] text-tg-dark-blue-color" @click.stop>
          <h3 class="text-[24px] font-semibold text-center mb-6">Add Your Tasks</h3>
          <label class="flex gap-2 flex-col justify-between mb-6">
            <span class="font-medium">Source:</span>
            <input v-model="source" type="text" placeholder="Add link for surce code" class="border =w-full px-2 h-10 rounded-md outline-none">
          </label>
          <label class="flex gap-2 flex-col justify-between mb-10">
            <span class="font-medium">Live:</span>
            <input v-model="live" type="text" placeholder="Add link for live project" class="border =w-full px-2 h-10 rounded-md outline-none">
          </label>
          <base-button :size="ESize.SMALL" :is-loading="isLoading" :disabled="disabled" class="mx-auto w-full" @click="saveTask">Save</base-button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { ESize } from '@/types';
import { isDisabled } from '@/composables/isDisabled';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
const props = defineProps(['input'])
const emit = defineEmits(['close'])
const source = ref(props.input.source || '')
const live = ref(props.input.live || '')
const isUpdate = !!props.input.source
const isLoading = ref(false)

const disabled = computed(() => isDisabled({
  source: source.value,
  live: live.value
}))


const saveTask = async () => {
  const request = {
    source: correctSource(source.value),
    live: correctSource(live.value),
    vacancy: props.input.vacancy,
    user: props.input.user
  }
  let response
  if (!isUpdate) {
    isLoading.value = true
    response = await addDoc(collection(db, 'submitted_tasks'), request)
    isLoading.value = false
    emit('close', {
      source: correctSource(source.value),
      live: correctSource(live.value),
      id: response.id
    })
    update(response.id)
  } else {
    update(props.input.id, request)
    emit('close', {
      source: correctSource(source.value),
      live: correctSource(live.value),
      id: props.input.id
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
  background-color: rgba(0,0,0,0.5);
}
</style>
