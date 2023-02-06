<template>
  <section class="task-popup">
    <div class="container">
      <div class="container__title">{{ toDateString(new Date()) }}</div>
      <div
        v-for="(item, index) in todayTasks"
        :key="index"
        :class="['element', { active: runningTask?.id === item.id }]"
      >
        <div class="element__title">
          <button
            v-if="runningTask?.id === item.id"
            class="timer-button"
            @click.stop="interval ? pause() : start(item.id)"
          >
            <VIcon :name="interval ? 'stopIcon' : 'play'" />
          </button>
          {{ item.name }}
        </div>
        <div class="time">
          {{ formatTime(item.allTime) }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useMainStore } from '../../stores/main.js'
import { mapState } from 'pinia'
import formatTime from '../../helpers/format-time.js'

export default {
  name: 'TaskPopup',
  computed: {
    ...mapState(useMainStore, {
      runningTasks: (store) => store.runningTasks,
      runningTask: (store) => store.runningTask,
      interval: (store) => store.interval,
      tasks: (store) => store.tasks
    }),
    todayTasks() {
      return this.tasks.filter((a) => this.runningTasks.includes(a.id))
    }
  },
  methods: {
    formatTime(time) {
      return formatTime(time)
    },
    toDateString(date) {
      if (!date) return ''
      const d = new Date(date)
      const month = ('0' + (d.getMonth() + 1)).slice(-2)
      const day = ('0' + d.getDate()).slice(-2)
      const year = d.getFullYear()
      return [day, month, year].join('.')
    },
    start(id) {
      const store = useMainStore()
      store.startTimer(id)
    },
    pause() {
      const store = useMainStore()
      store.pauseTimer()
    }
  }
}
</script>
