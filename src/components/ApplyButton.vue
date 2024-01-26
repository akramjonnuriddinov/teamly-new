<template>
  <BaseButton :size="ESize.BIG" :disabled="!!isApplied" :color="color" :class="{ 'mt-auto': isCard }" @click="apply">
    <template v-if="showIcon">
      <div class="w-full h-full check-icon">
        <app-animation :options="defaultOptions" :width="40" :speed="2" @animCreated="handleAnimation" />
      </div>
    </template>
    <template v-else>
      <slot> Apply </slot>
    </template>
  </BaseButton>
  <ApplyModal v-if="isShow" @close="isShow = false" @add="applyByModal" />
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import { ESize } from '@/types'
import ApplyModal from '@/pages/vacancy/ApplyModal.vue'
import { ref, computed, nextTick, onUpdated, watch, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { vacancyApply } from '@/composables/vacancyApply'
import { addDoc, doc, setDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'vue-router'
import AppAnimation from '@/components/AppAnimation.vue'
import SuccessFailed from '@/assets/images/animation/success-failed-custom.json'

const props = defineProps(['applied', 'vacancy', 'isCard', 'color'])
const emit = defineEmits(['applied'])
const store = useAuthStore()
const router = useRouter()
const isApplied = ref(props.applied)
const hasStatus = props.applied
const isLoading = ref(false)
const isShow = ref(false)
const defaultOptions = {
  loop: false,
  autoplay: false,
  renderer: 'svg',
  animationData: SuccessFailed,
}
const anim = ref<any>()

const showIcon = computed(() => (props.isCard ? isApplied.value : !hasStatus && isApplied.value))

const color = computed(() => {
  if (props.color) {
    return props.color
  }
  return isApplied.value ? '#198754' : ''
})

watch(
  () => props.applied,
  (value) => {
    isApplied.value = value
  },
)

onMounted(async () => {
  savedPosition()
})

const handleAnimation = (createdAnim: any) => {
  anim.value = createdAnim
}

const playLoading = () => {
  if (anim.value) {
    anim.value.playSegments([10, 234], true)
    anim.value.loop = true
  }
}

const playSuccess = () => {
  if (anim.value) {
    anim.value.playSegments([235, 400], true)
    anim.value.loop = false
  }
}
const savedPosition = () => {
  if (anim.value) {
    anim.value.playSegments([399, 400], true)
    anim.value.loop = false
  }
}

const apply = async () => {
  isLoading.value = true

  if (!store.user) {
    router.push('/signin')
    return
  }

  if (!store.resume) {
    isShow.value = true
    return
  }
  isApplied.value = true

  const collectionRef = collection(db, 'applier_statuses')
  nextTick(() => {
    playLoading()
  })
  const res = await vacancyApply(store.user.id, props.vacancy)
  playSuccess()
  emit('applied')
  const jobList = await addDoc(collectionRef, {
    applier_id: res.id,
    status_id: 'FaLdBSPRYE1qRkTZXug0',
    vacancy_id: props.vacancy,
    date: Date.now(),
  })

  const newDoc = doc(collectionRef, jobList.id)
  await setDoc(newDoc, {
    id: jobList.id,
    applier_id: res.id,
    status_id: 'FaLdBSPRYE1qRkTZXug0',
    vacancy_id: props.vacancy,
    date: Date.now(),
  })
}

const applyByModal = () => {
  isShow.value = false
  apply()
}

onUpdated(() => {
  savedPosition()
  isShow.value ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})
</script>

<style>
.check-icon svg path {
  stroke-width: 5 !important;
}
</style>
