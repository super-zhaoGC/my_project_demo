<template>
  <div class="logo">
    <img :src="Setting.logo" alt="">
    <p v-show="!useLayoutStore().flod" class="logo_title">{{ Setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import Setting from '@/setting';
import useLayoutStore from '@/store/modules/setting';

</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 10px;
  height: 60px;

  img {
    height: 40px;
    width: 40px;
    margin-right: 10px;
  }

  .logo_title {
    width: 100%;
    transition: all 0.3s;
    white-space: nowrap;
  }
}
</style>
