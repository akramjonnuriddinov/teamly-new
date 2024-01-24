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
            :class="{ 'bg-gray-100': isActive(link.name), item: route.name === 'resume' || route.name === 'message' }"
            class="group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
          >
            <component :is="link.icon" />
            <span class="ml-3 capitalize">{{ link.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import AboutIcon from '@/pages/admin/icons/AboutIcon.vue'
import BlogIcon from '@/pages/admin/icons/BlogIcon.vue'
import ServiceIcon from '@/pages/admin/icons/ServiceIcon.vue'
import PortfolioIcon from '@/pages/admin/icons/PortfolioIcon.vue'
import VacancyIcon from '@/pages/admin/icons/VacancyIcon.vue'
import ApplyIcon from '@/pages/admin/icons/ApplyIcon.vue'
import StatusIcon from '@/pages/admin/icons/StatusIcon.vue'
import TaskIcon from '@/pages/admin/icons/TaskIcon.vue'
import CommentIcon from '@/pages/admin/icons/CommentIcon.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['change'])
const props = defineProps(['active'])
const route = useRoute()
const isActive = computed(
  () => (link: string) => link === props.active && !['resume', 'message'].includes(route.name as any),
)
const links = [
  {
    name: 'vacancies',
    icon: VacancyIcon,
  },
  {
    name: 'appliers',
    icon: ApplyIcon,
    page: 'resume',
  },
  {
    name: 'message',
    icon: CommentIcon,
    page: 'message',
    isBadge: true,
  },
  {
    name: 'portfolio',
    icon: PortfolioIcon,
  },
  {
    name: 'blog',
    icon: BlogIcon,
  },
  {
    name: 'about',
    icon: AboutIcon,
  },
  {
    name: 'services',
    icon: ServiceIcon,
  },
  {
    name: 'statuses',
    icon: StatusIcon,
  },
  {
    name: 'tasks',
    icon: TaskIcon,
  },
]
</script>

<style scoped>
.item.router-link-exact-active {
  background-color: rgb(243 244 246);
}
</style>
