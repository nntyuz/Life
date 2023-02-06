<template>
  <label class="input__radio">
    <input type="radio" :checked="shouldBeChecked" :value="modelValue" @change="updateInput" />
    <span class="radio__button" />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'RadioInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    val: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue'],
  computed: {
    shouldBeChecked() {
      if (typeof this.modelValue === 'string') {
        return String(this.val) === String(this.modelValue)
      } else {
        return Number(this.val) === Number(this.modelValue)
      }
    }
  },
  methods: {
    updateInput() {
      this.$emit('update:modelValue', this.val)
    }
  }
}
</script>
