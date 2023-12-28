<script setup>
    import router from '@/router';

</script>

<template>
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg bg-custom navbar-dark fixed-top">
        <div class="container">
            <!-- 标题 -->
            <router-link to="#" class="navbar-brand">标题</router-link>

            <!-- 展开按钮 -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- 菜单项 -->
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><router-link class="nav-link" to="#">主页</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/article/list">文章</router-link></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            下拉框
                        </a>
                        <ul class="dropdown-menu">
                            <li><router-link class="dropdown-item" to="#">Action</router-link></li>
                            <li><router-link class="dropdown-item" to="#">Another action</router-link></li>
                            <li><router-link class="dropdown-item" to="#">Something else here</router-link></li>
                        </ul>
                    </li>
                </ul>
                <!-- 搜索框 -->
                <form class="d-flex me-5" role="search">
                    <input class="form-control me-2" type="search" placeholder="搜索" aria-label="Search">
                    <button class="btn btn-outline-success border-0 bi-search" type="submit" style="margin-left:-3rem"></button>
                </form>
                <!-- 按钮 -->
                <div class="button-group">
                    <button type="button" class="btn btn-custom text-white bi-bell-fill"></button>
                    <button type="button" class="btn btn-custom text-white bi-person-circle"></button>
                </div>
            </div>
        </div>
    </nav>

    <!-- 主体内容 -->
    <main class="container pt-5">
        <router-view></router-view>
    </main>
</template>

<style scoped>
    body {
        background-color: #F0F3F8;
    }
</style>
