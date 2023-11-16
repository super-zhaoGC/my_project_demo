<template>
  <div class="">
    <el-card>
      <el-form inline style="display: flex;justify-content: space-around;">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.c1Id" @change="reqC2">
            <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="categoryStore.c2Id">
            <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select>
            <el-option label="被" value="1" />
            <el-option label="被" value="1" />
            <el-option label="被" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { onMounted } from "vue";
let categoryStore = useCategoryStore()
onMounted(() => {
  reqC1()
})
const reqC1 = () => {
  categoryStore.getC1()
}
const reqC2 = () => {
  categoryStore.getC2()
}
</script>

<style scoped></style>
