import { defineStore } from 'pinia'

const useLayoutStore = defineStore('LayoutStore', {
  state: () => {
    return {
      flod: false,
      refresh: false,
    }
  },
})
export default useLayoutStore
