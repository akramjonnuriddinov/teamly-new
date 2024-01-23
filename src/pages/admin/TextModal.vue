<template>
  <base-modal @close="$emit('close')" width="max-w-[470px]" height="h-auto">
    <p class="mb-3 text-center text-xl font-bold">{{ message.fullname }}</p>
    <p>{{ message.text }}</p>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
defineProps(['message'])
defineEmits(['close'])
</script>

<style scoped></style>
