<template>
  <button
    :class="styles"
    class="bg-tg-primary-color mt-12 text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  styles: string
}>()
</script>
