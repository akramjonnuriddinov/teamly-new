<template>
  <div class="flex">
    <admin-sidebar :active="active" @change="changeActive" />
    <router-view v-if="isPage" :key="active" />
    <control-panel v-else :title="active" :hasInnerPage="hasInnerPage" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AdminSidebar from '@/pages/admin/AdminSidebar.vue'
import ControlPanel from '@/pages/admin/ControlPanel.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const active = ref('vacancies')
const isPage = computed(() => ['resume', 'message', 'SubmittedTasks'].includes(route.name as any))
const hasInnerPage = computed(() => active.value === 'vacancies')

const changeActive = (name: string) => (active.value = name)
</script>
