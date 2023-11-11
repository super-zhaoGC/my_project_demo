<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus" style="margin: 10px 0;">添加品牌</el-button>
    <!-- 表格组件，用于展示已有的数据 -->
    <!-- 
      table
      ---border:是否有纵向的边框
      table-column
      ---lable：某一个列表标题
      ---width：设置这一列的宽度
      ---align：设置这一列对齐方式
     -->
    <el-table stripe style="width: 100%;margin-bottom: 10px;" border :data="trademarkArr">
      <el-table-column label="序号" width="80" header-align="center" type="index">
      </el-table-column>
      <el-table-column label="品牌名称" header-align="center">
        <template #="{ row, $index }">
          <div style="text-align: center;">{{ row.tmName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" header-align="center">
        <template #="{ row, $index }">
          <div style="text-align: center;">
            <img :src="(row.logoUrl).indexOf('http') == 0 ? row.logoUrl : 'http://' + row.logoUrl" alt=""
              style="width: 100px;height: 100px;">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" header-align="center">
        <template #="{ row, $index }">
          <div style="text-align: center;">
            <el-button type="primary" icon="Edit" style="margin: 10px ;"></el-button>
            <el-button type="primary" icon="Delete" style="margin: 10px"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <!-- 
      pagination
      ---v-model:current-page：设置当前分页器页码
      ---v-model:page-size:设置每一也展示数据条数
      ---page-sizes：每页显示个数选择器的选项设置
      ---background:背景颜色
      ---layout：分页器6个子组件布局的调整 "->"把后面的子组件顶到右侧
     -->
    <el-pagination @size-change="sizeChange" @current-change="getHasTrafemark" @prev-click="" @next-click=""
      v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
      layout="total, sizes, prev, pager, next,->, jumper" :total="total" />
  </el-card>
</template>
<script setup lang="ts">
//引入数据类型
import type { TrademarkMarkResponseData, Records } from '@/api/product/trademark/type'
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let trademarkArr = ref<Records>([])
let total = ref<number>(0)
const getHasTrafemark = async (page = 1) => {
  pageNo.value = page
  let result: TrademarkMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    trademarkArr.value = result.data.records
    total.value = result.data.total
  }


}
//当下拉菜单发生变化的时候触发此方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrafemark()
}
// const next = (a) => {
//   console.log(a);

// }
// const prev = (a) => {
//   console.log(a);

// }
onMounted(() => {
  getHasTrafemark()
})
</script>

<style scoped></style>
