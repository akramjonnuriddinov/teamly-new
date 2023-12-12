<template>
  <div class="flex">
    <Sidebar @change="changeSidebarSelected" :active="sidebarSelected" />
    <router-view v-if="route.path == '/admin/resume'" />
    <control-panel v-else :title="sidebarSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import ControlPanel from '@/components/admin/ControlPanel.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const sidebarSelected = ref('vacancies')

const changeSidebarSelected = (name: string) => {
  if (name === 'appliers') return
  sidebarSelected.value = name
}
</script>
