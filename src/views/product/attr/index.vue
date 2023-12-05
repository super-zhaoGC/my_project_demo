<template>
  <div>
    <category :scene="scene"></category>
    <el-card>
      <div v-show="scene === 0">
        <el-button type="primary" icon="plus" :disabled="categoryStore.c3Id ? false : true"
          @click="addAttr">添加属性</el-button>
        <el-table style="width: 100%;margin: 10px 0;" border :data="attrArr" stripe>
          <el-table-column label="序号" width="80" align="center" type="index" />
          <el-table-column label="属性名称" width="180" align="center" prop="attrName" />
          <el-table-column label="属性值名称" align="center">
            <template #="{ row, index }">
              <el-tag style="margin: 5px 10px;" v-for="item in row.attrValueList" :key="item.id" class="ml-2"
                type="danger">{{
                  item.valueName
                }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template #="{ row, index }">
              <!-- 修改已有属性的按钮 -->
              <el-button type="warning" size="small" icon="Edit" @click="editAttr"></el-button>

              <el-popconfirm :title="`确定删除${row.attrName}属性吗?`" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性列表 -->
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="plus" @click="addAttrValue"
          :disabled="attrParams.attrName ? false : true">添加属性值</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="row.flag" @blur="toLook(row, $index)"
                v-model="row.valueName" placeholder="请输入属性值名称" />
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, $index }">
              <el-button icon="delete" type="danger" size="small"
                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
            </template>

          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, nextTick, onBeforeUnmount } from "vue"
import { reqTableAttr, reqAddOrUpdateAttr, reqRemoveAttr } from "@/api/product/attr"
import useCategoryStore from "@/store/modules/category";
import type { AttrResponseData, Attr, AttrValue } from "@/api/product/attr/type.ts";
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
watch(() =>
  categoryStore.c3Id
  , () => {
    attrArr.value = []
    if (!categoryStore.c3Id) {
      return
    }
    getAttr()
  })
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqTableAttr(c1Id, c2Id, c3Id)

  attrArr.value = result.data

}
//定义表格切换
const scene = ref<number>(0)
const addAttr = () => {
  scene.value = 1
  Object.assign(attrParams, {
    attrName: '',//新增的属性的名字
    attrValueList: [],//新增的属性的属性值列表
    categoryId: categoryStore.c3Id,//三级分类的Id
    categoryLevel: 3,//代表的三级分类
  })
}
const editAttr = () => {
  scene.value = 1
}
const cancel = () => {
  scene.value = 0
}
//定义收集新增或者修改属性的参数
const attrParams = reactive<Attr>({
  attrName: '',//新增的属性的名字
  attrValueList: [],//新增的属性的属性值列表
  categoryId: '',//三级分类的Id
  categoryLevel: 3,//代表的三级分类
})
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,//定义控制新增属性值的查看和编辑状态
  })
  nextTick(() => {
    inputArr[attrParams.attrValueList.length - 1].focus()
  })
}
//提交保存
const save = async () => {

  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    })
    scene.value = 0
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    })
  }
  scene.value = 0
}
//定义新增属性的查看状态
const toLook = (row: AttrValue, $index: number) => {
  row.flag = false
  //非法情况判断1
  if (row.valueName.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return
  }
  //非法情况判断2
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {

    //将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
}
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

//定义数组用来存储input组件实例
let inputArr = ref<any>([])

//删除属性
const deleteAttr = async (attrId: number) => {
  let result: any = await reqRemoveAttr(attrId)
  //删除成功
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //获取一次已有的属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }

}
//组件销毁之前清空数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
