//账号信息的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//代表一个账号信息的ts类型
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone?: null
  roleName?: string
}
//数组包含全部的用户信息
export type Records = User[]
//获取全部用户信息接口返回的数据ts类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
//一个职位的ts类型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
//全部的职位列表
export type AllRole = RoleData[]
//获取全部职位返回的数据的ts类型
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}
//分配角色接口提交数据的ts类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
