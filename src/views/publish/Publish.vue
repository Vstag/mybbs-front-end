<script setup>
import { ref } from "vue";
import { useTokenStore } from "@/stores/token.js"; //导入token
import { ElMessage } from "element-plus";
import {
  articleCategoryListService,
  articleAddService,
} from "@/api/article.js";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { Plus } from "@element-plus/icons-vue";

// 添加文章表单的数据模型
const articleModel = ref({
  title: "",
  categoryId: "",
  coverImg: "",
  content: "",
  state: "",
});

const categories = ref(''); // 文章分类列表内容
const tokenStore = useTokenStore();
const visibleDrawer = ref(false);

// 获取文章分类列表
const articleCategoryList = async () => {
  let result = await articleCategoryListService();
  categories.value = result.data;
};
articleCategoryList();

// 图片上传成功的回调函数
const uploadSuccess = (result) => {
  articleModel.value.coverImg = result.data;
  console.log(result.data);
};

// 添加文章
const addArticle = async (clickState) => {
  // 把发布状态赋值给数据模型
  articleModel.value.state = clickState;

  let result = await articleAddService(articleModel.value);
  ElMessage.success(result.msg ? result.msg : "添加成功");

  // 让抽屉消失
  visibleDrawer.value = false;

  // 清空表单信息
  articleModel.value = {
    title: "",
    content: "",
    summary: "",
    state: "",
    category: "",
  };
};
</script>

<template>
  <!-- 编写文章内容 -->
  <div class="top">
    <el-input
      v-model="articleModel.title"
      show-word-limit
      maxlength="30"
      placeholder="请输入文章标题"
      class="input-title"
      size="large"
    />
    <div>
      <el-button type="primary" @click="visibleDrawer = true">发布</el-button>
      <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
    </div>
  </div>

  <div class="editor">
    <MdEditor v-model="articleModel.content" />
  </div>

  <!-- 抽屉 -->
  <el-drawer
    v-model="visibleDrawer"
    title="添加文章"
    direction="rtl"
    size="560px"
  >
    <!-- 添加文章表单 -->
    <el-form :model="articleModel" label-width="100px">
      <el-form-item label="文章分类">
        <el-select placeholder="请选择" v-model="articleModel.categoryId">
          <el-option
            v-for="c in categories"
            :key="c.categoryId"
            :label="c.categoryName"
            :value="c.categoryId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要">
        <el-input
          v-model="articleModel.summary"
          show-word-limit
          maxlength="100"
          :rows="4"
          type="textarea"
          placeholder="请输入文章摘要"
        />
      </el-form-item>
      <el-form-item label="文章封面">
        <!-- 
                        auto-upload:设置是否自动上传
                        action:设置服务器接口路径
                        name:设置上传的文件字段名
                        headers:设置上传的请求头
                        on-success:设置上传成功的回调函数
                     -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="true"
          :show-file-list="false"
          action="/api/upload"
          name="file"
          :headers="{ Authorization: tokenStore.token }"
          :on-success="uploadSuccess"
        >
          <img
            v-if="articleModel.coverImg"
            :src="articleModel.coverImg"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="button-group">
        <el-button type="primary" @click="addArticle('已发布')"
          >确认并发布</el-button
        >
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.top {
  padding: 0 25px;
  height: 5rem;
  // border-bottom: 1px solid var(--el-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .input-title {
    max-width: 70%;
    margin-right: 15px;
  }

  > div {
    display: flex;
  }
}

.editor {
  height: calc(100vh - 5rem);

  .md-editor {
    height: 100%;
  }
}

.button-group {
  display: flex;
  justify-content: flex-end;
}
</style>
