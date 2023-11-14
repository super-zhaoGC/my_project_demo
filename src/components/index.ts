//引入组件
import SvgIcons from './SvgIcons/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from './Category/index.vue'

//注册全局组件
const allGlobalComponents: Record<string, any> = { SvgIcons, Category }

//对外暴露插件
export default {
  install(app: Record<string, any>) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
