//定义SPU接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//SPU数据的ts类型
export interface SpuData {
  category3Id: number | string
  id?: number
  spuName: string
  tmId: number | string
  description: string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]
}

//数组:元素都是已有的spu数据类型
export type Records = SpuData[]

//定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

//品牌数据ts数据类型
export interface Trademark {
  id: number | string
  tmName: string
  logoUrl: string
}
//品牌接口返回的数据ts类型
export interface AllTrademark extends ResponseData {
  data: Trademark[]
}
//商品图片的ts类型
export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}
//已有的spu照片墙数据ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
//已有的全部的SPU的返回数据ts类型
export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName?: string
  saleAttrValueName: string
  isChecked?: null
}
//存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[]
//销售属性对象的ts类型
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}

//spu已有的销售属性接口返回数据的ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

export interface attr {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
}
export interface saleArr {
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
}

//sku数据的ts类型
export interface skuData {
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string //sku名字
  price: string | number //sku价格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string //sku图片地址
}

//sku查看展示数据
export interface skuInfoData extends ResponseData {
  data: skuData[]
}
