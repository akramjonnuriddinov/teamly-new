<template>
  <span :style="`color: ${color}`">
    <inline-svg src="logos/white-logo.svg" />
  </span>
</template>

<script setup lang="ts">
import InlineSvg from '../reusables/InlineSvg.vue'
defineProps({
  color: {
    type: String,
    default: '#39396E',
  },
})
</script>
