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

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FolderComponent,
    TrackComponent
  },
  created() {
    this.$router.push('/folder/main')
  }
}
</script>
