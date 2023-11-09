//封装时间
export const time = () => {
  let hours = new Date().getHours()
  let message = ''
  if (hours < 9) {
    return (message = '早上好')
  } else if (hours < 12) {
    return (message = '上午好')
  } else if (hours < 14) {
    return (message = '中午好')
  } else if (hours < 17) {
    return (message = '下午好')
  } else if (hours < 19) {
    return (message = '傍晚好')
  } else if (hours < 22) {
    return (message = '晚上好')
  }
}
