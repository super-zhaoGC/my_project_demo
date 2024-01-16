<template>
  <div class="">
    <Category :scene="scene"></Category>
    <el-card>
      <div v-show="scene == 0">
        <el-button type="primary" size="default" @click="addSPU(categoryStore.c3Id)" icon="Plus"
          :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
        <el-table border style="margin: 10px 0;" :data="records" max-height="400px">
          <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" title="添加SKU" icon="Plus" @click="addSku(row)"></el-button>
              <el-button type="warning" size="small" title="修改SKU" icon="Edit" @click="updateSpu(row)"></el-button>
              <el-button type="info" size="small" title="查看SPU列表" icon="InfoFilled" @click="checkSpu(row)"></el-button>
              <el-popconfirm title="是否删除?" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="danger" size="small" title="删除SPU" icon="Delete"></el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-dialog v-model="show" title="SKU列表">
          <el-table border :data="skuList">
            <el-table-column label="SKU名称" align="center" prop="skuName"></el-table-column>
            <el-table-column label="SKU价格" align="center" prop="price"></el-table-column>
            <el-table-column label="SKU重量" align="center" prop="weight"></el-table-column>
            <el-table-column label="SKU图片" align="center">
              <template #="{ row, $index }">
                <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
          :background="true" layout=" prev, pager, next, jumper,->,total,sizes" :total="total" @current-change="getSpu"
          @size-change="changeSize" />
      </div>
      <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reqHasSpu, reqSkuList } from '@/api/product/spu'
import { ref, watch, onBeforeUnmount } from "vue"
import type { Records, SpuData, skuData, skuInfoData } from "@/api/product/spu/type"
import useCategoryStore from "@/store/modules/category"
import SpuForm from "./spuForm.vue"
import SkuForm from "./skuForm.vue"
import { reqDeleteSpu } from '@/api/product/spu'
import { ElMessage } from 'element-plus'

let scene = ref<number>(0)//场景值0：初始表格，1：添加/修改Spu，2：添加/修改Sku
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
let categoryStore = useCategoryStore()
//获取子组件实例
let spu = ref()
let sku = ref()
let show = ref<boolean>(false)
let skuList = ref<skuData[]>([])

watch(() => categoryStore.c3Id, () => {
  records.value = []
  if (!categoryStore.c3Id) return
  getSpu()
})
const getSpu = async (page = 1) => {
  pageNo.value = page
  let result = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  records.value = result.data.records
  total.value = result.data.total
}
const changeSize = () => {
  getSpu()
}
//添加SPU
const addSPU = (c3Id: number | string) => {
  scene.value = 1
  spu.value.initAddSpu(c3Id)
}

//修改Spu
const updateSpu = (row: SpuData) => {
  scene.value = 1
  //调用子组件方法
  spu.value.initSpuData(row)
}
//子组件改变场景值
const changeScene = (obj: any) => {
  scene.value = obj.flag
  //改变场景之后再次获取数据
  if (obj.params == 'update') {
    //更新留在当前页
    getSpu(pageNo.value)
  } else {
    //添加留在第一页
    getSpu()

  }
}
//删除SPu
const deleteSpu = async (row: SpuData) => {
  let result = await reqDeleteSpu(row.id as number)

  if (result.code == 200) {
    ElMessage.success('删除成功')
    getSpu(pageNo.value)
  }

}

//添加sku按钮的回调
const addSku = (row: SpuData) => {
  //点击添加sku按钮切换场景为2
  scene.value = 2
  //调用子组件的方法初始化添加sku的数据

  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)

}

//查看sku数据列表
const checkSpu = async (row: SpuData) => {
  let result: skuInfoData = await reqSkuList(row.id as number)
  console.log(result);
  if (result.code == 200) {
    skuList.value = result.data
    show.value = true
  }
}

//路由组件销毁前，清空仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})

</script>

<style scoped></style>
