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
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性列表 -->
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" />
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="plus">添加属性值</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0;">
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue"
import { reqTableAttr } from "@/api/product/attr"
import useCategoryStore from "@/store/modules/category";
import type { AttrResponseData, Attr } from "@/api/product/attr/type.ts";
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
</script>

<style scoped></style>
