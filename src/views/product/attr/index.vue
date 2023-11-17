<template>
  <div class="">
    <category></category>
    <el-card>
      <el-button type="primary" icon="plus" :disabled="categoryStore.c3Id ? false : true">添加属性</el-button>
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
            <el-button type="warning" size="small" icon="Edit"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
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
</script>

<style scoped></style>
