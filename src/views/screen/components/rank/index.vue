<template>
  <div class="rankBox">
    <div class="title">排行榜</div>
    <p></p>
    <div class="rankChart" ref="rank"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from "echarts"
let rank = ref()
onMounted(() => {
  let myChart = echarts.init(rank.value)
  myChart.setOption({
    title: {
      text: '景区排行'
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    //系列:决定显示图形图标是哪一种的
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        //柱状图的:图形上的文本标签，
        label: {
          show: true,
          //文字的位置
          position: 'insideTop',
          //文字颜色
          color: 'yellowgreen',
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          //底部背景的颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'black', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        //柱条的样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          //柱条颜色
          color: function (data: any) {
            //给每一个柱条这是背景颜色
            let arr = [
              'red',
              'orange',
              'yellowgreen',
              'green',
              'purple',
              'hotpink',
              'skyblue',
            ]
            return arr[data.dataIndex]
          },
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true, //平滑曲线
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
    left: 0,
    bottom: 0,
    right: 0
  })
})
</script>

<style scoped lang="scss">
.rankBox {
  background: url(../../images/dataScreen-main-rt.png) no-repeat;
  background-size: cover;

  .title {
    color: white;
    font-size: 24px;
  }

  p {
    margin-top: 5px;
    height: 7px;
    background: url(../../images/dataScreen-title.png) no-repeat;
  }

  .rankChart {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
