<template>
  <div class="">
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue"
import useLayoutStore from "@/store/modules/setting";

let flag = ref(true)
//监视小仓库中数据发声变化
watch(() => useLayoutStore().refresh, () => {
  flag.value = false
  //nextTick 用来获取数据更新后的DOM
  nextTick(() => {
    flag.value = true
  })
})

</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  ;
}

.fade-enter-active {
  transition: all 0.5s ease;
}

.fate-enter-to {
  opacity: 1;
}
</style>
