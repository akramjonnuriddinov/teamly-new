<template>
  <div>
    <div class="quill-editor relative rounded-md">
      <slot class="rounded-md" name="toolbar"></slot>
      <div class="absolute h-full max-h-[400px] min-h-[400px] w-full overflow-y-auto border" ref="editor"></div>
    </div>
  </div>
</template>

<script>
import { ESize } from '@/types'
import BaseButton from '@/components/BaseButton.vue'
import _Quill from 'quill'

const Quill = window.Quill || _Quill
const defaultOptions = {
  theme: 'snow',
  boundary: document.body,
  modules: {
    toolbar: [
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
    ],
  },
  placeholder: '',
  readOnly: false,
}

// pollfill
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value(target, varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true,
  })
}

export default {
  name: 'quill-editor',
  data() {
    return {
      _options: {},
      _content: '',
      defaultOptions,
      myValue: '',
    }
  },
  props: {
    content: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    editEditor: {
      type: [Object, String],
      required: true,
      default: () => {},
    },
  },
  mounted() {
    this.$refs.editor.innerHTML = this.editEditor
    this.initialize()
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  },
  methods: {
    initialize() {
      if (this.$el) {
        // Options
        this._options = Object.assign({}, this.defaultOptions, this.globalOptions, this.options)

        // Instance
        this.quill = new Quill(this.$refs.editor, this._options)

        this.quill.enable(false)

        // Set editor content
        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content)
        }

        // Disabled editor
        if (!this.disabled) {
          this.quill.enable(true)
        }

        // Mark model as touched if editor lost focus
        this.quill.on('selection-change', (range) => {
          if (!range) {
            this.$emit('blur', this.quill)
          } else {
            this.$emit('focus', this.quill)
          }
        })

        // Update model if text changes
        this.quill.on('text-change', (delta, oldDelta, source) => {
          let html = this.$refs.editor.children[0].innerHTML || this.editEditor
          const quill = this.quill
          const text = this.quill.getText()
          if (html === '<p><br></p>') html = ''
          this._content = html
          this.$emit('input', this._content)
          this.$emit('change', { html, text, quill })
        })

        // Emit ready event
        this.$emit('ready', this.quill)
      }
    },
  },
  watch: {
    content(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.quill.pasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    value(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.quill.pasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    disabled(newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal)
      }
    },
  },
}
</script>

<style>
.ql-editor {
  position: absolute;
  top: 0;
  width: 100%;
}

.ql-toolbar.ql-snow {
  border-color: rgb(229, 231, 235) !important;
  border-radius: 6px 6px 0 0;
}

.ql-container,
.ql-editor {
  border-radius: 0 0 6px 6px;
  border-color: rgb(229, 231, 235) !important;
}
</style>
