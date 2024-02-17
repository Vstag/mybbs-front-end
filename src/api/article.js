import Request from '../utils/request'
import {useTokenStore} from '@/stores/token'

// 获取文章列表接口
export const articleListService = (params) => {
    return Request.request(Request.GET, '/articles', params)
}

// 获取文章详情接口
export const getArticleService = (articleId) => {
    return Request.request(Request.GET, `/articles/${articleId}`)
}

// 添加文章接口
export const articleAddService = (articleModel) => {
    return Request.requestJson(Request.POST, '/articles', articleModel)
}

// 获取文章分类列表接口
export const articleCategoryListService = (params) => {
    return Request.request(Request.GET, '/categories', params)
}

// 添加文章分类接口
export const articleCategoryAddService = (categoryData) => {
    return Request.requestJson(Request.POST, '/categories', categoryData)
}

// 删除文章分类接口
export const articleCategoryDeleteService = (categoryId) => {
    return Request.request(Request.DELETE, `/categories/${categoryId}`)
}