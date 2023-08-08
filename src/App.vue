<template>
  <HeaderComponent />
  <section class="content">
    <FolderComponent />
    <template v-if="$route.name === 'home'">
      <div class="tasks">
        <h1>Откройте папку с задачами или создайте новую</h1>
        <img src="/img/blank.png" alt="Blank Screen Illustration" class="content__img" />
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
    <TrackComponent v-if="$route.name === 'tasks'" />
  </section>
</template>

<script>
import HeaderComponent from './components/global/header.vue'
import FolderComponent from './components/home/folders.vue'
import TrackComponent from './components/home/track.vue'

import { useMainStore } from './stores/main.js'
import init from './helpers/init.js'
import saveToLocalStorage from './helpers/save-to-localstorage.js'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    FolderComponent,
    TrackComponent
  },
  mounted() {
    const store = useMainStore()
    init(store)
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      saveToLocalStorage(store)
    })
  }
}
</script>
