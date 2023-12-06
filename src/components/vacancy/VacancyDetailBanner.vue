<template>
  <section class="bg-[#F9F9FA] vacancy-detail mt-[86px]">
    <div
      class="container relative px-5 mx-auto max-w-7xl max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        class="relative pt-[100px] pb-[60px] flex items-center justify-between w-full max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <div class="flex flex-col max-w-[750px]">
          <span class="text-[#5B5A78] mb-5">{{ 'Fergana, Uzbekistan' }}</span>
          <h1 class="mb-4 text-[70px] font-extrabold text-[#38386E] leading-[1.2] max-sm:text-4xl max-[800px]:text-5xl">
            {{ vacancy.title }}
          </h1>
          <div class="text-tg-primary-color tracking-[-0.3px] font-bold flex items-center gap-3 mb-5">
            <span>{{ vacancy.category }}</span>
            <img width="8" height="8" src="@/assets/images/circle.svg" alt="circle" />
            <span>{{ vacancy.time }}</span>
          </div>
        </div>
        <base-button :size="ESize.BIG" @click="handleApply(vacancy.id)" class="max-[990px]:mt-5">Apply</base-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/reusables/BaseButton.vue'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthStore } from '@/store/auth'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { ESize } from '@/types'

defineProps(['vacancy'])
const emit = defineEmits(['open'])
const store = useAuthStore()
const db = useFirestore()
const router = useRouter()
const handleApply = async (id: any) => {
  if (store.resume) {
    try {
      const ref = collection(db, 'appliers')
      const data = {
        user_id: store.user.id,
        status_id: null,
        vacancy_id: id,
      }
      await addDoc(ref, data)
    } catch (error) {
      console.log(error)
    }
  } else if (!store.user) {
    router.push('/login')
  } else {
    emit('open', id)
  }
}
</script>

<style scoped>
.vacancy-detail {
  border-radius: 0px 0px 64px 64px;
}
</style>
