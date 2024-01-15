<template>
  <div class="">
    <el-card>
      <el-form inline style="display: flex;justify-content: space-around;">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.c1Id" @change="reqC2" :disabled="scene === 0 ? false : true">
            <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="categoryStore.c2Id" @change="reqC3" :disabled="scene === 0 ? false : true">
            <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select v-model="categoryStore.c3Id" :disabled="scene === 0 ? false : true">
            <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
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
  categoryStore.c1Id = ''
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  reqC1()
})
const reqC1 = () => {
  categoryStore.getC1()

}

const reqC2 = () => {
  categoryStore.getC2()
  categoryStore.getC1()
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
}
const reqC3 = () => {
  categoryStore.getC3()
  categoryStore.c3Id = ''

}

defineProps(['scene'])
</script>

<style scoped></style>
