<script setup>
    import {ref} from 'vue'
    import {useRouter} from 'vue-router' // 导入路由
    import {useTokenStore} from '@/stores/token.js'
    import {userRegisterService, userLoginService} from '@/api/user.js' // 导入用户接口

    const isRegister = ref(false) // 控制注册与登录表单的显示
    const router = useRouter()
    const tokenStore = useTokenStore()

    // 定义数据模型
    const registerData = {
        username: '',
        password: '',
        rePassword: '',
        email: '',
    }

    const loginData = {
        username: '',
        password: '',
    }

    // 警告框函数
    const message = ref('') // 警告框信息
    const type = ref('alert-primary') // 警告框样式
    const icon = ref('') // 图标框样式
    const warnBox = (msg, typ, ico) => {
        message.value = msg
        type.value = typ
        icon.value = ico
    }

    // 登录校验
    const loginCheck = async (loginData) => {
        if (!loginData.username) {
            warnBox('请输入用户名！', 'alert-warning', 'bi-exclamation-circle-fill')
        } else if (!loginData.password) {
            warnBox('请输入密码！', 'alert-warning', 'bi-exclamation-circle-fill')
        } else {
            // 调用登录接口
            let result = await userLoginService(loginData)
            if (result.code === 0) {
                warnBox(result.message ? result.message : '登录成功！', 'alert-success', 'bi-check-circle-fill')
                tokenStore.setToken(result.data) // 把token存到pinia中
                router.push('/') // 跳转到首页
            } else {
                warnBox(result.message ? result.message : '登录失败！', 'alert-danger', 'bi-exclamation-triangle-fill')
            }
        }
    }
    
    // 注册校验
    const registerCheck = async (registerData) => {
        if (!registerData.username) {
            warnBox('请输入用户名！', 'alert-warning', 'bi-exclamation-circle-fill')
        } else if (!registerData.email) {
            warnBox('请输入邮箱！', 'alert-warning', 'bi-exclamation-circle-fill')
        } else if (!registerData.password) {
            warnBox('请输入密码！', 'alert-warning', 'bi-exclamation-circle-fill')
        } else if (!registerData.rePassword) {
            warnBox('请再次输入密码！', 'alert-warning', 'bi-exclamation-circle-fill')
        } else if (registerData.password !== registerData.rePassword) {
            warnBox('两次输入的密码不一致！', 'alert-warning', 'bi-exclamation-circle-fill')
        } else {
            // 调用注册接口
            let result = await userRegisterService(registerData)
            if (result.code === 0) {
                warnBox(result.message ? result.message : '注册成功！', 'alert-success', 'bi-check-circle-fill')
            } else {
                warnBox(result.message ? result.message : '注册失败！', 'alert-danger', 'bi-exclamation-triangle-fill')
            }
        }
    }

</script>

<template>
    <div class="container" style="max-width: 550px">
        <!-- 警告框 -->
        <div class="alert d-flex" :class="type" role="alert" v-if="message">
            <div class="flex-shrink-0 me-2" :class="icon"></div>
            {{ message }}
        </div>

        <!-- 登录表单 -->
        <div v-if="!isRegister">    
            <h2 class="text-center text-custom pt-5 pb-5">用户登录</h2>
            <div class="bg-white p-4 shadow-sm rounded border">
                <form action="#" method="post" enctype="multipart/form-data" :model="loginData">
                    <input type="text" class="form-control mb-4" placeholder="用户名" v-model="loginData.username">
                    <input type="password" class="form-control mb-4" placeholder="密码" v-model="loginData.password">
                    <div class="button-group mb-4">
                        <input class="form-check-input me-2" id="remember_me" type="checkbox" value="">
                        <label class="form-check-label" for="remember_me">记住我</label>
                    </div>
                    <input type="submit" class="btn btn-custom text-white w-100" value="登录" @click.prevent="loginCheck(loginData)">
                </form>
            </div>
            <div class="button-group m-2">
                <a class="link-custom text-decoration-none" href="#" @click="isRegister = true">注册</a>
                <a class="link-custom text-decoration-none float-end" href="#">忘记密码</a>
            </div>
        </div>

        <!-- 注册表单 -->
        <div v-if="isRegister"> 
            <h2 class="text-center text-custom pt-5 pb-5">用户注册</h2>
            <div class="bg-white p-4 shadow-sm rounded border">
                <form action="#" method="post" enctype="multipart/form-data" :model="registerData">
                    <input type="text" class="form-control mb-4" placeholder="用户名" v-model="registerData.username">
                    <input type="email" class="form-control mb-4" placeholder="邮箱" v-model="registerData.email">
                    <input type="password" class="form-control mb-4" placeholder="密码" v-model="registerData.password">
                    <input type="password" class="form-control mb-4" placeholder="确认密码" v-model="registerData.rePassword">
                    <input type="submit" class="btn btn-custom text-white w-100" value="注册" @click.prevent="registerCheck(registerData)">
                </form>
            </div>
            <div class="button-group m-2">
                <a class="link-custom text-decoration-none" href="#" @click="isRegister = false">返回登录</a>
            </div>
        </div>
    </div>      
</template>

<style lang="scss" scoped>
    
</style>