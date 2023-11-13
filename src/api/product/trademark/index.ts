// 品牌管理模块接口
import request from '@/utils/request'
//引入数据类型
import type {
  TrademarkMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
//品牌管理模块接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //新增接口
  ADDTRAFEMARK_URL = '/admin/product/baseTrademark/save',
  //修改接口
  UPDATETRAFEMARK_URL = '/admin/product/baseTrademark/update',
}
//获取品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )

//新增或者修改接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put(API.UPDATETRAFEMARK_URL, data)
  } else {
    return request.post(API.ADDTRAFEMARK_URL, data)
  }
}
