<template>
  <BaseButton
  :size="ESize.BIG"
  :disabled="!!isApplied"
  :color="color"
  class="mt-auto"
  :is-loading="isLoading"
  @click="apply"
  >
  <template v-if="isApplied">
    <inline-svg class="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px]" fill="none" src="check.svg" />
  </template>
  <template v-else>
    Apply
  </template>
  </BaseButton>
  <ApplyModal v-if="isShow" :vacancyId="vacancy" @close="isShow = false"/>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import InlineSvg from './InlineSvg.vue';
import ApplyModal from '@/pages/vacancy/ApplyModal.vue';
import { computed, ref } from 'vue';
import { ESize } from '@/types'
import { useAuthStore } from '@/store/auth';
import { vacancyApply } from '@/composables/vacancyApply'
import { addDoc, doc, setDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'vue-router';



const props = defineProps(['applied', 'vacancy'])
const store = useAuthStore()
const router = useRouter()
const isApplied = ref(props.applied)
const isLoading = ref(false)
const isShow = ref(false)

const color = computed(() => isApplied.value ? '#198754' : '')
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
</script>

<style>

</style>
