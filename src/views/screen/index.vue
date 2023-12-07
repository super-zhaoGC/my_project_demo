<template>
  <div class="screen">
    <div class="container" ref="container">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import Top from "./components/top/index.vue"
import Tourist from "./components/tourist/index.vue"
import Sex from "./components/sex/index.vue"
import Age from "./components/age/index.vue"



//大屏适配：通过缩放
let container = ref()
onMounted(() => {
  container.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
window.onresize = () => {
  container.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}


</script>

<style scoped lang="scss">
.screen {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: 100% 100%;

  .container {
    width: 1920px;
    height: 1080px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform-origin: top left;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      width: 100%;
      height: calc(100% - 40px);
      display: flex;

      .left {
        flex: 1;
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        background-color: yellow;
      }

      .right {
        flex: 1;
        background-color: green;
      }
    }
  }
}
</style>
