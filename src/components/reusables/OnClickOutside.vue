<script>
export default {
  name: 'OnClickOutside',
  props: ['action', 'active'],
  watch: {
    active(value) {
      if (value) {
        document.addEventListener('click', this.clickHandler)
      } else {
        document.removeEventListener('click', this.clickHandler)
      }
    },
  },
  methods: {
    clickHandler(e) {
      if (e.target === this.$el || this.$el.contains(e.target)) {
        return
      }
      this.action()
    },
  },
  render() {
    return this.$slots.default[0]
  },
}
</script>
