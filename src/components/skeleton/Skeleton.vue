<script lang="ts">
import { defineComponent, PropType } from 'vue';

export enum ESkeletonTheme {
  LIGHT = 'light',
  DARK = 'dark',
  DARK_BLUE = 'dark-blue',
}

export default defineComponent({
  name: 'Skeleton',
  props: {
    height: {
      type: String,
      default: '16px',
    },
    width: {
      type: String,
      default: '260px',
    },
    theme: {
      type: String as PropType<ESkeletonTheme>,
      default: ESkeletonTheme.LIGHT,
    },
  },
});
</script>
<template>
  <div
    class="skeleton"
    :class="`skeleton--${theme}`"
    :style="{
      width: width,
      height: height,
    }"
  >
    <slot />
  </div>
</template>
<style scoped>
.skeleton {
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.skeleton--light {
  background-color: #f5f6fa;
}

.skeleton--dark {
  background-color: #e6e8ed;
}

.skeleton--dark-blue {
  background-color: #dbdee6;
}

.skeleton::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 1.5s infinite;
  content: "";
  transform: translateX(-100%);
}

@keyframes shimmer {
  100% {
    transform: translateX(200%);
  }
}
</style>
