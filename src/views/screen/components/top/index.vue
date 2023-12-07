<template>
  <div class="top">
    <div class="left">
      <div class="lBtn" @click="goHome">首页</div>
    </div>
    <div class="center">
      <div class="title">
        智慧旅游可视化大数据平台
      </div>
    </div>
    <div class="right">
      <div class="rBtn">统计报告</div>
      <div class="time">当前时间：{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import moment from "moment"
import { useRouter } from "vue-router"
let $router = useRouter()
let time = ref(moment().format("YYYY-MM-DD HH:mm:ss"))
let timer = ref<number>(0)
onMounted(() => {
  //每隔一秒刷新时间
  timer.value = setInterval(() => {
    time.value = moment().format("YYYY-MM-DD HH:mm:ss")
  }, 1000)
})
onBeforeUnmount(() => {
  //清除定时器
  clearInterval(timer.value)
})

const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .left {
    height: 100%;
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;

    .lBtn {
      height: 100%;
      width: 100px;
      color: #29fcff;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;
    background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
    background-size: 100% 100%;
    height: 74px;

    .title {
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .right {
    flex: 1;
    height: 100%;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: 100% 100% 100%;
    display: flex;
    justify-content: space-between;
    color: #29fcff;

    .rBtn {
      width: 120px;
      height: 100%;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: cover;
      font-size: 20px;
    }

    .time {
      line-height: 40px;
      font-size: 20px;
      padding-right: 15px;
    }
  }
}
</style>;
