import moment from 'moment'

export const getWeekRange = () => {
  let start = moment().startOf('week').add(1, 'd').format('MMDD')
  let end = moment().endOf('week').subtract(1, 'd').format('MMDD')
  return `${start}-${end}`
}
