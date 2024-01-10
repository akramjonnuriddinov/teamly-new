<template>
  <section class="bg-[#F9F9FA]">
    <div class="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto lg:py-0">
      <div v-if="isLoading">
        <Skeleton width="300px" height="148px" :theme="ESkeletonTheme.DARK" />
      </div>
      <div v-else class="p-8 text-white bg-green-500 rounded-lg shadow-lg">
        <div class="flex items-center justify-center mb-4">
          <inline-svg fill="none" src="check.svg" />
          <h1 class="text-3xl font-bold">Success!</h1>
        </div>
        <p class="text-lg">Your email has been verified.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
import { useAuthStore } from '@/store/auth'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'
import { useFirestore } from 'vuefire'

const store = useAuthStore()
const db = useFirestore()
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
  } catch (error) {
    console.error('Error fetching user data:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
