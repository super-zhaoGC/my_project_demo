//封装TOKEN
const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

export { SET_TOKEN, GET_TOKEN }
