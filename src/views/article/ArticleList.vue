<script setup>
import {ref, computed, watch} from 'vue'
import {articleCategoryListService, articleListService} from '@/api/article.js' // 导入文章接口

const categoryId = ref('') // 分类id
const state = ref('') // 文章发布状态

// 分页相关
const pageNum = ref(1) // 当前页
const pageSize = ref(5) // 每页条数
const total = ref(20) // 总条数

// 获取文章分类列表
const categories = ref('') // 文章分类列表内容
const articleCategoryList = async() => {
    let result = await articleCategoryListService()
    
    categories.value = result.data
}
articleCategoryList()

// 获取文章列表
const articles = ref('') // 文章列表内容
const articleList = async() => {
    console.log(count.value);

    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        categoryId: categoryId.value ? categoryId.value : null,
        state: state.value ? state.value : null
    }
    let result = await articleListService(params)

    total.value = result.data.total
    articles.value = result.data.items
}
articleList()

// 在count发生变化时触发
watch(count, (newValue, oldValue) => {
    pageSize.value = count.value
    articleList()
})

// 无限滚动
import { count, loading, noMore, getTotal } from '@/utils/scroll'

// 图片链接
import { Picture as IconPicture } from '@element-plus/icons-vue'
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<template>
    <el-row >
        <!-- 左侧栏 -->
        <el-col class="hidden-sm-and-down" :span="6" style="padding-right: 15px;justify-content: end">
            <el-space class="category-list" direction="vertical" :size="15">
                <!-- 文章分类列表 -->
                <el-space direction="vertical" fill :fill-ratio="90" style="width: 200px;padding-top: 0.5rem;;">
                    <el-button
                        v-for="category in categories"
                        :key="category.categoryId"
                        text
                        :icon="Search"
                    >{{ category.categoryName }}</el-button>
                </el-space>
            </el-space>
        </el-col>

        <!-- 文章列表 -->
        <el-col class="article-list" :xs="24" :sm="24" :md="16" :lg="11" :xl="10" style="padding: 0.5rem;padding-top: 0;">
            <el-tabs 
                v-model="activeName"
                @tab-click="handleClick" 
                style="width: 100%"
            >
                <el-tab-pane label="推荐" name="first">
                    <el-space :size="0" fill style="width: 100%;">
                        <el-row v-for="article in articles" :key="article.id" justify="center" style="width: 250px">
                            <!-- 文章内容 -->
                            <el-card class="article" style="width: 100%;border-radius: 0;border: none;">
                                <el-row>
                                    <!-- 文章信息 -->
                                    <el-col :span="19" style="flex-direction: column">
                                        <h3 style="margin: 0">{{ article.title }}</h3>
                                        <p class="article-intro" style="color: #73767a;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">
                                            {{ article.content }}
                                        </p>

                                        <div style="display: flex;justify-content: space-between">
                                            <div class="article-info">
                                                <span>{{ article.createUser }}</span>
                                                <el-divider direction="vertical" />
                                                <span>
                                                    <el-icon>
                                                        <View />
                                                    </el-icon>
                                                    1234
                                                </span>
                                                <el-divider direction="vertical" />
                                                <span>
                                                    <el-icon>
                                                        <CaretTop />
                                                    </el-icon>
                                                    1234
                                                </span>
                                            </div>

                                            <el-tag size="small" style="margin-right: 1rem;">Tag 1</el-tag>
                                        </div>
                                    </el-col>
                                    
                                    <!-- 文章封面 -->
                                    <el-col :span="5">
                                        <el-image :src="url" style="width: 100%;border-radius: 5px;">
                                            <template #error>
                                                <div class="image-slot">
                                                    <el-icon><icon-picture /></el-icon>
                                                </div>
                                            </template>
                                        </el-image>
                                    </el-col>
                                </el-row>
                            </el-card>

                            <!-- 分割线 -->
                            <el-divider style="width: 95%;margin: 0;" />
                        </el-row>

                        <p v-loading="loading" style="height: 40px;">
                            <p v-if="noMore" style="text-align: center;color: var(--el-text-color-placeholder);font-size: small">已经到底了...</p>
                        </p>
                    </el-space>
                </el-tab-pane>
                <el-tab-pane label="最新" name="second">Config</el-tab-pane>
            </el-tabs>
        </el-col>

        <!-- 右侧栏 -->
        <el-col class="hidden-md-and-down" :span="7" style="padding-left: 15px;justify-content: start;">
            <el-space direction="vertical" :size="15">
                <el-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
                    <template #header>
                        <div class="card-header">
                            <span>Card name</span>
                        </div>
                    </template>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{ 'List item ' + o }}
                    </div>
                </el-card>
            </el-space>
        </el-col>
    </el-row>
</template>

<style scoped>
.el-col {
    display: flex;
    justify-content: center
}

.category-list,
.article-list {
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color);
    border-radius: 5px
}

.article:hover {
    background-color: var(--el-fill-color-light);
}

.el-card {
    background-color: var(--el-bg-color);
    box-shadow: 0 0px 0px #ccc!important;
}

.category-list {
    position: fixed;
    top: 80px;
}

.article-info,
.article-intro
    {
    font-size: small;
    color: var(--el-text-color-secondary);
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color);
    color: var(--el-text-color-secondary);
    font-size: 30px;
}
    
</style>