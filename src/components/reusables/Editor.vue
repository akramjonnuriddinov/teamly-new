<template>
  <div>
    <div style="border-radius: 15px 15px 0 0" class="relative rounded-md quill-editor">
      <slot style="border-radius: 15px 15px 0 0" class="rounded-md" name="toolbar"></slot>
      <div
        style="border-radius: 0 0 15px 15px"
        class="absolute w-full h-full min-h-[180px] overflow-y-auto max-h-[200px] border"
        ref="editor"
      ></div>
    </div>
    <button class="px-5 py-2 mt-2 text-white rounded bg-tg-green" type="button" @click="sendToParent">post</button>
  </div>
</template>

<script>
import { ESize } from '@/types'
import BaseButton from './BaseButton.vue'
import _Quill from 'quill'

const Quill = window.Quill || _Quill
const defaultOptions = {
  theme: 'snow',
  boundary: document.body,
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      // ['clean'],
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
  },
  mounted() {
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
          let html = this.$refs.editor.children[0].innerHTML
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
    sendToParent() {
      this.$refs.editor.querySelector('.ql-editor').removeAttribute('contenteditable')
      this.myValue = this.$refs.editor.innerHTML
      this.$emit('send-post', this.myValue)
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
