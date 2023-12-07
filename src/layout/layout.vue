<template>
  <div class="layout">
    <div class="layout_left" :class="{ flod: useLayoutStore().flod }">
      <Logo></Logo>
      <el-scrollbar class="layout_scroll">
        <el-menu background-color="#001529" text-color="#fff" :collapse="useLayoutStore().flod"
          :default-active="$route.path">
          <Menu :menuList="routeList"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_right">
      <el-card>
        <div class="layout_top">
          <Tabbar></Tabbar>
        </div>
        <div class="layout_main">
          <div style="height:auto">
            <Main></Main>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue"
import Logo from "./logo/index.vue"
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
//引入小仓库
import useUserStore from "@/store/modules/user.ts"
import useLayoutStore from "@/store/modules/setting.ts"
//获取小仓库中的路由数据
let routeList = useUserStore().meunRouters

</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;

  display: flex;

  .layout_left {
    width: $mean_left_width;
    background-color: $mean_background_color;
    display: flex;
    flex-direction: column;
    transition: all 0.3s;

    .layout_scroll {
      flex: 1;

      .el-menu {
        border-right: none;
      }
    }

    &.flod {
      width: 50px;
    }
  }

  .layout_right {
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;

    .layout_top {
      width: 100%;
      height: $mean_top_height;

    }

    .layout_main {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>
