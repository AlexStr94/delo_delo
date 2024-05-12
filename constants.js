export const TasksScreenName = 'Дела'
export const TaskList = 'Список дел'

export const CurrentTaskScreenName = 'Текущая задача'
export const AddCurrentTaskScreenName = 'Добавить текущую задачу'
export const UpdateCurrentTaskScreenName = 'Изменить текущую задачу'

export const PeriodicalTaskScreenName = 'Периодическая задача'
export const AddPeriodicalTaskScreenName = 'Добавить периодическую задачу'
export const UpdatePeriodicalTaskScreenName = 'Изменить периодическую задачу'

export const periodicalTaskTypes = [
  {
    value: 'week',
    label: 'Неделя',
  },
  {
    value: 'month',
    label: 'Месяц',
  },
]
export const monthDays = Array.from({ length: 31 }, (value, index) => ({label: index+1, value: index+1}));
export const weekDays = [
    {
      label: 'Понедельник',
      value: '1'
    },
    {
      label: 'Вторник',
      value: '2'
    },
    {
      label: 'Среда',
      value: '3'
    },
    {
      label: 'Четверг',
      value: '4'
    },
    {
      label: 'Пятница',
      value: '5'
    },
    {
      label: 'Суббота',
      value: '6'
    },
    {
      label: 'Воскресенье',
      value: '7'
    },
  ]