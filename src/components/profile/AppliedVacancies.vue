<template>
  <div class="pb-[135px]">
    <div class="mb-7">
      <h1 class="text-[20px] font-medium">Applied vacancies</h1>
      <p class="block mb-3 text-sm text-gray-400">All of your applied vacancies</p>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <div v-else>
        <div v-for="(vacancy, index) in vacancies" :key="vacancy.id" class="">
          <div class="shadow-job-inner mb-6 bg-white flex flex-col rounded-[32px] px-[35px] py-[50px]">
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
            <p class="text-[#5B5A78] mb-2">{{ vacancy.text }}</p>
            <div class="flex justify-end w-full">
              <button
                @click="toggleAccordion(index)"
                class="flex items-center text-tg-body-font-color hover:text-tg-indigo"
              >
                <inline-svg
                  :class="{ 'rotate-180': detailExpanded === index }"
                  class="h-4 mr-2 transition-transform duration-300"
                  src="fontawesome/arrow-down.svg"
                />
                <span class="text-sm">Show statuses</span>
              </button>
            </div>
            <user-status-detail
              :profile_status="true"
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
import { collection, where, query, getDocs, getDoc, doc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { fetchData } from '@/composables/fetchData'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
import UserStatusDetail from '@/components/profile/UserStatusDetail.vue'
import AppLoader from '@/components/static/AppLoader.vue'

const db = useFirestore()
const store = useAuthStore()
const vacancies = ref()
const detailExpanded = ref(null)
const appliers = ref<any>([])
const applierStatuses = ref([])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  appliers.value = await fetchData('appliers')
  appliers.value = appliers.value.filter((item: any) => item.user_id === store.user.id)
  applierStatuses.value = await fetchData('applier_statuses')
  applierStatuses.value = applierStatuses.value.filter((item1: any) =>
    appliers.value.some((item2: any) => item2.id === item1.applier_id),
  )

  const q = query(collection(db, 'appliers'), where('user_id', '==', store.user.id))
  try {
    const querySnapshot = await getDocs(q)
    const promises = querySnapshot.docs.map(async (applier) => {
      const vacancy_id = applier.data().vacancy_id
      const docRef = doc(db, 'vacancies', vacancy_id)
      const vacancySnapshot = await getDoc(docRef)
      if (vacancySnapshot.exists()) {
        return { ...vacancySnapshot.data(), id: vacancy_id }
      } else {
        console.log('Vacancy does not exist')
        return null
      }
    })
    vacancies.value = await Promise.all(promises)
  } catch (error) {
    console.error('Error fetching appliers:', error)
  } finally {
    isLoading.value = false
  }
})

const toggleAccordion = (value: any) => {
  detailExpanded.value = detailExpanded.value === value ? null : value
}
</script>
