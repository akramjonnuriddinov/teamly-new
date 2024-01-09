<template>
  <section class="bg-[#F9F9FA] vacancy-detail mt-[86px]">
    <div
      class="container relative px-5 mx-auto max-w-7xl max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
    >
      <div
        v-if="listLoading"
        class="relative pt-[100px] pb-[60px] flex items-center justify-between w-full max-[990px]:flex max-[990px]:flex-col max-[990px]:items-center max-[990px]:justify-center max-sm:pt-[100px]"
      >
        <div class="flex flex-col max-w-[750px]">
          <span class="text-[#5B5A78] mb-5">
            <Skeleton width="200px" height="24px" :theme="ESkeletonTheme.DARK" />
          </span>
          <div class="mb-4">
            <Skeleton width="350px" height="168px" :theme="ESkeletonTheme.DARK" />
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
      <div
        v-else
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
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useVacanciesStore } from '@/store/vacancies'
import { useRouter } from 'vue-router'
import { vacancyApply } from '@/composables/vacancyApply'
import { ESize } from '@/types'
import Skeleton, { ESkeletonTheme } from '@/components/Skeleton.vue'

const storeVacancies = useVacanciesStore()
const curButton = computed(() => !props.vacancy.status_id && !storeVacancies.applicationSent)
const props = defineProps(['vacancy'])
const emit = defineEmits(['open'])
const store = useAuthStore()
const isLoading = ref(false)
const listLoading = ref(true)
const router = useRouter()
const status = computed(() => storeVacancies.status)

onMounted(async () => {
  if (!props.vacancy?.status_id) {
    storeVacancies.updateApplicationSent(false)
  }
  if (store.user) await storeVacancies.fetchStatus(props.vacancy?.status_id)
  listLoading.value = false
})

const handleApply = async (id: any) => {
  if (!store.user) {
    router.push('/sign-in')
    return
  }

  if (store.resume && !storeVacancies.applicationSent) {
    isLoading.value = true
    await vacancyApply(store.user.id, id)
    isLoading.value = false
    storeVacancies.updateApplicationSent(true)
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
