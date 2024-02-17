<script setup>
import router from "@/router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useTokenStore } from "@/stores/token.js";
import useUserInfoStore from "@/stores/userInfo.js";
import avatar from "@/assets/default.png";
import { User, SwitchButton, CaretBottom } from "@element-plus/icons-vue";

const tokenStore = useTokenStore();
const userInfoStore = useUserInfoStore();

const props = defineProps({
    // 拼接的路径前缀
    prefix: {
    type: String,
    default: '',
  }
});

// 条目被点击后,调用的函数
const handleCommand = (command) => {
  if (command === "logout") {
    // 退出登录
    ElMessageBox.confirm("您确定要退出吗?", "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        // 退出登录
        // 清空pinia中存储的token以及个人信息
        tokenStore.removeToken();
        userInfoStore.removeInfo();

        // 跳转到登录页面
        router.push("/login");
        ElMessage({
          type: "success",
          message: "退出登录成功",
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "退出登录已取消",
        });
      });
  } else {
    // 路由跳转
    router.push(props.prefix + command);
  }
};
</script>

<template>
  <!-- 下拉菜单 -->
  <!-- command: 条目被点击后会触发,在事件函数上可以声明一个参数,接收条目对应的指令 -->
  <el-dropdown placement="bottom-end" @command="handleCommand">
    <span class="el-dropdown__box">
      <el-avatar
        :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar"
      />
      <el-icon>
        <CaretBottom />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <slot>
          <el-dropdown-item command="info" :icon="User"
            >基本资料</el-dropdown-item
          >
          <el-dropdown-item command="logout" :icon="SwitchButton"
            >退出登录</el-dropdown-item
          >
        </slot>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown__box {
  display: flex;
  align-items: center;

  .el-icon {
    color: #999;
    margin-left: 10px;
  }

  &:active,
  &:focus {
    outline: none;
  }
}
</style>
