//创建小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index.ts'
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import { userState } from './type/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
let useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      console.log(result)
      if (result.code == 200) {
        this.token = result.data.token
        SET_TOKEN(result.data.token)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
