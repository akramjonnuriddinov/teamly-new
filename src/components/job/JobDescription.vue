<template>
  <section class="pt-[115px] pb-[45px] relative z-10 mb-[100px]">
    <div class="container relative w-full px-5 mx-auto max-w-7xl">
      <h2 class="text-xl font-semibold text-[#1C1C37] mb-5">Requirements</h2>
      <div class="requirements" v-html="vacancy.requirements"></div>
      <!-- <ul class="flex flex-col">
        <li v-for="requirement in vacancy.requirements" class="flex items-center gap-4 mb-2">
          <img width="8" height="8" src="@/assets/images/circle.svg" alt="circle" />
          <span v-html="requirement" class="text-[#5B5A78]"></span>
        </li>
      </ul>
      <h2 class="text-xl font-semibold text-[#1C1C37] my-5">Tasks</h2>
      <ul class="flex flex-col">
        <li v-for="task in vacancy.tasks" class="flex items-center gap-4 mb-2">
          <img width="8" height="8" src="@/assets/images/circle.svg" alt="circle" />
          <span class="text-[#5B5A78]">{{ task }}</span>
        </li>
      </ul> -->
      <base-button :size="ESize.BIG" class="mt-12" @click="$emit('open')"> Apply </base-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize } from '@/types'

defineProps(['vacancy'])
</script>

<style>
.requirements li {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.requirements li::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #7e54f8;
  margin-right: 4px;
}
</style>
