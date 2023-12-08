<template>
  <div class="pb-[135px]">
    <div class="mb-7">
      <h1 class="text-[20px] font-medium">Applied vacancies</h1>
      <span class="text-gray-400 text-sm">All of your applied vacancies</span>
      <div>
        <div  v-for="vacancy in vacancies"
          :key="vacancy.id" class="shadow-job-inner my-5 bg-white flex flex-col rounded-[32px] px-[35px] py-[50px]">
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
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from "@/store/auth";
import { collection, where, query, getDocs, getDoc, doc} from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()
const store = useAuthStore();
const vacancies = ref();

onMounted(async () => {
  const q = query(collection(db, "appliers"), where("user_id", "==", store.user.id));
  try {
    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (applier) => {
      const vacancy_id = applier.data().vacancy_id;
      const docRef = doc(db, 'vacancies', vacancy_id);
      const vacancySnapshot = await getDoc(docRef);
      if (vacancySnapshot.exists()) {
        return {...vacancySnapshot.data(), id: vacancy_id};
      } else {
        console.log('Vacancy does not exist');
        return null;
      }
    });

    vacancies.value = await Promise.all(promises);

  } catch (error) {
    console.error('Error fetching appliers:', error);
  }
});
</script>
