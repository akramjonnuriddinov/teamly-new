<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <h2 class="mb-10 text-3xl capitalize">{{ title }}</h2>
    <div>
      <div
        class="flex items-center justify-between p-5 mb-5 rounded-md bg-gray-50"
        v-for="(item, index) in vacancies"
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
      <base-button
        class="mt-12"
        @click="createModal()"
        :size="ESize.SMALL"
        :theme="EThemes.DEFAULT"
      >
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
import { ESize, EThemes } from "@/types/types"

const props = defineProps<{
  title: string
}>()

const isShow = ref<Boolean>(false)

const db = useFirestore()

const currentModal = ref(null)

const vacancies = ref<Vacancy[]>()

watch(
  () => props.title,
  async (value) => {
    try {
      const q = query(collection(db, value))
      const querySnapshot = await getDocs(q)
      vacancies.value = []
      querySnapshot.forEach((doc) => {
        const vacancy = ref()
        vacancy.value = doc.data()
        vacancies.value?.push({ id: doc.id, ...vacancy.value })
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
  vacancies.value = vacancies.value?.filter((item: Vacancy) => item.id != id)
}

const editVacancy = async (id: string) => {
  console.log(id)
}
</script>
