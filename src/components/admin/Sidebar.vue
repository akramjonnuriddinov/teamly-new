<template>
  <aside class="relative top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <router-link to="/vacancy" class="flex mb-5">
        <img width="130" height="36" src="@/assets/images/logos/logo.png" alt="logo" />
      </router-link>
      <router-link
        :to="{ name: 'resume' }"
        class="flex items-center w-full p-2 mb-2 font-medium text-gray-900 rounded-lg item hover:bg-gray-100 group"
      >
        <apply-icon />
        <span class="ml-3">Appliers</span>
      </router-link>
      <ul class="space-y-2 font-medium">
        <li v-for="link in links" :key="link.name">
          <router-link
            :to="{ name: 'admin' }"
            @click="$emit('change', link.name)"
            type="button"
            :class="{ 'bg-gray-100': link.name === active && isActive }"
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
import { ref, computed } from 'vue'
import AboutIcon from '@/components/icons/admin/AboutIcon.vue'
import BlogIcon from '@/components/icons/admin/BlogIcon.vue'
import ServiceIcon from '@/components/icons/admin/ServiceIcon.vue'
import PortfolioIcon from '@/components/icons/admin/PortfolioIcon.vue'
import VacancyIcon from '@/components/icons/admin/VacancyIcon.vue'
import ApplyIcon from '@/components/icons/admin/ApplyIcon.vue'
import StatusIcon from '@/components/icons/admin/StatusIcon.vue'
import TaskIcon from '@/components/icons/admin/TaskIcon.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const emit = defineEmits(['change'])
const props = defineProps(['active'])

const isActive = computed(() => {
  return props.active && route.path !== '/admin/resume'
})

const links = ref([
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
])
</script>

<style scoped>
.item.router-link-exact-active {
  background-color: rgb(243 244 246);
}
</style>
