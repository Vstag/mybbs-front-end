import {createRouter, createWebHistory} from 'vue-router'

// 定义路由关系
const routes = [
    // 首页重定向
    {
        path: '/',
        redirect: '/article'
    },

    // 登录页
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    },

    // 前台页面
    {
        path: '/article',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: '/article',
                component: () => import('@/views/article/Article.vue'),
            },
            {
                path: 'detail',
                component: () => import('@/views/article/detail/Detail.vue')
            }
        ]
    },

    // 后台管理页面
    {
        path: '/manage',
        redirect: 'manage/article/category',
        component: () => import('@/views/manage/Manage.vue'),
        children: [
            {
                path: 'article/category',
                component: () => import('@/views/manage/article/ArticleCategory.vue')
            },
            {
                path: 'article/manage',
                component: () => import('@/views/manage/article/ArticleManage.vue')
            },
            {
                path: 'user/info',
                component: () => import('@/views/manage/user/UserInfo.vue')
            },
            {
                path: 'user/password',
                component: () => import('@/views/manage/user/UserPassword.vue')
            },
        ]
    },

    // 发布文章
    {
        path: '/publish',
        component: () => import('@/views/publish/Publish.vue')
    },

    // 状态页
    {
        path: '/status',
        redirect: '/status/404',
        children: [
            {
                path: '403',
                component: () => import('@/views/status/403.vue')
            },
            {
                path: '404',
                alias: '/:pathMatch(.*)*',
                component: () => import('@/views/status/404.vue')
            },
            {
                path: '500',
                component: () => import('@/views/status/500.vue')
            },
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