<template>
  <div class="mt-[86px]">
    <vacancy-detail-banner :vacancy="vacancy" @open="isShow = true" />
    <job-description :vacancy="vacancy" @open="isShow = true" />
  </div>
  <apply-modal v-if="isShow" @close="isShow = false" />
</template>

<script setup lang="ts">
import ApplyModal from '@/components/ApplyModal.vue'
import VacancyDetailBanner from '@/components/vacancy/VacancyDetailBanner.vue'
import JobDescription from '@/components/job/JobDescription.vue'
import { ref } from 'vue'
import { useFirestore } from 'vuefire'
import { useRoute } from 'vue-router'
import { collection, query, getDocs } from 'firebase/firestore'
import { showLoader, hideLoader } from '@/composables/loader'

const route = useRoute()
const db = useFirestore()
const isShow = ref(false)
const vacancy = ref({})

const fetchVacancy = async () => {
  try {
    showLoader()
    const q = query(collection(db, 'vacancies'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      if (doc.id === route.params.id) {
        vacancy.value = doc.data()
      }
    })
  } catch {
    console.error('Error getting data...')
  } finally {
    hideLoader()
  }
}
fetchVacancy()
</script>
