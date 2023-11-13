<template>
  <Suspense>
    <section
      @click="close"
      class="bg-[#00000080] h-full min-h-screen flex justify-center items-start p-10 fixed top-0 left-0 w-[100vw] z-50"
    >
      <div
        @click.stop
        class="container overflow-y-auto h-full bg-white relative px-5 rounded-xl p-5 mx-auto max-w-[600px] w-full max-xl:max-w-[990px] max-[800px]:max-w-2xl max-[990px]:max-w-3xl max-[680px]:max-w-xl"
      >
        <h1 class="mb-5 text-4xl text-center">Portfolio Modal</h1>
        <slot></slot>
        <div class="flex justify-end mt-4">
          <base-button
            :size="ESize.SMALL"
            :theme="EThemes.GREEN"
            @click="$emit('update')"
            type="button"
            :disabled="isDisabled"
            class="max-[990px]:mt-5 mr-5"
          >
            Update
          </base-button>
          <base-button @click="$emit('add')" :size="ESize.SMALL" :disabled="isDisabled" class="max-[990px]:mt-5">
            Add
          </base-button>
        </div>
      </div>
    </section>
  </Suspense>
</template>

<script setup lang="ts">
import BaseButton from '@/components/reusables/BaseButton.vue'
import { ESize, EThemes } from '@/types'

defineProps(['isDisabled', 'close'])

const emit = defineEmits(['update', 'add'])
</script>
