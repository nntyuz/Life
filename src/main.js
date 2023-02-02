import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import Icon from './components/core/icon.vue'

import './assets/styles/main.scss'

const app = createApp(App)

app.component('VIcon', Icon)

app.use(createPinia())

app.mount('#app')
