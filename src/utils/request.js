import axios from 'axios';
import router from '@/router';
import {useTokenStore}  from '@/stores/token.js';

// 定义一个变量,记录公共的前缀 baseURL
const baseURL = '/api';
const instance = axios.create({ baseURL })

// 添加响应拦截器
instance.interceptors.response.use(
    result => {
        return result.data;
    },
    err => {
        // 判断是否登录
        if (err.response.status === 401) {
            alert('请先登录')
            userRouter.push('/login')
        } else {
            alert('服务异常')
        }

        return Promise.reject(err); // 异步的状态转化成失败的状态
    }
)

// 添加请求拦截器
instance.interceptors.request.use(
    // 请求前的回调
    (config) => {
        const tokenStore = useTokenStore() // 获取token

        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token // 将token添加到请求头中
        }

        return config
    },

    // 请求错误的回调
    (err) => {
        Promise.reject(err)
    }
)

export default instance;