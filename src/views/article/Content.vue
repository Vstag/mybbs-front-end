<script setup>
import { ref, computed, watch } from 'vue'
import { articleCategoryListService, articleListService } from '@/api/article.js' // 导入文章接口
import { GoodTwo, Star, Comment, PreviewOpen, Calendar } from '@icon-park/vue-next'

// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';
import { onMounted } from 'vue';
// 2. 获取DOM引用
const vditor = ref()
// 3. 在组件初始化时，就创建Vditor对象，并引用
onMounted(() => {
    vditor.value = new Vditor('vditor', {
        value: '# Hello, Vditor!',
        mode: 'ir', // ir 模式用于展示 Markdown
        readOnly: true, // 设置为只读模式，禁止编辑
    })
})

const categoryId = ref('') // 分类id
const state = ref('') // 文章发布状态

// 分页相关
const pageNum = ref(1) // 当前页
const pageSize = ref(5) // 每页条数
const total = ref(20) // 总条数

// 获取文章分类列表
const categories = ref('') // 文章分类列表内容
const articleCategoryList = async () => {
    let result = await articleCategoryListService()

    categories.value = result.data
}
articleCategoryList()

// 在count发生变化时触发
// watch(count, (newValue, oldValue) => {
//     pageSize.value = count.value
//     articleList()
// })

// 无限滚动
import { count, loading, noMore, getTotal } from '@/utils/scroll'


</script>

<template>
    <el-row>
        <!-- 左侧栏 -->
        <el-col class="left-side hidden-sm-and-down" :span="4" style="padding-right: 15px;justify-content: end;">
            <el-space direction="vertical">
                <el-space class="buttons" direction="vertical" fill :fill-ratio="90" :size="28">
                    <el-button id="float-botton" circle>
                        <GoodTwo theme="filled" />
                        <el-badge :value="120" :max="999" type="info" />
                    </el-button>
                    <el-button id="float-botton" circle>
                        <Star theme="filled" />
                        <el-badge :value="12" :max="999" type="info" />
                    </el-button>
                    <el-button id="float-botton" circle>
                        <Comment theme="filled" />
                        <el-badge :value="1209" :max="999" type="info" />
                    </el-button>
                </el-space>
            </el-space>
        </el-col>

        <el-col class="article" :xs="24" :sm="24" :md="17" :lg="12" :xl="11" style="padding: 0.5rem;padding-top: 0;">
            <!-- 文章内容 -->
            <div class="article-content">
                <h1>cwwwwcwcwwp</h1>
                <div style="display: flex;justify-content: space-between">
                    <div class="article-info">
                        <span>作者名</span>
                        <el-divider direction="vertical" />
                        <span>
                            <Calendar />
                            2023-11-16
                        </span>
                        <el-divider direction="vertical" />
                        <span>
                            <PreviewOpen />
                            1234
                        </span>
                    </div>
                </div>

                <!-- md文档 -->
                <div id="vditor"></div>

                <div>
                    <span class="article-category">标签：</span>
                    <el-tag size="small" style="margin-right: 1rem;">Tag 1</el-tag>
                </div>
            </div>

            <!-- 评论 -->
            <div class="comment">
                ffffff
            </div>
        </el-col>

        <!-- 右侧栏 -->
        <el-col class="hidden-md-and-down" :span="8" style="padding-left: 15px;justify-content: start;">
            <el-space class="right-side" direction="vertical" :size="15">
                <el-card v-for="i in 2" :key="i" class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>Card name</span>
                        </div>
                    </template>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{ 'List item ' + o }}
                    </div>
                </el-card>

                <!-- 分类列表 -->
                <el-card class="category-list box-card">
                    <template #header>
                        <div class="card-header">
                            <span>Card name</span>
                        </div>
                    </template>
                    <el-space class="category-tags">
                        <el-button v-for="category in categories" :key="category.categoryId" size="small">{{
                            category.categoryName }}</el-button>
                    </el-space>
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

.left-side {
    .buttons {
        margin-right: 20px;

        .el-button {
            font-size: 18px;
            position: relative;

            .el-badge {
                width: 100%;
                position: absolute;
                left: 0;
                bottom: -16px;
            }
        }
    }
}

.article-content,
.comment {
    background-color: var(--el-bg-color);
    border-radius: 5px;
}

/* .box-card,
.article-content,
.comment {
    border: solid 1px var(--el-border-color);
} */

.article,
.article-content,
.comment {
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.box-card {
    width: 270px;
}

.article {
    padding: 0 !important;

    .article-content {
        padding: 20px;
        margin-bottom: 15px;

        h1 {
            margin-top: 0;
        }
    }
}

.comment {
    padding: 10px;
    margin-bottom: 15px;
}

.left-side .el-button {
    width: 45px;
    height: 45px;
}

.right-side {
    position: fixed;
    top: 75px;

    .category-list {
        /* position: sticky;
        top: 80px; */

        .category-tags {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(22%, 1fr));
            gap: 10px;
        }
    }
}

.article-info,
.article-intro,
.article-category {
    font-size: small;
    color: var(--el-text-color-secondary);
}
</style>