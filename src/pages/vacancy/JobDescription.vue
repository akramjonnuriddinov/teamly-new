<template>
  <section class="relative z-10 mb-[100px] pb-[45px] pt-[50px]">
    <div v-if="listLoading" class="container relative mx-auto w-full max-w-7xl px-5">
      <div class="description"><Skeleton width="100%" height="100vh" :theme="ESkeletonTheme.LIGHT" /></div>
      <div class="mt-12">
        <Skeleton width="314px" height="60px" :theme="ESkeletonTheme.LIGHT" />
      </div>
    </div>
    <div v-else class="container relative mx-auto w-full max-w-7xl px-5">
      <div class="description" v-html="vacancy.description"></div>
      <base-button
        :size="ESize.BIG"
        class="mt-12"
        :is-loading="isLoading"
        :disabled="!curButton"
        @click="curButton ? handleApply(vacancy.id) : ''"
        :color="curButton ? '#7e54f8 ' : status ? status.color : storeVacancies.statusDefault.color"
      >
        {{ curButton ? 'Apply' : status ? status.title : storeVacancies.statusDefault.title }}
      </base-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useVacanciesStore } from '@/store/vacancies'
import { useRouter } from 'vue-router'
import { vacancyApply } from '@/composables/vacancyApply'
import { ESize } from '@/types'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const collectionRef = collection(db, 'applier_statuses')
const curButton = computed(() => !props.vacancy?.status_id && !storeVacancies.applicationSent)
const props = defineProps(['vacancy'])
const emit = defineEmits(['open'])
const storeVacancies = useVacanciesStore()
const store = useAuthStore()
const isLoading = ref(false)
const listLoading = ref(true)
const router = useRouter()
const status = computed(() => storeVacancies.status)

onMounted(async () => {
  if (!props.vacancy?.status_id) {
    storeVacancies.updateApplicationSent(false)
  }
  if (store.user) await storeVacancies.fetchStatus(props.vacancy?.status_id)
  listLoading.value = false
})

const handleApply = async (id: any) => {
  if (!store.user) {
    router.push('/sign-in')
    return
  }

  if (store.resume && !storeVacancies.applicationSent) {
    isLoading.value = true
    const res = await vacancyApply(store.user.id, id)
    isLoading.value = false
    storeVacancies.updateApplicationSent(true)
    const job = await addDoc(collectionRef, {
      applier_id: res.id,
      status_id: 'FaLdBSPRYE1qRkTZXug0',
      vacancy_id: id,
      date: Date.now(),
    })
    const newDoc = doc(collectionRef, job.id)
    await setDoc(newDoc, {
      id: job.id,
      applier_id: res.id,
      status_id: 'FaLdBSPRYE1qRkTZXug0',
      vacancy_id: id,
      date: Date.now(),
    })
  } else {
    emit('open', id)
  }
}
</script>

<style>
.description li {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.description li::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #7e54f8;
  margin-right: 4px;
}

.description h1,
.description h2,
.description h3 {
  @apply mb-5 mt-10 text-xl font-semibold text-[#1C1C37];
}
</style>
