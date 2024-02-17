<script setup>
import { ref } from "vue";
import { useDark } from "@vueuse/core";
import { useThemeStore } from "@/stores/theme.js";
import DropdownAvatar from "@/components/DropdownAvatar.vue";
import { Sunny, Moon, Search, BellFilled, User, EditPen, SwitchButton } from "@element-plus/icons-vue";

// 黑暗模式
const isDark = useDark();

const themeStore = useThemeStore();
const activeIndex = ref("");
const value = ref(false); // 开关默认状态

// 开关切换时调用
const onSwitchChange = (isDark) => {
  if (isDark) {
    themeStore.setTheme("dark");
  } else {
    themeStore.setTheme("default");
  }
};
// 搜索
</script>

<template>
  <el-header style="padding: 0">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <div class="flex-grow" style="max-width: 7rem" />

      <!-- LOGO -->
      <el-menu-item class="hidden-sm-and-down">
        <img
          style="width: 100px"
          src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.sv"
          alt="LOGO"
        />
      </el-menu-item>

      <!-- 左侧菜单项 -->
      <el-menu-item index="index">首页</el-menu-item>
      <el-menu-item index="article">文章</el-menu-item>
      <el-menu-item index="">其他</el-menu-item>

      <div class="flex-grow" />

      <!-- 搜索框 -->
      <el-space>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearch"
          popper-class="my-autocomplete"
          placeholder="搜索..."
          @select="handleSelect"
        >
          <template #suffix>
            <el-icon class="el-input__icon" @click="handleIconClick">
              <Search />
            </el-icon>
          </template>
          <template #default="{ item }">
            <div class="value">{{ item.value }}</div>
            <span class="link">{{ item.link }}</span>
          </template>
        </el-autocomplete>
      </el-space>

      <div class="flex-grow" />

      <!-- 右侧菜单项 -->
      <el-space :size="25">
        <el-switch
          v-model="isDark"
          :change="onSwitchChange(isDark)"
          style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #dcdfe6"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
        />

        <!-- 通知 -->
        <el-dropdown trigger="click">
          <el-button type="" link>
            <span class="el-dropdown-link">
              <el-icon :size="20">
                <BellFilled />
              </el-icon>
            </span>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="clearfix">
                comments
                <el-badge class="mark" :value="12" />
              </el-dropdown-item>
              <el-dropdown-item class="clearfix">
                replies
                <el-badge class="mark" :value="3" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 用户 -->
        <DropdownAvatar prefix="/manage/user/">
          <el-dropdown-item command="info" :icon="User"
            >基本资料</el-dropdown-item
          >
          <el-dropdown-item command="password" :icon="EditPen"
            >重置密码</el-dropdown-item
          >
          <el-dropdown-item command="logout" :icon="SwitchButton"
            >退出登录</el-dropdown-item
          >
        </DropdownAvatar>
      </el-space>

      <div class="flex-grow" style="max-width: 7rem" />
    </el-menu>
  </el-header>
</template>

<style>
.el-header {
  position: sticky;
  top: 0;
  z-index: 100;

  .el-menu {
    /* box-shadow: 0px 6px 32px rgba(0,0,0,0.04); */
    background-color: #00000000!important;
    background-image: radial-gradient(transparent 1px,var(--el-bg-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
  }
}

.flex-grow {
  flex-grow: 1;
}
</style>
