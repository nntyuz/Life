<template>
  <div class="input">
    <VIcon :name="icon || ''" />
    <input
      class="input__container"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder || ''"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    type: String,
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: String,
    disabled: Boolean,
    maxlength: String
  },
  emits: ['update:modelValue']
}
</script>
