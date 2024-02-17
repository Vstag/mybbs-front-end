<script setup></script>

<template>
  <div>
    <div class="title">
      <div class="icon" v-if="$slots.icon">
        <slot name="icon">图标</slot>
      </div>
      <slot name="title">卡片标题</slot>
    </div>
    <div class="panel">
      <slot name="panel">卡片内容</slot>
    </div>
  </div>
</template>

<style>
.title {
  display: flex;
  border-bottom: 1px solid var(--el-border-color);
  border-radius: 3px 3px 0 0;
  font-size: 14px;
  line-height: 19px;
  padding: 8px 15px;
  .icon {
    margin-right: 10px;
    font-size: 20px;
  }
}

.panel {
  padding: 8px 15px;
  font-size: 14px;
}
</style>
