<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// import { articleCategoryListService, articleCategoryAddService, articleCategoryUpdateService,articleCategoryDeleteService } from '@/api/article.js'
import { articleCategoryAddService, articleCategoryListService, articleCategoryDeleteService } from '@/api/article.js'
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

const dialogVisible = ref(false) // 添加分类弹窗是否显示
const title = ref('') // 添加分类弹窗的标题

const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "description": "my",
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "description": "yl",
    },
    {
        "id": 5,
        "categoryName": "军事",
        "description": "js",
    }
])

// 文章分类的数据模型
const categoryModel = ref({
    categoryName: '',
    description: '',
})

// 清空模型的数据
const clearData = () => {
    categoryModel.value.categoryName = '';
    categoryModel.value.description = '';
}

// 获取文章分类列表
const articleCategoryList = async () => {
    let result = await articleCategoryListService();
    categorys.value = result.data;
}
articleCategoryList();

//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    description: [
        { required: false, message: '请输入分类描述', trigger: 'blur' },
    ]
}

// 添加文章分类
const addCategory = async () => {
    let result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '添加成功')

    // 重新获取文章分类列表
    articleCategoryList();
    dialogVisible.value = false;
}

// 展示添加分类的弹窗
const showDialog = (row) => {
    dialogVisible.value = true
    title.value = '编辑分类'
    // 数据拷贝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.description = row.description;
    // 扩展id属性,将来需要传递给后台,完成分类的修改
    categoryModel.value.id = row.id
}

// 编辑分类
const updateCategory = async () => {
    //调用接口
    let result = await articleCategoryUpdateService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '修改成功')

    // 重新获取文章分类列表
    articleCategoryList();
    dialogVisible.value = false;
}

// 删除分类
import {ElMessageBox} from 'element-plus'
const deleteCategory = (row) => {
    //提示用户  确认框

    ElMessageBox.confirm(
        '你确认要删除该分类信息吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let result = await articleCategoryDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            articleCategoryList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除已取消',
            })
        })
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true; title = '添加分类'; clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类描述" prop="description"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类描述" prop="description">
                    <el-input v-model="categoryModel.description" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title == '添加分类' ? addCategory() : updateCategory()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>