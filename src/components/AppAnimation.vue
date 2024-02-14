<template>
  <div :style="style" ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web/build/player/lottie_light.min.js'

export default {
  name: 'AppAnimation',
  props: {
    options: {
      type: Object,
      required: true,
    },
    height: Number,
    width: Number,
    speed: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto',
      },
    }
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: 'svg',
      loop: this.options.loop == false,
      autoplay: this.options.autoplay !== false,
      animationData: this.options.animationData,
      rendererSettings: this.options.rendererSettings,
      path: this.options.path,
    })
    this.anim.setSpeed(this.speed)
    this.$emit('animCreated', this.anim)
  },
}
</script>
