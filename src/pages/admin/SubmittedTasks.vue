<template>
  <div class="flex h-screen w-full flex-col overflow-y-scroll p-8">
    <div>
      <div class="flex items-center justify-between">
        <h2 class="mb-10 text-3xl capitalize">Submitted Task</h2>
        <select class="rounded-md border border-gray-200 p-2 outline-blue-300" id="category" @change="setFilter">
          <option value="all" selected>All</option>
          <option v-for="option in vacancies" :key="option.id" :value="option.id" class="flex items-center">
            {{ option.title }}
          </option>
        </select>
      </div>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <ul v-else-if="filteredTasks.length">
        <template v-for="task in filteredTasks" :key="task.id">
          <li class="relative mb-5 flex flex-col">
            <div class="flex h-full items-center justify-between gap-10 rounded-md bg-gray-50 p-5 font-medium">
              <span class="w-60 cursor-pointer" @click="openUserModal(task.user)">{{ task.user.name }}</span>
              <span>{{ task.vacancy.title }}</span>
              <a :href="task.source" target="_blank" class="ml-auto text-tg-primary-color">Source</a>
              <a :href="task.live" target="_blank" class="text-tg-primary-color">Live</a>
              <div class="flex space-x-5">
                <button @click.stop="removeMessage(task.id)" class="font-medium text-red-500 hover:opacity-80">
                  Remove
                </button>
              </div>
            </div>
          </li>
        </template>
      </ul>
      <div v-else>Nothing found...</div>
      <user-modal v-if="isUserModalOpen" :user="selectedUser" @click="isUserModalOpen = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { doc, deleteDoc } from 'firebase/firestore'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '@/firebase'
import AppLoader from '@/components/AppLoader.vue'
import UserModal from '@/pages/admin/UserModal.vue'

const tasks = ref<any>([])
const vacancies = ref<any>([])
const isLoading = ref(true)
const isUserModalOpen = ref(false)
const selectedUser = ref(false)

const filteredTasks = ref<any>([])

onMounted(async () => {
  await loadData()
  isLoading.value = false
})

const loadData = async () => {
  const tasksQuery = query(collection(db, 'submitted_tasks'))
  const tasksSnapshot = await getDocs(tasksQuery)
  tasks.value = tasksSnapshot.docs.map((doc) => doc.data())
  if (!tasks.value.length) {
    return
  }
  const vacancyIds = tasks.value.map((item: any) => item.vacancy)
  const userIds = tasks.value.map((item: any) => item.user)
  const usersQuery = getDocs(query(collection(db, 'users'), where('id', 'in', userIds)))
  const vacanciesQuery = getDocs(query(collection(db, 'vacancies'), where('id', 'in', vacancyIds)))
  const [usersSnapshot, vacanciesSnapshot] = await Promise.all([usersQuery, vacanciesQuery])
  const users = usersSnapshot.docs.map((item) => item.data())
  vacancies.value = vacanciesSnapshot.docs.map((item) => item.data())
  tasks.value = tasks.value.map((task: any) => ({
    ...task,
    user: users.find((item) => item.id === task.user),
    vacancy: vacancies.value.find((item: any) => item.id === task.vacancy),
  }))
  filteredTasks.value = tasks.value
}

const removeMessage = async (id: string) => {
  tasks.value = tasks.value.filter((item: any) => item.id !== id)
  filteredTasks.value = filteredTasks.value.filter((item: any) => item.id !== id)
  await deleteDoc(doc(db, 'submitted_tasks', id))
}

const openUserModal = (user: any) => {
  selectedUser.value = user
  isUserModalOpen.value = true
}

const setFilter = (value: any) => {
  filteredTasks.value =
    value.target.value === 'all'
      ? tasks.value
      : tasks.value.filter((item: any) => item.vacancy.id === value.target.value)
}
</script>
