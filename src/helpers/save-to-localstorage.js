export default (store) => {
  localStorage.setItem('tasks', JSON.stringify([...store.tasks]))
  localStorage.setItem('folders', JSON.stringify([...store.folders]))
  if (store.runningTask !== null)
    localStorage.setItem('running-task-id', JSON.stringify(store.runningTask.id))
  if (store.currentTask !== null)
    localStorage.setItem('current-task-id', JSON.stringify(store.currentTask.id))
}
