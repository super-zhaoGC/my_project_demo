<template>
  <el-card>
    <el-table border :data="skuArr" max-height="500px" style="margin-bottom: 10px;">
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
          <el-button :type="row.isSale === 1 ? 'primary' : 'success'" size="small" @click="updateSale(row)"
            :icon="row.isSale == 1 ? 'Top' : 'Bottom'"></el-button>
          <el-button type="warning" size="small" @click="editSku" icon="Edit"></el-button>
          <el-button type="info" size="small" @click="findSku(row)" icon="InfoFilled"></el-button>

          <el-popconfirm :title="`确定删除${row.skuName}?`" width="200px" @confirm="removeSku(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
      :small="small" :disabled="disabled" :background="true" layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total" @size-change="handleSizeChange" @current-change="getHasSku" />

    <!-- 抽屉 -->
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <span>商品详情</span>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag style="margin: 5px;" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName
          }}</el-tag>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag style="margin: 5px;" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{
            item.saleAttrValueName }}</el-tag>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">图片展示</el-col>
        <el-col :span="18">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { reqSkuList, reqCancelSale, reqOnSale, reqSkuInfo, reqRemoveSku } from "@/api/product/sku"
import type {
  SkuResponseData, SkuData,
  SkuInfoData,
} from "@/api/product/sku/type"
import { ElMessage } from "element-plus";

//分页器当前页码
let pageNo = ref<number>(0)
//每一页展示几条数据
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
//定义抽屉的状态
let drawer = ref<boolean>(false)
//商品详情数据
let skuInfo = ref<any>({})

onMounted(() => {
  getHasSku()
})
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  skuArr.value = result.data.records
  total.value = result.data.total
}
const handleSizeChange = async (num: number) => {
  let result: SkuResponseData = await reqSkuList(pageNo.value, num)
  skuArr.value = result.data.records
  total.value = result.data.total

}
//商品的上架下架功能
const updateSale = async (row: SkuData) => {
  if (row.isSale === 1) {
    let result: any = await reqCancelSale(row.id as number)
    console.log(result);
    if (result.code == 200) {
      ElMessage({
        type: "success",
        message: "上架成功"
      })
      getHasSku()

    }
  } else {
    let result: any = await reqOnSale(row.id as number)
    console.log(result);
    if (result.code == 200) {
      ElMessage({
        type: "success",
        message: "下架成功"
      })
      getHasSku()

    }
  }
}
const editSku = () => {

  ElMessage({ type: "info", message: "正在开发中" })
}
//查看sku详情
const findSku = async (row: SkuData) => {
  drawer.value = true
  let result = await reqSkuInfo(row.id as number)
  console.log(result);

  skuInfo.value = result.data
}
//删除sku
const removeSku = async (id: number) => {
  let result = await reqRemoveSku(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getHasSku()
  } else {
    ElMessage({
      type: 'success',
      message: '删除失败'
    })
  }
}

</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
