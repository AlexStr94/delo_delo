export const getWorkTask = (work) => {
  let task = null
  let type = null
  if (work.current_task.length > 0) {
    task = work.current_task[0]
    type = 'current_task'
  } else if (work.periodical_task.length > 0) {
    task = work.periodical_task[0]
    type = 'periodical_task'
  }
  return [task, type]
}