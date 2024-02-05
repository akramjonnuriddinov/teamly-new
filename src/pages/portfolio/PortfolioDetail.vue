<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

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

<template>
  <section
    class="fixed left-0 top-0 z-[10000] flex h-full min-h-screen w-[100vw] items-center justify-center bg-[#00000080] p-10"
    @click="$emit('close')"
  >
    <div
      @click.stop
      class="container relative mx-auto flex h-full w-full flex-col overflow-y-hidden rounded-xl bg-white max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
    >
      <div class="sticky top-0 z-50 mb-5 flex w-full items-center justify-between bg-white px-10 py-5">
        <h1 class="text-center text-4xl">{{ 'title' }}</h1>
        <button class="text-tg-heading-font-color transition-all duration-300 hover:opacity-80">
          <close-icon class="h-[18px]" @click="closeModal" />
        </button>
      </div>
      <div class="h-full overflow-y-auto pb-5">
        <div class="h-full overflow-y-auto px-10 pb-5">
          <div ref="modalContainer" class="rounded-[20px] bg-white py-[60px]">
            <section class="mb-32">
              <div class="flex w-full flex-wrap items-start gap-6">
                <img :src="option.image" class="h-auto w-full max-w-[500px] rounded-lg object-cover max-2xl:mb-10" />
                <div class="w-full max-w-[600px] max-[1280px]:max-w-full">
                  <div class="mb-12 flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Support 24/7</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil quisquam quibusdam modi sapiente
                        magni molestias pariatur facilis reprehenderit facere aliquam ex.
                      </p>
                    </div>
                  </div>

                  <div class="mb-12 flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Safe and solid</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        Eum nostrum fugit numquam, voluptates veniam neque quibusdam ullam aspernatur odio soluta,
                        quisquam dolore animi mollitia a omnis praesentium, expedita nobis!
                      </p>
                    </div>
                  </div>

                  <div class="mb-12 flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Extremely fast</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        Enim cupiditate, minus nulla dolor cumque iure eveniet facere ullam beatae hic voluptatibus
                        dolores exercitationem? Facilis debitis aspernatur amet nisi iure eveniet facere?
                      </p>
                    </div>
                  </div>

                  <div class="flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="h-6 w-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Live analytics</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        Illum doloremque ea, blanditiis sed dolor laborum praesentium maxime sint, consectetur atque
                        ipsum ab adipisci ullam aspernatur odio soluta, quisquam dolore
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div class="-mx-3 flex flex-wrap justify-center">
              <div class="w-1/2 px-3">
                <button
                  @click="closeModal"
                  ref="trigger"
                  class="border-stroke text-dark block w-full rounded-md border p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  Cancel
                </button>
              </div>
              <div class="w-1/2 px-3">
                <a
                  v-if="option.link"
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
