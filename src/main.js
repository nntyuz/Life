import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router'
import App from './App.vue'

import OutsideDirective from './directives/outside'

import Icon from './components/core/icon.vue'
import Input from './components/core/input.vue'
import Checkbox from './components/core/checkbox.vue'
import Radio from './components/core/radio.vue'

import './assets/styles/reset.scss'
import './assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.directive('outside', OutsideDirective)

app
  .component('VIcon', Icon)
  .component('VInput', Input)
  .component('VCheckbox', Checkbox)
  .component('VRadio', Radio)
app.mount('#app')
