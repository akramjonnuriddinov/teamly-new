<template>
  <section class="pt-[50px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <div class="description" v-html="vacancy.description"></div>
      <base-button
        :size="ESize.BIG"
        class="mt-12"
        :is-loading="isLoading"
        :disabled="!curButton"
        @click="curButton ? handleApply(vacancy.id) : ''"
        :color="curButton ? '#7e54f8 ' : status ? status.color : storeVacancies.statusDefault.color"
      >
        {{ curButton ? 'Apply' : status ? status.title : storeVacancies.statusDefault.title }}
      </base-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/reusables/BaseButton.vue'
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useVacanciesStore } from '@/store/vacancies'
import { useRouter } from 'vue-router'
import { vacancyApply } from '@/composables/vacancyApply'
import { ESize } from '@/types'
import { toggleLoader } from '@/composables/loader'

const curButton = computed(() => !props.vacancy.status_id && !storeVacancies.applicationSent)
const props = defineProps(['vacancy'])
const emit = defineEmits(['open'])
const storeVacancies = useVacanciesStore()
const store = useAuthStore()
const isLoading = ref(false)
const router = useRouter()
const status = computed(() => storeVacancies.status)

onMounted(async () => {
  toggleLoader(true)
  if (!props.vacancy.status_id) {
    storeVacancies.updateApplicationSent(false)
  }
  await storeVacancies.fetchStatus(props.vacancy.status_id)
  toggleLoader()
})

const handleApply = async (id: any) => {
  if (store.resume && !storeVacancies.applicationSent) {
    isLoading.value = true
    await vacancyApply(store.user.id, id)
    isLoading.value = false
    storeVacancies.updateApplicationSent(true)
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
