<script setup>
    import {ref} from 'vue'
    import {articleCategoryListService, articleListService} from '@/api/article.js' // 导入文章接口

    const categoryId = ref('') // 分类id
    const state = ref('') // 文章发布状态

    // 分页条相关变量
    const pageNum = ref(1) // 当前页
    const pageSize = ref(10) // 每页条数
    const total = ref(20) // 总条数

    // 在每页条数改变时调用
    const pageSizeChange = (size) => {
        pageSize.value = size
    }

    // 在当前页改变时调用
    const pageNumChange = (num) => {
        pageNum.value = num
    }

    // 获取文章分类列表
    const categories = ref('') // 文章分类列表内容
    const articleCategoryList = async() => {
        let result = await articleCategoryListService()
        
        categories.value = result.data
    }
    articleCategoryList()

    // 获取文章列表
    const articles = ref('') // 文章列表内容
    const  articleList = async() => {
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
    
</script>

<template>
    <el-row justify="center">
        <!-- 左侧栏 -->
        <el-col class="hidden-sm-and-down" :span="5" style="padding-right: 15px;justify-content: end">
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

        <!-- 文章列表 -->
        <el-col :xs="24" :sm="24" :md="16" :lg="11" :xl="10" style="padding: 1rem, 0">
            <el-space class="article-list" :size="0" fill style="width: 100%;">
                <el-card v-for="i in 13" :key="i" style="width: 250px">
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

        <!-- 右侧栏 -->
        <el-col class="hidden-md-and-down" :span="5" style="padding-left: 15px;justify-content: start;">
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

    .article-list {
        border: 1px solid var(--el-border-color);
    }

    .el-card {
        box-shadow: 0 0px 0px #ccc!important;
    }
</style>