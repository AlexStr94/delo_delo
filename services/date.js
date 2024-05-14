export const getTodayDateRange = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDay())
  const tomorrow = now;
  tomorrow.setDate(tomorrow.getDate()+1); 

  return [today, tomorrow]
}