<template>
  <section
    @click="closeModal"
    class="fixed left-0 top-0 z-[10000] flex h-full min-h-screen w-[100vw] items-center justify-center bg-[#00000080] p-10"
  >
    <div
      @click.stop
      class="container relative mx-auto flex h-full w-full flex-col overflow-y-hidden rounded-xl bg-white max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div class="sticky top-0 z-50 mb-5 flex w-full items-center justify-between bg-white px-10 py-5">
        <h2 class="text-center text-4xl max-[600px]:text-2xl max-[500px]:text-xl">{{ option.title }}</h2>
        <button class="text-tg-heading-font-color transition-all duration-300 hover:opacity-80">
          <inline-svg src="svg/close.svg" @click="closeModal" class="h-[18px]" />
        </button>
      </div>
      <div class="h-full overflow-y-auto pb-5">
        <div class="h-full overflow-y-auto px-10 pb-5">
          <div ref="modalContainer" class="flex h-full flex-col justify-between rounded-[20px] bg-white py-[10px]">
            <section class="portfolio-modal mb-32">
              <div class="flex w-full flex-col items-start gap-6">
                <img
                  :src="option.image"
                  class="h-auto w-full rounded-lg border-2 object-cover max-2xl:mb-10 max-[600px]:mb-5"
                />
                <div class="w-full">
                  <div class="mb-12 flex">
                    <div class="pl-[64px]" v-html="option.text"></div>
                  </div>
                </div>
              </div>
            </section>
            <div class="-mx-3 mt-auto flex flex-wrap justify-center max-[500px]:flex-col-reverse">
              <div class="w-1/2 px-3 max-[500px]:mt-5 max-[500px]:w-full">
                <button
                  @click="closeModal"
                  ref="trigger"
                  class="border-stroke text-dark block w-full rounded-md border p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
              <div class="w-1/2 px-3 max-[500px]:w-full">
                <a
                  v-if="option.link !== '0'"
                  :href="option.link"
                  target="_blank"
                  class="hover:bg-blue-dark block w-full rounded-md bg-tg-dark-blue-color p-3 text-center text-base font-medium text-white transition"
                >
                  Live Priview
                </a>
                <button
                  v-else
                  disabled
                  class="block w-full cursor-not-allowed rounded-md p-3 text-center text-base font-medium text-white transition disabled:bg-[#D1D5DB]"
                >
                  Preview(Private)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import InlineSvg from '@/components/InlineSvg.vue'

const modalContainer = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const emits = defineEmits<{
  (e: 'openModal', value: boolean): void
  (e: 'close'): void
}>()
defineProps(['option'])

const handleClickOutside = (event: MouseEvent): void => {
  if (
    modalContainer.value &&
    trigger.value &&
    !modalContainer.value.contains(event.target as Node) &&
    event.target !== trigger.value
  ) {
    emits('openModal', false)
  }
}

const closeModal = () => emits('close')

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
.portfolio-modal h2 {
  @apply relative mb-2 flex items-center justify-start gap-2 font-bold;
}

.portfolio-modal h2::before {
  position: absolute;
  top: 0;
  left: -64px;
  content: '';
  width: 56px;
  height: 56px;
  border-radius: 100%;
  background-image: url('@/assets/images/svg/secure.svg');
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
  @apply rounded-md bg-[hsl(231,52.6%,20%)] p-4 text-tg-white shadow-lg dark:bg-[hsl(231,52.6%,30%)] max-[600px]:h-[40px] max-[600px]:w-[40px];
}

.portfolio-modal p {
  @apply mb-12 text-neutral-500 dark:text-neutral-300 max-[600px]:mb-6;
}
</style>
