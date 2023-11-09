//登录接口需要携带的参数ts类型
export interface loginForm {
  username: string
  password: string
}

//登录接口数据

interface dataType {
  data?: string
  message?: string
  token: string
}

export interface loginResponseData {
  code: number
  data: dataType
}

//用户信息
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

export interface userInfoResponseData {
  code: number
  data: user
}
