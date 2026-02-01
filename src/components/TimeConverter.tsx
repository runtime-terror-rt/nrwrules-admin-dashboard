import { formatDistanceToNow } from 'date-fns'

const TimeConverter = ({ timestamp }: { timestamp: string }) => {
  const date = new Date(timestamp)

  return <span>{formatDistanceToNow(date, { addSuffix: true })}</span>
}

export default TimeConverter
