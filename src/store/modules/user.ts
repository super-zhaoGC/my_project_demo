//创建小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index.ts'
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import { userState } from './type/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import routes from '@/router/routes'
import { reqUserInfo } from '@/api/user/index.ts'
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
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        this.token = result.data.token
        SET_TOKEN(result.data.token)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    //获取用户信息
    async getUserInfo() {
      let result = await reqUserInfo()
      this.username = result.data.checkUser.username
      this.avatar = result.data.checkUser.avatar
      console.log(result)
    },
    //退出登录
    logOut() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})

export default useUserStore
