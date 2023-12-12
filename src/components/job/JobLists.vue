<template>
  <section id="vacancies" class="pt-[115px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <ul class="flex flex-wrap justify-start">
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
import { onMounted, ref, watch } from 'vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { useAuthStore } from '@/store/auth'
import { ESize } from '@/types'
import { useRouter } from 'vue-router'
import { fetchData } from '@/composables/fetchData'
import { collection, where, query, getDocs } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { vacancyApply } from '@/composables/vacancyApply'
import { toggleLoader } from '@/composables/loader'

const props = defineProps(['vacancyId'])
const db = useFirestore()
const emit = defineEmits(['open'])
const vacancies = ref()
const store = useAuthStore()
const user = ref({ ...store.user })
const isLoading = ref(null)

const router = useRouter()
const handleApply = async (id: any) => {
  if (!store.user) {
    router.push('/login')
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
      toggleLoader(true)
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
      toggleLoader()
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
