<script setup>
import router from "@/router";
import { defineProps } from "vue";
import { PictureOne } from "@icon-park/vue-next";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  // 显示的最大个数，默认显示所有
  maxCount: {
    type: Number,
    default: undefined,
  },
});
</script>

<template>
  <div>
    <div
      class="list"
      v-for="item in items.slice(0, maxCount || items.length)"
      @click="
        router.push({
          name: 'articleDetail',
          params: { articleId: item.articleId },
        })
      "
    >
      <el-image :src="item.coverImg">
        <template #error>
          <div class="image-slot">
            <PictureOne />
          </div>
        </template>
      </el-image>
      <span class="content">{{ item.title }}</span>
    </div>
  </div>
</template>

<style>
.list {
  display: flex;
  padding: 8px 5px;
  align-items: center;
  .el-image {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 3px;
  }

  .content {
    color: var(--el-text-color-regular);
  }
}

.list:hover {
  background-color: var(--el-fill-color-light);
}
</style>
