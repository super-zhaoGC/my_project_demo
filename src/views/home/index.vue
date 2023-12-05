<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="">
      <div class="title">
        <h3>{{ userStore.username }}</h3>
        <p class="desc">后台管理系统</p>

      </div>
    </div>
  </el-card>
  <div class="bottom">
    <svg-icons name="welcome" width="800px" height="400px"></svg-icons>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .title {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    h3 {
      font-size: 32px;
      font-weight: 900;
    }

    .desc {
      font-style: italic;
      color: skyblue;
    }
  }
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
