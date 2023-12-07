<template>
  <span class="btn-loader" :style="`border-color: ${color}; border-bottom-color: transparent`"></span>
</template>
<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: '#fff'
  },
});

</script>

<style scoped>
.btn-loader {
  width: 30px;
  height: 30px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
