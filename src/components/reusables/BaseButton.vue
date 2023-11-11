<template>
  <button
    :class="dynamicClass"
    class="rounded-[10px] font-bold inline-block text-center whitespace-nowrap tracking-[0.5px] transition-all duration-300 disabled:cursor-auto disabled:bg-gray-500"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue"

const props = defineProps<{
  size: string
  theme: string
}>()

const dynamicClass = ref<string[]>([])

switch (props.size) {
  case "default":
    dynamicClass.value.push("px-[25px] py-[18px]")
    break
  case "small":
    dynamicClass.value.push("px-[60px] py-[13px]")
    break
  case "medium":
    dynamicClass.value.push("px-[60px] py-[18px]")
    break
  case "big":
    dynamicClass.value.push("px-[120px] py-[18px] ")
    break
}

switch (props.theme) {
  case "default":
    dynamicClass.value.push(
      "bg-tg-primary-color text-tg-white hover:bg-tg-secondary-color"
    )
    break
  case "red":
    dynamicClass.value.push(
      "bg-tg-secondary-color text-tg-white hover:bg-tg-primary-color"
    )
    break
  case "green":
    dynamicClass.value.push("bg-tg-green text-tg-white hover:bg-tg-teal")
    break
  case "white":
    dynamicClass.value.push(
      "bg-tg-white text-tg-black hover:bg-tg-secondary-color hover:text-tg-white"
    )
}
</script>
