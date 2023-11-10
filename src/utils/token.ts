//封装TOKEN
const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}

export { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN }
