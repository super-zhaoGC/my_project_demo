<template>
  <div class="lineBox">
    <div class="title">
      游客访问量
      <p></p>
    </div>
    <div class="line" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts'
let line = ref()
onMounted(() => {

  let myChart = echarts.init(line.value)
  myChart.setOption({
    //标题组件
    title: {
      text: '访问量',
    },
    //x|y轴
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 0,
      right: 20,
      bottom: 20,
    },
    //系列
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 2299, 321, 890, 1200],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })

})
</script>

<style scoped lang='scss'>
.lineBox {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: cover;

  .title {
    font-size: 24px;
    color: white;
    padding: 20px;
    height: 25px;
    line-height: 25px;

    p {
      margin-top: 5px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: cover;
      width: 68px;
      height: 7px;
    }
  }

  .line {
    width: 100%;
    height: calc(100% - 40px);
  }

}
</style>
