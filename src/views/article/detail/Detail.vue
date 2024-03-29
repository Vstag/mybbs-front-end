<script setup>
import router from "@/router";
import CommentArea from "@/components/comment/CommentArea.vue";
import Card from "@/components/Card.vue";
import SmallList from "@/components/SmallList.vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ref, computed, watch } from "vue";
import { useThemeStore } from "@/stores/theme.js";
import {
  articleCategoryListService,
  getArticleService,
} from "@/api/article.js"; // 导入文章接口
import {
  GoodTwo,
  Star,
  Comment,
  PreviewOpen,
  Calendar,
  TagOne,
  Announcement,
} from "@icon-park/vue-next";

const themeStore = useThemeStore();

const article = ref(""); // 文章详情
const articleId = ref(""); // 文章id
const categories = ref([]); // 文章分类列表内容

// 分页相关
// const pageNum = ref(1) // 当前页
// const pageSize = ref(5) // 每页条数
// const total = ref(20) // 总条数

// 获取文章分类列表
const articleCategoryList = async () => {
  let result = await articleCategoryListService();

  categories.value = result.data;
};
articleCategoryList();

// 获取文章详情
const getArticle = async () => {
  articleId.value = router.currentRoute.value.params.articleId;
  let result = await getArticleService(articleId.value);

  const articleData = result.data;

  // 查找对应的分类名称
  const foundCategory = categories.value.find(
    (category) => category.categoryId === articleData.categoryId
  );
  const categoryName = foundCategory ? foundCategory.categoryName : "";

  // 将分类名称添加到文章详情对象中
  article.value = {
    ...articleData,
    categoryName: categoryName,
  };
};
getArticle();

// 在count发生变化时触发
// watch(count, (newValue, oldValue) => {
//     pageSize.value = count.value
//     articleList()
// })

// // 无限滚动
// import { count, loading, noMore, getTotal } from '@/utils/scroll'

// 评论
const comments = ref([
  {
    id: "comment0001", //主键id
    date: "2018-07-05 08:30", //评论时间
    ownerId: "talents100020", //文章的id
    fromId: "errhefe232213", //评论者id
    fromName: "犀利的评论家", //评论者昵称
    fromAvatar:
      "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //评论者头像
    likeNum: 3, //点赞人数
    content: "非常靠谱的程序员", //评论内容
    reply: [
      //回复，或子评论
      {
        id: "34523244545", //主键id
        commentId: "comment0001", //父评论id，即父亲的id
        fromId: "observer223432", //评论者id
        fromName: "夕阳红", //评论者昵称
        fromAvatar:
          "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg", //评论者头像
        toId: "errhefe232213", //被评论者id
        toName: "犀利的评论家", //被评论者昵称
        toAvatar:
          "http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg", //被评论者头像
        content: "赞同，很靠谱，水平很高", //评论内容
        date: "2018-07-05 08:35", //评论时间
      },
      {
        id: "34523244545",
        commentId: "comment0001",
        fromId: "observer567422",
        fromName: "清晨一缕阳光",
        fromAvatar:
          "http://imgsrc.baidu.com/imgad/pic/item/c2fdfc039245d688fcba1b80aec27d1ed21b245d.jpg",
        toId: "observer223432",
        toName: "夕阳红",
        toAvatar:
          "https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg",
        content: "大神一个！",
        date: "2018-07-05 08:50",
      },
    ],
  },
  {
    id: "comment0002",
    date: "2018-07-05 08:30",
    ownerId: "talents100020",
    fromId: "errhefe232213",
    fromName: "毒蛇郭德纲",
    fromAvatar:
      "http://ww1.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2q2p8pj30v90uzmzz.jpg",
    likeNum: 0,
    content: "从没见过这么优秀的人",
    reply: [],
  },
]);
</script>

<template>
  <el-row>
    <!-- 左侧栏 -->
    <el-col
      class="left-side hidden-sm-and-down"
      :span="4"
      style="padding-right: 15px; justify-content: end"
    >
      <el-space direction="vertical">
        <el-space
          class="buttons"
          direction="vertical"
          fill
          :fill-ratio="90"
          :size="28"
        >
          <el-button id="float-botton" circle>
            <GoodTwo theme="filled" />
            <el-badge :value="article.likeCount" :max="999" type="info" />
          </el-button>
          <el-button id="float-botton" circle>
            <Star theme="filled" />
            <el-badge :value="article.favouriteCount" :max="999" type="info" />
          </el-button>
          <el-button id="float-botton" circle>
            <Comment theme="filled" />
            <el-badge :value="article.commentCount" :max="999" type="info" />
          </el-button>
        </el-space>
      </el-space>
    </el-col>

    <el-col
      class="article"
      :xs="24"
      :sm="24"
      :md="17"
      :lg="12"
      :xl="11"
      style="overflow: hidden"
    >
      <!-- 文章信息 -->
      <div class="article-content" style="margin-bottom: 20px">
        <h1 class="article-title" style="margin: 0">{{ article.title }}</h1>
        <div
          class="article-info"
          style="padding: 15px 0; display: flex; justify-content: space-between"
        >
          <div>
            <span>{{ article.categoryName }}</span>
            <el-divider direction="vertical" />
            <span>
              <Calendar />
              发布于 {{ article.createAt }}
            </span>
            <el-divider direction="vertical" />
            <span>
              <PreviewOpen />
              {{ article.viewCount }}
            </span>
          </div>
        </div>

        <el-divider style="width: 100%; margin: 0" />

        <!-- 文章内容 -->
        <MdPreview
          v-model="article.content"
          :theme="themeStore.theme"
          previewTheme="default"
          style="--md-bk-color: ''"
        />

        <div class="article-category" style="padding: 20px 0">
          <span class="label">标签：</span>
          <el-tag size="small" style="margin-right: 1rem">{{
            article.categoryName
          }}</el-tag>
        </div>

        <el-divider style="width: 100%; margin: 0" />
      </div>

      <!-- 评论区 -->
      <el-col class="comment">
        <CommentArea :comments="comments" />
      </el-col>
    </el-col>

    <!-- 右侧栏 -->
    <el-col
      class="hidden-md-and-down"
      :span="8"
      style="padding-left: 15px; justify-content: start"
    >
      <el-space class="right-side" direction="vertical" :size="15">
        <Card style="width: 270px">
          <template #icon>
            <Announcement />
          </template>
          <template #title>
            <span>公告</span>
          </template>
          <template #panel>
            <SmallList :items="articles" />
          </template>
        </Card>

        <Card style="width: 270px">
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

.article {
  padding: 0 20px;

  .article-content {
    /* background-color: var(--el-bg-color); */

    &:deep(.md-editor-preview-wrapper) {
      padding: 0;
    }
  }
}

.article,
.article-content,
.comment {
  display: flex;
  flex-direction: column;
  justify-content: start;
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
.article-category .label {
  font-size: small;
  color: var(--el-text-color-secondary);
}
</style>
