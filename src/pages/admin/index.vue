<template>
  <div class="flex">
    <Sidebar @change="changeSidebarSelected" :active="sidebarSelected" />
    <control-panel :title="sidebarSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/admin/Sidebar.vue'
import ControlPanel from '@/components/admin/ControlPanel.vue'

const sidebarSelected = ref('vacancies')

const changeSidebarSelected = (name: string) => {
  sidebarSelected.value = name
}
</script>
