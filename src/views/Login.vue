<script setup>
    import {ref} from 'vue'
    import {userRegisterService} from '@/api/user.js' // 导入用户接口

    const isRegister = ref(false) // 控制注册与登录表单的显示

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
    const warnBox = (msg, typ) => {
        message.value = msg
        type.value = typ
    }

    // 登录校验
    // const registerCheck = (value) => {
    //     if (value === '') {
    //         message.value = '请输入密码！'
    //     }

    //     if (value !== registerData.rePassword) {
    //         message.value = '两次输入的密码不一致！'
    //     }
    // }
    
    // 注册校验
    const registerCheck = async (registerData) => {
        if (registerData.username === '') {
            warnBox('请输入用户名！', 'alert-danger')
        } else if (registerData.email === '') {
            warnBox('请输入邮箱！', 'alert-danger')
        } else if (registerData.password === '') {
            warnBox('请输入密码！', 'alert-danger')
        } else if (registerData.rePassword === '') {
            warnBox('请再次输入密码！', 'alert-danger')
        } else if (registerData.password !== registerData.rePassword) {
            warnBox('两次输入的密码不一致！', 'alert-danger')
        } else {
                // 调用注册接口
                let result = await userRegisterService(registerData.value)
                if (result.code === 0) {
                    warnBox(result.message ? result.message : '注册成功！', 'alert-success')
                } else {
                    warnBox(result.message ? result.message : '注册失败！', 'alert-danger')
                }
            }
        }

</script>

<template>
    <div class="container" style="max-width: 550px">
        <!-- 警告框 -->
        <div class="alert show" :class="[type]" role="alert" v-if="message">{{ message }}</div>

        <!-- 登录表单 -->
        <div v-if="!isRegister">    
            <h2 class="text-center text-custom pt-5 pb-5">用户登录</h2>
            <div class="bg-white p-4 shadow-sm rounded border">
                <form action="#" method="post" enctype="multipart/form-data">
                    <input type="text" class="form-control mb-4" placeholder="用户名">
                    <input type="password" class="form-control mb-4" placeholder="密码">
                    <div class="button-group mb-4">
                        <input class="form-check-input" id="remember_me" type="checkbox" value="">
                        <label class="form-check-label" for="remember_me">记住我</label>
                    </div>
                    <input type="submit" class="btn btn-custom text-white w-100" value="登录" @click.prevent="loginCheck(registerData.password)">
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
    /* 添加淡入和淡出动画效果 */
    .show {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
</style>