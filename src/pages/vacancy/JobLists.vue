<template>
  <section id="vacancies" class="relative z-10 mb-[100px] pb-[45px] pt-[115px]">
    <div class="container relative mx-auto w-full max-w-7xl px-5">
      <ul v-if="listLoading" class="flex flex-wrap justify-start">
        <li
          class="service-item w-1/3 px-2.5 py-2.5 max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="vacancy in 4"
          :key="vacancy"
        >
          <div class="flex h-full flex-col rounded-[32px] bg-white px-[35px] py-[50px] shadow-job-inner">
            <span class="mb-5"><Skeleton width="100%" height="24px" :theme="ESkeletonTheme.LIGHT" /></span>
            <div
              class="mb-7 text-3xl font-bold leading-[1.2em] text-[#1C1C37] transition-all duration-300 hover:text-tg-secondary-color"
            >
              <Skeleton width="100%" height="72px" :theme="ESkeletonTheme.LIGHT" />
            </div>
            <div class="mb-5 flex items-center gap-3 font-bold tracking-[-0.3px] text-tg-primary-color">
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
          class="service-item w-1/3 px-2.5 py-2.5 max-[1050px]:w-1/2 max-[710px]:w-full"
          v-for="vacancy in vacancies"
          :key="vacancy.id"
        >
          <div class="flex h-full flex-col rounded-[32px] bg-white px-[35px] py-[50px] shadow-job-inner">
            <span class="mb-5 text-[#5B5A78]">{{ vacancy.location }}</span>
            <router-link
              :to="{
                name: 'vacancyDetail',
                params: {
                  id: vacancy.id,
                },
              }"
              class="mb-7 text-3xl font-bold leading-[1.2em] text-[#1C1C37] transition-all duration-300 hover:text-tg-secondary-color"
            >
              {{ vacancy.title }}
            </router-link>
            <div class="mb-5 flex items-center gap-3 font-bold tracking-[-0.3px] text-tg-primary-color">
              <span>{{ vacancy.category }}</span>
              <span class="block h-2 w-2 rounded-full bg-tg-primary-color"></span>
              <span>{{ vacancy.time }}</span>
            </div>
            <p class="mb-12 text-[#5B5A78]">{{ vacancy.text }}</p>
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
import InlineSvg from '@/components/InlineSvg.vue'
import { onMounted, ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useAuthStore } from '@/store/auth'
import { ESize } from '@/types'
import { useRouter } from 'vue-router'
import { vacancyApply } from '@/composables/vacancyApply'
import { useAllVacanciesStore } from '@/store/allVacancies'
import { useAppliersStore } from '@/store/appliers'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'

const props = defineProps(['vacancyId'])

const emit = defineEmits(['open'])
const vacancies = ref()
const store = useAuthStore()
const vacanciesStore = useAllVacanciesStore()
const appliersStore = useAppliersStore()
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
      await vacanciesStore.fetchVacancy()
      vacancies.value = vacanciesStore.vacancies

      if (!appliersStore.appliers) await appliersStore.fetchAppliers()

      vacancies.value = vacancies.value.map((item: any) => ({
        ...item,
        applied: appliersStore.appliers?.find((item2: any) => item2.vacancy_id === item.id),
      }))
    } catch (error) {
      console.error(error)
    } finally {
      listLoading.value = false
    }
  }
}

onMounted(() => {
  fetchDataAndApply()
})
watch(
  () => store.user,
  (newValue) => {
    user.value = { ...newValue }
    if (newValue && newValue.id) {
      fetchDataAndApply()
    }
  },
  {
    immediate: true,
  },
)

const getColor = (isApplied: string) => {
  return isApplied ? '#198754' : ''
}
</script>
