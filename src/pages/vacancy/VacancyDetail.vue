<template>
  <div>
    <template v-if="vacancy && Object.keys(vacancy).length > 0">
      <vacancy-detail-banner @open="isOpen" :vacancy="vacancy" />
      <job-description @open="isOpen" :vacancy="vacancy" />
    </template>
    <template v-else>
      <section class="vacancy-detail mt-[86px] bg-[#F9F9FA]">
        <div
          class="container relative mx-auto max-w-7xl px-5 max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
        >
          <div
            class="relative flex w-full items-center justify-between pb-[60px] pt-[100px] max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
          >
            <div class="flex max-w-[750px] flex-col">
              <span class="mb-5 text-[#5B5A78]">
                <Skeleton width="200px" height="24px" :theme="ESkeletonTheme.DARK" />
              </span>
              <div class="mb-4">
                <Skeleton width="350px" height="168px" :theme="ESkeletonTheme.DARK" />
              </div>
              <div class="mb-5 flex items-center gap-3 font-bold tracking-[-0.3px] text-tg-primary-color">
                <Skeleton width="70px" height="24px" :theme="ESkeletonTheme.DARK" />
                <Skeleton width="8px" height="8px" :theme="ESkeletonTheme.DARK" />
                <Skeleton width="116px" height="24px" :theme="ESkeletonTheme.DARK" />
              </div>
            </div>
            <div class="mt-12">
              <Skeleton width="314px" height="60px" :theme="ESkeletonTheme.DARK" />
            </div>
          </div>
        </div>
      </section>
      <section class="relative z-10 mb-[100px] pb-[45px] pt-[50px]">
        <div class="container relative mx-auto w-full max-w-7xl px-5">
          <div class="description"><Skeleton width="100%" height="100vh" :theme="ESkeletonTheme.LIGHT" /></div>
          <div class="mt-12">
            <Skeleton width="314px" height="60px" :theme="ESkeletonTheme.LIGHT" />
          </div>
        </div>
      </section>
    </template>
  </div>
  <apply-modal v-if="isShow" @close="isShow = false" :vacancy-id="vacancyId" />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ApplyModal from '@/pages/vacancy/ApplyModal.vue'
import VacancyDetailBanner from '@/pages/vacancy/VacancyDetailBanner.vue'
import JobDescription from '@/pages/vacancy/JobDescription.vue'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { useAuthStore } from '@/store/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const route = useRoute()
const store = useAuthStore()
const isShow = ref(false)
const vacancy = ref<any>(null)
const vacancyId = ref<string | undefined>('')
const user = computed(() => store.user)
const appliers = ref<any>([])
const vacancies = ref<any>([])

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  const vacanciesQuery = query(collection(db, 'vacancies'), where('id', '==', route.params.id))
  const vacanciesSnapshot = await getDocs(vacanciesQuery)

  if (store.user) {
    const appliersQuery = query(collection(db, 'appliers'), where('user_id', '==', store.user.id))
    const appliersSnapshot = await getDocs(appliersQuery)
    appliers.value = appliersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  }

  vacancies.value = vacanciesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const fetchVacancy = async () => {
  try {
    if (user.value?.id) {
      const vacancyIds = await appliers.value.map((item: any) => item.vacancy_id)

      vacancy.value = {
        ...vacancies.value[0],
        status_id: vacancyIds.includes(route.params.id)
          ? appliers.value[vacancyIds.findIndex((item: any) => item === route.params.id)].status_id
          : null,
      }
    } else {
      vacancy.value = vacancies.value[0]
    }
  } catch (error) {
    console.error('Error fetching appliers:', error)
  }
}

const isOpen = (id: any) => {
  vacancyId.value = id
  isShow.value = true
}

watch(
  () => store.user,
  async () => {
    await loadData()
    await fetchVacancy()
  },
  {
    immediate: true,
  },
)
</script>
