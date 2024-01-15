<template>
  <div class="">
    <el-form label-width="100">
      <el-form-item label="SKU名称">
        <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type=" number" v-model="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="70px">
          <el-form-item :label="item.attrName" v-for="(item, index) in  attrArr " :key="item.id">
            <el-select style="margin-bottom: 10px;" v-model="item.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${item.id}:${attrValue.id}`"
                v-for="attrValue in  item.attrValueList " :key="attrValue.attrId"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="70px">
          <el-form-item :label="item.saleAttrName" v-for="(item, index) in  saleArr " :key="item.id">
            <el-select v-model="item.saleIdAndValueId">
              <el-option :label="attrValue.saleAttrValueName" :value="`${item.id}:${attrValue.id}`"
                v-for="attrValue in  item.spuSaleAttrValueList " :key="attrValue.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column label="图片" align="center">
            <template #="{ row, $index }">
              <el-image :src="row.imgUrl" :preview-src-list="imgArr" style="width: 100px;height: 100px;" /></template>
          </el-table-column>
          <el-table-column label="名称" align="center" prop="imgName"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #="{ row, $index }">
              <el-button type="primary" size="default" @click="handleImg(row)">设置默认</el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="save">提交</el-button>
        <el-button type="" size="default" @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { reqTableAttr } from "@/api/product/attr/index"
import { reqSpuHasSaleAtttr, reqSpuImageList, reqAddSku } from "@/api/product/spu/index"
import type { skuData, } from "@/api/product/spu/type"
import { ElMessage } from "element-plus";

let table = ref()
let $emit = defineEmits(['changeScene'])

//定义接受sku参数
const skuParams = reactive<skuData>({
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //SPU品牌的ID
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '', //sku图片地址
})

//取消按钮回调
const cancel = () => {

  $emit('changeScene', { flag: 0, params: 'update' })
}
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])
//
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId

  let result1: any = await reqTableAttr(c1Id, c2Id, spu.category3Id)
  let result2: any = await reqSpuHasSaleAtttr(spu.id)
  let result3: any = await reqSpuImageList(spu.id)
  attrArr.value = result1.data
  saleArr.value = result2.data
  imgArr.value = result3.data
}
//设置默认图片
const handleImg = (row: any) => {
  table.value.clearSelection()
  table.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

//提交按钮回调
const save = async () => {
  //处理数据
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])

  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({ saleAttrId, saleAttrValueId })
    }
    return prev
  }, [])

  let result: any = await reqAddSku(skuParams)
  console.log(result);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加成功'
    })
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败'
    })
  }

}

//对外暴露sku的方法
defineExpose({ initSkuData })
</script>

<style scoped></style>
