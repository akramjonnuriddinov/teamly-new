<template>
  <div class="pb-[135px]">
    <div class="mb-7">
      <h1 class="text-[20px] font-medium">Applied vacancies</h1>
      <p class="mb-3 block text-sm text-gray-400">All of your applied vacancies</p>
      <div v-if="isLoading">
        <div v-for="vacancy in 4" :key="vacancy" class="">
          <div
            class="mb-6 flex flex-col rounded-[32px] bg-white px-[35px] py-[50px] shadow-job-inner max-[990px]:rounded-[15px] max-[990px]:p-6"
          >
            <span class="mb-5"><Skeleton width="100%" height="24px" :theme="ESkeletonTheme.LIGHT" /></span>
            <div
              class="mb-7 text-3xl font-bold leading-[1.2em] text-[#1C1C37] transition-all duration-300 hover:text-tg-secondary-color max-[990px]:mb-3 max-[990px]:text-[22px]"
            >
              <Skeleton width="100%" height="72px" :theme="ESkeletonTheme.LIGHT" />
            </div>
            <div class="mb-5 flex items-center gap-3 font-bold tracking-[-0.3px] text-tg-primary-color">
              <Skeleton width="70px" height="24px" :theme="ESkeletonTheme.LIGHT" />
              <Skeleton width="8px" height="8px" :theme="ESkeletonTheme.LIGHT" />
              <Skeleton width="116px" height="24px" :theme="ESkeletonTheme.LIGHT" />
            </div>
            <p><Skeleton width="100%" height="24px" :theme="ESkeletonTheme.LIGHT" /></p>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(vacancy, index) in vacancies" :key="vacancy.id" class="">
          <div
            class="mb-6 flex flex-col rounded-[32px] bg-white px-[35px] py-[50px] shadow-job-inner max-[990px]:rounded-[15px] max-[990px]:p-6"
          >
            <span class="mb-5 text-[#5B5A78]">{{ vacancy.location }}</span>
            <router-link
              :to="{
                name: 'vacancyDetail',
                params: {
                  id: vacancy.id,
                },
              }"
              class="mb-7 text-3xl font-bold leading-[1.2em] text-[#1C1C37] transition-all duration-300 hover:text-tg-secondary-color max-[990px]:mb-3 max-[990px]:text-[22px]"
            >
              {{ vacancy.title }}
            </router-link>
            <div class="mb-5 flex items-center gap-3 font-bold tracking-[-0.3px] text-tg-primary-color">
              <span>{{ vacancy.category }}</span>
              <span class="block h-2 w-2 rounded-full bg-tg-primary-color"></span>
              <span>{{ vacancy.time }}</span>
            </div>
            <p class="mb-2 text-[#5B5A78] max-[990px]:mb-4">{{ vacancy.text }}</p>
            <div class="flex w-full justify-end">
              <button
                @click="toggleAccordion(index)"
                class="flex items-center text-tg-body-font-color hover:text-tg-indigo"
              >
                <inline-svg
                  :class="{ 'rotate-180': detailExpanded === index }"
                  class="mr-2 h-4 transition-transform duration-300"
                  src="fontawesome/arrow-down.svg"
                />
                <span class="text-sm">Show statuses</span>
              </button>
            </div>
            <user-status-detail
              v-if="isApplierStatusesReady"
              :commentLoading="commentLoading"
              :vacancy_id="vacancy.id"
              :applierStatuses="applierStatuses"
              :expanded="detailExpanded === index"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { fetchData } from '@/composables/fetchData'
import InlineSvg from '@/components/InlineSvg.vue'
import UserStatusDetail from '@/pages/profile/UserStatusDetail.vue'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { useAllVacanciesStore } from '@/store/allVacancies'
import { useAppliersStore } from '@/store/appliers'

const store = useAuthStore()
const vacanciesStore = useAllVacanciesStore()
const appliersStore = useAppliersStore()
const vacancies = ref()
const detailExpanded = ref(null)
const appliers = ref<any>([])
const applierStatuses = ref<any>([])
const isLoading = ref(true)
const commentLoading = ref(true)
const isApplierStatusesReady = ref(false)

function filterByVacancyId(arr1: [], arr2: []) {
  return arr1.flatMap((item1: any) => arr2.filter((item2: any) => item1.vacancy_id === item2.id))
}
onMounted(async () => {
  isLoading.value = true
  await vacanciesStore.fetchVacancy()
  await appliersStore.fetchAppliers()
  appliers.value = appliersStore.appliers
  appliers.value = appliers.value.filter((item: any) => item.user_id === store.user.id)
  vacancies.value = vacanciesStore.vacancies
  vacancies.value = filterByVacancyId(appliers.value, vacanciesStore.vacancies)
  isLoading.value = false
})

const loadApplierStatuses = async () => {
  commentLoading.value = true
  applierStatuses.value = await fetchData('applier_statuses')
  applierStatuses.value = applierStatuses.value.filter((applierStatus: any) =>
    appliers.value.some((applier: any) => applier.id === applierStatus.applier_id),
  )
  isApplierStatusesReady.value = true
  commentLoading.value = false
}

const toggleAccordion = (value: any) => {
  loadApplierStatuses()
  detailExpanded.value = detailExpanded.value === value ? null : value
}
</script>
