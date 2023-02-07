export default (store) => {
  localStorage.setItem('tasks', JSON.stringify([...store.tasks]))
  localStorage.setItem('folders', JSON.stringify([...store.folders]))
  if (![null, undefined].includes(store.runningTask))
    localStorage.setItem('running-task-id', JSON.stringify(store.runningTask.id))
  if (![null, undefined].includes(store.currentTask))
    localStorage.setItem('current-task-id', JSON.stringify(store.currentTask.id))
}
