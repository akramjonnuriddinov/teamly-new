<template>
  <div class="flex h-screen w-full flex-col overflow-y-scroll p-8" @scroll="detectScroll">
    <div>
      <h2 class="mb-10 text-3xl capitalize">Appliers</h2>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <ul v-else-if="appliers.length">
        <template v-for="(applier, index) in appliers" :key="index">
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
            <status-detail
              v-if="isApplierStatusesReady"
              :applier_id="applier.id"
              :status_id="applier.status_id"
              :expanded="detailExpanded === index"
              :statuses="statuses"
            />
          </li>
        </template>
        <div v-if="isLoading2" class="flex justify-center">
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
import { fetchData } from '@/composables/fetchData'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import StatusDetail from '@/pages/admin/StatusDetail.vue'
import StatusModal from '@/pages/admin/StatusModal.vue'
import InlineSvg from '@/components/InlineSvg.vue'
import UserModal from '@/pages/admin/UserModal.vue'
import AppLoader from '@/components/AppLoader.vue'
import { useRoute } from 'vue-router'
import { collection, query, getDocs, limit, orderBy, startAfter } from 'firebase/firestore'
import ButtonLoader from '@/components/ButtonLoader.vue'
import { fetchDataWithWhere } from '@/composables/fetchDataWithWhere'
import { useAllVacanciesStore } from '@/store/allVacancies'

const route = useRoute()
const appliers = ref<any>([])
const vacancies = ref<any>([])
const applierStatuses = ref<any>([])
const statuses = ref<any>([])
const users = ref<any>([])
const isLoading = ref(true)
const isLoading2 = ref(false)
const allVacancies = useAllVacanciesStore()

const detailExpanded = ref(null)
const isStatusModal = ref(false)
const currentUser = ref<any>(null)
const isUserModal = ref(false)
const selectedUser = ref<any>(null)
let lastVisible: any = null
const options = ref<any>([])
const isLoadMore = ref(true)

async function loadMore() {
  const q = query(collection(db, 'appliers'), orderBy('date'), startAfter(lastVisible), limit(20))

  const querySnapshot = await getDocs(q)

  if (querySnapshot.docs.length > 0) {
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

    querySnapshot.forEach((doc) => {
      const item = ref()
      item.value = doc.data()
      options.value.push({ ...item.value, id: doc.id })
    })

    isLoading2.value = true
    await allVacancies.fetchVacancy()
    vacancies.value = allVacancies.vacancies // only the required vacancies should be loaded
    statuses.value = await fetchData('statuses') // only the required statuses should be loaded
    users.value = await fetchData('users') // only the required users should be loaded
    appliers.value = options.value.map((item: any) => ({
      id: item.id,
      status: statuses.value.find((el: any) => el.id === item.status_id),
      user: users.value.find((el: any) => el.id === item.user_id),
      vacancy: vacancies.value.find((el: any) => el.id === item.vacancy_id),
      applierStatus: applierStatuses.value.find((el: any) => el.applier_id === item.id),
    }))
    isLoading2.value = false
  } else {
    isLoadMore.value = false
    console.info('No more documents to load...')
  }
}

const detectScroll = async (event: any) => {
  const element = event.target
  const scrollHeight = element.scrollHeight - window.innerHeight
  if (scrollHeight <= element.scrollTop && !isLoading2.value && isLoadMore.value) {
    await loadMore()
  }
}

onMounted(async () => {
  await loadMore()
  isLoading.value = false

  if (route.query.id) {
    appliers.value = await appliers.value.filter((item: any) => item.vacancy.id === route.query.id)
  }
})

const isApplierStatusesReady = ref(false)

const loadApplierStatuses = async (applier: any) => {
  try {
    // Check if applier statuses are already loaded
    if (!applierStatuses.value.length) {
      applierStatuses.value = await fetchDataWithWhere('applier_statuses', 'applier_id', '==', applier.id)
      // Fetch applier statuses for the given applier
    }

    // Set data and update the flag
    isApplierStatusesReady.value = true
  } catch (error) {
    console.error('Error loading applier statuses:', error)
    isApplierStatusesReady.value = false
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
  loadApplierStatuses(applier)
  detailExpanded.value = detailExpanded.value === value ? null : value
}
const removeUser = async (id: string) => {
  await deleteDoc(doc(db, 'appliers', id))
  appliers.value = appliers.value.filter((item: any) => item.id !== id)
}

const openUserModal = (user: object) => {
  isUserModal.value = true
  selectedUser.value = user
}
</script>
