<template>
  <div class="">
    <category></category>
    <el-card>
      <el-button type="primary" icon="plus">添加属性</el-button>
      <el-table style="width: 100%;margin: 10px 0;" border>
        <el-table-column label="序号" width="80" align="center" />
        <el-table-column label="属性名称" width="180" align="center" />
        <el-table-column label="属性值名称" align="center" />
        <el-table-column label="操作" width="180" align="center" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
</script>

<style scoped></style>
