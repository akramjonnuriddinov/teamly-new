<template>
  <inline-svg fill="currentColor" style="" :src="getImageUrl(src)" />
</template>

<script setup lang="ts">
import InlineSvg from 'vue-inline-svg'
import { getImageUrl } from '@/composables/getImgUrl'

defineProps(['src'])
</script>
