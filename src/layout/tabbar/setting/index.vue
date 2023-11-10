<template>
  <el-button icon="Refresh" circle @click="refresh" />
  <el-button icon="FullScreen" circle @click="fullScreen" />
  <el-button icon="Setting" circle />
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
const logOut = () => {
  useUserStore().logOut()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped></style>
