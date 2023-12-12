<template>
  <section id="vacancies" class="pt-[115px] pb-[45px] relative z-10">
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
            <base-button :size="ESize.BIG" :is-loading="isLoading" @click="handleApply(vacancy.id)" class="mt-auto">
              Apply
            </base-button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/reusables/BaseButton.vue'
import { useAuthStore } from '@/store/auth'
import { ESize } from '@/types'
import type { Vacancy } from '@/types'
import { useRouter } from 'vue-router'
import { fetchData } from '@/composables/fetchData'
import { vacancyApply } from '@/composables/vacancyApply'

defineProps(['isShow'])
const emit = defineEmits(['open'])
const vacancies = ref<Vacancy[]>([])
const store = useAuthStore()
const isLoading = ref(false)

const router = useRouter()
const handleApply = async (id: any) => {
  if (store.resume) {
    isLoading.value = true
    await vacancyApply(store.user.id, id)
    isLoading.value = false
  } else if (!store.user) {
    router.push('/login')
  } else {
    emit('open', id)
  }
}
fetchData('vacancies').then((result) => {
  vacancies.value = result
})
</script>
