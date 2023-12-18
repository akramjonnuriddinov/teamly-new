<template>
  <section id="vacancies" class="pt-[115px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <ul v-if="listLoading" class="flex flex-wrap justify-start">
        <li
          class="w-1/3 px-2.5 py-2.5 service-item max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="vacancy in 4"
          :key="vacancy"
        >
          <div class="shadow-job-inner bg-white flex flex-col h-full rounded-[32px] px-[35px] py-[50px]">
            <span class="mb-5"><Skeleton width="100%" height="24px" :theme="ESkeletonTheme.LIGHT" /></span>
            <div
              class="text-3xl font-bold text-[#1C1C37] leading-[1.2em] mb-7 transition-all duration-300 hover:text-tg-secondary-color"
            >
              <Skeleton width="100%" height="72px" :theme="ESkeletonTheme.LIGHT" />
            </div>
            <div class="text-tg-primary-color tracking-[-0.3px] font-bold flex items-center gap-3 mb-5">
              <Skeleton width="70px" height="24px" :theme="ESkeletonTheme.LIGHT" />
              <Skeleton width="8px" height="8px" :theme="ESkeletonTheme.LIGHT" />
              <Skeleton width="116px" height="24px" :theme="ESkeletonTheme.LIGHT" />
            </div>
            <p class="mb-12"><Skeleton width="100%" height="24px" :theme="ESkeletonTheme.LIGHT" /></p>
            <Skeleton width="100%" height="60px" :theme="ESkeletonTheme.LIGHT" />
          </div>
        </li>
      </ul>
      <ul v-else class="flex flex-wrap justify-start">
        <li
          class="w-1/3 px-2.5 py-2.5 service-item max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="vacancy in vacancies"
          :key="vacancy.id"
        >
          <div class="shadow-job-inner bg-white flex flex-col h-full rounded-[32px] px-[35px] py-[50px]">
            <span class="text-[#5B5A78] mb-5">{{ vacancy.location }}</span>
            <router-link
              :to="{
                name: 'vacancyDetail',
                params: {
                  id: vacancy.id,
                },
              }"
              class="text-3xl font-bold text-[#1C1C37] leading-[1.2em] mb-7 transition-all duration-300 hover:text-tg-secondary-color"
            >
              {{ vacancy.title }}
            </router-link>
            <div class="text-tg-primary-color tracking-[-0.3px] font-bold flex items-center gap-3 mb-5">
              <span>{{ vacancy.category }}</span>
              <span class="block w-2 h-2 rounded-full bg-tg-primary-color"></span>
              <span>{{ vacancy.time }}</span>
            </div>
            <p class="text-[#5B5A78] mb-12">{{ vacancy.text }}</p>
            <base-button
              :color="getColor(vacancy.applied)"
              :disabled="vacancy.applied"
              :size="ESize.BIG"
              :is-loading="isLoading == vacancy.id"
              @click="handleApply(vacancy.id)"
              class="mt-auto"
            >
              <template v-if="vacancy.applied">
                <inline-svg fill="none" src="check.svg" />
              </template>
              <template v-else> Apply </template>
            </base-button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import InlineSvg from '@/components/reusables/InlineSvg.vue'
import { ref, watch } from 'vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { useAuthStore } from '@/store/auth'
import { ESize } from '@/types'
import { useRouter } from 'vue-router'
import { fetchData } from '@/composables/fetchData'
import { collection, where, query, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { vacancyApply } from '@/composables/vacancyApply'
import Skeleton, { ESkeletonTheme } from '@/components/skeleton/Skeleton.vue'

const props = defineProps(['vacancyId'])
const db = useFirestore()
const emit = defineEmits(['open'])
const vacancies = ref()
const store = useAuthStore()
const user = ref({ ...store.user })
const isLoading = ref(null)
const listLoading = ref(true)

const router = useRouter()
const handleApply = async (id: any) => {
  if (!store.user) {
    router.push('/sign-in')
    return
  }

  if (store.resume) {
    isLoading.value = id
    await vacancyApply(store.user.id, id)
    currentApply(id)
    isLoading.value = null
  } else {
    emit('open', id)
  }
}
const currentApply = (id: string) => {
  const appliedVacancy = vacancies.value.find((vacancy: any) => vacancy.id === id)
  if (appliedVacancy) {
    appliedVacancy.applied = true
    vacancies.value = vacancies.value.map((vacancy: any) =>
      vacancy.id === appliedVacancy.id ? appliedVacancy : vacancy,
    )
  }
}

const fetchDataAndApply = async () => {
  if (props.vacancyId) {
    currentApply(props.vacancyId)
  } else {
    try {
      const result = await fetchData('vacancies', false)
      vacancies.value = result

      const q = query(collection(db, 'appliers'), where('user_id', '==', user.value.id))
      const querySnapshot = await getDocs(q)

      querySnapshot.docs.forEach((applier) => {
        const vacancy_id = applier.data().vacancy_id
        const index = vacancies.value.findIndex((vacancy: any) => vacancy.id === vacancy_id)

        if (index !== -1) {
          vacancies.value[index] = { ...vacancies.value[index], applied: true }
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      listLoading.value = false
    }
  }
}

watch(
  () => store.user,
  async (newValue) => {
    user.value = { ...newValue }
    await fetchDataAndApply()
  },
  {
    immediate: true,
  },
)

const getColor = (isApplied: string) => {
  return isApplied ? '#198754' : ''
}
</script>
