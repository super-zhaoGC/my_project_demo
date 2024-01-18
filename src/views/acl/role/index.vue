<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="角色名称:">
        <el-input placeholder="请输入角色名称" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="!keyword.length">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px;">
    <el-button type="primary" @click="addRole">添加角色</el-button>

    <el-table border style="margin: 10px 0;" max-height="370px" :data="roleArr">
      <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="角色名称" align="center" prop="roleName" show-overflow-tooltip> </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="setPermiso(row)" icon="User">分配角色</el-button>
          <el-button type="warning" size="small" @click="updateRole(row)" icon="Edit">编辑</el-button>

          <el-popconfirm :title="`确定删除${row.roleName}?`" @confirm="removeRole(row.id)">
            <template #reference>
              <el-button type="danger" size="small" @click="" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 15, 20, 25]"
      :background="true" layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @size-change="handle"
      @current-change="getHasRole" />
  </el-card>
  <!-- dialog对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="roleParams.id ? '更新角色' : '添加角色'">
    <el-form :model="roleParams" :rules="rules" ref="form">
      <el-form-item label="角色名称" prop="roleName">
        <el-input placeholder="请输入角色名称" autocomplete="off" v-model="roleParams.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 抽屉展示权限数据 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree ref="tree" :data="meanList" show-checkbox node-key="id" :default-expanded-keys="selectArr"
        :default-checked-keys="selectArr" :props="defaultProps" />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="">取消</el-button>
        <el-button type="primary" @click="handleSelect">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from "vue"
import { reqRemoveRole, reqAllRole, reqAddOrUpdateRole, reqAllMeanList, reqSetPermission } from "@/api/acl/role";
import type { RoleResponseData, Records, RoleData, MeanDataResponse, MenuList } from "@/api/acl/role/type"
import { ElMessage } from "element-plus";

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let keyword = ref<string>('')
let roleArr = ref<Records>([])
let drawer = ref<boolean>(false)
//树形组件选中节点的数组
let selectArr = ref<number[]>([])
//树形组件实力
let tree = ref<any>()
//对话框状态
let dialogFormVisible = ref<boolean>(false)
let roleParams = reactive<RoleData>({
  roleName: ''
})
//form表单组件实例
let form = ref<any>()
let meanList = ref<MenuList>([])


onMounted(() => {
  getHasRole()
})
const getHasRole = async (pager = 1) => {
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRole(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    roleArr.value = result.data.records
    total.value = result.data.total
  }

}
const handle = () => {
  getHasRole()
}
//搜索
const search = () => {
  getHasRole()
  keyword.value = ''
}
//表单校验
const validatorRoleName = (rule: any, value: string, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('角色名称不能小于2位'))
  } else {
    callback()
  }
}
const rules = {
  roleName: [{
    required: true,
    trigger: 'blur',
    validator: validatorRoleName
  }],

}


//重置
const reset = () => {
  getHasRole()
}
//新增角色
const addRole = async () => {
  dialogFormVisible.value = true
  Object.assign(roleParams, {
    roleName: '',
    id: 0
  })
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//更新角色
const updateRole = (row: RoleData) => {
  dialogFormVisible.value = true
  Object.assign(roleParams, row)
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//提交
const save = async () => {
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: roleParams.id ? '更新成功' : '添加成功' })
    getHasRole(roleParams.id ? pageNo.value : 1)
    dialogFormVisible.value = false
  } else {
    ElMessage({ type: 'error', message: roleParams.id ? '更新失败' : '添加失败' })
    getHasRole(roleParams.id ? pageNo.value : 1)
    dialogFormVisible.value = false
  }
}
//设置权限
const setPermiso = async (row: RoleData) => {
  drawer.value = true
  Object.assign(roleParams, row)
  let result: MeanDataResponse = await reqAllMeanList(roleParams.id as number)
  console.log(result);
  if (result.code == 200) {
    meanList.value = result.data
    selectArr.value = filterSelectArr(meanList.value, [])
  }
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  });
  return initArr
}

//树形组件
const defaultProps = {
  children: 'children',
  label: 'name',
}
//分配权限确定按钮
const handleSelect = async () => {
  let roleId = roleParams.id as number
  //树形组件的半选中节点ID
  let arr1 = tree.value.getHalfCheckedKeys()
  //树形组件的选中节点的ID
  let arr2 = tree.value.getCheckedKeys()
  //数组合并
  let permissionId = arr2.concat(arr1)
  let result: any = await reqSetPermission(roleId, permissionId)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '分配权限成功' })
    drawer.value = false
    //页面刷新
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
}
//删除角色
const removeRole = async (id: number) => {
  let result: any = await reqRemoveRole(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasRole(roleArr.value.length > 0 ? pageNo.value : pageNo.value - 1)
  }
}

</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
