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
import { constanteRoutes, asyncRoutes, anyRoute } from '@/router/routes'
import router from '@/router'
//引入深拷贝方法
//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'

//过滤当前用户展示的异步路由
function filterAsyncRoute(asyncRoute: any, constanteRoute: any) {
  return asyncRoute.filter((item: any) => {
    if (constanteRoute.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        filterAsyncRoute(item.children, constanteRoute)
      }
      return true
    }
  })
}

let useUserStore = defineStore('User', {
  state: (): userState => {
    return {
      token: GET_TOKEN(),
      meunRouters: constanteRoutes,
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
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
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoutes),
          result.data.routes,
        )
        //菜单需要的数据整理完毕
        this.meunRouters = [...constanteRoutes, ...userAsyncRoute, anyRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
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
