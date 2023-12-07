<template>
  <section class="pt-[50px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <div class="description" v-html="vacancy.description"></div>
      <base-button :size="ESize.BIG" class="mt-12" @click="openSendId(vacancy.id)">Apply</base-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize } from '@/types'

defineProps(['vacancy'])

const emit = defineEmits<{
  (e: 'openSendId', id: string | undefined): void
}>()

const openSendId = (id: string | undefined) => {
  emit('openSendId', id)
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
