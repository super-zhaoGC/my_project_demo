<template>
  <el-card>
    <el-table :data="permissionArr" style="width: 100%" row-key="id" border lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="code" label="权限值" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="addPermission(row)" :disabled="row.level == 4 ? true : false">{{
            row.level == 3 ?
            '添加功能' : '添加菜单' }}</el-button>
          <el-button type="warning" size="small" @click="updatePermission(row)"
            :disabled="row.level == 1 ? true : false">编辑</el-button>

          <el-popconfirm :title="`确定删除${row.name}?`" @confirm="removeMenu(row.id)">
            <template #reference>
              <el-button type="danger" size="small" @click="" :disabled="row.level == 1 ? true : false">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form label-width="60px">
        <el-form-item label="名称">
          <el-input placeholder="请输入名称" v-model="menuParams.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input placeholder="请输入权限值" v-model="menuParams.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
import type { PermissionList, PermissionResponseData, Permission, MenuParams } from '@/api/acl/menu/type'
import { ElMessage } from "element-plus";

//存储全部菜单数组
let permissionArr = ref<PermissionList>([])
//dialog对话框显示与隐藏
let dialogVisible = ref<boolean>(false)
//接受参数
let menuParams = reactive<MenuParams>({
  pid: 0,
  name: '',
  code: '',
  level: 0
})

onMounted(() => {
  getHasPermission()
})
//获取全部菜单数据
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission()
  if (result.code == 200) {
    permissionArr.value = result.data
  }
}

//添加功能
const addPermission = (row: Permission) => {
  Object.assign(menuParams, {
    id: 0,
    pid: 0,
    name: '',
    code: '',
    level: 0
  })
  dialogVisible.value = true
  menuParams.level = row.level + 1
  menuParams.pid = row.id as number


}
//编辑功能
const updatePermission = (row: Permission) => {
  dialogVisible.value = true
  Object.assign(menuParams, row)
}
//保存功能
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuParams)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: menuParams.id ? '编辑成功' : '添加成功' })
    getHasPermission()
    dialogVisible.value = false
  }
}
//删除功能
const removeMenu = async (id: number) => {
  let result: any = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasPermission()
  }
}
</script>

<style scoped></style>
