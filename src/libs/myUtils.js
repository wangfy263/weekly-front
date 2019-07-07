import moment from 'moment'

export const getWeekRange = () => {
  let start = moment().startOf('week').add(1, 'd').format('MMDD')
  let end = moment().endOf('week').subtract(1, 'd').format('MMDD')
  if (moment().format('MMDD') === '0707') {
    start = '0701'
    end = '0705'
  }
  return `${start}-${end}`
}
