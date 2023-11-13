<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" icon="Plus" style="margin: 10px 0;" @click="addTrademark">添加品牌</el-button>
      <!-- 表格组件，用于展示已有的数据 -->
      <!-- 
      table
      ---border:是否有纵向的边框
      table-column
      ---lable：某一个列表标题
      ---width：设置这一列的宽度
      ---align：设置这一列对齐方式
     -->
      <el-table stripe style="width: 100%;margin-bottom: 10px;" border :data="trademarkArr">
        <el-table-column label="序号" width="80" header-align="center" type="index">
        </el-table-column>
        <el-table-column label="品牌名称" header-align="center">
          <template #="{ row, $index }">
            <div style="text-align: center;">{{ row.tmName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" header-align="center">
          <template #="{ row, $index }">
            <div style="text-align: center;">
              <img :src="(row.logoUrl).indexOf('http') == 0 ? row.logoUrl : 'http://' + row.logoUrl" alt=""
                style="width: 100px;height: 100px;">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" header-align="center">
          <template #="{ row, $index }">
            <div style="text-align: center;">
              <el-button type="primary" icon="Edit" style="margin: 10px ;" @click="editTrademark(row)"></el-button>
              <el-button type="primary" icon="Delete" style="margin: 10px"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <!-- 
      pagination
      ---v-model:current-page：设置当前分页器页码
      ---v-model:page-size:设置每一也展示数据条数
      ---page-sizes：每页显示个数选择器的选项设置
      ---background:背景颜色
      ---layout：分页器6个子组件布局的调整 "->"把后面的子组件顶到右侧
     -->
      <el-pagination @size-change="sizeChange" @current-change="getHasTrafemark" @prev-click="" @next-click=""
        v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
        layout=" prev, pager, next,->,  sizes,jumper,total," :total="total" />
    </el-card>
    <!-- dialog对话框 -->
    <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '编辑品牌' : '添加品牌'" width="45%" draggable>
      <el-form style="width: 80%;" label-width="80px" ref="ruleFormRef" :model="trademarkParams" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload v-loading="loading" class="avatar-uploader" action="/api/admin/product/fileUpload"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
//引入数据类型
import type { TrademarkMarkResponseData, Records } from '@/api/product/trademark/type'
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark'
import type { TradeMark } from "@/api/product/trademark/type"
import { ElMessage, UploadProps } from 'element-plus'
//页码
let pageNo = ref<number>(1)
//每页展示数据条数
let limit = ref<number>(3)
//数据
let trademarkArr = ref<Records>([])
//数据总数
let total = ref<number>(0)
//控制dialog显隐
let dialogVisible = ref<boolean>(false)
let loading = ref<boolean>(false)
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})
let ruleFormRef = ref()
//新增
const addTrademark = () => {
  dialogVisible.value = true
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  //第一种写法:ts的问号语法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    ruleFormRef.value.clearValidate('tmName')
    ruleFormRef.value.clearValidate('logoUrl')
  })
}
//编辑
const editTrademark = (row: TradeMark) => {
  console.log(row);
  dialogVisible.value = true
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
  // trademarkParams.id = row.id
  //ES6对象合并
  Object.assign(trademarkParams, row)
  //第一种写法:ts的问号语法
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  nextTick(() => {
    ruleFormRef.value.clearValidate('tmName')
    ruleFormRef.value.clearValidate('logoUrl')
  })
}
const cancel = () => {
  dialogVisible.value = false
}
const confirm = async () => {
  await ruleFormRef.value.validate()
  dialogVisible.value = false
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  console.log(result);
  if (result.code == 200) {

    //弹出提示信息
    ElMessage({

      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    //再次发请求获取已有全部的品牌数据
    getHasTrafemark(trademarkParams.id ? pageNo.value : 1)
  } else {
    //添加品牌失败
    ElMessage({

      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })

  }

}
//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  //要求:上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      loading.value = true
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  loading.value = false
  trademarkParams.logoUrl = response.data
  ruleFormRef.value.clearValidate('logoUrl')
}
//获取数据
const getHasTrafemark = async (page = 1) => {
  pageNo.value = page
  let result: TrademarkMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    trademarkArr.value = result.data.records
    total.value = result.data.total
  }
}
//当下拉菜单发生变化的时候触发此方法
//这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  //当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrafemark()
}
//定义表单验证规则
const checkInput = (rule: any, value: string, callback: any) => {

  if (value.length > 2 && value.length < 10) {
    callback();
  } else {
    callback(new Error('请输入2-10位字符'));
  }

}
const checkLogo = (rule: any, value: string, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请上传图片'))
  }
}
const rules = reactive<any>({
  tmName: { required: true, trigger: 'blur', validator: checkInput },
  logoUrl: { required: true, validator: checkLogo },
})
onMounted(() => {
  getHasTrafemark()
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
