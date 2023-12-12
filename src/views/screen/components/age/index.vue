<template>
  <div class="age">
    <div class="title">
      年龄比例
      <p></p>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts';
let charts = ref()
onMounted(() => {
  let myChart = echarts.init(charts.value)
  let options = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      right: '5%',
      bottom: '5%',
      orient: 'vertical',
      textStyle: {
        color: "white"
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside'
        },

        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '经济' },
          { value: 580, name: '人口' },
          { value: 484, name: '财经' },
          { value: 300, name: '城市' }
        ],
        left: '-30%'
      }
    ],
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  };
  myChart.setOption(options)
})
</script>

<style scoped lang="scss">
.age {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: cover;

  .title {
    font-size: 24px;
    color: white;
    padding: 20px;

    p {
      margin-top: 5px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: cover;
      width: 68px;
      height: 7px;
    }
  }

  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>
