<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <bread-crumbs></bread-crumbs>
    </div>
    <div class="tabbar_right">
      <setting></setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
