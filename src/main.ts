import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:svg-icons-register'
//引入全局组件
import gloablComponent from './components/index'

import pinia from './store'

//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置element-plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入全局样式文件
import '@/styles/index.scss'

//引入路由
import router from './router'

//获取应用实力对象
const app = createApp(App)
//使用element-plus插件
app.use(ElementPlus, { locale: zhCn })
//使用全军组件
app.use(gloablComponent)
app.use(router)
app.use(pinia)
//将应用挂到挂载点上
app.mount('#app')
