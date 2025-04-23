import moment from 'moment'

export function calculateTimeRemaining(endDate: Date | string): string {
  const now = moment()
  const target = moment(endDate)

  const duration = moment.duration(target.diff(now))

  const days = Math.floor(duration.asDays())
  const hours = duration.hours()
  const minutes = duration.minutes()
  const seconds = duration.seconds()

  return `${days} days, ${hours}h, ${minutes}m, ${seconds}s`
}
