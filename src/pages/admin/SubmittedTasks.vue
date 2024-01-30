<template>
  <div class="flex h-screen w-full flex-col overflow-y-scroll p-8">
    <div>
      <h2 class="mb-10 text-3xl capitalize">Submitted Task</h2>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <ul v-else-if="tasks.length">
        <template v-for="task in tasks" :key="task.id">
          <li class="relative mb-5 flex flex-col">
            <div class="flex h-full items-center gap-10 justify-between rounded-md bg-gray-50 p-5 font-medium">
              <span class="cursor-pointer" @click="openUserModal(task.user)">{{ task.user.name }}</span>
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
      <user-modal v-if="isUserModalOpen" :user="selectedUser" @click="isUserModalOpen = false"/>
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
const isLoading = ref(true)
const isUserModalOpen = ref(false)
const selectedUser = ref(false)

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
  const vacancyIds = tasks.value.map((item:any) => item.vacancy)
  const userIds = tasks.value.map((item:any) => item.user)
  const usersQuery = getDocs(query(collection(db, 'users'), where('id', 'in', userIds)))
  const vacanciesQuery = getDocs(query(collection(db, 'vacancies'), where('id', 'in', vacancyIds)))
  const [usersSnapshot, vacanciesSnapshot] = await Promise.all([usersQuery, vacanciesQuery])
  const users = usersSnapshot.docs.map(item => item.data())
  const vacancies = vacanciesSnapshot.docs.map(item => item.data())
  tasks.value = tasks.value.map((task:any) => ({
    ...task,
    user: users.find(item => item.id === task.user),
    vacancy: vacancies.find(item => item.id === task.vacancy)
  }))
}

const removeMessage = async (id: string) => {
  tasks.value = tasks.value.filter((item: any) => item.id !== id)
  await deleteDoc(doc(db, 'submitted_tasks', id))
}

const openUserModal = (user:any) => {
  selectedUser.value = user
  isUserModalOpen.value = true
}
</script>
