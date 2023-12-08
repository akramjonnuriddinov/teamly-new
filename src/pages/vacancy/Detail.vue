<template>
  <div>
    <template v-if="vacancy && Object.keys(vacancy).length > 0">
      <vacancy-detail-banner @open="isOpen" :vacancy="vacancy" />
      <job-description @open="isOpen" :vacancy="vacancy" />
    </template>
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
import { useAuthStore } from "@/store/auth";
import { collection, where, query, getDocs, getDoc, doc } from 'firebase/firestore'
import { toggleLoader } from '@/composables/loader'

const route = useRoute()
const store = useAuthStore();
const db = useFirestore()
const isShow = ref(false)
const vacancy = ref({})
const vacancy_id = ref<string | undefined>('')

const fetchVacancy = async () => {
  try {
    toggleLoader(true)
    const q = query(collection(db, "appliers"), where("user_id", "==", store.user.id));
    const querySnapshot = await getDocs(q);
    const promises = querySnapshot.docs.map(async (applier) => {
      const appliedVacancyId = applier.data().vacancy_id;
      const docRef = doc(collection(db, 'vacancies'), appliedVacancyId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const vacancyData = docSnapshot.data();
        const statusId = applier.data().status_id;

        if (route.params.id === appliedVacancyId) {
          return { ...vacancyData, id: appliedVacancyId, status_id: statusId };
        }
      } else {
        console.log(`Document ${appliedVacancyId} does not exist or data is undefined`);
      }
      return null;
    });
    vacancy.value = (await Promise.all(promises)).filter(item => item !== null);
    console.log(vacancy.value);
  } catch (error) {
    console.error('Error fetching appliers:', error);
  } finally {
    toggleLoader()
  }
}

const isOpen = (id: any) => {
  vacancy_id.value = id
  isShow.value = true
}

onMounted(async () => {
  await fetchVacancy();
});
</script>
