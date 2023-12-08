<script setup>
import { ref } from 'vue'
import BasicAccordion from './BasicAccordion.vue'
const expanded = ref({ expanded: null })
</script>

<template>
  <basic-accordion :expanded="expanded" body="111qnaaqafadnsfkasnfjksanfkjasngkjls" title="first"></basic-accordion>
  <basic-accordion :expanded="expanded" body="222qnaaqafadnsfkasnfjksanfkjasngkjls" title="second"></basic-accordion>
  <basic-accordion :expanded="expanded" body="333qnaaqafadnsfkasnfjksanfkjasngkjls" title="3-chi"></basic-accordion>
</template>
