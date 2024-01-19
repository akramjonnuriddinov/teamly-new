<template>
  <div class="flex h-screen w-full flex-col overflow-y-scroll p-8" @scroll="detectScroll">
    <div>
      <h2 class="mb-10 text-3xl capitalize">Appliers</h2>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <ul v-else-if="appliers.length">
        <template v-for="(applier, index) in allData" :key="index">
          <li v-if="applier.user" class="relative mb-5 flex flex-col">
            <div class="flex h-full items-center justify-between rounded-md border bg-gray-50 p-5">
              <button
                @click="toggleAccordion(index, applier)"
                class="transition-color mr-4 text-tg-paragraph-color duration-300 hover:text-tg-heading-font-color"
              >
                <inline-svg title="Show history" class="h-5 w-5" src="history.svg" />
              </button>
              <button
                @click.stop="openUserModal(applier.user)"
                title="View Profile"
                class="mr-2 flex w-1/5 justify-start overflow-hidden text-ellipsis whitespace-nowrap text-center font-semibold text-tg-green hover:opacity-80"
              >
                {{ applier.user.name }}
              </button>
              <span @click.stop class="mr-2 w-1/5">{{ applier.vacancy.title }}</span>
              <a @click.stop class="mr-2 w-1/6" :href="`mailto://${applier.user.email}`">{{
                applier.user.email || 'email undefined'
              }}</a>
              <div class="ml-auto flex space-x-5">
                <button
                  v-if="applier.status?.title"
                  @click.stop="openStatusModal(applier.id, applier.vacancy.id)"
                  :style="`
                    background-color: ${applier.status?.color}44;
                    color: ${applier.status?.color};
                  `"
                  class="rounded-full px-3 py-[2px] text-sm opacity-90"
                >
                  {{ applier.status?.title }}
                </button>
                <button @click.stop="removeUser(applier.id)" class="font-medium text-red-500 hover:opacity-80">
                  Remove
                </button>
              </div>
            </div>
            <keep-alive>
              <status-detail
                v-if="detailExpanded === index"
                :applier_id="applier.id"
                :status_id="applier.status_id"
                :expanded="detailExpanded === index"
                :statuses="statuses"
              />
            </keep-alive>
          </li>
        </template>
        <div v-if="false" class="flex justify-center">
          <button-loader color="#7E54F8" width="50px" height="50px" />
        </div>
      </ul>
      <div v-else>Nothing found...</div>
    </div>
  </div>
  <status-modal v-if="isStatusModal" @close="isStatusModal = false" :currentUser="currentUser" :statuses="statuses" />
  <user-modal v-if="isUserModal" :user="selectedUser" @close="isUserModal = false" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { doc, deleteDoc, where } from 'firebase/firestore'
import { db } from '@/firebase'
import StatusDetail from '@/pages/admin/StatusDetail.vue'
import StatusModal from '@/pages/admin/StatusModal.vue'
import InlineSvg from '@/components/InlineSvg.vue'
import UserModal from '@/pages/admin/UserModal.vue'
import AppLoader from '@/components/AppLoader.vue'
import { useRoute } from 'vue-router'
import { collection, query, getDocs, orderBy } from 'firebase/firestore'
import ButtonLoader from '@/components/ButtonLoader.vue'

const route = useRoute()
const appliers = ref<any>([])
const vacancies = ref<any>([])
const statuses = ref<any>([])
const users = ref<any>([])
const isLoading = ref(true)
const detailExpanded = ref(null)
const isStatusModal = ref(false)
const currentUser = ref<any>(null)
const isUserModal = ref(false)
const selectedUser = ref<any>(null)
const isLoadMore = ref(true)
const applier_id = ref(null)
const loadMoreLoading = ref(false)
const allData = ref<any>([])
// let lastVisible: any = null
// const options = ref<any>([])

onMounted(async () => {
  await loadMore()
  isLoading.value = false

  if (route.query.id) {
    allData.value = allData.value.filter((item: any) => item.vacancy.id === route.query.id)
  }
})

const loadMore = async () => {
  loadMoreLoading.value = true

  const appliersQuery = query(collection(db, 'appliers'), orderBy('date'))
  const appliersSnapshot = await getDocs(appliersQuery)

  const userIds = [...new Set(appliersSnapshot.docs.map((doc) => doc.data().user_id))]
  const usersQuery = query(collection(db, 'users'), where('id', 'in', userIds))
  const usersPromise = getDocs(usersQuery)

  const vacancyIds = [...new Set(appliersSnapshot.docs.map((doc) => doc.data().vacancy_id))]
  const vacanciesQuery = query(collection(db, 'vacancies'), where('id', 'in', vacancyIds))
  const vacanciesPromise = getDocs(vacanciesQuery)

  const statusesQuery = query(collection(db, 'statuses'))
  const statusesPromise = getDocs(statusesQuery)

  const [usersSnapshot, vacanciesSnapshot, statusesSnapshot] = await Promise.all([
    usersPromise,
    vacanciesPromise,
    statusesPromise,
  ])

  appliers.value = appliersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  users.value = usersSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }))

  vacancies.value = vacanciesSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }))

  statuses.value = statusesSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }))

  allData.value = appliers.value.map((applier: any) => ({
    id: applier.id,
    user: users.value.find((user: any) => user.id === applier.user_id),
    status: statuses.value.find((status: any) => status.id === applier.status_id),
    vacancy: vacancies.value.find((vacancy: any) => vacancy.id === applier.vacancy_id),
  }))
}

const detectScroll = async (event: any) => {
  const element = event.target
  const scrollHeight = element.scrollHeight - window.innerHeight
  if (scrollHeight <= element.scrollTop && !loadMoreLoading.value && isLoadMore.value) {
    await loadMore()
  }
}

const openStatusModal = (applier_id: string, vacancy_id: string) => {
  isStatusModal.value = true
  currentUser.value = {
    applier_id,
    vacancy_id,
  }
}

const toggleAccordion = (value: any, applier: any) => {
  detailExpanded.value = detailExpanded.value === value ? null : value
  applier_id.value = applier.id
}

const removeUser = async (id: string) => {
  await deleteDoc(doc(db, 'appliers', id))
  allData.value = allData.value.filter((item: any) => item.id !== id)
}

const openUserModal = (user: object) => {
  isUserModal.value = true
  selectedUser.value = user
}
</script>
