<template>
  <base-modal @close="$emit('close')" :title="message.fullname" width="max-w-[470px]" height="h-auto">
    <p>{{ message.text }}</p>
  </base-modal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
defineProps(['message'])
defineEmits(['close'])
</script>

<style scoped></style>
