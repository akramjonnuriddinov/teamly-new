<template>
  <div class="flex">
    <Sidebar @change="changeSidebarSelected" :active="sidebarSelected" />
    <admin-content :title="sidebarSelected" @open-modal="isShow = true" />
  </div>
  <admin-modal v-if="isShow" @close-modal="isShow = false" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import Sidebar from "@/components/admin/Sidebar.vue"
import AdminContent from "@/components/admin/AdminContent.vue"
import AdminModal from "@/components/admin/AdminModal.vue"

const sidebarSelected = ref("vacancies")
const isShow = ref(false)

const changeSidebarSelected = (name: string) => {
  sidebarSelected.value = name
}
</script>
