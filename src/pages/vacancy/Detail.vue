<template>
  <div>
    <template v-if="vacancy && Object.keys(vacancy).length > 0">
      <vacancy-detail-banner @open="isOpen"  :vacancy="vacancy"/>
      <job-description @open="isOpen" :vacancy="vacancy"/>
    </template>
  </div>
  <apply-modal v-if="isShow" @close="isShow = false" :vacancyId="vacancyId" />
</template>

<script setup lang="ts">
import ApplyModal from '@/components/ApplyModal.vue'
import VacancyDetailBanner from '@/components/vacancy/VacancyDetailBanner.vue'
import JobDescription from '@/components/job/JobDescription.vue'
import { ref, computed, watch } from 'vue'
import { useFirestore } from 'vuefire'
import { useRoute } from 'vue-router'
import { useAuthStore } from "@/store/auth";
import { collection, where, query, getDocs, getDoc, doc } from 'firebase/firestore'
import { toggleLoader } from '@/composables/loader'

const route = useRoute()
const store = useAuthStore();
const db = useFirestore()
const isShow = ref(false)

const user = computed(() => store.user)
const vacancy = ref<any>(null);
const vacancyId = ref<string | undefined>('')

const fetchVacancy = async () => {
  try {
    toggleLoader(true);
    if (user.value && user.value.id) {
      const q = query(collection(db, "appliers"), where("user_id", "==", user.value.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
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
          }

          return null;
        });

        const fetchedVacancies = await Promise.all(promises);
        const vacancyObject = fetchedVacancies.find(item => item !== null);
        if (vacancyObject) {
          vacancy.value = vacancyObject;
        } else {
          const qAllVacancies = query(collection(db, 'vacancies'));
          const querySnapshotAllVacancies = await getDocs(qAllVacancies);
          querySnapshotAllVacancies.forEach((doc) => {
            if (doc.id === route.params.id) {
              vacancy.value = { ...doc.data(), id: doc.id };
            }
          });
        }
      } else {
        const qAllVacancies = query(collection(db, 'vacancies'));
        const querySnapshotAllVacancies = await getDocs(qAllVacancies);
        querySnapshotAllVacancies.forEach((doc) => {
          if (doc.id === route.params.id) {
            vacancy.value = { ...doc.data(), id: doc.id };
          }
        });
      }
    }
  } catch (error) {
    console.error('Error fetching appliers:', error);
  } finally {
    toggleLoader()
  }
};

const isOpen = (id: any) => {
  vacancyId.value = id
  isShow.value = true
}



watch(
  () => store.user,
  async () => {
    await fetchVacancy();
  },
  {
    immediate: true,
  },
);



</script>
