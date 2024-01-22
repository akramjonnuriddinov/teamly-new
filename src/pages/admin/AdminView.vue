<template>
  <div class="flex">
    <admin-sidebar  :active="active" @change="changeActive" />
    <router-view v-if="isAppliers" :key="active"/>
    <control-panel v-else :title="active" :hasInnerPage="hasInnerPage" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminSidebar from '@/pages/admin/AdminSidebar.vue'
import ControlPanel from '@/pages/admin/ControlPanel.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
const isAppliers = computed(() => route.name === 'resume')
const active = ref('vacancies')
const hasInnerPage = computed(() => active.value === 'vacancies')

const changeActive = (name: string) => active.value = name
</script>
