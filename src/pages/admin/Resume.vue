<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <h2 class="mb-10 text-3xl capitalize">{{ 'title' }}</h2>
    <div>
      <div>
        <div v-for="resume in resumes" class="flex items-center justify-between p-5 mb-5 rounded-md bg-gray-50">
          <button
            @click="downloadResume(resume.id)"
            class="flex justify-start w-1/5 font-semibold text-tg-green hover:opacity-80"
          >
            {{ resume.title }}
          </button>
          <a class="w-1/5" :href="`tel:${resume.phone}`">{{ resume.phone }}</a>
          <a class="w-1/5" href="">{{ getVacancyTitle(resume.vacancy_id) }}</a>
          <a class="hidden w-1/5" :href="`https://t.me/${resume.username}`" target="_blank">{{
            resume.username || 'undefined'
          }}</a>
          <div class="flex justify-end w-1/5 gap-4">
            <button @click="removeUser(resume.id)" class="font-semibold text-red-500 hover:opacity-80">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchData } from '@/composables/fetchData'
import { doc, deleteDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { deleteObject, getDownloadURL } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'

const db = useFirestore()
const resumes = ref<any>([])
// const downloadUrl = ref(null)
const vacancies = ref([])

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
      const resumeRef = storageRef(storage, `users/${item.file_name}`)
      deleteObject(resumeRef).then(() => {})
    }
  })
}

const fileRef = storageRef(storage, 'users/U87lN6CMqgwWlGjnbhKT')

const downloadResume = async (id: string) => {
  console.log(id)
  await getDownloadURL(fileRef).then((url) => {
    console.log('url:', url)
  })
}
</script>
