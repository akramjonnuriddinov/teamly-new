<script setup lang="ts">
import { computed } from 'vue'
import { v4 as uuid } from 'uuid'

const props = defineProps(['title', 'body', 'expanded'])
const id = uuid()
const expandedComputed = computed(() => props.expanded.expanded === id)

const toggle = () => {
  props.expanded.expanded = props.expanded.expanded === id ? null : id
}
</script>

<template>
  <div class="mb-5 border accordion-panel">
    <div class="p-2 text-2xl cursor-pointer" @click="toggle">{{ title }}</div>
    <div v-if="expandedComputed" class="body">{{ body }}</div>
  </div>
</template>

<style>
.body {
  background-color: rgb(235, 143, 143);
  height: 60px;
}
</style>
