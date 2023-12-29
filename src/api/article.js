import request from '../utils/request'
import {useTokenStore} from '@/stores/token'

// 调用获取文章分类列表接口
export const articleCategoryListService = () => {
    return request.get('/categories')
}

// 调用获取文章列表接口
export const articleListService = (params) => {
    return request.get('/articles', {params})
}