import {createRouter, createWebHistory} from 'vue-router'

// 导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'

import ArticleListVue from '@/views/article/ArticleList.vue'
// import ArticleListVue from '@/views/article/ArticleList.vue'
// import ArticleListVue from '@/views/article/ArticleList.vue'

// 定义路由关系
const routes = [
    {
        path: '/login',
        component: LoginVue
    },
    {
        path: '/',
        component: LayoutVue,
        redirect: '/article/list', // 重定向
        // 子路由
        children: [
            {
                path: '/article/list',
                component: ArticleListVue
            },
            // {
            //     path: '/user',
            //     name: 'user',
            //     component: () => import('@/views/User.vue')
            // }
        ]        
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导出路由
export default router