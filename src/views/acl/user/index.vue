<template>
  <el-card>
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="!keyword.length">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 10px;">
    <el-button type="primary" @click="addUser">添加</el-button>
    <el-button type="danger" :disabled="!selectUser.length" @click="deleteSelect">批量删除</el-button>
    <el-table border style="margin: 10px 0;" :data="userArr" max-height="370px" @selection-change="handleSelect">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="用户名字" align="center" prop="name" show-overflow-tooltip> </el-table-column>
      <el-table-column label="用户名称" align="center" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" @click="setRole(row)" icon="User">分配角色</el-button>
          <el-button type="warning" size="small" @click="editUser(row)" icon="Edit">编辑</el-button>

          <el-popconfirm :title="`确定删除${row.name}?`" @confirm="deleteUser(row.id)">
            <template #reference>
              <el-button type="danger" size="small" @click="" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
      :background="true" layout=" prev, pager, next, jumper,->,total, sizes" :total="total" @size-change="handle"
      @current-change="getHasUser" />
    <!-- 抽屉 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>添加用户</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名:" prop="name">
            <el-input placeholder="请输入用户姓名" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称:" prop="username">
            <el-input placeholder="请输入用户昵称" v-model="userParams.username"></el-input>
          </el-form-item>
          <el-form-item label="用户密码:" prop="password" v-if="!userParams.id">
            <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">提交</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 分配角色 -->
    <el-drawer v-model="drawer2">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户名字">
            <el-input :disabled="true" v-model="userParams.name"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
              @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">{{
                role.roleName
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue"
import { reqSelectUser, reqDeleteUser, reqAllUser, reqAddOrUpdateUser, reqALLRole, reqSetUserRole } from '@/api/acl/user'
import type { UserResponseData, Records, User, AllRoleResponseData, AllRole, SetRoleData } from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
import useLayoutStore from '@/store/modules/setting'

let settingStore = useLayoutStore()
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let keyword = ref<string>('')

let userParams = reactive<User>({
  name: '',
  username: '',
  password: ''
})
let formRef = ref<any>()
let drawer2 = ref<boolean>(false)
let checkAll = ref<boolean>(false)
//用户的职位
let userRole = ref<AllRole>([])
//全部的职位
let allRole = ref<AllRole>([])
let selectUser = ref<any>([])

onMounted(() => {
  getHasUser()
})
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseData = await reqAllUser(pageNo.value, pageSize.value, keyword.value)
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
const handle = () => {
  getHasUser()
}
//添加用户
const addUser = () => {
  drawer.value = true
  Object.assign(userParams, {
    id: 0,
    name: '',
    username: '',
    password: ''
  })
  nextTick(() => {
    console.log(formRef.value)
    formRef.value.resetFields()
  })
}
//编辑用户
const editUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
}
//提交功能
const save = async () => {
  //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateUser(userParams)
  console.log(result);
  if (result.code == 200) {
    drawer.value = false
    // getHasUser(userParams.id ? pageNo.value : 1)
    ElMessage({
      type: "success",
      message: userParams.id ? '更新成功' : '添加成功'
    })
    window.location.reload()
  } else {
    drawer.value = false
    getHasUser()
    ElMessage({
      type: "error",
      message: userParams.id ? '更新失败' : '添加失败'
    })
  }
}
//取消
const cancel = () => {
  drawer.value = false
  getHasUser()
}
//表单校验规则
const validatorName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack('用户名长度不能小于5')
  }
}
//校验用户名字回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少五位'))
  }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码至少六位'))
  }
}
const rules = {
  name: [{ required: true, tigger: 'blur', validator: validatorName }],
  username: [{ required: true, tigger: 'blur', validator: validatorUsername }],
  password: [{ required: true, tigger: 'blur', validator: validatorPassword }],

}

//分配角色
const setRole = async (row: User) => {

  Object.assign(userParams, row)
  let result: AllRoleResponseData = await reqALLRole(row.id as number)
  if (result.code == 200) {
    userRole.value = result.data.assignRoles
    allRole.value = result.data.allRolesList
    drawer2.value = true

  }

}
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}
//分配角色提交
const confirmClick = async () => {
  let data: SetRoleData = {
    roleIdList: userRole.value.map(item => {
      return item.id as number
    }),
    userId: userParams.id as number
  }
  let result: any = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配成功'
    })
    drawer2.value = false
    getHasUser(pageNo.value)
  }
}

//删除用户
const deleteUser = async (userId: number) => {
  let result = await reqDeleteUser(userId)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

//批量删除
const handleSelect = (value: any) => {
  selectUser.value = value
}

const deleteSelect = async () => {
  selectUser.value = selectUser.value.map((item: any) => {
    return item.id
  })
  console.log(selectUser.value);

  let result: any = await reqSelectUser(selectUser.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

//搜索功能
const search = () => {
  getHasUser()
  keyword.value = ''
}
//重置
const reset = () => {
  console.log(settingStore);

  settingStore.refresh = !settingStore.refresh
}

</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
