<template>
  <section id="vacancies" class="relative z-10 pb-[45px] pt-[115px] max-[500px]:pt-[50px]">
    <div class="container relative mx-auto w-full px-5">
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
          class="service-item relative w-1/3 px-2.5 py-2.5 max-xl:w-1/2 max-[780px]:w-full"
          v-for="vacancy in vacancies"
          :key="vacancy.id"
        >
          <div></div>
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
            <p class="mb-12 line-clamp-2 text-[#5B5A78]">{{ vacancy.text }}</p>
            <ApplyButton :applied="!!vacancy.applied" :vacancy="vacancy.id" :isCard="true" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApplyButton from '@/components/ApplyButton.vue'
import { useAuthStore } from '@/store/auth'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/firebase'

const emit = defineEmits(['open'])
const store = useAuthStore()
const vacancies = ref()
const listLoading = ref(true)
const appliers = ref<any>([])

onMounted(async () => {
  listLoading.value = true
  await loadData()
  if (appliers.value) await fetchDataAndApply()
  listLoading.value = false
})

const loadData = async () => {
  const vacanciesQuery = query(collection(db, 'vacancies'), orderBy('date', 'desc'))
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

const fetchDataAndApply = async () => {
  try {
    vacancies.value = vacancies.value?.map((item: any) => ({
      ...item,
      applied: appliers.value.find((item2: any) => item2.vacancy_id === item.id),
    }))
  } catch (error) {
    console.error(error)
  }
}
</script>
