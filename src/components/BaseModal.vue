<template>
  <section
    class="fixed left-0 top-0 z-[10000] flex min-h-screen w-[100vw] items-center justify-center bg-[#00000080] p-10"
    :class="height"
    @click="$emit('close')"
  >
    <div
      @click.stop
      class="container relative mx-auto flex h-full w-full flex-col overflow-y-hidden rounded-xl bg-white max-xl:max-w-[990px] max-[990px]:max-w-3xl max-[800px]:max-w-2xl max-[680px]:max-w-xl"
      :class="width"
    >
      <div class="sticky top-0 z-50 mb-5 flex w-full items-center justify-between bg-white px-10 py-5">
        <h1 class="text-center text-4xl">{{ title }}</h1>
        <button class="text-tg-heading-font-color transition-all duration-300 hover:opacity-80">
          <inline-svg src="fontawesome/close.svg" @click="$emit('close')" class="h-[18px]" />
        </button>
      </div>
      <div class="h-full overflow-y-auto px-10 pb-5">
        <slot />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import InlineSvg from '@/components/InlineSvg.vue'

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
