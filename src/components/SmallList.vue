<script setup>
import { defineProps } from 'vue'
import { PictureOne } from "@icon-park/vue-next";

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  // 显示的最大个数，默认显示所有
  maxCount: {
      type: Number,
      default: undefined
    }
})
</script>

<template>
  <div>
    <div class="list" v-for="item in items.slice(0, maxCount || items.length)">
      <el-image :src="item.url">
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
  padding: 8px 0;
  align-items: center;
  .el-image {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .content {
    color: var(--el-text-color-regular);
  }
}
</style>
