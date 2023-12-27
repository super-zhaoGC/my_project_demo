<template>
  <div class="map" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts';
import chinaJson from './china.json'
let map = ref()
echarts.registerMap('china', chinaJson as any)
onMounted(() => {
  let myChart = echarts.init(map.value);
  let options = {
    geo: {
      map: "china",
      zoom: 1.1,
      label: {
        show: true
      },
      itemStyle: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#094F99' // 0% 处的颜色
          }, {
            offset: 1, color: '#74B2F3' // 100% 处的颜色
          }],
          global: false,// 缺省为 false
          opacity: 0.8
        }
      }
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [87.617733, 43.792818], // 起点
              [91.132212, 29.660361], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [91.132212, 29.660361], // 起点
              [100.132212, 25.660361], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [100.132212, 25.660361], // 起点
              [109.132212, 18.660361], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [109.132212, 18.660361], // 起点
              [117.132212, 25.660361], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [117.132212, 25.660361], // 起点
              [125.132212, 44.060361], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [125.132212, 44.060361], // 起点
              [116.405285, 39.904989], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [112.304436, 37.618179], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [112.304436, 37.618179], // 起点
              [106.504962, 29.533155], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [106.504962, 29.533155], // 起点
              [104.065735, 30.659462], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [106.504962, 29.533155], // 起点
              [104.065735, 30.659462], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [104.065735, 30.659462], // 起点
              [101.778916, 36.623178], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
          {
            coords: [
              [101.778916, 36.623178],
              [87.617733, 43.792818],
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'red',
              width: 2,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'yellow',
          symbolSize: 10,
        },
      },
    ],
  }
  myChart.setOption(options);
})
</script>

<style scoped></style>
