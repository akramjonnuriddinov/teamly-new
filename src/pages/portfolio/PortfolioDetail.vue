<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const modalOpen = ref(false)
const modalContainer = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)

const setModalOpen = (value: boolean): void => {
  modalOpen.value = value
}

const handleClickOutside = (event: MouseEvent): void => {
  if (
    modalContainer.value &&
    trigger.value &&
    !modalContainer.value.contains(event.target as Node) &&
    event.target !== trigger.value
  ) {
    setModalOpen(false)
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="container mx-auto py-5">
    <button
      ref="trigger"
      @click.stop="setModalOpen(true)"
      class="rounded-full bg-tg-dark-blue-color px-6 py-3 text-base font-medium text-white"
    >
      Open Modal
    </button>
    <div
      class="fixed left-0 top-0 z-[1000] flex h-full min-h-screen w-full items-center justify-center bg-tg-dark-blue-color/90 px-4 py-5"
      :class="{ block: modalOpen, hidden: !modalOpen }"
    >
      <div
        ref="modalContainer"
        class="dark:bg-tg-dark-blue-color-2 w-full max-w-[570px] rounded-[20px] bg-white px-8 py-12 text-center md:px-[70px] md:py-[60px]"
      >
        <h3 class="text-dark pb-[18px] text-xl font-semibold dark:text-white sm:text-2xl">
          Your Message Sent Successfully
        </h3>
        <span class="mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-tg-dark-blue-color"></span>
        <p class="text-body-color dark:text-dark-6 mb-10 text-base leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since
        </p>
        <div class="-mx-3 flex flex-wrap">
          <div class="w-1/2 px-3">
            <button
              @click="setModalOpen(false)"
              ref="trigger"
              class="border-stroke text-dark block w-full rounded-md border p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white"
            >
              Cancel
            </button>
          </div>
          <div class="w-1/2 px-3">
            <button
              class="hover:bg-blue-dark block w-full rounded-md border border-tg-dark-blue-color bg-tg-dark-blue-color p-3 text-center text-base font-medium text-white transition"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
