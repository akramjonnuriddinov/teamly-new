<template>
  <aside class="relative top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <router-link to="/vacancy" class="flex mb-5">
        <img width="130" height="36" src="@/assets/images/logos/logo.png" alt="logo" />
      </router-link>
      <ul class="space-y-2 font-medium">
        <li v-for="link in links" :key="link.name">
          <router-link
            :to="{ name: link.page || 'admin' }"
            @click="$emit('change', link.name)"
            type="button"
            :class="{ 'bg-gray-100': isActive(link.name) }"
            class="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const emit = defineEmits(['change'])
const props = defineProps(['active'])
const route = useRoute()
const isActive = computed(() => (link:string) => link === props.active && route.name !== 'resume')

const links = [
  {
    name: 'appliers',
    icon: ApplyIcon,
    page: 'resume'
  },
  {
    name: 'vacancies',
    icon: VacancyIcon,
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
