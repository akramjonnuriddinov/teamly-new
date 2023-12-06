<template>
  <div @click="statusExpanded.exp = null" class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <div>
      <ul>
        <li
          v-for="(applier, index) in appliers"
          :key="index"
          @click="toggleAccordion(index)"
          class="relative flex flex-col mb-5"
        >
          <div class="flex items-center justify-between h-full p-5 border rounded-md bg-gray-50">
            <button
              @click="downloadResume(applier.id)"
              class="flex justify-start w-1/6 mr-2 font-semibold text-tg-green hover:opacity-80"
            >
              {{ applier.resume.title }}
            </button>
            <a class="w-1/6 mr-2" :href="`tel:${applier.phone}`">{{ applier.resume.phone }}</a>
            <a class="w-1/5 mr-2" href="">{{ getVacancyTitle(applier.vacancy_id) }}</a>
            <a class="w-1/6 mr-2" :href="`https://t.me/${applier.username}`" target="_blank"
              >@{{ applier.resume.username || 'undefined' }}</a
            >
            <div class="flex ml-auto space-x-5">
              <status-bar
                class="hidden"
                @click="isStatusModal = true"
                :statusExpanded="statusExpanded"
                @setStatus="setStatus"
              />
              <button @click="openStatusModal(applier.id)">
                {{ 'submitted' }}
              </button>
              <button @click="removeUser(applier.id)" class="font-medium text-red-500 hover:opacity-80">Remove</button>
            </div>
          </div>
          <status-detail
            :statuses="statuses"
            :applier_id="applier.id"
            :status_id="applier.status_id"
            :expanded="detailExpanded === index"
          />
        </li>
      </ul>
    </div>
  </div>
  <status-modal
    v-if="isStatusModal"
    @closeStatusModal="closeStatusModal"
    :currentUser="currentUser"
    :statuses="statuses"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchData } from '@/composables/fetchData'
import { doc, deleteDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { deleteObject, getDownloadURL } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'
import StatusBar from '@/components/admin/resume/StatusBar.vue'
import { updateDoc, collection } from 'firebase/firestore'
import StatusDetail from '@/components/admin/resume/StatusDetail.vue'
import StatusModal from '@/components/admin/resume/StatusModal.vue'

const db = useFirestore()
const appliers = ref<any>([])
const vacancies = ref<any>([])
const applierStatuses = ref<any>([])
const statuses = ref([])

const statusExpanded = ref({ exp: null })
const detailExpanded = ref(null)
const isStatusModal = ref(false)
const currentUser = ref({
  applier_id: '',
  vacancy_id: '',
})

onMounted(async () => {
  vacancies.value = await fetchData('vacancies')
  statuses.value = await fetchData('statuses')
  applierStatuses.value = await fetchData('applier_statuses')
  const allAppliers = await fetchData('appliers')
  appliers.value = await allAppliers.map((item: any) => ({
    ...item,
    status: statuses.value.find((el: any) => el.id === item.status_id),
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
const getVacancyTitle = (id: string) => {
  const list: any = vacancies.value.filter((item: any) => item.id === id)
  if (list.length) {
    return list[0].title
  }
}
const removeUser = async (id: string) => {
  await deleteDoc(doc(db, 'appliers', id))
  appliers.value.forEach((item: any) => {
    if (item.id == id) {
      const applierRef = storageRef(storage, `users/${item.id}`)
      deleteObject(applierRef)
        .then(() => {
          appliers.value = appliers.value.filter((item: any) => item.id !== id)
        })
        .catch(() => {
          console.error('applier deleted error...')
        })
    }
  })
}
const downloadResume = async (id: string) => {
  getDownloadURL(storageRef(storage, `users/${id}`)).then((url) => {
    window.open(url, '_blank')
  })
}

const docRef = doc(collection(db, 'appliers'), '6oQLLk06Rm5mUqpYrr3y')
const setStatus = async () => {
  try {
    await updateDoc(docRef, {
      status: 'newStatus',
    })
  } catch (error) {
    console.error('error updating status...', error)
  } finally {
  }
}
</script>
