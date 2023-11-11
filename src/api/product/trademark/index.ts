// 品牌管理模块接口
import request from '@/utils/request'
//引入数据类型
import type { TrademarkMarkResponseData } from '@/api/product/trademark/type'
//品牌管理模块接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}
//获取品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
