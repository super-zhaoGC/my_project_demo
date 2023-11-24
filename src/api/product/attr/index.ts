import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
}
//一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//二级分类
export const reqC2 = (cid: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + cid)
//三级分类
export const reqC3 = (cid: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + cid)
//table表格数据
export const reqTableAttr = (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) => {
  return request.get<any, AttrResponseData>(
    API.ATTR_URL + `${c1Id}/` + `${c2Id}/` + `${c3Id}/`,
  )
}
//新增or修改属性接口
export const reqAddOrUpdateAttr = (data: Attr) => {
  return request.post<any, any>(API.ADDORUPDATE_URL, data)
}
