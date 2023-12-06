<template>
  <aside class="relative top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <router-link to="/vacancy" class="flex mb-5">
        <img
          class="w-[150px] min-w-[150px]"
          width="150"
          height="36"
          src="@/assets/images/logos/custom-logo17.png"
          alt="logo"
        />
      </router-link>
      <ul class="space-y-2 font-medium">
        <li v-for="link in links" :key="link.name">
          <router-link
            :to="{ name: 'admin' }"
            @click="$emit('change', link.name)"
            type="button"
            :class="{ 'bg-gray-100': active === link.name }"
            class="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
            <component :is="link.icon" />
            <span class="ml-3 capitalize">{{ link.name }}</span>
          </router-link>
        </li>
      </ul>
      <div class="flex items-center w-full p-2 space-y-2 font-medium text-gray-900 rounded-lg hover:bg-gray-100 group">
        <blog-icon />
        <router-link class="ml-3" :to="{ name: 'resume' }">Resume</router-link>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AboutIcon from '@/components/icons/admin/AboutIcon.vue'
import BlogIcon from '@/components/icons/admin/BlogIcon.vue'
import ServiceIcon from '@/components/icons/admin/ServiceIcon.vue'
import VacancyIcon from '@/components/icons/admin/VacancyIcon.vue'

const emit = defineEmits(['change'])
defineProps(['active'])

const links = ref([
  {
    name: 'vacancies',
    icon: VacancyIcon,
  },
  {
    name: 'portfolio',
    icon: ServiceIcon,
  },
  {
    name: 'blog',
    icon: BlogIcon,
  },
  {
    name: 'services',
    icon: ServiceIcon,
  },
  {
    name: 'about',
    icon: AboutIcon,
  },
])
</script>
