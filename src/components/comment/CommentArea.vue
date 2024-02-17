<script setup>
import { ref } from 'vue';
import { GoodTwo, Comment } from "@icon-park/vue-next";

// Props
const props = defineProps(['comments']);

// State
const inputComment = ref('');
const showItemId = ref('');

// Methods
const likeClick = (item) => {
  if (item.isLike === null) {
    Vue.$set(item, 'isLike', true);
    item.likeNum++;
  } else {
    if (item.isLike) {
      item.likeNum--;
    } else {
      item.likeNum++;
    }
    item.isLike = !item.isLike;
  }
};

const cancel = () => {
  showItemId.value = '';
};

const commitComment = () => {
  console.log(inputComment.value);
};

const showCommentInput = (item, reply) => {
  if (reply) {
    inputComment.value = '@' + reply.fromName + ' ';
  } else {
    inputComment.value = '';
  }
  showItemId.value = item.id;
};
</script>

<template>
  <div class="container">
    <div class="comment" v-for="item in comments">
      <!-- 头像 -->
      <img class="avatar" :src="item.fromAvatar" width="36" height="36" />
      <div style="width: 100%">
        <!-- 评论内容 -->
        <div class="info">
          <div class="name">{{ item.fromName }}</div>
          <div class="date">{{ item.date }}</div>
          <div class="content">{{ item.content }}</div>

          <!-- 点赞 -->
          <div class="control">
            <span
              class="like"
              :class="{ active: item.isLike }"
              @click="likeClick(item)"
            >
              <GoodTwo style="margin-right: 4px;" />
              <span class="like-num">{{
                item.likeNum > 0 ? item.likeNum : "赞"
              }}</span>
            </span>
            <span class="comment-reply" @click="showCommentInput(item)">
              <Comment style="margin-right: 4px;" />
              <span>回复</span>
            </span>
          </div>
          <!-- 回复 -->
          <div class="reply">
            <div class="item" v-for="reply in item.reply">
              <div class="reply-content">
                <span class="from-name">{{ reply.fromName }}</span
                ><span>: </span>
                <span class="to-name">@{{ reply.toName }}</span>
                <span>{{ reply.content }}</span>
              </div>
              <div class="reply-bottom">
                <span>{{ reply.date }}</span>
                <span class="reply-text" @click="showCommentInput(item, reply)">
                  <Comment style="margin-right: 4px;" />
                  <span>回复</span>
                </span>
              </div>
            </div>
            <!-- 增加评论 -->
            <transition name="fade">
              <div class="input-wrapper" v-if="showItemId === item.id">
                <el-input
                  class="gray-bg-input"
                  v-model="inputComment"
                  type="textarea"
                  :rows="3"
                  autofocus
                  placeholder="写下你的评论"
                >
                </el-input>
                <div class="btn-control">
                  <span class="cancel" @click="cancel">取消</span>
                  <el-button type="primary" round @click="commitComment">发送</el-button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color-main: #409eff;
$color-success: #67c23a;
$color-warning: #e6a23c;
$color-danger: #f56c6c;
$color-info: #909399;

$text-main: #303133;
$text-normal: #606266;
$text-minor: #909399; //次要文字
$text-placeholder: #c0c4cc;
$text-333: #333;

$border-first: #dcdfe6;
$border-second: #e4e7ed;
$border-third: #ebeef5;
$border-fourth: #f2f6fc;

$content-bg-color: #fff;

// .container {
//   padding: 0 10px;
//   box-sizing: border-box;
.comment {
  display: flex;
  .avatar {
    border-radius: 50%;
  }
  .info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .name {
      font-size: 16px;
      // color: $text-main;
      margin-bottom: 5px;
      font-weight: 500;
    }
    .date {
      font-size: 12px;
      // color: $text-minor;
      color: var(--el-text-color-secondary);
    }
    .content {
      font-size: 16px;
      // color: $text-main;
      line-height: 20px;
      padding: 10px 0;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      // color: $text-minor;
      color: var(--el-text-color-secondary);
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
  }

  .reply {
    margin: 10px 0;
    background-color: var(--el-bg-color-page);
    border-radius: 5px;
    .item {
      margin: 0 10px;
      padding: 10px 0;
      // border-bottom: 1px solid $border-third;
      .reply-content {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-main;
        .from-name {
          color: $color-main;
        }
        .to-name {
          color: $color-main;
          margin-left: 5px;
          margin-right: 5px;
        }
      }
      .reply-bottom {
        display: flex;
        align-items: center;
        margin-top: 6px;
        font-size: 12px;
        color: $text-minor;
        .reply-text {
          display: flex;
          align-items: center;
          margin-left: 10px;
          cursor: pointer;
          &:hover {
            color: $text-333;
          }
          .icon-comment {
            margin-right: 5px;
          }
        }
      }
    }
    .fade-enter-active,
    fade-leave-active {
      transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
    .input-wrapper {
      padding: 10px;
      .gray-bg-input,
      .el-input__inner {
        /*background-color: #67C23A;*/
      }
      .btn-control {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;
        .cancel {
          font-size: 16px;
          color: $text-normal;
          margin-right: 20px;
          cursor: pointer;
          &:hover {
            color: $text-333;
          }
        }
        .confirm {
          font-size: 16px;
        }
      }
    }
  }
}
// }
</style>
