import request from '@/utils/request'
import type { CategoryResponseData } from './type'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}
//一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//二级分类
export const reqC2 = (cid: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + cid)
//三级分类
export const reqC3 = (cid: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + cid)
