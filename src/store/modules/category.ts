import { defineStore } from 'pinia'
import { reqC1 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryData } from './type/type'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryData => {
    return {
      c1Arr: [],
      c1Id: '',
    }
  },
  actions: {
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
  },
})

export default useCategoryStore
