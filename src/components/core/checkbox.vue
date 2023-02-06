<template>
  <div class="checkbox" :class="classes" @click.stop="click">
    <div class="checkbox__container">
      <VIcon name="done" />
    </div>
    <div class="checkbox__text">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxComponent',
  props: {
    modelValue: Boolean,
    disabled: Boolean
  },
  emits: ['click', 'update:modelValue', 'change'],
  computed: {
    classes() {
      let classes = ''

      if (this.modelValue) {
        classes += 'checkbox__active '
      }
      if (this.disabled) {
        classes += 'checkbox__disabled '
      }
      return classes
    }
  },
  methods: {
    click() {
      if (this.disabled) return
      const newVal = !this.modelValue
      this.$emit('click', newVal)
      this.$emit('update:modelValue', newVal)
      this.$emit('change', newVal)
    }
  }
}
</script>
