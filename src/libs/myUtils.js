import moment from 'moment'

export const getWeekRange = (lastN) => {
  let weekOfday = moment().format('E') // 计算今天是这周第几天
  let start = moment().subtract(weekOfday - 1, 'days').format('MMDD')
  let end = moment().add(7 - weekOfday, 'days').format('MMDD')
  if (lastN && typeof lastN === 'number') {
    start = moment().subtract(weekOfday - 1, 'days').subtract(lastN, 'weeks').format('MMDD')
    end = moment().add(7 - weekOfday, 'days').subtract(lastN, 'weeks').format('MMDD')
  }
  console.log(`${start}-${end}`)
  return `${start}-${end}`
}
