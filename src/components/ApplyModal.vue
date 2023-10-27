<template>
  <section
    v-if="store.isShow"
    @click="store.isShow = false"
    class="bottom-0 flex justify-center right-0 modal bg-[#00000080] h-[100vh] fixed top-0 left-0 w-[100vw] z-[999]"
  >
    <div
      class="w-[70%] flex flex-col pt-[100px] max-[600px]:w-[90%] apply-form"
    >
      <button
        class="self-end mb-4 transition-all duration-300 text-tg-white hover:text-tg-secondary-color"
        @click="store.isShow = false"
      >
        <svg
          class="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
      <div @click.stop class="p-8 bg-white rounded-xl">
        <form>
          <div
            class="flex items-center justify-between gap-4 max-[800px]:flex-col"
          >
            <div class="mb-6 w-[45%] max-[800px]:w-full max-[800px]:mb-0">
              <label for="name" class="block mb-2">Full name</label>
              <input
                type="text"
                id="name"
                class="p-2.5 border rounded-lg w-full outline-none"
                placeholder="Full name"
                autocomplete="off"
                required
              />
            </div>
            <div class="mb-6 w-[45%] max-[800px]:w-full">
              <label for="text" class="block mb-2">Phone number</label>
              <input
                type="text"
                id="text"
                class="p-2.5 border rounded-lg w-full outline-none"
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
                  type="text"
                  class="p-2.5 border rounded-lg w-full outline-none"
                  placeholder="VueJS"
                  autocomplete="off"
                  required
                />
              </div>
              <ul
                v-if="!isShow"
                class="absolute rounded-lg shadow-2xl top-[50px] w-full px-4 bg-white ounded-lg max-[990px]:overflow-y-auto"
              >
                <li
                  class="flex items-center justify-between py-2 transition-all border-b cursor-pointer text-tg-heading-font-color hover:text-tg-body-font-color"
                  v-for="job in jobs"
                >
                  <span>{{ job.title }}</span>
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.00004 11.17L1.83004 6.99996L0.415039 8.41496L6.00004 14L18 1.99996L16.585 0.584961L6.00004 11.17Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
              </ul>
            </div>
            <div
              class="mb-6 w-[45%] max-[800px]:w-full relative max-[800px]:mb-0"
            >
              <label for="file-input" class="sr-only"></label>
              <input
                type="file"
                name="file-input"
                id="file-input"
                class="block w-full p-3 text-sm border border-gray-200 rounded-md shadow-sm file:hidden"
              />
            </div>
          </div>

          <button
            type="submit"
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
import { ref, onUpdated } from "vue"
import { useColorStore } from "@/store"

const store = useColorStore()

const isShow = ref(false)
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

onUpdated(() => {
  if (store.isShow) {
    document.body.classList.add("overflow-hidden")
  } else {
    document.body.classList.remove("overflow-hidden")
  }
})
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
