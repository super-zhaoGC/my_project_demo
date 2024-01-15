import request from '@/utils/request'
import type { SkuResponseData } from './type'
enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = '/admin/product/list/',
}

export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}
