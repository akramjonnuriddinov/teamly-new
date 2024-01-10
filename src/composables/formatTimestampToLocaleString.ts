export const formatTimestampToLocaleString = (timestamp: number, options: any = { month: 'long', day: 'numeric', year: 'numeric' }) => {
  const date = new Date(timestamp)
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}