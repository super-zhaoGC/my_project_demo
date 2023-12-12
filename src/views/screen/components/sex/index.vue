<template>
  <div class="sex">
    <div class="title">
      男女比例
      <p></p>
    </div>
    <div class="rate">
      <div class="man">
        <img src="../../images/man.png" alt="">
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="line">
      <div class="line_title">
        <div>男士58%</div>
        <div>女士42%</div>
      </div>
      <el-progress define-back-color="red" color="#138FE2" :show-text="false" :text-inside="true" :stroke-width="20"
        :percentage="58" status="exception" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.sex {
  padding: 20px;
  background: url(../../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin: 15px 0;

  .rate {
    display: flex;
    justify-content: space-evenly;
    margin-top: 25px;

    .man {
      width: 111px;
      height: 116px;
      background: Url(../../images/man-bg.png) no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 60px;
        height: 64px;
      }
    }

    .woman {
      width: 111px;
      height: 116px;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 60px;
        height: 64px;
      }

    }
  }

  .line {

    // display: flex;
    // justify-content: space-evenly;
    .line_title {
      margin: 20px 0;
      color: white;
      display: flex;
      justify-content: space-evenly;
      font-size: 18px;
    }


  }

  .el-progress-bar__outer {
    height: 10px !important;
    background-color: #f2994a !important;
  }
}
</style>
