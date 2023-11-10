//定义小仓库数据类型
import { RouteRecordRaw } from 'vue-router'
export interface userState {
  token: string | null
  meunRouters: RouteRecordRaw[]
  username: string
  avatar: string
}
