import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    interval: null,
    currentTask: null,
    runningTask: null,
    tasks: [],
    runningTasks: [],
    folders: [
      {
        id: 'main',
        name: 'Основные задачи'
      },
      {
        id: 'archive',
        name: 'Архив'
      }
    ]
  }),
  actions: {
    addFolder(folder) {
      this.folders.unshift(folder)
    },
    removeFolder(id) {
      if (this.currentTask?.folderId === id) this.currentTask = null
      if (this.runningTask?.folderId === id) {
        this.pauseTimer()
        this.runningTask = null
      }
      this.tasks = this.tasks.filter((a) => a.folderId !== id)
      this.folders = this.folders.filter((a) => a.id !== id)
    },
    addTask(task) {
      this.tasks.unshift(task)
    },
    removeTask(id) {
      if (this.currentTask?.id === id) this.currentTask = null
      if (this.runningTask?.id === id) {
        this.pauseTimer()
        this.runningTask = null
      }
      this.tasks = this.tasks.filter((a) => a.id !== id)
    },
    addCurrentTask(id) {
      this.currentTask = this.tasks.find((a) => a.id === id)
    },
    moveToArchive(id) {
      this.pauseTimer()
      const task = this.tasks.find((a) => a.id === id)
      task.archived = true
      if (this.currentTask?.id === id) {
        this.currentTask = null
      }
      if (this.runningTask?.id === id) {
        this.runningTask = null
      }
    },
    removeFromArchive(id) {
      const task = this.tasks.find((a) => a.id === id)
      task.archived = false
      this.currentTask = null
    },
    startTimer(id) {
      if (this.interval) {
        this.pauseTimer(id)
      }
      this.addRunningTask(id)
      this.interval = setInterval(() => {
        this.runningTask.session++
      }, 1000)
    },
    pauseTimer() {
      clearInterval(this.interval)
      this.interval = null
      if (this.runningTask) {
        this.runningTask.allTime += this.runningTask.session
        this.runningTask.session = 0
      }
    },
    addRunningTask(id) {
      if (this.runningTask?.id !== id) {
        this.runningTask = this.tasks.find((a) => a.id === id)
        if (!this.runningTasks.includes(id)) this.runningTasks.push(id)
      }
    },
    completeTask(id) {
      const task = this.tasks.find((a) => a.id === id)
      task.completed = !task.completed
    },
    initTasks(tasks) {
      this.tasks = tasks
    },
    initFolders(folders) {
      this.folders = folders
    }
  }
})
