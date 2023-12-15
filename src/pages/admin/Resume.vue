<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll" @scroll="detectScroll">
    <div>
      <h2 class="mb-10 text-3xl capitalize">Appliers</h2>
      <div v-if="isLoading" class="flex justify-center py-20">
        <app-loader />
      </div>
      <ul v-else-if="appliers.length">
        <template v-for="(applier, index) in appliers" :key="index">
          <li v-if="applier.user" class="relative flex flex-col mb-5">
            <div class="flex items-center justify-between h-full p-5 border rounded-md bg-gray-50">
              <button
                @click="toggleAccordion(index)"
                class="mr-4 duration-300 text-tg-paragraph-color transition-color hover:text-tg-heading-font-color"
              >
                <inline-svg title="Show history" class="w-5 h-5" src="history.svg" />
              </button>
              <button
                @click.stop="openUserModal(applier.user)"
                title="View Profile"
                class="flex justify-start w-1/5 mr-2 overflow-hidden font-semibold text-center whitespace-nowrap text-ellipsis text-tg-green hover:opacity-80"
              >
                {{ applier.user.name }}
              </button>
              <a @click.stop class="w-1/5 mr-2" href="#">{{ applier.vacancy.title }}</a>
              <a @click.stop class="w-1/6 mr-2" :href="`mailto://${applier.user.email}`">{{
                applier.user.email || 'email undefined'
              }}</a>
              <div class="flex ml-auto space-x-5">
                <button
                  v-if="applier.status?.title"
                  @click.stop="openStatusModal(applier.id, applier.vacancy.id)"
                  :style="`
                    background-color: ${applier.status?.color}44;
                    color: ${applier.status?.color};
                  `"
                  class="px-3 text-sm opacity-90 rounded-full py-[2px]"
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
import { useFirestore } from 'vuefire'
import StatusDetail from '@/components/admin/resume/StatusDetail.vue'
import StatusModal from '@/components/admin/resume/StatusModal.vue'
import InlineSvg from '@/components/reusables/InlineSvg.vue'
import UserModal from '@/components/admin/resume/UserModal.vue'
import AppLoader from '@/components/static/AppLoader.vue'
import { useRoute } from 'vue-router'
import { collection, query, getDocs, limit, orderBy, startAfter } from 'firebase/firestore'
import ButtonLoader from '@/components/static/ButtonLoader.vue'

const route = useRoute()
const db = useFirestore()
const appliers = ref<any>([])
const vacancies = ref<any>([])
const applierStatuses = ref<any>([])
const statuses = ref<any>([])
const users = ref<any>([])
const isLoading = ref(true)
const isLoading2 = ref(false)

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
    vacancies.value = await fetchData('vacancies')
    statuses.value = await fetchData('statuses')
    users.value = await fetchData('users')
    appliers.value = await options.value.map((item: any) => ({
      id: item.id,
      status: statuses.value.find((el: any) => el.id === item.status_id),
      user: users.value.find((el: any) => el.id === item.user_id),
      vacancy: vacancies.value.find((el: any) => el.id === item.vacancy_id),
      applierStatus: applierStatuses.value.find((el: any) => el.applier_id === item.id),
    }))
    isLoading2.value = false
  } else {
    isLoadMore.value = false
    console.log('No more documents to load.')
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

const loadApplierStatuses = async () => {
  if (!applierStatuses.value.length) {
    console.log('laod')
    applierStatuses.value = await fetchData('applier_statuses')
  }
  isApplierStatusesReady.value = true
}

const openStatusModal = (applier_id: string, vacancy_id: string) => {
  isStatusModal.value = true
  currentUser.value = {
    applier_id,
    vacancy_id,
  }
}
const toggleAccordion = (value: any) => {
  loadApplierStatuses()
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
