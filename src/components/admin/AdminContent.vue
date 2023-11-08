<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <h2 class="mb-10 text-3xl capitalize">{{ title }}</h2>
    <div>
      <div
        class="flex items-center justify-between p-5 mb-5 rounded-md bg-gray-50"
        v-for="(item, index) in options"
        :key="index"
      >
        <h3>
          {{ item.title }}
        </h3>
        <div class="flex gap-4">
          <button
            @click="editOption(item)"
            class="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            @click="removeVacancy(item.id)"
            class="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        @click="createModal()"
        class="bg-tg-primary-color mt-12 text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[60px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
      >
        Create
      </button>
    </div>
  </div>
  <admin-modal
    v-if="isShow"
    :input="selectedItem"
    @edit="editVacancy"
    @close="isShow = false"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { collection, query, getDocs } from "firebase/firestore"
import { doc, deleteDoc } from "firebase/firestore"
import { useFirestore } from "vuefire"
import AdminModal from "@/components/admin/AdminModal.vue"
import { Vacancy } from "./models"

defineProps(["title"])

const isShow = ref(false)

const db = useFirestore()

const options = ref<Array<Vacancy>>([])
onMounted(async () => {
  try {
    const q = query(collection(db, "vacancies"))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      const job: Vacancy = {
        id: doc.id,
        title: doc.data().title,
        category: doc.data().category,
        location: doc.data().location,
        time: doc.data().time,
        text: doc.data().text,
        requirements: doc.data().requirements,
        tasks: doc.data().tasks,
      }
      options.value.push(job)
    })
  } catch (error) {
    console.error("Error fetching data:", error)
  }
})

const selectedItem = ref<Vacancy | null>(null)
const editOption = (item: Vacancy) => {
  selectedItem.value = item
  isShow.value = true
}

const createModal = () => {
  isShow.value = true
  selectedItem.value = null
}

const removeVacancy = async (id: any) => {
  options.value = options.value.filter((item: Vacancy) => item.id != id)
  await deleteDoc(doc(db, "vacancies", id))
}

const editVacancy = async (id: any) => {
  console.log(id)
}
</script>
