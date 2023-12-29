<script setup>
    import { ref } from 'vue'
    import { Sunny, Moon } from '@element-plus/icons-vue'

    const activeIndex = ref('')
    const value = ref(false) // 开关默认状态

    // 搜索
</script>

<template>
    <el-container class="common-layout">
        <!-- 菜单栏 -->
        <el-header style="padding: 0;">
            <el-affix :offset="0">
                <el-menu
                    :default-active="activeIndex"
                    class="el-menu"
                    mode="horizontal"
                    :ellipsis="false"
                    @select="handleSelect"
                >

                    <div class="flex-grow" style="max-width: 7rem;" />

                    <!-- LOGO -->
                    <el-menu-item class="hidden-sm-and-down">
                        <img
                            style="width: 100px"
                            src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
                            alt="LOGO"
                        />
                    </el-menu-item>

                    <!-- 左侧菜单项 -->
                    <el-menu-item index="index">首页</el-menu-item>
                    <el-menu-item index="article">文章</el-menu-item>
                    <el-menu-item index="">其他</el-menu-item>

                    <div class="flex-grow" />

                    <!-- 搜索框 -->
                    <el-space>
                        <el-autocomplete
                            v-model="state"
                            :fetch-suggestions="querySearch"
                            popper-class="my-autocomplete"
                            placeholder="搜索..."
                            @select="handleSelect"
                        >
                            <template #suffix>
                                <el-icon class="el-input__icon" @click="handleIconClick">
                                    <Search />
                                </el-icon>
                            </template>
                            <template #default="{ item }">
                                <div class="value">{{ item.value }}</div>
                                <span class="link">{{ item.link }}</span>
                            </template>
                        </el-autocomplete>
                    </el-space>

                    <div class="flex-grow" />

                    <!-- 右侧菜单项 -->
                    <el-space :size="25">
                        <el-switch
                            v-model="value"
                            class="ml-2"
                            style="--el-switch-on-color: #2C2C2C; --el-switch-off-color: #DCDFE6"
                            inline-prompt
                            :active-icon="Moon"
                            :inactive-icon="Sunny"
                        />

                        <!-- 通知 -->
                        <el-dropdown trigger="click">
                            <el-button type="" link>
                                <span class="el-dropdown-link">
                                    <el-icon :size="20" :color="color">
                                        <BellFilled />
                                    </el-icon>
                                </span>
                            </el-button>
                            <template #dropdown>
                                    <el-dropdown-menu>
                                    <el-dropdown-item class="clearfix">
                                        comments
                                    <el-badge class="mark" :value="12" />
                                    </el-dropdown-item>
                                    <el-dropdown-item class="clearfix">
                                        replies
                                    <el-badge class="mark" :value="3" />
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        
                        <!-- 用户 -->
                        <el-dropdown class="ml-2">
                            <el-button type="" circle>
                                <el-icon :size="20" :color="color">
                                    <UserFilled />
                                </el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>Action 1</el-dropdown-item>
                                    <el-dropdown-item>Action 2</el-dropdown-item>
                                    <el-dropdown-item>Action 3</el-dropdown-item>
                                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-space>

                    <div class="flex-grow" style="max-width: 7rem;" />

                </el-menu>
            </el-affix>
        </el-header>

        <!-- 主体内容 -->
        <el-main class="container">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style scoped>
    .flex-grow {
        flex-grow: 1;
    }
</style>
