<template>
  <el-card>
    <el-table border :data="skuArr">
      <el-table-column label="序号" type="index" prop="" width="100px" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName" align="center" width="80px" show-overflow-tooltip></el-table-column>
      <el-table-column label="描述" prop="skuDesc" align="center" width="300px" show-overflow-tooltip></el-table-column>
      <el-table-column label="图片" align="center" width="300px">
        <template #="{ row, $index }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight" align="center"></el-table-column>
      <el-table-column label="价格" prop="price" align="center"></el-table-column>
      <el-table-column label="操作" prop="" align="center" fixed="right" width="300px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="" icon="Top"></el-button>
          <el-button type="primary" size="small" @click="" icon="Edit"></el-button>
          <el-button type="primary" size="small" @click="" icon="InfoFilled"></el-button>
          <el-button type="primary" size="small" @click="" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[100, 200, 300, 400]"
      :small="small" :disabled="disabled" :background="true" layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { reqSkuList } from "@/api/product/sku"
import type {
  SkuResponseData, SkuData,
  SkuInfoData,
} from "@/api/product/sku/type"

//分页器当前页码
let pageNo = ref<number>(0)
//每一页展示几条数据
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
onMounted(() => {
  getHasSku()
})
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  skuArr.value = result.data.records
  total.value = result.data.total
}
</script>

<style scoped></style>
