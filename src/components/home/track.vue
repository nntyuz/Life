<template>
  <section class="track">
    <template v-if="currentTask">
      <div class="track__title">
        <h1>{{ currentTask.name }}</h1>
        <h2>{{ folder.name }}</h2>
      </div>
      <div v-if="!currentTask.archived" class="track__container">
        <div class="container__title">
          сегодня
          <div class="time">{{ sessionTime }}</div>
        </div>
        <button class="timer-button" @click.stop="isCurrentTaskRunning ? pause() : start()">
          <VIcon :name="isCurrentTaskRunning ? 'stopIcon' : 'play'" />
        </button>
        <div class="container__title">
          всего
          <div class="time">{{ allTime }}</div>
        </div>
      </div>
      <div class="track__controls">
        <div class="control control__check">
          <VCheckbox :model-value="currentTask.completed" @click="completeTask(currentTask.id)"
            >Выполненно</VCheckbox
          >
        </div>
        <button
          class="control control__archive"
          @click="isArchived ? removeFromArchive() : moveToArchive()"
        >
          <VIcon name="archive" />
          {{ isArchived ? 'Убрать из архива' : 'В архив' }}
        </button>
        <button class="control control__trash" @click="removeTask()">
          <VIcon name="trash" />
          Удалить задачу
        </button>
      </div>
    </template>
    <template v-else>
      <div class="track__title">
        <h1>Нет открытых задач</h1>
        <h2>Откройте задачу, на которую планируете трекать время</h2>
      </div>
      <div class="track__img">
        <img src="../../../img/task.png" alt="No open task image" />
      </div>
    </template>
  </section>
</template>

<script>
import { useMainStore } from '../../stores/main.js'
import { mapState } from 'pinia'
import formatTime from '../../helpers/format-time.js'

export default {
  name: 'TrackComponent',
  computed: {
    ...mapState(useMainStore, {
      currentTask: (store) => store.currentTask,
      runningTask: (store) => store.runningTask,
      folders: (store) => store.folders,
      interval: (store) => store.interval
    }),
    isCurrentTaskRunning() {
      return this.currentTask.id === this.runningTask?.id && this.interval
    },
    folder() {
      return this.folders.find((a) => a.id === this.currentTask?.folderId) || {}
    },
    isArchived() {
      return this.currentTask.archived
    },
    sessionTime() {
      return formatTime(this.currentTask.session)
    },
    allTime() {
      return formatTime(this.currentTask.allTime)
    }
  },
  methods: {
    moveToArchive() {
      const store = useMainStore()
      store.moveToArchive(this.currentTask.id)
    },
    removeFromArchive() {
      const store = useMainStore()
      store.removeFromArchive(this.currentTask.id)
    },
    removeTask() {
      const warningText = 'Вы точно уверены, что хотите удалить задачу?'
      if (confirm(warningText) === true) {
        const store = useMainStore()
        store.removeTask(this.currentTask.id)
      } else {
        return
      }
    },
    completeTask(id) {
      const store = useMainStore()
      store.completeTask(id)
    },
    start() {
      const store = useMainStore()
      store.startTimer(this.currentTask.id)
    },
    pause() {
      const store = useMainStore()
      store.pauseTimer()
    }
  }
}
</script>
