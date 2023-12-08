<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <div>
      <ul>
        <li
          v-for="(applier, index) in appliers"
          :key="index"
          @click="toggleAccordion(index)"
          class="relative flex flex-col mb-5"
        >
          <div class="flex items-center justify-between h-full p-5 border rounded-md bg-gray-50">
            <button class="mr-4 duration-300 text-tg-paragraph-color transition-color hover:text-tg-heading-font-color">
              <inline-svg title="Show history" class="w-5 h-5" src="history.svg" />
            </button>
            <button
              @click.stop="openUserModal(applier.user)"
              title="View Profile"
              class="flex justify-start w-1/6 mr-2 font-semibold text-tg-green hover:opacity-80"
            >
              {{ applier.user.name }}
            </button>
            <a @click.stop class="w-1/5 mr-2" href="#">{{ applier.vacancy }}</a>
            <a @click.stop class="w-1/6 mr-2" :href="`mailto://${applier.user.email}`">{{
              applier.user.email || 'email undefined'
            }}</a>
            <div class="flex ml-auto space-x-5">
              <button
                @click.stop="openStatusModal(applier.id)"
                :style="`
                  background-color: ${applier?.applierStatus?.color}44;
                  color: ${applier?.applierStatus?.color};
                `"
                class="px-3 text-sm opacity-90 rounded-full py-[2px]"
              >
                <span v-if="applier.status">{{ applier.status.status }}</span>
                <span v-else class="bg-yellow-300 px-3 text-yellow-900 rounded-full py-[2px]">submitted</span>
              </button>
              <button @click.stop="removeUser(applier.id)" class="font-medium text-red-500 hover:opacity-80">
                Remove
              </button>
            </div>
          </div>
          <status-detail :applier_id="applier.id" :status_id="applier.status_id" :expanded="detailExpanded === index" />
        </li>
      </ul>
    </div>
  </div>
  <status-modal
    v-if="isStatusModal"
    @close="closeStatusModal"
    :currentUser="currentUser"
    :statuses="statuses"
  />
  <user-modal v-if="isUserModal" :user="selectedUser" @close="closeUserModal" />
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

const db = useFirestore()
const appliers = ref<any>([])
const vacancies = ref<any>([])
const applierStatuses = ref<any>([])
const statuses = ref<any>([])
const users = ref<any>([])

const detailExpanded = ref(null)
const isStatusModal = ref(false)
const currentUser = ref({
  applier_id: '',
  vacancy_id: '',
})
const isUserModal = ref(false)
const selectedUser = ref<any>(null)

onMounted(async () => {
  vacancies.value = await fetchData('vacancies')
  statuses.value = await fetchData('statuses')
  users.value = await fetchData('users')
  applierStatuses.value = await fetchData('applier_statuses')
  const allAppliers = await fetchData('appliers')
  appliers.value = await allAppliers.map((item: any) => ({
    id: item.id,
    status: statuses.value.find((el: any) => el.id === item.status_id),
    user: users.value.find((el: any) => el.id === item.user_id),
    vacancy: vacancies.value.find((el: any) => el.id === item.vacancy_id).title,
    applierStatus: applierStatuses.value.find((el: any) => el.applier_id === item.id),
  }))
})

const closeStatusModal = () => {
  isStatusModal.value = false
}
const openStatusModal = (id: string) => {
  isStatusModal.value = true
  appliers.value.forEach((item: any) => {
    if (item.id == id) {
      currentUser.value.vacancy_id = item.vacancy_id
      currentUser.value.applier_id = item.id
    }
  })
}
const toggleAccordion = (value: any) => {
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
const closeUserModal = () => {
  isUserModal.value = false
}
</script>
