<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules">
          <h1>Hello!</h1>
          <h2>欢迎来到后台管理系统！</h2>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" :prefix-icon="Lock" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue"
import { ref, reactive } from "vue"
import useUserStore from '@/store/modules/user.ts'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'

import { time } from '@/utils/time'
const $router = useRouter()
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
let loading = ref(false)
let userStore = useUserStore()
let $route = useRoute()
const login = async () => {
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })

    ElNotification({
      type: 'success',
      message: '欢迎回来！',
      title: `HI,${time()}!`

    })
    loading.value = false

  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
    loading.value = false

  }
}

//定义表单验证规则
const rules = {
  username: [{ required: true, min: 5, max: 10, message: '用户名长度在5-10之间', trigger: 'blur' }],
  password: [{ required: true, min: 6, max: 16, message: '密码长度在6-16之间', trigger: 'blur' }]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("../../assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    top: 35vh;
    width: 80%;
    // height: 30vh;
    background: url("../../assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: #ffffff;
      font-size: 40px;
    }

    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
