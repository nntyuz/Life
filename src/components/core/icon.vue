<template>
  <component :is="icon" class="icon-component" />
</template>

<script>
import logo from '../icons/logo.vue'
import archive from '../icons/archive.vue'
import arrowDown from '../icons/arrow-down.vue'
import arrowUp from '../icons/arrow-up.vue'
import calendar from '../icons/calendar.vue'
import chevronLeft from '../icons/chevron-left.vue'
import close from '../icons/close.vue'
import done from '../icons/done.vue'
import folderPlus from '../icons/folder-plus.vue'
import folder from '../icons/folder.vue'
import play from '../icons/play.vue'
import sorting from '../icons/sorting.vue'
import stopIcon from '../icons/stop.vue'
import trash from '../icons/trash.vue'

export default {
  name: 'VIcon',
  components: {
    logo,
    archive,
    arrowDown,
    arrowUp,
    calendar,
    chevronLeft,
    close,
    done,
    folderPlus,
    folder,
    play,
    sorting,
    stopIcon,
    trash
  },
  props: {
    name: String
  },
  computed: {
    icon() {
      return this.name
    }
  }
}
</script>

<style>
.icon-component {
  display: block;
}
</style>
