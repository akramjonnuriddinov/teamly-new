<template>
  <div>
    <template v-if="vacancy && Object.keys(vacancy).length > 0 && !isLoading">
      <vacancy-detail-banner :vacancy="vacancy">
        <ApplyButton
          :applied="vacancy.status_id"
          :vacancy="vacancy.id"
          :color="status?.color"
          @applied="vacancy.status_id = 'aplied'"
        >
          <template v-if="vacancy.status_id">
              {{ status?.title }}
          </template>
        </ApplyButton>
      </vacancy-detail-banner>
      <job-description :vacancy="vacancy">
        <ApplyButton
          :applied="vacancy.status_id"
          :vacancy="vacancy.id"
          :color="status?.color"
          @applied="vacancy.status_id = 'aplied'"
        >
          <template v-if="vacancy.status_id">
              {{ status?.title }}
          </template>
        </ApplyButton>
      </job-description>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ApplyButton from '@/components/ApplyButton.vue'
import VacancyDetailBanner from '@/pages/vacancy/VacancyDetailBanner.vue'
import JobDescription from '@/pages/vacancy/JobDescription.vue'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { useAuthStore } from '@/store/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const route = useRoute()
const store = useAuthStore()
const status = ref<any>(null)
const vacancy = ref<any>(null)
const appliers = ref<any>([])
const vacancies = ref<any>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await loadData()
  if (vacancy.value.status_id) {
    await fetchStatus(vacancy.value.status_id)
  }
  isLoading.value = false
})

const loadData = async () => {
  const vacanciesQuery = query(collection(db, 'vacancies'), where('id', '==', route.params.id))
  const vacanciesSnapshot = await getDocs(vacanciesQuery)
  vacancies.value = vacanciesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  if (store.user) {
    // Check status only for authorized users
    const appliersQuery = query(collection(db, 'appliers'), where('user_id', '==', store.user.id))
    const appliersSnapshot = await getDocs(appliersQuery)
    appliers.value = appliersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    const vacancyIds = appliers.value.map((item: any) => item.vacancy_id)
    vacancy.value = {
      ...vacancies.value[0],
      status_id: vacancyIds.includes(route.params.id)
        ? appliers.value[vacancyIds.findIndex((item: any) => item === route.params.id)].status_id
        : null,
    }
  } else {
    vacancy.value = vacancies.value[0]
  }
}

const fetchStatus = async (id: string) => {
  const statusQuery = query(collection(db, 'statuses'), where('id', '==', id))
  const statusSnapShot = await getDocs(statusQuery)
  status.value = statusSnapShot.docs[0].data()
}

</script>
