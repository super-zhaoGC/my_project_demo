<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option v-for="(item) in AllTrademarkList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU介绍">
      <el-input type="textarea" placeholder="请输入SPU介绍" v-model="spuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="照片墙">
      <el-upload v-model:file-list="SpuHasImgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%;" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select v-model="saleAttrIdAndAttrName"
        :placeholder="unSelectedSaleAttr.length ? `还有${unSelectedSaleAttr.length}个未选择` : '无'">
        <el-option v-for="(item, index) in unSelectedSaleAttr" :key="item.id" :label="item.name"
          :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button :disabled="saleAttrIdAndAttrName ? false : true" style="margin-left: 10px;" type="primary" size="default"
        icon="Plus" @click="addSaleAttr">添加属性</el-button>
      <el-table border style="margin: 10px 0;" :data="SaleAttrResponseDataList">
        <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
        <el-table-column label="销售属性名字" align="center" width="120px" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值" align="center">
          <!-- row:即为当前SPU已有的销售属性对象 -->
          <template #="{ row, $index }">
            <el-tag class="mx-1" closable style="margin: 0px 5px" @close="row.spuSaleAttrValueList.splice(index, 1)"
              v-for="(item, index) in row.spuSaleAttrValueList" :key="row.id">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input v-if="row.flag == true" v-model="row.saleAttrValue" autofocus @blur="toLook(row)"
              placeholder="请输入属性值" style="height: 25px;width: 15%;margin-right: 5px;"></el-input>
            <el-button v-else type="primary" size="small" icon="Plus" @click="toEdit(row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100px">
          <template #="{ row, $index }">
            <el-button type="danger" size="small" icon="Delete"
              @click="SaleAttrResponseDataList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save" :disabled="!SaleAttrResponseDataList.length">保存</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

import { ref, computed, nextTick } from "vue"
import { reqAllTrademark, reqSpuImageList, reqSpuHasSaleAtttr, reqAllSaleAttr, reqAddorUpdateSpu } from "@/api/product/spu";
import type { SaleAttrValue, AllTrademark, SpuHasImg, SpuData, HasSaleAttrResponseData, SaleAttrResponseData, Trademark, SpuImg, SaleAttr, HasSaleAttr } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
let $emit = defineEmits(['changeScene'])
const cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
}

let AllTrademarkList = ref<Trademark[]>([])
let SpuHasImgList = ref<SpuImg[]>([])
let SaleAttrResponseDataList = ref<SaleAttr[]>([])
let HasSaleAttrResponseDataList = ref<HasSaleAttr[]>([])

let spuParams = ref<SpuData>({
  category3Id: '', //收集三级分类的ID
  spuName: '', //SPU的名字
  description: '', //SPU的描述
  tmId: '', //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})

const initSpuData = async (spu: SpuData) => {

  spuParams.value = spu
  let result1: AllTrademark = await reqAllTrademark()
  let result2: SpuHasImg = await reqSpuImageList((spu.id) as number)
  let result3: SaleAttrResponseData = await reqSpuHasSaleAtttr((spu.id) as number)
  let result4: HasSaleAttrResponseData = await reqAllSaleAttr()

  AllTrademarkList.value = result1.data
  SpuHasImgList.value = result2.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  SaleAttrResponseDataList.value = result3.data
  HasSaleAttrResponseDataList.value = result4.data

}


let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')
//照片墙放大功能
const handlePictureCardPreview: any['onPreview'] = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
//照片墙删除功能
const handleRemove: any['onRemove'] = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles)
}
//照片钱上传成功之前的钩子约束文件的大小与类型
const handlerUpload = (file: any) => {
  if (
    file.type == 'image/png' ||
    file.type == 'image/jpeg' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF',
    })
    return false
  }
}

//计算出当前为添加的销售属性
let unSelectedSaleAttr = computed(() => {
  //HasSaleAttrResponseDataList:所有的销售属性
  //SaleAttrResponseDataList:当前SPU已有的销售属性
  let unSelectAttr = HasSaleAttrResponseDataList.value.filter(item => {
    return SaleAttrResponseDataList.value.every(i => {
      return item.name != i.saleAttrName
    })
  })
  return unSelectAttr
})
//收集还未选择的销售属性
let saleAttrIdAndAttrName = ref<string>('')
//添加还未选择的销售属性
const addSaleAttr = () => {
  /*
  "baseSaleAttrId": number,
  "saleAttrName": string,
  "spuSaleAttrValueList": SpuSaleAttrValueList
  */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndAttrName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  //添加到数组中
  SaleAttrResponseDataList.value.push(newSaleAttr)
  //清空下拉框的值
  saleAttrIdAndAttrName.value = ''
}

//table表格编辑模式
const toEdit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
  // nextTick(() => {
  //   let autofocus = ref()
  //   alert(autofocus.value)
  // })
}
//table表格查看模式
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string
  }
  if ((saleAttrValue as string).trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空！',
    })
    return
  }
  //判断属性值是否在数组当中存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })


  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值重复!',
    })
    return
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

//保存方法
const save = async () => {
  //照片墙数据
  spuParams.value.spuImageList = SpuHasImgList.value.map((item: any) => {
    return {
      imgName: item.name, //图片的名字
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })

  //销售数据
  spuParams.value.spuSaleAttrList = SaleAttrResponseDataList.value

  let result = await reqAddorUpdateSpu(spuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    //通知父组件切换场景为0
    $emit('changeScene', { flag: 0, params: spuParams.value.id ? 'update' : 'add' })
  } else {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
  }
}
//添加spu数据
const initAddSpu = async (c3Id: number | string) => {
  //清空数据
  spuParams.value.category3Id = ''
  Object.assign(spuParams.value, {
    category3Id: '', //收集三级分类的ID
    spuName: '', //SPU的名字
    description: '', //SPU的描述
    tmId: '', //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  })
  //清空销售属性
  SaleAttrResponseDataList.value = []
  //清空照片墙
  SpuHasImgList.value = []
  //清空下拉框选中数据
  saleAttrIdAndAttrName.value = ''

  let result1: AllTrademark = await reqAllTrademark()
  let result2: HasSaleAttrResponseData = await reqAllSaleAttr()
  AllTrademarkList.value = result1.data
  HasSaleAttrResponseDataList.value = result2.data
  spuParams.value.category3Id = c3Id

}

//对外暴露方法
defineExpose({ initSpuData, initAddSpu })

</script>

<style scoped></style>
