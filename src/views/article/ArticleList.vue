<script setup>
    import {ref} from 'vue'
    import {articleCategoryListService, articleListService} from '@/api/article.js' // 导入文章接口

    const categoryId = ref('') // 分类id
    const state = ref('') // 文章发布状态

    // 分页条相关变量
    const pageNum = ref(1) // 当前页
    const pageSize = ref(5) // 每页条数
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
    <div class="row">
        <!-- 左侧栏 -->
        <aside class="p-0 pt-4 d-none d-lg-block col-lg-2">
            <div class="card list-group p-2">
                <button type="button" class="list-group-item list-group-item-action" aria-current="true">全部</button>
                <button type="button" class="list-group-item list-group-item-action" v-for="category in categories" :key="category.id">{{ category.categoryName }}</button>
            </div>
        </aside>

        <!-- 文章列表 -->
        <article class="pt-4 col-lg-7">
            <div class="card pt-2 pb-2">

                <!-- 文章信息 -->
                <div class="card mb-0 border-0 rounded-0" v-for="article in articles" :key="article.id">
                    <div class="row g-0">
                        <div class="card-body m-auto col-8 col-md-9">
                            <h5 class="card-title"><a class="link-dark text-decoration-none" href="#">{{ article.title }}</a></h5>
                            <p class="card-text text-truncate">{{ article.content }}</p>
                            <div class="action button-group">
                                <button type="button" class="btn text-muted p-0">
                                    <span class=" me-3" style="font-size: small;">{{ article.createUser }}</span>
                                </button>

                                <button type="button" class="btn text-muted p-0 bi-eye">
                                    <span class="me-3" style="font-size: small;">11k</span>
                                </button>
                                
                                <button type="button" class="btn text-muted p-0 bi-hand-thumbs-up">
                                    <span class="" style="font-size: small;">1145</span>
                                </button>

                                <span class="badge bg-secondary float-end p-1 mt-1">类别</span>
                            </div>
                        </div>
                        <div class="col-4 col-md-3 p-3">
                            <img src="/img/2016instbg_01.jpg" class="img-fluid rounded h-100" alt="...">
                        </div>
                    </div>
                    <!-- 分割线 -->
                    <hr class="ms-3 me-3 mt-0 mb-0" v-if="article !== articles[articles.length - 1]">
                </div>
                
            </div>
        </article>

        <!-- 右侧栏 -->
        <aside class="p-0 pt-4 d-none d-lg-block col-md-2">
            <div class="card text-bg-light mb-3" style="max-width: 18rem;">
                <div class="card-header">Header</div>
                <div class="card-body">
                    <h5 class="card-title">Light card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                </div>
                <div class="card text-bg-dark mb-3" style="max-width: 18rem;">
                <div class="card-header">Header</div>
                <div class="card-body">
                    <h5 class="card-title">Dark card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                </div>
        </aside>
    </div>
</template>

<style scoped>
    aside,
    article {
        padding-top: 4.5rem;
    }

    .list-group button{
        border: none!important;
    }

    article > .card > .card:hover {
        background-color: #F8F9FA;
    }

    .action button {
        border: none;
    }
</style>