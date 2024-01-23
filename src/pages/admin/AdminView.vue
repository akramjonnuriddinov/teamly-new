<template>
  <div class="flex">
    <admin-sidebar :active="active" @change="changeActive" />
    <router-view v-if="isAppliers" :key="active" />
    <router-view v-else-if="isMessage" />
    <control-panel v-else :title="active" :hasInnerPage="hasInnerPage" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminSidebar from '@/pages/admin/AdminSidebar.vue'
import ControlPanel from '@/pages/admin/ControlPanel.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const isAppliers = computed(() => route.name === 'resume')
const isMessage = computed(() => route.name === 'message')
const active = ref('vacancies')
const hasInnerPage = computed(() => active.value === 'vacancies')

const changeActive = (name: string) => (active.value = name)
</script>
