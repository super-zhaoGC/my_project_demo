//创建小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user/index.ts'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type.ts'
import { userState } from './type/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import routes from '@/router/routes'
let useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      meunRouters: routes,
      username: '',
      avatar: '',
    }
  },
  actions: {
    //登录
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)

      if (result.code == 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息
    async getUserInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }

      console.log(result)
    },
    //退出登录
    async logOut() {
      const result = await reqLogout()

      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'OK'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
