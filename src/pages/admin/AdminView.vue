<template>
  <div class="flex">
    <admin-sidebar @change="changeSidebarSelected" :active="sidebarSelected" />
    <router-view v-if="route.path == '/admin/resume'" />
    <control-panel v-else :title="sidebarSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from '@/pages/admin/AdminSidebar.vue'
import ControlPanel from '@/pages/admin/ControlPanel.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const sidebarSelected = ref('vacancies')

const changeSidebarSelected = (name: string) => {
  if (name === 'appliers') return
  sidebarSelected.value = name
}
</script>
