//路由鉴权:项目当中路由能不能被访问的权限

//第一个问题：任意路由切换实现进度条业务 ----nprogress
//第二个问题：路由鉴权
//全部路由组件 ：登录|404|任意路由|首页|数据大屏|权限管理（三个子路由）|商品管理（4个子路由）

//用户未登录 ：可以访问login 其余都不行
//登陆成功：不可以访问login 其余都可以
import router from './router'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//引入仓库
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia)

//全局路由的前置路由
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    if (userStore.token) {
      if (to.path == '/login') {
        next('/home')
      } else {
        if (userStore.username) {
          next()
        } else {
          try {
            await userStore.getUserInfo()
            //万一刷新的时候是异步路由，有可能获取到用户信息但是异步路由没有加载完毕，出现空白效果
            next({ ...to })
          } catch (error) {
            //token过期|用户手动处理token
            //退出登陆->用户相关的数据清空
            await userStore.logOut()
            next({ path: '/login', query: { redirect: to.path } })
          }
        }
      }
    } else {
      //用户未登录
      if (to.path == '/login') {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.path } })
      }
    }

    nprogress.start()
    next()
  },
)

//全局后置路由
router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    nprogress.done()
  },
)
