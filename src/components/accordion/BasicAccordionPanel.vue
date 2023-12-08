<script setup>
import { inject } from 'vue'

const props = defineProps({
  title: {
    required: true,
    type: String,
  },
})

const register = inject('accordion-register')

const { expandedComputed, toggle } = register()
</script>

<template>
  <div class="accordion-panel">
    <div class="header" @click="toggle">{{ title }}</div>
    <div v-if="expandedComputed" class="body"><slot /></div>
  </div>
</template>

<style scoped>
.header {
  background-color: #e6f6ff;
  border: 1px solid #ccc;
  color: #2c3e50;
  cursor: pointer;
  line-height: 1.4;
  margin: -1px;
  padding: 5px;
}

.body {
  background-color: #f7fcff;
  border: 1px solid #ccc;
  flex: auto;
  margin: 0 -1px -1px;
  overflow: auto;
}

.expanded {
  flex: auto;
  min-height: 0;
}
</style>
