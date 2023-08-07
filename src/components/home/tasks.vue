<template>
  <section class="tasks">
    <div class="tasks__container">
      <div class="container__title">
        <h1>{{ currentFolder?.name }}</h1>
        <button class="sort" @click="isPopupOpen = !isPopupOpen">
          <VIcon name="sorting" />
          Сортировка
        </button>
      </div>
      <SortPopup
        v-if="isPopupOpen"
        v-outside="() => (isPopupOpen = false)"
        :is-sort-popup="true"
        :sort-type="sortType"
        @sort="sortType = $event"
      />
      <div class="container__subtitle">
        <div>задача</div>
        <div>время</div>
      </div>
    </div>

    <div class="tasks__container">
      <VInput
        v-if="!isArchive"
        v-model="taskName"
        type="text"
        icon="plus"
        placeholder="Добавить задачу"
        maxlength="64"
        @keydown.enter="addTask"
      />
      <div
        v-for="(item, index) in sortedTasks"
        :key="index"
        class="task"
        @click="setCurrentTask(item.id)"
      >
        <div class="task__title">
          <VCheckbox :model-value="item.completed" @click="completeTask(item.id)" />
          {{ item.name }}
        </div>
        <div class="time">{{ formatTime(item.allTime) }}</div>
      </div>
    </div>
    <div v-if="tasks.length === 0" class="tasks__img">
      <img src="/img/blank.png" alt="Blank Screen Illustration" />
    </div>
  </section>
</template>

<script>
import { nanoid } from 'nanoid'
import { useMainStore } from '../../stores/main.js'
import { mapState } from 'pinia'
import formatTime from '../../helpers/format-time.js'
import SortPopup from '../global/sortPopup.vue'
export default {
  name: 'TasksComponent',
  components: {
    SortPopup
  },
  data() {
    return {
      taskName: '',
      isPopupOpen: false,
      sortType: ''
    }
  },
  computed: {
    ...mapState(useMainStore, {
      tasks: (store) => store.tasks,
      folders: (store) => store.folders
    }),
    isArchive() {
      return this.$route.params.id === 'archive'
    },
    folderTasks() {
      const routeId = this.$route.params.id
      if (this.isArchive) return this.tasks.filter((a) => a.archived)
      return this.tasks.filter((a) => a.folderId === routeId && !a.archived)
    },
    sortedTasks() {
      if (this.sortType === null) return this.folderTasks

      const tasks = [...this.folderTasks]
      this.sortTasks(tasks, this.sortType)
      return tasks
    },
    currentFolder() {
      return this.folders.find((a) => a.id === this.$route.params.id)
    }
  },
  methods: {
    formatTime(time) {
      return formatTime(time)
    },
    addTask() {
      if (!this.taskName) return
      const store = useMainStore()
      const task = {
        id: nanoid(),
        name: this.taskName,
        folderId: this.$route.params.id,
        session: 0,
        allTime: 0,
        date: Date.now(),
        completed: false,
        archived: false
      }
      store.addTask(task)
      this.taskName = ''
    },
    setCurrentTask(id) {
      const store = useMainStore()
      store.addCurrentTask(id)
    },
    completeTask(id) {
      const store = useMainStore()
      store.completeTask(id)
    },
    sortTasks(tasks, sortType) {
      if (sortType === 'date') tasks.sort((a, b) => a.date - b.date)
      else if (sortType === 'time') tasks.sort((a, b) => a.allTime - b.allTime)
      else if (sortType === 'status') tasks.sort((a, b) => b.completed - a.completed)
      else if (sortType === 'alphabet')
        tasks.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (b.name < a.name) {
            return 1
          }
          return 0
        })
    }
  }
}
</script>
