<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <h2 class="mb-10 text-3xl capitalize">{{ 'title' }}</h2>
    <div>
      <div>
        <div v-for="resume in resumes" class="flex items-center justify-between p-5 mb-5 rounded-md bg-gray-50">
          <h3 class="w-1/4">{{ resume.title }}</h3>
          <a class="w-1/4" :href="`tel:${resume.phone}`">{{ resume.phone }}</a>
          <a class="w-1/4" :href="`https://t.me/${resume.username}`" target="_blank">{{
            resume.username || 'undefined'
          }}</a>
          <div class="flex justify-end w-1/4 gap-4">
            <button class="font-semibold text-tg-green hover:opacity-80">Dowload</button>
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
import { deleteObject } from 'firebase/storage'
import { storageRef, storage } from '@/firebase'

const db = useFirestore()
const resumes = ref<any>([])

fetchData('resume').then((result) => {
  resumes.value = result
})

const removeUser = async (id: string) => {
  await deleteDoc(doc(db, 'resume', id))
  resumes.value.forEach((item: any) => {
    if (item.id == id) {
      const resumeRef = storageRef(storage, `users/${item.file_name}`)
      deleteObject(resumeRef).then(() => {})
    }
  })
}
</script>
