<template>
  <section
    @click="$emit('close')"
    class="bottom-0 flex justify-center right-0 modal bg-[#00000080] fixed top-0 left-0 w-[100vw] z-[999]"
  >
    <div
      class="w-[70%] flex flex-col pt-[100px] max-[600px]:w-[90%] apply-form max-[990px]:pb-[200px] max-[990px]:overflow-y-auto"
    >
      <button
        class="self-end mb-4 transition-all duration-300 text-tg-white hover:text-tg-secondary-color"
        @click="$emit('close')"
      >
        <close-icon />
      </button>
      <div @click.stop class="p-8 bg-white rounded-xl">
        <form @submit.prevent="submitForm()">
          <div
            class="flex items-center justify-between gap-4 max-[800px]:flex-col"
          >
            <div class="mb-6 w-[45%] max-[800px]:w-full max-[800px]:mb-0">
              <label for="name" class="block mb-2">Full name</label>
              <input
                class="p-2.5 border rounded-lg w-full outline-none"
                v-model="resume.name"
                type="text"
                id="name"
                placeholder="Full name"
                autocomplete="off"
                required
              />
            </div>
            <div class="mb-6 w-[45%] max-[800px]:w-full">
              <label for="text" class="block mb-2">Phone number</label>
              <input
                class="p-2.5 border rounded-lg w-full outline-none"
                v-model="resume.phone"
                type="text"
                id="text"
                placeholder="Phone number"
                autocomplete="off"
                required
              />
            </div>
          </div>
          <div
            class="flex items-start justify-between gap-4 max-[800px]:flex-col-reverse"
          >
            <div class="w-[45%] max-[800px]:w-full relative">
              <div class="w-full mb-6">
                <input
                  class="p-2.5 border rounded-lg w-full outline-none"
                  v-model="resume.type"
                  type="text"
                  placeholder="VueJS"
                  autocomplete="off"
                  required
                />
              </div>
              <ul
                v-if="false"
                class="absolute rounded-lg shadow-2xl top-[50px] w-full px-4 bg-white ounded-lg max-[990px]:overflow-y-auto"
              >
                <li
                  class="flex items-center justify-between py-2 transition-all border-b cursor-pointer text-tg-heading-font-color hover:text-tg-body-font-color"
                  v-for="job in jobs"
                >
                  <span>{{ job.title }}</span>
                  <check-icon />
                </li>
              </ul>
            </div>
            <div
              class="mb-6 w-[45%] max-[800px]:w-full relative max-[800px]:mb-0"
            >
              <label for="file-input" class="sr-only"></label>
              <input
                class="block w-full p-3 text-sm border border-gray-200 rounded-md shadow-sm file:hidden"
                type="file"
                name="file-input"
                id="file-input"
              />
            </div>
          </div>

          <button
            class="w-full bg-tg-primary-color text-tg-white rounded-[10px] font-bold inline-block text-center whitespace-nowrap py-[18px] px-[120px] tracking-[0.5px] transition-all duration-300 hover:bg-tg-secondary-color"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue"
import CloseIcon from "@/components/icons/CloseIcon.vue"
import CheckIcon from "@/components/icons/CheckIcon.vue"

const jobs = ref([
  {
    id: "1",
    title: "Frontend - VueJS",
  },
  {
    id: "2",
    title: "Backend - Python",
  },
  {
    id: "3",
    title: "UX/UI - Designer",
  },
  {
    id: "4",
    title: "HR manager",
  },
])

// onUpdated(() => {
//   if (store.isShow) {
//     document.body.classList.add("overflow-hidden")
//   } else {
//     document.body.classList.remove("overflow-hidden")
//   }
// })

// FIREBASE

const all = ref([]) as any
const resume = ref({
  id: "uuidv4()",
  name: "",
  phone: "",
  type: "",
  file: "",
})

const submitForm = () => {
  all.value.unshift(resume.value)
}
</script>

<style scoped>
.apply-form::-webkit-scrollbar {
  display: none;
}

.apply-form {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
