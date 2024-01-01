<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router' // 导入路由
import {useTokenStore} from '@/stores/token.js'
import {userRegisterService, userLoginService} from '@/api/user.js' // 导入用户接口
import { ElMessage } from 'element-plus'
import { User, Lock, Message } from '@element-plus/icons-vue' // 导入图标

const isRegister = ref(false) // 控制注册与登录表单的显示
const router = useRouter()
const tokenStore = useTokenStore()

// 定义数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: '',
    email: '',
})

//清空数据模型的数据
const clearRegisterData = ()=>{
    registerData.value={
        username:'',
        password:'',
        rePassword:'',
        email: ''
    }
}

// 表单校验相关
// 校验密码
const checkRePassword = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerData.value.password) {
        callback(new Error('两次输入的密码不一致'))
    }
    callback()
}
// 校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 16, message: '长度为3~16位非空字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 16, message: '长度为3~16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' },
        { min: 3, max: 16, message: '长度为3~16位非空字符', trigger: 'blur' }
    ]
}

// 调用登录接口
const login = async() => {
    let result =  await userLoginService(registerData.value);
    ElMessage.success(result.msg ? result.msg : '登录成功')

    tokenStore.setToken(result.data) //把得到的token存储到pinia中
    router.push('/') //跳转到首页
}

// 调用注册接口
const register = async() => {
    let result = await userRegisterService(registerData.value)
    ElMessage.success(result.msg ? result.msg : '注册成功')
}

</script>

<template>
    <el-span class="login-page">
        <el-card class="form">
            <!-- 注册表单 -->
            <el-form ref="form" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1 class="title">用户注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input :prefix-icon="Message" placeholder="请输入邮箱" v-model="registerData.email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>

                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>

                <el-form-item class="flex" style="margin: 0;">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                        登录
                    </el-link>
                </el-form-item>
            </el-form>

            <!-- 登录表单 -->
            <el-form ref="form" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1 class="title">用户登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>

                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>

                <el-form-item class="flex" style="margin: 0;">
                    <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
                        注册
                    </el-link>
                </el-form-item>
            </el-form>
        </el-card>
    </el-span>     
</template>

<style lang="scss" scoped>
.login-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center ;
    background: url(https://picx.zhimg.com/3b5d9eaa6b80cf4983b709a28662975c_r.jpg?source=1def8aca) no-repeat;
    background-size: cover;

    .form {
        width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        border-radius: 5px;
        box-shadow: var(--el-box-shadow)!important;

        .title {
            margin: 15px auto;
            margin-top: 30px;
            font-weight: normal;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>