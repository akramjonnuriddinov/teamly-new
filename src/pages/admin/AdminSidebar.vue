<template>
  <aside class="relative left-0 top-0 z-40 w-64 -translate-x-full transition-transform sm:translate-x-0">
    <div class="h-full overflow-y-auto bg-gray-50 px-3 py-4">
      <router-link to="/vacancy" class="mb-5 flex">
        <img width="130" height="36" src="@/assets/images/logos/logo.png" alt="logo" />
      </router-link>
      <ul class="space-y-2 font-medium">
        <li v-for="link in links" :key="link.name" class="relative">
          <router-link
            :to="{ name: link.page || 'admin' }"
            @click="$emit('change', link.name)"
            type="button"
            :class="{ 'bg-gray-100': isActive(link.name), item: hasChildRoute }"
            class="group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <inline-svg :src="link.icon" />
            <span class="ml-3 capitalize">{{ link.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import InlineSvg from '@/components/InlineSvg.vue'

const emit = defineEmits(['change'])
const props = defineProps(['active'])
const route = useRoute()
const links = [
  {
    name: 'vacancies',
    icon: 'svg/admin/vacancy.svg',
  },
  {
    name: 'appliers',
    icon: 'svg/admin/apply.svg',
    page: 'resume',
  },
  {
    name: 'message',
    icon: 'svg/admin/comment.svg',
    page: 'message',
  },
  {
    name: 'portfolio',
    icon: 'svg/admin/portfolio.svg',
  },
  {
    name: 'blog',
    icon: 'svg/admin/blog.svg',
  },
  {
    name: 'about',
    icon: 'svg/admin/about.svg',
  },
  {
    name: 'services',
    icon: 'svg/admin/service.svg',
  },
  {
    name: 'statuses',
    icon: 'svg/admin/status.svg',
  },
  {
    name: 'tasks',
    icon: 'svg/admin/task.svg',
  },
  {
    name: 'Submitted Tasks',
    page: 'SubmittedTasks',
    icon: 'svg/admin/submitted.svg',
  },
]

const hasChildRoute = computed(() => ['resume', 'message', 'SubmittedTasks'].includes(route.name as any))
const isActive = computed(() => (link: string) => link === props.active && !hasChildRoute.value)
</script>

<style scoped>
.item.router-link-exact-active {
  background-color: #f3f4f6;
}
</style>
