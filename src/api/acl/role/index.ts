import request from '@/utils/request'
import type { RoleResponseData, RoleData, MeanDataResponse } from './type'

//枚举地址
enum API {
  //获取全部的职位接口
  ALLROLE_URL = '/admin/acl/role/',
  //新增岗位的接口地址
  ADDROLE_URL = '/admin/acl/role/save',
  //更新已有的职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  //获取全部菜单与按钮权限
  ALLPERMISSTION = '/admin/acl/permission/toAssign/',
  //给相应的职位分配权限
  SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
  //删除角色
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}
//获取全部的职位
export const reqAllRole = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`,
  )
//新增、更新角色
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
//获取全部菜单与按钮权限
export const reqAllMeanList = (roleId: number) =>
  request.get<any, MeanDataResponse>(API.ALLPERMISSTION + roleId)
//设置权限
//给相应的职位下发权限
export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post(
    API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
}
//删除角色
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId)
