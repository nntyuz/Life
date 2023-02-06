import { createRouter, createWebHistory } from 'vue-router'

import Home from '../App.vue'
import Tasks from '../components/home/tasks.vue'

const routes = [
  { name: 'home', path: '/folder', component: Home },
  { name: 'tasks', path: '/folder/:id', component: Tasks }
]

const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
})

export default router
