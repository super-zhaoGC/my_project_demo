import request from '@/utils/request'
import type {
  HasSpuResponseData,
  AllTrademark,
  SpuHasImg,
  HasSaleAttrResponseData,
  SaleAttrResponseData,
  SpuData,
  skuData,
  skuInfoData,
} from './type'
enum API {
  HASSPU_URL = 'admin/product/',
  //获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  //获取整个项目全部的销售属性[颜色、尺码、版本]
  AllSALEATTR_URL = '/admin/product/baseSaleAttrList',
  //获取某一个已有的spu的销售属性
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  //追加一个新的spu
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的spu
  UPDATESPU_URL = 'admin/product/updateSpuInfo',
  //删除spu
  DELETESPU_URL = 'admin/product/deleteSpu/',
  //追加一个新增的sku地址
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  //查看某一个已有的SPU下全部售卖的商品
  SKUINFO_URL = '/admin/product/findBySpuId/',
}

export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
//全部品牌数据
export const reqAllTrademark = () =>
  request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)
//获取某个已有的spu下全部商品的图片地址
export const reqSpuImageList = (spuId: number) => {
  return request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
}

//获取某个已有的spu的销售属性
export const reqSpuHasSaleAtttr = (spuId: number) => {
  return request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
}
//获取全部的销售属性
export const reqAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.AllSALEATTR_URL)
}
//添加或更新spu的接口请求
//data：即为新增spu或者已有的spu对象
export const reqAddorUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
//删除SPU
export const reqDeleteSpu = (spuId: number) => {
  return request.delete<any, any>(API.DELETESPU_URL + spuId)
}

//添加SKU的请求方法
export const reqAddSku = (data: skuData) => {
  return request.post<any, any>(API.ADDSKU_URL, data)
}

//获取spu的sku数据展示
export const reqSkuList = (spuId: number) =>
  request.get<any, skuInfoData>(API.SKUINFO_URL + spuId)
