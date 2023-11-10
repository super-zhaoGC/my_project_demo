<template>
  <el-icon style="margin-right:10px" @click="changeIcon">
    <component :is="useLayoutStore().flod?'Fold':'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in $route.matched" :key="index"
      v-show="item.meta.title">
      <el-icon style="vertical-align: top;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
// let flod = ref(false)
//引入小仓库存储的flod
import useLayoutStore from "@/store/modules/setting.ts"
import { useRoute } from "vue-router";

const $route = useRoute()
const changeIcon = () => {
  // alert('dad')
  useLayoutStore().flod = !useLayoutStore().flod
} 
</script>

<style scoped></style>
