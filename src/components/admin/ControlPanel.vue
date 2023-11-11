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
      <base-button @click="createModal()" styles="mt-12 py-[13px] px-[60px]">
        Create
      </base-button>
    </div>
  </div>
  <component
    :is="currentModal"
    v-if="isShow"
    :input="selectedItem"
    @edit="editVacancy"
    @close="isShow = false"
  />
</template>

<script setup lang="ts">
import { ref, watch, defineAsyncComponent } from "vue"
import { collection, query, getDocs } from "firebase/firestore"
import { doc, deleteDoc } from "firebase/firestore"
import { useFirestore } from "vuefire"
import type { Vacancy } from "@/types/types"
import BaseButton from "@/components/reusables/BaseButton.vue"

const props = defineProps(["title"])

const isShow = ref(false)

const db = useFirestore()

const currentModal = ref(null)

const options = ref<Vacancy[]>([])

watch(
  () => props.title,
  async (value) => {
    try {
      const q = query(collection(db, value))
      const querySnapshot = await getDocs(q)
      options.value = []
      querySnapshot.forEach((doc) => {
        const vacancy = ref<Vacancy>()
        vacancy.value = doc.data()
        console.log("watch: ", vacancy.value)
        options.value.push({ id: doc.id, ...vacancy.value })
      })
      currentModal.value = defineAsyncComponent(
        () => import(`../admin/modals/${props.title}.vue`)
      )
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  },
  {
    immediate: true,
  }
)

const selectedItem = ref<Vacancy | null>(null)
const editOption = (item: Vacancy) => {
  selectedItem.value = item
  isShow.value = true
}

const createModal = () => {
  isShow.value = true
  selectedItem.value = null
}

const removeVacancy = async (id: string) => {
  await deleteDoc(doc(db, "vacancies", id))
  options.value = options.value.filter((item: Vacancy) => item.id != id)
}

const editVacancy = async (id: string) => {
  console.log(id)
}
</script>
