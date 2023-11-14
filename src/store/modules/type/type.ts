//定义小仓库数据类型
import { RouteRecordRaw } from 'vue-router'
import { CategoryObj } from '@/api/product/attr/type'

export interface userState {
  token: string | null
  meunRouters: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface CategoryData {
  c1Id: number | string
  c1Arr: CategoryObj[]
}
