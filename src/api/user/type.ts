//登录接口需要携带的参数ts类型
export interface loginFormData {
  username: string
  password: string
}

//登录接口数据

//定义全部接口共有数据类型
export interface responseData {
  code: number
  message: string
  ok: boolean
}
//定义登录接口返回数据类型
export interface loginResponseData extends responseData {
  data: string
}
//获取用户信息数据类型
export interface userInfoResponseData extends responseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
