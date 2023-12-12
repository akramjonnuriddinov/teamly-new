<template>
  <section
    class="bg-[#00000080] min-h-screen flex justify-center items-center p-10 fixed top-0 left-0 w-[100vw] z-50"
    :class="height"
    @click="$emit('close')"
  >
    <div
      @click.stop
      class="container rounded-xl flex flex-col overflow-y-hidden bg-white h-full relative mx-auto w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      :class="width"
    >
      <div class="sticky top-0 z-50 flex items-center justify-between w-full px-10 py-5 mb-5 bg-white">
        <h1 class="text-4xl text-center">{{ title }}</h1>
        <button class="transition-all duration-300 text-tg-heading-font-color hover:opacity-80">
          <close-icon class="h-[18px]" @click="$emit('close')" />
        </button>
      </div>
      <div class="h-full px-10 pb-5 overflow-y-auto">
        <slot />
      </div>
    </div>
  </section>
</template>
<script setup>
import CloseIcon from '@/components/icons/CloseIcon.vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: 'max-w-[620px]',
  },
  height: {
    type: String,
    default: 'h-full',
  },
})
</script>
