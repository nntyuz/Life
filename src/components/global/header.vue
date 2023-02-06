<template>
  <header class="header">
    <router-link to="/folder/main">
      <VIcon class="logo" name="logo" />
    </router-link>
    <div class="header__container">
      <div class="header__container-title">
        <div @click="isPopupOpen = !isPopupOpen">
          {{ runningTask ? runningTask.name : 'Нет открытых задач' }}
        </div>
        <button v-if="runningTask" class="timer-button" @click.stop="interval ? pause() : start()">
          <VIcon :name="interval ? 'stopIcon' : 'play'" />
        </button>
      </div>
      <div class="header__container-subtitle">
        <div>Сегодня:</div>
        <div class="time">{{ sessionTime }}</div>
      </div>
    </div>
    <taskPopup v-if="isPopupOpen" v-outside="() => (isPopupOpen = false)" />
  </header>
</template>

<script>
import { useMainStore } from '../../stores/main.js'
import { mapState } from 'pinia'
import formatTime from '../../helpers/format-time.js'
import taskPopup from '../global/taskPopup.vue'

export default {
  name: 'HeaderComponent',
  components: {
    taskPopup
  },
  data() {
    return {
      isPopupOpen: false
    }
  },
  computed: {
    ...mapState(useMainStore, {
      interval: (store) => store.interval,
      runningTask: (store) => store.runningTask
    }),
    sessionTime() {
      return formatTime(this.runningTask?.session)
    }
  },
  methods: {
    start() {
      const store = useMainStore()
      store.startTimer(this.runningTask.id)
    },
    pause() {
      const store = useMainStore()
      store.pauseTimer()
    }
  }
}
</script>
