<template>
  <div>
    <vacancy-detail-banner @open="isOpen"  :vacancy="vacancy"  />
    <job-description @open="isOpen"  :vacancy="vacancy"  />
  </div>
  <apply-modal v-if="isShow" @close="isShow = false" :vacancyId="vacancy_id" />
</template>

<script setup lang="ts">
import ApplyModal from '@/components/ApplyModal.vue'
import VacancyDetailBanner from '@/components/vacancy/VacancyDetailBanner.vue'
import JobDescription from '@/components/job/JobDescription.vue'
import { onMounted, ref } from 'vue'
import { useFirestore } from 'vuefire'
import { useRoute } from 'vue-router'
import { collection, query, getDocs } from 'firebase/firestore'
import { toggleLoader } from '@/composables/loader'

const route = useRoute()
const db = useFirestore()
const isShow = ref(false)
const vacancy = ref({})
const vacancy_id = ref<string | undefined>('')

const fetchVacancy = async () => {
  try {
    toggleLoader(true)
    const q = query(collection(db, 'vacancies'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc.id === route.params.id) {
        vacancy.value = {...doc.data(), id: doc.id}
      }
    })
  } catch {
    console.error('Error getting data...')
  } finally {
    toggleLoader()
  }
}

const isOpen = (id: any) => {
  vacancy_id.value = id
  isShow.value = true
}

onMounted(() => {
  fetchVacancy()
})
</script>
