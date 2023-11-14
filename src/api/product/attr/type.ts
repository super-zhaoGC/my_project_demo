//分类数据的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryObj {
  id: number | string
  name: string
  category1id: number
  category2id: number
}
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
