<template>
  <section class="bg-[#F9F9FA]">
    <div class="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
      <div v-if="isLoading">
        <Skeleton width="300px" height="148px" :theme="ESkeletonTheme.DARK" />
      </div>
      <div v-else class="rounded-lg bg-tg-green p-8 text-white shadow-lg">
        <div class="mb-4 flex items-center justify-center">
          <inline-svg fill="none" src="svg/check.svg" />
          <h1 class="text-3xl font-bold">Success!</h1>
        </div>
        <p class="text-lg">Your email has been verified.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InlineSvg from '@/components/InlineSvg.vue'
import { useAuthStore } from '@/store/auth'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { db } from '@/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useAuthStore()
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const userInfo = ref(null)
const isLoading = ref(true)

onMounted(async () => {
  const docRef = doc(db, 'users', props.id)
  try {
    const userSnapshot = await getDoc(docRef)
    let userData = userSnapshot.data()
    userData = { ...userData, verified: true }

    await updateDoc(docRef, userData)
    userInfo.value = userData
    await store.fetchProfile()
    router.push('/')
  } catch (error) {
    console.error('Error fetching user data:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
