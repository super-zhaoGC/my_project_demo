import request from '@/utils/request'
import type {
  UserResponseData,
  User,
  AllRoleResponseData,
  SetRoleData,
} from './type'

enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  //添加一个新的用户账号
  ADDUSER_URL = '/admin/acl/user/save',
  //更新已有的用户账号
  UPDATEUSER_URL = '/admin/acl/user/update',
  //获取角色职位
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  //分配角色
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  //批量删除的接口
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

//获取全部用户
export const reqAllUser = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}?username=${username}`,
  )
//添加或者更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put(API.UPDATEUSER_URL, data)
  } else {
    return request.post(API.ADDUSER_URL, data)
  }
}
//获取角色的职位
export const reqALLRole = (userId: number) => {
  return request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
}
//分配角色接口
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
//删除用户
export const reqDeleteUser = (userId: number) => {
  return request.delete<any, any>(API.DELETEUSER_URL + userId)
}
//批量删除
export const reqSelectUser = (idList: number[]) => {
  return request.delete(API.DELETEALLUSER_URL, { data: idList })
}
