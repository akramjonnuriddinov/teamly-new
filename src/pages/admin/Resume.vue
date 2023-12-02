<template>
  <div @click="statusExpanded.exp = null" class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <div>
      <ul>
        <li
          v-for="(resume, index) in resumes"
          :key="index"
          @click="toggleAccordion(index)"
          class="relative flex flex-col mb-5"
        >
          <div class="flex items-center justify-between h-full p-5 border rounded-md bg-gray-50">
            <button
              @click="downloadResume(resume.id)"
              class="flex justify-start w-1/6 mr-2 font-semibold text-tg-green hover:opacity-80"
            >
              {{ resume.title }}
            </button>
            <a class="w-1/6 mr-2" :href="`tel:${resume.phone}`">{{ resume.phone }}</a>
            <a class="w-1/5 mr-2" href="">{{ getVacancyTitle(resume.vacancy_id) }}</a>
            <a class="w-1/6 mr-2" :href="`https://t.me/${resume.username}`" target="_blank"
              >@{{ resume.username || 'undefined' }}</a
            >
            <div class="flex ml-auto space-x-5">
              <status-bar
                class="hidden"
                @click="isStatusModal = true"
                :statusExpanded="statusExpanded"
                @setStatus="setStatus"
              />
              <button @click="openStatusModal(resume.id)">status</button>
              <button @click="removeUser(resume.id)" class="font-medium text-red-500 hover:opacity-80">Remove</button>
            </div>
          </div>
          <status-detail :applayer_id="resume.id" :expanded="detailExpanded === index" />
        </li>
      </ul>
    </div>
  </div>
  <status-modal :currentUser="currentUser" v-if="isStatusModal" @closeStatusModal="closeStatusModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
const resumes = ref<any>([])
const vacancies = ref([])

const statusExpanded = ref({ exp: null })
const detailExpanded = ref(null)
const isStatusModal = ref(false)
const currentUser = ref({
  applayer_id: '',
  vacancy_id: '',
})

const closeStatusModal = () => {
  isStatusModal.value = false
}

const openStatusModal = (id: string) => {
  isStatusModal.value = true
  resumes.value.forEach((item: any) => {
    if (item.id == id) {
      currentUser.value.vacancy_id = item.vacancy_id
      currentUser.value.applayer_id = item.id
    }
  })
  console.log(id)
}

const toggleAccordion = (value: any) => {
  detailExpanded.value = detailExpanded.value === value ? null : value
}

const docRef = doc(collection(db, 'resume'), '6oQLLk06Rm5mUqpYrr3y')
const setStatus = async () => {
  try {
    await updateDoc(docRef, {
      status: 'newStatus',
    })
    console.log('updating status...')
  } catch (error) {
    console.error('error updating status...', error)
  } finally {
    console.log('updated status sucessfully...')
  }
}

fetchData('resume').then((result) => {
  resumes.value = result
})
fetchData('vacancies').then((result) => {
  vacancies.value = result
})

const getVacancyTitle = (id: string) => {
  const list: any = vacancies.value.filter((item: any) => item.id === id)
  if (list.length) {
    return list[0].title
  }
}

const removeUser = async (id: string) => {
  await deleteDoc(doc(db, 'resume', id))
  resumes.value.forEach((item: any) => {
    if (item.id == id) {
      const resumeRef = storageRef(storage, `users/${item.id}`)
      deleteObject(resumeRef)
        .then(() => {
          resumes.value = resumes.value.filter((item: any) => item.id !== id)
        })
        .catch(() => {
          console.error('resume deleted error...')
        })
    }
  })
}

const downloadResume = async (id: string) => {
  getDownloadURL(storageRef(storage, `users/${id}`)).then((url) => {
    window.open(url, '_blank')
  })
}
</script>
