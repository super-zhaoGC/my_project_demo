import request from '@/utils/request'
import type { SkuResponseData, skuInfoData } from './type'
enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = '/admin/product/list/',
  //商品上架
  SALE_URL = '/admin/product/onSale/',
  //下架
  CANCELSALE_URL = '/admin/product/cancelSale/',
  //商品详情信息
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  //删除sku
  REMOVESKU_URL = '/admin/product/deleteSku/',
}
//获取sku数据
export const reqSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
}
//上架请求
export const reqOnSale = (skuId: number) =>
  request.get<any, any>(API.SALE_URL + skuId)
//下架请求
export const reqCancelSale = (skuId: number) =>
  request.get(API.CANCELSALE_URL + skuId)
//获取商品详情
export const reqSkuInfo = (skuId: number) =>
  request.get<any, skuInfoData>(API.SKUINFO_URL + skuId)
//删除sku
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, any>(API.REMOVESKU_URL + skuId)
