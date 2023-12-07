<template>
  <section class="pt-[50px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <div class="description" v-html="vacancy.description"></div>
      <base-button :size="ESize.BIG" class="mt-12" :is-loading="isLoading" @click="handleApply(vacancy.id)"
        >Apply</base-button
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthStore } from '@/store/auth'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { ESize } from '@/types'

defineProps(['vacancy'])
const emit = defineEmits(['open'])
const store = useAuthStore()
const db = useFirestore()
const isLoading = ref(false)
const router = useRouter()
const handleApply = async (id: any) => {
  if (store.resume) {
    try {
      isLoading.value = true
      const ref = collection(db, 'appliers')
      const data = {
        user_id: store.user.id,
        status_id: null,
        vacancy_id: id,
      }
      await addDoc(ref, data)
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  } else if (!store.user) {
    router.push('/login')
  } else {
    emit('open', id)
  }
}
</script>

<style>
.description li {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.description li::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #7e54f8;
  margin-right: 4px;
}

.description h1,
.description h2,
.description h3 {
  @apply text-xl font-semibold text-[#1C1C37] mb-5 mt-10;
}
</style>
