<template>
  <div class="countBox">
    <div class="title">
      总数排行
      <p></p>
    </div>
    <div class="count" ref="count"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts'
let count = ref()
onMounted(() => {
  let myChart = echarts.init(count.value)
  let options = {
    title: {
      text: 'Basic Radar Chart'
    },
    legend: {
      data: ['Allocated Budget', 'Actual Spending']
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Technology', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: 'Actual Spending'
          }
        ]
      }
    ]
  }
  myChart.setOption(options)
})
</script>

<style scoped lang="scss">
.countBox {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rb.png) no-repeat;
  background-size: cover;

  .title {
    font-size: 24px;
    color: white;

    p {
      background: url(../../images/dataScreen-title.png) no-repeat;
      height: 7px;
    }
  }

  .count {
    height: calc(100% - 20px);
  }
}
</style>
