export const getTodayDateRange = () => {
  const today = new Date()
  today.setHours(0,0,0,0)
  const tomorrow = new Date(today.getTime());;
  tomorrow.setDate(tomorrow.getDate()+1); 

  return [today, tomorrow]
}