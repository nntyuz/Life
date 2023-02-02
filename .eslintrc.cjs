/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/component-definition-name-casing': 'off'
  }
}
