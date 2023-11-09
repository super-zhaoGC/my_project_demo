//同意管理相关接口
import request from '@/utils/request'

import {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type.ts'

//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

//登录接口方法
const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息接口方法
const reqUserInfo = () => {
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
}

export { reqLogin, reqUserInfo }
