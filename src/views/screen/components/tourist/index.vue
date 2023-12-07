<template>
  <div class="tour_screen">
    <p class="title">实时游客统计</p>
    <p class="line"></p>
    <p class="total">可预约总量<span>99999</span>人</p>
    <div class="number">
      <span v-for="(item, index) in numPeople" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
//引入echarts
import * as echarts from 'echarts';
//echarts插件水球图
import 'echarts-liquidfill'
let numPeople = ref('215908人')
let charts = ref()


onMounted(() => {
  let myChart = echarts.init(charts.value);
  let option = {
    title: {
      // 标题
      text: '',
      textStyle: {
        // 标题的样式
        color: '#888', // 字体颜色
        fontFamily: 'Microsoft YaHei', // 字体
        fontSize: 24,
        fontWeight: '400',
        align: 'center', // 文字的水平方式
        baseline: 'middle',
        position: 'inside',
        verticalAlign: 'middle', // 文字的垂直方式
      },
      left: 'center', // 定位
      top: '20%',
    },
    series: [{
      type: 'liquidFill',
      radius: '80%', //水球大小
      center: ['50%', '50%'],
      waveAnimation: true,
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#138FE2',
            },
            {
              offset: 1,
              color: '#126ABC',
            },
          ],
          globalCoord: false,
        },
      ],
      data: [0.6, 0.6], // data个数代表波浪数
      amplitude: 10, //振幅
      backgroundStyle: {
        borderWidth: 2, //边框大小
        borderColor: 'rgba(17, 94, 176, 0.8)',//边框颜色
        color: 'rgba(17, 94, 176, 0.4)',
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
          },
        },
      },
      outline: {
        borderDistance: 0,
        itemStyle: {
          borderWidth: 4,
          borderColor: 'transparent',
        },
      },
    }],
  };
  myChart.setOption(option);
})

</script>

<style scoped lang="scss">
.tour_screen {
  width: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100% 100%;
  color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  ;

  .title {
    font-size: 26px;
  }

  .line {
    width: 68px;
    height: 7px;
    background: url(../../images/dataScreen-title.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 5px;
  }

  .total {
    text-align: right;
    ;

    span {
      color: burlywood;
    }
  }

  .number {
    display: flex;
    margin-top: 20px;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    width: 100%;
    flex: 1;
  }
}
</style>
