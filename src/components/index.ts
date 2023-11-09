//引入组件
import SvgIcons from './SvgIcons/index.vue'

const allGlobalComponents: Record<string, any> = { SvgIcons }

//对外暴露插件
export default {
  install(app: Record<string, any>) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
  },
}
