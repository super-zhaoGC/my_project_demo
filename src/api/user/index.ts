//同意管理相关接口
import request from '@/utils/request'

//项目的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口方法
const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data)
//获取用户信息接口方法
const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL)
//退出登录
const reqLogout = () => request.get<any, any>(API.LOGOUT_URL)

export { reqLogin, reqUserInfo, reqLogout }
