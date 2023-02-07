export default (store) => {
  const tasksData = localStorage.getItem('tasks')
  if (tasksData) store.initTasks(JSON.parse(tasksData))

  const foldersData = localStorage.getItem('folders')
  if (foldersData) store.initFolders(JSON.parse(foldersData))

  const runningTaskId = localStorage.getItem('running-task-id')
  if (runningTaskId) store.addRunningTask(JSON.parse(runningTaskId))

  const currentTaskId = localStorage.getItem('current-task-id')
  if (currentTaskId) store.addCurrentTask(JSON.parse(currentTaskId))
}
