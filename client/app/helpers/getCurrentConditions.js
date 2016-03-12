// a helper function that iterates over an entire msw conditions list and returns 
// the most current forecast object using the .timestamp property
export default (conditions) => {
  return conditions.reduce((min, current) => {
    const timeToCurrent = Math.abs(new Date(current.timestamp * 1000) - new Date())
    const timeToMin = Math.abs(new Date(min.timestamp * 1000) - new Date())
    return timeToCurrent < timeToMin ? current : min
  })
}