<template>
  <div class="flex">
    <Sidebar @change="changeSidebarSelected" :active="sidebarSelected" />
    <admin-content :title="sidebarSelected" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Sidebar from "@/components/admin/Sidebar.vue"
import AdminContent from "@/components/admin/AdminContent.vue"

const sidebarSelected = ref("vacancies")

const changeSidebarSelected = (name: string) => {
  sidebarSelected.value = name
}
</script>
