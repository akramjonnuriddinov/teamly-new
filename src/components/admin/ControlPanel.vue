<template>
  <div class="flex flex-col w-full h-screen p-8 overflow-y-scroll">
    <h2 class="mb-10 text-3xl capitalize">{{ title }}</h2>
    <div v-if="isLoading" class="flex justify-center">
      <div class="loader">
        <div class="loader-outter"></div>
        <div class="loader-inner"></div>
      </div>
    </div>
    <div v-else>
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
      <base-button class="mt-12" @click="createModal" :size="ESize.SMALL">
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
import type { Vacancy } from "@/types"
import BaseButton from "@/components/reusables/BaseButton.vue"
import { ESize } from "@/types"

const props = defineProps<{
  title: string
}>()

const isShow = ref<Boolean>(false)

const db = useFirestore()

const currentModal = ref(null)

const vacancies = ref<Vacancy[]>()

const isLoading = ref(true)

watch(
  () => props.title,
  async (value) => {
    try {
      isLoading.value = true
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
    } finally {
      isLoading.value = false
      console.log("done...")
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
  console.log("vacancies-value: ", vacancies.value)
  await deleteDoc(doc(db, "vacancies", id))
  vacancies.value = vacancies.value?.filter((item: Vacancy) => item.id != id)
}

const editVacancy = async (id: string) => {
  console.log(id)
}
</script>

<style scoped>
#preloader {
  background-color: #fff;
  opacity: 1;
  height: 100%;
  width: 100%;
  position: fixed;
  margin-top: 0px;
  top: 0px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-center {
  width: 100%;
  height: 100%;
  position: relative;
}

.loader {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 75px;
  display: inline-block;
  vertical-align: middle;
}

.loader-outter {
  position: absolute;
  border: 4px solid #7e54f8;
  border-left-color: transparent;
  border-bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  -webkit-animation: loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
    infinite;
  animation: loader-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
}

.loader-inner {
  position: absolute;
  border: 4px solid #7e54f8;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  border-right: 0;
  border-top-color: transparent;
  -webkit-animation: loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41)
    infinite;
  animation: loader-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
}
@keyframes loader-inner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@keyframes loader-outter {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
