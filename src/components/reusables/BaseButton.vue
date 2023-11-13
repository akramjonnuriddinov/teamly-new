<template>
  <button
    :class="`${theme[props.theme]} ${size[props.size]}`"
    class="rounded-[10px] font-bold inline-block text-center whitespace-nowrap tracking-[0.5px] transition-all duration-300 disabled:cursor-auto disabled:bg-gray-500"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ESize, EThemes } from "@/types"

interface ButtonShape {
  size: ESize
  theme: EThemes
}

const props = withDefaults(defineProps<ButtonShape>(), {
  size: ESize.DEFAULT,
  theme: EThemes.DEFAULT,
})

const theme = {
  [EThemes.DEFAULT]:
    "bg-tg-primary-color text-tg-white hover:bg-tg-secondary-color",
  [EThemes.GREEN]:
    "bg-tg-secondary-color text-tg-white hover:bg-tg-primary-color",
  [EThemes.RED]: "bg-tg-green text-tg-white hover:bg-tg-teal",
  [EThemes.WHITE]:
    "bg-tg-white text-tg-black hover:bg-tg-secondary-color hover:text-tg-white",
}
const size = {
  [ESize.DEFAULT]: "px-[25px] py-[18px]",
  [ESize.SMALL]: "px-[60px] py-[13px]",
  [ESize.MEDIUM]: "px-[60px] py-[18px]",
  [ESize.BIG]: "px-[120px] py-[18px]",
}
</script>
