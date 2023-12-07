<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <el-button icon="FullScreen" circle @click="fullScreen" />

  <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker size="small" class="mt-2" @change="setColor" v-model="color" show-alpha
          :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="深色模式">
        <el-switch @change="changeDark" class="mt-2" v-model="dark" style="margin-left: 24px" inline-prompt
          :active-icon="Moon" :inactive-icon="Sunny" />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle />
    </template>
  </el-popover>
  <img :src="useUserStore().avatar" style="width:30px;height:30px;margin:0 10px;border-radius: 50%;">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ useUserStore().username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useRouter, useRoute } from "vue-router";
//引入小仓库数据
import useLayoutStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";

const refresh = () => {
  useLayoutStore().refresh = !useLayoutStore().refresh
}

//全屏函数
const fullScreen = () => {
  //DOM对象属性，全屏：true；不是全屏：false
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    //推出全屏
    document.exitFullscreen()
  }
}
//推出登录
//路由跳转对象
let $router = useRouter()
//路由参数对象
let $route = useRoute()
const logOut = async () => {
  await useUserStore().logOut()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
//颜色数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

//定义switch开关切换
let dark = ref<boolean>(false)
const changeDark = () => {
  let html = document.documentElement
  dark.value ? html.classList.add('dark') : html.classList.remove('dark')
}
//主题颜色切换
const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style scoped></style>
