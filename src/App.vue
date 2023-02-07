<template>
  <HeaderComponent />
  <section class="content">
    <FolderComponent />
    <router-view />
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
    // const store = useMainStore()
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      saveToLocalStorage(store)
    })
  }
}
</script>
