<script setup lang="ts">
const onBeforeEnter = (el: any) => {
  el.style.height = 0
}
const onEnter = (el: any) => {
  el.style.height = el.scrollHeight + 'px'
}
const onLeave = (el: any) => {
  el.style.height = '0'
}
</script>

<template>
  <Transition
    enter-active-class="transition-[height] duration-300"
    leave-active-class="transition-[height] duration-300"
    enter-to-class="h-0"
    leave-to-class="h-0"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </Transition>
</template>
