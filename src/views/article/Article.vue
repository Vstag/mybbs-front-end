<script setup>
import router from "@/router";
import Card from "@/components/Card.vue";
import SmallList from "@/components/SmallList.vue";
import { ref, computed, watch } from "vue";
import {
  articleCategoryListService,
  articleListService,
} from "@/api/article.js"; // 导入文章接口
import {
  PreviewOpen,
  TagOne,
  ThumbsUp,
  Announcement,
  PictureOne,
} from "@icon-park/vue-next";

const activeName = ref("recommend");

const categoryId = ref(""); // 分类id
const state = ref(""); // 文章发布状态

// 分页相关
const pageNum = ref(1); // 当前页
const pageSize = ref(5); // 每页条数
const total = ref(20); // 总条数

// 获取文章分类列表
const categories = ref(""); // 文章分类列表内容
const articleCategoryList = async () => {
  let result = await articleCategoryListService();

  categories.value = result.data;
};
articleCategoryList();

// 获取文章列表
const articles = ref(""); // 文章列表内容
const articleList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    categoryId: categoryId.value ? categoryId.value : null,
    state: state.value ? state.value : null,
  };
  let result = await articleListService(params);

  total.value = result.data.total;
  const articlesData = result.data.items;

  // 遍历文章列表，为每篇文章添加分类名称
  for (let i = 0; i < articlesData.length; i++) {
    const article = articlesData[i];
    const foundCategory = categories.value.find(
      (category) => category.categoryId === article.categoryId
    );
    const categoryName = foundCategory ? foundCategory.categoryName : "";
    article.categoryName = categoryName;
  }

  // 将更新后的文章列表赋值给 ref
  articles.value = articlesData;
};
articleList();

// 在count发生变化时触发
watch(count, (newValue, oldValue) => {
  pageSize.value = count.value;
  articleList();
});

// 无限滚动
import { count, loading, noMore, getTotal } from "@/utils/scroll";
</script>

<template>
  <el-row>
    <!-- 左侧栏 -->
    <el-col
      class="hidden-sm-and-down"
      :span="4"
      style="padding-right: 15px; justify-content: end"
    ></el-col>

    <!-- 文章列表 -->
    <el-col class="article-list" :xs="24" :sm="24" :md="17" :lg="12" :xl="11">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="width: 100%"
      >
        <el-tab-pane label="推荐" name="recommend">
          <el-space :size="0" fill style="width: 100%">
            <!-- 文章内容 -->
            <div
              class="article"
              v-for="article in articles"
              :key="article.articleId"
              justify="center"
              @click="
                router.push({
                  name: 'articleDetail',
                  params: { articleId: article.articleId },
                })
              "
            >
              <!-- 文章封面 -->
              <div class="cover" v-if="article.coverImg">
                <el-image :src="article.coverImg" style="width: 100%">
                  <template #error>
                    <div class="image-slot" style="font-size: 30px">
                      <PictureOne />
                    </div>
                  </template>
                </el-image>
              </div>

              <!-- 文章信息 -->
              <div class="info" style="height: 100%; flex-direction: column">
                <h3 style="margin: 0">{{ article.title }}</h3>
                <p
                  class="article-intro"
                  style="
                    height: 50px;
                    color: #73767a;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                  "
                >
                  {{ article.summary }}
                </p>

                <div style="display: flex; justify-content: space-between">
                  <div class="article-info">
                    <span>{{ article.userId }}</span>
                    <el-divider direction="vertical" />
                    <span>
                      <PreviewOpen />
                      {{ article.viewCount }}
                    </span>
                    <el-divider direction="vertical" />
                    <span>
                      <ThumbsUp />
                      {{ article.likeCount }}
                    </span>
                  </div>

                  <el-tag size="small">{{ article.categoryName }}</el-tag>
                </div>
              </div>
            </div>

            <div v-loading="loading" style="height: 40px">
              <p
                v-if="noMore"
                style="
                  text-align: center;
                  color: var(--el-text-color-placeholder);
                  font-size: small;
                "
              >
                已经到底了...
              </p>
            </div>
          </el-space>
        </el-tab-pane>
        <el-tab-pane label="最新" name="newest">Newest</el-tab-pane>
      </el-tabs>
    </el-col>

    <!-- 右侧栏 -->
    <el-col
      class="hidden-md-and-down"
      :span="8"
      style="padding-left: 15px; justify-content: start"
    >
      <el-space class="right-side" direction="vertical" :size="15">
        <Card style="width: 300px">
          <template #icon>
            <Announcement />
          </template>
          <template #title>
            <span>公告</span>
          </template>
          <template #panel>
            <SmallList :items="articles" :maxCount="7" />
          </template>
        </Card>

        <Card style="width: 300px">
          <template #icon>
            <TagOne />
          </template>
          <template #title>
            <span>推荐标签</span>
          </template>
          <template #panel>
            <div style="display: flex; flex-wrap: wrap; gap: 15px">
              <el-button
                v-for="category in categories"
                :key="category.categoryId"
                size="small"
                text
                bg
                style="margin: 0"
              >
                {{ category.categoryName }}
              </el-button>
            </div>
          </template>
        </Card>
      </el-space>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-col {
  display: flex;
  justify-content: center;
}

.article-list {
  /* background-color: var(--el-bg-color); */

  .el-tabs {
    padding: 0 20px;

    &:deep(.el-tabs__nav-wrap::after) {
      height: 1px;
      background-color: var(--el-border-color-lighter);
    }

    .article {
      width: 250px;
      padding: 15px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--el-border-color-lighter);

      .cover {
        display: flex;
        height: 110px;
        width: 153px;
        padding-right: 15px;

        .el-image {
          border-radius: 5px;
        }
      }

      .info {
        flex-grow: 1;
      }
    }
  }
}

.article:hover {
  background-color: var(--el-fill-color-light);
}

.box-card {
  width: 300px;
}

.right-side {
  position: fixed;
  top: 75px;
}

.card-header span {
  margin-left: 5px;
}

.article-info,
.article-intro {
  font-size: small;
  color: var(--el-text-color-secondary);
}
</style>
