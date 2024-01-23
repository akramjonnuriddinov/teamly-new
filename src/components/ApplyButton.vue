<template>
  <BaseButton
  :size="ESize.BIG"
  :disabled="!!isApplied"
  :color="color"
  :class="{ 'mt-auto': isCard }"
  :is-loading="isLoading"
  @click="apply"
  >
    <template v-if="!hasStatus && isApplied">
      <inline-svg class="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px]" fill="none" src="check.svg" />
    </template>
    <template v-else>
      <slot>
        Apply
      </slot>
    </template>
  </BaseButton>
  <ApplyModal v-if="isShow" @close="isShow = false" @add="applyByModal"/>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import InlineSvg from './InlineSvg.vue';
import ApplyModal from '@/pages/vacancy/ApplyModal.vue';
import { computed, ref, onUpdated, watch } from 'vue';
import { ESize } from '@/types'
import { useAuthStore } from '@/store/auth';
import { vacancyApply } from '@/composables/vacancyApply'
import { addDoc, doc, setDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'vue-router';
import { emit } from 'process';



const props = defineProps(['applied', 'vacancy', 'isCard', 'color'])
const emit = defineEmits(['applied'])
const store = useAuthStore()
const router = useRouter()
const isApplied = ref(props.applied)
const hasStatus = props.applied
const isLoading = ref(false)
const isShow = ref(false)

const color = computed(() => {
  if (props.color) {
    return props.color
  }
  return isApplied.value ? '#198754' : ''
})

watch(() =>props.applied, (value) => {
  isApplied.value = value
})

const apply = async () => {
  if (!store.user) {
    router.push('/sign-in')
    return
  }

  if (!store.resume) {
    isShow.value = true
    return
  }

  const collectionRef = collection(db, 'applier_statuses')
    isLoading.value = true
    const res = await vacancyApply(store.user.id, props.vacancy)
    isLoading.value = false
    emit('applied')
    isApplied.value = true
    const jobList = await addDoc(collectionRef, {
      applier_id: res.id,
      status_id: 'FaLdBSPRYE1qRkTZXug0',
      vacancy_id: props.vacancy,
      date: Date.now(),
    })

    const newDoc = doc(collectionRef, jobList.id)
    await setDoc(newDoc, {
      id: jobList.id,
      applier_id: res.id,
      status_id: 'FaLdBSPRYE1qRkTZXug0',
      vacancy_id: props.vacancy,
      date: Date.now(),
    })
}

const applyByModal = () => {
  isShow.value = false
  apply()
}

onUpdated(() => {
  isShow.value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})
</script>
