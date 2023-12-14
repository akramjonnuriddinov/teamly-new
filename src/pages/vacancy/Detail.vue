<template>
  <div>
    <template v-if="vacancy && Object.keys(vacancy).length > 0">
      <vacancy-detail-banner @open="isOpen" :vacancy="vacancy"/>
      <job-description @open="isOpen" :vacancy="vacancy"/>
    </template>
    <template v-else>
      <section class="bg-[#F9F9FA] vacancy-detail mt-[86px]">
        <div
          class="container relative px-5 mx-auto max-w-7xl max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
        >
          <div
            class="relative pt-[100px] pb-[60px] flex items-center justify-between w-full max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
          >
            <div class="flex flex-col max-w-[750px]">
              <span class="text-[#5B5A78] mb-5">
                <Skeleton width="200px" height="24px" :theme="ESkeletonTheme.DARK" />
              </span>
              <div class="mb-4">
                <Skeleton width="600px" height="168px" :theme="ESkeletonTheme.DARK" />
              </div>
              <div class="text-tg-primary-color tracking-[-0.3px] font-bold flex items-center gap-3 mb-5">
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
      <section class="pt-[50px] pb-[45px] relative z-10 mb-[100px]">
        <div class="container relative w-full px-5 mx-auto max-w-7xl">
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
import ApplyModal from '@/components/ApplyModal.vue'
import VacancyDetailBanner from '@/components/vacancy/VacancyDetailBanner.vue'
import JobDescription from '@/components/job/JobDescription.vue'
import { ref, computed, watch } from 'vue'
import { useFirestore } from 'vuefire'
import { useRoute } from 'vue-router'
import { useAuthStore } from "@/store/auth";
import { collection, where, query, getDocs, getDoc, doc } from 'firebase/firestore'
import Skeleton, { ESkeletonTheme } from '@/components/skeleton/Skeleton.vue'


const route = useRoute()
const store = useAuthStore();
const db = useFirestore()
const isShow = ref(false)

const user = computed(() => store.user)
const vacancy = ref<any>(null);
const vacancyId = ref<string | undefined>('')

const fetchVacancy = async () => {
  try {
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
        }
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
  } catch (error) {
    console.error('Error fetching appliers:', error);
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
