import {createRouter, createWebHistory} from 'vue-router'

// 定义路由关系
const routes = [
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/',
        component: () => import('@/views/Layout.vue'),
        redirect: '/home' // 重定向      
    },
    {
        path: '/article',
        component: () => import('@/views/Layout.vue'),
        redirect: '/article/list',
        children: [
            {
                path: '/article/list',
                component: () => import('@/views/article/List.vue')
            },
            {
                path: '/article/content',
                component: () => import('@/views/article/Content.vue')
            }
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