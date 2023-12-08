<template>
  <button
    :disabled="disabled || isLoading"
    :class="`${theme[props.theme]} ${size[props.size]}`"
    class="rounded-[10px] font-bold flex relative justify-center items-center text-center whitespace-nowrap tracking-[0.5px] transition-all duration-300 disabled:cursor-auto disabled:bg-gray-500"
    :style="`background: ${color}`"
  >
    <button-loader v-if="isLoading" />
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
import { ESize, EThemes } from '@/types'
import ButtonLoader from '@/components/static/ButtonLoader.vue'

interface ButtonShape {
  size?: ESize
  theme?: EThemes
  isLoading?: boolean
  disabled?: boolean,
  color?: string
}

const props = withDefaults(defineProps<ButtonShape>(), {
  size: ESize.DEFAULT,
  theme: EThemes.DEFAULT,
  isLoading: false,
  disabled: false,
  color: ''
})

const theme = {
  [EThemes.DEFAULT]: 'bg-tg-primary-color text-tg-white hover:bg-tg-secondary-color',
  [EThemes.GREEN]: 'bg-tg-secondary-color text-tg-white hover:bg-tg-primary-color',
  [EThemes.RED]: 'bg-tg-green text-tg-white hover:bg-tg-teal',
  [EThemes.WHITE]: 'bg-tg-white text-tg-black hover:bg-tg-secondary-color hover:text-tg-white',
}
const size = {
  [ESize.DEFAULT]: 'px-[25px] h-[60px]',
  [ESize.SMALL]: 'px-[60px] h-[50px]',
  [ESize.MEDIUM]: 'px-[60px] h-[60px]',
  [ESize.BIG]: 'px-[120px] h-[60px]',
}
</script>
