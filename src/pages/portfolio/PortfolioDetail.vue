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
        <h1 class="text-center text-4xl">{{ option.title }}</h1>
        <button class="text-tg-heading-font-color transition-all duration-300 hover:opacity-80">
          <inline-svg src="svg/close.svg" @click="closeModal" class="h-[18px]" />
        </button>
      </div>
      <div class="h-full overflow-y-auto pb-5">
        <div class="h-full overflow-y-auto px-10 pb-5">
          <div ref="modalContainer" class="rounded-[20px] bg-white py-[60px]">
            <section class="mb-32">
              <div class="flex w-full flex-col items-start gap-6">
                <img :src="option.image" class="h-auto w-full rounded-lg border-2 object-cover max-2xl:mb-10" />
                <div class="w-full">
                  <!-- 1 -->
                  <div class="mb-12 flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <inline-svg fill="none" src="svg/secure.svg" />
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Definition</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        {{ option.definition }}
                      </p>
                    </div>
                  </div>
                  <!-- /1 -->

                  <!-- 2 -->
                  <div class="mb-12 flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <inline-svg fill="none" src="svg/secure.svg" />
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Support 24/7</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        {{ option.support }}
                      </p>
                    </div>
                  </div>
                  <!-- /2 -->

                  <!-- 3 -->
                  <div class="mb-12 flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <inline-svg fill="none" src="svg/secure.svg" />
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Used technologies</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        {{ option.technologies }}
                      </p>
                    </div>
                  </div>
                  <!-- /3 -->

                  <!-- 4 -->
                  <div class="flex">
                    <div class="shrink-0">
                      <div class="rounded-md bg-[hsl(231,52.6%,20%)] p-4 shadow-lg dark:bg-[hsl(231,52.6%,30%)]">
                        <inline-svg fill="none" src="svg/secure.svg" />
                      </div>
                    </div>
                    <div class="ml-4 grow">
                      <p class="mb-2 font-bold">Challenges and Solutions</p>
                      <p class="text-neutral-500 dark:text-neutral-300">
                        {{ option.challenge }}
                      </p>
                    </div>
                  </div>
                  <!-- /4 -->
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
